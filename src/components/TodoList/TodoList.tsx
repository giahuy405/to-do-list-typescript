import React, { useEffect, useMemo, useState } from 'react'
import styles from './todoList.module.scss'
import TaskInput from '../TaskInput/TaskInput'
import TaskList from '../TaskList/TaskList'
import { Todo } from '../../@types/todo.types'
import Title from '../Title/Title'
interface HandleNewTodo {
  (todo: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewtodo: HandleNewTodo) => {
  const todolistJSON = localStorage.getItem('todolist')
  const todolistObject: Todo[] = JSON.parse(todolistJSON || '[]')
  const localTodoList = handleNewtodo(todolistObject)
  localStorage.setItem('todolist', JSON.stringify(localTodoList))
}

const TodoList = () => {
  const [todolist, setTodolist] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const todolistDone = todolist.filter((item) => item.done)
  const todolistNotDone = todolist.filter((item) => !item.done)
  const addTodo = (name: string) => {
    const handler = (todoObject: Todo[]) => {
      return [...todoObject, newtodo]
    }

    const newtodo = {
      id: new Date().toISOString(),
      name,
      done: false
    }
    setTodolist((prev) => [...prev, newtodo])
    syncReactToLocal(handler)
  }
  const handleCheck = (id: string, done: boolean) => {
    setTodolist((prev) =>
      prev.map((item) => {
        if (item.id === id) return { ...item, done }
        return item
      })
    )
  }
  const startEdit = (id: string) => {
    const foundItem = todolist.find((item) => item.id === id)
    foundItem && setCurrentTodo(foundItem)
  }
  const editTask = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return prev
    })
  }
  const finishEdit = () => {
    const handler = (todolistObject: Todo[]) =>
      todolistObject.map((item) => {
        if (currentTodo && currentTodo.id === item.id) {
          return currentTodo
        }
        return item
      })
    setTodolist(handler)

    syncReactToLocal(handler)
    setCurrentTodo(null)
    editTask('')
  }
  const deleteTask = (id: string) => {
    const handler = (todolistObject: Todo[]) => todolistObject.filter((item) => item.id !== id)

    setTodolist(handler)

    // const todolistJSON = localStorage.getItem('todolist')
    // const todolistObject: Todo[] = JSON.parse(todolistJSON || '[]')
    // const newTodolist = todolistObject.filter((item) => item.id !== id)
    // localStorage.setItem('todolist', JSON.stringify(newTodolist))

    syncReactToLocal(handler)
    setCurrentTodo(null)
    editTask('')
  }

  useEffect(() => {
    const todolistJSON = localStorage.getItem('todolist')
    const todolistObject: Todo[] = JSON.parse(todolistJSON || '[]')
    setTodolist(todolistObject)
  }, [])
  const address = useMemo(() => {
    return {
      street: '10 tran hugn dao'
    }
  },[])
  return (
    <div className={styles.box}>
      <Title address={address} />
      <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTask={editTask} finishEdit={finishEdit} />
      <TaskList todolist={todolistNotDone} handleCheck={handleCheck} startEdit={startEdit} deleteTask={deleteTask} />
      <TaskList
        taskListDone
        todolist={todolistDone}
        handleCheck={handleCheck}
        startEdit={startEdit}
        deleteTask={deleteTask}
      />
    </div>
  )
}

export default TodoList
