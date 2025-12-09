import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DirectoryHeader from "./components/DirectoryHeader";
import CreateDirectoryModal from "./components/CreateDirectoryModal";
import RenameModal from "./components/RenameModal";
import DirectoryList from "./components/DirectoryList";
import "./DirectoryView.css";
import SharePopUp from "./components/SharePopUp";
import DetailsPopup from "./components/DetailsPopup";
import { deleteFile, handlePublicFileApi } from "./apis/fileApi";
import {
  createDirectorApi,
  deleteDirectoryApi,
  getDirectoryItemsApi,
  getPublicDirDataApi,
  getUserDirDataApi,
  handlePublicDirectoryApi,
  handleRenameApi,
} from "./apis/directoryApi";

function DirectoryView({ adminView, isPublic }) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { dirId } = useParams();
  const navigate = useNavigate();

  // Displayed directory name
  const [directoryName, setDirectoryName] = useState("My Drive");

  // Lists of items
  const [directoriesList, setDirectoriesList] = useState([]);
  const [filesList, setFilesList] = useState([]);

  // Error state
  const [errorMessage, setErrorMessage] = useState("");

  // Modal states
  const [showCreateDirModal, setShowCreateDirModal] = useState(false);
  const [newDirname, setNewDirname] = useState("New Folder");

  const [showSharePopup, setShowSharePopup] = useState(false);

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameType, setRenameType] = useState(null); // "directory" or "file"
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const [detailsItem, setDetailsItem] = useState(null);
  const [path, setPath] = useState([]);

  // Uploading states
  const fileInputRef = useRef(null);
  const [uploadQueue, setUploadQueue] = useState([]); // queued items to upload
  const [uploadXhrMap, setUploadXhrMap] = useState({}); // track XHR per item
  const [progressMap, setProgressMap] = useState({}); // track progress per item
  const [isUploading, setIsUploading] = useState(false); // indicates if an upload is in progress

  // Context menu
  const [activeContextMenu, setActiveContextMenu] = useState(null);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });

  const [publicPath, setPublicPath] = useState("");

  const openDetailsPopup = (item) => {
    setDetailsItem(item);
  };
  const closeDetailsPopup = () => setDetailsItem(null);

  /**
   * Utility: handle fetch errors
   */
  async function handleFetchErrors(response) {
    if (response.status !== 200 && response.status !== 201) {
      let errMsg = `Request failed with status ${response.status}`;
      try {
        const data = await response.json();
        if (data.error) errMsg = data.error;
      } catch (_) {
        // If JSON parsing fails, default errMsg stays
      }
      throw new Error(errMsg);
    }
    return response;
  }

  const getUserDirData = async () => {
    setErrorMessage(""); // clear any existing error
    try {
      const res = await getUserDirDataApi(dirId);
      const data = res.data;

      if (res.status === 401) {
        navigate("/users");
        return;
      } else if (res.status === 403) {
        navigate("/users");
        return;
      }

      await handleFetchErrors(res);

      setPath(data.path);

      // Set directory name
      setDirectoryName(dirId ? data.name : "My Drive");

      // Reverse directories and files so new items show on top
      setDirectoriesList([...data.directories]);
      setFilesList([...data.files]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const getPublicDirData = async () => {
    setErrorMessage(""); // clear any existing error
    try {
      const res = await getPublicDirDataApi(dirId);

      const data = res.data;

      if (res.status === 401) {
        setErrorMessage(data.error);
        return;
      }

      await handleFetchErrors(res);

      // Set directory name
      setDirectoryName(dirId ? data.name : "My Drive");

      // Reverse directories and files so new items show on top
      setDirectoriesList([...data.directories]);
      setFilesList([...data.files]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  /**
   * Fetch directory contents
   */
  async function getDirectoryItems() {
    setErrorMessage(""); // clear any existing error
    try {
      const response = await getDirectoryItemsApi(dirId);

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      await handleFetchErrors(response);
      const data = response.data;

      setPath(data.path);

      // Set directory name
      setDirectoryName(dirId ? data.name : "My Drive");

      // Reverse directories and files so new items show on top
      setDirectoriesList([...data.directories]);
      setFilesList([...data.files]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    isPublic
      ? getPublicDirData()
      : !adminView
      ? getDirectoryItems()
      : getUserDirData();
    // Reset context menu
    setActiveContextMenu(null);
  }, [dirId]);

  /**
   * Decide file icon
   */
  function getFileIcon(filename) {
    const ext = filename.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "pdf";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return "image";
      case "mp4":
      case "mov":
      case "avi":
        return "video";
      case "zip":
      case "rar":
      case "tar":
      case "gz":
        return "archive";
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
      case "html":
      case "css":
      case "py":
      case "java":
        return "code";
      default:
        return "alt";
    }
  }

  /**
   * Click row to open directory or file
   */
  function handleRowClick(type, id) {
    if (type === "directory") {
      navigate(
        `${
          isPublic ? "/public" : adminView ? "/admin/user" : ""
        }/directory/${id}`
      );
    } else {
      window.location.href = `${BASE_URL}/${
        isPublic ? "public/file" : adminView ? "admin/read/user/file" : "file"
      }/${id}`;
    }
  }

  /**
   * Select multiple files
   */
  function handleFileSelect(e) {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    // Build a list of "temp" items
    const newItems = selectedFiles.map((file) => {
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      return {
        file,
        name: file.name,
        size: file.size,
        id: tempId,
        isUploading: false,
      };
    });

    // Put them at the top of the existing list
    setFilesList((prev) => [...newItems, ...prev]);

    // Initialize progress=0 for each
    newItems.forEach((item) => {
      setProgressMap((prev) => ({ ...prev, [item.id]: 0 }));
    });

    // Add them to the uploadQueue
    setUploadQueue((prev) => [...prev, ...newItems]);

    // Clear file input so the same file can be chosen again if needed
    e.target.value = "";

    // Start uploading queue if not already uploading
    if (!isUploading) {
      setIsUploading(true);
      // begin the queue process
      processUploadQueue([...uploadQueue, ...newItems.reverse()]);
    }
  }

  /**
   * Upload items in queue one by one
   */
  function processUploadQueue(queue) {
    if (queue.length === 0) {
      // No more items to upload
      setIsUploading(false);
      setUploadQueue([]);
      setTimeout(() => {
        isPublic
          ? getPublicDirData()
          : !adminView
          ? getDirectoryItems()
          : getUserDirData();
      }, 1000);
      return;
    }

    // Take first item
    const [currentItem, ...restQueue] = queue;

    // Mark it as isUploading: true
    setFilesList((prev) =>
      prev.map((f) =>
        f.id === currentItem.id ? { ...f, isUploading: true } : f
      )
    );

    // Start upload
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${BASE_URL}/${adminView ? "admin/upload/user/file" : "file"}/${
        dirId || ""
      }`,
      true
    );
    xhr.withCredentials = true;
    xhr.setRequestHeader("filename", currentItem.name);
    xhr.setRequestHeader("filesize", currentItem.size);

    xhr.upload.addEventListener("progress", (evt) => {
      if (evt.lengthComputable) {
        const progress = (evt.loaded / evt.total) * 100;
        setProgressMap((prev) => ({ ...prev, [currentItem.id]: progress }));
      }
    });

    xhr.addEventListener("load", () => {
      // Move on to the next item
      processUploadQueue(restQueue);
    });

    // If user cancels, remove from the queue
    setUploadXhrMap((prev) => ({ ...prev, [currentItem.id]: xhr }));
    xhr.send(currentItem.file);
  }

  /**
   * Cancel an in-progress upload
   */
  function handleCancelUpload(tempId) {
    const xhr = uploadXhrMap[tempId];
    if (xhr) {
      xhr.abort();
    }
    // Remove it from queue if still there
    setUploadQueue((prev) => prev.filter((item) => item.id !== tempId));

    // Remove from filesList
    setFilesList((prev) => prev.filter((f) => f.id !== tempId));

    // Remove from progressMap
    setProgressMap((prev) => {
      const { [tempId]: _, ...rest } = prev;
      return rest;
    });

    // Remove from Xhr map
    setUploadXhrMap((prev) => {
      const copy = { ...prev };
      delete copy[tempId];
      return copy;
    });
  }

  /**
   * Delete a file/directory
   */
  async function handleDeleteFile(id) {
    setErrorMessage("");
    try {
      const response = await deleteFile(id, adminView);
      await handleFetchErrors(response);
      isPublic
        ? getPublicDirData()
        : !adminView
        ? getDirectoryItems()
        : getUserDirData();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleDeleteDirectory(id) {
    setErrorMessage("");
    try {
      const response = await deleteDirectoryApi(id, adminView);
      await handleFetchErrors(response);
      isPublic
        ? getPublicDirData()
        : !adminView
        ? getDirectoryItems()
        : getUserDirData();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  /**
   * Create a directory
   */
  async function handleCreateDirectory(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await createDirectorApi(dirId, newDirname, adminView);
      await handleFetchErrors(response);
      setNewDirname("New Folder");
      setShowCreateDirModal(false);
      isPublic
        ? getPublicDirData()
        : !adminView
        ? getDirectoryItems()
        : getUserDirData();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  /**
   * Rename
   */
  function openRenameModal(type, id, currentName) {
    setRenameType(type);
    setRenameId(id);
    setRenameValue(currentName);
    setShowRenameModal(true);
  }

  async function handleRenameSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await handleRenameApi(
        renameType,
        adminView,
        renameId,
        renameValue
      );
      await handleFetchErrors(response);

      setShowRenameModal(false);
      setRenameValue("");
      setRenameType(null);
      setRenameId(null);
      isPublic
        ? getPublicDirData()
        : !adminView
        ? getDirectoryItems()
        : getUserDirData();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  /**
   * Context Menu
   */
  function handleContextMenu(e, id) {
    e.stopPropagation();
    e.preventDefault();
    const clickX = e.clientX;
    const clickY = e.clientY;

    if (activeContextMenu === id) {
      setActiveContextMenu(null);
    } else {
      setActiveContextMenu(id);
      setContextMenuPos({ x: clickX - 110, y: clickY });
    }
  }

  useEffect(() => {
    function handleDocumentClick() {
      setActiveContextMenu(null);
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Combine directories & files into one list for rendering
  const combinedItems = [
    ...directoriesList.map((d) => ({ ...d, isDirectory: true })),
    ...filesList.map((f) => ({ ...f, isDirectory: false })),
  ];

  const handlePublicDirectory = async (item) => {
    setErrorMessage("");
    try {
      const res = await handlePublicDirectoryApi(item);
      const data = res.data;
      if (res.status === 401) {
        setErrorMessage(data.error);
        return;
      }
      setPublicPath(`http://localhost:5173/public/directory/${item.id}`);
      item.isPublic ? setShowSharePopup(false) : setShowSharePopup(true);
      isPublic
        ? getPublicDirData()
        : !adminView
        ? getDirectoryItems()
        : getUserDirData();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePublicFile = async (item) => {
    setErrorMessage("");
    try {
      const res = await handlePublicFileApi(item);
      const data = res.data;
      if (res.status === 401) {
        setErrorMessage(data.error);
        return;
      }
      setPublicPath(`${import.meta.env.VITE_API_URL}/public/file/${item.id}`);
      item.isPublic ? setShowSharePopup(false) : setShowSharePopup(true);
      isPublic
        ? getPublicDirData()
        : !adminView
        ? getDirectoryItems()
        : getUserDirData();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="directory-view">
      {/* Top error message for general errors */}
      {errorMessage &&
        errorMessage !==
          "Directory not found or you do not have access to it!" && (
          <div className="error-message">{errorMessage}</div>
        )}

      {detailsItem && (
        <DetailsPopup item={detailsItem} onClose={closeDetailsPopup} />
      )}

      <DirectoryHeader
        isPublic={isPublic}
        path={path}
        directoryName={directoryName}
        onCreateFolderClick={() => setShowCreateDirModal(true)}
        onUploadFilesClick={() => fileInputRef.current.click()}
        fileInputRef={fileInputRef}
        handleFileSelect={handleFileSelect}
        // Disable if the user doesn't have access
        disabled={
          errorMessage ===
          "Directory not found or you do not have access to it!"
        }
      />

      {/* Create Directory Modal */}
      {showCreateDirModal && (
        <CreateDirectoryModal
          newDirname={newDirname}
          setNewDirname={setNewDirname}
          onClose={() => setShowCreateDirModal(false)}
          onCreateDirectory={handleCreateDirectory}
        />
      )}

      {/* Rename Modal */}
      {showRenameModal && (
        <RenameModal
          renameType={renameType}
          renameValue={renameValue}
          setRenameValue={setRenameValue}
          onClose={() => setShowRenameModal(false)}
          onRenameSubmit={handleRenameSubmit}
        />
      )}

      {combinedItems.length === 0 ? (
        // Check if the error is specifically the "no access" error
        errorMessage ===
        "Directory not found or you do not have access to it!" ? (
          <p className="no-data-message">
            Directory not found or you do not have access to it!
          </p>
        ) : (
          <p className="no-data-message">
            This folder is empty. Upload files or create a folder to see some
            data.
          </p>
        )
      ) : (
        <DirectoryList
          isPublic={isPublic}
          openDetailsPopup={openDetailsPopup}
          handleUnpublicDirectory={handlePublicDirectory}
          handleUnpublicFile={handlePublicFile}
          handleShareDirectory={handlePublicDirectory}
          handleShareFile={handlePublicFile}
          adminView={adminView}
          items={combinedItems}
          handleRowClick={handleRowClick}
          activeContextMenu={activeContextMenu}
          contextMenuPos={contextMenuPos}
          handleContextMenu={handleContextMenu}
          getFileIcon={getFileIcon}
          isUploading={isUploading}
          progressMap={progressMap}
          handleCancelUpload={handleCancelUpload}
          handleDeleteFile={handleDeleteFile}
          handleDeleteDirectory={handleDeleteDirectory}
          openRenameModal={openRenameModal}
          BASE_URL={BASE_URL}
        />
      )}

      <SharePopUp
        setShowSharePopup={setShowSharePopup}
        showSharePopup={showSharePopup}
        textToCopy={publicPath}
      />
    </div>
  );
}

export default DirectoryView;
