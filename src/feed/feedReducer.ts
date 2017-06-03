import PolitieControleFeedItem from '../types/index';
import {GetPolitiecontroleFeedAction} from  './feedActions';
import {POLITIECONTROLE_FEED_RECIEVED} from '../constants/actionTypes';

export interface State {
    data: Array<PolitieControleFeedItem>;
    next: string;   
}

const initialState = {
    data: [],
    next: ''    
};

export function feedReducer(state: State = initialState, action: GetPolitiecontroleFeedAction): State {
  switch (action.type) {
    case POLITIECONTROLE_FEED_RECIEVED:
    let newdata = action.orgNext ? state.data : [];
    if (action.data) {
        newdata = newdata.concat(action.data);
    }    
    return {
        ...state,
        data: newdata,
        next: action.next
    };   
    default:
        return {
            ...state
        };
  }
}
