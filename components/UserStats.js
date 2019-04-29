import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

class UserStats extends Component {
  render() {
    const { screenProps, navigation } = this.props;
    return (
      <View style={styles.outerContainer}>
      {
        screenProps.deckArrayData.length !== 0?
          <FlatList data={screenProps.deckArrayData}
            renderItem={({item})=>{
              return (
                <View style={styles.eachStats}>
                  <Text style={styles.statsTitle}>{item.deckTitle}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.statsTitle1}>TOTAL CARD</Text>
                    <Text style={styles.statsTitle1}>{item.deckCardContainer.length}</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.statsTitle1}>SELECTED CORRECT</Text>
                    <Text style={styles.statsTitle1}>{
                      item.deckCardContainer.filter(eQAObj=>{
                        return eQAObj.userRes === 'correct'
                      }).length
                    }</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.statsTitle1}>SELECTED INCORRECT</Text>
                    <Text style={styles.statsTitle1}>{
                      item.deckCardContainer.filter(eQAObj=>{
                        return eQAObj.userRes === 'incorrect'
                      }).length
                    }</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.statsTitle1}>NOT ATTEMPT</Text>
                    <Text style={styles.statsTitle1}>{
                      item.deckCardContainer.filter(eQAObj=>{
                        return eQAObj.userRes === null
                      }).length
                    }</Text>
                  </View>
                </View>
              )
            }} keyExtractor={(item, index)=>index.toString()} />:null
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 45
  },
  eachStats: {
    width: 300,
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 13,
    marginBottom: 15,
    backgroundColor: '#ddd',
    borderRadius: 5
  },
  statsTitle: {
    fontSize: 25
  },
  statsTitle1: {
    fontWeight: 'bold',
    color: 'grey'
  }
})

export default UserStats;
