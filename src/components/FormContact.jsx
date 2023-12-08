import { useReducer, useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ContactList from './ContactList';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todolist')) || [],
};

const actionTypes = {
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
      case actionTypes.EDIT_TODO:
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id ? action.payload : todo
          ),
        };

    default:
      return state;
  }
};

const FormContact = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const nameRef = useRef();
  const lastnameRef = useRef();
  const telRef = useRef();
  const categoryRef = useRef();

  const addTodo = (todo) => {
    dispatch({ type: actionTypes.ADD_TODO, payload: todo });
  };

  const deleteTodo = (id) => {
    dispatch({ type: actionTypes.DELETE_TODO, payload: id });
  };

  const editTodo = (id) => {
    const todoToEdit = state.todos.find((todo) => todo.id === id);
    setSelected(id);
    nameRef.current.value = todoToEdit.name;
    lastnameRef.current.value = todoToEdit.lastname;
    telRef.current.value = todoToEdit.telephone;
    categoryRef.current.value = todoToEdit.category;
  };


  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(state.todos));
  }, [state.todos]);

  const [validated, setValidated] = useState(false);

  const submit = (event) => {
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
    if (selected === null) {
      const todo = {
        id: Date.now(),
        name: firstName,
        lastname: lastName,
        telephone: telNumber,
        category: selectedCategory,
      };
      addTodo(todo);

    } else {
        
      const updatedTodo = {
        id: selected,
        name: firstName,
        lastname: lastName,
        telephone: telNumber,
        category: selectedCategory,
      };

      dispatch({ type: actionTypes.EDIT_TODO, payload: updatedTodo });
      setSelected(null);
    }
  }
    nameRef.current.focus();
    event.target.reset();
  };

  const [selected, setSelected] = useState(null);

  return (
    <section className="container">
      <h1 className="text-center fs-4 mt-3"> Todo (Contacts)</h1>
      <Form onSubmit={submit} noValidate validated={validated} className="mx-auto w-50">
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
        <Button className="btn w-100 btn-success" type="submit">
          {selected === null ? 'Add' : 'Save'} contact
        </Button>
      </Form>

      <div className="mt-5 mb-4">
        {state.todos.map((todo) => (
          <ContactList
            key={todo.id}
            todo={todo}
            deleteTodo={() => deleteTodo(todo.id)}
            editTodo={() => editTodo(todo.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default FormContact;










