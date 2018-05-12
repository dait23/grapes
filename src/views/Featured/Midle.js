import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import List from './ListMidle';
import featuredStore from './Store/Store';





// our main component
const Story = inject('featuredStore')(
  observer(
    class extends Component {
      //sayHello = () => this.props.postsStore.createPost('Hello World Again Mobx!');

      render() {
        const { error, loading, count, midles } = this.props.featuredStore;

        if (error) console.error(error);
        else if (loading) return(
            
                  <div>
              <div className="post-type-newyork hidden-sm hidden-xs">
                <figure className="post-image">

                   <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: 135, height: 135 }}>
                                    <div></div>
                   </ReactPlaceholder>

                 </figure>
                 <div className="post-content">
                      
                    <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>

                 </div>
          
              </div>
              <div className="post-type-newyork">
                <figure className="post-image">

                 <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: 135, height: 135 }}>
                                    <div></div>
                   </ReactPlaceholder>

                 </figure>
                 <div className="post-content">
                      
                    <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>

                 </div>
          
              </div>
              <div className="post-type-newyork">
                <figure className="post-image">

<ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: 135, height: 135 }}>
                                    <div></div>
                   </ReactPlaceholder>

                 </figure>
                 <div className="post-content">
                      
                    <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>
                   <ReactPlaceholder type='textRow' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0'>
                                    <div></div>
                   </ReactPlaceholder>

                 </div>
          
              </div>
        </div>
          );
        else

        return (

        <div className="hidden-sm hidden-xs">

             {midles.map((post) => (
            <List
              key={post.id}
              post={post}
              refresh={() => this.props.data.refetch()}
            />
          ))}

          </div>
          )
      }
    }
  )
);


const stores = { featuredStore };

const Midle = () => (
  <Provider {...stores}>
    <Story />
  </Provider>
);

export default Midle;