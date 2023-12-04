import { v4 as uuidv4 } from "uuid";

const get = (key) => {
   const value = localStorage.getItem(key);
   if (null === value) {
      return [];
   }
   return JSON.parse(value);
};

const set = (key, value) => {
   localStorage.setItem(key, JSON.stringify(value));
};

export const store = (key, value) => {
   const id = uuidv4();
   value.id = id;
   const items = get(key);
   items.unshift(value);
   set(key, items);
   return id;
};

export const read = (key, id = 0) => {
   const items = get(key);
   if (id) {
      return items.find((item) => item.id === id);
   }
   return items;
};

export const update = (key, id, value) => {
   const items = get(key).map((item) =>
      item.id === id ? { ...item, ...value, id } : item
   );
   set(key, items);
};

export const destroy = (key, id) => {
   const items = get(key).filter((item) => item.id !== id);
   set(key, items);
};
