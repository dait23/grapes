import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Topic from './TopicListz'
// import  Sidebar from './Sidebar'

class PageTopic extends Component {




  render() {
   
  const inList = this.props.data.allTopics || []
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

             
             {inList.map((topic) => (
            <Topic
               key={topic.id}
              topic={topic}
              refresh={() => this.props.data.refetch()}
            />
          ))}


           </div>

	    


    )
  }
}





const QueryTopic = gql`query allPostsPic{

 allTopics(filter:{
    posts_some:{
      id_starts_with:"c"
    }
  }, orderBy: updatedAt_DESC, first: 10){
    id
    name
    posts(orderBy: createdAt_DESC,filter:{
    isPublished:true
    }, first:5){
      id
      title
      slug
      headline
      reading
      imageId
      imageUrl
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

}`



const ListPageWithData = graphql(QueryTopic)(PageTopic)

export default ListPageWithData

