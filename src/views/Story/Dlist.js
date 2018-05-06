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


  renderPublish(){

  if(this.props.post.type.name == "Publishing"){

    return(
        
         <span>  <a href ={`/publishing/${this.props.post.publishing.slug}`}>in {this.props.post.publishing.name}</a></span>

      )
  }else{

    return
  }


}


  renderImage(){

    if(this.props.post.imageId == ''){

       return(

           <figure className="post-image-draft"><img src={No_Thumb} alt="post-image"/></figure>

        )

    }else{

      return(

        <figure className="post-image-draft"><Image cloudName={Cloudinary_Name} publicId={this.props.post.imageId} crop="thumb" height="50" width="50"/></figure>

      )
    }

  }


  render() {


     const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.post.user.facebookUserId + ".jpg"
     const createTime= this.props.post.createdAt;
      const createDT = moment(createTime).format('ll')//20 Mart 2017
   
   
    return (
  

            
              <div className="post-type-california" style={{borderBottom:'1px solid #ccc', paddingBottom:'10px'}}>

                 {this.renderImage()}
            
                   <div className="post-content">
                    <a href={`/@${this.props.post.user.username}/${this.props.post.slug}`}>  <h4 className="post-title">{this.props.post.title}</h4></a>
                    
                     <span className="post-date" style={{marginLeft:'-0px', marginTop:'-5px'}}>{createDT} &nbsp;{this.renderPublish()} - &nbsp;{this.props.post.reading} min read &nbsp;&nbsp;&nbsp; {this.props.post.read} Reads  &nbsp;&nbsp;&nbsp;  {this.props.post._commentsMeta.count} Respone</span> 
                    
                   </div>
                   <div style={{display:'block', float:'left', width:'35%'}}>

                      <span className="pull-right"  style={{fontSize:'14px', marginLeft:'10px', cursor:'pointer'}} onClick={this.handleDelete} >Delete</span>
                     <span className="pull-right"  style={{fontSize:'14px'}} ><a href={`/me/stories/draft/edit/${this.props.post.id}`}>Edit</a></span>

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
    deletePost(id: $id) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(Dlist)

export default SliderWithMutation
