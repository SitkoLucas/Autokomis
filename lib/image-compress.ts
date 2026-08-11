/** Kompresja zdjęcia przed zapisem do sessionStorage (demo). */
export async function compressImageFile(
  file: File,
  maxWidth = 1200,
  quality = 0.72,
): Promise<{ dataUrl: string; name: string }> {
  const name = file.name || "zdjecie.jpg";
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, maxWidth / bitmap.width);
  const w = Math.round(bitmap.width * ratio);
  const h = Math.round(bitmap.height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { dataUrl: URL.createObjectURL(file), name };
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  return { dataUrl, name };
}

export function filesFromList(list: FileList | File[] | null): File[] {
  if (!list) return [];
  return Array.from(list).filter((f) => f.type.startsWith("image/"));
}
