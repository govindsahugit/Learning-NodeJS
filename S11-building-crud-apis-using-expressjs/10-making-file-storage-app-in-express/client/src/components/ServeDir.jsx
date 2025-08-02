import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const ServeDir = ({ url }) => {
  const [itemList, setItemList] = useState([]);

  const fileRef = useRef();
  const [progress, setProgress] = useState("");

  const [rename, setRename] = useState("");
  const [newName, setNewname] = useState("");

  const URL = `http://192.168.1.10:4000`;

  const uploadFile = async (e) => {
    const file = e.target.files[0];

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${URL}/${url}`, true);
    xhr.setRequestHeader("filename", file.name);
    xhr.addEventListener("load", (e) => {
      setProgress(xhr.response);
    });
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(`${Math.floor((e.loaded / e.total) * 100)}%`);
      setTimeout(() => {
        setProgress("");
        fetchData();
      }, 500);
    });
    xhr.send(file);
  };

  const fetchData = async () => {
    const res = await fetch(`${URL}/${url}`);
    const data = await res.json();
    setItemList(data);
  };

  const handleDelete = async (filename) => {
    const res = await fetch(`${URL}/${url}`, {
      method: "DELETE",
      body: JSON.stringify({ filename: filename, url: url }),
    });

    const data = await res.text();
    fetchData();
    console.log(data);
  };

  const handleRename = async (oldname) => {
    setNewname(rename);
    const res = await fetch(`${URL}/${url}`, {
      method: "PATCH",
      body: JSON.stringify({ oldname, newName, url }),
    });
    const data = await res.text();
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
      <span>{progress}</span>
      <ul>
        {itemList.map((item, i) => (
          <li key={i}>
            <span>{item}</span>{" "}
            <a
              href={
                item.includes(".") ? `${URL}/${url}/${item}?action=open` : item
              }>
              open
            </a>
            {item.includes(".") ? (
              <a href={`${URL}/${url}/${item}?action=download`}>download</a>
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
