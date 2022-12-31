import React, { FormEvent, useState } from "react";

export const SignOnForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      const res = await fetch("https://api.a11ywatch.com/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      console.log(json);
    }
  };

  return (
    <div>
      <h2>Login to A11yWatch</h2>

      <form onSubmit={onSubmitEvent} noValidate>
        <input
          placeholder="Enter email.."
          type={"email"}
          onChange={onChangeEmail}
        ></input>
        <input
          placeholder="Enter password..."
          type={"password"}
          onChange={onChangePassword}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
