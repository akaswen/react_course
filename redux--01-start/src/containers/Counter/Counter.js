import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  state = {
    counter: 0
  }

  counterChangedHandler = ( action, value ) => {
    switch ( action ) {
      case 'inc':
        this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
        break;
      case 'dec':
        this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
        break;
      case 'add':
        this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
        break;
      case 'sub':
        this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
        break;
    }
  }

  render () {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl label="Increment"  clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement"  clicked={this.props.onDecrementCounter} />
        <CounterControl label="Add 10"      clicked={() => this.props.onAddCounter(10)} />
        <CounterControl label="Subtract 15" clicked={() => this.props.onSubtractCounter(15)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
    onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
    onAddCounter:       (value) => dispatch({type: 'ADD', value: value}),
    onSubtractCounter:  (value) => dispatch({type: 'SUBTRACT', value: value})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
