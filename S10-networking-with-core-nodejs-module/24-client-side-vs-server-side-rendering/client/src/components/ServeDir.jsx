import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ServeDir = ({ url, dir }) => {
  const [itemList, setItemList] = useState([]);

  const mainUrl = window.location.href;
  console.log(mainUrl);

  const fetchData = async () => {
    const res = await fetch(`http://localhost/${url}`);
    const data = await res.json();
    setItemList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
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
  );
};

export default ServeDir;
