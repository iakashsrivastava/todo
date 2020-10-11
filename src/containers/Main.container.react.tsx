import React, {useEffect, useState} from 'react'
import {TodoStatusEnum, TodoType, TodoTypeApiUntypedResponse} from "./../type/Todo.type";
import {get, patch} from "../utilities/Api.helper";

import {DATE_MAX_VALUE} from "./../utilities/Todo.constant"
import {Todo} from "./../component/Todo.component.react"
import { isOverDue } from "./../utilities/Date.helper";
import styles from './../styles/Main.module.css';

interface Props {
  setIsSpinnerVisible: (isVisible: boolean) => void
}

export const Main: React.FC<Props> = ({setIsSpinnerVisible}) => {
    
    const [todoList, setTodoList] = useState<Array<TodoType>>([]);
      
    useEffect(() => {
        getInitialTodoList();
    }, []);
    
    const getTodoStatusEnum = (isComplete: boolean, dueDate: string | null): TodoStatusEnum => {
        let status = TodoStatusEnum.Active;
        if(isComplete === true){
          status = TodoStatusEnum.Completed;
        }
        else if(isComplete === false && isOverDue(dueDate)){
          status = TodoStatusEnum.Overdue;
        }
        return status;
    };

    const getInitialTodoList = async (): Promise<void> =>{
        setIsSpinnerVisible(true);
          //  const todoListUntyped = await get();
        const todoListUntyped = [
            {
              id: "1",
              description: "File 2020 Taxes",
              isComplete: true,
              dueDate: "2020-03-10T17:50:44.673Z"
            },
            {
              id: "2",
              description: "Fold laundry",
              isComplete: true,
              dueDate: null
            },
            {
              id: "3",
              description: "Call Mom",
              isComplete: false,
              dueDate: "2020-06-26T19:00:00.000Z"
            },
            {
              id: "4",
              description: "Walk the dog",
              isComplete: false,
              dueDate: null
            },
            {
              id: "5",
              description: "Feed the cat",
              isComplete: false,
              dueDate: "2020-06-24T15:45:00.000Z"
            },
            {
              id: "6",
              description: "Run LA marathon",
              isComplete: false,
              dueDate: "2021-03-21T13:30:00.000Z"
            }
          ];
        const todoListTyped = todoListUntyped.map((todo:TodoTypeApiUntypedResponse) =>({
          description: todo.description,
          dueDate: new Date(todo.dueDate? todo.dueDate: DATE_MAX_VALUE),
          id: Number(todo.id),
          isComplete: todo.isComplete,
          status: getTodoStatusEnum(todo.isComplete, todo.dueDate)
        }));
        setTodoList(todoListTyped);
        setIsSpinnerVisible(false);
    };

    const updateTodo = async (todoId: number) => {
      setIsSpinnerVisible(true);
      const updatedTodoIndex = todoList.findIndex(todo => todo.id === todoId);
      const updatedTodoList = [...todoList];
      if(updatedTodoList[updatedTodoIndex].isComplete === false){
        const requestStatus = await patch(todoId);
        if(requestStatus.status === "success"){
          updatedTodoList[updatedTodoIndex] = {
            ...updatedTodoList[updatedTodoIndex],
            isComplete: true,
            status: TodoStatusEnum.Completed
          }
          setTodoList(updatedTodoList);
        }
      }
      setIsSpinnerVisible(false);
    }

    return (
        <div className={styles.mainWrapper}>
          {todoList.sort((todoA , todoB) =>
              todoB.status - todoA.status || 
              todoA.dueDate.getTime() - todoB.dueDate.getTime()
            ).map(todo =>
              <Todo key={todo.id} todo={todo} updateTodo={updateTodo}/>
          )}
        </div>
    )
}

export default Main;