import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import { No_Avatar} from './views/Api/';
import {Image} from 'cloudinary-react';

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

             <Image cloudName={Cloudinary_Name} publicId={this.props.page.imageId} width="500" crop="scale" />

          )
      }      

  }
  ///////////////
  
  render () {
     // const dateTime= this.props.story.createdAt
     // const updatedTime= this.props.story.updateddAt
     // const formattedDT = moment(dateTime).format('LL')//20 Mart 2017
     // const updateDT = moment(updatedTime).format('LL')//20 Mart 2017

    return (
     
                    <div>

                       
                       <div className="col-md-4 col-sm-4">
                        <div className="post-type-florida">
                          <figure className="post-image">{this.renderThumb()}</figure>
                           <div className="post-content">
                            <h4 className="post-title"><Link to={`/${this.props.page.slug}`}>{this.props.page.title}</Link></h4>
                            <span className="post-author"><img src="https://res.cloudinary.com/nomadic-id/image/upload/v1522390682/logo_google.jpg" alt="author-name" />Nomadic</span><span className="post-date">{this.props.page.reading} min read</span> 
                            </div>
                  
                        </div>
                 
                      </div>



                    </div>
    )
  }


}




export default List
