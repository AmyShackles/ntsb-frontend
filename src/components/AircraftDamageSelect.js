import { aircraftDamageOptions } from "../constants/aircraftDamages.js";
import { ClientSideSelect } from "./ClientSideSelect.js";

export const AircraftDamageSelect = ({ onSelect, value }) => {
  return (
    <ClientSideSelect
      onSelect={onSelect}
      value={value}
      name="Aircraft Damage"
      options={aircraftDamageOptions}
    />
  );
};
