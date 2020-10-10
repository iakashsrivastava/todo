import React, {useEffect, useState} from 'react'

import {Todo} from "./../component/Todo.component.react"
import TodoType from "./../type/Todo.type";
import {get} from "../utilities/Api.helper";
import styles from './../styles/Main.module.css';

export const Main = () => {
    
    const [todoList, setTodoList] = useState<Array<TodoType>>([]);
    
    useEffect(() => {
        getInitialTodoList();
    }, []);
    
    const getInitialTodoList = async () =>{
        // const todoList = await get();
        setTodoList([
            {
              id: "1",
              description: "File 2020 Taxes",
              isComplete: true,
            //   dueDate: "2020-03-10T17:50:44.673Z"
            },
            {
              id: "2",
              description: "Fold laundry",
              isComplete: true,
            //   dueDate: null
            },
            {
              id: "3",
              description: "Call Mom",
              isComplete: false,
            //   dueDate: "2020-06-26T19:00:00.000Z"
            },
            {
              id: "4",
              description: "Walk the dog",
              isComplete: false,
            //   dueDate: null
            },
            {
              id: "5",
              description: "Feed the cat",
              isComplete: false,
            //   dueDate: "2020-06-24T15:45:00.000Z"
            },
            {
              id: "6",
              description: "Run LA marathon",
              isComplete: false,
            //   dueDate: "2021-03-21T13:30:00.000Z"
            }
          ]);
    };

    return (
        <div className={styles.mainWrapper}>
        {todoList.map(todo =>
            <Todo key={todo.id} todo={todo} />
        )}
        </div>
    )
}
