
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import {BrowserRouter as Router,Route,Routes, Navigate } from "react-router-dom"
import { isLoggedInVar,  darkVar, client} from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import {ThemeProvider} from "styled-components"
import SignUp from "./screens/SignUp";
import { HelmetProvider } from "react-helmet-async";
import HeaderLayout from "./screens/Header/HeaderLayout";


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const darMode = useReactiveVar(darkVar)
  return (
    <div>
      <ApolloProvider client={client}>
      <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn?<HeaderLayout children={<Home />} />:<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      </HelmetProvider>
      </ApolloProvider>
    </div>
  );
}



export default App;
