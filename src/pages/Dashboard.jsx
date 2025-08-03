import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    API.get('/my-sessions')
      .then(res => setSessions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Wellness Sessions</h2>
        <Link
          to="/editor"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          + Create New
        </Link>
      </div>

      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions found. Start by creating a new one.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li
              key={session._id}
              className="flex items-center justify-between bg-white p-4 shadow-sm border rounded-lg"
            >
              <span className="text-lg text-gray-700">{session.title || '(Untitled)'}</span>
              <Link
                to={`/editor/${session._id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
