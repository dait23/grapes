import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import List from './List';
import topStore from './Store/Store';





// our main component
const Story = inject('topStore')(
  observer(
    class extends Component {
      //sayHello = () => this.props.postsStore.createPost('Hello World Again Mobx!');

      render() {
        const { error, loading, count, populars } = this.props.topStore;

        if (error) console.error(error);
        else if (loading) return(
            
            <div className="row"><div className="col-xs-12">
                <div className="custom-5cols">

                <ul>

                  <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
                 <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
                 <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
                  <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
                 <li>
                  <div className="post-type-florida">
                    <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: '224px'}}>
                        <div>

                        </div>
                    </ReactPlaceholder>
                     <div className="post-content">
                    <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>
                     <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} delay={1000} style={{ width: '100%'}}>
                      <div></div>
                    </ReactPlaceholder>


                  </div></div>
                  </li>
   
                </ul>
          
           


       </div></div></div>

          );
        else

        return (

        
    <div className="row">
          <div className="col-xs-12">
            <div className="main-title">
              <h4><strong>Top</strong> Stories</h4>
            </div>
          </div>
           
          <div className="col-xs-12">
               <div className="custom-5cols">

                  <ul>

             {populars.map((post) => (
            <List
              key={post.id}
              post={post}
              refresh={() => this.props.data.refetch()}
            />
          ))}

          </ul>

               </div>
             </div>


              {/* end for row */}

        </div>


          )
      }
    }
  )
);


const stores = { topStore };

const Top = () => (
  <Provider {...stores}>
    <Story />
  </Provider>
);

export default Top;