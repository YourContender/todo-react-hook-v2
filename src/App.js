import { useState } from "react";
import AddTask from "./components/add-task/AddTask";
import Header from "./components/header/Header";
import ListTask from "./components/list-task/ListTask";

function App() {
    const [state, setState] = useState([])

    return (
        <div>
            <Header/>
            <AddTask state={state} setState={setState}/>
            <ListTask state={state} setState={setState}/>
        </div>
    )
}

export default App;