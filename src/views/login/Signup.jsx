import { createRef, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { Card } from "@/components/ui/Card.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const usernameRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md p-8 bg-white dark:bg-gray-800 text-black dark:text-white">
          <h1 className="text-2xl font-semibold mb-6 text-center">Signup</h1>

          {errors && Object.keys(errors).length > 0 && (
            <div className="mb-4 p-4 border border-red-500 text-red-500 rounded">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="text"
              ref={nameRef}
              placeholder="Name"
              required
              className="w-full"
            />
            <Input
              type="text"
              ref={usernameRef}
              placeholder="username"
              required
              className="w-full"
            />
            <Input
              type="email"
              ref={emailRef}
              placeholder="Email"
              required
              className="w-full"
            />
            <Input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              className="w-full"
            />
            <Input
              type="password"
              ref={passwordConfirmationRef}
              placeholder="Password Confirmation"
              className="w-full"
            />

            {/* <Button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </Button> */}
          </form>
        </Card>
      </div>
    </>
  );
}
