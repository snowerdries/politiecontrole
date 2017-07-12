import { MainReducer }  from '../reducers';
import { connect } from 'react-redux';
import { getPolitieControleFeed } from './feedActions';
import { Feed } from './feed';
import {PolitieControleFeedItem} from '../types/politieControleFeedItem';

interface Props {
    feed?: Array<PolitieControleFeedItem>;
    next?: string;
    filter?: string;
    getFeed?: (next?: string, filter?: string) => void;    
}

function mapDispatchToProps(dispatch: any, props: Props) {
    let propsval: Props = {
        getFeed: (next?: string, filter?: string) => {
            dispatch(getPolitieControleFeed(next, filter));
        }
    };
    return propsval;   
}

function mapStateToProps(state: MainReducer) {    
    let propsval: Props = {
        feed: state.feed && state.feed.data ? state.feed.data  : [],
        next: state.feed && state.feed.next ? state.feed.next : '',
        filter: state.feed && state.feed.filter ? state.feed.filter : ''
    };
    return propsval;
}

export const FeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);