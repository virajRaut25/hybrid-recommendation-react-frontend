import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Chart as ChartJS, Colors, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
ChartJS.register(Colors);
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const expressHost = import.meta.env.VITE_EXPRESS_API;
export default function Stats() {
  const [stat, setStat] = useState({
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thrusday: {},
    Friday: {},
    Saturday: {},
    Sunday: {},
  });
  let today = new Date().toLocaleString("en-us", { weekday: "long" });
  const statsInvoke = async () => {
    const response = await fetch(`${expressHost}/api/history/weekstats`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setStat(res);
    console.log(Object.entries(res));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      statsInvoke();
    }
  }, []);

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color+"AD";
}

  return (
    <StatsCss>
      <div className="">
        <div className="heading mx-5 mb-3 fs-3">Your Daily Stats</div>
        <div className="cardLayout d-flex flex-row align-items-center justify-content-center flex-wrap">
          {stat[today] && Object.keys(stat[today]).length ? (
            <div className="dataCard todayCard">
              <Bar
                data={{
                  labels: [...Object.keys(stat[today])],
                  datasets: [
                    {
                      label: "Frequency",
                      data: [...Object.values(stat[today])],
                      backgroundColor: [...Object.values(stat).map((e)=> getRandomColor())],
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: `Today(${today}) Stats`
                    },
                  },
                }}
              />
            </div>
          ) : (
            ""
          )}
          {Object.keys(stat)
            .filter((day) => day !== today)
            .map((day) => {
              return Object.keys(stat[day]).length ? (
                <div className="dataCard restCard" key={day}>
                  <Bar
                    data={{
                      labels: [...Object.keys(stat[day])],
                      datasets: [
                        {
                          label: "Frequency",
                          data: [...Object.values(stat[day])],
                          backgroundColor: [...Object.values(stat).map((e)=> getRandomColor())],
                          borderRadius: 5,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: {
                          text: `${day} Stats`,
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                ""
              );
            })}
        </div>
      </div>
    </StatsCss>
  );
}

const StatsCss = styled.div`
  margin-top: 6rem;
  margin-bottom: 4rem;
  .cardLayout {
    width: 100%;
    min-height: 90vh;
    gap: 1vw;
  }
  .dataCard {
    background-color: #efefef;
    border-radius: 0.5em;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 1em;
  }

  .todayCard {
    width: 91%;
    height: 30rem;
  }

  .restCard {
    width: 45%;
    height: 30rem;
  }
`;
