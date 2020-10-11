import {TodoStatusEnum, TodoType} from "./../type/Todo.type";

import {DATE_MAX_VALUE} from "./../utilities/Todo.constant"
import React from 'react';
import {formattedDate} from "./../utilities/Date.helper";
import styles from './../styles/Todo.module.css';

interface Props {
    todo: TodoType,
    updateTodo: (id: number) => void
}

export const Todo: React.FC<Props> = ({todo, updateTodo}) => {
    
    const {id, description, dueDate, isComplete, status} = todo; 

    const getTodoClassName = (): string => {
        const output = [styles.todoWrapper];
        switch(status){
            case TodoStatusEnum.Completed:
                output.push(styles.completedContentBgColor);
                break;
            case TodoStatusEnum.Overdue:
                output.push(styles.overdueContentBgColor);
                break;
            default:
                output.push(styles.activeContentBgColor);
        }
        return output.join(' ');
    }

    return (
        <div className={getTodoClassName()}>
            <div className={styles.contentWrapper}>
                <input type="checkbox" className={styles.cursorPointer} checked={isComplete} onChange={()=> updateTodo(id)} />
                <div className={isComplete ? styles.strikeContent : ""}>
                    {description}
                </div>
            </div>
            {dueDate.getTime() !== new Date(DATE_MAX_VALUE).getTime() && 
                <div className={styles.dateWrapper}>
                    {formattedDate(dueDate)}
                </div>
            }
        </div>
    )
}
