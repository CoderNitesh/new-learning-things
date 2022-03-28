import React from 'react';
import { Todo } from '../model';
import SingleTodo from './Todo';

import './TodoList.scss'

interface Props{
    list: Todo[],
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const TodoList: React.FC<Props> = ({list, setTodoList}) => {
  return (
      <div className='todolist-conatainer'>
        {
            list.map(todo => {
                return (
                    <SingleTodo 
                        key={todo.id} 
                        info={todo} 
                        list={list}
                        setTodoList={setTodoList} 
                    />
                )
            })
        }
      </div>
  )
};

export default TodoList;
