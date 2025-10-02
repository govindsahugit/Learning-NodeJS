import { useEffect, useState } from "react";
import "./UsersPage.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const logoutUser = (userId) => {
    alert(`Logging out user with ID: ${userId}`);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isLoggedIn: false } : user
      )
    );
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          // Handle other error statuses if needed
          console.error("Error fetching users info:", response.status);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="users-container">
      <h1 className="title">All Users</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isLoggedIn ? "Logged In" : "Logged Out"}</td>
              <td>
                <button
                  className="logout-button"
                  onClick={() => logoutUser(user.id)}
                  disabled={!user.isLoggedIn}>
                  Logout
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
