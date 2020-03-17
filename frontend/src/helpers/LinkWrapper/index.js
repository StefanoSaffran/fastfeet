import React from 'react';
import { NavLink } from 'react-router-dom';

const LinkWrapper = props => {
  return <NavLink activeStyle={{ color: '#333' }} {...props} />;
};
export default LinkWrapper;
