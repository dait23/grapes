import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Topic from './TopicListx'
// import  Sidebar from './Sidebar'

class PageLogin extends Component {




  render() {
   
  const inList = this.props.data.allInterests || []
   if (this.props.data.loading) {
      return ( 
           
           <div>

               <div className="col-xs-12">
              <div className="main-title">
                <h4><ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100px'}}>
					  <div></div>
					</ReactPlaceholder>
					</h4>
              </div>
          </div>

      	   <div className="col-xs-12">

      	          <div className="post-type-california">
                  <figure className="post-image-draft">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '170px', width:'170px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                   </figure>

                    <div className="post-content">
                         
                           <ReactPlaceholder type='text' ready={false} showLoadingAnimation={true} rows={6} color='#E0E0E0'>
							  <div></div>
							</ReactPlaceholder>


                    </div>

      	          </div>



      	       </div>


      	       <div className="col-xs-12">

      	          <div className="post-type-california">
                  <figure className="post-image-draft">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '170px', width:'170px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                   </figure>

                    <div className="post-content">
                         
                           <ReactPlaceholder type='text' ready={false} showLoadingAnimation={true} rows={6} color='#E0E0E0'>
							  <div></div>
							</ReactPlaceholder>


                    </div>

      	          </div>


      	          



      	       </div>



<div className="col-xs-12">

      	          <div className="post-type-california">
                  <figure className="post-image-draft">
                   <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '170px', width:'170px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                   </figure>

                    <div className="post-content">
                         
                           <ReactPlaceholder type='text' ready={false} showLoadingAnimation={true} rows={6} color='#E0E0E0'>
							  <div></div>
							</ReactPlaceholder>


                    </div>

      	          </div>



      	       </div>
      	                      <div className="col-xs-12">
              <div className="main-title">
                <h4><ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100px'}}>
					  <div></div>
					</ReactPlaceholder>
					</h4>
              </div>
          </div>

      	   <div className="col-xs-12">

      	          <div className="post-type-california">
                 <figure className="post-image-draft">
                     <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '170px', width:'170px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                   </figure>

                    <div className="post-content">
                         
                           <ReactPlaceholder type='text' ready={false} showLoadingAnimation={true} rows={6} color='#E0E0E0'>
							  <div></div>
							</ReactPlaceholder>


                    </div>

      	          </div>



      	       </div>


      	       <div className="col-xs-12">

      	          <div className="post-type-california">
                  <figure className="post-image-draft">
                      <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '170px', width:'170px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                   </figure>

                    <div className="post-content">
                         
                           <ReactPlaceholder type='text' ready={false} showLoadingAnimation={true} rows={6} color='#E0E0E0'>
							  <div></div>
							</ReactPlaceholder>


                    </div>

      	          </div>


      	          



      	       </div>



               <div className="col-xs-12">

      	          <div className="post-type-california">
                 <figure className="post-image-draft">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '170px', width:'170px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                   </figure>

                    <div className="post-content">
                         
                           <ReactPlaceholder type='text' ready={false} showLoadingAnimation={true} rows={6} color='#E0E0E0'>
							  <div></div>
							</ReactPlaceholder>


                    </div>

      	          </div>



      	       </div>



      	       </div>


      	    )
    }
   
  	
   
    return (
      
	     
         
           <div className="col-xs-12">

             
             {inList.map((inter) => (
            <Topic
               key={inter.id}
              inter={inter}
              refresh={() => this.props.data.refetch()}
            />
          ))}


           </div>

	    


    )
  }
}


const Uid = window.localStorage.getItem('uid');


const Queryx = gql`query allPostsx($id: ID!) {

 allInterests(filter:{
    user:{
      id: $id
    }
  }, orderBy:updatedAt_DESC){
    id
    topics(orderBy: updatedAt_DESC,
      filter:{  
        posts_some:{
          id_starts_with:"c"
        }
      }
      
    ){
      name
      slug
      id
      posts(orderBy: createdAt_DESC,filter:{
    isPublished:true
      }, last:5){
        id
        title
        slug
        headline
        imageId
        imageUrl
        reading
        createdAt
         type{
          name
        }
        publishing{
          name
          slug
        }
        user{
          id
          avatar
          username
          facebookUserId
          member{
            firstName
            lastName
          }
        }
      }
    }
  }

}`



const ListPageWithData = graphql(Queryx, {
  options: { variables: { id: Uid } }
})(PageLogin)

export default ListPageWithData

