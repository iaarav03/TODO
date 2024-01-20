import React, { useEffect, useState } from "react";
import { API_CDN_URL, API_CDN_URL2 } from "./Url";


const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchApiData() {
      try {
        const response = await fetch(API_CDN_URL + weather + API_CDN_URL2);

        if (!response.ok) {
          throw new Error("Weather data not available");
        }

        const data = await response.json();
        setTemp(data.main.temp);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setTemp("N/A");
      } finally {
        setLoading(false);
      }
    }

    if (weather !== null) {
      setLoading(true);
      fetchApiData();
    }
  }, [weather]);

  return (
    <>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-8 bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300 mx-4 md:mx-0 shadow-lg rounded-3xl sm:p-8">
          <h1 className="text-3xl mb-4 text-gray-900">
            {weather !== null ? (
              <>
                {weather} - {loading ? "Loading..." : `${temp}° Celsius`}
              </>
            ) : (
              "Enter a city to get weather"
            )}
          </h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded-md"
              placeholder="Enter city name"
            />
            <button
              onClick={() => setWeather(city)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;