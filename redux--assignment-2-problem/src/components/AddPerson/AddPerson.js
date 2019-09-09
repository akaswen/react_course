import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
  state ={
    name: '',
    age: null
  }

  nameChangedHandler = e => {
    this.setState({name: e.target.value});
  }

  ageChangedHandler = e => {
    this.setState({age: e.target.value});
  }

  render() {
    return (
      <div className="AddPerson">
        <input
          type="text"
          onChange={this.nameChangedHandler}
          value={this.state.name}
          placeholder="Name" />
        <input 
          type="number" 
          onChange={this.ageChangedHandler}
          value={this.state.age}
          placeholder="Age" />
        <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
      </div>
    );
  }
};

export default AddPerson;
