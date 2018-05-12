import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import { No_Avatar} from '../Api/';
import {Image} from 'cloudinary-react';


import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');


const Cloudinary_Name = 'nomadic-id';
const No_Thumb = 'https://res.cloudinary.com/nomadic-id/image/upload/v1521472965/cover.jpg';

class List extends React.Component {

  static propTypes = {
    page: PropTypes.object,
  }

  ///////////render status

 

  ////////// render image

  renderThumb(){

    if (this.props.page.imageId === ""){

        return(

              <img src={No_Thumb} alt="thumb"/>
          )
                        
      }
      else{

        return(
             <div>
              <Image cloudName={Cloudinary_Name} publicId={this.props.page.imageId} className="hidden-sm hidden-xs" height="150" crop="thumb" />

              <Image cloudName={Cloudinary_Name} publicId={this.props.page.imageId} className="hidden-lg hidden-md"  height="80" crop="thumb"  gravity="center"/>
</div>
          )
      }      

  }


  renderAvatar(){
     const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.page.user.facebookUserId + ".jpg"

    if(this.props.page.user.avatar == '' ){

     return(

         <img src={pic} className="img-circle hidden-sm hidden-xs"  />

      )

    }else{

        return(

         <img src={this.props.page.user.avatar} className="img-circle hidden-sm hidden-xs"  />

      )

    }


  }

  ///////////////
  
  render () {
     //const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.page.user.facebookUserId + ".jpg"
     const createTime= this.props.page.createdAt;
      const createDT = moment(createTime).format('ll')//20 Mart 2017

    return (
     
                    <div>

                       
                       <div className="col-md-4 col-sm-6 col-xs-6">
                        <div className="post-type-florida">
                          <figure className="post-image">{this.renderThumb()}</figure>
                           <div className="post-content">
                             <a href={`/@${this.props.page.user.username}/${this.props.page.slug}`}> <h4 className="post-title">{this.props.page.title}</h4></a>
                            <span className="post-author">{this.renderAvatar()}<a href={`/@${this.props.page.user.username}`}>{this.props.page.user.member.firstName} {this.props.page.user.member.lastName}</a></span><span className="post-date">{this.props.page.reading} min read</span> 
                            </div>
                  
                        </div>
                 
                      </div>



                    </div>
    )
  }


}




export default List
