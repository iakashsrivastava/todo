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
        const todoList = await get();
        setTodoList(todoList);
    };

    return (
        <div className={styles.mainWrapper}>
        {todoList.map(todo =>
            <Todo key={todo.id} todo={todo} />
        )}
        </div>
    )
}
