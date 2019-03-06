import React, {Component} from 'react';
import Stats from './Stats';
import Burger from './Burger';
import Booster from './Booster';

class Game extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        boost: 10,
        lastClicked: 0
      };
      this.settings = {
        boostIncrement: 0.1,
        boostDecrease: 0.8,
        boostMax: 3,
        reducerTimeout: 500,
        clickTreshold: 200
      };
      this.mouseClicked = this.mouseClicked.bind(this);
      this.reduceBooster = this.reduceBooster.bind(this);
    }
  
    componentDidMount() {
      this.boosterReducer = setInterval(
        this.reduceBooster,
        this.settings.reducerTimeout
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.boosterReducer);
    }
  
    reduceBooster() {
      if (this.state.lastClicked + this.settings.clickTreshold < Date.now()) {
        let boost = Math.round(this.state.boost * this.settings.boostDecrease);
        boost = boost < 10 ? 10 : boost;
        this.setState({ boost });
      }
    }
  
    mouseClicked() {
      const oldboost = this.state.boost / 10;
      const lastClicked = Date.now();
      const clicks = this.props.clicks + oldboost;
      const boost =
        (oldboost +
          (this.settings.boostMax - oldboost) * this.settings.boostIncrement) *
        10;
      this.props.setClicks(clicks);
      this.setState({ boost, lastClicked });
    }
  
    render() {
      return (
          <React.Fragment>
            <div className="header">
              <h1>Burger Clicker</h1>
            </div>
            <div className="content content--justified">
              <Stats count={Math.floor(this.props.clicks)} />
              <Burger onClick={this.mouseClicked} />
              <Booster boost={Math.round(this.state.boost) / 10} />
            </div>
          </React.Fragment>      
      );
    }
}

export default Game;
