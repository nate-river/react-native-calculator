/**
 *
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//noinspection JSUnresolvedVariable
import React, {Component} from 'react';
import ExpressionTree from './expression-tree';
//noinspection JSUnresolvedVariable
import {
  AppRegistry,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
}from 'react-native';
var tree = new ExpressionTree();
const NUMBER = 1;
const DEL = 2;
const OPERATOR = 3;
const EQUAL = 4;
const AC = 5;
const buttons = [
  {text: 'AC', type: AC},
  {text: '(', type: NUMBER},
  {text: ')', type: NUMBER},
  {text: 'del', type: DEL},
  {text: '7', type: NUMBER},
  {text: '8', type: NUMBER},
  {text: '9', type: NUMBER},
  {text: '/', type: OPERATOR},
  {text: '4', type: NUMBER},
  {text: '5', type: NUMBER},
  {text: '6', type: NUMBER},
  {text: '*', type: OPERATOR},
  {text: '1', type: NUMBER},
  {text: '2', type: NUMBER},
  {text: '3', type: NUMBER},
  {text: '-', type: OPERATOR},
  {text: '.', type: NUMBER},
  {text: '0', type: NUMBER},
  {text: '=', type: EQUAL},
  {text: '+', type: OPERATOR},
];

class Screen extends Component {
  render() {
    //noinspection JSUnresolvedVariable,JSUnresolvedVariable
    var display = String(this.props.value);
    if (display.length > 11) {
      display = parseFloat(display).toPrecision(8);
    }
    return (
      <View style={styles.display}>
        <Text style={styles.history}>{this.props.expression}</Text>
        <Text style={styles.number}>{display}</Text>
      </View>
    );
  }
}

class Operator extends Component {
  render() {
    const buttonList = this.props.buttons.map((v, i) => {
      return (
        <View style={styles.item} key={i}>
          <TouchableNativeFeedback onPress={()=>this.props.process(v)}
                                   background={TouchableNativeFeedback.Ripple('#c2f3f9',true)}>
            <View style={styles.button}>
              <Text style={styles.font}>{v.text}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    });
    return (
      <View style={styles.operation}>
        {buttonList}
      </View>
    );
  }
}

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      value: 0
    };
    this.process = this.process.bind(this);
  }

  processAc() {
    this.setState((prev)=>({expression: '', value: 0}));
  }

  processDel() {
    this.setState((prev)=>({expression: prev.expression.slice(0, -1)}));
  }

  processNumber(text) {
    this.setState((prev)=>({expression: prev.expression + text}));
  }

  processOperator(text) {
    this.setState((prev)=>({expression: prev.expression + text}));
  }

  processEqual() {
    if (this.state.expression) {
      tree.input(this.state.expression);
    }
    this.setState((prev)=>({value: tree.evaluate()}));
  }

  process(v) {
    switch (v.type) {
      case NUMBER:
        this.processNumber(v.text);
        break;
      case OPERATOR:
        this.processOperator(v.text);
        break;
      case EQUAL:
        this.processEqual();
        break;
      case AC:
        this.processAc();
        break;
      case DEL:
        this.processDel();
        break;
    }
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#ffffff'}}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Screen {...this.state}/>
        <Operator buttons={buttons} process={this.process}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ////////////////////////////////////////
  history: {
    flex: 3,
    color: '#c8c7c6',
    textAlign: 'right',
    fontSize: 20,
    textAlignVertical: 'bottom',
    // fontFamily: 'sans-serif-light',
    paddingRight: 30,
  },
  number: {
    fontFamily: 'sans-serif-condensed',
    flex: 4,
    fontSize: 60,
    textAlign: 'right',
    textAlignVertical: 'center',
    paddingRight: 30,
  },


  /////////////////////////////////
  display: {
    flex: 1,
  },


  //////////////////////////////////
  operation: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    height: '20%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  font: {
    // fontFamily:'sans-serif-condensed',
    // fontFamily:'sans-serif-thin',
    // fontFamily:'sans-serif-medium',
    fontFamily: 'sans-serif-light',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
});

AppRegistry.registerComponent('Music', ()=>Music);
