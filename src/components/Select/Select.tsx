import React from 'react';

type SelectTokenType = {
  action: string;
  list: string[];
};
const SelectToken: React.FC<SelectTokenType> = (props) => {
  const { action, list } = props;
  const optionsList = list.map((token) => {
    return (
      <option key={`${token}-option`} aria-label={`${token}-option`}>
        {token}
      </option>
    );
  });
  return (
    <select
      className="border-2 rounded-lg hover:border-secondary-100"
      aria-label={`${action}-token-select`}
      name={`${action}-token-select`}
    >
      <option aria-label={`${action}-option`}>Select token to {action}</option>
      {optionsList}
    </select>
  );
};

export default SelectToken;
