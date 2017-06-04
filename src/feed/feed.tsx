import * as React from 'react';
import '../App.css';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {PolitieControleFeedItem} from '../types/politieControleFeedItem';
import * as moment from 'moment';
import Avatar from 'material-ui/Avatar';

interface FeedProps {
  feed?: Array<PolitieControleFeedItem>;
  next?: string;
  getFeed?: (next?: string) => void;
}

interface FeedState {

}

export class Feed extends React.Component<FeedProps, FeedState> {
  onScrollHandler = this.facebookLoadNext.bind(this);

  constructor(props: FeedProps) {
    super(props);
    if (this.props.getFeed ) {
      this.props.getFeed();
    }
    window.addEventListener('scroll', this.onScrollHandler);  
  }

 facebookLoadNext() {
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          // you're at the bottom of the page  
          if (this.props.getFeed) {
            this.props.getFeed(this.props.next);
          }        
          
      }   
 }

getRandowColorForString(input: string) {
  return '#' + this.intToRGB(this.hashCode(input));
}

hashCode(str: string) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      /* tslint:disable-next-line no-bitwise */
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

intToRGB(i: number) {
    /* tslint:disable-next-line no-bitwise */
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    return '00000'.substring(0, 6 - c.length) + c;
}

renderItems() {
    let items = null;
    const self = this;
    if (this.props.feed) {
      items = this.props.feed.map(function(item: PolitieControleFeedItem, index: number){
      const key = 'item' + index;
      const messagePart = item.message.substring(0, 3).toLowerCase();
      const color = self.getRandowColorForString(messagePart);
      return (
        <ListItem 
          key={key} 
          primaryText={item.message} 
          secondaryText={moment(item.created_time).format('DD/MM/YYYY HH:mm')} 
          leftAvatar={<Avatar backgroundColor={color}>{messagePart}</Avatar>}
        />
        );    
      });
    }
    return items;
 }

render() {   
    return (
      <div>
        <List>
          <Subheader>Controles</Subheader>
          {
            this.renderItems()         
          }
        </List>      
      </div>
    );
  }
}

export default Feed;
