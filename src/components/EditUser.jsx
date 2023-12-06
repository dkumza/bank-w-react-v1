import { useState, useEffect } from "react";

export const EditUser = ({
  user,
  setUpdateUsers,
  edit,
  setEdit,
  setRemove,
  setClear,
}) => {
  const [resize, setResize] = useState(false); // resize edit wrapper
  const [balance, setBalance] = useState(0);

  const handleEdit = () => {
    setResize(() => !resize);
  };

  useEffect(() => {
    if (null === edit) {
      return;
    }
    setBalance(edit.balance);
  }, [edit]);

  const save = (updatedBalance) => {
    setUpdateUsers({ ...edit, balance: updatedBalance, id: user.id });
    setEdit(null);
  };

  const handleAddBalance = () => {
    const updatedBalance = user.balance + balance;
    save(updatedBalance);
  };

  const handleRemoveBalance = () => {
    const updatedBalance = user.balance - balance;
    save(updatedBalance);
  };

  return (
    <div>
      <li className={resize ? "new-user-big" : "new-user-small"} key={user.id}>
        <div
          className={
            resize
              ? "flex flex-row-reverse items-center gap-4 justify-between w-full"
              : "left-wrap flex gap-4 justify-between items-center w-full mr-4"
          }
        >
          <div
            className={resize ? "full-name text-end" : "full-name text-start"}
          >
            <h1 className="italic text-sm text-gray-500 ">Account Owner</h1>
            <p className="uppercase">
              {user.name} {user.lastName}
            </p>
          </div>
          <div
            className={
              user.balance < 0
                ? "text-rose-600 text-4xl"
                : "text-lime-600 text-4xl"
            }
          >
            $ {user.balance}
          </div>
        </div>
        {resize ? (
          <input
            type="number"
            className="w-56 my-4"
            placeholder="Edit Balance"
            min={0}
            value={balance}
            onChange={(e) => setBalance(parseInt(e.target.value))}
          />
        ) : null}
        <div className={resize ? "right-wrap flex flex-row gap-4 w-full" : ""}>
          <button className={resize ? "hidden" : "btn-second btn-sec-1"}>
            <span
              className="btn-span"
              onClick={() => {
                handleEdit();
              }}
            >
              EDIT
            </span>
          </button>
          {resize ? (
            <div className="edit flex justify-between min-w-max gap-4 w-full">
              <div className="btn-edit-wrap flex gap-4">
                <button
                  className="btn-second btn-sec-1"
                  onClick={() => {
                    handleAddBalance();
                  }}
                >
                  Add $
                </button>
                <button
                  className="btn-second btn-sec-2"
                  onClick={handleRemoveBalance}
                >
                  Remove $
                </button>
              </div>
              <div className="btn-edit-wrap flex gap-4 justify-center">
                <button
                  className="btn-second"
                  onClick={() => {
                    setRemove(user);
                    setClear(user);
                    setEdit(null);
                  }}
                >
                  Delete Acc
                </button>
                <button className="btn-second btn-sec-3" onClick={handleEdit}>
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
