import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Pagination from "../components/Pagination";

import { FaPlus, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

function Homepage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [modifiedData, setModifiedData] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    retrieveUsers();
  }, [page]);

  const retrieveUsers = async () => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );

    setUsers(response.data.data);
  };

  const handleAdd = () => {
    setModifiedData({ ...modifiedData, id: users.length + 1 });

    axios.post("https://reqres.in/api/users", modifiedData).then((response) => {
      setUsers([response.data, ...users]);
    });

    toggle();
  };

  const handleDelete = (id) => {
    axios.delete(`https://reqres.in/api/users/2`);
    setUsers(users.filter((x) => x.id !== id));
  };

  const previousPage = async () => {
    if (page === 1) {
    } else {
      setPage((page) => page - 1);
    }

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );

    setUsers(response.data.data);
  };

  const nextPage = async () => {
    setPage((page) => page + 1);

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );

    setUsers(response.data.data);
  };

  return (
    <div className="grid place-center h-view px-70">
      <Button
        onClick={() => toggle(null, "add")}
        color="primary"
        className="flex items-center gap-5px"
      >
        <FaPlus />
        Add New User
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="First Name">First Name</Label>
            <Input
              id="First Name"
              name="firstname"
              placeholder="Enter First Name..."
              type="text"
              onChange={(e) =>
                setModifiedData({ ...modifiedData, first_name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="Last name">Last Name</Label>
            <Input
              id="Last name"
              name="lastname"
              placeholder="Enter Last Name..."
              type="text"
              onChange={(e) =>
                setModifiedData({ ...modifiedData, last_name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              id="Email"
              name="email"
              placeholder="Enter Email..."
              type="email"
              onChange={(e) =>
                setModifiedData({ ...modifiedData, last_name: e.target.value })
              }
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAdd}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            <>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td
                    onClick={toggle}
                    className="flex items-center gap-5px cursor-pointer"
                  >
                    {user.last_name} {user.first_name}
                    <FiExternalLink />
                  </td>
                  <td>{user.email}</td>
                  <td
                    onClick={() => handleDelete(user.id)}
                    className="cursor-pointer"
                  >
                    <FaTrash color="red" />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <p className="center-component">No Data...</p>
          )}
        </tbody>
      </Table>

      <Pagination page={page} previousPage={previousPage} nextPage={nextPage} />
    </div>
  );
}

export default Homepage;
