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

    if(this.props.book.post.imageId == ''){

       return(

           <figure className="post-image-draft"><img src={No_Thumb} alt="post-image"/></figure>

        )

    }else{

      return(

        <figure className="post-image-draft"><Image cloudName={Cloudinary_Name} publicId={this.props.book.post.imageId} crop="thumb" height="50" width="50"/></figure>

      )
    }

  }


  render() {


     const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.book.post.user.facebookUserId + ".jpg"
     const createTime= this.props.book.post.createdAt;
      const createDT = moment(createTime).format('ll')//20 Mart 2017
   
   
    return (
  

            
              <div className="post-type-california" style={{borderBottom:'1px solid #ccc', paddingBottom:'10px'}}>

                 {this.renderImage()}
            
                   <div className="post-content">
                    <a href={`/@${this.props.book.post.user.username}/${this.props.book.post.slug}`}>  <h4 className="post-title">{this.props.book.post.title}</h4></a>
                    
                     <span className="post-date" style={{marginLeft:'-0px', marginTop:'-5px'}}>{createDT} &nbsp; &nbsp;{this.props.book.post.reading} min read &nbsp;&nbsp;&nbsp; {this.props.book.post.read} Reads </span> 
                    
                   </div>
                   <div style={{display:'block', float:'left', width:'35%'}}>

                      <span className="pull-right"  style={{fontSize:'14px', marginLeft:'10px', cursor:'pointer'}} onClick={this.handleDelete} >Delete</span>
             

                   </div>
              </div>
           

            

    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        id: this.props.book.id,
      }
    })

    window.location.reload();
  }
}

Dlist.propTypes = {
  book: PropTypes.object,
  refresh: PropTypes.func,
  mutatePost: PropTypes.func,
};


const deleteBanner = gql`
  mutation deleteBanner($id: ID!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(Dlist)

export default SliderWithMutation
