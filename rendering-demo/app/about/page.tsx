import { cookies } from "next/headers";



export default async function Page() {

  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  console.log(theme);
  


  console.log("About server component...");
  
  return (
    <h1>About Page {new Date().toLocaleDateString()}</h1>
  );
}