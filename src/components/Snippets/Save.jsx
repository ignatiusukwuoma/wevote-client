import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../Forms/TextInput';

/**
 * Last section requesting phone and email in VRI test
 */
const Save = ({ handleChange, onSave, userDetails, errors }) => (
    <section className="save">
        <div className="question">
            <p>
                Please fill in the fields so you can access your result the next time you visit
            </p>
        </div>
        <form onSubmit={onSave} className="bio-form">
            <TextInput
                id="save-phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                icon="fas fa-mobile-alt fa-lg"
                handleChange={handleChange}
                value={userDetails.phone}
                error={errors.phone}
                required={true}
            />
            <TextInput
                id="save-email"
                name="email"
                type="email"
                placeholder="Email Address"
                icon="far fa-envelope fa-lg"
                handleChange={handleChange}
                value={userDetails.email}
                error={errors.email}
            />
            <p>Fields marked with <span>*</span> are required</p>
            <div className="options">
                <button
                    onClick={onSave}
                    type="submit"
                >
                    Show My Result
                </button>
            </div>
        </form>
    </section>
);

Save.propTypes = {
    handleChange: PropTypes.func.isRequired,
    userDetails: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default Save;
