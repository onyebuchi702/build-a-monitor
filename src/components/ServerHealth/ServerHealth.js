import React, { Component } from 'react';
import request from 'request';
import classes from './ServerHealth.css';

export class ServerHealth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: 5 mins
      services: [],
      updateInterval: 50000, // 5 mins
    };
    this.checkStatus();
    this.createIntervalUpdater();
  }

  componentWillUnmount = () => {
    this.clearIntervalUpdater();
  }

  clearIntervalUpdater = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  createIntervalUpdater = () => {
    const { updateInterval } = this.state;
    if (!this.interval) {
      this.interval = setInterval(this.checkStatus, updateInterval);
    }
  }

  checkStatus = async () => {
    const { healthEndpoints } = this.props;

    healthEndpoints.forEach(endpoint => {
      request(endpoint, this.handleResponse);
    });
  }

  handleResponse = (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const responseJson = JSON.parse(body);
      console.log('body:', responseJson);
      this.handleSuccess(responseJson.results);
    } else if (error && response.statusCode === 500){
        <h6 style={serverDown}></h6>
    } else if (error && response.statusCode === 400 || 408){
        <h6 style={noConnection}></h6>
    } else {
      console.error(`error fetching statuses ${response}`)
    }
  }

  handleSuccess = (response) => {
    // TODO: stuff
    this.setState({ services: response});
  }

  // handelError = () => {
  //
  // }

  renderServicesStatus = () => {
    const { services } = this.state;

    return (
      services.map(service =>
        <h6 style={serverUp}>
          {service.output}
        </h6>
      )
    );
  }

  render () {
    return (
      <div>
        <h1>Server Health</h1>
        <div className={classes.flexContainer}>
          <div>{this.renderServicesStatus()}</div>
        </div>
        <div>
        </div>
      </div>
    )
  }
}

const serverUp = {
  color: `green`,
  border: `1px solid green`,
  width: `20%`,
  padding: `2em`,
  boxShadow: `0px 0px 16px 0px #ccc`,
  display: `flex`,
  marginLeft: `2em`,
  cursor: `pointer`
}

const serverDown = {
  color: `red`,
  border: `1px solid red`,
  width: `20%`,
  padding: `2em`,
  boxShadow: `0px 0px 16px 0px #ccc`,
  display: `flex`,
  marginLeft: `2em`,
  cursor: `pointer`
}

const noConnection = {
  color: `grey`,
  border: `1px solid grey`,
  width: `20%`,
  padding: `2em`,
  boxShadow: `0px 0px 16px 0px #ccc`,
  display: `flex`,
  marginLeft: `2em`,
  cursor: `pointer`
}
