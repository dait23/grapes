import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Dlist from './Dlist'


import NotFound from'../../views/404/'


class Publication extends Component {

renderList(){

  if(this.props.data.allPublishings == ''){

   
    return(
         
         <div>
         <p>No Publications Yet !!!</p>
         <br />
           <Link to="/new-publication"  style={{margin:'5px 0px', fontSize:'14px', border:'1px solid #333', padding:'10px', textDecoration:'none'}} alt="Add new storie"><i className="far fa-edit" style={{fontSize:'16px'}}></i>&nbsp;&nbsp; New Publications</Link>
         </div>

      )

  }else{
      
      return(

          
          <div>
               {this.props.data.allPublishings.map((post) => (
                    <Dlist
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

    if(localStorage.getItem('nordic') == null ){


    return(

               <NotFound />

      )


  }

    if (this.props.data.loading) {
      return ( 
           
           <div>
            <div className="candy-wrapper">
          <div className="main">
            <div className="row inner" style={{paddingTop:'100px'}}>

            <div className="col-md-2"></div>
              

            <div className="col-md-10">
                <div className="main-title">
                  <h4><strong>My Publications</strong> </h4>

                </div>

                <div className="col-xs-12">
                    
                     Loading....

                </div>
            </div>

           

              {/* end for row */}

            </div>
           </div>
    
        </div>
            </div>

            )
    }
    return (
      <div>
        

       <div className="candy-wrapper">
          <div className="main">
            <div className="row inner" style={{paddingTop:'100px'}}>

            <div className="col-md-3"></div>
              

            <div className="col-md-9">
                <div className="main-title">
                  <h4><strong>My Publications</strong></h4>
                   <div className="pull-right" style={{marginTop:'40px', textTransform:'capitalize', fontSize:'13px'}}> <Link to="/new-publication"  style={{margin:'5px 0px', fontSize:'14px',padding:'10px', textDecoration:'none'}} alt="Add new publications"><i className="far fa-edit" style={{fontSize:'16px'}}></i>&nbsp;&nbsp; New Publications</Link></div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                    
                    
                      {this.renderList()}
                </div>
                </div>

                
            </div>

           

              {/* end for row */}

            </div>
           </div>
    
        </div>

      </div>
    )
  }
}

const Uid = window.localStorage.getItem('uid');

const QueryPublic = gql`query allPublicDraft($id: ID!) {
 allPublishings(filter:{
    user:{
      id: $id
    }
  }, orderBy: createdAt_DESC) {
        id
        name
        slug
        description
        avatarId
        avatarUrl
        createdAt  
           
     }

     
}`





const ListPageWithData = graphql(QueryPublic, {
  options: { variables: { id: Uid } }
})(Publication)

export default ListPageWithData