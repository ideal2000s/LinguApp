export function clearEmbedCode(data: string): [string[], string] {
  const urlRegex = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._\\+~#=]{1,256})\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*\.js)/gm;
  let m;
  const urls = [];

  while ((m = urlRegex.exec(data)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === urlRegex.lastIndex) {
      urlRegex.lastIndex++;
    }

    urls.push(m[0]);
  }

  const clearRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  return [urls, data.replace(clearRegex, '')];
}
