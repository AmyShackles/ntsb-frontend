export const ClientSideSelect = ({
  onSelect,
  value,
  options,
  name,
  disabled,
}) => {
  return (
    <select
      name={name.replace(/\s/, "_")}
      id={`${name.replace(/\s/, "_")}-select`}
      onChange={(e) => onSelect(e.target.value)}
      value={value}
      disabled={disabled}
    >
      <option value="">Any {name}</option>
      {options.map((opt, index) => {
        if (opt.abbr) {
          const { name, value, abbr } = opt;
          return (
            <option
              key={`${name}=${index}`}
              value={value}
              name={name}
              abbr={abbr}
            >
              {name}
            </option>
          );
        }
        return (
          <option key={`${opt}-${index}`} value={opt} name={opt}>
            {opt}
          </option>
        );
      })}
    </select>
  );
};
