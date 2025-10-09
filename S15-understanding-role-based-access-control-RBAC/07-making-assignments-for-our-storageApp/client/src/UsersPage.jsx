import { useEffect, useState } from "react";
import "./UsersPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import DeletePopup from "./components/DeletePopup";

export default function UsersPage() {
  const { user: userData } = useUser();
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [Role, setRole] = useState("");

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const logoutUser = async (user) => {
    const { id, email } = user;
    const confirmation = confirm(`You are about to logout ${email}`);
    if (!confirmation) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/logout/user/${id}`,
        { method: "POST", credentials: "include" }
      );

      if (res.status === 200) {
        fetchUsers();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, isLoggedIn: false } : user
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchUsers() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 403) {
        navigate("/");
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        console.log(response);
      }
    } catch (err) {
      navigate("/login");
      console.error("Error fetching user info:", err);
    }
  }

  const recoverUser = async (user) => {
    const { id, email } = user;
    const confirmation = confirm(`You are about to recover a user ${email}`);
    if (!confirmation) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/recover/user/${id}`,
        {
          credentials: "include",
          method: "PATCH",
        }
      );
      if (res.status === 201) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userData.role !== "Owner") {
      setUsers(users.filter((user) => !user.isDeleted));
    }
  }, [userData]);

  const getRoles = (user) => {
    const roles =
      user === 3
        ? [{ roleName: "Owner", role: 3 }]
        : user.role === 2
        ? [
            { roleName: "Demote Manager", role: 1 },
            { roleName: "Demote User", role: 0 },
          ]
        : user.role === 1
        ? [
            { roleName: "Promote Admin", role: 2 },
            { roleName: "Demote User", role: 0 },
          ]
        : user === 0
        ? [
            { roleName: "Promote Manager", role: 1 },
            { roleName: "Promote Admin", role: 2 },
          ]
        : [
            { roleName: "Promote Manager", role: 1 },
            { roleName: "Promote Admin", role: 2 },
          ];

    return roles;
  };

  const getRoleName = (role) => {
    const roleName =
      role === 3
        ? "Owner"
        : role === 2
        ? "Admin"
        : role === 1
        ? "Manager"
        : "User";

    return roleName;
  };

  const changeUserRole = async (user, newRole) => {
    const { id, role } = user;

    const confirmation = confirm(
      `You are about to change user role from ${getRoleName(
        role
      )} to ${getRoleName(newRole)}`
    );

    if (!confirmation) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/change/role/user/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            role: newRole,
          },
        }
      );

      if (res.status === 201) {
        fetchUsers();
        setRole("");
      } else {
        console.log("Error while changing user role! response: ", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="users-container">
        <h1 className="title">All Users</h1>
        <p>
          {userData.name}: {getRoleName(userData.role)}
        </p>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              {userData.role > 1 ? (
                <>
                  <th></th>
                  <th></th>
                </>
              ) : (
                <th></th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.name} ({getRoleName(user.role)})
                </td>
                <td>
                  <Link
                    id="user-link"
                    to={`/admin/user/directory/${user.rootDirId}`}>
                    {user.email}
                  </Link>
                </td>
                <td>{user.isLoggedIn ? "Logged In" : "Logged Out"}</td>
                {userData.role > 1 ? (
                  <>
                    <td>
                      <button
                        className="logout-button"
                        onClick={() => logoutUser(user)}
                        disabled={
                          !user.isLoggedIn || userData.role <= user.role
                        }>
                        Logout
                      </button>
                    </td>
                    {user.isDeleted ? (
                      <td>
                        <button
                          className="logout-button recover-btn"
                          onClick={() => recoverUser(user)}
                          disabled={userData.role === user.role}>
                          Recover
                        </button>
                      </td>
                    ) : (
                      <td>
                        <button
                          className="logout-button delete-btn"
                          onClick={() => {
                            setUser(user);
                            setShowPopup(true);
                          }}
                          disabled={userData.role <= user.role}>
                          Delete
                        </button>
                        <select
                          value={Role}
                          onChange={(e) => {
                            const role = JSON.parse(e.target.value).role;
                            changeUserRole(user, role);
                          }}
                          disabled={userData.role <= user.role}
                          name="select-permission"
                          id="permission-tab">
                          <option value="" hidden>
                            Change Role
                          </option>
                          {getRoles(user)?.map((role, i) => (
                            <option key={i} value={JSON.stringify(role)}>
                              {role.roleName}
                            </option>
                          ))}
                        </select>
                      </td>
                    )}
                  </>
                ) : (
                  <td>
                    <button
                      className="logout-button"
                      onClick={() => logoutUser(user)}
                      disabled={!user.isLoggedIn || userData.role <= user.role}>
                      Logout
                    </button>
                    {userData.role === 1 ? (
                      <select
                        value={Role}
                        onChange={(e) => {
                          const role = JSON.parse(e.target.value).role;
                          changeUserRole(user, role);
                        }}
                        // disabled={userData.email === user.email}
                        name="select-permission"
                        id="permission-tab">
                        <option value="" hidden>
                          Change Role
                        </option>
                        {getRoles(user)?.map((role, i) => (
                          <option key={i} value={JSON.stringify(role)}>
                            {role.roleName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      ""
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <DeletePopup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          user={user}
          fetchUsers={fetchUsers}
        />
      </div>
    </>
  );
}
