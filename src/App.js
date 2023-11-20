import React, {useEffect, useState, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import useAuth from "./hooks/useAuth"

import Layout from './components/Layout'
import Home from './components/Home';
import Categories from './components/Categories';
import Stream from './components/Stream';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Forbidden from './components/Forbidden';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[2000]}/>}>

            <Route path={"/"} element={<Layout/>}>

              <Route path={"/"} exact element={<Home/>}/>
              <Route path={"/categories/*"} exact element={<Categories/>}/>
              <Route path={"/:streamId"} exact element={<Stream/>}/>

              <Route path={"*"} exact element={<Forbidden/>}/>

            </Route>

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
