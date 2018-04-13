import React, {Component} from 'react';

import Status from '../../Status';
import Story from './Story'

class Topic extends Component {


  render() {
   
   
    return (
      
     <div>
      <section className="article-detail-newyork">
         <figure className="big-post-image">
           <div className="over-content">
             <div className="middle-content">
                 
                  <div className="inner">
                      <div className="row">

                              <div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5">
                 
                               <span className="post-topic"><a>TECHNOLOGY</a></span>


                             </div>

                      </div>
                  </div>

             </div>
           </div>

         </figure>

          <div className="container">

              <div className="row">
                  <div className="col-md-2"></div>
                   <div className="col-md-8" style={{paddingBottom:'100px'}}>
                     
                     <Story />
  
                   </div>
              </div>
          </div>
        
      </section>
       <Status 
          name="Nomadic"
          avatar="https://res.cloudinary.com/nomadic-id/image/upload/v1522390682/logo_google.jpg"
        />
      </div>
    )
  }
}




export default Topic;
