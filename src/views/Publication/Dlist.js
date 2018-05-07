import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {Cloudinary_Name, No_Thumb} from '../../views/Api/';
import {Image} from 'cloudinary-react';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

class Dlist extends Component {


  renderImage(){

    if(this.props.post.avatarId == ''){

       return(

           <figure className="post-image-draft"><img src={No_Thumb} alt="post-image"/></figure>

        )

    }else{

      return(

        <figure className="post-image-draft"><Image cloudName={Cloudinary_Name} publicId={this.props.post.avatarId} crop="thumb" height="50" width="50"/></figure>

      )
    }

  }

  renderStatus(){

    if(this.props.post.writters !== '' && this.props.post.isOwner == true){
    
     return(

       <span style={{fontSize:'14px'}}> - Owner</span>
     )

    }else{

      return(

       <span style={{fontSize:'14px'}}> - Writter</span>
     )
    }


  }


  renderAction(){

    if(this.props.post.writters !== '' && this.props.post.isOwner == true){
    
      return(


        <div>
                     <span className="pull-right"  style={{fontSize:'13px', marginLeft:'10px', cursor:'pointer'}} onClick={this.handleDelete} >Delete</span>
                     <span className="pull-right"  style={{fontSize:'13px', marginLeft:'10px'}} ><a href={`/me/publication/edit/${this.props.post.id}`}>Settings</a></span>
                     <span className="pull-right"  style={{fontSize:'13px', marginLeft:'10px'}} ><a href={`/me/publication/stats/${this.props.post.id}`}>Stats</a></span>
                     <span className="pull-right"  style={{fontSize:'13px'}} ><a href={`/me/publication/new-story/${this.props.post.id}`}>New Stories</a></span>
        </div>

      )
    }else{


      return(
                  <div>
                     <span className="pull-right"  style={{fontSize:'13px', marginLeft:'10px'}} ><a href={`/me/publication/stats/${this.props.post.id}`}>Stats</a></span>
                     <span className="pull-right"  style={{fontSize:'13px'}} ><a href={`/me/publication/new-story/${this.props.post.id}`}>New Stories</a></span>
                </div>

      )
    }


  }


  render() {


    
     const createTime= this.props.post.createdAt;
      const createDT = moment(createTime).format('ll')//20 Mart 2017
   
   
    return (
  

            
              <div className="post-type-california" style={{borderBottom:'1px solid #ccc', paddingBottom:'10px'}}>

                 {this.renderImage()}
            
                   <div className="post-content">
                    <a href={`/${this.props.post.slug}`}>  <h4 className="post-title">{this.props.post.name}  {this.renderStatus()}</h4> </a> 
                    <div dangerouslySetInnerHTML={{ __html: this.props.post.description }} style={{fontSize:'13px'}}></div>
                    
                     <span className="post-date" style={{marginLeft:'-0px', marginTop:'-5px'}}>{createDT} </span> 
                    
                   </div>
                   <div style={{display:'block', float:'left', width:'37%'}}>

                      {this.renderAction()} 

                   </div>
              </div>
           

            

    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        id: this.props.post.id,
      }
    })

    window.location.reload();
  }
}

Dlist.propTypes = {
  post: PropTypes.object,
  refresh: PropTypes.func,
  mutatePost: PropTypes.func,
};


const deleteBanner = gql`
  mutation deleteBanner($id: ID!) {
    deletePublishing(id: $id) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(Dlist)

export default SliderWithMutation
