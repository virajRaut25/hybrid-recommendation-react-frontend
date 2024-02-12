import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import HistoryContext from "../context/HistoryContext";
import noPoster from "../assets/no-poster.png";
import Modal from "./Modal";

export default function LikedPage() {
  const host = import.meta.env.VITE_FLASK_API;
  const [loading, setLoading] = useState(false);
  let arr = [...Array(8).keys()];
  const { userItem, details, getUserItem, handleDetail } =
    useContext(HistoryContext);
  const [likedContent, setLikedContent] = useState([]);
  const lH = userItem.liked;
  const getLikedContent = async () => {
    if (lH == undefined) return;
    try {
      setLoading(true);
      await fetch(`${host}/getContents/${JSON.stringify(lH)}`)
        .then((response) => response.json())
        .then((data) => setLikedContent(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserItem();
  }, []);
  useEffect(() => {
    getLikedContent();
  }, [JSON.stringify(lH)]);

  return (
    <LikedPageCss>
      <Modal details={details} />
      <div className="heading fs-3">Your Liked Movies & TV Shows</div>
      <div className="mt-5 d-flex justify-content-center align-items-center flex-wrap">
        {likedContent.length ? (
          likedContent.map((content, index) => {
            return (
              <img
                key={index}
                src={content.poster ? content.poster : noPoster}
                alt={content.title}
                className="content-img"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleDetail(content.id)}
              />
            );
          })
        ) : loading ? (
          arr.map((index) => {
            return <div key={index} className="loading-img" />;
          })
        ) : (
          <div className="text-center no-res">No Liked Content</div>
        )}
      </div>
    </LikedPageCss>
  );
}

const LikedPageCss = styled.div`
  margin-top: 7rem;
  margin-bottom: 3rem;

  .heading{
    margin-left: 2rem;
  }

  .loading-img {
    margin: 1px;
    display: block;
    width: 400px;
    height: 550px;
    background: #eee;
    background: linear-gradient(110deg, #333 34%, #1e1e1e 60%, #333 60%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }

  .no-res {
    margin-top: 4rem;
    font-size: 5rem;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: -5px -6px 10px white;
  }

  .content-img,
  .loading-image {
    display: block;
    margin: 1px;
    border: 2px solid grey;
    width: 20%;
    height: auto;
    transition: all 0.2s ease;
  }

  .content-img:hover {
    border: 2px solid rgba(176, 7, 16, 0.8);
    box-shadow: 0 0 10px rgba(176, 7, 16, 1);
    transform: scale(1.1);
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;
