import React from "react";

const DeletePopup = ({ user, showPopup, setShowPopup, fetchUsers }) => {
  const handleSoftDelete = async (user) => {
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
        await fetchUsers();
        location.reload();
      } else {
        console.log("Error while deleting the user! response: ", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHardDelete = async (user) => {
    const { id, email } = user;
    const confirmation = confirm(`You are about to delete a user ${email}`);
    if (!confirmation) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/hard/delete/user/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.status === 200) {
        await fetchUsers();
        location.reload();
      } else {
        console.log("Error while deleting the user! response: ", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="delete-popup"
      onClick={() => setShowPopup(false)}
      style={{ display: `${showPopup ? "flex" : "none"}` }}>
      <div className="popup" onClick={() => setShowPopup(true)}>
        <div className="buttons">
          <button
            onClick={() => handleSoftDelete(user)}
            className="soft-delete">
            SOFT DELETE
          </button>
          <button
            className="hard-delete"
            onClick={() => handleHardDelete(user)}>
            HARD DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
