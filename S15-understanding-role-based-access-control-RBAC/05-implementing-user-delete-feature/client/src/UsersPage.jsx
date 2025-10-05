import { useEffect, useState } from "react";
import "./UsersPage.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

export default function UsersPage() {
  const { user: userData } = useUser();
  const [users, setUsers] = useState([]);
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

  const deleteUser = async (user) => {
    const { id, email } = user;
    const confirmation = confirm(`You are about to delete a user ${email}`);
    if (!confirmation) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/delete/user/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.status === 200) {
        fetchUsers();
      } else {
        console.log("Error while deleting the user! response: ", res);
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="users-container">
        <h1 className="title">All Users</h1>
        <p>
          {userData.name}: {userData.role}
        </p>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              {userData.role === "Admin" ? (
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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isLoggedIn ? "Logged In" : "Logged Out"}</td>
                {userData.role === "Admin" ? (
                  <>
                    <td>
                      <button
                        className="logout-button"
                        onClick={() => logoutUser(user)}
                        disabled={
                          !user.isLoggedIn || userData.email === user.email
                        }>
                        Logout
                      </button>
                    </td>
                    <td>
                      <button
                        className="logout-button delete-btn"
                        onClick={() => deleteUser(user)}
                        disabled={userData.email === user.email}>
                        Delete
                      </button>
                    </td>
                  </>
                ) : (
                  <td>
                    <button
                      className="logout-button"
                      onClick={() => logoutUser(user)}
                      disabled={
                        !user.isLoggedIn || userData.email === user.email
                      }>
                      Logout
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
