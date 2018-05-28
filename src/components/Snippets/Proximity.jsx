import React from 'react';
import PropTypes from 'prop-types';

import actionTypes from '../../actions/constants';
import center from '../../assets/voting-center.jpg';

const { BIO } = actionTypes;

/**
 * Proximity section in VRI test
 */
const Proximity = ({ handleChange, goTo, user, saveNewVri }) => (
    <section className="proximity">
        <div className="question">
            <p>
                How close is your registration center to your residence?
            </p>
        </div>
        <div className="q-image">
            <img src={center} />
        </div>
        <div className="options">
            <input
                onClick={(event) => {
                    handleChange(event);
                    if (user.isAuthenticated){
                        saveNewVri();
                    } else {
                        goTo(BIO);
                    }
                }}
                value="Within my City"
                type="submit"
                name="Q3"
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
                value="Outside my City"
                type="submit"
                name="Q3"
                id="B"
            />
        </div>
    </section>
);

Proximity.propTypes = {
    handleChange: PropTypes.func.isRequired,
    saveNewVri: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    goTo: PropTypes.func.isRequired
};

export default Proximity;
