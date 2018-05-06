import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import {MainApi} from '../../../Api/';
import { extendObservable, toJS } from 'mobx';
//import { inject, observer, Provider } from 'mobx-react';
//import {toast } from 'react-toastify';

global.fetch = fetch;



// // queries and mutations
// const allStoryQuery = gql`
//   {
//     allPosts(orderBy: createdAt_DESC) {
//         id
//         title
//         slug
//         headline
//         body
//         createdAt
//         updatedAt
//         isFeatured
//         isPublished
//         imageId
//         imageUrl
//         status
//         read
//         user{
//           username
//           member{
//             imageId
//             imageUrl
//           }
//         }
           
//      }
//   }
// `;


// const allFeaturedQuery = gql`
//   {
//    allPosts(filter: {
//     AND: [{
//       status: 0
//     }, {
//       isFeatured: true
//     }]
//   },orderBy: createdAt_DESC) {
//         id
//         title
//         slug
//         body
//         createdAt
//         updatedAt
//         isFeatured
//          isPublished
//         imageId
//         imageUrl
//         status
//         read
//         user{
//           username
//           member{
//             imageId
//             imageUrl
//           }
//         }
       
//      }
//   }
// `;

const allPopularQuery= gql`
  {
    allPosts(orderBy: read_DESC,filter:{
    isPublished:true
  }, first:5) {
        id
        title
        slug
        headline
        createdAt
        imageId
        imageUrl
        reading
        user{
          username
          facebookUserId
          avatar
          member{
            firstName
            lastName
          }
        }
      
       
     }
  }
`;









const uri = MainApi;

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});

// building a mobx store
const popularStore = new class {
  constructor() {
    extendObservable(this, {
       get allPopular() {
        return graphql({ client, query: allPopularQuery });
      },
     
      get error() {
        return (this.allPopular.error && this.allPopular.error.message) || null;
       },
      get loading() {
        return this.allPopular.loading;
      },
      get populars() {
         return (this.allPopular.data.allPosts && toJS(this.allPopular.data.allPosts)) || [];
       },
      get count() {
        return this.populars.length;
      },
     
    });

  }

   
}();


export default popularStore;