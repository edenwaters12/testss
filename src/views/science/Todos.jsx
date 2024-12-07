import { useState, useEffect, useMemo } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import axiosClient from "../../axios-client.js";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { useStateContext } from "@/context/ContextProvider.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { AlertDialogDemo } from "@/components/AlertDialogDemo.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Pen, Trash2 } from "lucide-react";

export default function TodosPage() {
  const { user, setNotification } = useStateContext();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!["owner", "science"].some((s) => user.role.includes(s))) {
      navigate("/404");
    }
  }, [user, navigate]);

  const getTodo = () => {
    if (!hasMore || loading) return;

    setLoading(true);
    axiosClient
      .get(
        `/todos?page=${page}${
          category !== "all" ? `&category=${category}` : ""
        }`
      )
      .then((response) => {
        setTodos((prevTodos) => [
          ...prevTodos,
          ...response.data.data.filter(
            (newTodo) =>
              !prevTodos.some((prevTodo) => prevTodo.id === newTodo.id)
          ),
        ]);

        setTotal(response.data.total);
        if (response.data.current_page == response.data.last_page) {
          setHasMore(false);
        }
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTodo();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        getTodo();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const onDeleteClick = (todo) => {
    setSelectedTodo(todo);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTodo) {
      axiosClient
        .delete(`/todos/${selectedTodo.id}`)
        .then(() => {
          setNotification("deleted successfully");
          setTodos([]);
          setPage(1);
          setHasMore(true);
          getTodo();
        })
        .catch((e) => {
          setNotification("Error deleting todo", e);
        });
    }
    setIsAlertOpen(false);
    setSelectedTodo(null);
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("today_date", {
        header: "Date",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => info.getValue().toUpperCase(),
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("topic", {
        header: "Topic",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) =>
          info.getValue()
            ? info.getValue().length > 25
              ? `${info.getValue().substring(0, 25)}...`
              : info.getValue()
            : " ",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <>
            <div className="flex flex-wrap gap-2 items-center justify-around">
              <Link
                to={`/science/${row.original.id}`}
                className="text-blue-500 hover:underline"
              >
                <Button
                  className="ml-4 hover:bg-blue-600"
                  onClick={() => onDeleteClick(row.original)}
                >
                  <Pen />
                </Button>
              </Link>
              {["owner", "science-d"].some((s) => user.role.includes(s)) && (
                <Button
                  className="ml-4  hover:bg-red-600"
                  onClick={() => onDeleteClick(row.original)}
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          </>
        ),
      }),
    ],
    [user]
  );

  const filteredTodos = useMemo(() => {
    return todos.filter(
      (todo) =>
        (todo.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (todo.topic?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (todo.description?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        )
    );
  }, [todos, searchQuery]);

  const table = useReactTable({
    data: filteredTodos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => setSearchQuery("")}
        >
          Data Science Lecturers
        </h1>
        <h3>Total : {total}</h3>

        <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto sm:space-x-4">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:order-1 mr-6">
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                setTodos([]);
                setPage(1);
                setHasMore(true);
              }}
              className="mt-1 block w-full"
            >
              <SelectTrigger className="xl:w-[150px]">
                <span>{category || "---select---"}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="lecturer">Lecturer</SelectItem>
                <SelectItem value="public_holidays">Public Holidays</SelectItem>
                <SelectItem value="no_lecturer">No Lecturer</SelectItem>
                <SelectItem value="time_e">Time E</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 sm:order-2 xl:w-[200px]"
          />
          {["owner", "science-c"].some((s) => user.role.includes(s)) && (
            <Button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:order-2 xl:w-[100px]"
              onClick={() => navigate("/science/new")}
            >
              Create
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Card className="overflow-x-auto">
          {loading && todos.length === 0 ? (
            <div className="flex items-center justify-center p-4">
              <Loader />
            </div>
          ) : filteredTodos.length > 0 ? (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="cursor-pointer">
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼 ",
                              desc: " 🔽 ",
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No todos found.
            </div>
          )}
          {loading && hasMore && todos.length != 0 && (
            <div className="flex items-center justify-center p-4">
              <Loader />
            </div>
          )}
        </Card>
        <AlertDialogDemo
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          description="Are you sure you want to delete this todo? This action cannot be undone."
        />
      </div>
    </div>
  );
}
