import React, {Component} from 'react';

import Network from './Network'
import Popular from './Popular'
//import Bookmark from './Bookmark'

class Sidebar extends Component {



  renderIn(){

  if(window.localStorage.getItem('nordic') == null ){


    return(

              <div>

              <Popular />
      

              </div>

      )


  }else{


     return(

       

             <div>

             
              <Popular />
               

              </div>
 


      )

  }



}



  render() {
   
   
    return (
      
     
           <aside className="sidebar">

              
           {this.renderIn()}

            <div style={{width:'100%', float:'left', fontSize:'12px', marginTop:'0px'}} >
           <a href="https://about.nomadic.co.id/help" target="_blank" rel="noopener noreferrer">Help</a>&nbsp; &nbsp;<a href="https://about.nomadic.co.id/" target="_blank" rel="noopener noreferrer">About</a>&nbsp; &nbsp;<a href="https://status.nomadic.co.id/" target="_blank" rel="noopener noreferrer">Status</a>&nbsp; &nbsp;<a href="https://nomadic.co.id/publishing/nomadic" target="_blank" rel="noopener noreferrer">>Blog</a> &nbsp; &nbsp;<a href="https://about.nomadic.co.id/terms" target="_blank" rel="noopener noreferrer">Terms</a>&nbsp; &nbsp;<a href="https://about.nomadic.co.id/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
            </div>
           </aside>
    )
  }
}




export default Sidebar;
