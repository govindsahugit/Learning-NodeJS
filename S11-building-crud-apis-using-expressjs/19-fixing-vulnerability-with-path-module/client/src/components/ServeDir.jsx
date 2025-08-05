import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ServeDir = () => {
  const [itemList, setItemList] = useState([]);

  const fileRef = useRef();
  const [progress, setProgress] = useState("");

  const [rename, setRename] = useState("");
  const [newName, setNewname] = useState("");

  const [newFolderName, setNewFolderName] = useState("");

  const { "*": dirPath } = useParams();

  const URL = `http://192.168.1.10:4000`;

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${URL}/files/${dirPath}/${file.name}`, true);
    xhr.addEventListener("load", (e) => {
      setProgress(JSON.parse(xhr.response).message);
      setTimeout(() => {
        setProgress("");
        fetchData();
      }, 500);
    });
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(`${Math.floor((e.loaded / e.total) * 100)}%`);
    });
    xhr.send(file);
  };

  const fetchData = async () => {
    const res = await fetch(
      `${URL}/directory/${dirPath === "" ? "storage" : `storage/${dirPath}`}`
    );
    const data = await res.json();
    setItemList(data);
  };

  const handleDelete = async (filename) => {
    const res = await fetch(`${URL}/files/${dirPath}/${filename}`, {
      method: "DELETE",
    });

    const data = await res.json();
    fetchData();
    console.log(data);
  };

  const handleRename = async (oldname) => {
    setNewname(rename);
    const res = await fetch(`${URL}/files/${dirPath}/${oldname}`, {
      method: "PATCH",
      headers: {
        newName,
      },
    });
    const data = await res.text();
    fetchData();
    setRename("");
  };

  const handleCreateDirectory = async () => {
    const res = await fetch(`${URL}/createdir/${dirPath}/${newFolderName}`, {
      method: "POST",
    });
    const data = await res.json();
    setNewFolderName("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [dirPath]);
  return (
    <>
      <div>
        <input ref={fileRef} type="file" onChange={uploadFile} />
        <input
          type="text"
          value={rename}
          onChange={(e) => {
            setRename(e.target.value);
            setNewname(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="create-dir">Create new folder</label>
        <input
          onChange={(e) => setNewFolderName(e.target.value)}
          value={newFolderName}
          type="text"
          name="dirname"
          id="create-dir"
        />
        <button onClick={() => handleCreateDirectory()}>Create</button>
      </div>
      <p>{progress}</p>
      <ul>
        {itemList.map(({ name: item, isDirectory }, i) => (
          <li key={i}>
            <span>{item}</span>
            {""}
            <Link
              to={
                !isDirectory
                  ? `${URL}/files/${dirPath}/${item}?action=open`
                  : `${item}`
              }>
              open
            </Link>
            {!isDirectory ? (
              <Link to={`${URL}/files/${dirPath}/${item}?action=download`}>
                download
              </Link>
            ) : (
              ""
            )}
            <button onClick={() => setRename(item)}>rename</button>
            <button onClick={() => handleRename(item)}>save</button>
            <button onClick={() => handleDelete(item)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServeDir;
