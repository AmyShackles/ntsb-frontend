import React from "react";
import { AutoSuggest } from "react-autosuggestions";
import { aircraftCategoryOptions } from "../constants/aircraftCategories.js";
// import { aircraftDamageOptions } from "../constants/aircraftDamages.js";
import { engineTypeOptions } from "../constants/engineTypes.js";
import { phaseOfFlightOptions } from "../constants/phasesOfFlight.js";
import { airportCodeOptions } from "../constants/airportCodes.js";
import { stateOptions } from "../constants/states.js";

const url = process.env.REACT_APP_ENDPOINT; // eslint-disable-line

export const Form = ({ handleSubmission }) => {
    const [eventDateStart, setEventDateStart] = React.useState();
    const [eventDateEnd, setEventDateEnd] = React.useState();
    const [state, setState] = React.useState();
    // const [accidentNumber, setAccidentNumber] = React.useState();
    // const [airCarrier, setAirCarrier] = React.useState();
    const [airportCode, setAirportCode] = React.useState();
    // const [airportName, setAirportName] = React.useState();
    // const [amateurBuilt, setAmateurBuilt] = React.useState();
    const [broadPhaseOfFlight, setBroadPhaseOfFlight] = React.useState();
    const [category, setCategory] = React.useState();
    const [country, setCountry] = React.useState();
    // const [damage, setDamage] = React.useState();
    const [engineType, setEngineType] = React.useState();
    // const [injurySeverity, setInjurySeverity] = React.useState();
    const [make, setMake] = React.useState();
    const [model, setModel] = React.useState();
    // const [numberOfEngines, setNumberOfEngines] = React.useState();
    // const [operation, setOperation] = React.useState();
    // const [purposeOfFlight, setPurposeOfFlight] = React.useState();
    // const [registrationNumber, setRegistrationNumber] = React.useState();
    // const [reportStatus, setReportStatus] = React.useState();
    // const [weatherCondition, setWeatherCondition] = React.useState();
    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        if (country && country === "United States") {
            setDisabled(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let options = [
            eventDateStart && `after=${eventDateStart}`,
            eventDateEnd && `before=${eventDateEnd}`,
            state && `State=${state}`,
            // accidentNumber && `Accident_Number=${accidentNumber}`,
            country && `Country=${country}`,
            // airCarrier && `Air_Carrier=${airCarrier}`,
            airportCode && `Airport_Code=${airportCode}`,
            // airportName && `Airport_Name=${airportName}`,
            // amateurBuilt && `Amateur_Built=${amateurBuilt}`,
            broadPhaseOfFlight && `Broad_Phase_of_Flight=${broadPhaseOfFlight}`,
            category && `Aircraft_Category=${category}`,
            // damage && `Aircraft_Damage=${damage}`,
            engineType && `Engine_Type=${engineType}`,
            // injurySeverity && `Injury_Severity=${injurySeverity}`,
            make && `Make=${make}`,
            model && `Model=${model}`,
            // numberOfEngines && `Number_of_Engines=${numberOfEngines}`,
            // purposeOfFlight && `Purpose_of_Flight=${purposeOfFlight}`,
            // registrationNumber && `Registration_Number=${registrationNumber}`,
            // reportStatus && `Report_Status=${reportStatus}`,
            // weatherCondition && `Weather_Condition=${weatherCondition}`,
        ];
        handleSubmission(options);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <AutoSuggest
                name="Country"
                url={`${url}/countryList`}
                handleChange={setCountry}
                styles={{ suggestionsContainer: { zIndex: "1" }, searchField: {} }}
            />
            <AutoSuggest handleChange={setState} name="State" options={stateOptions} disabled={disabled} />
            <AutoSuggest name="Aircraft Category" handleChange={setCategory} options={aircraftCategoryOptions} />
            <AutoSuggest name="EngineType" options={engineTypeOptions} handleChange={setEngineType} />
            <AutoSuggest
                name="Broad Phase of Flight"
                options={phaseOfFlightOptions}
                handleChange={setBroadPhaseOfFlight}
            />
            <AutoSuggest name="Make" url={`${url}/makeList`} handleChange={setMake} />
            <AutoSuggest name="Model" url={`${url}/modelList`} handleChange={setModel} />
            <AutoSuggest name="Airport Code" options={airportCodeOptions} handleChange={setAirportCode} />
            <input type="submit" />
        </form>
    );
};
