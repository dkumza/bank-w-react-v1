/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export const EditUser = ({
   user,
   users,
   updateUsers,
   setUpdateUsers,
   edit,
   setEdit,
}) => {
   const [resize, setResize] = useState(false); // resize edit wrapper
   const [balance, setBalance] = useState(0);

   const handleEdit = () => {
      setResize((editing) => !resize);
   };

   useEffect(() => {
      if (null === edit) {
         return;
      }
      setBalance(edit.balance);
   }, [edit]);

   const save = () => {
      const updatedBalance = user.balance + balance;

      setUpdateUsers({ ...edit, balance: updatedBalance, id: user.id });
      setEdit(null);
   };

   // const handleAddBalance = () => {
   //    user.balance += balance;
   // };

   return (
      <div>
         <li
            className={resize ? "new-user-big" : "new-user-small"}
            key={user.id}
         >
            <div
               className={
                  resize
                     ? "flex flex-row-reverse items-center gap-4 justify-between w-full"
                     : "left-wrap flex gap-4 justify-center items-center "
               }
            >
               <div className="balance w-14">${user.balance}</div>
               <div className="full-name ">
                  <h1 className="italic text-sm text-gray-500">
                     Account Owner
                  </h1>
                  <p className="uppercase">
                     {user.name} {user.lastName}
                  </p>
               </div>
            </div>
            {resize ? (
               <input
                  type="number"
                  className="w-1/4 my-4"
                  placeholder="Edit Balance"
                  value={balance}
                  onChange={(e) => setBalance(parseInt(e.target.value))}
               />
            ) : null}
            <div
               className={resize ? "right-wrap flex flex-row gap-4 w-full" : ""}
            >
               <button className={resize ? "hidden" : "btn-second btn-sec-1"}>
                  <span className="btn-span" onClick={handleEdit}>
                     EDIT
                  </span>
               </button>
               {resize ? (
                  <div className="edit flex justify-between min-w-max gap-4 w-full">
                     <div className="btn-edit-wrap flex gap-4">
                        <button
                           className="btn-second btn-sec-1"
                           onClick={() => {
                              save();
                           }}
                        >
                           Add
                        </button>
                        <button className="btn-second btn-sec-2">Remove</button>
                     </div>
                     <div className="btn-edit-wrap flex gap-4 justify-center">
                        <button className="btn-second">Delete Acc</button>
                        <button
                           className="btn-second btn-sec-3"
                           onClick={handleEdit}
                        >
                           Close
                        </button>
                     </div>
                  </div>
               ) : null}
            </div>
         </li>
      </div>
   );
};
