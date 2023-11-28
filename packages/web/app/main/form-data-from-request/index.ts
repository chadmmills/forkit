export default async function formDataFromRequest(req: Request) {
  const formData = await req.clone().formData();
  const path = new URL(req.url).pathname;

  return (
    path +
    "\n" +
    [...formData.entries()].map(([k, v]) => `  ${k}: ${v}`).join("\n")
  );
}
