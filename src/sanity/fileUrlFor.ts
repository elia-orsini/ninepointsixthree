export function fileUrlFor(file: any) {
  const projectId = "bx400hl5";
  const dataset = "production";

  const fileComponents = file?.asset?._ref?.replace("file-", "").split("-");

  const fileName = fileComponents[0];
  const fileExtension = fileComponents[1];

  const videoUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileName}.${fileExtension}`;

  return videoUrl;
}
