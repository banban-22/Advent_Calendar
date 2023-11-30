import { useState, useEffect } from 'react';

const AdventCalendar = () => {
  const [numbers, setNumbers] = useState([]);
  const storedClickedNumbers = localStorage.getItem('clickedNumbers');
  const initialClickedNumbers = isValidJSONString(storedClickedNumbers)
    ? JSON.parse(storedClickedNumbers)
    : [];
  const [clickedNumbers, setClickedNumbers] = useState(initialClickedNumbers);

  useEffect(() => {
    const generateNumbers = () => {
      const numberArray = Array.from({ length: 25 }, (_, index) => index + 1);
      shuffleArray(numberArray);
      setNumbers(numberArray);
    };
    generateNumbers();
  }, []);

  useEffect(() => {
    localStorage.setItem('clickedNumbers', JSON.stringify(clickedNumbers));
  }, [clickedNumbers]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  function isValidJSONString(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  const handleClick = (number) => {
    setClickedNumbers((prev) => [...prev, number]);
  };

  return (
    <div className="absolute z-100 top-40 left-10 text-white w-1/2">
      <div className="grid grid-cols-5 gap-3 w-full">
        {numbers.map((num, i) => (
          <div
            key={i}
            className={`flex border-2 items-center justify-center py-8 hover:opacity-50 rounded-lg font-bold text-xl ${
              clickedNumbers && clickedNumbers.includes(num)
                ? 'bg-slate-300'
                : ''
            }`}
            onClick={() => handleClick(num)}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdventCalendar;
