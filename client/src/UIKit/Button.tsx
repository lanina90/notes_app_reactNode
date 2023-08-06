import React, {FC} from 'react';

export type ButtonType = {
  className?: string | string[],
  type: 'button' | 'submit',
  label: string
  onClick?: () => void
}

const Button: FC<ButtonType> = ({className, type, label, onClick}) => {
  const classNames = Array.isArray(className) ? className.join(' ') : className;
  return (
    <button
      className={classNames}
      type={type}
      onClick={onClick}
    >{label}</button>
  );
};

export default Button;