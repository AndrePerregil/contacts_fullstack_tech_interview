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

import { registerSchema } from "../../validations/schemas";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const submitCb = (data) => {
    API.post("users/", data)
      .then((res) => {
        navigate("/login");
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
          <form gap="30px" onSubmit={handleSubmit(submitCb)}>
            <Title interval="1s" color="#f70776">
              Register
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
            <FormField
              label="Confirm password"
              type="password"
              Svg={MdPassword}
              fieldContext={register("confPassword")}
              message={errors.confPassword?.message}
            />
            <Button color="#2ECC40" colorHover="#01FF70" marginTop="20px">
              Register
            </Button>
            <Container>
              <p>Already have an account?</p>
              <p>
                Login <Link to={"/login"}>here</Link>
              </p>
            </Container>
          </form>
        </Container>
      </Main>
    </PageContainer>
  );
};

export default Register;
