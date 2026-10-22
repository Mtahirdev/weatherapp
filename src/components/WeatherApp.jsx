import { useState } from "react";
import {
  FiSearch,
  FiMapPin,
  FiWind,
  FiDroplet,
  FiSun,
  FiRefreshCw,
  FiActivity,
  FiCloud,
} from "react-icons/fi";
import { FiSunrise, FiSunset } from "react-icons/fi";
export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState(" ");
  const [loading, setLoading] = useState(false);
  let [res, setres] = useState();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!city.trim() || loading) return;

    setLoading(true);
    const API_KEY = "6303a625a9d631bbdf6068b4d2505f42";

    async function getWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
        );

        if (!response.ok) {
          alert("Failed to fetch");
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setres(data);

        console.log(data);
        console.log(typeof data);

        console.log(res);

        console.log("City:", data.name);
        console.log("Temperature:", data.main.temp, "°C");
        console.log("Weather:", data.weather[0].description);
        console.log("Humidity:", data.main.humidity, "%");
        console.log("Wind Speed:", data.wind.speed, "m/s");
      } catch (error) {
        console.error("Failed to fetch weather:", error.message);
      }
    }

    getWeather();
    setTimeout(() => {
      setSearchedCity(city.trim());
      setCity("");
      setLoading(false);
    }, 500);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";

    return new Date(timestamp * 1000).toLocaleTimeString("en-PK", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const weatherDetails = [
    {
      label: "Wind Speed",
      value: `${res == undefined ? 0 : res.wind.speed} m/s`,
      icon: <FiWind />,
    },
    {
      label: "Humidity",
      value: `${res == undefined ? 0 : res.main.humidity} %`,
      icon: <FiDroplet />,
    },
    {
      label: "Pressure",
      value: `${res == undefined ? 0 : res.main.pressure} pah`,
      icon: <FiActivity />,
    },
    {
      label: "Sunrise",
      value: res ? formatTime(res.sys.sunrise) : "--:--",
      icon: <FiSunrise />,
    },
    {
      label: "Sunset",
      value: res ? formatTime(res.sys.sunset) : "--:--",
      icon: <FiSunset />,
    },
  ];

  return (
    <main className="min-h-screen bg-weather-bg px-4 py-8 text-weather-text sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 sm:gap-10">
        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-weather-input text-weather-accent">
              <FiCloud className="text-2xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                SkyCast
              </h1>
              <p className="text-xs text-weather-muted sm:text-sm">
                Your weather, at a glance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-weather-border px-3 py-2 text-xs text-weather-muted sm:text-sm">
            <FiSun className="text-weather-sunny" />
            <span>Weather App</span>
          </div>
        </header>

        {/* Heading */}
        <section className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Weather <span className="text-weather-accent">Forecast</span>
          </h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-weather-muted sm:text-base">
            Find current weather details for any city around the world.
          </p>
        </section>

        {/* Search Input */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 rounded-2xl border border-weather-border bg-weather-input p-2 shadow-weather transition focus-within:border-weather-primary"
        >
          <FiMapPin className="ml-2 shrink-0 text-xl text-weather-muted sm:ml-3" />

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            aria-label="City name"
            className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-weather-text outline-none placeholder:text-weather-muted sm:text-base"
          />

          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-weather-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-weather-primary-hover disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
          >
            {loading ? (
              <FiRefreshCw className="animate-spin text-lg" />
            ) : (
              <FiSearch className="text-lg" />
            )}
            <span className="hidden sm:inline">
              {loading ? "Searching..." : "Search"}
            </span>
          </button>
        </form>

        {/* Weather Card */}
        <section className="overflow-hidden rounded-3xl border border-weather-card-border bg-weather-card shadow-weather">
          {/* City and Condition */}
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-weather-muted">
                <FiMapPin className="text-weather-accent" />
                <span>Current weather</span>
              </div>

              <h3 className="wrap-break-word text-2xl font-bold sm:text-3xl">
                {searchedCity}
              </h3>

              <p className="text-sm text-weather-muted">Weather overview</p>
            </div>

            <div className="flex items-center gap-4 self-start rounded-2xl bg-weather-input/70 px-4 py-3 sm:self-auto sm:px-5 sm:py-4">
              <FiCloud className="shrink-0 text-5xl text-weather-sunny sm:text-6xl" />
              <div>
                <p className="text-sm font-medium">
                  {res === undefined ? 0 : res.weather[0].description}
                </p>
                <p className="mt-1 text-xs text-weather-muted">
                  Feels like {res === undefined ? 0 : res.main.feels_like}
                  °C
                </p>
              </div>
            </div>
          </div>

          {/* Temperature */}
          <div className="px-5 pb-7 sm:px-8 sm:pb-9">
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-6xl font-bold tracking-tighter sm:text-7xl">
                {res === undefined ? 0 : res.main.temp}
              </span>
              <span className="pb-2 text-2xl font-medium text-weather-accent sm:text-3xl">
                C
              </span>
            </div>

            <p className="mt-3 text-sm text-weather-muted">
              {res === undefined ? 0 : res.weather[0].description}
            </p>
          </div>

          <div className="mx-5 border-t border-weather-card-border sm:mx-8" />

          {/* Weather Details */}
          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3 sm:gap-4 sm:p-8">
            {weatherDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex items-center gap-4 rounded-2xl border border-weather-card-border bg-weather-input/60 p-4 transition hover:bg-weather-input sm:flex-col sm:items-start sm:gap-5 sm:p-5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-weather-primary/15 text-xl text-weather-accent">
                  {detail.icon}
                </div>

                <div className="flex flex-1 items-center justify-between gap-3 sm:block">
                  <p className="text-sm text-weather-muted">{detail.label}</p>
                  <p className="mt-1 text-lg font-semibold sm:text-xl">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-2 text-center text-xs text-weather-muted sm:text-sm">
          SkyCast · Simple weather, clear insights.
        </footer>
      </div>
    </main>
  );
}
