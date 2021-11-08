// import * as Google from "expo-google-app-auth";

import createDataContext from "./createDataContext";
import { authInstance as authApi } from "../api/axios";

const authReducers = (state, action) => {
  switch (action.type) {
    case "add_loading":
      return {
        ...state,
        isLoading: true,
      };

    case "remove_loading":
      return {
        ...state,
        isLoading: false,
      };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
    case "signin":
      return { ...state, errorMessage: "", token: action.payload.token, user: action.payload.user };

    case "signout":
      return { errorMessage: "", token: null, user: null };

    case "clear_errorMessage":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const signup = (dispatch) => async (email, password) => {
  try {
    const response = await authApi.post("/auth/signup", { email, password });
    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: "signup", payload: response.data.accessToken });
      await localStorage.setItem("token", response.data.accessToken);
      await localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Error when trying to register, Please try agian later.",
    });
  }
};

const signin = (dispatch) => async (email, password) => {
  try {
    const response = await authApi.post("/auth/signin", { email, password });
    if (response.status >= 200 && response.status < 300) {
      dispatch({
        type: "signin",
        payload: { token: response.data.accessToken, user: response.data.user },
      });

      await localStorage.setItem("token", response.data.accessToken);
      await localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Error when trying to register, Please try agian later.",
    });
  }
};

const signout = (dispatch) => async () => {
  await localStorage.removeItem("token");
  await localStorage.removeItem("user");
  dispatch({ type: "signout" });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_errorMessage" });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await localStorage.getItem("token");
  const userStringfied = await localStorage.getItem("user");
  const user = userStringfied ? JSON.parse(userStringfied) : null;

  console.log(token, user);
  if (user) {
    dispatch({ type: "signin", payload: { token, user } });
  }
  dispatch({ type: "remove_loading" });
};

// const handleGoogleLogin = (dispatch) => async () => {
//   dispatch({ type: "add_loading" });
//   const config = {
//     iosClientId: `762321154095-l4t9d7e8h3hdrmmine6e27uoc76nv1mb.apps.googleusercontent.com`,
//     androidClientId: `762321154095-2s2204errmbrr1h711s0lgehgecd2lh9.apps.googleusercontent.com`,
//     scopes: ["profile", "email"],
//   };

//   const { type, user } = await Google.logInAsync(config);
//   if (type === "success") {
//     const response = await cryptoApi.post("/auth/signin/google", {
//       firstName: user.givenName,
//       lastName: user.familyName,
//       googleId: user.id,
//       email: user.email,
//       avatar: user.photoUrl,
//     });

//     if (response.status >= 200 && response.status < 300) {
//       console.log(response.data.user);
//       dispatch({
//         type: "signin",
//         payload: { token: response.data.accessToken, user: response.data.user },
//       });
//       await localStorage.setItem("token", response.data.accessToken);
//       await localStorage.setItem("user", JSON.stringify(response.data.user));
//     }
//   } else {
//     dispatch({
//       type: "add_error",
//       payload: "Error when trying to sign in  with Google, Please try agian later.",
//     });
//   }
//   dispatch({ type: "remove_loading" });
// };

export const { Context, Provider } = createDataContext(
  authReducers,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin /*handleGoogleLogin*/ },
  { token: null, user: null, errorMessage: "", isLoading: true }
);
