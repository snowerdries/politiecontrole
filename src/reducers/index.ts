import { combineReducers } from 'redux';
import { feedReducer, State as FeedState } from '../feed/feedReducer';

export interface MainReducer {
  feed: FeedState;
}

export const politieControleApp = combineReducers({
  feed: feedReducer,
});