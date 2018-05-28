import React from 'react';
import PropTypes from 'prop-types';

import actionTypes from '../../actions/constants';
import year from '../../assets/registration-year.jpg';

const { PROXIMITY } = actionTypes;

/**
 * Registration Year section in VRI test
 */
const RegistrationYear = ({ handleChange, goTo }) => (
    <section className="year">
        <div className="question">
            <p>
                When did you register?
            </p>
        </div>
        <div className="q-image">
            <img src={year} />
        </div>
        <div className="options">
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(PROXIMITY)
                }}
                value="2017 - 2018"
                type="submit"
                name="Q4"
                id="A"
            />
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(PROXIMITY)
                }}
                value="2013 - 2014"
                type="submit"
                name="Q4"
                id="B"
            />
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(PROXIMITY)
                }}
                value="2009 - 2010"
                type="submit"
                name="Q4"
                id="C"
            />
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(PROXIMITY)
                }}
                value="Before 2007"
                type="submit"
                name="Q4"
                id="D"
            />
        </div>
    </section>
);

RegistrationYear.propTypes = {
    handleChange: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired
};

export default RegistrationYear;
