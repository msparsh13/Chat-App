import React from "react";

import Register from "./pages/register";
import Errorbound from "./error/error";
import { createRoot } from "react-dom/client";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Chat from "./pages/chat";
import Login from "./pages/Login";
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Userdetails from "./pages/userdetails";


//react router ki website se pd lena

function App(){


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/chat",
      element: <Chat/>,
    },
    {
      path: "/userdetails",
      element: <Userdetails/>
    }
  ]);
 


  return (
    <Errorbound>
      <RouterProvider router={router} />
  
  </Errorbound>)
}

export default App