import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ServeDir = () => {
  const [itemList, setItemList] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [files, setFiles] = useState([]);

  const fileRef = useRef();
  const [progress, setProgress] = useState("");

  const [rename, setRename] = useState("");
  const [newName, setNewname] = useState("");

  const [newFolderName, setNewFolderName] = useState("");

  const { dirId } = useParams();

  const URL = `http://localhost:4000`;

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${URL}/file/${dirId || ""}`, true);
    xhr.setRequestHeader("filename", file.name);
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
    const res = await fetch(`${URL}/directory/${dirId || ""}`);
    const data = await res.json();
    // setItemList(data);
    setDirectories(data.directories);
    setFiles(data.files);
  };

  const handleDelete = async (fileId) => {
    const res = await fetch(`${URL}/file/${fileId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    fetchData();
  };

  const handleRename = async (id) => {
    setNewname(rename);
    const res = await fetch(`${URL}/file/${id}`, {
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
    const res = await fetch(`${URL}/directory/${dirId || ""}`, {
      method: "POST",
      headers: {
        dirname: newFolderName,
      },
    });
    const data = await res.json();
    setNewFolderName("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [dirId]);
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
        {directories.map(({ name: item, id }) => (
          <li key={id}>
            <span>{item}</span>
            <Link to={`/directory/${id}`}>Open</Link>
            <button onClick={() => setRename(item)}>rename</button>
            <button onClick={() => handleRename(id)}>save</button>
            <button onClick={() => handleDelete(id)}>delete</button>
          </li>
        ))}
        {files.map(({ name: item, id }) => (
          <li key={id}>
            <span>{item}</span>
            <Link to={`${URL}/file/${id}`}>Open</Link>
            <Link to={`${URL}/file/${id}?action=download`}>download</Link>
            <button onClick={() => setRename(item)}>rename</button>
            <button onClick={() => handleRename(id)}>save</button>
            <button onClick={() => handleDelete(id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServeDir;
