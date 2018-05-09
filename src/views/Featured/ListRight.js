import React from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Cloudinary_Name} from '../../views/Api/';
import {Image} from 'cloudinary-react';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class List extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    refresh: PropTypes.func,
  }


renderThumb(){
     const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.props.post.user.facebookUserId + ".jpg"

    if(this.props.post.user.avatar == '' ){

     return(

         <img src={pic} className="img-circle" style={{margin:'0px 5px 0 5px', width:'33px'}} />

      )

    }else{

        return(

         <img src={this.props.post.user.avatar} className="img-circle" style={{margin:'0px 5px 0 5px', width:'30px'}} />

      )

    }


  }


  render () {

     const createTime= this.props.post.createdAt;
      const createDT = moment(createTime).format('ll')//20 Mart 2017

      // const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.props.post.user.facebookUserId + ".jpg"

    return (     

           <div className="post-type-kansas">
              <figure className="post-image"> <Image cloudName={Cloudinary_Name} publicId={this.props.post.imageId} gravity="center" width="281" height="340" crop="thumb"  alt={this.props.post.title}/></figure>
              <div className="post-content"> 
                <h4 className="post-title"><a href={`/@${this.props.post.user.username}/${this.props.post.slug}`}>{this.props.post.title}</a></h4>
                <span className="post-author">{this.renderThumb()} <Link to={`/@${this.props.post.user.username}`}>{this.props.post.user.member.firstName} {this.props.post.user.member.lastName}</Link></span> <span className="post-date">{createDT} - {this.props.post.reading} min read</span> 
                </div>
            </div>
     
                    
    )
  }


}


export default List
