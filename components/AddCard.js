import React, { Component } from 'react';
import { 
  View, TextInput, Text, StyleSheet,
  TouchableOpacity, Dimensions } from 'react-native';

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardQuestion: '',
      cardAnswer: '',
      userRes: null
    }
  }
  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View style={styles.outerContainer}>
        <TextInput placeholder="CardQuestion"
          value={this.state.cardQuestion}
          onChange={e=>this.setState({cardQuestion: e.nativeEvent.text})}
          style={styles.cardInput}></TextInput>
        <TextInput placeholder="CardAnswer"
          value={this.state.cardAnswer}
          onChange={e=>this.setState({cardAnswer: e.nativeEvent.text})}
          style={styles.cardInput}></TextInput>
        <TouchableOpacity style={styles.cardBtn}
          onPress={()=>{
            screenProps.addCardFunc(navigation.state.params.deckName, this.state);
            this.setState({
              cardQuestion: '',
              cardAnswer: ''
            })
            navigation.goBack();
          }}>
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
