import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ServeDir from "./components/ServeDir";
import { useRef } from "react";
import { useState } from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServeDir dir={""} url={""} />} />
        <Route
          path="/images"
          element={<ServeDir dir={"/images"} url={"/images"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
