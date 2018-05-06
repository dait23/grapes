import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import List from './List';
import featuredStore from './Store/Store';





// our main component
const Story = inject('featuredStore')(
  observer(
    class extends Component {
      //sayHello = () => this.props.postsStore.createPost('Hello World Again Mobx!');

      render() {
        const { error, loading, count, lefts } = this.props.featuredStore;

        if (error) console.error(error);
        else if (loading) return(
            
            <div className="col-md-4 col-sm-6">
              <div className="post-type-nevada">
          
           <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: 500 }}>
                                    <div></div>
                                  </ReactPlaceholder>


        </div></div>
          );
        else

        return (

        
        <div>

            {lefts.map((post) => (
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

const Left = () => (
  <Provider {...stores}>
    <Story />
  </Provider>
);

export default Left;