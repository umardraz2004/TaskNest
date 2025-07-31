import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a", // slate-900
              color: "#f8fafc", // slate-50
              fontWeight: 500,
              fontSize: "0.9rem",
              padding: "12px 16px",
              borderRadius: "0.75rem",
              border: "1px solid #1e293b", // slate-800
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e", // green-500
                secondary: "#f8fafc",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444", // red-500
                secondary: "#f8fafc",
              },
            },
          }}
        />
      </main>
    </div>
  );
};

export default Root;
