"use client";

import { useState } from "react";
import Image from "next/image";
import arrow from "@/public/icon-arrow.svg";

export default function Home() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);

  const [ageYear, setAgeYear] = useState<number | null>(null);
  const [ageMonth, setAgeMonth] = useState<number | null>(null);
  const [ageDay, setAgeDay] = useState<number | null>(null);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  console.log(currentYear);

  function calculateAge(e) {
    e.preventDefault();

    // Check if day is empty
    if (day === "" || parseFloat(day) <= 0 || parseFloat(day) > 31) {
      setDayError(true);
    } else {
      setDayError(false);
    }

    // Check if month is empty
    if (month === "" || parseFloat(month) <= 0 || parseFloat(month) > 12) {
      setMonthError(true);
    } else {
      setMonthError(false);
    }

    // Check if year is empty

    if (
      year === "" ||
      parseFloat(year) <= 0 ||
      parseFloat(year) > currentDate.getFullYear()
    ) {
      setYearError(true);
    } else {
      setYearError(false);
    }

    // Only proceed if all fields are filled
    if (day !== "" && month !== "" && year !== "") {
      const birthDate = new Date(
        parseFloat(year),
        parseFloat(month) - 1,
        parseFloat(day),
        0,
        0,
        0,
        0
      );

      const birthDateSeconds = birthDate.getTime();
      const currentDateSeconds = currentDate.getTime();

      const ageMilli = currentDateSeconds - birthDateSeconds;

      const years = Math.floor(ageMilli / 31556952000);
      const months = Math.floor((ageMilli % 31556952000) / 2629746000);
      const days = Math.floor((ageMilli % 2629746000) / 86400000);

      setAgeYear(years);
      setAgeMonth(months);
      setAgeDay(days);
    }
  }

  return (
    <main className="flex bg-[#f0f0f0] justify-center items-center h-screen">
      <div className="bg-white flex flex-col  w-[40%] h-[60%] rounded-xl rounded-br-[10rem] p-3">
        <form className="flex flex-col gap-7" onSubmit={calculateAge}>
          <div className="flex flex-row gap-7 px-10 pt-4">
            <div className="flex flex-col">
              <a
                className={`font-semibold uppercase text-xs ${
                  dayError ? " text-red-500" : " text-[hsl(0,1%,44%)]"
                }`}
              >
                day
              </a>
              <input
                className={`font-bold text-3xl  border-[1px] pl-3 rounded-md w-32 h-14 ${
                  dayError ? " border-red-500" : "border-[hsl(0,0%,86%)]"
                }`}
                placeholder="DD"
                type="number"
                max={31}
                name="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              ></input>
              <a
                className={`text-red-500 font-semibold ${
                  dayError ? "block text-xs" : "hidden"
                }`}
              >
                This field is required
              </a>
            </div>
            <div className="flex flex-col">
              <a
                className={`font-semibold uppercase text-xs ${
                  monthError ? " text-red-500" : " text-[hsl(0,1%,44%)]"
                }`}
              >
                month
              </a>
              <input
                className={`font-bold text-3xl  border-[1px] pl-3 rounded-md w-32 h-14 ${
                  monthError ? " border-red-500" : "border-[hsl(0,0%,86%)]"
                }`}
                placeholder="MM"
                type="number"
                max={12}
                name="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              ></input>
              <a
                className={`text-red-500 font-semibold ${
                  monthError ? "block text-xs" : "hidden"
                }`}
              >
                This field is required
              </a>
            </div>
            <div className="flex flex-col">
              <a
                className={`font-semibold uppercase text-xs ${
                  yearError ? " text-red-500" : " text-[hsl(0,1%,44%)]"
                }`}
              >
                year
              </a>
              <input
                className={`font-bold text-3xl  border-[1px] pl-3 rounded-md w-32 h-14 ${
                  yearError ? " border-red-500" : "border-[hsl(0,0%,86%)]"
                }`}
                placeholder="YYYY"
                type="number"
                max={currentYear}
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></input>
              <a
                className={`text-red-500 font-semibold ${
                  yearError ? "block text-xs" : "hidden"
                }`}
              >
                This field is required
              </a>
            </div>
          </div>

          <div className="px-10 relative">
            <hr />
            <button
              type="submit"
              title="Find Age"
              className="rounded-full bg-[hsl(259,100%,65%)] p-4 absolute right-7 -top-9 hover:bg-black"
            >
              <Image alt="" src={arrow} priority={false} />
            </button>
          </div>
        </form>
        <div className="flex flex-col text-8xl italic gap-3 py-4 px-4">
          <div className="flex flex-row">
            <p className="font-extrabold text-[hsl(259,100%,65%)]">
              {ageYear !== null ? ageYear : "--"}
            </p>
            <label className="font-extrabold">years</label>
          </div>
          <div className="flex flex-row">
            <p className="font-extrabold text-[hsl(259,100%,65%)]">
              {" "}
              {ageMonth !== null ? ageMonth : "--"}
            </p>
            <label className="font-extrabold">months</label>
          </div>
          <div className="flex flex-row">
            <p className="font-extrabold text-[hsl(259,100%,65%)]">
              {ageDay !== null ? ageDay : "--"}
            </p>
            <label className="font-extrabold">days</label>
          </div>
        </div>
      </div>
    </main>
  );
}
