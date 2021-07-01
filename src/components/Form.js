import React from "react";
import { AutoSuggest } from "react-autosuggestions";
import { aircraftCategoryOptions } from "../constants/aircraftCategories.js";
// import { aircraftDamageOptions } from "../constants/aircraftDamages.js";
import { engineTypeOptions } from "../constants/engineTypes.js";
import { phaseOfFlightOptions } from "../constants/phasesOfFlight.js";
import { airportCodeOptions } from "../constants/airportCodes.js";
import { stateOptions } from "../constants/states.js";
import { aircraftDamageOptions } from "../constants/aircraftDamages.js";

const url = process.env.REACT_APP_ENDPOINT; // eslint-disable-line

export const Form = ({ handleSubmission }) => {
    const [eventDateStart, setEventDateStart] = React.useState();
    const [eventDateEnd, setEventDateEnd] = React.useState();
    // const [accidentNumber, setAccidentNumber] = React.useState();
    const [airCarrier, setAirCarrier] = React.useState();
    const [airportCode, setAirportCode] = React.useState();
    const [airportName, setAirportName] = React.useState();
    const [broadPhaseOfFlight, setBroadPhaseOfFlight] = React.useState();
    const [category, setCategory] = React.useState();
    const [city, setCity] = React.useState();
    const [country, setCountry] = React.useState();
    const [damage, setDamage] = React.useState();
    const [engineType, setEngineType] = React.useState();
    const [make, setMake] = React.useState();
    const [model, setModel] = React.useState();
    const [numberOfEngines, setNumberOfEngines] = React.useState();
    const [purposeOfFlight, setPurposeOfFlight] = React.useState();
    const [state, setState] = React.useState();
    const [totalFatalInjuries, setTotalFatalInjuries] = React.useState();
    const [totalMinorInjuries, setTotalMinorInjuries] = React.useState();
    const [totalSeriousInjuries, setTotalSeriousInjuries] = React.useState();
    const [totalUninjured, setTotalUninjured] = React.useState();
    const [disabled, setDisabled] = React.useState();

    React.useEffect(() => {
        if (country && country !== "United States") {
            setDisabled(true);
            setState("");
        } else if (!country || country === "United States") {
            setDisabled(false);
        }
    }, [country]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let options = [
            eventDateStart && `Event_Date_After=${eventDateStart}`,
            eventDateEnd && `Event_Date_Before=${eventDateEnd}`,
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
            numberOfEngines && `Number_of_Engines=${numberOfEngines}`,
            // purposeOfFlight && `Purpose_of_Flight=${purposeOfFlight}`,
            // registrationNumber && `Registration_Number=${registrationNumber}`,
            // reportStatus && `Report_Status=${reportStatus}`,
            // weatherCondition && `Weather_Condition=${weatherCondition}`,
        ];
        handleSubmission(options);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Event_Date_Start">Event Date Start</label>
                <input
                    id="Event_Date_Start"
                    name="Event_Date_Start"
                    type="date"
                    min="1948-10-24"
                    value={eventDateStart}
                    onChange={(e) => setEventDateStart(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="Event_Date_End">Event Date End</label>
                <input
                    id="Event_Date_End"
                    name="Event_Date_End"
                    type="date"
                    min="1948-10-24"
                    value={eventDateEnd}
                    onChange={(e) => setEventDateEnd(e.target.value)}
                />
            </div>
            <AutoSuggest 
                name="Air Carrier" 
                url={`${url}/airCarrier`} 
                value={airCarrier} 
                handleChange={setAirCarrier} 

            />
            <AutoSuggest
                url={`${url}/categoryList`}
                name="Aircraft Category"
                value={category}
                handleChange={setCategory}
            />
            <AutoSuggest
                options={aircraftDamageOptions}
                name="Aircraft Damage"
                value={damage}
                handleChange={setDamage}
            />
            <AutoSuggest
                name="Airport Code"
                value={airportCode}
                handleChange={setAirportCode}
                url={`${url}/airportCode`}
            />
            <AutoSuggest
                name="Airport Name"
                value={airportName}
                handleChange={setAirportName}
                url={`${url}/airportName`}
            />
            <AutoSuggest 
                name="Broad Phase of Flight" 
                url={`${url}/phaseList`} 
                handleChange={setBroadPhaseOfFlight} 
                value={broadPhaseOfFlight}/>
            <AutoSuggest 
                name="City" 
                value={city} handleChange={setCity} 
                url={`${url}/cityList`} />
            <AutoSuggest 
                name="Country" 
                url={`${url}/countryList`} 
                handleChange={setCountry} 
                value={country} />
            <AutoSuggest 
                name="Engine Type" 
                options={engineTypeOptions} 
                handleChange={setEngineType} 
                value={engineType} />
            <AutoSuggest 
                name="Make" 
                url={`${url}/makeList`} 
                handleChange={setMake} 
                value={make} />
            <AutoSuggest
                name="Model"
                url={make ? `${url}/makeList/${make}/model` : `${url}/modelList`}
                handleChange={setModel}
                value={model}
            />
            <div><label htmlFor="numberOfEngines">Number of Engines</label>
            <input
                name="Number of Engines"
                url={`${url}/numberOfEngines`}
                name="Number of Engines"
                id="numberOfEngines"
                value={numberOfEngines}
                onChange={(e) => setNumberOfEngines(e.target.value)}
            /></div>
            <AutoSuggest
                name="Purpose of Flight"
                url={`${url}/purposeOfFlight`}
                value={purposeOfFlight}
                handleChange={setPurposeOfFlight}
            />
            <AutoSuggest
                handleChange={setState}
                name="State"
                options={stateOptions}
                value={state}
                disabled={disabled}
                styles={{ searchField: disabled ? { opacity: "50%" } : { opacity: "100%" } }}
            />
            <AutoSuggest
                name="Total Fatal Injuries"
                url={`${url}/totalFatalInjuries`}
                value={totalFatalInjuries}
                handleChange={setTotalFatalInjuries}
            />
            <AutoSuggest
                name="Total Minor Injuries"
                url={`${url}/totalMinorInjuries`}
                value={totalMinorInjuries}
                handleChange={setTotalMinorInjuries}
            />
            <AutoSuggest
                name="Total Serious Injuries"
                url={`${url}/totalSeriousInjuries`}
                value={totalSeriousInjuries}
                handleChange={setTotalSeriousInjuries}
            />
            <AutoSuggest
                name="Total Uninjured"
                url={`${url}/totalUninjured`}
                value={totalUninjured}
                handleChange={setTotalUninjured}
            />
            <input type="submit" />
        </form>
    );
};
