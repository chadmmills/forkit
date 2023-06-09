export function urlPathToFilePathMatcher(urlPath: string, filePath: string): boolean {
  const urlPathParts = urlPath.split('/');
  const filePathParts = filePath.split('/');

  if (urlPathParts.length !== filePathParts.length) {
    return false;
  }

  for (let i = 0; i < urlPathParts.length; i++) {
    const urlPathPart = urlPathParts[i];
    const filePathPart = filePathParts[i];

    if (urlPathPart === filePathPart) {
      continue;
    }

    if (filePathPart.startsWith(':')) {
      continue;
    }

    if (urlPathPart === "" && filePathPart.startsWith('index')) {
      continue;
    }

    return false;
  }

  return true;
}
