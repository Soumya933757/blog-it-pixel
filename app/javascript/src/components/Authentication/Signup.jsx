import React, { useState } from "react";

import SignupForm from "components/Authentication/Form/Signup";

import { useSignup } from "../../hooks/reactQuery/authApi";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [organization, setOrganization] = useState("");

  const { mutate: signup, isLoading } = useSignup();

  const handleSubmit = event => {
    event.preventDefault();

    signup(
      {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        organization_id: organization,
      },
      {
        onSuccess: () => {
          history.push("/");
        },
        onError: error => {
          logger.error(error);
        },
      }
    );
  };

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      loading={isLoading}
      setEmail={setEmail}
      setName={setName}
      setOrganization={setOrganization}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
    />
  );
};

export default Signup;
