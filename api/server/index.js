// const Router = new MakeRouter()
const Router = { find(_) {
        return () => new Response("Hello, World!", { status: 200 });
    } };
export default {
    port: 3008,
    fetch(req) {
        const handler = Router.find(req);
        if (handler) {
            // handler({ req, db, json() {}, setHeader() {}, setStatus() {} }) // or something
            return handler();
        }
        return new Response(null, { status: 404 });
    }
};
