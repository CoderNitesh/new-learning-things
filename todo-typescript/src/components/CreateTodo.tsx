import React, { useRef } from 'react';
import './CreateTodo.scss'

interface Props{
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e:React.FormEvent) => void
}

const CreateTodo: React.FC<Props>= ({todo, setTodo, addTodo}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  const onSubmit= (e: React.FormEvent) => {
    addTodo(e);
    inputRef.current?.blur();
  }

  return (
    <form className='search-container' onSubmit={onSubmit}> 
      <input 
        ref={inputRef}
        className='search-container-input' 
        type='text' 
        placeholder='Enter The Task' 
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className='search-container-button' type='submit'>Go</button>
    </form>
  )
};

export default CreateTodo;
