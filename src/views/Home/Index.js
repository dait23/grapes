import React, {Component} from 'react';

import MetaTags from 'react-meta-tags';
import Featured from '../Featured/'
import Top from '../Top/'
import  MainContent from '../MainContent/'

class Home extends Component {


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
            <Top />
            <MainContent />


        </div>
    </section>
    
</div>
    )
  }
}




export default Home;
