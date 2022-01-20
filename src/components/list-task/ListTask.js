import { Button, ButtonGroup } from "react-bootstrap";
import s from './ListTask.module.css';
import { faCheck, faCheckDouble, faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { API_DEL_URL, API_PUT_URL } from "../../config";

function ListTask({state, setState}) {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescr] = useState('');
    const [filter, setFilter] = useState(state);
    
    // filtered method
    useEffect(() => {
        setFilter(state)
    }, [state])

    const createFilteredTask = (status) => {
        if (status === 'all') {
            setFilter(state);
        } else if (status === true) {
            let values = [...state].filter(item => item.status);
            setFilter(values);
        } else {
            let values = [...state].filter(item => !item.status);
            setFilter(values);
        }
    }

    // remove method
    const createMethodRemove = (id) => {
        let filtered = [...state].filter(item => item.id !== id)

        setState(filtered);

        fetch(API_DEL_URL + '/' + id, {
            method: 'DELETE',
        })
          .then(res => res.text())
          .then(res => console.log(res))
    }

    // edit method
    const createEditMethod = (id) => {
        let filtered = [...state].map(item => {
            if (item.id === edit) {
                return {
                    id,
                    title, 
                    description,
                    status: 1
                }
            }
            return item
        })
        setFilter(filtered);

        let data = {
            id,
            title, 
            description,
            status: 1
        }
        console.log(filtered);

        fetch(API_PUT_URL + "/" + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((err) => console.log(err))
    }

    const saveTask = (title, description, id) => {
        setEdit(true);
        createEditMethod(id);
        setTitle('');
        setDescr('');
    }

    const createEditTask = (id, title, description) => {
        setEdit(id);
        setTitle(title);
        setDescr(description);
    }

    // change status
    const createChangeStatus = (id) => {
        let filtered = [...state].map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    status: +!item.status
                }
            }
            return item
        })
        setState(filtered);
    }

    return (
        <ul className={s.container}>
             <div>
                <ButtonGroup className={s.buttons} aria-label="Basic example">
                    <Button onClick={() => createFilteredTask('all')} variant="outline-secondary">all</Button>
                    <Button onClick={() => createFilteredTask(true)} variant="outline-secondary">open</Button>
                    <Button onClick={() => createFilteredTask(false)} variant="outline-secondary">close</Button>
                </ButtonGroup>
            </div>
            {
                filter.map(item => {
                    return (
                        <li className={s.task} key={item.id}>
                            {
                                edit === item.id ?
                                    <div>
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="test title"/> <br/>
                                        <input value={description} onChange={(e) => setDescr(e.target.value)} placeholder="test descr"/>
                                    </div> :
                                    <div className={item.status ? s.text : s.done}> 
                                        <h1 className={s.title}>
                                            {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title} 
                                        </h1>
                                        <span className={s.descr}>
                                            {item.description.length > 40 ? item.description.slice(0, 40) + '...' : item.description}
                                        </span>
                                    </div> 
                            }
                            {
                                edit === item.id ? 
                                    <Button onClick={() => saveTask(item.title, item.description, item.id)}><FontAwesomeIcon icon={faSave}/></Button> :
                                    <div className={s.buttons}>
                                        <Button onClick={() => createMethodRemove(item.id)} className={s.btn} variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>
                                        <Button onClick={() => createEditTask(item.id, item.title, item.description)} className={s.btn} variant="secondary"><FontAwesomeIcon icon={faEdit}/></Button>
                                        <Button onClick={() => createChangeStatus(item.id)} className={s.btn} variant={item.status ? 'success' : 'warning'}>
                                            {item.status ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faCheckDouble}/>} 
                                        </Button>
                                    </div>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ListTask;