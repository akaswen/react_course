import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from './ContactData/ContactData';

import Aux from '../../hoc/Aux/Aux';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let checkout;

    if (this.props.ingredients) {
      checkout = (
        <Aux>
          <CheckoutSummary 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ingredients} />
          <Route 
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
            />
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
};

export default connect(mapStateToProps)(Checkout);
