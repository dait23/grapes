import React, {Component} from 'react';


import Story from './Story'

class Profile extends Component {


  render() {
   
   
    return (
      
  
      <section className="article-detail-newyork">
         <figure className="big-post-image">
           <div className="over-content">
             <div className="middle-content">
                 
                  <div className="inner">
                      <div className="row">

                              <div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5">
                 
                               <span className="post-author"><img src="images/headshot-4.jpg" alt="Image" /><a href="#">Lucifer Morningster</a></span>
                                <div className="post-metas">
                                   <p className="text-center">Ordinary People, The technology behind the platform that’s disrupting the future of work</p>
                                </div>


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

    )
  }
}




export default Profile;
