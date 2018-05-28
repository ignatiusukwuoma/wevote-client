import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import News from './Pages/News';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import NavigationBar from './Layouts/NavigationBar';
import VoterReadiness from './Pages/VoterReadiness';
import Candidates from './Pages/Candidates';
import ElectionStructure from './Pages/ElectionStructure';
import Notifier from "./Pages/Notifier";

import { login, selectModal } from '../actions/userActions';
import setAccessToken from "../utils/setAccessToken";
import actionTypes from '../actions/constants';
import loader from '../assets/loader.gif';
const { SIGN_IN_AJAX } = actionTypes;

/**
 * Top-most layout component
 */
class PrimaryLayout extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    /**
     * Check for returning user and sign in
     */
    componentWillMount(){
        if (localStorage.getItem('wevote')) {
            const tokenStorage = JSON.parse(localStorage.getItem('wevote'));
            const tokenExpiry = tokenStorage.exp;
            const token = tokenStorage.jwt;
            if (tokenExpiry <= Number(Date.now().toString().substr(0, 10))){
                localStorage.removeItem('wevote');
                setAccessToken(null);
                location.reload();
                this.props.history.push('/');
            } else if (token) {
                this.props.login(token, SIGN_IN_AJAX);
            }
        }
    }

    /**
     * Display the modal passed in as argument
     * @param {string} modal
     */
    handleShow(modal) {
        this.setState({showModal: true});
        this.props.selectModal(modal);
    }

    /**
     * Hide the modal being displayed
     */
    handleHide() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div className="primary-layout">
                <header>
                    <Route path="*" component={NavigationBar} />
                </header>
                <main className="container">
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/voter-readiness"  component={VoterReadiness} />
                    <Route path="/news" component={News} />
                    <Route path="/know-your-candidates" component={Candidates} />
                    <Route path="/election-structure" component={ElectionStructure} />
                    <Route path="/notifier" component={Notifier} />
                    <Route path="*" render={() => this.props.loading && <img className="loader" src={loader} />}/>
                </main>
                <footer>
                    <p>WeVote</p>
                    <p>&copy; All Rights Reserved</p>
                </footer>
            </div>
        );
    }
}

PrimaryLayout.propTypes = {
    loading: PropTypes.bool.isRequired,
    selectModal: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

export default withRouter(connect(mapStateToProps, { login, selectModal })(PrimaryLayout));
