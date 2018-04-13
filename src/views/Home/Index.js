import React, {Component} from 'react';


import Featured from '../../Featured'
import Top from '../../Top'
import  MainContent from '../../MainContent'

class Home extends Component {


  render() {
   
   
    return (
      
  
     <section className="content">
        <div className="container">

            <Featured />
            <Top />
            <MainContent />


        </div>
    </section>

    )
  }
}




export default Home;
