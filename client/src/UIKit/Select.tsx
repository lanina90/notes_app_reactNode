import React, {ChangeEvent, FC} from 'react';

interface SelectType {
  labelName: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
  name: string
  options: string[]
}

const Select: FC<SelectType> = ({labelName, value, onChange, name, options}) => {
  return (
    <>
      <label htmlFor={name}>{labelName}</label>
      <select
        className="h-9 mx-1.5 border-2 border-my-grey"
        value={value}
        onChange={onChange}
        name={name}
      >
        {options?.map((option: string) =>
          <option value={option}>{option}</option>
        )}
      </select>
    </>
  );
};

export default Select;