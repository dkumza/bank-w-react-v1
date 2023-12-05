/* eslint-disable react/prop-types */
import { useState } from "react";

export const Create = ({ setCreate, addMessage, messages, removeMessage }) => {
   const [name, setName] = useState("");
   const [lastName, setLastName] = useState("");

   const add = () => {
      if (name === "" || lastName === "") {
         addMessage("danger", "Please fill data first");

         return;
      }
      setCreate({
         name,
         lastName,
         balance: 0,
      });

      setName("");
      setLastName("");
   };

   return (
      <div className="create-wrap">
         <div className="create">
            <div className="create-title mb-4 text-center text-3xl text-gray-700">
               Please Fill Data
            </div>
            <form
               className="flex flex-col gap-4"
               onSubmit={(e) => e.preventDefault(e)}
            >
               <input
                  className=""
                  type="text"
                  placeholder="First Name"
                  //   required
                  value={name}
                  onChange={(e) => {
                     setName(e.target.value);
                  }}
               />
               <input
                  className=""
                  type="text"
                  placeholder="Last Name"
                  //   required
                  value={lastName}
                  onChange={(e) => {
                     setLastName(e.target.value);
                  }}
               />
               <div className="btn-wrap flex justify-end">
                  <button
                     className="btn-primary"
                     onClick={() => {
                        add();
                        // sortUsers(users);
                     }}
                  >
                     Add Account
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};
