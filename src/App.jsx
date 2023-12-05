import { useState, useEffect } from "react";
import "./App.css";

import { read, store, destroy, update } from "../ls";
import { Create } from "./components/Create";
import { Store } from "./components/Store";

const KEY = "users";

function App() {
   const [users, setUsers] = useState([]);
   const [create, setCreate] = useState(null);
   const [remove, setRemove] = useState(null); // delete
   const [clear, setClear] = useState(null); // destroy
   const [edit, setEdit] = useState(null);
   const [updateUsers, setUpdateUsers] = useState(null);

   console.log(users);

   useEffect(() => {
      // imitate fetch from server
      // setTimeout(() => {
      setUsers(read(KEY));
      // }, 500);
   }, []);

   const sortUsers = (users) => {
      return [...users].sort((a, b) => a.lastName.localeCompare(b.lastName));
   };
   const handleSortClick = () => {
      const sortedUsers = sortUsers(read(KEY));
      setUsers(sortedUsers);
      localStorage.setItem(KEY, JSON.stringify(sortedUsers));
   };

   useEffect(() => {
      if (null === create) {
         return;
      }
      const id = store(KEY, create);
      setUsers((user) => [{ ...create, id }, ...user]);
   }, [create]);

   useEffect(() => {
      if (null === clear) {
         return;
      }
      destroy(KEY, clear.id);
      setUsers((u) => u.filter((user) => user.id !== clear.id));
      setClear(null);
      setRemove(null);
   }, [clear]);

   useEffect(() => {
      if (null === updateUsers) return;

      update(KEY, updateUsers.id, updateUsers);
      setUsers((u) =>
         u.map((user) =>
            user.id === updateUsers.id
               ? { ...user, balance: updateUsers.balance }
               : user
         )
      );
      setEdit(null);
      setUpdateUsers(null);
   }, [updateUsers]);

   return (
      <div className="flex gap-4 lg:flex-row flex-col justify-center ">
         <Create setCreate={setCreate} />
         <Store
            users={users}
            updateUsers={updateUsers}
            setUpdateUsers={setUpdateUsers}
            edit={edit}
            setEdit={setEdit}
            remove={remove}
            setRemove={setRemove}
            setClear={setClear}
            handleSortClick={handleSortClick}
         />
      </div>
   );
}

export default App;
