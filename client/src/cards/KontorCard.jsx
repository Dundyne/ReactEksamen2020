import React, {Component} from "react";
class KontorCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
      }

    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }