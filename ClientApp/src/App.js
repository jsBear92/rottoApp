import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Layout from "./components/Layout";
import Todo from "./components/Todo";
import MapApp from "./components/MapApp";

import './custom.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todo" element={<Todo />} />
          <Route path="map" element={<MapApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;