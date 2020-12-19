import { aircraftCategoryOptions } from "../constants/aircraftCategories.js";
import { ClientSideSelect } from "./ClientSideSelect.js";

export const AircraftCategorySelect = ({ onSelect, value }) => {
  return (
    <ClientSideSelect
      onSelect={onSelect}
      value={value}
      options={aircraftCategoryOptions}
      name="Aircraft Category"
    />
  );
};
