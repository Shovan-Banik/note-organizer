import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import AddNote from "../Pages/AddNote/AddNote";
import MyNotes from "../Pages/MyNotes/MyNotes";
import PrivateRoute from "./PrivateRoute";
import UpdateNote from "../Pages/UpdateNote/UpdateNote";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'signIn',
                element: <SignIn></SignIn>
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            },
            {
                path:'addNote',
                element:<PrivateRoute><AddNote></AddNote></PrivateRoute>
            },
            {
                path:'myNotes',
                element:<PrivateRoute><MyNotes></MyNotes></PrivateRoute>
            },
            {
                path: 'updateNote/:id',
                element: <PrivateRoute><UpdateNote></UpdateNote></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/notes/${params.id}`)

            }
        ]
    },
]);
export default router;