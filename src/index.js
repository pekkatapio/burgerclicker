import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import burger from "./burger.png";
import iconburger from "./icon-burger.png";
import iconcoupon from "./icon-coupon.png";
import iconboy from "./icon-boy.png";

class Clicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    };
    this.mouseClicked = this.mouseClicked.bind(this);
  }

  mouseClicked() {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  render() {
    return (
      <div className="clicker">
        <h1>Burger Clicker</h1>
        <Stats count={this.state.clicks} />
        <Burger onClick={this.mouseClicked} />
        <Booster boost="3.2" />
        <Menu />
      </div>
    );
  }
}

function Booster(props) {
  return <div className="booster">{props.boost} burgers / click</div>;
}

function Stats(props) {
  return (
    <div className="stats">
      <div className="stats__title">Burgers</div>
      <div className="stats__count">{props.count}</div>
    </div>
  );
}

function Menu() {
  return (
    <div className="menu">
      <div>
        <img src={iconburger} />
      </div>
      <div>
        <img src={iconcoupon} />
      </div>
      <div>
        <img src={iconboy} />
      </div>
    </div>
  );
}

class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = { pressed: false };
    this.imagePressed = this.imagePressed.bind(this);
    this.imageNotPressed = this.imageNotPressed.bind(this);
  }

  imagePressed() {
    this.setState({ pressed: true });
  }

  imageNotPressed() {
    this.setState({ pressed: false });
  }

  render() {
    const classValue = this.state.pressed
      ? "burger__img burger__img--pressed"
      : "burger__img";
    return (
      <div className="burger">
        <img
          src={burger}
          alt=""
          className={classValue}
          onClick={this.props.onClick}
          onMouseDown={this.imagePressed}
          onMouseUp={this.imageNotPressed}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Clicker />, rootElement);
