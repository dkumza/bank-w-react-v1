import { useState, useEffect } from "react";

import { read, store, destroy, update } from "../ls";
import { Create } from "./components/Create";
import { Store } from "./components/Store";
import Messages from "./components/Messages";
import { v4 as uuidv4 } from "uuid";

const KEY = "users";

function App() {
  const [users, setUsers] = useState([]);
  const [create, setCreate] = useState(null);
  const [remove, setRemove] = useState(null); // delete
  const [clear, setClear] = useState(null); // destroy
  const [edit, setEdit] = useState(null);
  const [updateUsers, setUpdateUsers] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // imitate fetch from server
    setUsers(read(KEY));
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
    addMessage("success", "Account has been created");
  }, [create]);

  useEffect(() => {
    if (null === clear) {
      return;
    }
    destroy(KEY, clear.id);
    setUsers((u) => u.filter((user) => user.id !== clear.id));
    setClear(null);
    setRemove(null);
    addMessage("success", "Account has been deleted");
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
    addMessage("success", "Balance updated");
  }, [updateUsers]);

  const addMessage = (type, text) => {
    const id = uuidv4();
    setMessages((m) => [{ id, type, text }, ...m]);
    setTimeout(() => {
      setMessages((m) => m.filter((message) => message.id !== id));
    }, 3000);
  };

  const removeMessage = (id) => {
    setMessages((m) => m.filter((message) => message.id !== id));
  };

  return (
    <div className="flex gap-4 lg:flex-row flex-col justify-center ">
      <Create setCreate={setCreate} addMessage={addMessage} />
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
      <Messages messages={messages} removeMessage={removeMessage} />
    </div>
  );
}

export default App;
