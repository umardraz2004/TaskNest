import { createContext, useContext, useReducer, useEffect } from "react";

const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes
let inactivityTimer;

// Initial context shape
export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  loginUser: () => {},
  logout: () => {},
});

// Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case "LOAD_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!action.payload.token,
      };
    default:
      return state;
  }
}

// Provider Component
export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
  });

  // Reset and start inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    localStorage.setItem("lastActivity", Date.now().toString());
    inactivityTimer = setTimeout(() => {
      logout();
      alert("You have been logged out due to inactivity.");
    }, INACTIVITY_LIMIT);
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const lastActivity = localStorage.getItem("lastActivity");
      const timeSinceLast = Date.now() - parseInt(lastActivity || "0", 10);

      if (timeSinceLast > INACTIVITY_LIMIT) {
        logout();
        alert("Session expired due to inactivity.");
        return;
      }

      dispatch({
        type: "LOAD_USER",
        payload: {
          user: JSON.parse(storedUser),
          token: storedToken,
        },
      });
    }
  }, []);

  // Setup inactivity listeners
  useEffect(() => {
    if (authState.token) {
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) =>
        window.addEventListener(event, resetInactivityTimer)
      );

      resetInactivityTimer();

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, resetInactivityTimer)
        );
        clearTimeout(inactivityTimer);
      };
    }
  }, [authState.token]);

  // Login handler
  function loginUser(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("lastActivity", Date.now().toString());

    dispatch({
      type: "LOGIN",
      payload: { token, user },
    });
  }

  // Logout handler
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("lastActivity");
    clearTimeout(inactivityTimer);

    dispatch({ type: "LOGOUT" });
  }

  const ctxValue = {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    loginUser,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

// Custom hook
export const useAuth = () => useContext(AuthContext);
