import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';
import Status from '../../Status';

class NotFound extends Component {

  render() {
   
   
    return (
      <div>
        <MetaTags>
            <title>Nomadic - 404</title>
             <meta name="description" content="Nomadic – Online Publishing Platform for Read, write and share stories" />
            <meta property="og:title" content="Nomadic - About" />
             <meta property="og:description" content="Welcome to Nomadic, a place to read, write, and interact with the stories. Every day, thousands of read, write, and share important stories on Nomadic." />
            <meta property="og:image" content="https://res.cloudinary.com/spazeeid/image/upload/v1521322663/cover_jjet5b.jpg" />
        </MetaTags>
    
        <section className="int-header">
		    <div className="container">
		      
		    </div>
		  </section>
		  <section className="content">
		    <div className="container">
		      <div className="row">
		        <div className="col-xs-12 text-center">
		        <img src="https://res.cloudinary.com/nomadic-id/image/upload/v1522570054/404.jpg" alt="404" />
		        </div>

		      </div>

		    </div>
 
		  </section>
         <a href="/" className="cd-top">Top</a> 

         {/* alert Bar */}
        

       <Status 
          name="Nomadic"
          avatar="https://res.cloudinary.com/nomadic-id/image/upload/v1522390682/logo_google.jpg"
        />
        
        {/* end bar */}


        
      </div>
    )
  }
}




export default NotFound ;
