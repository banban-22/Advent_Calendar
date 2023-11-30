import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CURRENT_USER } from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

const Logout = () => {
  const navigate = useNavigate();
  const [logoutMutation] = useMutation(mutation, {
    refetchQueries: [{ CURRENT_USER }],
  });

  const onLogoutClick = async () => {
    try {
      const { data } = await logoutMutation();
      if (data && data.logout) {
        navigate('/login');
      } else {
        console.error('Logout Failed');
      }
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <div>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};
export default Logout;
