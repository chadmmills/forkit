import type AuthSession from "../auth-session";

const Api = {
  postSession: async (session: AuthSession) => {
    try {
      let resp = await fetch("http://localhost:3008/api/sessions", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(session.attributes),
      });

      if (resp.ok) {
        let data = await resp.json(); // ?.token;
        if (data) {
          return { isError: false, token: data.token };
        }
      }
      return { isError: true, errors: { email: ["is required"] } };
    } catch (e) {
      console.log(e);
      return { isError: true, errors: { networkError: e } };
    }
  },
};

export default Api;
