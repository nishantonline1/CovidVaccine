import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function beep() {
  var snd = new Audio(
    "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
  );
  snd.play();
}

export async function handleResponse(response) {
  if (response.status === 204) return {};
  if (response.ok) return response.json();
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  // throw error;
}

export const send_whatsapp = (message) => {
  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.callmebot.com/whatsapp.php?phone=+917980878844&apikey=858091&text=" +
      message
  );
};

function VaccineInfo({ vaccineData, filterAge }) {
  const [centers, setCenters] = useState([]);
  const beepTimeout = useRef(null);
  const [beepStarted, setBeepStarted] = useState(false);
  const [history, setHistory] = useState([]);
  const ageFilter = 18;
  const pinCodeFilter = [];

  useEffect(() => {
    if (vaccineData.centers) {
      const centersWithVaccine = vaccineData.centers
        .map((item) => ({
          ...item,
          sessions: item.sessions.filter(
            ({ min_age_limit, available_capacity_dose1 }) =>
              min_age_limit === filterAge && available_capacity_dose1 > 2
          ),
        }))
        .filter((item) => item.sessions.length);
      centersWithVaccine.length &&
        // setHistory([
        //   ...history,
        //   { timeout: new Date().now(), data: centersWithVaccine },
        // ]);
        // console.log(centersWithVaccine);
        setCenters(centersWithVaccine);
    } else {
      setCenters([]);
    }
  }, [vaccineData, filterAge]);

  useEffect(() => {
    const pincodeFound = centers.filter((item) => {
      return (
        pinCodeFilter.indexOf(item.pincode) >= 0 && item.fee_type == "Free"
      );
    });
    if (!beepStarted && pincodeFound.length) {
      // console.log("Alarm started");
      let count = 0;
      send_whatsapp(
        "Vaccine Found at" +
          pincodeFound.map((ele) =>
            ele.sessions.map((item) => {
              count += 1;
              return `%0A${count}. ${ele.name} (${ele.pincode}) ${ele.fee_type} ${item.available_capacity_dose1} ${item.date}`;
            })
          )
      );
      startAlarm();
    }
    if (beepStarted && centers.length === 0) {
      // console.log("Alarm stopped");
      stopAlarm();
    }
  }, [centers, beepStarted]);

  const startAlarm = () => {
    setBeepStarted(true);
    beepTimeout.current = setInterval(beep, 3000);
  };

  const stopAlarm = () => {
    setBeepStarted(false);
    clearTimeout(beepTimeout.current);
  };

  if (centers.length === 0) return null;

  return (
    <>
      <table style={{ width: "100%" }}>
        <tbody>
          {centers.map(
            ({
              name,
              address,
              block_name,
              district_name,
              fee_type,
              from,
              pincode,
              sessions,
              to,
            }) =>
              sessions.map((ele) => (
                <tr key={ele.session_id}>
                  <td>
                    {name} <br /> {address + "-" + pincode}
                  </td>
                  <td>{block_name}</td>
                  <td>{fee_type}</td>
                  <td>{from + "-" + to}</td>
                  <td>{ele.vaccine}</td>
                  <td>{ele.date + "(" + ele.available_capacity_dose1 + ")"}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  const [vaccineData, setVaccineData] = useState({});
  const [lastTimestamp, setLastTimeStamp] = useState();
  const timeout = useRef(null);
  const [intervalStarted, setIntervalStarted] = useState(false);

  const covidFetch = () => {
    fetch(
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=654"
    )
      .then(handleResponse)
      .then((data) => {
        setVaccineData(data);
        setLastTimeStamp(new Date());
      })
      .catch(handleError);
  };

  const startChecking = () => {
    setIntervalStarted(true);
    covidFetch();
    timeout.current = setInterval(covidFetch, 1000 * 60 * 2);
  };

  const stopChecking = () => {
    setIntervalStarted(false);
    clearTimeout(timeout.current);
  };

  return (
    <>
      {!intervalStarted && <button onClick={startChecking}>Start</button>}
      {intervalStarted && <button onClick={stopChecking}>Stop</button>}
      <div>
        Last Checked: {lastTimestamp && lastTimestamp.toLocaleTimeString()}
      </div>
      <VaccineInfo filterAge={ageFilter} vaccineData={vaccineData} />
    </>
  );
};

export default App;
