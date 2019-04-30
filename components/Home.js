import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Dimensions, TouchableOpacity,
  AsyncStorage
} from 'react-native'

class Home extends Component {
  render() {
    const { navigation, screenProps } = this.props;
    const { deckArrayData } = screenProps;
    return (
      <View style={styles.outerContainer}>
        <ScrollView style={styles.scrollContainer}>
          {
            deckArrayData && deckArrayData.map((eObj, index)=>{
              return (
                <TouchableOpacity style={styles.eachDeck}
                  key={index}
                  onPress={()=>navigation.navigate('EachDeck', {deckName: eObj.deckTitle})}>
                  <View style={{paddingVertical: 15}}>
                    <Text style={styles.deckTitle}>{eObj.deckTitle}</Text>
                    <Text style={styles.deckTitle2}>{eObj.deckCardContainer.length} cards</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center'
  },
  scrollContainer: {
    width: Dimensions.get('window').width,
    paddingVertical: 5, paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingTop: 18
  },
  eachDeck: {
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    marginBottom: 15
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 25,
    color: 'grey'
  },
  deckTitle2: {
    textAlign: 'center',
    fontSize: 18,
    color: 'grey'
  },
})

export default Home;