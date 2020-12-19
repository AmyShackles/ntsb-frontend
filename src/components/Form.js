import React from "react";
import { AircraftCategorySelect } from "./AircraftCategorySelect.js";
import { EngineTypeSelect } from "./EngineTypeSelect.js";
import { PhaseOfFlightSelect } from "./PhaseOfFlightSelect.js";
import { StateSelect } from "./StateSelect.js";

export const Form = () => {
  const [eventDateStart, setEventDateStart] = React.useState("");
  const [eventDateEnd, setEventDateEnd] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("United States");
  const [injurySeverity, setInjurySeverity] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amateurBuilt, setAmateurBuilt] = React.useState("");
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [registrationNumber, setRegistrationNumber] = React.useState("");
  const [damage, setDamage] = React.useState("");
  const [numberOfEngines, setNumberOfEngines] = React.useState("");
  const [engineType, setEngineType] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [purposeOfFlight, setPurposeOfFlight] = React.useState("");
  const [airCarrier, setAirCarrier] = React.useState("");
  const [accidentNumber, setAccidentNumber] = React.useState("");
  const [reportStatus, setReportStatus] = React.useState("");
  const [airportName, setAirportName] = React.useState("");
  const [airportCode, setAirportCode] = React.useState("");
  const [weatherCondition, setWeatherCondition] = React.useState("");
  const [broadPhaseOfFlight, setBroadPhaseOfFlight] = React.useState("");

  React.useEffect(function clearState() {
    if (country !== "United States") {
      setState("");
    }
  });

  return (
    <form>
      <label htmlFor="Event_Date_Start">Event Date Start</label>
      <input
        id="Event_Date_Start"
        name="Event_Date_Start"
        type="date"
        min="1948-10-24"
        value={eventDateStart}
        onChange={(e) => setEventDateStart(e.target.value)}
      />
      <input
        id="Event_Date_End"
        name="Event_Date_End"
        type="date"
        min="1948-10-24"
        value={eventDateEnd}
        onChange={(e) => setEventDateEnd(e.target.value)}
      />
      <StateSelect
        disabled={country === "United States" ? false : true}
        onSelect={setState}
        value={state}
      />
      <AircraftCategorySelect onSelect={setCategory} value={category} />
      <EngineTypeSelect onSelect={setEngineType} value={engineType} />
      <PhaseOfFlightSelect
        onSelect={setBroadPhaseOfFlight}
        value={broadPhaseOfFlight}
      />

      <input type="submit" />
    </form>
  );
};
