import React from 'react';
import PropTypes from 'prop-types';

import voter from '../../assets/voter.jpg';
import actionTypes from '../../actions/constants';

const { YEAR, BIO } = actionTypes;

/**
 * Registration status section in VRI test
 */
const RegistrationStatus = ({ handleChange, goTo, user, saveNewVri }) => (
    <section className="status">
        <div className="question">
            <p>
                Have you registered as a voter?
            </p>
        </div>
        <div className="q-image">
            <img src={voter} />
        </div>
        <div className="options">
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(YEAR)
                }}
                value="Yes"
                type="submit"
                name="Q5"
                id="A"
            />
            <input
                onClick={(event) => {
                    handleChange(event);
                    if (user.isAuthenticated){
                        saveNewVri();
                    } else {
                        goTo(BIO);
                    }
                }}
                value="No"
                type="submit"
                name="Q5"
                id="B"
            />
        </div>
    </section>
);

RegistrationStatus.propTypes = {
    handleChange: PropTypes.func.isRequired,
    saveNewVri: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    goTo: PropTypes.func.isRequired
};

export default RegistrationStatus;
