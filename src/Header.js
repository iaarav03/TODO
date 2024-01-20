import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="bg-gray-900 p-4">
      <div className="flex flex-row justify-center space-x-20 text-3xl">
        <Link to="/" className="self-end">
          <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
            ToDo-List
            
          </button>
        </Link>
        <Link to="/weather" className="self-end">
          <button className="text-white bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-400 hover:to-pink-400 px-4 py-2 rounded">
            Weather
          </button>
        </Link>
      </div>
    </div>
  );
};

