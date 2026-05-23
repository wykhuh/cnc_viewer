import { parse as papaparse } from "papaparse";

export function getAndParseCSV(url: string, header = true, download = true) {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    papaparse(url, {
      header: header,
      download: download,
      complete(results) {
        resolve(results.data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}
