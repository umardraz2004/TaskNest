import { useAuth } from "../store/AuthContext";
const Home = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="flex justify-center items-center h-[38.8rem]">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-pop">
          Welcome 
          {isAuthenticated && user && (
            <span className="text-yellow-500"> {user.fullName}</span>
          )}
          {" "}to TaskNest
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-roboto">
          Organize your tasks efficiently and stay productive with your personal
          task manager,
          {isAuthenticated
            ? " your dashboard is ready!"
            : " You have to register yourself before start using our app or login if you already have an account."}
        </p>
      </div>
    </div>
  );
};

export default Home;
