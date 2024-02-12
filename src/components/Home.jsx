import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import SkeletonSlider from "./SkeletonSlider";
import HistoryContext from "../context/HistoryContext";
import Modal from "./Modal";

const host = import.meta.env.VITE_FLASK_API;
export default function Home() {
  const { userItem, getUserItem, details, genre, getGenreDay } =
    useContext(HistoryContext);
  const [topMovies, setTopMovies] = useState([]);
  const [topShows, setTopShows] = useState([]);
  const [action, setAction] = useState([]);
  const [crime, setCrime] = useState([]);
  const [drama, setDrama] = useState([]);
  const [sciFi, setSciFi] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [searchCF, setSearchCF] = useState(["None"]);
  const [searchCB, setSearchCB] = useState(["None"]);
  const [likeCF, setLikeCF] = useState(["None"]);
  const [likeCB, setLikeCB] = useState(["None"]);
  const [genreDay, setGenreDay] = useState(["None"]);
  const sH = userItem.search_history;
  const lH = userItem.liked;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserItem();
    }
    if (localStorage.getItem("topm")) {
      setTopMovies(JSON.parse(localStorage.getItem("topm")));
    } else {
      fetch(`${host}/topm`)
        .then((response) => response.json())
        .then((data) => {
          setTopMovies(data);
          localStorage.setItem("topm", JSON.stringify(data));
        });
    }
    fetch(`${host}/toptv`)
      .then((response) => response.json())
      .then((data) => setTopShows(data));
    fetch(`${host}/mvgenre/Action`)
      .then((response) => response.json())
      .then((data) => setAction(data));
    fetch(`${host}/tvgenre/Crime`)
      .then((response) => response.json())
      .then((data) => setCrime(data));
    fetch(`${host}/tvgenre/Drama`)
      .then((response) => response.json())
      .then((data) => setDrama(data));
    fetch(`${host}/mvgenre/Sci-Fi`)
      .then((response) => response.json())
      .then((data) => setSciFi(data));
    fetch(`${host}/mvgenre/Comedy`)
      .then((response) => response.json())
      .then((data) => setComedy(data));
    fetch(`${host}/mvgenre/Mystery`)
      .then((response) => response.json())
      .then((data) => setMystery(data));
  }, []);

  const searchInvoke = async () => {
    setSearchCF([]);
    setSearchCB([]);
    if (localStorage.getItem("token")) {
      const searchHistory = userItem.search_history;
      let len = 0;
      try {
        len = searchHistory.length;
      } catch (error) {
        console.log(error);
      }
      if (len == 0) {
        setSearchCB(["None"]);
        setSearchCF(["None"]);
        return;
      }
      for (let i = 0; i < len; i++) {
        const response = await fetch(
          `${host}/recommend_cf/${searchHistory[i]}`
        );
        const res = await response.json();
        if (res.length) {
          setSearchCF(res);
          break;
        } else if (i == len - 1) setSearchCF(["None"]);
      }

      for (let i = 0; i < len; i++) {
        const response = await fetch(
          `${host}/recommend_cb/${searchHistory[i]}`
        );
        const res = await response.json();
        if (res.length) {
          setSearchCB(res);
          break;
        } else if (i == len - 1) setSearchCB(["None"]);
      }
    } else {
      setSearchCB(["None"]);
      setSearchCF(["None"]);
    }
  };

  const likedInvoke = async () => {
    setLikeCF([]);
    setLikeCB([]);
    if (localStorage.getItem("token")) {
      const likeHistory = userItem.liked;
      let len = 0;
      try {
        len = likeHistory.length;
      } catch (error) {
        console.log(error);
      }
      if (len == 0) {
        setLikeCB(["None"]);
        setLikeCF(["None"]);
        return;
      }
      for (let i = 0; i < len; i++) {
        const response = await fetch(`${host}/recommend_cf/${likeHistory[i]}`);
        const res = await response.json();
        if (res.length) {
          setLikeCF(res);
          break;
        } else if (i == len - 1) setLikeCF(["None"]);
      }

      for (let i = 0; i < len; i++) {
        const response = await fetch(`${host}/recommend_cb/${likeHistory[i]}`);
        const res = await response.json();
        if (res.length) {
          setLikeCB(res);
          break;
        } else if (i == len - 1) setLikeCB(["None"]);
      }
    } else {
      setLikeCB(["None"]);
      setLikeCF(["None"]);
    }
  };

  // const genreDayInvoke = async () => {
  //   setGenreDay([]);
  //   if (localStorage.getItem("token")) {
  //     const today = new Date().toLocaleString("en-us", { weekday: "short" });
  //     let gL = [];
  //     try {
  //       let day = userItem.weekday[today];
  //       gL = [...Object.keys(day)].filter((e, i) => i < 2);
  //       gL = JSON.stringify(gL);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     if (gL.length == 0) {
  //       setGenreDay(["None"]);
  //       return;
  //     }
  //     try {
  //       await fetch(`${host}/genre/${gL}`)
  //         .then((response) => response.json())
  //         .then((data) => setGenreDay(data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     setGenreDay(["None"]);
  //   }
  // };

  const genreDayInvoke = async () => {
    setGenreDay([]);
    if (localStorage.getItem("token")) {
      if (genre.length == 0) {
        setGenreDay(["None"]);
        return;
      }
      try {
        await fetch(`${host}/genre/${JSON.stringify(genre)}`)
          .then((response) => response.json())
          .then((data) => setGenreDay(data));
      } catch (error) {
        console.log(error);
      }
    } else {
      setGenreDay(["None"]);
    }
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("token")) searchInvoke();
    } catch (error) {
      console.error(error);
    }
  }, [JSON.stringify(sH)]);

  useEffect(() => {
    try {
      if (localStorage.getItem("token")) likedInvoke();
    } catch (error) {
      console.error(error);
    }
  }, [JSON.stringify(lH)]);

  useEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        getGenreDay();
        genreDayInvoke();
      }
    } catch (error) {
      console.error(error);
    }
  }, [genre]);

  return (
    <HomeCss>
      <Modal details={details} />
      <div className="container-fluid">
        {topMovies.length ? (
          <Slider heading={"Popular Movies"} jsonObj={topMovies} />
        ) : (
          <SkeletonSlider />
        )}
        {topShows.length ? (
          <Slider heading={"Popular TV Shows"} jsonObj={topShows} />
        ) : (
          <SkeletonSlider />
        )}
        {genreDay.length > 1 ? (
          <Slider
            heading={`${new Date().toLocaleString("en-us", {
              weekday: "long",
            })} Picks: Your Recommendations!`}
            jsonObj={genreDay}
          />
        ) : genreDay.length == 1 ? (
          ""
        ) : (
          <SkeletonSlider />
        )}
        {likeCB.length > 1 ? (
          <Slider heading={"Based on your recent likes"} jsonObj={likeCB} />
        ) : likeCB.length == 1 ? (
          ""
        ) : (
          <SkeletonSlider />
        )}
        {likeCF.length > 1 ? (
          <Slider
            heading={`People who liked ${likeCF[0].title} also liked`}
            jsonObj={likeCF}
          />
        ) : likeCF.length == 1 ? (
          ""
        ) : (
          <SkeletonSlider />
        )}
        {searchCB.length > 1 ? (
          <Slider
            heading={`Similar to ${searchCB[0].title}`}
            jsonObj={searchCB}
          />
        ) : searchCB.length == 1 ? (
          ""
        ) : (
          <SkeletonSlider />
        )}
        {searchCF.length > 1 ? (
          <Slider
            heading={`People who searched ${searchCF[0].title} also explored`}
            jsonObj={searchCF}
          />
        ) : searchCF.length == 1 ? (
          ""
        ) : (
          <SkeletonSlider />
        )}
        {action.length ? (
          <Slider heading={"Blockbuster Action Movies"} jsonObj={action} />
        ) : (
          <SkeletonSlider />
        )}
        {crime.length ? (
          <Slider heading={"TV Crime"} jsonObj={crime} />
        ) : (
          <SkeletonSlider />
        )}
        {drama.length ? (
          <Slider heading={"TV Drama"} jsonObj={drama} />
        ) : (
          <SkeletonSlider />
        )}
        {sciFi.length ? (
          <Slider heading={"Futuristic Sci-Fi"} jsonObj={sciFi} />
        ) : (
          <SkeletonSlider />
        )}
        {comedy.length ? (
          <Slider heading={"Comedy Movies"} jsonObj={comedy} />
        ) : (
          <SkeletonSlider />
        )}
        {mystery.length ? (
          <Slider heading={"Suspenseful Movies"} jsonObj={mystery} />
        ) : (
          <SkeletonSlider />
        )}
      </div>
    </HomeCss>
  );
}

const HomeCss = styled.div`
  margin-top: 6rem;
`;
