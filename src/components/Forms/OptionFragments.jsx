import React from 'react';
import PropTypes from 'prop-types';

const Fragment = React.Fragment;

/**
 * Fragment to create the options for select input
 */
const OptionFragments = ({fields, placeholder}) => (
    <Fragment>
        <option value="">{placeholder}</option>
        {fields.map(field =>
            <option key={field} value={field.toLowerCase()}>{field}</option>
        )}
    </Fragment>
);

OptionFragments.propTypes = {
    fields: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired
};

export default OptionFragments;
