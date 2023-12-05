/* eslint-disable no-unused-vars */
import { useState } from "react";
import { EditUser } from "./EditUser";

/* eslint-disable react/prop-types */
export const Store = ({
   users,
   updateUsers,
   setUpdateUsers,
   edit,
   setEdit,
   remove,
   setRemove,
   setClear,
   handleSortClick,
}) => {
   return (
      <div className="w-full p-12 border rounded-lg shadow-xl">
         <div className="info flex justify-between items-center">
            <h1 className="text-3xl text-gray-700 text-center mb-2">
               All Accounts
            </h1>
            {users.length > 1 ? (
               <button
                  className=" rounded-full hover:bg-green-500 hover:text-white h-6 px-4 text-sm"
                  onClick={handleSortClick}
               >
                  A-Z
               </button>
            ) : null}
         </div>
         <div className="store-wrap">
            {users === null && <p className="">Loading...</p>}
            {users !== null && !users.length && (
               <p className="m-2  text-base">Fill Data First</p>
            )}
            {users.map((user) => (
               <EditUser
                  key={user.id}
                  user={user}
                  setUpdateUsers={setUpdateUsers}
                  edit={edit}
                  setEdit={setEdit}
                  remove={remove}
                  setRemove={setRemove}
                  setClear={setClear}
               />
            ))}
         </div>
      </div>
   );
};
