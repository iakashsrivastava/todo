import React from 'react'
import TodoType from "./../type/Todo.type";
import styles from './../styles/Todo.module.css';

interface Props {
    todo: TodoType
  }

export const Todo: React.FC<Props> = ({todo}) => {
    const {id, description, isComplete} = todo; 
    const handleCLick = ()=>{
        console.log("clicked", id);
    }
    
    const getTodoClassName = (): string =>{
        const output = [styles.todoWrapper];
        if(todo.isComplete){
            output.push(styles.overdueContent);
        }else{
            output.push(styles.completedContent);
        }
        return output.join(' ');
    }
    
    return (
        <div className={getTodoClassName()}>
            <div className={styles.contentWrapper}>
                <input type="checkbox" checked={true} onChange={handleCLick} />
                <div className={todo.isComplete ? styles.strikeContent : ""}>
                    {description}
                </div>
            </div>
            <div>{id}</div>
        </div>
    )
}