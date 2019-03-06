import React from 'react';
import { NavLink } from "react-router-dom";
import iconburger from "./icon-burger.png";
import iconcoupon from "./icon-coupon.png";
import iconboy from "./icon-boy.png";

function Menu(props) {
    return (
      <div className="menu">
        <div>
          <NavLink to="/" exact activeClassName="menu--active">
            <img src={iconburger} alt="GAME" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/coupons" activeClassName="menu--active">
            <img src={iconcoupon} alt="COUPONS"/>
            {props.claimableCoupons ? <span className="badge">{props.claimableCoupons}</span> : <span></span>}
          </NavLink>
        </div>
        <div>
          <NavLink to="/profile" activeClassName="menu--active">
            <img src={iconboy} alt="PROFILE"/>
          </NavLink>
        </div>
      </div>
    );
  }

  export default Menu;