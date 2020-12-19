import React from "react";
import { stateOptions } from "../constants/states.js";
import { ClientSideSelect } from "./ClientSideSelect";

const StateSelect = ({ onSelect, disabled, value }) => {
  return (
    <ClientSideSelect
      name="State"
      onSelect={onSelect}
      disabled={disabled}
      value={value}
      options={stateOptions}
    />
  );
};

export { StateSelect };
