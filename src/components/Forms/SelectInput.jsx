import React from 'react';
import PropTypes from 'prop-types';

import OptionFragments from './OptionFragments';

/**
 * Component used to create select inputs
 */
const SelectInput = ({id, name, value, handleChange, placeholder, fields, error, required }) => (
    <div className="select-input">
        {required && <span>*</span>}
        <select
            id={id}
            name={name}
            onChange={handleChange}
            value={value}
        >
            <OptionFragments
                fields={fields}
                placeholder={placeholder}
            />
        </select>
        {error && <span className="input-error">{error}</span>}
    </div>
);

SelectInput.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    required: PropTypes.bool,
    error: PropTypes.string,
};

export default SelectInput;
