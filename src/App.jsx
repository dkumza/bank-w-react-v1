import { useState, useEffect } from "react";
import "./App.css";

import { read, store, destroy, update } from "../ls";
import { Create } from "./components/Create";
import { Store } from "./components/Store";

const KEY = "users";

function App() {
   const [users, setUsers] = useState([]);
   const [create, setCreate] = useState(null);

   useEffect(() => {
      // imitate fetch from server
      setTimeout(() => {
         setUsers(read(KEY));
      }, 300);
   }, []);

   useEffect(() => {
      console.log(create);
      if (null === create) {
         return;
      }
      const id = store(KEY, create);
      setUsers((user) => [...user, { ...create, id }]);
   }, [create]);

   return (
      <div className="flex gap-4">
         <Create setCreate={setCreate} />
         <Store users={users} />
      </div>
   );
}

export default App;
