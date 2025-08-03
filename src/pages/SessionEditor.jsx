import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [jsonUrl, setJsonUrl] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  const fetchSession = async () => {
    if (!id) return;
    const res = await API.get(`/my-sessions/${id}`);
    setTitle(res.data.title || '');
    setTags(res.data.tags?.join(',') || '');
    setJsonUrl(res.data.json_file_url || '');
  };

  useEffect(() => {
    fetchSession();
  }, [id]);

  const autoSave = useCallback(async () => {
    try {
      const payload = {
        id,
        title,
        tags: tags.split(',').map(tag => tag.trim()),
        json_file_url: jsonUrl
      };
      const res = await API.post('/my-sessions/save-draft', payload);
      setLastSaved(new Date().toLocaleTimeString());
      if (!id) navigate(`/editor/${res.data._id}`);
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  }, [id, title, tags, jsonUrl]);

  useEffect(() => {
    const timeout = setTimeout(autoSave, 5000);
    const interval = setInterval(autoSave, 30000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [autoSave]);

  const handlePublish = async () => {
    try {
      await autoSave();
      await API.post('/my-sessions/publish', { id });
      alert('Session published!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to publish');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Session Editor</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">JSON File URL</label>
        <input
          type="text"
          value={jsonUrl}
          onChange={(e) => setJsonUrl(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePublish}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Publish
        </button>
        {lastSaved && (
          <span className="text-sm text-gray-500">Auto-saved at {lastSaved}</span>
        )}
      </div>
    </div>
  );
};

export default SessionEditor;
