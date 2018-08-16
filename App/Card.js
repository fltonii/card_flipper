import React, { Component } from 'react';
import { Text, View, Animated, TouchableWithoutFeedback } from 'react-native';

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
      <View styles={styles.container} >
        <TouchableWithoutFeedback onPress={() => this.handleFlip}>
          <View styles={styles.cardFront}>
            <Text styles={styles.cardText} >
            This Is a Card
            </Text>
          </View>
          <View styles={styles.cardBack}>
            <Text> This Is a Card Back </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardFront: {
    backbroundColor: '#040100',
  },
  cardBack: {
    width: '70%',
    height: '80%',
    backgroundColor: '#ECAFA4',
    backfaceVisibility: 'hidden',
  },
  cardText: {
    color: '#fff'
  }
});