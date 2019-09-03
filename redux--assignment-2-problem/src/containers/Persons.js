import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions.js';

class Persons extends Component {
  personAddedHandler = () => {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name: 'Max',
      age: Math.floor( Math.random() * 40 )
    }

    this.props.addPerson(newPerson);
  }

  render () {
    console.log("my props", this.props);
    return (
      <div>
        <AddPerson personAdded={this.personAddedHandler} />
        {this.props.persons.map(person => (
          <Person
            key={person.id}
            name={person.name} 
            age={person.age}
            clicked={() => this.props.deletePerson(person.id)}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    persons: state.persons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPerson:    (newPerson) => dispatch({type: actionTypes.addPerson, newPerson: newPerson}),
    deletePerson: (personId) => dispatch({type: actionTypes.deletePerson, personId: personId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
