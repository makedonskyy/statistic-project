import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  fetchOptions: {
    mode: "cors",
  },
});

const client = new ApolloClient({
  credentials: "include",
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
