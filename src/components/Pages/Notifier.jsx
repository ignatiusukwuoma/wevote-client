import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

import { sendNotification } from '../../actions/notificationActions';
import {handleError} from "../../utils/errorHandler";

class Notifier extends Component {
    constructor(props){
        super(props);
        this.state = {
          message: ''
        };
        this.sendNotification = this.sendNotification.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    sendNotification(){
        this.props.sendNotification({message: this.state.message})
            .then(() => {
                toastr.success('Message sent successfully');
            })
            .catch((error) => handleError(error))
    }

    handleChange(event) {
        this.setState({ message: event.target.value});
    }

    render(){
        return (
            <div className="notifier">
                <section>
                    <p>
                        Send a Notification to all users on WeVote
                    </p>
                </section>
                <section>
                    <textarea
                        name="message"
                        placeholder="Enter notification"
                        onChange={this.handleChange}
                        value={this.state.message}
                    >
                    </textarea>
                    <span>Word count: {this.state.message.length}</span>
                    <button
                        onClick={this.sendNotification}
                        type="button"
                    >
                        Send to all users
                    </button>
                </section>
            </div>
        );
    }
}

export default connect(null, { sendNotification })(Notifier);
