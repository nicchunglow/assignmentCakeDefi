import React from 'react';

type ListItemType = {
  id: string;
  symbol: string;
};

type SelectTokenType = {
  action: string;
  list: ListItemType[];
  optionToDisable?: string;
  onChange: (event: any) => void;
};
const SelectToken: React.FC<SelectTokenType> = (props) => {
  const { action, list, onChange } = props;
  const optionsList = list.map((token) => {
    return (
      <option
        key={`${token?.id}-option`}
        aria-label={`${props.action}-${token?.id}-option`}
        value={token?.id}
        disabled={props?.optionToDisable === token?.id}
      >
        {token?.symbol.toUpperCase()}
      </option>
    );
  });
  return (
    <select
      className="border-2 rounded-lg hover:border-secondary-100 w-4/5 text-lg"
      aria-label={`${action}-token-select`}
      name={`${action}-token-select`}
      onChange={onChange}
    >
      <option aria-label={`${action}-option`}>Select token to {action}</option>
      {optionsList}
    </select>
  );
};

export default SelectToken;
