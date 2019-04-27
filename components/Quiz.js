import React, { Component } from 'react';
import { 
  View, Text, StyleSheet,
  TouchableOpacity } from 'react-native';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAns: true
    }
  }
  render() {
    return(
      <View style={styles.outerContainer}>
        {
          this.state.showAns?
            <View>
              <Text style={styles.quizTitle}>QUESTION TEXT</Text>
              <TouchableOpacity style={styles.quizBtn}
                onPress={()=>this.setState({showAns: false})}>
                <Text style={[styles.quizBtnText, {color: 'red'}]}>ANSWER</Text>
              </TouchableOpacity>
            </View>:
            <View>
              <Text style={styles.quizTitle}>ANSWER TEXT</Text>
              <TouchableOpacity style={styles.quizBtn}
                onPress={()=>this.setState({showAns: true})}>
                <Text style={[styles.quizBtnText, {color: 'red'}]}>QUESTION</Text>
              </TouchableOpacity>
            </View>
        }
        <TouchableOpacity
          style={[styles.quizBtn, {backgroundColor: 'green'}]}>
          <Text style={styles.quizBtnText}>CORRECT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quizBtn, {backgroundColor: 'red'}]}>
          <Text style={styles.quizBtnText}>INCORRECT</Text>
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
  quizTitle: {
    fontSize: 25,
    letterSpacing: 1
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
  }
})

export default Quiz;
