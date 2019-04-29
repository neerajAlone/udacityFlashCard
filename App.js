import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
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
      Deck_Array: null
    }
  }
  componentWillMount() {
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
  componentDidUpdate() {
    AsyncStorage.setItem('DECK_ARRAY', JSON.stringify([...this.state.Deck_Array]), err=>{})
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
      choiceFunc: this.makingChoice
    }} />
  }
}

export default App;
