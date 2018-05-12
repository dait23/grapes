import React from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Cloudinary_Name} from '../../../views/Api/';
import {Image} from 'cloudinary-react';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class List extends React.Component {

  static propTypes = {
    book: PropTypes.object,
    refresh: PropTypes.func,
  }





  render () {


     //const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.props.post.user.facebookUserId + ".jpg"
     const createTime= this.props.book.post.createdAt;
      const createDT = moment(createTime).format('ll')//20 Mart 2017


    return (     
             

                  <li>

                  
                      <h4 className="category"><a href={`/@${this.props.book.post.user.username}/${this.props.book.post.slug}`}>{this.props.book.post.title}</a></h4>
                      <p className="small pull-left" style={{color:'#9d9d9d'}}>{createDT}  -  {this.props.book.post.reading} min read</p>
                     
                  

             </li>
     
                    
    )
  }


}


export default List
