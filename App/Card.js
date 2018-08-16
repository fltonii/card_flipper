import React, { Component } from 'react';
import { Text, View, Animated, TouchableOpacity, StyleSheet } from 'react-native';

export default class Card extends Component {
  constructor(props){
    super(props);
    this.state = { flipValue: new Animated.Value(0) };
  }

  handleFlip(){
    Animated.timing(this.state.flipValue,{
      toValue: 180,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={styles.container} >
        <View>
          <View style={styles.cardFront}>
            <Text style={styles.cardText} >
              This Is a Card
            </Text>
          </View>
          <View style={[styles.cardFront, styles.cardBack]} >
            <Text style={styles.cardText}>
              This Is a Card Back
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.handleFlip}>
          <Text style={[styles.cardText, {color: '#aaaaaa'}]} >flip</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    width: 230,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#560D00',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: '#040100',
    position: 'absolute',
    top: 0,
  },
  cardText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#fff',
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  }
});