import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import vote from '../../assets/vote.png';
import actionTypes from '../../actions/constants';

const { CARD } = actionTypes;

/**
 * First section introducing the VRI test
 */
const Start = ({ handleChange, goTo }) => (
    <section className="start">
        <div className="question">
            <p>
                The Voter Readiness Index helps you know what is required of you to vote and if you've met
                those requirements. The following questions will give you an overview of your level of
                readiness for the upcoming election. This will take less than a minute.
            </p>
        </div>
        <div className="q-image">
            <img src={vote} />
        </div>
        <div className="options">
            <button
                onClick={(event) => {
                    handleChange(event);
                    goTo(CARD)
                }}
                type="button"
                name="Q1"
                id="A"
            >
                Continue &raquo;
            </button>
        </div>
        <div className="done">
            Already taken the VRI test?
            <Link to="/login"> Click here to login </Link>
        </div>
    </section>
);

Start.propTypes = {
    handleChange: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired
};

export default Start;
