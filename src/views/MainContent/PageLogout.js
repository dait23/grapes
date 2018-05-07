import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Topic from './TopicList'
// import  Sidebar from './Sidebar'

class PageLogout extends Component {




  render() {
  const outList = this.props.data.allPosts || [ ]
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

  
      
	     <div>
	     
          <div className="col-xs-12">
              <div className="main-title">
                <h4><strong>Latest</strong> Storie</h4>
              </div>
          </div>

           <div className="col-xs-12">

             
             {this.props.data.allPosts.map((post) => (
            <Topic
              key={post.id}
              post={post}
              refresh={() => this.props.data.refetch()}
            />
          ))}


           </div>

	      </div>


    )
  }
}




const QueryLog = gql`query allPosts {
 allPosts(orderBy: createdAt_DESC,filter:{
    isPublished:true
  }, first:15) {
        id
        title
        slug
        headline
        createdAt
        imageId
        imageUrl
        reading
        type{
          name
        }
        publishing{
          name
          slug
        }
        user{
          username
          facebookUserId
          avatar
          member{
            firstName
            lastName
          }
        }
           
     }
}`




const ListPageWithData = graphql(QueryLog)(PageLogout)

export default ListPageWithData

