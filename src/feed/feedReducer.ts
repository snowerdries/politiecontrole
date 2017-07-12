import PolitieControleFeedItem from '../types/index';
import {GetPolitiecontroleFeedAction} from  './feedActions';
import {POLITIECONTROLE_FEED_RECIEVED} from '../constants/actionTypes';

export interface State {
    data: Array<PolitieControleFeedItem>;
    next?: string; 
    filter?: string;  
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
    if (action.filter) {
        newdata = newdata.filter((item) => {
            return item.message && item.message.toLocaleLowerCase().startsWith(action.filter ? action.filter : '');
        });
    }
    return {
        ...state,
        data: newdata,
        next: action.next,
        filter: action.filter
    };   
    default:
        return {
            ...state
        };
  }
}
