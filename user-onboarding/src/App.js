import './App.css';
import schema from './FormSchema';
import UserForm from './UserForm'
import User from './User'
import axios from "axios";
import * as yup from "yup";
import { useEffect, useState } from 'react';

const initialFormValues = {
  //text inputs
  name: "",
  username: "",
  email: "",
  password: "",
  //radio buttons- NULL for now
  //--------------
  //checkbox
  terms: ""
};

const initialFormErrors = {
  name: "",
  username: "",
  email: "",
  password: "",
}

const initialUsers = [];
const initialDisabled = true;


export default function App() {
  //creating slices of state
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //Helpers
  const getUsers = () => {
    // debugger;
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        // debugger;
        setUsers(res.data.data);
      })
      .catch((err) => {
        // debugger;
        console.log(err);
        debugger;
      });
    // debugger;
  };

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
        // debugger;
      });
  };

  //Event Handlers
  //inputChange/onChange etc. 

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ","
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
    setFormValues({
      ...formValues,
      [name]: value, // NOT AN ARRAY
    });
  };
  const formSubmit = () => {
    const newUser = {
      name: formValues.username.trim(),
      username: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: ["terms"]
    };
    postNewUser(newUser);
  };

  //side effect

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);



  return (
    <div className="container">
      <header>
        <h1>Users App</h1>
      </header>
    
      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      
      {users.map((user) => {
        return <User key={user.id} details={user} />;
      })}
    </div>
  );
}

