import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import WelcomeIn from './WelcomeIn'
import Welcome from './Welcome'
// import  Sidebar from './Sidebar'

class PageLogin extends Component {
  static propTypes = {
    interest: PropTypes.bool,
     
  }


  renderWelcome(){

    if(this.props.interest == false){

     window.location.href="/welcome"

    }else{


      return(

        <WelcomeIn />

        )


    }


  }


  render() {
   
	
   
    return (
      
	     
        
          <div>{this.renderWelcome()}</div>

    )
  }
}





export default PageLogin

