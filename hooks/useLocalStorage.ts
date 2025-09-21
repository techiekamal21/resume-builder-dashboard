import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the stored value to reduce localStorage writes
  const debouncedValue = useDebounce(storedValue, 500);

  // Load initial value from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsedValue = JSON.parse(item);
          setStoredValue(parsedValue);
        }
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setError(`Failed to load saved data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // Save to localStorage when debounced value changes
  useEffect(() => {
    if (!isLoading) {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(debouncedValue));
          setError(null);
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
        setError(`Failed to save data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }, [key, debouncedValue, isLoading]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setError(null);
    } catch (error) {
      console.error(`Error updating value for key "${key}":`, error);
      setError(`Failed to update data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [key, storedValue]);

  const clearStorage = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);
        setError(null);
      }
    } catch (error) {
      console.error(`Error clearing localStorage key "${key}":`, error);
      setError(`Failed to clear data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    clearStorage,
    isLoading,
    error,
  };
}