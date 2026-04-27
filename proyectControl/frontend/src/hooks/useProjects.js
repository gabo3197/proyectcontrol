import { useState, useCallback } from 'react';
import { projectsService } from '../services/projects';
import { useAppStore } from '../store';

export const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setProjects, setSelectedProject } = useAppStore();

  const fetchProjects = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectsService.getAll(params);
      setProjects(res.data, res.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setProjects]);

  const fetchProject = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectsService.getById(id);
      setSelectedProject(res.data);
      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setSelectedProject]);

  const createProject = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectsService.create(data);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchProjects, fetchProject, createProject, loading, error };
};
