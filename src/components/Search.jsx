import React, { useState, useContext } from "react";
import styled from "styled-components";
import HistoryContext from "../context/HistoryContext";
import Modal from "./Modal";
import jsonObj from "../assets/details.json";
import noPoster from "../assets/no-poster.png";

export default function Search() {
  const expressHost = import.meta.env.VITE_EXPRESS_API;
  const host = import.meta.env.VITE_FLASK_API;
  const [search, setSearch] = useState("");
  const [genreSearch, setGenreSearch] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(jsonObj);
  const { setUserItem, addGenreDay } = useContext(HistoryContext);

  let arr = [...Array(8).keys()];
  const handleDetail = async (id) => {
    await fetch(`${host}/details/${id}`)
      .then((response) => response.json())
      .then((data) => setDetails(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchRes([]);
    setLoading(true);
    try {
      await fetch(`${host}/recommend/${search}`)
        .then((response) => response.json())
        .then(async (data) => {
          setSearchRes(data);
          if (data.length) {
            if (localStorage.getItem("token")) {
              const response = await fetch(
                `${expressHost}/api/history/addSearch/${data[0].title}`,
                {
                  method: "POST",
                  headers: {
                    "auth-token": localStorage.getItem("token"),
                    "Content-Type": "application/json",
                  },
                }
              );
              await addGenreDay(data[0].genres);
              // const res = await response.json();
              // setUserItem(res);
              // console.log(data[0])
            }
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenre = async (e) => {
    e.preventDefault();
    setSearchRes([]);
    setLoading(true);
    try {
      await fetch(`${host}/genre/${genreSearch}`)
        .then((response) => response.json())
        .then((data) => setSearchRes(data));
      await addGenreDay(JSON.parse(genreSearch));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchCss>
      <Modal details={details} />
      <div className="container-fluid">
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="input-group flex-nowrap w-75">
            <span className="input-group-text" id="addon-wrapping">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 50 50"
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
              </svg>
            </span>
            <input
              type="text"
              className="form-control fs-5 fw-semibold"
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Movies, TV Shows, genres..."
              aria-label="search"
              aria-describedby="addon-wrapping"
            />
          </div>
        </form>
        <form
          className="genre-op container mt-5 fw-semibold"
          onSubmit={handleGenre}
        >
          <input
            type="submit"
            value="Action"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Adventure"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Science Fiction"
            onClick={(e) => {
              setGenreSearch('["Sci-Fi"]');
            }}
          />
          <input
            type="submit"
            value="Animation"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Crime"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Romance"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Fantasy"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Comedy"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Mystery"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Crime"
            onClick={(e) => {
              setGenreSearch(`["${e.target.value}"]`);
            }}
          />
          <input
            type="submit"
            value="Others"
            onClick={(e) => {
              setGenreSearch(`["Documentary", "Reality", "History"]`);
            }}
          />
        </form>
        <div className="mt-5 d-flex justify-content-center align-items-center flex-wrap">
          {searchRes.length ? (
            searchRes.map((movie, index) => {
              return (
                <img
                  key={index}
                  src={movie.poster ? movie.poster : noPoster}
                  alt={movie.title}
                  className="content-img"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleDetail(movie.id)}
                />
              );
            })
          ) : loading ? (
            arr.map((index) => {
              return <div key={index} className="loading-img" />;
            })
          ) : (
            <div className="text-center no-res">No Search Result</div>
          )}
        </div>
      </div>
    </SearchCss>
  );
}

const SearchCss = styled.div`
  margin-top: 7rem;
  margin-bottom: 3rem;

  .input-group {
    margin: auto;
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

  .genre-op {
    margin: auto;
    padding: 0 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .genre-op > input {
    all: unset;
    padding: 5px 13px;
    cursor: pointer;
    margin: 0.4rem;
    border: 2px solid grey;
    background-color: grey;
  }

  .genre-op > input:hover {
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
