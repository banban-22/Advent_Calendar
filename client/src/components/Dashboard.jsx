import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../queries/CurrentUser';
import AdventCalendar from './AdventCalendar';
import Logout from './Logout';
import Spinner from './Spinner';
import tree from '../image/tree.jpg';

const Dashboard = () => {
  const { loading, error, data, refetch } = useQuery(CURRENT_USER);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.user;

  return (
    <div className="h-screen w-full relative">
      <div className="flex justify-between px-10 py-5 z-10 items-center">
        <h1 className="text-3xl font-bold">AdventCalendar</h1>
        <div>
          {user
            ? user.name
              ? `Welcome, ${user.name}!`
              : `Welcome, ${user.email}!`
            : 'Not logged in'}
        </div>
        <Logout />
      </div>

      <img
        src={tree}
        alt=""
        className="object-cover h-[90%] w-full opacity-80 brightness-50"
      />
      <AdventCalendar />
    </div>
  );
};

export default Dashboard;
