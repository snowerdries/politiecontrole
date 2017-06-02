import {POLITIECONTROLE_FEED_RECIEVED} from '../constants/actionTypes';
import PolitieControleFeedItem from '../types';
import { Action } from 'redux';

declare const FB: any;

export interface GetPolitiecontroleFeedAction extends Action {
    data?: Array<PolitieControleFeedItem>;
    next?: string;
}

export function PolitiecontroleFeedRecieved(data?: Array<PolitieControleFeedItem>,
                                            next?: string): GetPolitiecontroleFeedAction {
    return {
        type: POLITIECONTROLE_FEED_RECIEVED,
        data: data,
        next: next
    
    };
}

export function getPolitieControleFeed(next?: string) {
    return function(dispatch: any) {
        FB.api(
            next ? next : '/politiecontrole/feed',
            'GET',
            {limit: 15},
            function(jsonResult: any) {
                if (jsonResult && jsonResult.data) {
                    const items = jsonResult.data.map(function(item: any){
                        return {message: item.message, created_time: item.created_time };
                    });
                    dispatch(PolitiecontroleFeedRecieved(items, jsonResult.paging.next));
                }   
            }
        );        
    };   
}
