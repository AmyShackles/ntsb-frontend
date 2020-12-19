import { engineTypeOptions } from "../constants/engineTypes.js";
import { ClientSideSelect } from "./ClientSideSelect.js";

export const EngineTypeSelect = ({ onSelect, value }) => {
  return (
    <ClientSideSelect
      onSelect={onSelect}
      value={value}
      name="Engine Type"
      options={engineTypeOptions}
    />
  );
};
