import { useState, useEffect } from "react";

export default function useNotification(duration = 2000) {
  const [notification, setNotification] = useState(null);

  function showNotification({ type = "info", message }) {
    setNotification({ type, message });
  }

  function hideNotification() {
    setNotification(null);
  }

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, duration);

    return () => clearTimeout(timer);
  }, [notification, duration]);

  return {
    notification,
    showNotification,
    hideNotification,
  };
}
