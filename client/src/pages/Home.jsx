import { useAuth } from "../store/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-pop">
          Welcome
          {isAuthenticated && user && (
            <span className="text-yellow-400"> {user.fullName}</span>
          )}{" "}
          to <span className="text-blue-500">TaskNest</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 font-roboto leading-relaxed">
          Organize your tasks efficiently and stay productive with your personal
          task manager.
          <br />
          {isAuthenticated ? (
            <span className="text-green-400 font-medium">
              Your dashboard is ready!
            </span>
          ) : (
            <span>
              {" "}
              <span className="text-yellow-300 font-medium">Register now</span>{" "}
              or <span className="text-yellow-300 font-medium">login</span> to
              start organizing your tasks.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Home;
