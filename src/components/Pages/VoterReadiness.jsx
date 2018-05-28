import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Start from '../Snippets/Start';
import VotersCard from '../Snippets/VotersCard';
import Proximity from '../Snippets/Proximity';
import RegistrationYear from '../Snippets/RegistrationYear';
import RegistrationStatus from '../Snippets/RegistrationStatus';
import Bio from '../Snippets/Bio';
import Save from '../Snippets/Save';
import Result from '../Snippets/Result';
import Stepper from 'react-stepper-horizontal';
import { isMobile } from 'react-device-detect';
import { signUp, getUser } from '../../actions/userActions';
import { saveVri, getUserVri } from '../../actions/vriActions';
import { handleError } from "../../utils/errorHandler";
import generateRank from "../../utils/generateRank";
import generateRecommendations from '../../utils/generateRecommendations';
import * as validate from "../../utils/validate";
import drawDonutChart from '../../assets/progressbar.js';
import actionTypes from '../../actions/constants';

const { START, CARD, PROXIMITY, YEAR, STATUS, BIO, SAVE, RESULT } = actionTypes;

/**
 * Voter Readiness page
 */
class VoterReadiness extends Component {
	sections = [START, CARD, STATUS, YEAR, PROXIMITY, BIO, SAVE];
    constructor(props){
        super(props);
        this.state = {
            showFrame: false,
			section: START,
            responses: {},
            rank: {},
            recommendations: [],
            score: 0,
            userDetails: {
                firstname: '',
                surname: '',
                state: '',
                dob: '',
                sex: '',
                phone: '',
                email: ''
			},
			steps: this.sections.map(section => ({
				title: section,
				href: '#',
			})),
			currentStep: 0,
            errors: {},
        };
        this.handleSignUpChange = this.handleSignUpChange.bind(this);
        this.generateResult = this.generateResult.bind(this);
        this.displayResult = this.displayResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onBioSubmit = this.onBioSubmit.bind(this);
        this.saveNewVri = this.saveNewVri.bind(this);
        this.closeFrame = this.closeFrame.bind(this);
        this.retakeTest = this.retakeTest.bind(this);
        this.openFrame = this.openFrame.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    /**
     * Load Facebook and Twitter SDKs for social sharing
     * Load Google charts for D3 and display result of
     * user if user has previously checked VRI
     */
    componentDidMount(){
        // Load Facebook SDK for JavaScript
        (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=151030348949397&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // Load Twitter SDK
        window.twttr = (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };

            return t;
        }(document, "script", "twitter-wjs"));

        // Load Google charts for D3 chart
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(this.drawChart);

        if (this.props.user.isAuthenticated && !this.props.vri.responses){
            this.props.getUserVri();
        }
        if (this.props.user.isAuthenticated && this.props.vri.score){
            this.generateResult(this.props.vri, this.displayResult);
        }
    }

    /**
     * Display result if user recently checks VRI
     * @param {object} nextProps
     */
    componentWillReceiveProps(nextProps){
        if (nextProps.user.isAuthenticated && !nextProps.vri.responses){
            this.props.getUserVri();
        }
        if (nextProps.vri.score !== this.props.vri.score){
            this.generateResult(nextProps.vri, this.displayResult);
        }
        if (nextProps.vri.score === 0) {
            this.generateResult(nextProps.vri, this.displayResult);
        }
    }

    /**
     * Sets the state with rank and recommendations for user
     * @param {object} props
     * @param {function} callback
     */
    generateResult(props, callback){
        this.setState({
            section: RESULT,
            score: props.score,
            rank: generateRank(props.score),
            recommendations: generateRecommendations(props.responses)
        }, () => callback());
    }

    /**
     * Display D3 chart containing user score
     */
    displayResult(){
        const donutChart = document.getElementById('donut-chart');
        drawDonutChart(donutChart, this.state.score, 500, 500, '.56em')
    }

    /**
     * Save user responses to state
     * @param event
     */
    handleChange(event) {
        const responses = this.state.responses;
        responses[event.target.name] = event.target.id;
        this.setState({ responses });
    }

    /**
     * Make request to save user details and responses to database
     * @param event
     */
    onSave(event) {
        event.preventDefault();
        const { valid, errors } = validate.save(this.state.userDetails);
        if (valid) {
            this.props.signUp(this.state.userDetails)
                .then(() => {
                    if (this.props.user.isAuthenticated) {
                        this.props.saveVri(this.state.responses);
                        this.props.getUser(this.props.user.uuid);
                    }
                    this.setState({section: RESULT})
                })
                .catch((error) => handleError(error));
        } else {
            this.setState({ errors });
        }
    }

    /**
     * Validates entries in the Bio form
     * @param event
     */
    onBioSubmit(event) {
        event.preventDefault();
        const { valid, errors } = validate.bio(this.state.userDetails);
        if (valid) {
            this.goToNext(SAVE);
        } else {
            this.setState({ errors });
        }
    }

    /**
     * Save user details to state
     * @param event
     */
    handleSignUpChange(event) {
        const userDetails = this.state.userDetails;
        userDetails[event.target.name] = event.target.value.substr(0, 50);
        this.setState({ userDetails });
    }

    /**
     * Proceed to the section passed as argument
     * @param {string} section
     */
    goToNext(section) {
        this.setState({ section, currentStep: this.sections.indexOf(section) });
    }

    /**
     * Open iframe
     */
    openFrame(){
        this.setState({ showFrame: true})
    }

    /**
     * Close iframe
     */
    closeFrame(){
        this.setState({ showFrame: false})
    }

    /**
     * Restart the VRI test
     */
    retakeTest(){
        this.setState({ section: START, responses: {} })
    }

    /**
     * Save the new VRI
     */
    saveNewVri(){
        this.props.saveVri(this.state.responses)
            .then(() => {
                this.props.getUserVri();
            })
            .catch((error) => handleError(error));
    }

    render(){
        const { section, score, userDetails, steps, showFrame,
            currentStep, errors, rank, recommendations } = this.state;
        return (
            <div className="vri">
                {section !== RESULT &&
                <Stepper
					className="steps"
					steps={ steps }
					activeStep={ currentStep }
					titleFontSize= { isMobile ? 0: 16 }
					activeBorderStyle="solid"
					activeBorderColor="#3004E0"
				/>}
                {section === START &&
                <Start
                    handleChange={this.handleChange}
                    goTo={this.goToNext}
                />}
                {section === CARD &&
                <VotersCard
                    handleChange={this.handleChange}
                    goTo={this.goToNext}
                />}
                {section === PROXIMITY &&
                <Proximity
                    handleChange={this.handleChange}
                    goTo={this.goToNext}
                    user={this.props.user}
                    saveNewVri={this.saveNewVri}
                />}
                {section === YEAR &&
                <RegistrationYear
                    handleChange={this.handleChange}
                    goTo={this.goToNext}
                />}
                {section === STATUS &&
                <RegistrationStatus
                    handleChange={this.handleChange}
                    goTo={this.goToNext}
                    user={this.props.user}
                    saveNewVri={this.saveNewVri}
                />}
                {section === BIO &&
                <Bio
                    handleChange={this.handleSignUpChange}
                    onBioSubmit={this.onBioSubmit}
                    userDetails={userDetails}
                    errors={errors}
                />}
                {section === SAVE &&
                <Save
                    handleChange={this.handleSignUpChange}
                    onSave={this.onSave}
                    userDetails={userDetails}
                    errors={errors}
                />}
                {section === RESULT &&
                <Result
                    rank={rank}
                    score={score}
                    recommendations={recommendations}
                    username={this.props.user.profile ? this.props.user.profile.firstname : ''}
                    openFrame={this.openFrame}
                    retakeTest={this.retakeTest}
                />}
                {showFrame &&
                <div className="frame">
                    <p onClick={this.closeFrame}>Close</p>
                    <iframe src="" name="frame">
                        <p>This is an iframe</p>
                    </iframe>
                </div>}
            </div>
        );
    }
}

VoterReadiness.propTypes = {
    user: PropTypes.object,
    vri: PropTypes.object,
    signUp: PropTypes.func.isRequired,
    saveVri: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserVri: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return {
        user: state.user,
        vri: state.vri
    };
}

export default connect(mapStateToProps, {signUp, saveVri, getUserVri, getUser})(VoterReadiness);
