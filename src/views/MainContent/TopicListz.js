import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Cloudinary_Name} from '../../views/Api/';
import {Image} from 'cloudinary-react';

import List from './List'

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

class Topic extends Component {

static propTypes = {
  topic: PropTypes.object,
  refresh: PropTypes.func,
};

// renderPublish(){

//   if(post.type.name == "Publishing"){

//     return(
        
//          <span>  <a href ={`/publishing/${post.publishing.slug}`}>in {post.publishing.name}</a></span>

//       )
//   }else{

//     return
//   }


// }


  

  render() {


     //const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.post.user.facebookUserId + ".jpg"
     //const createTime= this.props.post.createdAt;
      //const createDT = moment(createTime).format('ll')//20 Mart 2017
   
   
    return (
            
            <div>

        


               <div>
              <div className="col-xs-12">
                <div className="main-title">
                  <h4><strong>{this.props.topic.name}</strong></h4>
                  <div className="pull-right" style={{marginTop:'40px', textTransform:'capitalize', fontSize:'13px'}}><a href={`/topic/${this.props.topic.slug}`}>View All</a></div>
                </div>

              </div>
           
             <div className="col-xs-12">

                  
                  {this.props.topic.posts.map((post) => ( 

                     <List
                       key={post.id}
                      post={post}
                    />
                             
                       



                    ))}


               </div>
            </div>

        

               

              


        </div>
            

    )
  }
}




export default Topic;
