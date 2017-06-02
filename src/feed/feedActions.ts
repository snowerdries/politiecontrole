import {POLITIECONTROLE_FEED_RECIEVED} from '../constants/actionTypes';
import PolitieControleFeedItem from '../types';
import { Action } from 'redux';

export interface GetPolitiecontroleFeedAction extends Action {
    data?: Array<PolitieControleFeedItem>;
}

export function PolitiecontroleFeedRecieved(data?: Array<PolitieControleFeedItem>): GetPolitiecontroleFeedAction {
    return {
        type: POLITIECONTROLE_FEED_RECIEVED,
        data: data
    };
}

export function getPolitieControleFeed() {
    return function(dispatch: any) {
        dispatch(PolitiecontroleFeedRecieved([{message: '123'}]));
    };
    // return PolitiecontroleFeedRecieved([{message: '123'}]);    
}
