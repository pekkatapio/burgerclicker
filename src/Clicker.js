import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import allCoupons from './allCoupons';
import Game from './Game';
import Coupons from './Coupons';
import Profile from './Profile';
import Menu from './Menu';

import "./Clicker.css";

class Clicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      coupons: [],
      claimableCoupons: 0,
      countUpdateValue: 0
    };
    this.setClicks = this.setClicks.bind(this);
    this.claimCoupon = this.claimCoupon.bind(this);
    this.updateCouponCount = this.updateCouponCount.bind(this);    
  }

  componentDidMount() {
    this.updateCouponCount(this.state.clicks);
  }

  updateCouponCount(clicks) {
    let coupons = 0;
    let updateValue = this.state.countUpdateValue;
    allCoupons.forEach((coupon) => {
      if (coupon.price <= clicks) {
        coupons ++;
      }
      if ((updateValue < clicks && coupon.price > updateValue) ||
          (coupon.price > clicks && coupon.price < updateValue)) {
        updateValue = coupon.price;
      }
    });
    this.setState({
      claimableCoupons: coupons,
      countUpdateValue: updateValue
    });
  }  

  setClicks(value) {    
    this.setState({
      clicks: value
    });
    if (value > this.state.countUpdateValue) {
      this.updateCouponCount(value);
    }
  }

  claimCoupon(couponId) {
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    let filteredCoupons = allCoupons.filter(offer => {
      return offer.id === couponId;
    });
    let selectedCoupon = Object.assign({},filteredCoupons[0]);
    let clicks = this.state.clicks;
    clicks = clicks - selectedCoupon.price;
    selectedCoupon.claimed = Date.now();
    selectedCoupon.validDue = Date.now() + twoWeeks;
    let coupons = this.state.coupons.slice();
    coupons.push(selectedCoupon);
    this.setState({
      clicks, coupons
    });
    this.updateCouponCount(clicks);
  }

  render() {
    return (
      <Router>
        <div className="container">          
            <Route
              exact
              path="/"
              render={props => (
                <Game clicks={this.state.clicks} setClicks={this.setClicks} />
              )}
            />
            <Route
              exact
              path="/coupons"
              render={props => <Coupons clicks={this.state.clicks} claimCoupon={this.claimCoupon} />}
            />
            <Route
              exact 
              path="/profile" 
              render={props => <Profile clicks={this.state.clicks} coupons={this.state.coupons} />} 
            />        
          <Menu claimableCoupons={this.state.claimableCoupons}/>
        </div>
      </Router>
    );
  }
}

export default Clicker;