import React, { Component } from 'react';
import { 
  View, TextInput, Text, StyleSheet,
  TouchableOpacity, Dimensions } from 'react-native';

class AddCard extends Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <TextInput placeholder="CardQuestion"
          style={styles.cardInput}></TextInput>
        <TextInput placeholder="CardAnswer"
          style={styles.cardInput}></TextInput>
        <TouchableOpacity style={styles.cardBtn}>
          <Text style={styles.cardBtnText}>SUBMIT</Text>
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
  cardInput: {
    width: Dimensions.get('window').width - 50,
    paddingVertical: 18,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
    letterSpacing: 1,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 2
  },
  cardBtn: {
    width: 180,
    paddingVertical: 18,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'green'
  },
  cardBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 2,
    color: 'white'
  }
})

export default AddCard;
