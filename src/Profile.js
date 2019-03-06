import React, {Component} from 'react';

class Profile extends Component {
    render() {
  
      let groupCoupons = function(groupedCoupons, currentCoupon) {
        if (currentCoupon.validDue >= Date.now()) {
          let index = groupedCoupons.findIndex(obj => {
            return obj.id === currentCoupon.id
          });
          if (index < 0) {
            currentCoupon.count = 1;
            groupedCoupons.push(currentCoupon);
          } else {
            groupedCoupons[index].count = groupedCoupons[index].count + 1;
            if (groupedCoupons[index].validDue > currentCoupon.validDue) {
              groupedCoupons[index].claimed = currentCoupon.claimed;
              groupedCoupons[index].validDue = currentCoupon.validDue;
            }
          }
        }
  
        return groupedCoupons;
      }
  
      let coupons = this.props.coupons.reduce(groupCoupons,[]);
  
  
      let rows = coupons.map(coupon => {
  
        const validDue = new Date(coupon.validDue).toDateString();
        
        return (        
          <div className="coupon" key={coupon.id}>
            <div className="coupon__offer">
              <div className="coupon__offerName">{coupon.name}</div>
              <div className="coupon__offerDesc">{coupon.desc}</div>
            </div>
            <div className="coupon__prices">
              <div className="coupon__newPrice">{coupon.newPrice.toFixed(2)}</div>
              <div className="coupon__oldPrice">{coupon.oldPrice.toFixed(2)}</div>
            </div>  
            <div className="coupon__button">
              <div className="coupon__price">{coupon.count} pc</div>
              <div className="coupon__claim">Valid due {validDue}</div>
            </div>
          </div>
        )
      });    
  
      return(
        <React.Fragment>
        <div className="header"><h1>Profile</h1></div>
          <div className="content">
            {rows}
          </div>
        </React.Fragment>
      );
    }
  }

  export default Profile;