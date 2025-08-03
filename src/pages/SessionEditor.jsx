import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../api/api';

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [jsonUrl, setJsonUrl] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [timer, setTimer] = useState(null);

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
    setTimer(interval);
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
    <div className="container mt-4">
      <h2>Session Editor</h2>
      <div className="mb-3">
        <label>Title</label>
        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Tags (comma separated)</label>
        <input className="form-control" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>JSON URL</label>
        <input className="form-control" value={jsonUrl} onChange={(e) => setJsonUrl(e.target.value)} />
      </div>
      <div className="mb-3">
        <button className="btn btn-success" onClick={handlePublish}>Publish</button>
        {lastSaved && <small className="text-muted ms-3">Auto-saved at {lastSaved}</small>}
      </div>
    </div>
  );
};

export default SessionEditor;
