import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Movies from "./components/Movies.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/Signup.jsx";
import TVShows from "./components/TVShows.jsx";
import Search from "./components/Search.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import UserSetting from "./components/UserSetting.jsx";
import LikedPage from "./components/LikedPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="tvshows" element={<TVShows />} />
      <Route path="search" element={<Search />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<UserSetting />} />
      <Route path="likedpage" element={<LikedPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
