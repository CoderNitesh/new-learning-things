import React from "react";
import { Todo } from "../model";
import "./Todo.scss";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props {
  info: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  list: Todo[];
}

const SingleTodo: React.FC<Props> = ({ info, list, setTodoList }) => {
  const { id, todo, isDone } = info;

  const handleDone = (id: string) => {
    setTodoList(
      list.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  
  return (
    <form className="todo-form">
      {isDone ? (
        <s className="todo-form-single_todo">{todo}</s>
      ) : (
        <span className="todo-form-single_todo">{todo}</span>
      )}
      <div>
        <span className="icon">
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
