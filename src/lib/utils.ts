export function sampleArray(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

// https://stackoverflow.com/a/39914235
export function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function pluralize(
  number: number | undefined,
  text: string,
  useComma = false,
) {
  if (number === undefined) number = 0;
  let displayNumber = useComma ? number.toLocaleString() : number;
  if (number === 1) {
    return `${displayNumber} ${text}`;
  } else {
    return `${displayNumber} ${text}s`;
  }
}
