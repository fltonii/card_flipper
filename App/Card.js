import React, { Component } from 'react';
import { Text, View, Animated, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default class Card extends Component {
  constructor(props){
    super(props);
    this.state = { flipValue: new Animated.Value(0), isFlipped: false};
    this.interpolateFront = this.state.flipValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.interpolateBack = this.state.flipValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  UNSAFE_componentWillMount() {
    const { flipValue } = this.state;
    if (Platform.OS === 'android') {
      Animated.sequence([
        Animated.timing(flipValue, {
          toValue: 180,
          duration: 1,
          useNativeDriver: true,
        }),
        Animated.timing(flipValue, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }

  handleFlip() {
    const { flipValue, isFlipped } = this.state;

    let flipConfig = {
      friction: 6,
      tension: 20,
      useNativeDriver: true
    };
    if(isFlipped){
      flipConfig = {
        ...flipConfig,
        toValue: 0,
      };
    } else {
      flipConfig = {
        ...flipConfig,
        toValue: 180,
      }
    }
    Animated.spring(flipValue, flipConfig).start();
    this.setState({isFlipped: !isFlipped});
  }


  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.interpolateFront },
      ]
    };
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.interpolateBack },
      ]
    };
    return (
      <View style={styles.container} >
        <View>
          <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
            <Text style={styles.cardText} >
              This Is a Card
            </Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.cardFront, styles.cardBack ]} >
            <Text style={styles.cardText}>
              This Is a Card Back
            </Text>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.handleFlip()}>
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
    width: 270,
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#560D00',
    backfaceVisibility: 'hidden',
    zIndex: 10
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
  },
});
