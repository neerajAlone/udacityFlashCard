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
import Quiz from './components/Quiz'

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
    navigationOptions: {
      title: 'QUIZ'
    }
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
    }
  }, {
    tabBarOptions: {
      tabStyle: {
        backgroundColor: 'grey',
        paddingTop: 7
      },
      activeTintColor: 'white'
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
  removeInDeck =(dataObject)=>{
    this.setState(preState=>{
      let editedArray = preState.Deck_Array.filter(eObj=>{
        return eObj.deckTitle !== dataObject
      })
      return {
        Deck_Array: [...editedArray]
      }
    })
  }
  render() {
    return <RouteAppContainer screenProps={{
      deckArrayData: this.state.Deck_Array,
      addFunc: this.addInDeck,
      removeFunc: this.removeInDeck
    }} />
  }
}

export default App;
