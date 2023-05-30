import React, { Component } from 'react';
import Header from '../components/header';

export default class Inventory extends Component {
  render() {
    return (
      <div className="inventory"> 
        <Header page="Inventory">

        </Header>
      
        <div className="headers"><p>Inventory</p></div>
        <div className="inventory-top-bar">
          <input className="search-input" placeholder="Search for an item..."></input>
          <div style={{fontWeight:'bold'}}>
          <p>Availability</p>
        </div>
        </div>

       </div>
    );
  }
}
