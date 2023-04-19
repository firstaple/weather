import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState("");
  const [area, setArea] = useState("");
  const [handleOpen, setHandleOpen] = useState(false);

  const path =
    "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0l57.4-43c23.9-59.8 79.7-103.3 146.3-109.8l13.9-10.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176V384c0 35.3 28.7 64 64 64H360.2C335.1 417.6 320 378.5 320 336c0-5.6 .3-11.1 .8-16.6l-26.4 19.8zM640 336a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 353.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z";

  const getGeoLocation = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=43532e7133ed6c3adde2a53302f449ee&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      });
  };

  const onGeoError = () => {
    alert("Can't find you, No weather for you.");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getGeoLocation, onGeoError);
  }, []);

  const searchArea = (e) => {
    setArea(e.target.value);
  };

  const areaWeather = (e) => {
    e.preventDefault();
    const areaWeatherApi = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=43532e7133ed6c3adde2a53302f449ee&units=metric`
      );
      const json = await response.json();
      return json;
    };
    areaWeatherApi()
      .then((json) => {
        if (json.cod === 200) {
          setWeather(json);
        } else {
          alert("Please enter the correct city name");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while fetching the data.");
      });
    setArea("");
  };

  function notifyMe() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification("Thank for subscribe!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
        }
      });
    }
  }

  const openModal = () => {
    setHandleOpen(true);
  };

  const subscribe = () => {
    setHandleOpen(false);
    notifyMe();
  };

  return (
    <div>
      <form id="form" onSubmit={areaWeather}>
        <input
          type="text"
          id="search"
          placeholder="Search By Loaction"
          onChange={searchArea}
          value={area}
          required
          className="search_bar"
        />
      </form>
      <main id="main">
        <h1>{weather && weather.main.temp}&deg;C</h1>
        <h2>{weather && weather.name}</h2>
        {weather &&
          weather.weather.map((icon) => {
            try {
              return (
                <div key={icon.id}>
                  <img
                    src={require(`./backgroundImg/${icon.icon}.jpg`)}
                    className="back_ground_img"
                  ></img>
                  <img
                    src={`https://openweathermap.org/img/wn/${icon.icon}.png`}
                    className="weather_icon"
                    onClick={openModal}
                  ></img>
                </div>
              );
            } catch (error) {
              return (
                <div key={icon.id}>
                  <img
                    src={require(`./backgroundImg/default.jpg`)}
                    className="back_ground_img"
                  ></img>
                  <img
                    src={`https://openweathermap.org/img/wn/${icon.icon}.png`}
                    className="weather_icon"
                    onClick={openModal}
                  ></img>
                </div>
              );
            }
          })}
      </main>
      {handleOpen === true ? (
        <div className="modal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            style={{ width: "15%" }}
          >
            <path d={path} />
          </svg>
          <form onSubmit={subscribe} action="">
            <span>Today weather notification!</span>
            <input type="email" required></input>
            <button>subscribe!</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
