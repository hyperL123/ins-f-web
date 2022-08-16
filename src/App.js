import { ApolloProvider, useReactiveVar } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { isLoggedInVar, darkVar, client } from "./apollo";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./share-components/Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darMode = useReactiveVar(darkVar);
  return (
    <div>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? <Layout children={<Home />}></Layout> : <Login />
                }
              />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/users/:userName"
                element={<Layout children={<Profile />}></Layout>}
              />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
          </Router>
        </HelmetProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
