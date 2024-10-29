"use client";

import { useState, useEffect } from "react";
import CountriesCard from "@/components/dashboard/Cards/CountriesCard/CountriesCard";
import WeatherCard from "@/components/dashboard/Cards/WeatherCard/WeatherCard";
import { useAuth } from "@/hooks/useAuth";
import DateTimeCard from "@/components/dashboard/Cards/DateTimeCard/DateTimeCard";
import AvailableTimezonesCard from "@/components/dashboard/Cards/AvailableTimezonesCard/AvailableTimezonesCard";
import TasksCard from "@/components/dashboard/Cards/TasksCard/TasksCard";
import {
  User,
  Countries,
  Weather,
  Timezone,
  Zone,
  currentTimezone,
  userData,
} from "@/types/DashboardPage/dashboardTypes";
import CountryCard from "@/components/dashboard/Cards/SelectedCountryCard/SelectedCountryCard";

export default function DashboardWeatherPage() {
  const { user, token } = useAuth();

  const [countries, setCountries] = useState<Countries[]>();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectCapital, setSelectedCapital] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );
  const [weather, setWeather] = useState<Weather>();
  const [timezones, setTimezones] = useState<Zone[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
  const [currentTimezone, setCurrentTimezone] = useState<currentTimezone>();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userData>();

  const handleCountrySelect =
    (country: string, code: string, capital: string) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setSelectedCountry(country);
      setSelectedCapital(capital);

      setSelectedCountryCode(code);
    };

  const handleTimezoneSelect =
    (timezone: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setSelectedTimezone(timezone);
    };

  useEffect(() => {
    if (!token || !user) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              path: "/users",
              httpMethod: "GET",
              body: "",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          }
        );

        const result = await response.json();
        const data = JSON.parse(result.body);
        localStorage.setItem("userData", JSON.stringify(data));
        const currentUserData = data.find((u: User) => u.id === user.id);

        if (currentUserData) {
          setUserData(currentUserData);
          localStorage.setItem(
            "CurrentUserData",
            JSON.stringify(currentUserData)
          );
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token, user]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("CurrentUserData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/countries`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              path: "/countries",
              httpMethod: "GET",
              body: "",
            }),
          }
        );

        const result = await response.json();
        const data = JSON.parse(result.body);
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${selectedCountry}&aqi=no`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather", error);
      }
    };
    fetchWeather();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountryCode) return;

    const fetchTimezones = async () => {
      try {
        const response = await fetch(
          `https://api.timezonedb.com/v2.1/list-time-zone?key=${process.env.NEXT_PUBLIC_TIMEZONE_API_KEY}&format=json&country=${selectedCountryCode}`
        );
        const data: Timezone = await response.json();
        setTimezones(data.zones);
      } catch (error) {
        console.error("Error fetching timezones", error);
      }
    };
    fetchTimezones();
  }, [selectedCountryCode]);

  useEffect(() => {
    if (!selectedTimezone) return;

    const fetchCurrentTimezone = async () => {
      try {
        const response = await fetch(
          `/api/timezone/${encodeURIComponent(selectedTimezone)}`
        );
        const data = await response.json();
        setCurrentTimezone(data);
      } catch (error) {
        console.error("Error fetching timezones", error);
      }
    };

    fetchCurrentTimezone();
  }, [selectedTimezone]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="h-screen w-screen pl-[20%] flex">
      <section className="flex flex-col h-full w-1/3 px-4 py-4">
        <CountryCard
          country={selectedCountry}
          capital={selectCapital}
          region={weather?.location.region}
          latitude={weather?.location.lat}
          longitude={weather?.location.lon}
        />
        <TasksCard userData={userData} />
      </section>
      <section className="flex flex-col h-full w-1/3 px-4 py-4">
        <WeatherCard weather={weather} />
        <AvailableTimezonesCard
          timezones={timezones}
          onSelect={handleTimezoneSelect}
        />
        <DateTimeCard timezone={currentTimezone} />
      </section>
      <section className="flex flex-col h-full w-1/3 px-4 py-4">
        <CountriesCard countries={countries} onSelect={handleCountrySelect} />
      </section>
    </main>
  );
}
