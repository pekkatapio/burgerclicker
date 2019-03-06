import React from 'react';

function Booster(props) {
    const text = props.boost + " burgers / click";
    const classValue =
      props.boost > 1 ? "booster booster--visible" : "booster booster--hidden";
    return <div className={classValue}>{text}</div>;
}

export default Booster;