import React from 'react';
import PropTypes from 'prop-types';

import card from '../../assets/voters-card.png';
import actionTypes from '../../actions/constants';

const { PROXIMITY, YEAR, STATUS } = actionTypes;

/**
 * Voters card section in VRI test
 */
const VotersCard = ({ handleChange, goTo }) => (
    <section className="card">
        <div className="question">
            <p>
                Which Voters Card do you have?
            </p>
        </div>
        <div className="q-image">
            <img src={card} />
        </div>
        <div className="options">
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(PROXIMITY)
                }}
                value="Permanent Voters Card"
                type="submit"
                name="Q2"
                id="A"
            />
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(YEAR)
                }}
                value="Temporary Voters Card"
                type="submit"
                name="Q2"
                id="B"
            />
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(STATUS)
                }}
                value="None"
                type="submit"
                name="Q2"
                id="C"
            />
            <input
                onClick={(event) => {
                    handleChange(event);
                    goTo(YEAR)
                }}
                value="I lost my Card"
                type="submit"
                name="Q2"
                id="D"
            />
        </div>
    </section>
);

VotersCard.propTypes = {
    handleChange: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired
};

export default VotersCard;
