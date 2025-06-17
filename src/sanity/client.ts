import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "bx400hl5",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});