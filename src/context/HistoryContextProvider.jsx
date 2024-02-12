import React, { useState } from "react";
import HistoryContext from "./HistoryContext";
import detailObj from "../assets/details.json";

const HistoryContextProvider = ({ children }) => {
  const expressHost = import.meta.env.VITE_EXPRESS_API;
  const host = import.meta.env.VITE_FLASK_API;

  const [userItem, setUserItem] = useState({});
  const [details, setDetails] = useState(detailObj);
  const [genre, setGenre] = useState([]);

  const handleDetail = async (id) => {
    await fetch(`${host}/details/${id}`)
      .then((response) => response.json())
      .then((data) => setDetails(data));
  };

  const getUserItem = async () => {
    if (localStorage.getItem("token")) {
      const response = await fetch(`${expressHost}/api/history/`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      setUserItem(res);
    }
  };

  const addGenreDay = async (genreList) => {
    if (localStorage.getItem("token")) {
      const response = await fetch(`${expressHost}/api/history/addGenreDay`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genreList }),
      });

      const res = await response.json();
      setUserItem(res);
    }
  };

  const getGenreDay = async () => {
    if (localStorage.getItem("token")) {
      const today = new Date().toLocaleString("en-us", { weekday: "short" });
      if (
        !localStorage.getItem("today") ||
        localStorage.getItem("today") != today ||
        genre.length == 0
      ) {
        localStorage.setItem("today", today);
        const response = await fetch(`${expressHost}/api/history/getGenreDay`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        const res = await response.json();
        setGenre(res);
      }
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        userItem,
        details,
        genre,
        getUserItem,
        setUserItem,
        handleDetail,
        addGenreDay,
        getGenreDay,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;
