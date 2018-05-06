import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import slugify from 'slugify';
import {Image} from 'cloudinary-react';
import {withRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import NotFound from'../../views/404/'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';


import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, MainApi} from '../../views/Api/';

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;



class Setting extends Component {

 constructor(props) {
    super(props)
    this.state = { 
     id:'',
     memberId:'',
     imageUrl:'',
     imageId:'',
     username:'',
     bio:'',
     email:'',
     firstName:'',
     lastName:'',
     userId: localStorage.getItem('uid'),
     uploadedFile: null,
      placeholder: 'Write here...',
    }
   

  
  }
  

  componentDidMount() {
    var that = this;
    that.getData();

  }

  ////////////////////get data

  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query User($id: ID!) {
              User(id: $id){
              id
              name
              username
              email
              avatar
              facebookUserId
              member{
                id
                firstName
                lastName
                imageId
                imageUrl
                bio
              }
             
              }
            }
          `
          var queryVars = {
            id: localStorage.getItem('uid')
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {

            //console.log(results)
            if (results.errors) {
             // console.log('cccc')
              //...
              window.location= "/";
            }
            //var BlogCategory = results.data.BlogCategory


           if ( results.data.User == null){

                window.location= "/";

           }else{

              that.setState({
              data: results.data.User,
              id:results.data.User.id,
              username:results.data.User.username,
              email:results.data.User.email,
              fbId:results.data.User.facebookUserId,
              firstName:results.data.User.member.firstName,
              lastName:results.data.User.member.lastName,
              bio:results.data.User.member.bio,
              imageUrl:results.data.User.member.imageUrl,
              imageId:results.data.User.member.imageId,
              memberId:results.data.User.member.id,
              loading:false
             });


           }

            

              // that.onRead();
           
          })
 

  }



   

////////////////////////////

   onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body);
        this.setState({
           imageUrl: response.body.secure_url,
           imageId: response.body.public_id
        });
      }
    });
  }



renderThumb(){

  const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_50,w_50/" + this.state.fbId + ".jpg"

 if(this.state.imageUrl == ''){


     return(

      <div>

        <img src={pic}alt="avatar"/>
      </div>

      )
 }else{


  return(

  
    <Image cloudName={Cloudinary_Name} publicId={this.state.imageId}  crop="scale"  width="50" height="50" alt="cover"/>


  )
 }


}



  render() {

    if(window.localStorage.getItem('uid') && window.localStorage.getItem('nordic') == null ){


    return(

               <NotFound />

      )


  }

     var sluger =  slugify(this.state.username , {
                  replacement:'',
                  remove: /[$*_+~.()'"!\-:@,]/g,        
                  lower: true          
                })

   var str = this.state.username;
    const username = str.replace(/\s+/g, ''); 

    const newuser = username.toLowerCase();
    
   
  if (this.state.loading) {
      return (<div></div>)
    }
   

    return (
      
  
     <section className="article-detail-newyork">
     <ToastContainer autoClose={2000} />
        <div className="container">
           <div className="row">

           <div className="col-md-2"></div>
           <div className="col-md-8">
                  <div className="new-content">
                    
                    <div className="post-author-info-top">
                     <div className="main-title" style={{marginBottom:'70px'}}>

                       <h4><strong>Account</strong> Settings</h4>
                     </div>
                       
                        
                      <div className="form-story" style={{marginTop:'0px'}}>

                        <Form>

                          <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Username</Label>
                            <Col sm={10}>
                              <Input type="text" value={this.state.username} name="username"  placeholder="username" style={{height:'50px', fontSize:'16px'}}
                                          onChange={(e) => this.setState({username: e.target.value})}
                                          onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}

                              />
                             <input type="text" id="slug" value={newuser} name="slug" className="form-control" placeholder="Slug" style={{display:'none'}}/>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Firstname</Label>
                            <Col sm={10}>
                              <Input type="text" value={this.state.firstName} name="firstName"  placeholder="firstName" style={{height:'50px', fontSize:'16px'}}
                                          onChange={(e) => this.setState({firstName: e.target.value})}
                                         

                              />
                             
                            </Col>
                          </FormGroup>

                           <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Lastname</Label>
                            <Col sm={10}>
                              <Input type="text" value={this.state.lastName} name="lastName"  placeholder="lastName" style={{height:'50px', fontSize:'16px'}}
                                          onChange={(e) => this.setState({lastName: e.target.value})}
                                         

                              />
                             
                            </Col>
                          </FormGroup>

                           <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Email</Label>
                            <Col sm={10}>
                              <Input type="email" value={this.state.email} name="email"  placeholder="email" style={{height:'50px', fontSize:'16px'}}
                                          onChange={(e) => this.setState({email: e.target.value})}
                                         

                              />
                             
                            </Col>
                          </FormGroup>

                           <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Bio</Label>
                            <Col sm={10}>
                              <Input type="text" value={this.state.bio} name="bio"  placeholder="bio" style={{height:'50px', fontSize:'16px'}}
                                          onChange={(e) => this.setState({bio: e.target.value})}
                                         

                              />
                             
                            </Col>
                          </FormGroup>

                           <FormGroup row>
                          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Avatar</Label>
                          <Col sm={6}>
                            <Dropzone
                                    onDrop={this.onImageDrop.bind(this)}
                                    multiple={false}
                                    style={{width:'100%', height:'50px', border:'1px solid #eee'}}
                                    accept="image/*">
                                    <div style={{textAlign:'left', color:'#888',padding:'10px'}}><i className="fas fa-camera" style={{fontSize:'30px', color:'#888'}}></i>&nbsp;&nbsp; klik / drag avatar</div>
                                  </Dropzone>
                                      <Label style={{height:'20px', fontSize:'12px', marginTop:'10px', marginLeft:'0px'}}>  100 × 100px in size</Label>
                          </Col>
                           <Col sm={4}>

                              {this.state.imageUrl === '' ? <i className="far fa-image" style={{fontSize:'50px', color:'#888'}}></i> :

                                  
                             

                                             <Image cloudName={Cloudinary_Name} publicId={this.state.imageId}  crop="scale"  width="50" height="50" alt="cover"/>
                                           
                                  
                                     
                                  }

                           </Col>
                        </FormGroup>
                        <br />
                  <br />
                  <br />

                  <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}></Label>
                            <Col sm={10}>
                              <div onClick={this.handleSave} style={{background:'#000', padding:'10px 15px', color:'#fff', width:'150px', cursor:'pointer', textAlign:'center',float:'left', marginRight:'20px'}}>Save</div>     
                          
                             
                            </Col>
                          </FormGroup>
                         
                          
                         </Form>

                      </div>
                        
                       
                    </div>

                  </div>
            </div>

           </div>

        </div>
    </section>

    )
  }



  handleSave = async () => {
  
    if (localStorage.getItem('uid') == null) {
      console.warn('only logged in users can create new posts')
      return
    }
    
    const userId = localStorage.getItem('uid');
    const { id, username, bio, email, imageId, imageUrl, firstName, lastName, memberId} = this.state
  
    await this.props.createSavexMutation({variables: {id,  username, bio, email, imageId, imageUrl, firstName, lastName, memberId}})

      toast('update uccess', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/me/settings';",2000))
  
  }
}


const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUserx {
      id
      avatar
    }
  }
`



const CREATE_SAVEX_MUTATION = gql`
  mutation CreateSavexMutation (
      $id: ID!,
      $memberId:ID!
      $username: String,
      $email: String,
      $bio: String,
      $firstName: String,
      $imageId: String,
      $imageUrl: String,
      $lastName: String,
  ) {
     updateUser(id: $id, email: $email, username: $username, avatar: $imageUrl){
                id
              }
              updateMember( id: $memberId, imageId: $imageId, imageUrl: $imageUrl, firstName: $firstName, lastName: $lastName, bio: $bio){
                id
              }
  }
`


export default compose(
   graphql(CREATE_SAVEX_MUTATION, { name: 'createSavexMutation' }),
  graphql(LOGGED_IN_USER_QUERY, { 
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(Setting))