import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component used to create text inputs
 */
const TextInput = ({id, name, type, placeholder, icon, value, required, error, handleChange}) => (
    <div className="text-input">
        {required && <span>*</span>}
        <i className={icon}>
        </i>
        <label htmlFor={id}>{placeholder}</label>
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
        {error && <span className="input-error">{error}</span>}
    </div>
);

TextInput.propTypes = {
    id: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default TextInput;
