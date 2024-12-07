import { useEffect } from "react";
import { Button } from "@/components/ui/Button.jsx";
import axiosClient from "../axios-client.js";
import { useStateContext } from "@/context/ContextProvider.jsx";

const NotFoundPage = () => {
  const { token, setUser, setToken, notification, setNotification } =
    useStateContext();

  useEffect(() => {
    if (!token) {
      return;
    }

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      setNotification("Logout............");
    });
  }, [setNotification, setToken, setUser, token]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 dark:text-red-400">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Button
          className="mt-6"
          onClick={() => (window.location.href = "/login")}
        >
          Go Back Login
        </Button>
      </div>
      {notification && (
        <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default NotFoundPage;
