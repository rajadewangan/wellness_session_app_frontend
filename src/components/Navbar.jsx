import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-green-600">Wellness Sessions</Link>
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-green-600">Dashboard</Link>
            <Link to="/editor" className="text-gray-700 hover:text-green-600">New Session</Link>
            <button
              onClick={handleLogout}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="text-gray-700 hover:text-green-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-green-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
