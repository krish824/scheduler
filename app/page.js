"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [patientName, setpatientName] = useState("");
  const [drName, setdrName] = useState("Dr A");

  const [time, setTime] = useState(1);

  const [appState, setAppState] = useState("first");

  const onSubmit = (e) => {
    e.preventDefault();
    setAppState("second");
    console.log(patientName, drName);
  };

  const confirmAppointment = async (e) => {
    console.log(time);
    e.preventDefault();
    let date = new Date();
    date.setDate(date.getDate() + 1);

    date.setHours(9, 0, 0, 0);
    let startTime = date.toISOString();
    date.setHours(10, 0, 0, 0);
    let endTime = date.toISOString();

    if (time == 2) {
      date.setHours(10, 0, 0, 0);
      startTime = date.toISOString();
      date.setHours(11, 0, 0, 0);
      endTime = date.toISOString();
    }
    if (time == 3) {
      date.setHours(11, 0, 0, 0);
      startTime = date.toISOString();
      date.setHours(12, 0, 0, 0);
      endTime = date.toISOString();
    }
    if (time == 4) {
      date.setHours(12, 0, 0, 0);
      startTime = date.toISOString();
      date.setHours(13, 0, 0, 0);
      endTime = date.toISOString();
    }
    if (time == 5) {
      date.setHours(13, 0, 0, 0);
      startTime = date.toISOString();
      date.setHours(14, 0, 0, 0);
      endTime = date.toISOString();
    }

    const data = await fetch("/api/schedule-appointment", {
      method: "POST",
      body: JSON.stringify({
        endTime: endTime,
        startTime: startTime,
        patientName: patientName,
        drName: drName,
      }),
    });
    if (data.status == 200) {
      setAppState("third");
    }
  };

  return (
    <main>
      {appState == "first" ? (
        <>
          <div className="w-full h-screen">
            <div className="w-1/4 m-4">
              <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="patientName"
                  placeholder="Patient Name"
                  required
                  value={patientName}
                  onChange={(e) => {
                    // console.log(patientName)
                    setpatientName(e.target.value);
                  }}
                />
                <select
                  name="drName"
                  placeholder="DrName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={drName}
                  onChange={(e) => {
                    setdrName(e.target.value);
                  }}
                >
                  <option value="Dr A">Dr. A</option>
                  <option value="Dr B">Dr. B</option>
                  <option value="Dr C">Dr. C</option>
                  <option value="Dr D">Dr. D</option>
                  <option value="Dr E">Dr. E</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      ) : appState == "second" ? (
        <>
          <div className="w-full h-screen">
            <div className="w-1/4 m-4">
              <form
                onSubmit={confirmAppointment}
                className="flex flex-col gap-y-4"
              >
                <label>Select time</label>
                <select
                  name="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value={1}>9 am to 10 am</option>
                  <option value={2}>10 am to 11 am</option>
                  <option value={3}>11 am to 12 pm</option>
                  <option value={4}>12 pm to 1 pm</option>
                  <option value={5}>1 pm to 2 pm</option>
                </select>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>
        </>
      ) : appState == "third" ? (
        <>
          <div className="w-full h-screen">
            <div className="w-1/4 m-4">
              <div
                class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium">
                    Success! Your appointment is confirmed!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
