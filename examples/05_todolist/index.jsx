// @ts-nocheck
import { signal } from "../../src/reactivity"

function newItem(text, identifier = null, done = false) {
  const id = identifier || (new Date()).getTime();
  return { id, text, done };
}

const TodoItem = ({ item, onClick, onClose }) => {
  const doneClass = item.done ? "done" : ""

  return <li className={doneClass} onClick={() => onClick(item.id)}>
    <div>{item.text}</div>
    <div className="delete" onClick={() => onClose(item.id)}>ⓧ</div>
  </li>;
}

const TodoList = ({ items, onItemClick, onItemClose }) => {
  return <ul>
    {() => items().map(item =>
      <TodoItem item={item} onClick={onItemClick} onClose={onItemClose}/>
    )}
  </ul>
}

const App = () => {
  const [items, setItems] = signal([
    newItem("first", 1),
    newItem("completed", 2, true),
    newItem("second", 3)
  ]);

  const deleteItem = (id) => {
    setItems(items().filter(item => item.id !== id))
  }

  const toggleItemCompletion = (id) => {
    setItems(items().map(item => {
      if(item.id === id) {
        return { ...item, done: !item.done }
      }
      return item
    }))
  }

  const onKeyUp = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setItems([newItem(e.target.value), ...items()])
      e.target.value = ""
    }
  }

  return <div>
    <input type="text" onKeyUp={onKeyUp} placeholder="Press enter to create" />
    <TodoList items={items} onItemClick={toggleItemCompletion} onItemClose={deleteItem} />
  </div>
};

document.body.appendChild(App());
