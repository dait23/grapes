import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Cloudinary_Name} from '../../views/Api/';
import {Image} from 'cloudinary-react';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

class List extends Component {

static propTypes = {
  post: PropTypes.object,
  refresh: PropTypes.func,
};



renderThumb(){
     const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.props.post.user.facebookUserId + ".jpg"

    if(this.props.post.user.avatar == '' ){

     return(

         <img src={pic} className="img-circle" style={{margin:'5px 0 0 5px', width:'33px'}} />

      )

    }else{

        return(

         <img src={this.props.post.user.avatar} className="img-circle" style={{margin:'0px 5px 0 5px', width:'30px'}} />

      )

    }


  }


renderPublish(){

  if(this.props.post.type.name == "Publishing"){

    return(
        
         <span>  <a href ={`/publishing/${this.props.post.publishing.slug}`}>in {this.props.post.publishing.name}</a> - </span>

      )
  }else{

    return
  }


}


  

  render() {


     //const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.post.user.facebookUserId + ".jpg"
     //const createTime= this.props.post.createdAt;
      //const createDT = moment(createTime).format('ll')//20 Mart 2017
   
   
    return (
            
   

             
               

                      <div className="row">
                       <div className="post-type-california">

                             <div className="col-md-2 col-sm-12 col-xs-12">
                              
                               <a href={`/@${this.props.post.user.username}/${this.props.post.slug}`}>
                                  <figure className="post-image-draft"><Image cloudName={Cloudinary_Name} publicId={this.props.post.imageId}  className="img-responsive" gravity="center" crop="thumb" height="170" width="170" /></figure>
                              </a>

                             </div>
                             <div className="col-md-10 col-sm-12 col-xs-12">
                                 
                                 <div className="post-content-page">
                                <a href={`/@${this.props.post.user.username}/${this.props.post.slug}`}>  <h4 className="post-title">{this.props.post.title}</h4></a>
                                 <p>{this.props.post.headline}</p>
                                 <span className="post-author">{this.renderThumb()}<a href={`/@${this.props.post.user.username}`}>{this.props.post.user.member.firstName} {this.props.post.user.member.lastName}</a></span><span className="post-date">{this.renderPublish()} {moment(this.props.post.createdAt).format('ll')},  {this.props.post.reading} min read</span> 
                                <span className="pull-right"  style={{fontSize:'18px'}} ><i className="far fa-bookmark"></i></span>
                               </div>

                             </div>

                         </div>
                      </div>  

              


       
            

    )
  }
}




export default List;
