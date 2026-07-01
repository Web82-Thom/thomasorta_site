import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { buildApiUrl } from "../../../../../shared/config/api";
import styles from "./Weather.module.css";
import type { WeatherReport } from "./Weather.types";

const DEFAULT_CITY = "Montauban";

async function fetchWeather(city: string, signal?: AbortSignal): Promise<WeatherReport> {
  const response = await fetch(buildApiUrl(`/weather?city=${encodeURIComponent(city)}`), {
    signal,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message ?? "La meteo est indisponible pour le moment.");
  }

  return payload as WeatherReport;
}

export function Weather() {
  const [cityInput, setCityInput] = useState(DEFAULT_CITY);
  const [weatherRequest, setWeatherRequest] = useState({
    city: DEFAULT_CITY,
    id: 0,
  });
  const [weather, setWeather] = useState<WeatherReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    fetchWeather(weatherRequest.city, abortController.signal)
      .then((report) => {
        setWeather(report);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setWeather(null);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "La meteo est indisponible pour le moment.",
        );
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [weatherRequest]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextCity = cityInput.trim();
    const city = nextCity === "" ? DEFAULT_CITY : nextCity;

    if (nextCity === "") {
      setCityInput(DEFAULT_CITY);
    }

    setIsLoading(true);
    setErrorMessage(null);
    setWeatherRequest((currentRequest) => ({
      city,
      id: currentRequest.id + 1,
    }));
  }

  return (
    <section className={styles.weather} id="weather" aria-labelledby="weather-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Meteo locale</p>

          <h2 className={styles.title} id="weather-title">
            Le petit coin meteo
          </h2>

          <p className={styles.description}>
            Test direct de l'API Symfony connectée à OpenWeather.
          </p>
        </div>

        <article className={styles.panel}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="weather-city">
              Ville
            </label>

            <div className={styles.searchRow}>
              <input
                className={styles.input}
                id="weather-city"
                name="city"
                onChange={(event) => {
                  setCityInput(event.target.value);
                }}
                placeholder="Ex: Toulouse"
                type="text"
                value={cityInput}
              />

              <button className={styles.button} disabled={isLoading} type="submit">
                {isLoading ? "Recherche..." : "Rechercher"}
              </button>
            </div>
          </form>

          {errorMessage !== null ? (
            <p className={styles.error} role="alert">
              {errorMessage}
            </p>
          ) : null}

          {weather !== null ? (
            <div className={styles.result} aria-live="polite">
              <div className={styles.resultMain}>
                {weather.iconUrl !== null ? (
                  <img
                    className={styles.icon}
                    src={weather.iconUrl}
                    alt={weather.description}
                  />
                ) : null}

                <div>
                  <p className={styles.city}>{weather.city}</p>
                  <p className={styles.summary}>{weather.description}</p>
                </div>
              </div>

              <div className={styles.temperature}>
                <span>{weather.temperature ?? "--"}°C</span>
              </div>

              <dl className={styles.details}>
                <div>
                  <dt>Min</dt>
                  <dd>{weather.temperatureMin ?? "--"}°C</dd>
                </div>
                <div>
                  <dt>Max</dt>
                  <dd>{weather.temperatureMax ?? "--"}°C</dd>
                </div>
              </dl>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
