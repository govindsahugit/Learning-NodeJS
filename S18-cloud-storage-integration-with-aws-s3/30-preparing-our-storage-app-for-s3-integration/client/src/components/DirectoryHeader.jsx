import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFolderPlus,
  FaUpload,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { fetchUserApi, logoutAllSessions, logoutUser } from "../apis/userApi";

function DirectoryHeader({
  directoryName,
  onCreateFolderClick,
  onUploadFilesClick,
  fileInputRef,
  handleFileSelect,
  disabled = false,
  path,
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const [userEmail, setUserEmail] = useState("guest@example.com");
  const [userPicture, setUserPicture] = useState(null);

  const [maxStorageInBytes, setMaxStorageInBytes] = useState(1073741824);
  const [usedStorageInBytes, setUsedStorageInBytes] = useState(0);
  const usedGB = usedStorageInBytes / 1024 ** 3;
  const totalGB = maxStorageInBytes / 1024 ** 3;

  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // -------------------------------------------
  // 1. Fetch user info from /user on mount
  // -------------------------------------------
  async function fetchUser() {
    try {
      const response = await fetchUserApi();
      if (response.status === 200) {
        const data = response.data;
        // Set user info if logged in
        setUserName(data.name);
        setUserEmail(data.email);
        setUserPicture(data.picture);
        setMaxStorageInBytes(data.maxStorageInBytes);
        setUsedStorageInBytes(data.usedStorageInBytes);
        setLoggedIn(true);
      } else if (response.status === 401) {
        // User not logged in
        navigate("/login");
        setUserName("Guest User");
        setUserEmail("guest@example.com");
        setLoggedIn(false);
      } else {
        // Handle other error statuses if needed
        console.error("Error fetching user info:", response.status);
      }
    } catch (err) {
      if (err.status === 401) {
        // User not logged in
        setUserName("Guest User");
        setUserEmail("guest@example.com");
        setLoggedIn(false);
        navigate("/login");
      }
      console.error("Error fetching user info:", err);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  // -------------------------------------------
  // 2. Toggle user menu
  // -------------------------------------------
  const handleUserIconClick = () => {
    setShowUserMenu((prev) => !prev);
  };

  // -------------------------------------------
  // 3. Logout handler
  // -------------------------------------------
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === 200) {
        console.log("Logged out successfully");
        // Optionally reset local state
        setLoggedIn(false);
        setUserName("Guest User");
        setUserEmail("guest@example.com");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setShowUserMenu(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      const response = await logoutAllSessions();
      if (response.status === 200) {
        console.log("Logged out successfully");
        // Optionally reset local state
        setLoggedIn(false);
        setUserName("Guest User");
        setUserEmail("guest@example.com");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setShowUserMenu(false);
    }
  };

  // -------------------------------------------
  // 4. Close menu on outside click
  // -------------------------------------------
  useEffect(() => {
    function handleDocumentClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <header className="directory-header">
      <span>
        {path?.map((p) => (
          <span key={p._id}>
            {p.name.includes("root") ? (
              <Link key={p._id} to={`/`} className="text-2xl a1">
                <b>My Drive</b>
              </Link>
            ) : (
              <Link key={p._id} to={`/directory/${p._id}`} className="a2">
                <i className="ri-arrow-right-s-line text-2xl ml-[10px] mr-[10px]"></i>
                <b className="text-[18px]">{p.name}</b>
              </Link>
            )}
          </span>
        ))}
      </span>
      <div className="header-links">
        {/* Create Folder (icon button) */}
        <button
          className="icon-button"
          title="Create Folder"
          onClick={onCreateFolderClick}
          disabled={disabled}>
          <FaFolderPlus />
        </button>

        {/* Upload Files (icon button) */}
        <button
          className="icon-button"
          title="Upload Files"
          onClick={onUploadFilesClick}
          disabled={disabled}>
          <FaUpload />
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          // multiple
          onChange={handleFileSelect}
        />

        {/* User Icon & Dropdown Menu */}
        <div className="user-menu-container" ref={userMenuRef}>
          <button
            className="icon-button"
            title="User Menu"
            onClick={handleUserIconClick}>
            {!userPicture ? (
              <FaUser />
            ) : (
              <div id="profile-pic">
                <img src={`${userPicture}`} alt="Profile" />
              </div>
            )}
          </button>

          {showUserMenu && (
            <div className="user-menu">
              {loggedIn ? (
                <>
                  {/* Display name & email if logged in */}
                  <div className="user-menu-item user-info">
                    <span className="user-name">{userName}</span>
                    <span className="user-email">{userEmail}</span>
                    <div className="w-40 h-1 bg-gray-300 rounded-full overflow-hidden mb-1">
                      <div
                        className="bg-blue-500 rounded-full h-full"
                        style={{ width: `${(usedGB / totalGB) * 100}%` }}></div>
                    </div>
                    <div className="text-xs">
                      {usedGB.toFixed(2)} GB of {totalGB} GB used
                    </div>
                  </div>
                  <div className="user-menu-divider" />
                  <div
                    className="user-menu-item login-btn"
                    onClick={handleLogout}>
                    <FaSignOutAlt className="menu-item-icon" />
                    <span>Logout</span>
                  </div>
                  <div
                    className="user-menu-item login-btn"
                    onClick={handleLogoutAll}>
                    <FaSignOutAlt className="menu-item-icon" />
                    <span>Logout All</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Show Login if not logged in */}
                  <div
                    className="user-menu-item login-btn"
                    onClick={() => {
                      navigate("/login");
                      setShowUserMenu(false);
                    }}>
                    <FaSignInAlt className="menu-item-icon" />
                    <span>Login</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DirectoryHeader;
