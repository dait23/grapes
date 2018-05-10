import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {MainApi, Cloudinary_Name} from '../Api/';
import {Image} from 'cloudinary-react';
import MetaTags from 'react-meta-tags';
import PropTypes from 'prop-types';
import Status from './Status';
import Share from './Share';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import { toast, ToastContainer } from 'react-toastify';
import Related from './Related';
import Response from './Response'
import ResponseBox from './ResponseBox'
import moment from 'moment';
import 'moment/locale/id';
import List from './RList';
moment.locale('id');




class Single extends Component {
 
 static propTypes = {
    router: PropTypes.object
  }


  constructor(props) {
    super(props)
    this.state = { 
      topics:[],
      data:'',
      loading: true,
    }
  
  }

   
////////////////// did mount 
  componentDidMount() {
    var that = this;
    that.getData();
  }

/////////////get read

 
onRead() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateMainCategory ($id: ID!, $read: Int){
              updatePost(id: $id, read: $read){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            read: parseInt(this.state.read + 1),
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {
            if (results.errors) {
              //...
              return
            }
            //var BlogCategory = results.data.BlogCategory

             //that.getData();
            //...
          })


  } 
////////////////////get data

  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Post($slug: String) {
              Post(slug: $slug){
              id
              title
              slug
              headline
              body
              reading
              createdAt
              updatedAt
              imageId
              imageUrl
              read
              type{
                name
              }
              publishing{
                name
                slug
              }
              topics{
                id
                name
                slug
              }
              comments(orderBy: createdAt_DESC){
                  id
                  text
                  user{
                    id
                    username
                    avatar
                    facebookUserId
                    member{
                      firstName
                      lastName
                      imageUrl
                      imageId
                    }
                  }
                
                }
              user{
                username
                facebookUserId
                avatar
                member{
                  firstName
                  lastName
                  bio
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


           if ( results.data.Post == null){

               window.location= "/404";

           }else{

              that.setState({
              data: results.data.Post,
              id:results.data.Post.id,
              title:results.data.Post.title,
              slug:results.data.Post.slug,
              headline:results.data.Post.headline,
              body:results.data.Post.body,
              read:results.data.Post.read,
              reading:results.data.Post.reading,
              comments:results.data.Post.comments,
              createdAt:results.data.Post.createdAt,
              updatedAt:results.data.Post.updatedAt,
              topics:results.data.Post.topics,
              imageUrl:results.data.Post.imageUrl,
              imageId:results.data.Post.imageId,
              avatar:results.data.Post.user.avatar,
              type:results.data.Post.type.name,
              publishing:results.data.Post.publishing,
              username:results.data.Post.user.username,
              avatar:results.data.Post.user.avatar,
              firstName:results.data.Post.user.member.firstName,
              lastName:results.data.Post.user.member.lastName,
              bio:results.data.Post.user.member.bio,
              facebookUserId:results.data.Post.user.facebookUserId,
              name: results.data.Post.user.member.firstName + " " + results.data.Post.user.member.lastName,
              pic:"https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_50,w_50/"+ results.data.Post.user.facebookUserId + ".jpg",
             
              loading:false
             });

            console.log(that.state.facebookUserId);
           }

            

              that.onRead();
           
          })
 

  }


//////////////////////// end data


renderThumb(){
     //const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.props.post.user.facebookUserId + ".jpg"

    if(this.state.avatar == '' ){

     return(

         <img src={this.state.pic} className="img-circle"  alt={this.state.title}/>

      )

    }else{

        return(

         <img src={this.state.avatar} className="img-circle"  alt={this.state.title}/>

      )

    }


  }



renderPublish(){

  if(this.state.type == "Publishing"){

    return(
        
         <span> - in <a href ={`/publishing/${this.state.publishing.slug}`}>{this.state.publishing.name}</a></span>

      )
  }else{

    return
  }


}


renderTopic(){

  return(


     <ul className="tags">
                            {this.state.topics.map((topic) => (

                            <li key={topic.id}><a href={`/topic/${topic.slug}`}>{topic.name}</a></li>
                            
                          ))}
                          </ul>



     )



}


renderUpdated(){

  const updatedDT = moment(this.state.updatedAt).format('ll')

  if(this.state.updatedAt < this.state.createdAt){

   return

  }else{

    return(

     <span>updated : {updatedDT}</span>
    )

  }

}



renderComment(){

     const commentList = this.state.comments || [ ]

  if(this.state.comments == ''){

    return(
    
       <div className="row" style={{marginBottom:'0px', marginTop:'10px'}}>

           <div className="col-md-1"></div>


           <div className="col-md-10"><p style={{fontSize:'14px'}}>No responses for this storie...</p></div>

           <div className="col-md-1"></div>


           </div>



    )
  }else{

   return(

     <div>

                                  {commentList.map((comment) => (
                                    <List
                                key={comment.id}
                                comment={comment}
                              />
                          ))}

                            </div>

   )


  }


}
  


  render() {

    const commentList = this.state.comments || [ ]
   if (this.state.loading) {
      return (

      <section className="article-detail-newyork">

           <ToastContainer autoClose={2000} />
      <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
                <div className="col-md-8">
                 <div className="post-content">
                    
                     <h1 className="posttitle">
                    <ReactPlaceholder type='text' showLoadingAnimation={true} delay={1000} ready={false} rows={1} color='#E0E0E0'>
                      <div></div>
                    </ReactPlaceholder>

                     </h1>


                     <div className="post-author-info-top">
                       <ReactPlaceholder showLoadingAnimation={true} delay={1000} type='media' ready={false} rows={3} color='#E0E0E0'>
                        <div></div>
                      </ReactPlaceholder>
                       <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '300px', marginTop:'30px', marginBottom:'50px' }}>
                        <div>

                        </div>
                    </ReactPlaceholder>

                     <ReactPlaceholder type='text' showLoadingAnimation={true} delay={1000} ready={false} rows={30} color='#E0E0E0'>
                      <div></div>
                    </ReactPlaceholder>
                    </div>

                    

                    

                 </div>


                       

      
                </div>

          </div>

      </div>

      </section>

  

      )
    }
    

          const createDT = moment(this.state.createdAt).format('ll')
    return (

            <div>
             <MetaTags>
                <title>{this.state.title}</title>
                <meta name="description" content={this.state.headline} />
                <meta property="og:title" content={this.state.title} />
                <meta property="og:description" content={this.state.headline} />
                <meta property="og:image" content={this.state.imageUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="nomadic" />
                <meta property="og:url" content={`https://nomadic.co.id/@${this.state.username}/${this.state.slug}`} />

                <meta name="twitter:card" value={this.state.headline} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@NomadicId" />
                <meta name="twitter:title" content={this.state.title} />
                <meta name="twitter:description" content={this.state.headline} />
                <meta name="twitter:creator" content="@NomadicId" />
                <meta name="twitter:image:src" content={this.state.imageUrl} />


            </MetaTags>
            <section className="article-detail-newyork">


             <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
                <div className="col-md-8">
                   
                     <div className="post-content">
                      <h1 className="posttitle">{this.state.title}</h1>
                      <div className="post-author-info-top">
                       <div className="col-md-1"  style={{marginLeft:'-10px'}}>{this.renderThumb()}</div>
                        <div className="col-md-5 col-sm-12">
                          <h5 className="author-name"><a href ={`/@${this.state.username}`}>{this.state.firstName} {this.state.lastName}</a>  {this.renderPublish()}</h5>
                          <p className="author-info">{this.state.bio}. <br /><span  style={{color:'#baba',fontSize:'11px' }}>{createDT} - {this.state.reading} min read</span></p>
                        </div>
                        
                       <div className="col-md-6"><span className="pull-right" style={{color:'#666',fontSize:'12px',padding:'10px 0 0 0'}}> <Share /></span></div>
                    </div>

                        <Image cloudName={Cloudinary_Name} publicId={this.state.imageId}  crop="scale"  alt={this.state.title}/>

                        <div className="single" id="paraf">

                         <article>

                         <div dangerouslySetInnerHTML={{ __html: this.state.body }}></div>
                        </article>
      
                        </div>

                       {/* end for single */}



               
                  {/* tags */}
            <div className="after-post-tags">
              {this.renderTopic()}
            </div>
            {/* end tags */}

             <div className="post-author-info hidden-sm hidden-xs">
              <div className="row">
                       <div className="col-md-1">{this.renderThumb()}</div>
                       <div className="col-md-5">
                    <h5 className="author-name">{this.state.firstName} {this.state.lastName}</h5>
                    <p className="author-info">{this.state.bio}</p>
                 </div>

                 <div className="col-md-6 pull-right">

                 
                          <Share />
                         

                 </div>


              </div>
                     

             </div>

                 </div>


                </div>
             </div>
            </div>

              {/* gray */}
             <div className="bg-gray">
   
                <div className="container">
                    
                     <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8 col-sm-12 col-xs-12">

                          <div className="related-articles">
                               
                               <div className="row">

                                    <div className="col-md-12">
                                        <div className="main-title">
                                          <h4><strong>Related</strong> storie</h4>
                                        </div>
                                   
                                      </div>

                                     <Related 
                                      id={this.state.id}

                                     />

                                  {/* gend row */}
                               </div>
                            

                          <div className="row" style={{marginBottom:'0px', marginTop:'30px'}}>

                                <div className="col-sm-1"></div>
                                
                                <div className="col-sm-10"><span style={{fontWeight:'600'}}>Response</span></div>
                                <div className="col-sm-1"></div>

                              </div>
                           <ResponseBox 

                             id={this.state.id}
                               avatar={this.state.avatar}
                             fbId={this.state.facebookUserId}
                            />



                            {this.renderComment()}
                            
                                 




                           </div>


                        </div>
                      </div>

                </div>
                <div className="col-md-2"></div>
            </div>
       {/* end gray */}
         </section>
         <a href="/" className="cd-top">Top</a> 
         
         {/* alert Bar */}
        

        <Status 
          name={this.state.name}
          avatar={this.state.avatar === '' ? this.state.pic:

                            
                       

                                        this.state.avatar
                                     
                            
                               
                            }
        />
        
        {/* end bar */}
           
            </div>
    )
  

  }


}
export default Single;

