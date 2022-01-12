import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import s from './AddTask.module.css';

function AddTask({state, setState}) {
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [test, setTest] = useState(false);

    const createHandleInput = () => {
        if (title && descr) {
            setState([...state, {
                title, 
                descr,
                id: uuidv4(),
                status: false
            }]);
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
                    <Form.Control onClick={() => setTest(false)} name='descr' onChange={(e) => setDescr(e.target.value)} value={descr} as="textarea" rows={2} placeholder="введите описание"/>
                </Form.Group>
            </Form>

            <Button onClick={createHandleInput} variant="primary">Добавить</Button>

            {
                test ? 
                    title === '' && descr === '' ? 
                        <Alert onClick={() => setTest(false)} className={s.alert} variant='danger' style={{'marginBottom': '-3rem'}}>
                            Пустую задачу нельзя добавить!
                        </Alert>    
                    : title === '' && descr ?
                        <Alert onClick={() => setTest(false)} className={s.alert} variant='danger' style={{'marginBottom': '-3rem'}}>
                            Введите заголовок!
                        </Alert>  
                    : title && descr === ''?
                        <Alert onClick={() => setTest(false)} className={s.alert} variant='danger' style={{'marginBottom': '-3rem'}}>
                            Введите описание!
                        </Alert>    : null 
                    : null
            }
        </div>
    )
}

export default AddTask;