import React, {Component} from 'react';
import {
  View, Text, StyleSheet,
  TextInput, Dimensions,
  TouchableOpacity
} from 'react-native'

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: '',
      deckCardContainer: []
    }
  }
  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View style={styles.outerContainer}>
        <Text style={styles.textContainer}
          >What is the title of your new Deck ?</Text>
        <TextInput placeholder="ENTER DECK TITLE..."
          onChange={e=>this.setState({deckTitle: e.nativeEvent.text})}
          value={this.state.deckTitle}
          style={styles.inputContainer} />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={()=>{
            screenProps.addFunc(this.state);
            navigation.navigate('EachDeck', {deckName: this.state.deckTitle})
            this.setState({deckTitle: ''})
          }}
          style={styles.touchContainer}>
          <Text style={styles.btnText}>CREATE DECK</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },
  textContainer: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15
  },
  inputContainer: {
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
  touchContainer: {
    width: 180,
    paddingVertical: 18,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'black'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 2,
    color: 'white'
  }
})

export default Add;