import { Form } from "@remix-run/react";
import Input from "~/components/Input";

export default function Login() {
  return (
      <div className="h-full flex">
      <div className="m-auto">
      <Form method="post">
      <Input />
      </Form>
      </div>
      </div>
      )
}
