import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {
 state = {
    email: '',
    password: '',
  }


  render() {
   
   
    return (
      
     <div>
      <section className="article-detail-newyork">
         
        <div id="myModalx" style={{marginTop:'70px'}}>
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                 
                 <div className="modal-body login-box">
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#tab1" data-toggle="tab">SIGN IN</a></li>
                    </ul>
                     

                     <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="tab1">
                        <div className="row">
                          <div className="form-group col-xs-12">
                            <label>Your E-mail</label>
                            <input
                             
                              type="text"
                              placeholder="Username"
                              value={this.state.email}
                              onChange={(e) => this.setState({email: e.target.value})}

                             />
                           </div>
                   
                          <div className="form-group col-xs-6">
                            <label>Your Password</label>
                            <input 
                            type="password" 
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => this.setState({password: e.target.value})}


                            />
                          </div>
                          <div className="form-group col-xs-6">
                            <label>&nbsp;</label>
                            <button  onClick={this.authenticateUser}>SIGN IN</button>
                          </div>

                         
                        </div>

                     </div>
      

                   </div>




                  </div>

               </div>
            </div>
        </div>
      </section>
      
      </div>
    )
  }

  authenticateUser = async () => {
    const {email, password} = this.state
    console.log(this.state.email)
    const response = await this.props.authenticateUserMutation({variables: {email, password}})
    localStorage.setItem('nordic', response.data.authenticateUserx.token)
    this.props.history.replace('/')
    window.location.reload('/');
    
  }
}


const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation ($email: String!, $password: String!) {
    authenticateUserx(email: $email, password: $password) {
      token
    }
  }
`

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUserx {
      id
      name
      isInterested
    }
  }
`
export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, {name: 'authenticateUserMutation'}),
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(Login))

