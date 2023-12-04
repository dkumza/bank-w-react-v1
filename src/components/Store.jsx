/* eslint-disable no-unused-vars */
import { useState } from "react";
import { EditUser } from "./EditUser";

/* eslint-disable react/prop-types */
export const Store = ({ users }) => {
   return (
      <div className="w-full p-12 border rounded-lg shadow">
         <h1 className="text-3xl text-gray-700 text-center mb-2">
            All Accounts
         </h1>
         <div className="store-wrap">
            {users === null && <p className="">Loading...</p>}
            {users !== null && !users.length && (
               <p className="m-2  text-base">Fill Data First</p>
            )}
            {users.map((user) => (
               <EditUser key={user.id} user={user} />
            ))}
         </div>
      </div>
   );
};
