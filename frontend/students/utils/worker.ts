export function createWorker(fn: (...k: any) => any): Worker {
  const blob = new Blob(['self.onmessage = ', fn.toString()], {
    type: 'text/javascript'
  });
  const url = URL.createObjectURL(blob);

  return new Worker(url);
}
