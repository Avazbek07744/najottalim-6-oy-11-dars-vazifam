import React, { useEffect, useState } from 'react';
import Jsonapi from '../axios';

const App = () => {
  const [info, setInfo] = useState([]);
  const [skip, setSkip] = useState(1);
  const [gender, setGender] = useState('');
  const [major, setMajor] = useState('');

  useEffect(() => {
    Jsonapi.get(`/developers?skip=1&limit=10`)
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    Jsonapi.get(`/developers?skip=1&limit=10&gender=${gender}`)
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMore = () => {
    Jsonapi.get(`/developers?skip=${skip + 10}&limit=10`)
      .then((res) => {
        setInfo([...info, ...res.data.data]);
        setSkip(skip + 10);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='text-center'>
        <form onSubmit={handleFilter}>
          <input
            onChange={(e) => setGender(e.target.value)}
            className='border-b-2 border-blue-500 mx-2 outline-none p-3'
            placeholder='Enter gender...'
            type="text"
          />
          <button type='submit' className='mt-10 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 py-3 px-5 text-white rounded-md'>
            Filter
          </button>
        </form>

      <div className='flex flex-wrap gap-4 justify-center max-w-[1400px] mx-auto mt-10'>
        {info.length > 0 && info.map((v) => (
          <div key={v.id} className='text-lg border rounded-md border-blue-500 w-64 p-5 bg-gradient-to-r from-blue-400 to-teal-500 hover:from-orange-500 hover:to-pink-500 text-white'>
            <h3>FullName: {v.fullName}</h3>
            <h3>Age: {v.age}</h3>
            <h3>Gender: {v.gender}</h3>
            <h3>Major: {v.major}</h3>
          </div>
        ))}
      </div>

      <button onClick={handleMore} className='mt-10 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 py-3 px-5 text-white rounded-md'>
        Show more 10
      </button>
    </div>
  );
};

export default App;
