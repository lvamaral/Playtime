import React from 'react';
import { ScrollView, View } from 'react-native';
import ParksIndexItem from './ParksIndexItem';

export default class ParksIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { parks } = this.props;
    let { keyword } = this.props;
    keyword = keyword.toLowerCase();

    if(parks !== null) {
      var parkItems = [];
      parks.forEach(function(park, i) {
        if(park.name.toLowerCase().includes(keyword) || park.address.toLowerCase().includes(keyword)) {
          parkItems.push(
            <ParksIndexItem
            key={`park${i}`}
            park={park}
            />
          );
        }
      });

      if(parkItems.length > 0) {
        return(
          <ScrollView>
          {parkItems}
          </ScrollView>
        )
      }
      else{
        return(
          <View></View>
        )
      }

    } else {
      return(
        <View></View>
      );
    }
  }
}
