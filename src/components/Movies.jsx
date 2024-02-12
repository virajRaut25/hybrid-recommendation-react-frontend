import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import SkeletonSlider from "./SkeletonSlider";
import HistoryContext from "../context/HistoryContext";
import Modal from "./Modal";

const host = import.meta.env.VITE_FLASK_API;
export default function Movies() {
  const { details } = useContext(HistoryContext);
  const [topMovies, setTopMovies] = useState([]);
  const [action, setAction] = useState([]);
  const [sciFi, setSciFi] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [comedy, setComedy] = useState([]);
  useEffect(() => {
    fetch(`${host}/topm`)
      .then((response) => response.json())
      .then((data) => setTopMovies(data));
    fetch(`${host}/mvgenre/Action`)
      .then((response) => response.json())
      .then((data) => setAction(data));
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
  return (
    <MoviesCss>
      <Modal details={details} />
      <div className="container-fluid">
        {topMovies.length ? (
          <Slider heading={"Top Movies"} jsonObj={topMovies} />
        ) : (
          <SkeletonSlider />
        )}
        {action.length ? (
          <Slider heading={"Action Movies"} jsonObj={action} />
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
    </MoviesCss>
  );
}

const MoviesCss = styled.div`
  margin-top: 6rem;
`;
