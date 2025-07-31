import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { showToast } from "../utils/toast";

const INACTIVITY_LIMIT = 15 * 60 * 1000;

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
  const inactivityTimerRef = useRef(null);

  // Reset and start inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    localStorage.setItem("lastActivity", Date.now().toString());
    inactivityTimerRef.current = setTimeout(() => {
      logout();
      alert("You have been logged out due to inactivity.");
    }, INACTIVITY_LIMIT);
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");

    // Safe parse helper
    const parseUser = (value) => {
      if (!value || value === "undefined" || value === "null") return null;
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    };

    const storedUser = parseUser(rawUser);

    // If we have a token but no valid user object, clean up to avoid inconsistent state
    if (storedToken && !storedUser) {
      localStorage.removeItem("user");
    }

    if (storedToken && storedUser) {
      const lastActivityStr = localStorage.getItem("lastActivity");

      // First-time seed: don't expire on first load
      if (!lastActivityStr) {
        localStorage.setItem("lastActivity", Date.now().toString());
      } else {
        const lastActivity = parseInt(lastActivityStr, 10);
        const timeSinceLast = Date.now() - lastActivity;

        if (timeSinceLast > INACTIVITY_LIMIT) {
          logout();
          alert("Session expired due to inactivity.");
          return;
        }
      }

      dispatch({
        type: "LOAD_USER",
        payload: { user: storedUser, token: storedToken },
      });
    }
  }, []);

  useEffect(() => {
    if (authState.token) {
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) =>
        window.addEventListener(event, resetInactivityTimer)
      );

      // If lastActivity missing (e.g., first load after verify), seed it once.
      if (!localStorage.getItem("lastActivity")) {
        localStorage.setItem("lastActivity", Date.now().toString());
      }

      resetInactivityTimer();

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, resetInactivityTimer)
        );
        if (inactivityTimerRef.current)
          clearTimeout(inactivityTimerRef.current);
      };
    }
  }, [authState.token]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token" && !e.newValue) {
        // token removed in another tab
        logout();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Login handler
  function loginUser(token, user) {
    if (!token || !user || typeof user !== "object") {
      // optional: throw or just return
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("lastActivity", Date.now().toString());

    dispatch({ type: "LOGIN", payload: { token, user } });
  }

  // Logout handler
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("lastActivity");
    clearTimeout(inactivityTimerRef.current);
    showToast("You have been logged out.", "success");

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
