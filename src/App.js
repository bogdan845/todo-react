import React, {useState, useEffect} from 'react';
import './App.scss';


import UI from "./components/UI";
import TodoList from "./components/TodoList";
import Alert from "./components/Alert";


// check localStorage
const todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [
    {id: 1, todo: "Eat", isCompleted: false},
    {id: 2, todo: "Sleep", isCompleted: false},
    {id: 3, todo: "Train", isCompleted: false},
    {id: 4, todo: "Repeat", isCompleted: false},
];


function App() {

    // set unique id for items
    let getId = 0;
    if (todos.length > 0) {
        getId = Math.max(...todos.map(item => item.id + 1))
    } else {
        getId = 1;
    }

    /*=============== HOOKS START ===============*/
    // todo index
    const [itemId, setItemId] = useState(getId);
    // todos list
    const [list, setList] = useState(todos);
    // todo
    const [todo, setTodo] = useState("");
    // edit
    const [edit, setEdit] = useState({
        id: "",
        isEdit: false
    });
    // notification
    const [alert, setAlert] = useState({show: false});
    // set localStorage only when todo list changes
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(list))
    }, [list]);
    /*=============== HOOKS END ===============*/


    /*=============== FUNCTIONALITY START ===============*/
    // onchange for input
    const handleOnChange = (e) => {
        setTodo(e.target.value);
    }


    // add todo to list
    const handleAddItem = () => {
        if (todo !== "") {
            if (edit.isEdit) {
                let tempTodos = list.map(item => {
                    return item.id === edit.id ? {...item, todo: todo, isCompleted: false} : item;
                });
                setList(tempTodos);
                setEdit(prevState => {
                    return {
                        ...prevState,
                        isEdit: false
                    }
                });
                handleAlert({status: "success", message: "item edited"})
            } else {
                const singleTodo = {id: itemId, todo: todo, isCompleted: false}
                setList([...list, singleTodo]);
                setItemId(prevState => prevState + 1);
                handleAlert({status: "success", message: "item added"})
            }
            setTodo("");
        } else {
            handleAlert({show: true, message: "Can't add empty item", status: "warning"});
        }
    }


    // find todo by its own id
    const getById = (id) => {
        const item = list.find(item => item.id === id);
        return item;
    }


    // add / remove "complete" mark for todo
    const handleCompleted = (id) => {
        const index = list.indexOf(getById(id));
        list[index].isCompleted = !list[index].isCompleted;
        localStorage.setItem("todos", JSON.stringify(list));
        setList([...list]);
    }


    // edit todo
    const handleEdit = (id) => {
        setEdit({
            id: id,
            isEdit: true
        });
        const getEditable = list.find(item => item.id === id);
        const {todo} = getEditable;
        setTodo(todo);
        document.getElementById("todo").focus();
    }


    // remove todo
    const handleRemove = (id) => {
        let tempTodos = list.filter(item => item.id !== id)
        setList(tempTodos);
        console.log("work ?")
        handleAlert({status: "success", message: "item removed"})
    }


    // clear todos
    const handleClearList = () => {
        setList([]);
        setItemId(1);
        handleAlert({status: "success", message: "items removed"})
    }


    // alert for add/edit/remove/clear todos
    const handleAlert = ({status, message}) => {
        setAlert({show: true, status, message});
        setTimeout(() => {
            setAlert({show: false});
        }, 3000);
    }
    /*=============== FUNCTIONALITY END ===============*/


    return (
        <div className="app">
            {alert.show && <Alert status={alert.status} message={alert.message}/>}
            <UI
                todo={todo}
                handleOnChange={handleOnChange}
                handleAddItem={handleAddItem}
                edit={edit}
            />
            <TodoList
                list={list}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
                handleClearList={handleClearList}
                handleCompleted={handleCompleted}
            />
        </div>
    );
}

export default App;