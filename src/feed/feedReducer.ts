import PolitieControleFeedItem from '../types/index';
import {GetPolitiecontroleFeedAction} from  './feedActions';
import {POLITIECONTROLE_FEED_RECIEVED} from '../constants/actionTypes';

export interface State {
    data: Array<PolitieControleFeedItem>;
}

const initialState = {
    data: [],
};

export function feedReducer(state: State = initialState, action: GetPolitiecontroleFeedAction): State {
  switch (action.type) {
    case POLITIECONTROLE_FEED_RECIEVED:
      return {
          ...state,
          data: action.data
      };   
    default:
        return {
            ...state
        };
  }
}
