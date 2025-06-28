
import Button from '@mui/material/Button';
import Navbar from "./components/shared/Navbar"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import JobDescription from './components/JobDescription';
import Profile from './components/Profile';
import PostJob from './components/PostJob';
import Companies from './components/Admin/Companies';
import CompanyRegister from './components/Admin/CompanyCreate';
import CompanySetup from './components/Admin/CompanySetup';
import Alljobs from './components/Admin/Jobs';
import JobCreate from './components/Admin/JobCreate';
import './App.css'


const appRouter =  createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/profile",
    element:<Profile/>
 
  },
 ///admin
 {
  path:"/admin/companies",
  element:<Companies/>

 },
 {
  path:"/admin/companies/create",
  element:<CompanyRegister/>

 },
 {
  path:"/admin/companies/:id",
  element:<CompanySetup/>

 },

  {
    path: "post-job",
    element:<PostJob/>
  },
  {
    path:"admin/jobs",
    element:<Alljobs/>
  },

   {
    path:"admin/jobs/create",
    element:<JobCreate/>
  },
 

]);

function App() {
 
 
  return (
    <>
    <RouterProvider router={appRouter}/>
     
        
    
     
    </>
  )
}

export default App
