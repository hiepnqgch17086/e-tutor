// import ApolloClient from 'apollo-boost';
// import { WebSocketLink } from "apollo-link-ws";
// import { ApiURL } from "./api/mainApi";
// import { split } from 'apollo-link';
// import { HttpLink } from 'apollo-link-http';
// import { getMainDefinition } from 'apollo-utilities';


import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from 'apollo-utilities'
import { mainHttpURL, mainWebsocketURL } from './api/mainApi'

export const UPDATED_MUTATION_TYPE = 'UPDATED'
export const CREATED_MUTATION_TYPE = 'CREATED'
export const DELETED_MUTATION_TYPE = 'DELETED'
// export const client = new ApolloClient({
//   uri: ApiURL,
// });

// export const getClient = (jwt: string) => new ApolloClient({
//   uri: ApiURL,
//   request(operation) {
//     if (jwt) {
//       operation.setContext({
//         headers: {
//           Authorizations: `Bearer ${jwt}`
//         }
//       })
//     }
//   }
// });



export const getClient = (jwt: string, httpURL = mainHttpURL, websocketURL = mainWebsocketURL) => {
  // Setup the authorization header for the http client
  const request = async (operation: any) => {
    if (jwt) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
    }
  }

  // Setup the request handlers for the http clients
  const requestLink = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      let handle: any
      Promise.resolve(operation)
        .then((oper) => {
          request(oper)
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) {
          handle.unsubscribe()
        }
      }
    })
  })

  // Web socket link for subscriptions
  const wsLink = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    }),
    requestLink,
    new WebSocketLink({
      uri: websocketURL,
      options: {
        reconnect: true,
        connectionParams: () => {
          if (jwt) {
            return {
              Authorization: `Bearer ${jwt}`,
            }
          }
        }
      }
    })
  ])

  // HTTP link for queries and mutations
  const httpLink = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    }),
    requestLink,
    new HttpLink({
      uri: httpURL,
      credentials: 'same-origin'
    })
  ])

  // Link to direct ws and http traffic to the correct place
  const link = ApolloLink.split(
    // Pick which links get the data based on the operation kind
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink,
  )


  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  })
}
