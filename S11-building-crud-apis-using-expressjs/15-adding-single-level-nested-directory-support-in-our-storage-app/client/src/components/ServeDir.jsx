import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ServeDir = () => {
  const [itemList, setItemList] = useState([]);

  const fileRef = useRef();
  const [progress, setProgress] = useState("");

  const [rename, setRename] = useState("");
  const [newName, setNewname] = useState("");

  const { "*": dirPath } = useParams();

  console.log(dirPath);

  const URL = `http://192.168.1.10:4000`;

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${URL}/files/${file.name}`, true);
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
    const res = await fetch(`${URL}/directory/${dirPath}`);
    const data = await res.json();
    setItemList(data);
  };

  const handleDelete = async (filename) => {
    const res = await fetch(`${URL}/files/${filename}`, {
      method: "DELETE",
    });

    const data = await res.json();
    fetchData();
    console.log(data);
  };

  const handleRename = async (oldname) => {
    setNewname(rename);
    const res = await fetch(`${URL}/files/${oldname}/${newName}`, {
      method: "PATCH",
    });
    const data = await res.json();
    fetchData();
    setRename("");
  };

  useEffect(() => {
    fetchData();
  }, []);
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
      <p>{progress}</p>
      <ul>
        {itemList.map(({ name: item, isDirectory }, i) => (
          <li key={i}>
            <span>{item}</span>{" "}
            <a href={!isDirectory ? `${URL}/files/${item}?action=open` : item}>
              open
            </a>
            {!isDirectory ? (
              <a href={`${URL}/files/${item}?action=download`}>download</a>
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
