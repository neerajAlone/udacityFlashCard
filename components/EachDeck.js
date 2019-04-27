import React, { Component } from 'react';
import { 
  View, Text, StyleSheet,
  TouchableOpacity } from 'react-native';

class EachDeck extends Component {
  render() {
    return(
      <View style={styles.outerContainer}>
        <Text style={styles.deckTitle}>DeckName</Text>
        <Text style={styles.deckTitle1}>no. of cards</Text>
        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('AddCard')}
          style={[styles.deckBtn, {backgroundColor: 'green'}]}>
          <Text style={[styles.deckBtnText, {color: 'white'}]}
            >ADD CARD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('Quiz')}
          style={[styles.deckBtn, {backgroundColor: 'blue'}]}>
          <Text style={[styles.deckBtnText, {color: 'white'}]}
            >START QUIZ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deckBtn}
          onPress={()=>{
            this.props.screenProps.removeFunc(this.props.navigation.state.params.deckName);
            this.props.navigation.navigate('Home')
          }}>
          <Text style={[styles.deckBtnText, {color: 'red'}]}
            >DELETE DECK</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  deckTitle: {
    fontSize: 25,
    letterSpacing: 1
  },
  deckTitle1: {
    letterSpacing: 1,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 100
  },
  deckBtn: {
    width: 180,
    paddingVertical: 18,
    marginBottom: 10,
    borderRadius: 5
  },
  deckBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 2
  }
})

export default EachDeck;