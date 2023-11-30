import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';
import Error from './components/Error';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

// const router = createBrowserRouter([
//   { path: '/', element: <Home /> },
//   { path: '/login', element: <Login /> },
//   { path: '/signup', element: <Signup /> },
//   {
//     path: '/dashboard',
//     element: (
//       <RequireAuth>
//         <Dashboard />
//       </RequireAuth>
//     ),
//   },
//   { path: '*', element: <Error /> },
// ]);

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <RouterProvider router={router} /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
