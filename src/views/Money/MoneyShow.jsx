import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { Button } from "@/components/ui/Button.jsx";
import { Card } from "@/components/ui/Card.jsx";
import Loader from "@/components/ui/Loader.jsx";
import { Textarea } from "@/components/ui/Textarea.jsx";
import { useStateContext } from "@/context/ContextProvider.jsx";

export default function MoneyShow() {
  const { user } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!["owner", "money"].some((s) => user.role.includes(s))) {
      navigate("/404");
    }
  }, [user, navigate]);
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEntry();
  }, [id]);

  const fetchEntry = () => {
    setLoading(true);
    axiosClient
      .get(`/money-management/${id}`)
      .then(({ data }) => {
        setEntry(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Error fetching data", err);
      });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md mb-4 flex flex-col items-start">
        <div className="flex space-x-4 mb-4">
          <Link to="deposite">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Deposit
            </Button>
          </Link>
          <Link to="withdraw">
            <Button className="bg-green-500 text-white hover:bg-green-600">
              Withdraw
            </Button>
          </Link>
          <Link to="remaining">
            <Button className="bg-gray-500 text-white hover:bg-gray-600">
              Remaining
            </Button>
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border  rounded "
        />
      </div>
      <Card className="w-full max-w-md p-8 ">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Money Management Details
        </h1>
        {loading && <Loader />}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}
        {entry && !loading && (
          <div className="space-y-4">
            <div>
              <strong>Title:</strong> {entry.title}
            </div>
            <div>
              <strong>Give Money:</strong> {entry.givemoney}
            </div>
            <div>
              <strong>Date and Time:</strong> {entry.dateTime}
            </div>
            <div>
              <strong>Description:</strong>
              <Textarea
                value={entry.description}
                readOnly
                className="w-full p-2 border mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => navigate(`/money-management/${entry.id}/edit`)}
              >
                Edit
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
