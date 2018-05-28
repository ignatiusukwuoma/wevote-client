import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { getUser } from "../../actions/userActions";
import { getUserVri } from "../../actions/vriActions";
import setAccessToken from "../../utils/setAccessToken";
import generateBatteryInfo from '../../utils/generateBatteryInfo';
import { getNotifications } from '../../actions/notificationActions';

/**
 * Navigation Bar connected component
 */
class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFetch: false,
            navOpen: false,
            notifications: 'You do not have any notification at the moment',
            batteryType: 'empty',
            batteryColor: 'red',
            batteryNotification: 'You have not checked your voter readiness yet. ' +
            'Click on the link to check it now.'
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.logout = this.logout.bind(this);
    }

    /**
     * Gets the details of the current user, their VRI, then
     * generate battery information and saves it in state
     */
    componentDidMount(){
        if (this.props.user.isAuthenticated && !this.props.user.profile){
            this.props.getUser(this.props.user.uuid);
            this.props.getNotifications();
        }
        if (this.props.user.isAuthenticated && !this.props.vri.responses){
            this.props.getUserVri();
        }
        if (this.props.user.isAuthenticated && this.props.vri.score){
            const {batteryType, batteryColor,
                batteryNotification} = generateBatteryInfo(this.props.vri.score, this.props.vri.responses);
            this.setState({ batteryType, batteryColor, batteryNotification });
        }
    }

    /**
     * Generates battery information and sets it in state
     * when user recently checks their VRI
     * @param {object} nextProps
     */
    componentWillReceiveProps(nextProps){
        if (nextProps.vri.score !== this.props.vri.score){
            const {batteryType, batteryColor,
                batteryNotification} = generateBatteryInfo(nextProps.vri.score, nextProps.vri.responses);
            this.setState({ batteryType, batteryColor, batteryNotification });
        }
    }

    /**
     * Opens and closes the navigation menu links on mobile
     */
    toggleNav(){
        this.setState({navOpen: !this.state.navOpen})
    }

    /**
     * Closes the navigation menu links on mobile
     */
    closeNav(){
        if (this.state.navOpen) this.toggleNav();
    }

    /**
     * Logs out a user from the application
     */
    logout(){
        localStorage.removeItem('wevote');
        setAccessToken(null);
        location.reload();
        this.props.history.push('/');
    }

    render(){
        const { navOpen, batteryType, batteryColor, batteryNotification, notifications } = this.state;
        const { user } = this.props;
        return (
            <nav className="nav-bar" role="navigation">
                <h1 className="nav-brand"><Link to="/">WeVote</Link></h1>
                {user.isAuthenticated && <span
                    className="far fa-bell fa-lg nav-notification"
                    data-tooltip={notifications}
                >
                </span>}
                <span
                    onClick={this.toggleNav}
                    className={navOpen ? `fa-times fas fa-lg nav-hamburger` : `fa-bars fas fa-lg nav-hamburger`}
                >
                </span>
                <ul className={navOpen ? `nav-menu open` : `nav-menu`}>
                    <li className="vri-nav" onClick={this.closeNav}>
                        <NavLink to="/voter-readiness">Voter Readiness</NavLink>
                        <span
                            className={`tooltip fas fa-lg fa-battery-${batteryType}`} style={{color: batteryColor}}
                            data-tooltip={batteryNotification}
                        >
                        </span>
                    </li>
                    <li onClick={this.closeNav}><NavLink to="/news">News</NavLink></li>
                    <li className="learn">
                        <a>Learn</a>
                        <ul>
                            <li onClick={this.closeNav}>
                                <NavLink to="/know-your-candidates">Know Your Candidates</NavLink>
                            </li>
                            <li onClick={this.closeNav}>
                                <NavLink to="/election-structure">Election Structure</NavLink>
                            </li>
                        </ul>
                    </li>
                    {user.isAuthenticated && <li onClick={this.closeNav}>
                        <button
                            onClick={this.logout}
                            className="auth-button"
                        >
                            Logout
                        </button>
                    </li>}
                    {!user.isAuthenticated && <li onClick={this.closeNav}>
                        <NavLink to="/login">
                            <button className="auth-button">
                                Login
                            </button>
                        </NavLink>
                    </li>}
                </ul>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    user: PropTypes.object,
    vri: PropTypes.object,
    getUser: PropTypes.func.isRequired,
    getUserVri: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return {
        user: state.user,
        vri: state.vri
    };
}

export default connect(mapStateToProps, { getUser, getUserVri, getNotifications })(NavigationBar);
