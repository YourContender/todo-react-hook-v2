import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { API_POST_URL } from "../../config";
import s from './AddTask.module.css';

function AddTask({state, setState}) {
    const [title, setTitle] = useState('');
    const [description, setDescr] = useState('');
    const [test, setTest] = useState(false);

    // console.log('add task: ', state);
    const createMethodAddNewTask = (title, descr) => {
        if (title && descr) {
            let data = {
                title, 
                description: descr,
                id: uuidv4(),
                status: 1
            }
            
            setState([...state, data]);

            console.log(data);
            fetch(API_POST_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then(data => console.log(data))
            .catch((err) => console.log(err))


            setTitle('');
            setDescr('');
        } else {
            setTest(true);
        }
    }

    return (
        <div className={s.container}>
            <Form>
                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter title</Form.Label>
                    <Form.Control onClick={() => setTest(false)} name="title" onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="введите заголовок" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Enter description</Form.Label>
                    <Form.Control onClick={() => setTest(false)} name='descr' onChange={(e) => setDescr(e.target.value)} value={description} as="textarea" rows={2} placeholder="введите описание"/>
                </Form.Group>
            </Form>

            <Button onClick={() => createMethodAddNewTask(title, description)} variant="primary">Добавить</Button>

            {
                test ? 
                    title === '' && description === '' ? 
                        <Alert onClick={() => setTest(false)} className={s.alert} variant='danger' style={{'marginBottom': '-3rem'}}>
                            Пустую задачу нельзя добавить!
                        </Alert>    
                    : title === '' && description ?
                        <Alert onClick={() => setTest(false)} className={s.alert} variant='danger' style={{'marginBottom': '-3rem'}}>
                            Введите заголовок!
                        </Alert>  
                    : title && description === ''?
                        <Alert onClick={() => setTest(false)} className={s.alert} variant='danger' style={{'marginBottom': '-3rem'}}>
                            Введите описание!
                        </Alert>    : null 
                    : null
            }
        </div>
    )
}

export default AddTask;