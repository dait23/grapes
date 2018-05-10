import React, {Component} from 'react';

import { Link} from 'react-router-dom'
import {MainApi, Cloudinary_Name} from '../Api/';
import {Image} from 'cloudinary-react';
import MetaTags from 'react-meta-tags';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Status from './Status';
import Story from './Story'
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');





class Profile extends Component {


  static propTypes = {
    router: PropTypes.object
  }


  constructor(props) {
    super(props)
    this.state = { 
      posts:[],
      data:'',
      loading: true,
    }
  
  }

  ////////////////// did mount 
  componentDidMount() {
    var that = this;
    that.getData();
  }

  //
  ////////////////////get data

  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Profile($username: String) {
              User(username: $username){
              
                id
                name
                username
                avatar
                facebookUserId
                member{
                  bio
                  firstName
                  lastName
                }
                posts(filter:{
    isPublished:true
  }, orderBy: createdAt_DESC){
                  id
                  title
                  slug
                  headline
                  imageId
                  imageUrl
                  reading
                  createdAt
                  user{
                  facebookUserId
                  avatar
                  username
                    member{
                      firstName
                      lastName
                    }
                  }

                }

             
              }
            }
          `
          var queryVars = {
            username: this.props.match.params.username
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
              facebookUserId:results.data.User.facebookUserId,
              bio:results.data.User.member.bio,
              name: results.data.User.member.firstName + " " + results.data.User.member.lastName,
              posts:results.data.User.posts,
              avatar:results.data.User.avatar,
              pic:"https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/"+ results.data.User.facebookUserId + ".jpg",     
              loading:false
             });


           }

          
           
          })
 

  }
 


 renderPost(){


   if(this.state.posts == ''){

    return(
            
           <div className="col-md-4 col-sm-4">
            
            <p>No Storie </p>
           </div>


      )

   }else{


     return(

       <div>

          {this.state.posts.map((post) => (
                      <Story
                        key={post.id}
                        post={post}
                        refresh={() => this.props.data.refetch()}
                      />
                    ))}
      </div>
      )

   }

    

 }

 renderAvatar(){
     //const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.state.facebookUserId + ".jpg"

    if(this.state.avatar == '' ){

     return(

         <img src={this.state.pic} className="img-circle"  />

      )

    }else{

        return(

         <img src={this.state.avatar} className="img-circle"  />

      )

    }


  }



  render() {
   if (this.state.loading) {
      return (

         <section className="article-detail-newyork">
             
           <figure className="big-post-imagex">
             <div className="over-content">
               <div className="middle-content">

                  <div className="inner">
                      <div className="row">

                              <div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5">
                 
                               <span className="post-author">

                                <ReactPlaceholder type='round'  showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: 80, height: 80 }}>
                                  <br />
                                </ReactPlaceholder>

                                <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{marginTop: 10}}>
                              <br />
                                </ReactPlaceholder>


                               </span>
                                <div className="post-metas">
                                 
                                     
                                <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{marginTop: 10}}>
                                <br />
                                </ReactPlaceholder>



                                  
                                </div>


                             </div>

                      </div>
                  </div>

               </div>
              </div>
            </figure>
             <div className="container">
              <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8" style={{paddingBottom:'10px'}}>
                   <div className="main-title">
                        <h4>
                        <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{width: 150, height: 20}}>
                                 <div></div>
                        </ReactPlaceholder>
                        </h4>
                      </div>

                    <div className="row">

                          <div className="col-md-4 col-sm-4">
                                <div className="post-type-florida">
                                    <figure className="post-image">
                                       <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '150px' }}>
                                            <div></div>
                                          </ReactPlaceholder>

                                    </figure>
                                     <div className="post-content">
                                        
                                        <ReactPlaceholder type='text'showLoadingAnimation={true} delay={1000}  ready={false} rows={4} color='#E0E0E0'>
                                          <div></div>
                                        </ReactPlaceholder>

                                     </div>
                                </div>

                        </div>

                                  <div className="col-md-4 col-sm-4">
                                <div className="post-type-florida">
                                    <figure className="post-image">
                                       <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '150px' }}>
                                            <div></div>
                                          </ReactPlaceholder>

                                    </figure>
                                     <div className="post-content">
                                        
                                        <ReactPlaceholder type='text'showLoadingAnimation={true} delay={1000}  ready={false} rows={4} color='#E0E0E0'>
                                          <div></div>
                                        </ReactPlaceholder>

                                     </div>
                                </div>

                        </div>


                                  <div className="col-md-4 col-sm-4">
                                <div className="post-type-florida">
                                    <figure className="post-image">
                                       <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '150px' }}>
                                            <div></div>
                                          </ReactPlaceholder>

                                    </figure>
                                     <div className="post-content">
                                        
                                        <ReactPlaceholder type='text'showLoadingAnimation={true} delay={1000}  ready={false} rows={4} color='#E0E0E0'>
                                          <div></div>
                                        </ReactPlaceholder>

                                     </div>
                                </div>

                        </div>

                    </div>

                  </div>
              </div>

             </div>


         </section>




        )


    }
   
    return (
      
  
      <section className="article-detail-newyork">
           <MetaTags>
                <title>{this.state.name}</title>
                <meta name="description" content={this.state.bio} />
                <meta property="og:title" content={this.state.name} />
                <meta property="og:description" content={this.state.bio} />
                <meta property="og:image" content={this.state.pic} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://nomadic.co.id/@${this.state.username}`} />

                <meta name="twitter:card" value={this.state.name} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@NomadicId" />
                <meta name="twitter:title" content={this.state.name} />
                <meta name="twitter:description" content={this.state.bio} />
                <meta name="twitter:creator" content="@NomadicId" />
                <meta name="twitter:image:src" content={this.state.pic} />


            </MetaTags>
         <figure className="big-post-imagex">
           <div className="over-content">
             <div className="middle-content">
                 
                  <div className="inner">
                      <div className="row">

                              <div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5">
                 
                               <span className="post-author">{this.renderAvatar()}<a href={`/@${this.state.username}`}>{this.state.name}</a></span>
                                <div className="post-metas">
                                   <p className="text-center">{this.state.bio}</p>
                                </div>


                             </div>

                      </div>
                  </div>

             </div>
           </div>

         </figure>

          <div className="container">

              <div className="row">
                  <div className="col-md-2"></div>
                   <div className="col-md-8" style={{paddingBottom:'100px'}}>
                     
                       <div className="main-title">
                        <h4><strong>Latest</strong> Stories</h4>
                      </div>
                    <div className="row">

                      {this.renderPost()}
  
                   </div>
                  </div>
              </div>
          </div>
         <Status 
          name={this.state.name}
          avatar={this.state.avatar === '' ? this.state.pic:

                            
                       

                                        this.state.avatar
                                     
                            
                               
                            }
        />
      </section>

    )
  }
}




export default Profile;
