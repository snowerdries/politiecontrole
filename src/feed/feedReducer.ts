import PolitieControleFeedItem from '../types/index';
import {GetPolitiecontroleFeedAction} from  './feedActions';
import {POLITIECONTROLE_FEED_RECIEVED} from '../constants/actionTypes';

export interface State {
    data: Array<PolitieControleFeedItem>;
    next?: string; 
    filter?: string; 
    scrollToTop?: boolean; 
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
            return item.message && item.message.toLocaleLowerCase().indexOf(action.filter ? action.filter : '') > -1;
        });
    }
    return {
        ...state,
        data: newdata,
        next: action.next,
        filter: action.filter,
        scrollToTop: !action.orgNext ? true : false
    };   
    default:
        return {
            ...state
        };
  }
}
