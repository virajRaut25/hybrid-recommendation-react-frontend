import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import likedThumb from "../assets/thumbsUp.png";
import HistoryContext from "../context/HistoryContext";

export default function Modal({ details }) {
  const { userItem, setUserItem } = useContext(HistoryContext);
  const expressHost = import.meta.env.VITE_EXPRESS_API;
  const liked = document.querySelector(".liked-thumb");

  useEffect(() => {
    try {
      liked.classList.remove("liked");
      if (localStorage.getItem("token")) {
        if (userItem.liked.includes(details.title)) {
          try {
            liked.classList.add("liked");
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [details]);

  const handleClose = () => {
    const yt = document.querySelector(".embed-responsive-item");
    try {
      yt.setAttribute(
        "src",
        `https://www.youtube.com/embed/${details.trailer}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked.classList.contains("liked")) {
        liked.classList.remove("liked");
        if (localStorage.getItem("token")) {
          const response = await fetch(
            `${expressHost}/api/history/delLike/${details.title}`,
            {
              method: "POST",
              headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            }
          );
          const res = await response.json();
          setUserItem(res);
        }
      } else {
        liked.classList.add("liked");
        if (localStorage.getItem("token")) {
          const response = await fetch(
            `${expressHost}/api/history/addLike/${details.title}`,
            {
              method: "POST",
              headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            }
          );
          const res = await response.json();
          setUserItem(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalCss>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="exampleModalLabel">
                {details.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="yt-video video-body">
                <div className="ratio ratio-16x9">
                  {details.trailer === null ? (
                    <div className="nyt fs-4">Video Not Available</div>
                  ) : (
                    <iframe
                      className="embed-responsive-item"
                      title={details.title}
                      src={`https://www.youtube.com/embed/${details.trailer}`}
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>

              <div className="description d-flex justify-content-center align-items-center">
                <div className="left-sec">
                  <div className="upper d-flex align-items-center">
                    <div className="liked-thumb">
                      <img src={likedThumb} alt="Like" onClick={handleLike} />
                    </div>
                    <div className="runtime fs-5">
                      {details.runtime
                        ? Math.floor(details.runtime / 60) +
                          "h " +
                          (details.runtime % 60) +
                          "m"
                        : ""}
                    </div>
                  </div>
                  <div className="content-overview fw-semibold fs-5">
                    <div className="des-txt">About this {details.type}: </div>{" "}
                    {details.overview}
                  </div>
                </div>
                <div className="content-des fs-5">
                  <div className="des">
                    <span className="des-txt">Genres: </span>
                    {details.genres.length ? (
                      details.genres.map((genre, index) => {
                        return (
                          <span key={index} className="fw-semibold">
                            {(index ? ", " : " ") + genre}
                          </span>
                        );
                      })
                    ) : (
                      <span className="fw-semibold">Unknown</span>
                    )}
                  </div>
                  <div className="des">
                    <span className="des-txt">Cast: </span>
                    {details.cast.length ? (
                      details.cast.map((cast, index) => {
                        return (
                          <span className="fw-semibold" key={index}>
                            {(index ? ", " : " ") + cast}
                          </span>
                        );
                      })
                    ) : (
                      <span className="fw-semibold">Unknown</span>
                    )}
                  </div>
                  <div className="des">
                    <span className="des-txt">Director: </span>
                    {details.crew.length ? (
                      details.crew.map((crew, index) => {
                        return (
                          <span key={index} className="fw-semibold">
                            {(index ? ", " : " ") + crew}
                          </span>
                        );
                      })
                    ) : (
                      <span className="fw-semibold">Unknown</span>
                    )}
                  </div>
                  <div className="des">
                    <span className="des-txt">This {details.type} is: </span>
                    {details.keywords.length ? (
                      details.keywords
                        .filter((keyword, index) => index < 4)
                        .map((keyword, index) => {
                          return (
                            <span key={index} className="fw-semibold">
                              {(index ? ", " : " ") + keyword}
                            </span>
                          );
                        })
                    ) : (
                      <span className="fw-semibold">Unknown</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalCss>
  );
}

const ModalCss = styled.div`
  .modal-content {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .liked {
    background: #b7b7b75e;
  }

  .modal-body {
    padding-top: 0;
  }

  .btn-close {
    filter: invert(1);
    border: 3px solid #00c4ff;
    border-radius: 12px;
  }

  .modal-header {
    border-bottom: None;
  }

  .left-sec,
  .content-des {
    height: 100%;
    width: 100%;
    margin: 0.6rem;
  }

  .nyt {
    text-align: center;
    margin-top: 25%;
  }

  .upper {
    position: relative;
    bottom: 2px;
  }

  .liked-thumb {
    display: inline-block;
    border: 2px solid grey;
    padding: 5px;
    border-radius: 5rem;
    margin-right: 1rem;
  }

  .liked-thumb:hover {
    background: #b7b7b75e;
    transform: scale(1.2);
  }

  .liked-thumb > img {
    filter: invert(1);
    display: block;
    width: 3rem;
    height: auto;
  }

  .des {
    margin: 7px 7px;
  }

  .des-txt {
    color: #b7b7b7;
  }
`;
