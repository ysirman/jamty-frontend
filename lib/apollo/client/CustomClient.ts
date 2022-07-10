import { getSession } from 'next-auth/react'
import {
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
  const session = await getSession()
  const modifiedHeader = {
    headers: {
      ...headers,
      authorization: `Bearer ${session?.accessToken}`,
    },
  }
  return modifiedHeader
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, httpLink]),
})

export default client
