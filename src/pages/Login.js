import axios from "axios";
import { Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    let params = { email: "eve.holt@reqres.in", password: "pistol" };
    axios.post("https://reqres.in/api/login", params).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("user", true);
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-view">
      <Card style={{ width: 500 }}>
        <CardBody>
          <h3 className="custom-h3">Login</h3>

          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              id="Email"
              name="email"
              disabled
              placeholder="eve.holt@reqres.in"
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              id="Password"
              disabled
              name="password"
              placeholder="pistol"
              type="password"
            />
          </FormGroup>
          <div className="flex items-center justify-between">
            <Button onClick={() => navigate("/register")} color="link">
              Register
            </Button>
            <Button onClick={handleLogin} color="primary">
              Login
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
