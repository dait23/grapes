import React, {Component} from 'react';


import { Link} from 'react-router-dom'
import {MainApi, Cloudinary_Name} from '../Api/';
import {Image} from 'cloudinary-react';
import MetaTags from 'react-meta-tags';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
//import Status from './Status';
import Story from './Story'
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

class Topic extends Component {
  
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


 ////////////////////get data

  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query TopicPost($slug: String) {

              Topic(
                slug:$slug
              ){
                id
                name
                slug
                posts(
      filter:{
        isPublished: true
      }, orderBy: createdAt_DESC
    ){
                  id
                  title
                  slug
                  headline
                  reading
                  createdAt
                  imageId
                  imageUrl
                  user{
                    facebookUserId
                    username
                    avatar
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
            slug: this.props.match.params.slug
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {

            //console.log(results)
            if (results.errors) {
             // console.log('cccc')
              //...
             // window.location= "/";
            }
            //var BlogCategory = results.data.BlogCategory


           if ( results.data.Topic == null){

                //window.location= "/";

           }else{

              that.setState({
              data: results.data.Topic,
              id:results.data.Topic.id,
              name:results.data.Topic.name,
              slug:results.data.Topic.slug,
              posts:results.data.Topic.posts,
             
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


                                <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{marginTop: 10}}>
                                 <div></div>
                                </ReactPlaceholder>


                               </span>
                                


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
      
     <div>
          <MetaTags>
                <title>{this.state.name}</title>
                <meta name="description" content={this.state.name} />
                <meta property="og:title" content={this.state.name} />
                <meta property="og:description" content={this.state.name} />
                <meta property="og:image" content="https://res.cloudinary.com/spazeeid/image/upload/v1521322663/cover_jjet5b.jpg" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://nomadic.co.id/topic/${this.state.slug}`} />

                <meta name="twitter:card" value={this.state.name} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@NomadicId" />
                <meta name="twitter:title" content={this.state.name} />
                <meta name="twitter:description" content={this.state.name} />
                <meta name="twitter:creator" content="@NomadicId" />
                <meta name="twitter:image:src" content="https://res.cloudinary.com/spazeeid/image/upload/v1521322663/cover_jjet5b.jpg" />


            </MetaTags>
      <section className="article-detail-newyork">
         <figure className="big-post-imagex">
           <div className="over-content">
             <div className="middle-content">
                 
                  <div className="inner">
                      <div className="row">

                              <div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5">
                 
                               <span className="post-topic" style={{border: '3px solid #000', padding:'10px 50px', color:'#000', fontSize:'20px', fontWeight:'600', textTransform:'uppercase'}}>{this.state.name}</span>


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
        
      </section>
      
      </div>
    )
  }
}




export default Topic;
