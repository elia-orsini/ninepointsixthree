export function cropRatio(ref: string) {
  const width = parseInt(ref.split("-")[2].split("x")[0]);
  const height = parseInt(ref.split("-")[2].split("x")[1]);

  const ratio = width / height;

  return ratio;
}
