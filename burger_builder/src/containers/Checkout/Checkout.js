import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from './ContactData/ContactData';

import Aux from '../../hoc/Aux/Aux';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: null
  }

  componentDidMount() {
    let { ingredients, totalPrice } = queryString.parse(this.props.location.search);
    ingredients = queryString.parse(ingredients);
    Object.keys(ingredients).forEach(ingredient => {
      ingredients[ingredient] = Number(ingredients[ingredient]);
    });
    this.setState({ingredients: ingredients, totalPrice: Number(totalPrice)});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let checkout;

    if (this.state.ingredients) {
      checkout = (
        <Aux>
          <CheckoutSummary 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.state.ingredients} />
          <Route 
            path={this.props.match.path + '/contact-data'} 
            render={props => (
              <ContactData 
                {...props}
                totalPrice={this.state.totalPrice}
                ingredients={this.state.ingredients} />
            )} />
        </Aux>
      );
    } else {
      checkout = (
        <Spinner />
      );
    }

    return (
      <div>
        {checkout}
      </div>
    );
  }
}

export default Checkout;
