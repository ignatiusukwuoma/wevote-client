import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNews, getImage } from '../../actions/newsActions';
import inecLogo from '../../assets/inec-logo.png';

/**
 * News page
 */
class News extends Component {
    constructor(props){
        super(props);
        this.state = {
            imagesRequested: false
        };
    }

    /**
     * Gets the news if not available in store
     */
    componentDidMount() {
        if (!this.props.news.length > 0) {
            this.props.getNews();
        }
    }

    /**
     * Request featured images if not previously requested
     * @param {object} nextProps
     */
    componentWillReceiveProps(nextProps){
        if (this.state.imagesRequested) return;
        if (nextProps.news.length > 0) {
            this.requestImages(nextProps.news);
        }
    }

    /**
     * Make a request for the image of each post
     * @param {array} posts
     */
    requestImages(posts){
        posts.forEach(post => {
            this.props.getImage(post.media);
        });
        this.setState({imagesRequested: true});
    }

    render(){
        const { news } = this.props;
        return (
            <div className="news-page">
                <header>
                    <h1>Latest News from INEC</h1>
                    <small>Visit <a href="http://www.inecnews.com" target="_blank">www.inecnews.com </a>
                        for more election news
                    </small>
                </header>
                <div className="news">
                {news && news.map(newsItem =>
                    <article key={newsItem.id}>
                        <a className="read-more" href={newsItem.link} target="_blank">
                            <section>
                                <div className="preview">
                                    <img className="news-image" src={newsItem.image || inecLogo} />
                                </div>
                                <h4>{newsItem.title}</h4>
                            </section>
                            <div className="news-content" dangerouslySetInnerHTML=
                                   {{ __html: `${newsItem.excerpt.slice(0, -16)}...` }}>
                            </div>
                            <p className="news-date">{new Date(newsItem.date).toLocaleDateString()}</p>
                        </a>
                    </article>
                )}
                </div>
            </div>
        );
    }
}

News.propTypes = {
    news: PropTypes.array,
    getNews: PropTypes.func.isRequired,
    getImage: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return {
        news: state.news
    };
}

export default connect(mapStateToProps, { getNews, getImage })(News);
