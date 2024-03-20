import { message } from "antd";
import { useEffect, useState } from "react";

export const useIndexedDB: any = () => {
  const [db, setDb] = useState<any>(null);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let request = indexedDB.open("todoDB", 1);

    request.onerror = (e) => {
      console.log("Error opening db", e);
    };

    request.onsuccess = (e: any) => {
      setDb(e.target.result);
    };

    request.onupgradeneeded = (e: any) => {
      let db = e.target.result;
      let store = db.createObjectStore("todos", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("task", "task", { unique: false });
    };

    return () => {
      // clear();
    };
  }, []);

  function addTodo(obj: any) {
    const transaction = db.transaction(["todos"], "readwrite");
    const store = transaction.objectStore("todos");
    const { value, words, previewImage } = obj;
    let request = store.add({ value, words, previewImage });

    request.onsuccess = () => {
      message.success("保存成功");
      loadTodos(); // 重新加载待办事项列表
    };
  }

  function loadTodos() {
    let transaction = db.transaction(["todos"], "readonly");
    let store = transaction.objectStore("todos");
    let request = store.openCursor();
    let todos: any = [];

    request.onsuccess = (e: any) => {
      let cursor = e.target.result;
      if (cursor) {
        todos.push(cursor.value);
        cursor.continue();
      } else {
        setTodos(todos);
      }
    };
  }
  function clear() {
    let transaction = db.transaction(["todos"], "readwrite");
    let store = transaction.objectStore("todos");
    let request = store.clear();

    request.onsuccess = () => {
      loadTodos();
      console.log("All data cleared");
    };
  }

  function deleteById(id: string) {
    let transaction = db.transaction(["todos"], "readwrite");
    let store = transaction.objectStore("todos");
    let request = store.delete(id);

    request.onsuccess = () => {
      loadTodos();
      console.log("Data deleted");
    };
  }

  return {
    addTodo,
    loadTodos,
    todos,
    clear,
    db,
    deleteById,
  };
};
