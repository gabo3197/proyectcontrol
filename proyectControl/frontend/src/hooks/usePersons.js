import { useState, useCallback } from "react";
import { personsService } from "../services/persons";
import { useAppStore } from "../store";

export const usePersons = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setPersons } = useAppStore();

  const fetchPersons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await personsService.getAll();
      setPersons(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setPersons]);

  const createPersons = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await personsService.create(data);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchPersons, createPersons, loading, error };
};
