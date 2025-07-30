import { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/AuthContext";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

export default function VerifyEmail() {
  const [status, setStatus] = useState("Verifying...");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const token = params.get("token");

  const redirectTimeoutRef = useRef(null);

  useEffect(() => {
    if (!token) {
      setStatus("Missing or invalid verification token.");
      return;
    }

    let cancelled = false; // don't update state after unmount

    (async () => {
      try {
        const res = await axios.post(`${BASEURL}/api/auth/verify-email`, {
          token,
        });

        setStatus("Email verified! Redirecting to login…");
        redirectTimeoutRef.current = setTimeout(
          () => navigate("/login", { replace: true }),
          1500
        );
      } catch (e) {
        if (cancelled) return;
        const msg =
          e?.response?.data?.message ||
          (axios.isCancel(e)
            ? "Request canceled."
            : "Verification failed or expired.");
        setStatus(msg);
      }
    })();

    return () => {
      // Don't abort the request here; just stop updating state
      cancelled = true;
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, [navigate, token, loginUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-xl shadow text-center">
        <p className="mb-4 text-white">{status}</p>
        {status.startsWith("Email verified") ? (
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="border px-3 py-1 rounded text-white"
          >
            Go to Login
          </button>
        ) : (
          <Link className="underline text-white" to="/login">
            Back to Login
          </Link>
        )}
      </div>
    </div>
  );
}
