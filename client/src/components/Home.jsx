import { Link } from 'react-router-dom';

import Christmas from '../image/Christmas.svg';

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-400 from-20% via-green-600 via-60% to-green-800">
        <div className="flex items-center justify-center text-center">
          <div className="flex flex-col items-center text-center justify-center gap-5">
            <h1 className="text-6xl text-white">Wish You a Merry Xmas!!</h1>
            <Link to="/login">
              <button className="bg-white/80 border-green py-4 px-5 rounded-xl mt-5 shadow-green-800 shadow-inner backdrop-blur button drop-shadow-2xl">
                Sign Up
              </button>
            </Link>
          </div>
          <img className="object-fit" src={Christmas} alt="" />
        </div>
      </div>
    </>
  );
};
export default Home;
