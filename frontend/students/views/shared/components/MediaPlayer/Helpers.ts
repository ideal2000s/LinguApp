export function timePrettyPrintHelper(data: number): string {
  const time = Math.floor(data);
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const strPadLeft = (value: number, pad: string, length: number) => {
    return (new Array(length).join(pad) + value).slice(-length);
  };

  return strPadLeft(minutes, '0', 2) + ':' + strPadLeft(seconds, '0', 2);
}
