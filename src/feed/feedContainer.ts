import { MainReducer }  from '../reducers';
import { connect } from 'react-redux';
import { getPolitieControleFeed } from './feedActions';
import { Feed } from './feed';

interface Props {
    
}

function mapDispatchToProps(dispatch: any, props: Props) {
    return {
        getFeed: (next?: string) => {
            dispatch(getPolitieControleFeed(next));
        }
    };
}

function mapStateToProps(state: MainReducer) {
    return {
        feed: state.feed && state.feed.data ? state.feed.data  : [],
        next: state.feed && state.feed.next ? state.feed.next : ''
    };
}

export const FeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);