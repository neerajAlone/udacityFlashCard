import React, { Component } from 'react';
import { AsyncStorage, Alert, AppState } from 'react-native'
import { Permissions, Notifications } from 'expo';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Home from './components/Home';
import Add from './components/Add';
import EachDeck from './components/EachDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import UserStats from './components/UserStats';

const stackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'ALL DECKS'
    }
  },
  EachDeck: {
    screen: EachDeck,
    navigationOptions: ({navigation})=>({
      title: navigation.state.params.deckName
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'ADD CARD'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation})=>({
      title: navigation.state.params.deckName + ' QUIZ'
    })
  }
}, {
  defaultNavigationOptions: {
    headerTitleStyle: {
      color: 'grey',
      letterSpacing: 1
    }
  }
})
const RouteAppContainer = createAppContainer(
  createBottomTabNavigator({
    Home: {
      screen: stackNavigator,
      navigationOptions: {
        title: 'DECKS',
        tabBarIcon: ()=><FontAwesome name="home" color="white" size={28} />
      }
    },
    Add: {
      screen: Add,
      navigationOptions: {
        title: 'ADD',
        tabBarIcon: ()=><FontAwesome name="plus" color="white" size={28} />
      }
    },
    UserStats: {
      screen: UserStats,
      navigationOptions: {
        title: 'USERSTATS',
        tabBarIcon: ()=><FontAwesome name="pie-chart" color="white" size={28} />
      }
    }
  }, {
    tabBarOptions: {
      tabStyle: {
        backgroundColor: 'grey',
        paddingTop: 7
      },
      activeTintColor: 'white',
      inactiveTintColor: '#aaa'
    },
  }))

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Deck_Array: null,
      notificationKey: null,
      someCardNotAttemptDeckTitle: []
    }
  }
  componentWillMount() {
    AppState.addEventListener('change', (e)=>{
      if(e === 'background' || e === 'inactive') {
        this.setState(prevState=>{
          let mallu = []
          prevState.Deck_Array.forEach(eDeck=>{
            let nullArray = eDeck.deckCardContainer.filter(eCard=>eCard.userRes===null)
            if(nullArray.length !== 0) mallu.push(eDeck.deckTitle);
          })
          return { someCardNotAttemptDeckTitle: mallu }
        })
        if(this.state.notificationKey === 'TRUE') {
          this.setUpNotification(Date.now())
        }
      } else {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
    })
    AsyncStorage.getItem('DECK_ARRAY', (err, data)=>{
      if(data !== null) {
        this.setState({Deck_Array: [...JSON.parse(data)]})
      } else {
        AsyncStorage.setItem('DECK_ARRAY', JSON.stringify([]), err=>{
          if(!err) {
            this.setState({Deck_Array: []});
          }
        })
      }
    })
  }
  componentDidMount() {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(({status})=>{
        if(status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();
          AsyncStorage.getItem('notificationAllowedByUser', (err, data)=>{
            if(data) {
              this.setState({notificationKey: data})
            } else {
              AsyncStorage.setItem('notificationAllowedByUser', 'TRUE', err=>{
                if(!err) {
                  this.setState({notificationKey: 'TRUE'});
                }
              })
            }
          })
        } else {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(userRes=>{
              if(userRes.status === 'granted') {
                AsyncStorage.setItem('notificationAllowedByUser', 'TRUE', err=>{
                  if(!err) {
                    this.setState({notificationKey: true});
                  }
                })
              } else {
                Alert.alert('Notifications is required');
                return
              }
            })
        }
      })
  }
  componentDidUpdate() {
    AsyncStorage.setItem('DECK_ARRAY', JSON.stringify([...this.state.Deck_Array]), err=>{})
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', (e)=>{
      return
    })
  }

  restartQuiz =(deckTitle)=> {
    this.setState(preState=>{
      let deckObject = preState.Deck_Array.find(eO=>{
        return eO.deckTitle===deckTitle
      })
      deckObject.deckCardContainer.forEach(eCard=>{
        eCard.userRes = null
      })
      return {
        Deck_Array: [...preState.Deck_Array]
      }
    })
  }
  setUpNotification =(timeStamp)=>{
    Notifications.scheduleLocalNotificationAsync({
      title: 'TITLE',
      body: 'BODY'
    }, {
      time: timeStamp+5*60*1000,
      repeat: 'day'
    })
  }
  addInDeck =(dataObject)=>{
    this.setState(preState=>{
      return {
        Deck_Array: [...preState.Deck_Array, dataObject]
      }
    })
  }
  addCardInDeck =(deckTitle, cardObj)=>{
    this.setState(preState=>{
      let deckObject = preState.Deck_Array.find(eO=>{
        return eO.deckTitle===deckTitle
      })
      deckObject.deckCardContainer = [...deckObject.deckCardContainer, cardObj]
      return {
        Deck_Array: [...preState.Deck_Array]
      }
    })
  }
  makingChoice =(deckTitle, question, choice)=> {
    this.setState(preState=>{
      let deckObject = preState.Deck_Array.find(eO=>{
        return eO.deckTitle===deckTitle
      })
      let qObj = deckObject.deckCardContainer.find(eqObj=>{
        return eqObj.cardQuestion === question
      });
      qObj['userRes'] = choice
      return {
        Deck_Array: [...preState.Deck_Array]
      }
    })
  }
  removeInDeck =(deckTitle)=>{
    this.setState(preState=>{
      let editedArray = preState.Deck_Array.filter(eObj=>{
        return eObj.deckTitle !== deckTitle
      })
      return {
        Deck_Array: editedArray
      }
    })
  }
  render() {
    return <RouteAppContainer screenProps={{
      deckArrayData: this.state.Deck_Array,
      addFunc: this.addInDeck,
      addCardFunc: this.addCardInDeck,
      removeFunc: this.removeInDeck,
      choiceFunc: this.makingChoice,
      resetFunc: this.restartQuiz
    }} />
  }
}

export default App;
