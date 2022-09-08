import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";

function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    let params = { email: "eve.holt@reqres.in", password: "pistol" };
    axios.post("https://reqres.in/api/register", params).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("userToken", true);
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="grid place-center h-view">
      <Card style={{ width: 500 }}>
        <CardBody>
          <h3 className="custom-h3">Registration</h3>
          <p className="mb-20">
            Only pre-defined users can register (reqres policy)
          </p>
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
            <Button onClick={() => navigate("/login")} color="link">
              Login
            </Button>
            <Button onClick={handleRegister} color="primary">
              Register
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
