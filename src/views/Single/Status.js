import React, {Component} from 'react';

import PropTypes from 'prop-types';

class Status extends Component {
 

  render() {
   
   
    return (
      
     
       <div className="alertbar">
        <div className="container text-center">
          <img src={this.props.avatar} className="img-circle" style={{width:'40px'}} />&nbsp; Never miss a <b>story</b> from <b>{this.props.name}</b>, get weekly updates in your inbox. <a className="btn subscribe">Get Started</a>
        </div>
      </div>

    )
  }
}


Status.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default Status;
