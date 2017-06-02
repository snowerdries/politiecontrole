import {POLITIECONTROLE_FEED_RECIEVED} from '../constants/actionTypes';
import PolitieControleFeedItem from '../types';
import { Action } from 'redux';

declare const FB: any;

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
        FB.api(
            '/politiecontrole/feed',
            'GET',
            {},
            function(jsonResult: any) {
                if (jsonResult && jsonResult.data) {
                    const items = jsonResult.data.map(function(item: any){
                        return {message: item.message, created_time: item.created_time };
                    });
                    dispatch(PolitiecontroleFeedRecieved(items));
                }   
            }
        );        
    };   
}
