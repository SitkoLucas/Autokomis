export async function shareOrCopy(opts: {
  title: string;
  url: string;
  text?: string;
}): Promise<"shared" | "copied"> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: opts.title,
        text: opts.text,
        url: opts.url,
      });
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        throw err;
      }
    }
  }

  await navigator.clipboard.writeText(opts.url);
  return "copied";
}
