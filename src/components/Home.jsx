import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { useEffect } from 'react';
import Filter from './Filter';
import Pagination from "@mui/material/Pagination";

import { addToTeam } from '../features/Team/team';
import { UserDetailsbyFilter } from '../features/User/UserSlice';
const Home = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [Cpage, setPage] = useState(1);
  const userSlice = useSelector((state) => state.userSlice.userData);

  useEffect(() => {

    setUsers(userSlice);

  }
    , [userSlice, Cpage]);
  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(UserDetailsbyFilter({ url: `page=${value}` }));
  };


  return (
    <>
      <Filter />

      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">

        {users && Array.isArray(users) && users.map((user, i) => (
          <div key={i} className="flex flex-col items-center justify-center rounded-md border p-4 mb-4">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mb-4"
            />
            <div className="text-center">
              <h1 className="text-lg font-semibold">{`${user.first_name} ${user.last_name}`}</h1>
              <p className="text-sm text-gray-600">Email: {user.email}</p><br />
              <p className="text-sm text-gray-600">Gender: {user.gender}</p>
              <div className="mt-2">
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-900">
                  {user.domain}
                </span>
              </div>
              <button
                type="button"
                onClick={() => { dispatch(addToTeam(user)) }}
                className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
              >
                Add to Team
              </button>
            </div>
          </div>
        ))}

      </div>
      <div className="text text-white flex justify-center items-center py-6  ">
        <Pagination
          size="large"
          variant="outlined"
          color="primary"
          className=""
          count={Math.ceil(1000 / 20)}
          page={Cpage}
          onChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default Home