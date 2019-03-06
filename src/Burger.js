import React, {Component} from 'react';
import burger from "./burger.png";

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
            onPointerDown={this.imagePressed}
            onPointerUp={this.imageNotPressed} 
          />
        </div>
      );
    }
}

export default Burger;