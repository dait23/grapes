import React, {Component} from 'react';
import { Jumbotron, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import Featured from '../Featured/'
import Top from '../Top/'
import  MainContent from '../MainContent/'

class Home extends Component {


 renderBanner(){
 const xxx ='https://res.cloudinary.com/nomadic-id/image/upload/v1525977038/ftj4hxken6tctfexoi10.png';

   if(localStorage.getItem('nordic') == null && localStorage.getItem('uid') == null ){


     return(

          <div>
          <Jumbotron style={{background:'#D7EFEE', borderRadius:'0px'}}>

             <div className="row">
               
               <div className="col-md-8">
                  <h1 style={{fontFamily:'Poppins, sans-serif',  fontSize:'33px', fontWeight:'600'}}>Welcome to Nomadic</h1>
                    <p className="lead" style={{fontSize:'22px', fontWeight:'500',  fontFamily:'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'}}>Publishing Place for Everyone</p>
                
                    <p style={{fontSize:'16px'}}>We’ll deliver the best stories and ideas <br/> on the topics you care about most straight to your homepage, app, or inbox.</p>
                    <p className="lead">
                      <Button color="success" style={{borderRadius:'0px', padding:'10px 30px', margin:'20px 0px 0'}}> <a href="https://about.nomadic.co.id" style={{color:'#fff'}}>Learn More</a></Button>
                    </p>

               </div>
               <div className="col-md-4" style={{backgroundImage: `url(${xxx})`, backgroundRepeat:'no-repeat', backgroundPosition:'top center', height:'310px'}}>


               </div>

             </div>
           
          </Jumbotron>
        </div>
        )


   }else{

      return(

        <Top />

      )

   }



 }   


  render() {
   
   
    return (

        <div>

          <MetaTags>
                <title>Nomadic – Online Publishing Platform for Everyone</title>
                <meta name="description" content="Welcome to Nomadic, a place to publishing, read, write the stories. Every day, thousands of read, write, and share important stories on Nomadic." />
                <meta property="og:title" content="Nomadic – Online Publishing Platform for Everyone" />
                <meta property="og:description" content="Welcome to Nomadic, a place to publishing, read, write the stories. Every day, thousands of read, write, and share important stories on Nomadic." />
                <meta property="og:image" content="https://res.cloudinary.com/spazeeid/image/upload/v1521322663/cover_jjet5b.jpg" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://www.nomadic.co.id/" />

                <meta name="twitter:card" value="Welcome to Nomadic, a place to publishing, read, write the stories. Every day, thousands of read, write, and share important stories on Nomadic." />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@NomadicId" />
                <meta name="twitter:title" content="Nomadic – Online Publishing Platform for Everyone" />
                <meta name="twitter:description" content="Welcome to Nomadic, a place to publishing, read, write the stories. Every day, thousands of read, write, and share important stories on Nomadic." />
                <meta name="twitter:creator" content="@NomadicId" />
                <meta name="twitter:image:src" content="https://res.cloudinary.com/spazeeid/image/upload/v1521322663/cover_jjet5b.jpg" />

            </MetaTags>
      
  
     <section className="content">
        <div className="container">

            <Featured />
            {this.renderBanner()}
            <MainContent />


        </div>
    </section>
    
</div>
    )
  }
}




export default Home;
