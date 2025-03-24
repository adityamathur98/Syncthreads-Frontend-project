import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("token");
    navigate("/api/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/api/dashboard">
        <img
          className="w-18"
          src="https://img.freepik.com/free-vector/gradient-quill-pen-design-template_23-2149837194.jpg?t=st=1742839138~exp=1742842738~hmac=b383b096afb819f2457f4630105dead42d06ce9fdd8cfb48ab71ddf850bcd38f&w=826"
          alt="website logo"
        />
      </Link>

      <button
        className="font-roboto font-semibold text-sm px-4 py-2 text-white bg-blue-700 rounded cursor-pointer"
        onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
