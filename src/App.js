import React, { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { Provider as AuthProvider, Context as AuthContext } from "./context/AuthContext";
import ResolveAuth from "./pages/ResolveAuth";
import Wallets from "./pages/Wallets";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#cc1867",
    },
    secondary: {
      main: "#E580AC",
    },
  },
  typography: {
    fontSize: 16,
    h3: {
      fontWeight: 700,
      fontSize: "2.2rem",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const Root = () => {
  const { state } = useContext(AuthContext);

  const appFlow = (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/wallets" component={Wallets} />
        <Route path="/profile" component={Profile} />
        <Route path="*" exact={true} component={NotFound} />
      </Switch>
    </>
  );

  const visitorFlow = (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="*" exact={true} component={NotFound} />
      </Switch>
    </>
  );

  return !state.token || !state.user ? visitorFlow : appFlow;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ResolveAuth>
          <Router>
            <Root />
          </Router>
        </ResolveAuth>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
