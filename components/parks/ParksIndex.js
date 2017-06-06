import React from 'react';
import { ScrollView, View } from 'react-native';
import ParksIndexItem from './ParksIndexItem';

export default class ParksIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { parks } = this.props;

    if(parks !== null) {
      var parkItems = [];
      parks.forEach(function(park, i) {
        parkItems.push(
          <ParksIndexItem
            key={`park${i}`}
            park={park}
          />
        );
      });
      return(
        <ScrollView>
          {parkItems}
        </ScrollView>
      )
    } else {
      return(
        <ScrollView>
          <View></View>
        </ScrollView>
      );
    }
  }
}
