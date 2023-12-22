import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Main from "../layout/Main";

import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../layout/Dashboard";
import UserProfile from "../pages/Dashboard/UserProfile";
import Create from "../pages/Dashboard/Create";
import List from "../Hooks/UseTask";
import Lists from "../pages/Dashboard/Lists";
import Update from "../pages/Dashboard/Update";




const router = createBrowserRouter([
    {
        path: '/',
        element:<Main></Main> ,
        errorElement:<ErrorPage/>,

        children:
            [
                {
                    path: '/',
                    element: <Home></Home>,

                },
               
                {
                    path: '/about',
                    element: <About></About>,

                },
                {
                    path: '/contact',
                    element: <Contact/>

                },
               
               
                {
                    path: '/login',
                    element: <Login></Login>
                },
                {
                    path: '/register',
                    element: <Register></Register>
                },


            ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

       
          {
            path: 'userProfile',
            element: <UserProfile/>
        },
          {
            path: 'create',
            element: <Create/>,
        },
          {
            path: 'update/:id',
            element: <Update/>,
        },
          {
            path: 'lists',
            element: <Lists/>
        },
         
   
  
        ]
      }

   

])

export default router;