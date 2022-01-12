import { Button, ButtonGroup } from "react-bootstrap";
import s from './ListTask.module.css';
import { faCheck, faCheckDouble, faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function ListTask({state, setState}) {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [filter, setFilter] = useState(state);
    
    // filtered method
    useEffect(() => {
        setFilter(state)
    }, [state])

    const createFilteredTask = (status) => {
        if (status === 'all') {
            setFilter(state);
        } else if (status === false) {
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
    }

    // edit method
    const createEditMethod = () => {
        let filtered = [...state].map(item => {
            if (item.id === edit) {
                return {
                    ...item,
                    title, 
                    descr,
                }
            }
            return item
        })
        setState(filtered);
    }

    const saveTask = () => {
        setEdit(true);
        createEditMethod();
        setTitle('');
        setDescr('');
    }

    const createEditTask = (id, title, descr) => {
        setEdit(id);
        setTitle(title);
        setDescr(descr);
    }

    // change status
    const createChangeStatus = (id) => {
        let filtered = [...state].map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    status: !item.status
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
                                        <input value={descr} onChange={(e) => setDescr(e.target.value)} placeholder="test descr"/>
                                    </div> :
                                    <div className={!item.status ? s.text : s.done}> 
                                        <h1 className={s.title}>
                                            {item.title.length > 20 ? item.title.slice(0, 10) + '...' : item.title} 
                                        </h1>
                                        <span className={s.descr}>
                                            {item.descr.length > 40 ? item.descr.slice(0, 20) + '...' : item.descr}
                                        </span>
                                    </div> 
                            }
                            {
                                edit === item.id ? 
                                    <Button onClick={saveTask}><FontAwesomeIcon icon={faSave}/></Button> :
                                    <div className={s.buttons}>
                                        <Button onClick={() => createMethodRemove(item.id)} className={s.btn} variant="danger"><FontAwesomeIcon icon={faTrash}/></Button>
                                        <Button onClick={() => createEditTask(item.id, item.title, item.descr)} className={s.btn} variant="secondary"><FontAwesomeIcon icon={faEdit}/></Button>
                                        <Button onClick={() => createChangeStatus(item.id)} className={s.btn} variant={item.status ? 'warning' : 'success'}>
                                            {item.status ? <FontAwesomeIcon icon={faCheckDouble}/> : <FontAwesomeIcon icon={faCheck}/>}
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