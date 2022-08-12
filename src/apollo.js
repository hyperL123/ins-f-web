import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { HttpLink, ApolloLink, concat } from "@apollo/client";
const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("token")));
export const darkVar = makeVar(false);

export const logUserIn = (token) => {
  console.log("set token");
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      token: localStorage.getItem("token") || null,
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
