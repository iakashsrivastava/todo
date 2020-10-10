import React from 'react'
import TodoType from "./../type/Todo.type";

interface Props {
    todo: TodoType
  }

export const Todo: React.FC<Props> = ({todo}) => {
    const {id, description} = todo; 
    return (
        <div>
            {description}
        </div>
    )
}
