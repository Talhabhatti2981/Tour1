import { createContext, useEffect, useReducer } from "react";

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return null;

    const user = JSON.parse(rawUser);
    const token = user?.token || localStorage.getItem("token");

    // Old sessions had a user object but no JWT — force a fresh login
    if (!token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }

    return { ...user, token };
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
      if (state.user.token) {
        localStorage.setItem("token", state.user.token);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
