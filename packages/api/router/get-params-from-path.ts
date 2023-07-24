export function getParamsFromPath(urlPath: string, filePath: string) {
  const urlPathSegments = urlPath.split("/").filter(Boolean);
  const filePathSegments = filePath
    .replace(".ts", "")
    .split("/")
    .filter(Boolean);

  const params: Record<string, string> = {};

  for (let i = 0; i < filePathSegments.length; i++) {
    const filePathSegment = filePathSegments[i];
    const urlPathSegment = urlPathSegments[i];

    if (filePathSegment.startsWith("$")) {
      const key = filePathSegment.slice(1);
      const value = urlPathSegment;
      params[key] = value;
    }
  }

  return params;
}
