import {
  useEffect,
  useState,
} from 'react';

import { validateCredentials } from './features/auth/api';
import {
  ChatPage,
  LoginPage,
} from './pages';
import { getCookie } from './shared/api/lib';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleLogin() {
    setIsAuthenticated(true);
  }

  useEffect(() => {
    let isActive = true;

    async function checkAuth() {
      const idInstance = getCookie("idInstance");
      const apiTokenInstance = getCookie("apiTokenInstance");

      if (!idInstance || !apiTokenInstance) {
        if (isActive) {
          setIsLoading(false);
        }

        return;
      }

      try {
        const isValid = await validateCredentials({
          idInstance,
          apiTokenInstance,
        });

        if (isActive) {
          setIsAuthenticated(isValid);
        }
      } catch (error) {
        console.error("AUTH CHECK ERROR:", error);

        if (isActive) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isActive = false;
    };
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return isAuthenticated ? <ChatPage /> : <LoginPage onLogin={handleLogin} />;
}

export default App;
