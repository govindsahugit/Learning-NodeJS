import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const ServeDir = ({ url, dir }) => {
  const [itemList, setItemList] = useState([]);

  const fileRef = useRef();
  const [progress, setProgress] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost/${url}`, true);
    xhr.setRequestHeader("filename", file.name);
    xhr.addEventListener("load", (e) => {
      setProgress(xhr.response);
    });
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(`${Math.floor((e.loaded / e.total) * 100)}%`);
      setTimeout(() => {
        setProgress("");
        fetchData();
      }, 1000);
    });
    xhr.send(file);
  };

  const fetchData = async () => {
    const res = await fetch(`http://localhost/${url}`);
    const data = await res.json();
    setItemList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <input ref={fileRef} type="file" onChange={uploadFile} />
      </div>
      <span>{progress}</span>
      <ul>
        {itemList.map((item, i) => (
          <li key={i}>
            <span>{item}</span>{" "}
            <a
              href={
                item.includes(".")
                  ? `http://localhost${dir}/${item}?action=open`
                  : item
              }>
              open
            </a>
            {item.includes(".") ? (
              <a href={`http://localhost${dir}/${item}?action=download`}>
                download
              </a>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServeDir;
