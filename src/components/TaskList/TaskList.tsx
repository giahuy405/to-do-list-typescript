import React from 'react'
import styles from './taskList.module.scss'
import { Todo } from '../../@types/todo.types'

interface Props {
  taskListDone?:boolean
  todolist: Todo[]
  handleCheck: (id: string, done: boolean) => void
  startEdit: (id: string) => void
  deleteTask: (id: string) => void
}

const TaskList = (props: Props) => {
  const {taskListDone,todolist,handleCheck,startEdit,deleteTask} = props
  return (
    <div>
      <h3 className={styles.title}>{taskListDone? 'Done' :'Not done'}</h3>
      {/* Tassk list */}
      <div className={styles.tasks}>
        {todolist.map(item=>
                <div className={styles.task} key={item.id}>
                <div className={styles.checkBox}>
                  <input type='checkbox' checked={item.done} onChange={event=>handleCheck(item.id,event.target.checked)}  />
                  <span>{item.name}</span>
                </div>
                <div className={styles.taskAction}>
                  <button 
                  onClick={()=>startEdit(item.id)}
                  className={styles.btnAction}>✏️</button>
                  <button
                  onClick={()=>deleteTask(item.id)}
                  className={styles.btnAction}>🗑</button>
                </div>
              </div>
          )}
  
      </div>
    </div>
  )
}

export default TaskList
