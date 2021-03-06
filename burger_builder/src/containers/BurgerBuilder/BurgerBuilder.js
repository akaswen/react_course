import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import queryString from 'query-string';
import * as actionTypes from '../../store/actions.js';


class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    // axios.get( 'ingredients.json' )
    //   .then( response => {
    //     this.setState( { ingredients: response.data } );
    //   } )
    //   .catch( error => {
    //     this.setState( { error: true } );
    //   } );
  }

  updatePurchaseState ( ingredients ) {
    const sum = Object.keys( ingredients )
      .map( igKey => {
        return ingredients[igKey];
      } )
      .reduce( ( sum, el ) => {
        return sum + el;
      }, 0 );
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState( { purchasing: true } );
  }

  purchaseCancelHandler = () => {
    this.setState( { purchasing: false } );
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render () {
    //console.log(this.state.ingredients);
    const disabledInfo = {
      ...this.props.ingredients
    };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if ( this.props.ingredients ) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice} />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }
    if ( this.state.loading ) {
      orderSummary = <Spinner />;
    }
    // {salad: true, meat: false, ...}
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
