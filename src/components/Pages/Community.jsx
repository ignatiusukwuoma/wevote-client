import React,{ Component } from 'react';

/**
 * Community page
 */
class Community extends Component {
    constructor(props){
        super(props);
        this.state = {
            tweet: {
                post: '',
                hashTags: ''
            },
            twitterAccount: 'WeVote_Nigeria'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
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
    }

    handleChange(event) {
        const tweet = this.state.tweet;
        tweet[event.target.name] = event.target.value;
        this.setState({ tweet });
    }

    render(){
        const {tweet, twitterAccount} = this.state;
        return (
            <div className="community">
                <header>
                    <h1>Community</h1>
                </header>
                <section className="twitter-feed">
                    <a
                        className="twitter-timeline"
                        href={`https://twitter.com/${twitterAccount}?ref_src=twsrc%5Etfw`}
                    >
                        Tweets by {twitterAccount}
                    </a>
                </section>
                <aside className="make-post">
                    <textarea
                        rows="6"
                        cols="50"
                        name="post"
                        placeholder="Start a new discussion"
                        onChange={this.handleChange}
                        value={tweet.post}
                    >
                    </textarea>
                    <input
                        type="text"
                        name="hashTags"
                        placeholder="Enter hashtags (optional)"
                        onChange={this.handleChange}
                        value={tweet.hashTags}
                    />
                    <span>Tweet Length: ~
                        {tweet.post.length + tweet.hashTags.length + twitterAccount.length + 10}
                    </span>
                    <a
                        href={`https://twitter.com/intent/tweet?text=${tweet.post}&via=${twitterAccount}&hashtags=${tweet.hashTags.replace(/\W+/g, '%2C')}`}
                        target="_blank"
                        className="tw-share-button"
                    >
                        <button>
                            Post on Twitter
                        </button>
                    </a>
                </aside>
            </div>
        );
    }
}

export default Community;
