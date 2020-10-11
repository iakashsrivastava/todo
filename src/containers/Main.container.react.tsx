import {DATE_MAX_VALUE, SUCCESS} from "./../utilities/Todo.constant"
import React, {useEffect, useState} from 'react'
import {TodoStatusEnum, TodoType, TodoTypeApiUntypedResponse} from "./../type/Todo.type";
import {get, patch} from "../utilities/Api.helper";

import {Todo} from "./../component/Todo.component.react"
import { isOverDue } from "./../utilities/Date.helper";
import styles from './../styles/Main.module.css';

interface Props {
    setIsSpinnerVisible: (isVisible: boolean) => void
}

export const Main: React.FC<Props> = ({setIsSpinnerVisible}) => {
    
    const [todoList, setTodoList] = useState<Array<TodoType>>([]);
      
    useEffect(() => { getInitialTodoList()}, []);
    
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
        const todoListUntyped: Array<TodoTypeApiUntypedResponse> = await get();
        const todoListTyped: Array<TodoType> = todoListUntyped.map((todo:TodoTypeApiUntypedResponse) =>({
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
      //Update only if current status is false
      if(updatedTodoList[updatedTodoIndex].isComplete === false){
        const requestStatus = await patch(todoId);
        if(requestStatus.status === SUCCESS){
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