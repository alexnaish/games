import React, { useCallback } from 'react';
import classNames from "classnames";

import './input.scss';
import './button.scss';

export const Input = ({ onChange, type = 'text', ...props }) => {
	const handleChange = useCallback((event) => onChange({ name: props.name, value: event.target.value }));
	return <input {...props} type={type} className="form-input" onChange={handleChange} />
}

export const Button = ({ type = 'button', ...props }) => {
	return <button className="form-button" type="button" {...props} />
}
