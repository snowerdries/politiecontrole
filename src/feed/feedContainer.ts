import { MainReducer }  from '../reducers';
import { connect } from 'react-redux';
import { getPolitieControleFeed } from './feedActions';
import { Feed } from './feed';

interface Props {
    
}

function mapDispatchToProps(dispatch: any, props: Props) {
    return {
        getFeed: () => {
            dispatch(getPolitieControleFeed());
        }
    };
}

function mapStateToProps(state: MainReducer) {
    return {
        feed: state.feed && state.feed.data ? state.feed.data : [],
    };
}

export const FeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);