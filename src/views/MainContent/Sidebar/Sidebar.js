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
           <a href="https://about.nomadic.co.id/help">Help</a>&nbsp; &nbsp;<a href="#">About</a>&nbsp; &nbsp;<a href="#">Status</a>&nbsp; &nbsp;<a href="#">Blog</a> &nbsp; &nbsp;<a href="#">Terms</a>&nbsp; &nbsp;<a href="#">Privacy</a>&nbsp; &nbsp;<a href="#">Press</a>
            </div>
           </aside>
    )
  }
}




export default Sidebar;
