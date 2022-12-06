import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container } from "../../components/container";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Main } from "../../components/main";
import { PageContainer } from "../../components/pageContainer";
import { Title } from "../../components/title";
import { FormField } from "../../components/formField";

import { MdPassword } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";

import { API } from "../../services/API";

import { loginSchema } from "../../validations/schemas";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitCb = (data) => {
    API.post("users/login", data)
      .then((res) => {
        localStorage.setItem("@contact_ti:token", res.data.token);
      })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        navigate("/");
      });
  };
  return (
    <PageContainer>
      <Header>
        <h1>
          @<span>c</span>onta<span>ct</span>s_TI
        </h1>
      </Header>
      <Main>
        <Container>
          <form onSubmit={handleSubmit(submitCb)}>
            <Title interval="1s" color="#f70776">
              Login
            </Title>
            <FormField
              label="Username"
              type="text"
              placeholder="name here"
              Svg={MdAccountCircle}
              fieldContext={register("username")}
              message={errors.username?.message}
            />
            <FormField
              label="Password"
              type="password"
              Svg={MdPassword}
              fieldContext={register("password")}
              message={errors.password?.message}
            />
            <Button color="#2ECC40" colorHover="#01FF70" marginTop="20px">
              Login
            </Button>
            <Container>
              <p>Dont't have an account?</p>
              <p>
                Register <Link to={"/register"}>here</Link>
              </p>
            </Container>
          </form>
        </Container>
      </Main>
    </PageContainer>
  );
};

export default Login;
