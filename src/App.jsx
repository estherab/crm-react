import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { useState } from "react";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NewClient from "./pages/NewClient";
import EditClient from "./pages/EditClient";
import SeeClient from "./pages/SeeClient";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Layout />}></Route>
        <Route path='/clientes' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nuevo" element={<NewClient />} />
          <Route path="editar/:id" element={<EditClient />} />
          <Route path=":id" element={<SeeClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


