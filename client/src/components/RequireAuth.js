import React from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../queries/CurrentUser';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const RequireAuth = ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (error || !data?.user) {
    console.log('User not authenticated. Redirecting to login...');
    navigate('/login'); // Redirect to login page
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
