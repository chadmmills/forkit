import { readdirSync, statSync } from "node:fs";

type FileLike = {
  path: string;
  isDirectory: boolean;
};

type ReaddirFn = (path: string) => FileLike[];

function getFileLikes(path: string): FileLike[] {
  let results = [];
  let files = readdirSync(path);

  for (let file of files) {
    let fileWithPath = path + "/" + file;
    let stats = statSync(fileWithPath);
    let isDirectory = stats.isDirectory();

    if (isDirectory) {
      results.push(...getFileLikes(fileWithPath));
    } else {
      results.push({ path: fileWithPath, isDirectory });
    }
  }

  return results;
}

export function getFilesFromDirectory(
  path: string,
  readdirFn: ReaddirFn = getFileLikes,
): string[] {
  return readdirFn(path).map((file) => file.path);
}
