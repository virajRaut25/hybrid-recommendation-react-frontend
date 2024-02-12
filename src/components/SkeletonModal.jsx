import React from "react";
import styled from "styled-components";
import likedThumb from "../assets/thumbsUp.png";

export default function SkeletonModal() {
  return (
    <SkeletonModalCss>
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title loading-content"
                id="exampleModalLabel"
              ></h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="yt-video video-body loading-content">
                <div className="ratio ratio-16x9">
                  <div className="video"></div>
                </div>
              </div>

              <div className="description d-flex justify-content-center align-items-center">
                <div className="left-sec">
                  <div className="upper d-flex align-items-center">
                    <div className="liked-thumb">
                      <img src={likedThumb} alt="Like" />
                    </div>
                    <div className="runtime loading-content"></div>
                  </div>
                  <div className="content-overview">
                    <div className="des-txt loading-content"></div>
                    <div className="txt loading-content"></div>
                    <div className="txt loading-content"></div>
                    <div className="txt last loading-content"></div>
                  </div>
                </div>
                <div className="content-des">
                  <div className="des">
                    <div className="des-txt loading-content"></div>
                    <div className="txt loading-content"></div>
                  </div>
                  <div className="des">
                    <div className="des-txt loading-content"></div>
                    <div className="txt loading-content"></div>
                  </div>
                  <div className="des">
                    <div className="des-txt loading-content"></div>
                    <div className="txt loading-content"></div>
                  </div>
                  <div className="des">
                    <div className="des-txt loading-content"></div>
                    <div className="txt loading-content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonModalCss>
  );
}

const SkeletonModalCss = styled.div`
  .modal-content {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .modal-title {
    height: 2rem;
    width: 35%;
    border-radius: 7px;
  }

  .modal-body {
    padding-top: 0;
  }

  .btn-close {
    filter: invert(1);
  }

  .modal-header {
    border-bottom: None;
  }

  .loading-content {
    background: #eee;
    background: linear-gradient(110deg, #333 34%, #1e1e1e 60%, #333 60%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }

  .yt-video {
    border-radius: 1rem;
  }

  .left-sec,
  .content-des {
    height: 100%;
    width: 100%;
    margin: 0.6rem;
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
  }

  .liked-thumb > img {
    filter: invert(1);
    display: block;
    width: 3rem;
    height: auto;
  }

  .runtime {
    height: 1.4rem;
    width: 40%;
    border-radius: 7px;
  }

  .des-txt {
    margin-top: 1rem;
    border-radius: 7px;
    height: 1.6rem;
    width: 70%;
  }

  .des > .txt {
    width: 100%;
  }

  .txt {
    height: 1.4rem;
    width: 100%;
    border-radius: 7px;
    margin-top: 0.2rem;
  }

  .last {
    width: 55%;
  }

  .des {
    margin: 7px 7px;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;
