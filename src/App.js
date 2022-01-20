import { useState, useEffect } from "react";
import AddTask from "./components/add-task/AddTask";
import Header from "./components/header/Header";
import ListTask from "./components/list-task/ListTask";
import { API_GET_URL } from "./config";

function App() {
    const [state, setState] = useState([]);

    useEffect(() => {
        fetch(API_GET_URL)
            .then(res => res.json())
            .then(data => setState(data))
    }, [])

    return (
        <div>
            <Header/>
            <AddTask state={state} setState={setState}/>
            <ListTask state={state} setState={setState}/>
        </div>
    )
}

export default App;