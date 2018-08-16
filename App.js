import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import Card from './App/Card';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C36D5D'
  }
});