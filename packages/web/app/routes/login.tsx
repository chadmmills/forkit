import { json, type ActionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import logger from "~/main/logger";
import formDataFromRequest from "~/main/form-data-from-request";
import AuthSession from "~/main/auth-session";

export async function action({ request }: ActionArgs) {
  logger.debug(await formDataFromRequest(request));

  let session = await AuthSession.init(request).create();

  if (session.isValid) {
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": session.token, //FIXME: this is temp
      },
    });
  }

  return json({ errors: session.errors }, { status: 400 });
}

export default function Login() {
  return (
    <div className="h-full flex bg-gradient-to-br from-[#274f8c] to-[#26ded4]">
      <div className="m-auto">
        <div className="m-auto p-8 rounded-lg bg-white shadow-lg">
          <Form method="post">
            <Input
              label="Email"
              name="email"
              type="email"
              value="chad@example.com"
            />
            <Input label="Password" name="password" type="password" />
            <div className="flex mt-2">
              <Button className="ml-auto">Login</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
