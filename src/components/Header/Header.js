/*global FB*/

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { 
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem, 
    DropdownToggle

} from 'reactstrap';

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const FACEBOOK_APP_ID = '157034504985378'
const FACEBOOK_API_VERSION = 'v2.12' // e.g. v2.10

class Header extends React.Component {

   constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

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

     localStorage.clear();
     localStorage.removeItem('nordic');
     localStorage.removeItem('uid');
    // localStorage.removeItem('uid')
    //localStorage.removeItem('nordic')
    // localStorage.removeItem('nordic');
    window.location.reload()
  }


  render () {
    if (this._isLoggedIn()) {
       localStorage.setItem('uid', this.props.data.loggedInUser.id);

      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }


                                  
                                     
                                  


  }

  renderThumb(){
     const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_50,w_50/" + this.props.data.loggedInUser.facebookUserId + ".jpg"

    if(this.props.data.loggedInUser.avatar === '' ){

     return(

         <img src={pic} className="img-circle" style={{margin:'5px 0 0 5px', width:'33px'}} />

      )

    }else{

        return(

         <img src={this.props.data.loggedInUser.avatar} className="img-circle" style={{margin:'5px 0 0 5px', width:'33px'}} />

      )

    }


  }

  renderLoggedIn() {
     //     const Uid = localStorage.getItem('uid');
     console.log(this.props.data.loggedInUser.isInterested);

     if(this.props.data.loggedInUser.isInterested == false){

          window.location.href="/welcome";

     }else{

   
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
              
              <Link to="/new-story"  style={{margin:'5px 0px', fontSize:'14px'}} alt="Add new storie"><i className="far fa-edit" style={{fontSize:'20px'}}></i>&nbsp;&nbsp; New Storie</Link>

            </li>
           
            <li>

            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle>
               {this.renderThumb()} &nbsp;&nbsp;

                <span className="d-md-down-none"></span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem divider/>
                <DropdownItem style={{margin:'5px 0'}}><a href="/me/stories/drafts">Drafts</a> </DropdownItem>
                <DropdownItem style={{margin:'5px 0'}}><a href="/me/stories/publish">Publish</a> </DropdownItem>
                <DropdownItem style={{margin:'5px 0'}}><a href="/me/publications">Publications</a></DropdownItem>
                <DropdownItem style={{margin:'5px 0'}}><a href="/me/topics/interest">Interests</a></DropdownItem>
                <DropdownItem style={{margin:'5px 0'}}><a href="/me/settings">Settings</a></DropdownItem>
                <DropdownItem  onClick={this._logout} style={{margin:'5px 0'}}> Logout</DropdownItem>
                <DropdownItem divider/>
              </DropdownMenu>
            </Dropdown>


            </li>
               
        </ul>
     </div> 
    </div>
        
      </nav>

      </div>
     )
    }
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
             
             

          
             <Button color="primary" onClick={this._handleFBLogin} style={{marginTop:'8px', fontSize:'12px', fontWeight:'600'}}><i className="fab fa-facebook-square" style={{ fontSize:'15px', }}></i> &nbsp; Signin with Facebook</Button>

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
      facebookUserId
    
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
