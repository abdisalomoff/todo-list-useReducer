import { useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import ContactList from './ContactList';

const FormContact = () => {
const [validated, setValidated] = useState(false);

const todosJSON = localStorage.getItem("todos");

const nameRef = useRef();
const lastnameRef = useRef();
const telRef =useRef();
const categoryRef = useRef();

const [todos, setTodos] = useState(JSON.parse(todosJSON) || []);

const submit = (event) =>{
event.preventDefault();

const form = event.currentTarget;
if (form.checkValidity() === false) {
event.stopPropagation();
}

setValidated(true);

const firstName = nameRef.current.value.trim();
const lastName = lastnameRef.current.value.trim();
const telNumber = telRef.current.value.trim();
const selectedCategory = categoryRef.current.value;

if (firstName && lastName && telNumber && selectedCategory) {
const todo = {
id: selected === null ? Date.now() : selected,
name: firstName,
lastname: lastName,
telephone: telNumber,
category: selectedCategory,
}

// console.log(todo);
let newTodo;
if (selected === null) {
newTodo = [todo, ...todos];
}else {
newTodo = todos.map(contact => contact.id === selected ? { ...contact, ...todo } : contact);
setSelected(null);
}
setTodos(newTodo);
localStorage.setItem("todos", JSON.stringify(newTodo));
}

nameRef.current.focus();
event.target.reset();
};

const deleteTodo = (id) =>{
const newTodo = todos.filter((todo) => todo.id != id)
setTodos(newTodo);
localStorage.setItem("todos", JSON.stringify(newTodo));
}

const editTodo = (id) =>{
const {name, lastname, telephone, category} =todos.find(todo=> todo.id === id);
nameRef.current.value = name;
lastnameRef.current.value = lastname;
telRef.current.value = telephone;
categoryRef.current.value = category
setSelected(id)
}

const [selected, setSelected] = useState(null);

const mappingTodos = todos.map((todo, i) =>
<ContactList key={i} {...todo} editTodo={editTodo} deleteTodo={deleteTodo} />)
// console.log(mappingTodos);
return (
<section className='container'>
    <h1 className='text-center fs-4 mt-3'> Todo (Contacts)</h1>
    <Form onSubmit={submit} noValidate validated={validated} className='mx-auto w-50'>
    <Col className="mb-2">
        <Form.Group className='mb-2' as={Col} controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control ref={nameRef} required type="text" placeholder="First name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-2' as={Col} controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control ref={lastnameRef} required type="text" placeholder="Last name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-2' as={Col} controlId="validationCustom02">
            <Form.Label>Phone number</Form.Label>
            <Form.Control ref={telRef} required type="tel" placeholder="Phone number" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
            <Form.Label>Choose relationship</Form.Label>
            <Form.Select ref={categoryRef}>
                <option value="not assignet">Not assigned</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="colleagues">Colleagues</option>
                <option value="emergency contacts">Emergency contacts</option>
            </Form.Select>
        </Form.Group>
        </Col>
        <Button className='btn w-100 btn-success' type="submit">{selected===null ? "Add" : "Save"} contact</Button>
    </Form>
    <div className='mt-5 mb-4'>
        {mappingTodos}
    </div>

</section>
)
}

export default FormContact