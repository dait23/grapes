import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import {MainApi} from '../../Api/';
import { extendObservable, toJS } from 'mobx';
//import { inject, observer, Provider } from 'mobx-react';
//import {toast } from 'react-toastify';

global.fetch = fetch;



// queries and mutations
const allLeftQuery = gql`
  {
    allPosts(filter: {
    AND: [{
      isPublished: true
    }, {
      isLeft: true
    }]
  },orderBy: createdAt_DESC, first:1) {
        id
        title
        slug
        headline
        imageId
        reading
        imageUrl
        imageId
        createdAt
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


const allMidleQuery = gql`
  {
    allPosts(filter: {
    AND: [{
      isPublished: true
    }, {
      isFeatured: true
    }]
  },orderBy: createdAt_DESC, last:3) {
        id
        title
        slug
        headline
        imageId
        reading
        imageUrl
        imageId
        createdAt
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

const allRightQuery = gql`
  {
    allPosts(filter: {
    AND: [{
      isPublished: true
    }, {
      isFeatured: true
    }]
  },orderBy: createdAt_DESC, last:1) {
        id
        title
        slug
        headline
        imageId
        reading
        imageUrl
        imageId
        createdAt
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
const featuredStore = new class {
  constructor() {
    extendObservable(this, {
       get allLeft() {
        return graphql({ client, query: allLeftQuery });
      },

       get allMidle() {
        return graphql({ client, query: allMidleQuery });
      },

        get allRight() {
        return graphql({ client, query: allRightQuery });
      },
     
      get error() {
        return (this.allLeft.error && this.allLeft.error.message) || null;
       },
      get loading() {
        return this.allLeft.loading;
      },
      get lefts() {
         return (this.allLeft.data.allPosts && toJS(this.allLeft.data.allPosts)) || [];
       },
        get midles() {
         return (this.allMidle.data.allPosts && toJS(this.allMidle.data.allPosts)) || [];
       },
         get rights() {
         return (this.allRight.data.allPosts && toJS(this.allRight.data.allPosts)) || [];
       },
      get count() {
        return this.lefts.length;
      },
     
    });

  }

   
}();


export default featuredStore;