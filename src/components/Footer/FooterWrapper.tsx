import { fetchOptions } from "@/constants/constants";
import { client } from "@/sanity/client";
import Footer from "./Footer";

const INFORMATION = `*[_type == "information"][]{statement, instagram, email}`;

export default async function FooterWrapper() {
  const information = await client.fetch<any[]>(INFORMATION, {}, fetchOptions);

  return <Footer data={information[0]} />;
}
