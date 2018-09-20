import React, { Component } from 'react'
import './TabBar.css'

export default class TabBar extends Component {
  render() {
    return (
      <div className = 'tab-bar-container'>
        <div className = 'arrow-container'> 
          <i class="fas fa-angle-left"></i>
        </div>
        <div className = 'tab-number-container'>
          <button className = 'tab-number'> 1 </button>
          <button className = 'tab-number'> 2 </button>
          <button className = 'tab-number'> 3 </button>
          <button className = 'tab-number'> 4 </button>
        </div>
        <div className = 'arrow-container'> 
          <i class="fas fa-angle-right"></i>
        </div>
      </div>
    )
  }
}
