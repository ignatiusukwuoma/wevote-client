import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../Forms/TextInput';

/**
 * Phone section during Login
 */
const Phone = ({ handleChange, onPhoneSubmit, signInDetails, errors }) => (
    <section className="phone-login">
        <div className="question">
            <p>
                Please enter your phone number
            </p>
        </div>
        <form onSubmit={onPhoneSubmit} className="login-form">
            <TextInput
                id="login-phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                icon="fas fa-mobile-alt fa-lg"
                handleChange={handleChange}
                value={signInDetails.phone}
                error={errors.phone}
            />
            <div className="submit-button">
                <button
                    onClick={onPhoneSubmit}
                    type="button"
                >
                    Continue &raquo;
                </button>
            </div>
        </form>
    </section>
);

Phone.propTypes = {
    handleChange: PropTypes.func.isRequired,
    onPhoneSubmit: PropTypes.func.isRequired,
    signInDetails: PropTypes.object.isRequired,
    errors: PropTypes.object
};

export default Phone;
