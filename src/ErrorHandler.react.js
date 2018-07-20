import React from 'react';
import PropTypes from 'prop-types';
;


export default class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info});
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{'color': 'red'}}>
          <h1>Something went wrong.</h1>
          <h3>Dash Experienced an error</h3>
          <h5>{this.state.error.toString()}</h5>
          <h6>Traceback:</h6>
          {this.state.info.componentStack.split('\n')
           .map(info => (<div>{info}</div>))}
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorHandler.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
