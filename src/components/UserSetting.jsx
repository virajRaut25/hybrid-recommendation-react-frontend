import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import backImg from "../assets/moviecover.jpg";
import noPoster from "../assets/no-poster.png";
import defaultProfile from "../assets/default-profile.png";
import HistoryContext from "../context/HistoryContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function UserSetting() {
  const host = import.meta.env.VITE_FLASK_API;
  const expressHost = import.meta.env.VITE_EXPRESS_API;
  let navigate = useNavigate();
  const { userItem, setUserItem, details, getUserItem, handleDetail } =
    useContext(HistoryContext);
  const [userDetail, setUserDetail] = useState({
    email: "",
    dob: "",
    gender: "",
  });
  const [likedContent, setLikedContent] = useState([]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImg");
    alert("Successfully Logout");
    navigate("/");
  };

  const sH = userItem.search_history;
  const lH = userItem.liked;

  const getUserDetail = async () => {
    const response = await fetch(`${expressHost}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    setUserDetail(res);
  };

  const handleClear = async () => {
    const response = await fetch(`${expressHost}/api/history/delHistory`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    setUserItem(res);
  };

  const getLikedContent = async () => {
    if (lH == undefined) return;
    try {
      await fetch(`${host}/getContents/${JSON.stringify(lH)}`)
        .then((response) => response.json())
        .then((data) => setLikedContent(data));
    } catch (error) {
      console.log(error);
    }
  };

  const imageUpload = (e) => {
    const fr = new FileReader();
    const file = e.target.files[0];
    fr.readAsDataURL(file);
    fr.addEventListener("load", () => {
      const url = fr.result;
      localStorage.setItem("profileImg", url);
    });
  };

  useEffect(() => {
    getUserItem();
    getUserDetail();
  }, []);

  useEffect(() => {
    getLikedContent();
  }, [JSON.stringify(lH)]);

  return (
    <>
      <Modal details={details} />
      <UserSettingCss>
        <div className="outerContainer">
          <div className="innerContainer d-flex">
            <div className="leftSection d-flex flex-column align-items-center">
              <div className="avatarDiv">
                <div className="avatar">
                  <label htmlFor="fileImage" className="labelFileImage">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    id="fileImage"
                    accept="image/*"
                    onChange={imageUpload}
                  />
                  <img
                    src={
                      localStorage.getItem("profileImg")
                        ? localStorage.getItem("profileImg")
                        : defaultProfile
                    }
                    alt={userDetail.email[0]}
                    id="profilePic"
                  />
                </div>
              </div>
              <div className="greetUser">
                Hello,{" "}
                {userDetail.email.substring(0, userDetail.email.indexOf("@"))}
              </div>
              <div className="email">
                E-mail: <span className="showEmail">{userDetail.email}</span>
              </div>
              <div className="showDob">
                <label htmlFor="dob">DOB:</label>{" "}
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={userDetail.dob.substring(0, 10)}
                  readOnly={true}
                />
              </div>
              <div className="showGender d-flex justify-content-center align-items-center">
                <label htmlFor="gender">Gender:</label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  id="gender"
                  name="gender"
                  readOnly={true}
                  disabled={true}
                  defaultValue={userDetail.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button className="btn btn-danger mt-4" onClick={handleLogout}>
                Log Out
              </button>
            </div>
            <div className="rightSection">
              <div className="heading">User History</div>
              <div className="searchHistory">
                <div className="innerHeading">Your Search History</div>
                {sH.length ? (
                  <>
                    <div className="shList">
                      <ul className="menu">
                        {sH &&
                          sH.map((name, index) => (
                            <li key={index} className="item">
                              {name}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={handleClear}
                    >
                      Clear History
                    </button>
                  </>
                ) : (
                  <div className="nosearchhis fs-5 mt-4 mb-4">
                    No Search History
                  </div>
                )}
              </div>
              <div className="likedHistory">
                <div className="innerHeading">
                  Your Recently Liked Movies & TV Shows
                </div>
                <div className="likedContent mt-2 d-flex flex-wrap">
                  {likedContent.length ? (
                    <div className="d-flex flex-wrap">
                      {likedContent
                        .filter((e, index) => index < 4)
                        .map((content, index) => {
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
                        })}
                      <button
                        className="seeMoreLiked"
                        onClick={() => {
                          navigate("/likedpage");
                        }}
                      >
                        <span className="rotateText">See All</span>
                      </button>
                    </div>
                  ) : (
                    <div className="no-like">Nothing to Show</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserSettingCss>
    </>
  );
}

const UserSettingCss = styled.div`
  background: url(${backImg}) no-repeat center center fixed;
  background-size: cover;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;

  .outerContainer {
    height: 100vh;
    width: 100vw;
    padding-top: 5.5rem;
    padding-bottom: 1.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  .innerContainer {
    height: 100%;
    width: 100%;
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.8);
  }

  .leftSection {
    height: fit-content;
    margin: auto;
    position: relative;
    bottom: 2.5rem;
    width: 35%;
    border-radius: inherit;
  }

  .avatarDiv {
    margin: 1rem;
    box-shadow: 0px 0px 8px 4px rgb(209, 60, 60);
    height: 15rem;
    width: 15rem;
    border-radius: 25rem;
    position: relative;
    overflow: hidden;
  }

  .labelFileImage {
    width: fit-content;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.6);
    visibility: hidden;
    transition: 3s ease-in all;
  }

  #fileImage,
  .labelFileImage {
    width: 100%;
    text-align: center;
    padding-bottom: 13px;
    padding-top: 5px;
    font-size: 13pt;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    bottom: 0;
    left: 0;
    right: 0;
  }

  #profilePic {
    display: block;
    height: auto;
    width: 15rem;
  }

  #fileImage {
    display: none;
  }

  .avatarDiv:hover {
    .labelFileImage {
      visibility: visible;
    }
  }

  .greetUser {
    font-size: 2.5rem;
  }

  .email {
    font-size: 1.2rem;
  }

  .showEmail {
    font-size: 1.5rem;
  }

  .showDob,
  .showGender {
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  #dob {
    outline: none;
    border: none;
    border-radius: 9px;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  #gender {
    margin-left: 0.5rem;
    width: 9rem;
    background-image: unset;
  }

  #gender:disabled {
    background-color: #fff;
  }

  .rightSection {
    height: 100%;
    width: 65%;
    border-radius: inherit;
  }

  .heading {
    font-size: 2rem;
    text-align: center;
    margin-top: 1rem;
  }

  .searchHistory {
    margin-top: 2rem;
    margin-left: 2rem;
  }

  .innerHeading {
    font-size: 1.2rem;
  }

  .shList {
    margin-top: 1rem;
    width: 75%;
    height: 204px;
    overflow-y: scroll;
    border-radius: 0.7rem;
    background-color: #e50914a6;

    &::-webkit-scrollbar {
      background-color: transparent;
      width: 0px;
    }
  }
  .shList:hover {
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  @media (hover: none) {
    .shList {
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  .menu {
    list-type: none;
    margin: 0;
    padding: 0;

    li {
      line-height: 2.5em;
      border-bottom: 1px solid black;
      padding: 0 1em;
      cursor: pointer;
      &.active,
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
      &.active:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  .likedHistory {
    margin-top: 2rem;
    margin-left: 2rem;
  }

  .content-img {
    display: block;
    margin: 1px;
    border: 2px solid grey;
    width: 20%;
    height: auto;
    transition: all 0.2s ease;
  }

  .seeMoreLiked {
    display: block;
    margin: 1px;
    border: 2px solid grey;
    background: rgba(200, 0, 0, 0.5);
    color: white;
    transition: all 0.2s ease;
  }

  .rotateText {
    font-size: 1.5rem;
    writing-mode: vertical-lr;
  }

  .content-img:hover,
  .seeMoreLiked:hover {
    border: 2px solid rgba(176, 7, 16, 0.8);
    box-shadow: 0 0 10px rgba(176, 7, 16, 1);
    transform: scale(1.1);
  }
`;
