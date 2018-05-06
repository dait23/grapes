import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

import List from './List';


class Top extends Component {

  // renderList(){


  //     if (this.props.data.allPosts == ''){

         
  //     }else{


  //       return(

  //          <ul>

  //            {this.props.data.allPosts.map((post) => (
  //           <List
  //             key={post.id}
  //             post={post}
  //             refresh={() => this.props.data.refetch()}
  //           />
  //         ))}

  //         </ul>


  //       )
  //     }

    
  // }





  render() {

    const topList = this.props.data.allPosts || [ ]
   
   
    if (this.props.data.loading) {
      return ( <div className="row"><div className="col-xs-12">
                <div className="custom-5cols">

                <ul>

                  <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
                 <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
                 <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
                  <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
                 <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
   
                </ul>
          
           


       </div></div></div>)
    }
    return (
      
     
            <div className="row">
          <div className="col-xs-12">
            <div className="main-title">
              <h4><strong>Top</strong> Stories</h4>
            </div>
          </div>
           
          <div className="col-xs-12">
               <div className="custom-5cols">

                  <ul>

             {topList.map((post) => (
            <List
              key={post.id}
              post={post}
              refresh={() => this.props.data.refetch()}
            />
          ))}

          </ul>

               </div>
             </div>


              {/* end for row */}

        </div>

    )
  }
}


const QueryTop = gql`query allPostsTop {
 allPosts(orderBy: read_DESC,filter:{
    isPublished:true
  }, first:5) {
        id
        title
        slug
        headline
        createdAt
        imageId
        imageUrl
        reading
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




const ListPageWithData = graphql(QueryTop)(Top)

export default ListPageWithData
