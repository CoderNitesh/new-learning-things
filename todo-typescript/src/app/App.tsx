import React, { useState } from 'react';
import './App.scss'


import CreateTodo from '../components/CreateTodo';
import { Todo } from '../model';
import TodoList from '../components/TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>(() => []);

  const handleAdd: (e: React.FormEvent) => void = (e) => {
    e.preventDefault();

    if(todo){
      setTodoList((prevState: Todo[]) => [{id: Date.now()+'', todo, isDone: false}, ...prevState])
      setTodo(() => '');
    }
  }

  return (
    <div className='taskify-app'>
      <header className='taskify-app-heading'>
        <h1 className='taskify-app-heading-text'>Taskify</h1>
        <div className="taskify-app-search">
          <CreateTodo
            todo={todo}
            setTodo={setTodo}
            addTodo = {handleAdd}
          />
        </div>
      </header>
        <TodoList 
          list={todoList} 
          setTodoList={setTodoList}
        />
    </div>
  ) 
};

export default App;

