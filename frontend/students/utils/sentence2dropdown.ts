export const sentence2dropdown = (sentence: string): Record<string, any> => {
  const array = sentence.split('*');
  const blockCount = Math.floor(array.length / 2);
  const blocks = [];
  const optionsArray = [];

  for (let i = 0; i < blockCount; i++) {
    blocks.push(array[i * 2]);
    const options = array[i * 2 + 1].split(':')[1].split('/');
    optionsArray.push(options);
  }

  if (blocks.length * 2 < array.length) {
    blocks.push(array[array.length - 1]);
  }

  return {
    blocks,
    options: optionsArray
  };
};
