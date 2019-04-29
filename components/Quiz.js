import React, { Component } from 'react';
import { 
  View, Text, StyleSheet,
  TouchableOpacity,
  Button, Dimensions,
  ScrollView} from 'react-native';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAns: true,
      scrolled: 0,
      qSerial: 1
    }
  }
  componentDidUpdate() {
    this.flatList.scrollTo({x: this.state.scrolled, y: 0, animated: true, duration: 200})
  }
  scrollUpTo(len, serial) {
    this.setState(preState=>{
      return {
        scrolled: preState.scrolled + len,
        qSerial: preState.qSerial + serial
      }
    })
  }
  render() {
    const { screenProps, navigation } = this.props;
    let deckObj = screenProps.deckArrayData.find(eO=>{
      return eO.deckTitle === navigation.state.params.deckName
    })
    console.log(navigation)
    return (
      <View style={styles.outerContainer}>
      {
        deckObj.deckCardContainer.length !== 0?
          <ScrollView style={{flex: 1}} horizontal={true}
            scrollEnabled={false} showsHorizontalScrollIndicator={false}
            ref={fList=>{this.flatList = fList}}>
            {
              deckObj.deckCardContainer.map((eObj, index)=>{
                return (
                  <View style={styles.outerBox} key={index}>
                    <View style={styles.innerBox}>
                      {
                        this.state.showAns?
                          <View>
                            <Text style={styles.quizTitle}>{eObj.cardQuestion}</Text>
                            <TouchableOpacity style={styles.quizBtn}
                              onPress={()=>this.setState({showAns: false})}>
                              <Text style={[styles.quizBtnText, {color: 'red'}]}>ANSWER</Text>
                            </TouchableOpacity>
                          </View>:
                          <View>
                            <Text style={styles.quizTitle}>{eObj.cardAnswer}</Text>
                            <TouchableOpacity style={styles.quizBtn}
                              onPress={()=>this.setState({showAns: true})}>
                              <Text style={[styles.quizBtnText, {color: 'red'}]}>QUESTION</Text>
                            </TouchableOpacity>
                          </View>
                      }
                      <TouchableOpacity disabled={eObj.userRes==='correct'?true:false}
                        style={[styles.quizBtn, {backgroundColor: 'green', opacity: eObj.userRes==='correct'?0.4:1}]}
                        onPress={()=>{
                          screenProps.choiceFunc(navigation.state.params.deckName, eObj.cardQuestion, 'correct');
                          if(this.state.qSerial === deckObj.deckCardContainer.length) {
                            navigation.popToTop();
                            navigation.navigate('UserStats');
                          } else {
                            this.scrollUpTo(Dimensions.get('window').width, 1);
                          }
                        }}>
                        <Text style={styles.quizBtnText}>CORRECT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity disabled={eObj.userRes==='incorrect'?true:false}
                        style={[styles.quizBtn, {backgroundColor: 'red', opacity: eObj.userRes==='incorrect'?0.4:1}]}
                        onPress={()=>{
                          screenProps.choiceFunc(navigation.state.params.deckName, eObj.cardQuestion, 'incorrect');
                          if(this.state.qSerial === deckObj.deckCardContainer.length) {
                            navigation.popToTop();
                            navigation.navigate('UserStats');
                          } else {
                            this.scrollUpTo(Dimensions.get('window').width, 1);
                          }
                        }}>
                        <Text style={styles.quizBtnText}>INCORRECT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>:null
      }
      {
        deckObj.deckCardContainer.length !== 0?
          <View style={styles.cardNavigator}>
            <Button title="PREV" onPress={()=>this.scrollUpTo(-Dimensions.get('window').width, -1)}
              disabled={this.state.qSerial === 1?true:false} />
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {`${this.state.qSerial}/${deckObj.deckCardContainer.length}`}
            </Text>
            <Button title="NEXT" onPress={()=>this.scrollUpTo(Dimensions.get('window').width, 1)}
              disabled={this.state.qSerial === deckObj.deckCardContainer.length?true:false} />
          </View>:null
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  outerBox: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-105-80,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerBox: {
    width: Dimensions.get('window').width-50,
    height: Dimensions.get('window').height-105-30-80,
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingTop: 30,
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 25,
    letterSpacing: 1,
    textAlign: 'center'
  },
  quizBtn: {
    width: 180,
    paddingVertical: 18,
    marginBottom: 10,
    borderRadius: 5
  },
  quizBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 2
  },
  cardNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width-80,
    alignItems: 'center',
    height: 80
  }
})

export default Quiz;
