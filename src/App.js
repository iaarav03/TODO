import React, { Children, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  Router,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Weather from "./Weather";
import { Header } from "./Header";

const Body = () => {
  const [arr, setArr] = useState("");
  const [unique, setUnique] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (arr.trim() === "") {
      setError("Please add an item");
      return;
    }

    setError("");
    setUnique([...unique, arr]);
    setArr("");
  };

  const handleRemove = (itemToRemove) => {
    const updatedUnique = unique.filter((item) => item !== itemToRemove);
    setUnique(updatedUnique);
  };

  const [editIndex, setEditIndex] = useState(-1);
  const [editedItem, setEditedItem] = useState("");

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedItem(unique[index]);
  };

  const handleSaveEdit = (index) => {
    if (editedItem.trim() === "") {
      return;
    }

    const updatedUnique = [...unique];
    updatedUnique[index] = editedItem;
    setUnique(updatedUnique);
    setEditIndex(-1);
    setEditedItem("");
  };

  const addbutton = (e, index) => (
    <div
      className="flex flex-row items-center space-x-2 bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 p-2 rounded-md shadow-md"
      key={e + index}
    >
      {editIndex === index ? (
        <>
          <input
            type="text"
            value={editedItem}
            onChange={(e) => setEditedItem(e.target.value)}
            className="border border-gray-400 px-2 py-1 rounded-md"
          />
          <button
            onClick={() => handleSaveEdit(index)}
            className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditIndex(-1);
              setEditedItem("");
            }}
            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl font-semibold text-gray-800">{e}</h1>
          <button
            onClick={() => handleEdit(index)}
            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Edit
          </button>
          <button
            onClick={() => handleRemove(e)}
            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            Remove
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-6">
      <div className="relative px-4 py-8 bg-gradient-to-r from-green-300 via-teal-300 to-blue-300 mx-4 md:mx-0 shadow-lg rounded-3xl sm:p-8">
        <h1 className="text-3xl mb-4 text-gray-900">To-Do List</h1>
        <div className="flex items-start space-x-2">
          <input
            type="text"
            value={arr}
            placeholder="Enter item"
            onChange={(e) => setArr(e.target.value)}
            className="border border-gray-400 px-2 py-1 rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
          >
            Add
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4 space-y-2">
          {unique.map((item, index) => addbutton(item, index))}
        </div>
      </div>
    </div>
  );
};

const Applayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const main = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/weather",
        element: <Weather />,
      },
    ],
  },
]);

// ...

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={main}>
    <Router />
  </RouterProvider>
);

