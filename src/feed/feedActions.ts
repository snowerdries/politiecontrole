import {POLITIECONTROLE_FEED_RECIEVED} from '../constants/actionTypes';
import PolitieControleFeedItem from '../types';
import { Action } from 'redux';

declare const FB: any;

export interface GetPolitiecontroleFeedAction extends Action {
    data?: Array<PolitieControleFeedItem>;
    next?: string;
    orgNext?: string;
    filter?: string;
}

export function PolitiecontroleFeedRecieved(data?: Array<PolitieControleFeedItem>,
                                            next?: string,
                                            orgNext?: string, filter?: string): GetPolitiecontroleFeedAction {
    return {
        type: POLITIECONTROLE_FEED_RECIEVED,
        data: data,
        next: next,
        orgNext: orgNext,    
        filter: filter
    };
}

export function getPolitieControleFeed(next?: string, filter?: string) {
    return function(dispatch: any) {
        let params = {};
        if (next) {
            params = {limit: 15};
        }
        FB.api(
            next ? next : '/politiecontrole/feed',
            'GET',
            params,
            function(jsonResult: any) {
                if (jsonResult && jsonResult.data) {
                    const items = jsonResult.data.map(function(item: any){
                        return {message: item.message, created_time: item.created_time };
                    });
                    dispatch(PolitiecontroleFeedRecieved(items, jsonResult.paging.next, next, filter));
                }   
            }
        );        
    };   
}
