import React from 'react';
import PropTypes from 'prop-types';

/**
 * VRI test result section
 */
const Result = ({recommendations, username, rank, score, openFrame, retakeTest}) => (
    <section className="result">
        <div id="donut-chart">
        </div>
        {rank &&
        <div className="rank">
            <img src={rank.image} />
            <p>Your rank: <span>{rank.title}</span></p>
            <aside>
                <span className={rank.title === 'Slow Mover' ? 'active' : 'inactive'}>Slow Mover</span> &#8594;
                <span className={rank.title === 'Citizen' ? 'active' : 'inactive'}> Citizen</span> &#8594;
                <span className={rank.title === 'Patroit' ? 'active' : 'inactive'}> Patroit</span> &#8594;
                <span className={rank.title === 'Knight' ? 'active' : 'inactive'}> Knight</span>
            </aside>
        </div>}
        <article id="recommendations">
            <h3>Hello {username},</h3>
            <p>
                Thank you for taking your time to check your voter readiness.
                Right now you are
                {score < 50 && ' far from being '}
                {score > 50 && score < 100 && ' close to being '}
                {score === 100 && ' '}
                vote ready.
            </p>
            {recommendations && recommendations.map(recommendation =>
                <p key={recommendation}>
                    {recommendation}
                </p>
            )}
        </article>
        <div className="result-options">
            <a href="https://govote.org.ng/search" target="frame" onClick={openFrame}>
                <button>
                    Find a Registration Center
                </button>
            </a>
            <a href="http://www.inecnigeria.org/?page_id=5217" target="_blank">
                <button>
                    Find INEC Office near you
                </button>
            </a>
        </div>
        <article id="recommendations">
            <p>
                Having checked your Voter Readiness, why not tell your friends to do so too.
            </p>
        </article>
        <div className="social-share">
            <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwevote-ng.herokuapp.com%2F&amp;src=sdkpreparse"
                data-href="https://wevote-ng.herokuapp.com"
                className="fb-share-button"
                target="_blank"
            >
                <button>
                    Share on Facebook
                </button>
            </a>
            <a
                href="https://twitter.com/intent/tweet?text=I%20just%20checked%20my%20voter%20readiness%20on%20WeVote.%20Check%20yours&url=https%3A%2F%2Fwevote-ng.herokuapp.com%2F&via=saucecodexyz&related=ignatiusukwuoma%2Ckingobi1&hashtags=nigeria%2Celection"
                target="_blank"
                className="tw-share-button"
            >
                <button>
                    Share on Twitter
                </button>
            </a>
        </div>
        <div className="done">
            Already completed some of these recommendations?
            <a onClick={retakeTest}> Check voter readiness again </a>
        </div>
    </section>
);


Result.propTypes = {
    recommendations: PropTypes.array,
    username: PropTypes.string,
    rank: PropTypes.object,
    score: PropTypes.number,
    openFrame: PropTypes.func.isRequired,
    retakeTest: PropTypes.func.isRequired,
};

export default Result;
