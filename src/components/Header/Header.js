/*global FB*/

import React from 'react'
import { withRouter } from 'react-router'
import { Button } from 'reactstrap';

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const FACEBOOK_APP_ID = '157034504985378'
const FACEBOOK_API_VERSION = 'v2.12' // e.g. v2.10

class Header extends React.Component {

  componentDidMount() {
    this._initializeFacebookSDK()
  }

  _initializeFacebookSDK() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : FACEBOOK_APP_ID,
        cookie     : true,  // enable cookies to allow the server to access the session
        version    : FACEBOOK_API_VERSION // use Facebook API version 2.10
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  _handleFBLogin = () => {
    FB.login(response => {
      this._facebookCallback(response)
    }, {scope: 'public_profile,email'})
  }

  _facebookCallback = async facebookResponse => {
    if (facebookResponse.status === 'connected') {
      const facebookToken = facebookResponse.authResponse.accessToken
      const graphcoolResponse = await this.props.authenticateUserMutation({variables: { facebookToken }})
      const graphcoolToken = graphcoolResponse.data.authenticateUser.token
      localStorage.setItem('nordic', graphcoolToken)
      window.location.reload()
    } else {
      console.warn(`User did not authorize the Facebook application.`)
    }
  }

  _isLoggedIn = () => {

    return this.props.data.loggedInUser && 
      this.props.data.loggedInUser.id && 
      this.props.data.loggedInUser.id !== ''

     
  }

  _logout = () => {
    localStorage.removeItem('nordic')
    localStorage.removeItem('uid')
    window.location.reload()
  }


  render () {
    if (this._isLoggedIn()) {
       localStorage.setItem('uid', this.props.data.loggedInUser.id);
     console.log(this.props.data.loggedInUser.id);
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }

  }

  renderLoggedIn() {
    return (
      <div>
       
        <nav className="navbar navbar-light bg-white fixed-top mediumnavigation">

     <div className="container">
      <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
           <a className="navbar-brand" href="/">
      <img src="https://res.cloudinary.com/nomadic-id/image/upload/v1522308873/logo.png" alt="logo" />
      </a>
        </div>
     
     <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav navbar-right">
            
              <li>
                <div className="search-wrapper">
            <div className="input-holder">
              <input className="search-input" type="text" placeholder="Search Nomadic" />
              <button className="search-icon"><i className="fas fa-search" style={{fontSize:'15px', marginTop:'5px'}}></i></button>
            </div>
          </div>
            </li>
            <li><a  style={{fontSize:'20px'}}><i className="far fa-bell"></i></a></li>
            <li><img src={this.props.data.loggedInUser.avatar} className="img-circle" style={{margin:'10px 0 0 10px', width:'33px'}} /></li> 
               
        </ul>
     </div> 
    </div>
        
      </nav>

      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
       
        <nav className="navbar navbar-light bg-white fixed-top mediumnavigation">

     <div className="container">
      <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
           <a className="navbar-brand" href="/">
      <img src="https://res.cloudinary.com/nomadic-id/image/upload/v1522308873/logo.png" alt="logo" />
      </a>
        </div>
     
     <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav navbar-right">
            
              <li>
                <div className="search-wrapper">
                  <div className="input-holder">
                    <input className="search-input" type="text" placeholder="Search Nomadic" />
                    <button className="search-icon"><i className="fas fa-search" style={{fontSize:'15px', marginTop:'5px'}}></i></button>
                  </div>
                </div>
             </li>
            <li>
             
             

             <Button className="btn login" outline color="success" onClick={this._handleFBLogin} ><i class="fab fa-facebook-square"></i> &nbsp; Sign with Facebook</Button>

            </li>
           
               
        </ul>
     </div> 
    </div>
        
      </nav>

      </div>
    )
  }
}

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
      avatar
    }
  }
`

const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      token
    }
  }
`

export default compose(
  graphql(AUTHENTICATE_FACEBOOK_USER, { name: 'authenticateUserMutation' }),
  graphql(LOGGED_IN_USER, { options: { fetchPolicy: 'network-only'}})
) (withRouter(Header))
