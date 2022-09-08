# Simple Crud App Reqres-API

In this example i used the following functionalities:
- Register
- Login
- List users with pagination
- Add new user
- Delete user

To clone this project just simply copy the HTTPS or SSH code and paste it to your GIT terminal with prefix "git clone"

#Instalation
To get started with the project you need to install the needed dependencies use:

``yarn install``
-then-
``yarn start``

# Login
The `login` method i used is simply by taking reqres API and used it on a function using `axios` and `localStorage` to store the user status for route protection with pre-defined parameters as of the providors policy.

```jsx
const handleLogin = () => {
    let params = { email: "eve.holt@reqres.in", password: "pistol" };
    axios.post("https://reqres.in/api/login", params).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("user", true);
        window.location.href = "/";
      }
    });
  };
  ```
# Registration
Similar with `registration` just different API endpoint.
```jsx
 const handleRegister = () => {
    let params = { email: "eve.holt@reqres.in", password: "pistol" };
    axios.post("https://reqres.in/api/register", params).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("userToken", true);
        window.location.href = "/";
      }
    });
  };
  ```
  
  # Listing 
  Listing `users` in a table with pagination was done by using `reqres` API and the help of React Hooks `useState` and `useEffect`.
  ```jsx
  const retrieveUsers = async () => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );

    setUsers(response.data.data);
  };
  ```
  Above i use an `asynchronous` function to `await` the response and set it to the `users` state.
  
  # Adding users:
  ```jsx
   const [modifiedData, setModifiedData] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
  });
  
   const handleAdd = () => {
    setModifiedData({ ...modifiedData, id: users.length + 1 });

    axios.post("https://reqres.in/api/users", modifiedData).then((response) => {
      setUsers([response.data, ...users]);
    });

    toggle();
  };
  ```
  Here i take the pre-defined parameters in `modifiedData` state and adding unique id with increasing one number from the `users` array. After i set the data to the `users` array i call a function `toggle` to close the `Pop-up Modal`
  
  # Deleting users:
```jsx
const handleDelete = (id) => {
    axios.delete(`https://reqres.in/api/users/2`);
    setUsers(users.filter((x) => x.id !== id));
  };
```
First i delete the user from the database using `DELETE` method and then i filter my current array to get my upadted array in the table without refreshing the page.

# Dependencies
- React 18.2.0
- React Router Dom 6.3.0
- Reactstrap 9.1.4
- React-icons 4.4.0
- Axios 0.27.2
