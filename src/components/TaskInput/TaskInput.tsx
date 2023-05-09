import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.types'
import connect from '../../HOC/connect'
interface Props {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTask: (name: string) => void
  finishEdit: () => void
}
const TaskInput = (props: Props) => {
  const {addTodo,currentTodo,editTask,finishEdit} = props;
  const [name,setName] = useState<string>('');

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    name && addTodo(name);
    currentTodo && finishEdit();
     
    setName('')
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = event.target;
    currentTodo ?  editTask(value) :  setName(value)
  }
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter your task ✎'
          value={currentTodo ? currentTodo.name : name}
          onChange={handleChange}
        />
        <button type='submit'>{currentTodo ? 'EDIT' : 'ADD'}</button>
      </form>
    </div>
  )
}

export default TaskInput

// TaskInput.propTypes ={
//   addTodo: PropTypes.func.isRequired,
//   editTask: PropTypes.func.isRequired,
//   finishEdit: PropTypes.func.isRequired,
//   currentTodo:PropTypes.oneOf([PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     done: PropTypes.bool.isRequired,
    
//   }), PropTypes.])
// }