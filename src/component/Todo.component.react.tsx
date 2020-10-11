import {TodoStatusEnum, TodoType} from "./../type/Todo.type";

import {DATE_MAX_VALUE} from "./../utilities/Todo.constant"
import React from 'react';
import {formattedDate} from "./../utilities/Date.helper";
import styles from './../styles/Todo.module.css';

interface Props {
    todo: TodoType
}

export const Todo: React.FC<Props> = ({todo}) => {
    const {id, description, dueDate, isComplete, status} = todo; 
    const handleCLick = ()=>{
        console.log("clicked", id);
    }

    const getTodoClassName = (): string => {
        const output = [styles.todoWrapper];
        switch(status){
            case TodoStatusEnum.Completed:
                output.push(styles.completedContent);
                break;
            case TodoStatusEnum.Overdue:
                output.push(styles.overdueContent);
                break;
            default:
                output.push(styles.activeContent);
        }
        return output.join(' ');
    }
    
    return (
        <div className={getTodoClassName()}>
            <div className={styles.contentWrapper}>
                <input type="checkbox" checked={true} onChange={handleCLick} />
                <div className={isComplete ? styles.strikeContent : ""}>
                    {description}
                </div>
            </div>
            {dueDate.getTime() !== new Date(DATE_MAX_VALUE).getTime() && 
                <div>
                    {formattedDate(dueDate)}
                </div>}
        </div>
    )
}
