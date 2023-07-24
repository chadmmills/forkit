export function urlPathToFilePathMatcher(
  urlPath: string,
  filePath: string,
): boolean {
  const urlPathParts = urlPath.split("/");
  const filePathParts = filePath.split("/");

  const isLastFilePathAnIndex =
    filePathParts[filePathParts.length - 1] === "index";

  if (urlPathParts.length !== filePathParts.length && !isLastFilePathAnIndex) {
    return false;
  }

  for (let i = 0; i < urlPathParts.length; i++) {
    const urlPathPart = urlPathParts[i];
    const filePathPart = filePathParts[i];

    if (urlPathPart === filePathPart) {
      continue;
    }

    if (urlPathPart + ".ts" === filePathPart) {
      continue;
    }

    if (filePathPart.startsWith("$") && urlPathPart !== "") {
      continue;
    }

    if (urlPathPart === "" && filePathPart.startsWith("index")) {
      continue;
    }

    return false;
  }

  return true;
}
