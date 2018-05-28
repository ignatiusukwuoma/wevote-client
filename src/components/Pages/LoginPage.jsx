import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Phone from '../Snippets/Phone';
import Surname from '../Snippets/Surname';
import { confirmPhone, signIn, getUser } from '../../actions/userActions';
import * as validate from "../../utils/validate";
import {handleError} from "../../utils/errorHandler";
import actionTypes from '../../actions/constants';

const { PHONE, SURNAME } = actionTypes;

/**
 * Login page
 */
class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            section: PHONE,
            signInDetails: {
                phone: '',
                surname: ''
            },
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.onPhoneSubmit = this.onPhoneSubmit.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    /**
     * Displays the confirm surname field if phone number is registered
     * @param {object} nextProps
     */
    componentWillReceiveProps(nextProps){
        if (this.props.user.surname !== nextProps.user.surname) {
            this.goToNext(SURNAME);
        }
    }

    /**
     * Sets entries in the login fields in state
     * @param {object} event
     */
    handleChange(event) {
        const signInDetails = this.state.signInDetails;
        signInDetails[event.target.name] = event.target.value;
        this.setState({ signInDetails });
    }

    /**
     * Moves to the section passed as argument
     * @param {string} section
     */
    goToNext(section) {
        this.setState({ section });
    }

    /**
     * Confirms the phone number from backend when entered
     */
    onPhoneSubmit() {
        event.preventDefault();
        const { valid, errors } = validate.phone(this.state.signInDetails);
        if (valid) {
            this.props.confirmPhone({phone: this.state.signInDetails.phone});
        } else {
            this.setState({ errors });
        }
    }

    /**
     * Logs in the user when surname is confirmed
     */
    onLoginSubmit() {
        event.preventDefault();
        const { valid, errors } = validate.surname(this.state.signInDetails);
        if (valid) {
            this.props.signIn(this.state.signInDetails)
                .then(() => {
                    if (this.props.user.isAuthenticated) {
                        this.props.getUser(this.props.user.uuid);
                        this.props.history.push('/voter-readiness');
                    }
                })
                .catch(error => handleError(error));
        } else {
            this.setState({ errors });
        }
    }

    render(){
        const { section, signInDetails, errors } = this.state;
        return (
            <div className="login">
                {section === PHONE &&
                <Phone
                    onPhoneSubmit={this.onPhoneSubmit}
                    handleChange={this.handleChange}
                    signInDetails={signInDetails}
                    errors={errors}
                />}
                {section === SURNAME &&
                <Surname
                    onLoginSubmit={this.onLoginSubmit}
                    handleChange={this.handleChange}
                    signInDetails={signInDetails}
                    errors={errors}
                />}
            </div>
        );
    }
}

LoginPage.propTypes = {
    user: PropTypes.object,
    confirmPhone: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps, { confirmPhone, signIn, getUser })(LoginPage);
