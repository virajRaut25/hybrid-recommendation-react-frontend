import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import SkeletonSlider from "./SkeletonSlider";
import HistoryContext from "../context/HistoryContext";
import Modal from "./Modal";

const host = import.meta.env.VITE_FLASK_API;

export default function TVShows() {
  const { details } = useContext(HistoryContext);
  const [topShows, setTopShows] = useState([]);
  const [talk, setTalk] = useState([]);
  const [act_adv, setAct_Adv] = useState([]);
  const [sciFi, setSciFi] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [documentary, setDocumentry] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [animation, setAnimation] = useState([]);
  useEffect(() => {
    fetch(`${host}/toptv`)
      .then((response) => response.json())
      .then((data) => setTopShows(data));
    fetch(`${host}/tvgenre/Talk`)
      .then((response) => response.json())
      .then((data) => setTalk(data));
    fetch(`${host}/tvgenre/Action`)
      .then((response) => response.json())
      .then((data) => setAct_Adv(data));
    fetch(`${host}/tvgenre/Sci-Fi`)
      .then((response) => response.json())
      .then((data) => setSciFi(data));
    fetch(`${host}/tvgenre/Comedy`)
      .then((response) => response.json())
      .then((data) => setComedy(data));
    fetch(`${host}/tvgenre/Mystery`)
      .then((response) => response.json())
      .then((data) => setMystery(data));
    fetch(`${host}/tvgenre/Documentary`)
      .then((response) => response.json())
      .then((data) => setDocumentry(data));
    fetch(`${host}/tvgenre/Animation`)
      .then((response) => response.json())
      .then((data) => setAnimation(data));
  }, []);
  return (
    <TVShowsCSS>
      <Modal details={details} />
      <div className="container-fluid">
        {topShows.length ? (
          <Slider heading={"Top Shows"} jsonObj={topShows} />
        ) : (
          <SkeletonSlider />
        )}
        {talk.length ? (
          <Slider heading={"Talk Shows"} jsonObj={talk} />
        ) : (
          <SkeletonSlider />
        )}
        {act_adv.length ? (
          <Slider heading={"TV Action"} jsonObj={act_adv} />
        ) : (
          <SkeletonSlider />
        )}
        {sciFi.length ? (
          <Slider heading={"TV Sci-Fi"} jsonObj={sciFi} />
        ) : (
          <SkeletonSlider />
        )}
        {comedy.length ? (
          <Slider heading={"Comedy Shows"} jsonObj={comedy} />
        ) : (
          <SkeletonSlider />
        )}
        {mystery.length ? (
          <Slider heading={"Suspenseful Shows"} jsonObj={mystery} />
        ) : (
          <SkeletonSlider />
        )}
        {documentary.length ? (
          <Slider heading={"Documentary"} jsonObj={documentary} />
        ) : (
          <SkeletonSlider />
        )}
        {animation.length ? (
          <Slider heading={"TV Animation"} jsonObj={animation} />
        ) : (
          <SkeletonSlider />
        )}
      </div>
    </TVShowsCSS>
  );
}

const TVShowsCSS = styled.div`
  margin-top: 6rem;
`;
