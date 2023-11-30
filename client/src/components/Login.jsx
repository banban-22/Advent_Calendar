import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CgClose } from 'react-icons/cg';
import mutation from '../mutations/Login';
import { CURRENT_USER } from '../queries/CurrentUser';

const Login = ({ user }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [loginMutation] = useMutation(mutation, {
    refetchQueries: [{ CURRENT_USER }],
  });

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data.login) {
        navigate('/dashboard');
      }

      setEmail('');
      setPassword('');
      setIsErrorOpen(false);
    } catch (res) {
      const errors = res.graphQLErrors.map((err) => err.message);
      setErrors(errors);
      setIsErrorOpen(true);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <form action="" className="flex flex-col gap-8">
        {errors.length > 0 && isErrorOpen && (
          <div className="bg-red-500 text-white rounded-lg w-full text-center font-bold py-3">
            {errors.map((err, index) => (
              <div
                className="flex items-center justify-between px-3"
                key={index}
              >
                <p>{err}</p>
                <CgClose onClick={() => setIsErrorOpen(!isErrorOpen)} />
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-4 items-center justify-between">
          <h3 className="text-xl font-bold">Login</h3>
          <label htmlFor="">Email:</label>
          <input
            type="email"
            placeholder="xxx@xxx.com"
            className="py-3 px-5 border-2 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="">Password:</label>
          <input
            type="password"
            placeholder="111111"
            className="py-3 px-5 border-2 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="py-3 px-5 rounded-xl bg-green-300"
          onClick={onSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
