import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import slugify from 'slugify';
import {Image} from 'cloudinary-react';
import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';

import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, MainApi} from '../../Api/';

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;


class EditPublish extends Component {

  static propTypes = {
    router: PropTypes.object
  }

	constructor(props) {
    super(props)
    this.state = { 
     
    name: '',
    slug: '',
    description:'',
    avatarId:'',
    avatarUrl:'',
    coverId:'',
    coverUrl:'',
    email:'',
    facebook:'',
    instagram:'',
    twitter:'',
     topics:[],
    uploadedFile: null,

      }

    this.handleChangeVit = this.handleChangeVit.bind(this)
     this.handleChangeWrit = this.handleChangeWrit.bind(this)
   }
  
  ////////////////// did mount 
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
            query Publish($id: ID!) {
              Publishing(id: $id){
              id
              name
              slug
              description
              coverId
              coverUrl
              createdAt
              avatarId
              avatarUrl
              email
              facebook
              instagram
              twitter
              topics{
                id
                name
              }
              
              writters{
                id
                username
              }
              }
            }
          `
          var queryVars = {
            id: this.props.match.params.id
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


           if ( results.data.Publishing == null){

                window.location= "/";

           }else{

              that.setState({
              data: results.data.Publishingt,
              id:results.data.Publishing.id,
              name:results.data.Publishing.name,
              slug:results.data.Publishing.slug,
              description:results.data.Publishing.description,
              createdAt:results.data.Publishing.createdAt,
              topics:results.data.Publishing.topics,
              coverUrl:results.data.Publishing.coverUrl,
              coverId:results.data.Publishing.coverId,
              avatarId:results.data.Publishing.avatarId,
              avatarUrl:results.data.Publishing.avatarUrl,
              email:results.data.Publishing.email,
              facebook:results.data.Publishing.facebook,
              instagram:results.data.Publishing.instagram,
              twitter:results.data.Publishing.twitter,
              writters:results.data.Publishing.writters,
             
              loading:false
             });


           }

            

              // that.onRead();
           
          })
 

  }



     handleChangeVit (value) {

        const map1 = value.map(x => x.id);
        this.setState({ topicsIds: map1 });


         console.log('Topics:', map1);
    }

     handleChangeWrit (value) {

        const map1 = value.map(x => x.id);
        this.setState({ writtersIds: map1 });


          console.log('Topics:', map1);
    }
 
 onImageAvatarDrop(files) {
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
           avatarUrl: response.body.secure_url,
           avatarId: response.body.public_id
        });
      }
    });
  }


  
 onImageCoverDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUploadx(files[0]);
  }

  handleImageUploadx(file) {
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
           coverUrl: response.body.secure_url,
           coverId: response.body.public_id
        });
      }
    });
  }



  renderTopics(){

   const inList = this.state.topics || []
  if (this.props.FeedQueryx.loading) {
      return (<div></div>)

  }
  return(

    <Multiselect
                               onChange={this.handleChangeVit}
                                data={this.props.FeedQueryx.allTopics.map((topicx) => (
                                   
                                   {id: topicx.id, name: topicx.name}

                                 
                                  ))}
                                valueField='id'
                                textField='name'

                                placeholder="Topic Tags"
                                defaultValue={inList.map((topicx) => (
                                   
                                   {id: topicx.id, name: topicx.name}

                                 
                                  ))}
                              />


    )

}


renderWritter(){

   const userList = this.state.writters || []
  if (this.props.UserQueryx.loading) {
      return (<div></div>)

  }
  return(

     <Multiselect
                               onChange={this.handleChangeWrit}
                                data={this.props.UserQueryx.allUsers.map((userx) => (
                                   
                                   {id: userx.id, name: '@'+userx.username}
                                 
                                  ))}
                                valueField='id'
                                textField='name'

                                placeholder="Select your publishing writters"
                                defaultValue={userList.map((user) => (
                                   
                                   {id: user.id, name:'@'+user.username}

                                 
                                  ))}
                              />


    )

}





  render() {

   
  	 if (this.props.UserQueryx.loading) {
      return (
         

     <section className="article-detail-newyork">
            
            <div className="container">

	          <div className="row">
	            <div className="col-md-2"></div>
	             <div className="col-md-8">


               <div className="new-content">
                    
                    <div className="post-author-info-top">

                        <div className="main-title" style={{marginBottom:'70px'}}>

	                       <h4><strong>New</strong> Publishing</h4>
	                     </div>

	                      <div className="form-story">

                             Loading
	                      </div>


                    </div>
                </div>


	             </div>
	           </div>
	         </div>


     </section>


      	)
    }

  	 var sluger =  slugify(this.state.name , {
	                replacement: '-',    // replace spaces with replacement
	                remove: /[$*_+~.()'"!\-:@,]/g,        // regex to remove characters
	                lower: true          // result in lower case
	              })
   
   
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

                       <h4><strong>Publishing : </strong> {this.state.name}</h4>
                     </div>

                        <div className="form-story">
                          

                          <Form>

                            <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Name*</Label>
					          <Col sm={10}>
					            <Input type="text" value={this.state.name} name="name"  placeholder="your publishing name" style={{height:'50px', fontSize:'16px'}}
                                  onChange={(e) => this.setState({name: e.target.value})}
                                  onKeyUp={(e) => this.setState({slug: document.getElementById("slugx").value})}

					            />
					            <Label  style={{height:'20px', fontSize:'12px', marginTop:'10px', marginLeft:'15px'}} id="slug">Link: nomadic.co.id/publishing/<strong>{sluger}</strong></Label>
					            <input type="hidden" id="slugx" value={sluger} name="slug" className="form-control" placeholder="Slug" style={{display:'none'}}/>
					          </Col>
					        </FormGroup>


					         <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Description*</Label>
					          <Col sm={10}>
					            <Input type="text" value={this.state.description} name="description"  placeholder="your publishing description" style={{height:'50px', fontSize:'16px'}}
                                  onChange={(e) => this.setState({description: e.target.value})}

					            />
					          </Col>
					        </FormGroup>

					         <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Publishing Logo*</Label>
					          <Col sm={6}>
					            <Dropzone
		                          onDrop={this.onImageAvatarDrop.bind(this)}
		                          multiple={false}
		                          style={{width:'100%', height:'50px', border:'1px solid #eee'}}
		                          accept="image/*">
		                          <div style={{textAlign:'left', color:'#888',padding:'10px'}}><i className="fas fa-camera" style={{fontSize:'30px', color:'#888'}}></i>&nbsp;&nbsp; klik / drag publishing logo</div>
		                        </Dropzone>
                                <Label style={{height:'20px', fontSize:'12px', marginTop:'10px', marginLeft:'0px'}}> min 80 × 80px in size</Label>
					          </Col>
					           <Col sm={4}>

					              {this.state.avatarUrl === '' ? <i className="far fa-image" style={{fontSize:'50px', color:'#888'}}></i> :

		                        
                       

                                       <Image cloudName={Cloudinary_Name} publicId={this.state.avatarId}  crop="scale"  width="50" height="50" alt="cover"/>
                                     
		                        
		                           
		                        }


					           </Col>
					        </FormGroup>

                             <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Publishing Topic Tags</Label>
					          <Col sm={10}>
					             {this.renderTopics()}
					          </Col>
					        </FormGroup>

					        <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Publishing Cover</Label>
					          <Col sm={6}>
					            <Dropzone
		                          onDrop={this.onImageCoverDrop.bind(this)}
		                          multiple={false}
		                          style={{width:'100%', height:'50px', border:'1px solid #eee'}}
		                          accept="image/*">
		                          <div style={{textAlign:'left', color:'#888',padding:'10px'}}><i className="fas fa-camera" style={{fontSize:'30px', color:'#888'}}></i>&nbsp;&nbsp; klik / drag publishing Cover Image</div>
		                        </Dropzone>
                                <Label style={{height:'20px', fontSize:'12px', marginTop:'10px', marginLeft:'0px'}}> size 600px X 72px </Label>
					          </Col>
					           <Col sm={4}>

					              {this.state.coverUrl === '' ? <i className="far fa-image" style={{fontSize:'50px', color:'#888'}}></i> :

		                        
                       

                                       <Image cloudName={Cloudinary_Name} publicId={this.state.coverId}  crop="scale"  width="50" height="50" alt="cover"/>
                                     
		                        
		                           
		                        }


					           </Col>
					        </FormGroup>

					         <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Email</Label>
					          <Col sm={10}>
					            <Input type="email" value={this.state.email} name="email"  placeholder="your publishing email" style={{height:'50px', fontSize:'16px'}}
                                  onChange={(e) => this.setState({email: e.target.value})}
                                 

					            />
					           
					          </Col>
					        </FormGroup>

					        <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Facebook</Label>
					          <Col sm={10}>
					            <Input type="text" value={this.state.facebook} name="facebook"  placeholder="facebook link" style={{height:'50px', fontSize:'16px'}}
                                  onChange={(e) => this.setState({facebook: e.target.value})}
                                 

					            />
					           
					          </Col>
					        </FormGroup>

					         <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Twitter</Label>
					          <Col sm={10}>
					            <Input type="text" value={this.state.twitter} name="twitter"  placeholder="twitter link" style={{height:'50px', fontSize:'16px'}}
                                  onChange={(e) => this.setState({twitter: e.target.value})}
                                 

					            />
					           
					          </Col>
					        </FormGroup>

					          <FormGroup row>
					          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Instagram</Label>
					          <Col sm={10}>
					            <Input type="text" value={this.state.instagram} name="instagram"  placeholder="instagram link" style={{height:'50px', fontSize:'16px'}}
                                  onChange={(e) => this.setState({instagram: e.target.value})}
                                 

					            />
					           
					          </Col>
					        </FormGroup>

                             <FormGroup row>
                    <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Publishing Writters</Label>
                    <Col sm={10}>
                      
                      {this.renderWritter()}

                               <Label style={{height:'20px', fontSize:'12px', marginTop:'10px', marginLeft:'0px'}}> Writers can submit their stories and remove them from this publication </Label>
                    </Col>

                  </FormGroup>
					        <br />
					        <br />
					


					        {this.state.name && this.state.description &&
            <div>         
                          <div onClick={this.handlePost} style={{background:'#000', padding:'10px 15px', color:'#fff', width:'150px', cursor:'pointer', textAlign:'center',float:'left'}}>Update & Publish</div>
            </div>
          }

                                 <br />
					        <br />
					        <br />
					        <br />


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

   handlePost = async () => {
  
    if (localStorage.getItem('uid') == null) {
      console.warn('only logged in users can create new posts')
      toast('only logged in users can create new posts', { type: toast.TYPE.ERROR, autoClose: 2000 })
      return
    }
     
    const userId = localStorage.getItem('uid');
    const { id, name, slug, description, avatarId, avatarUrl, topicsIds, coverId, coverUrl, email, facebook, twitter, instagram, writtersIds } = this.state
  
    await this.props.createPublishMutation({variables: { id, name, slug, description, avatarId, avatarUrl, topicsIds, coverId, coverUrl, email, facebook, twitter, instagram, userId, writtersIds }})
     toast('Update & Publish Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/me/publications';", 2000))
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

const FeedQueryx = gql`query allTopics {
  allTopics(orderBy:name_ASC) {
    id
    name
  }
}`

const UserQueryx = gql`query allUsers {
  allUsers(orderBy:name_ASC) {
    id
    username
  }
}`



const CREATE_POST_MUTATION = gql`
  mutation createPublishMutation (
      $id: ID!,
      $name: String!,
      $slug: String,
      $description: String,
      $coverId: String,
      $coverUrl: String,
      $avatarId: String,
      $avatarUrl: String,
      $userId: ID,
      $topicsIds: [ID!],
      $writtersIds: [ID!],
      $email: String,
      $facebook: String,
      $twitter: String,
      $instagram: String
  ) {
    updatePublishing(
       id: $id,
       name: $name,
        slug: $slug,
        description: $description,
        coverUrl: $coverUrl,
        coverId: $coverId,
        userId: $userId,
        avatarId:$avatarId,
        avatarUrl:$avatarUrl,
        topicsIds: $topicsIds,
        writtersIds:$writtersIds,
        email: $email,
        facebook: $facebook,
        twitter: $twitter,
        instagram: $instagram


    ) {
      id
    }
  }
`



export default compose(
  graphql(FeedQueryx, { name: 'FeedQueryx' }),
  graphql(UserQueryx, { name: 'UserQueryx' }),
  graphql(CREATE_POST_MUTATION, { name: 'createPublishMutation' }),
  graphql(LOGGED_IN_USER_QUERY, { 
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(EditPublish))
