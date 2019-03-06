import React from 'react';
import ReactDOM from 'react-dom';
import Clicker from './Clicker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clicker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
