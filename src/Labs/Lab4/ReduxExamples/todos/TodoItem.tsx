import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo }: { todo: { id: string; title: string }; }) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item p-1 ps-1">
            <button className="btn btn-danger float-end" onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"> Delete </button>
                <button className="btn btn-primary float-end" onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"> Edit </button>
            {todo.title}
        </li>
    );
}
