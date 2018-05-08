import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import List from './List';

class Related extends Component {

static propTypes = {
  id: PropTypes.string
};




  render() {

      const relatedList = this.props.data.allPosts || [ ]
     
     if (this.props.data.loading) {
      return (<div>
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


          </div>)
    }
   
    return (
      
     <div>

                    {relatedList.map((page) => (
                          <List
                      key={page.id}
                      page={page}
                    />
                ))}


                 </div>

    )
  }
}




const RelatedQuery = gql`query allPostRelated {
   allPosts(orderBy: read_DESC,filter:{
    isPublished:true
  }, last:3) {
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



export default graphql(RelatedQuery, {
  options: (props) => ({ variables: { url: props.id } })
})( Related );