import React, {ChangeEvent, FC} from 'react';

interface InputType {
  labelName: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
  type: string
  id: string
  name: string
}
const Input: FC<InputType> = ({labelName,  value, onChange, type, id , name}) => {
  return (
    <>
      <label htmlFor={name}>{labelName}</label>
      <input
        className=" h-9 mx-1.5 border-2 border-my-grey"
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        name={name}
        required/>
    </>
  );
};

export default Input;