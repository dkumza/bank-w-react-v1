import { useState, useEffect } from "react";
import "./App.css";

import { read, store, destroy, update } from "../ls";
import { Create } from "./components/Create";
import { Store } from "./components/Store";

const KEY = "users";

function App() {
   const [users, setUsers] = useState([]);
   const [create, setCreate] = useState(null);
   const [edit, setEdit] = useState(null);
   const [updateUsers, setUpdateUsers] = useState(null);

   useEffect(() => {
      // imitate fetch from server
      setTimeout(() => {
         setUsers(read(KEY));
      }, 300);
   }, []);

   useEffect(() => {
      if (null === create) {
         return;
      }
      const id = store(KEY, create);
      setUsers((user) => [...user, { ...create, id }]);
   }, [create]);

   useEffect(() => {
      if (null === updateUsers) return;

      // console.log(updateUsers);
      // setUsers((prevUsers) => {
      //    const updatedUsers = prevUsers.map((user) =>
      //       user.id === updateUsers.id
      //          ? { ...user, balance: updateUsers.balance }
      //          : user
      //    );
      //    return updatedUsers;
      // });

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
      <div className="flex gap-4">
         <Create setCreate={setCreate} />
         <Store
            users={users}
            updateUsers={updateUsers}
            setUpdateUsers={setUpdateUsers}
            edit={edit}
            setEdit={setEdit}
         />
      </div>
   );
}

export default App;
