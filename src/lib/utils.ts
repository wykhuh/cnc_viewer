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

export function toggleFullScreen(element: HTMLElement) {
  if (!document.fullscreenElement) {
    element.requestFullscreen();
  } else {
    document.exitFullscreen?.();
  }
}

function throttleAsync(func: (...args: any[]) => {}, delayMS: number) {
  let lastRun = 0;
  let timeouts: any[] = [];

  // @ts-ignore
  async function throttled(...args) {
    const currentWait = lastRun + delayMS - Date.now();
    const shouldRun = currentWait <= 0;

    if (shouldRun) {
      lastRun = Date.now();
      try {
        return await func(...args);
      } catch (error) {
        return await new Promise(function (_resolve, reject) {
          reject(error);
        });
      }
    } else {
      return await new Promise(function (resolve) {
        let timeout = setTimeout(function () {
          resolve(throttled(...args));
        }, currentWait);
        timeouts.push(timeout);
      });
    }
  }

  throttled.cancel = function () {
    timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    timeouts = [];
  };

  return throttled;
}

const apiThrottleTime = 1000;
export const throttledFetch = throttleAsync((url) => {
  return fetch(url);
}, apiThrottleTime);
