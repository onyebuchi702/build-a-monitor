import React, { Component } from 'react';
import { ServerHealth } from '../components/ServerHealth/ServerHealth.js';
import classes from './App.css';

class App extends Component {
  state = {
    healthEndpoints: [
      'https://prima.run/health',
    ]
  }

  render() {
    const { healthEndpoints } = this.state;
    console.log(this.props.renderServicesStatus, 'ppppppp');
    return (
      <div className={classes.App}>
        <div>
          <h2>Stackworxs Test</h2>
          <ServerHealth
            healthEndpoints={healthEndpoints}/>
        </div>
      </div>
    );
  }
}

export default App;
