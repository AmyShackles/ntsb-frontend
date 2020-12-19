import { phaseOfFlightOptions } from "../constants/phasesOfFlight.js";
import { ClientSideSelect } from "./ClientSideSelect";

export const PhaseOfFlightSelect = ({ onSelect, value }) => {
  return (
    <ClientSideSelect
      options={phaseOfFlightOptions}
      onSelect={onSelect}
      value={value}
      name="Phase of Flight"
    />
  );
};
