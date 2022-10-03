import React, { useState } from "react";

export default function ToDoBasic(){

    const[toDoList, setToDoList] = useState([]);
    const[toDo, setToDo] = useState("");
    const [listVisibility, setListVisibility] = useState(false);

    const handleChange = (e) =>{
        setToDo(e.target.value);
    }
    

    const handleClick = () =>{
        setListVisibility(true);
        setToDoList(prevState => [...prevState, {toDo:toDo, dateCreated:getDateTime()}]); 
        setToDo("");
    }

    const handleKey= (e) => {

        if(e.key === 'Enter'){
            setListVisibility(true);
            setToDoList(prevState => [...prevState, {toDo:toDo, dateCreated:getDateTime()}]); //spread operator means, for the rest. prevState is given to us by the useState
            setToDo("");
        }
    }

    const getDateTime = () =>{
        var currentdate = new Date(); 
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        return datetime;
    }

    const toDos = toDoList.map((Do, count) => {
        return <ToDo Do={Do.toDo} dateCreated={Do.dateCreated}  key={count} dataKey={count}/>
    })


    function ToDo ({Do, dateCreated, dataKey}) {
        
        const handleRemove = (e) => {
            var tempAr = [...toDoList]
            tempAr.splice(dataKey, 1);
            setToDoList(tempAr);
        }

        return(
            <div className="card">
                <h5>Your Objective: {Do}</h5>
                <h5>Date created: {dateCreated}</h5>
                <button className="btn btn-outline-dark" onClick={handleRemove}>Remove</button>
            </div>
        );
    }

    
    return(
        <React.Fragment>
            <h3>To Do List:</h3>
            <input type="text" onChange={handleChange} onKeyDown={handleKey} value={toDo}/>
            <button onClick={handleClick}>Add</button>
            {listVisibility && <h3>Your ToDo List:</h3>}
            {listVisibility && <ul>{toDos}</ul>}
        </React.Fragment>
    );
}

