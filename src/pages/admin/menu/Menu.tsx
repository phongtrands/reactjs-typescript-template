import React from 'react';
import { Link } from 'react-router-dom';


const Menu: React.FC = () => {
  return (
    <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/User">User</Link></li>
                <li><Link to="/">Settings</Link></li>
                <li><Link to="/">Profile</Link></li>
            </ul>
        </div>
  )
};

export default Menu;