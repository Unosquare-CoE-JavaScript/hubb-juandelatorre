export type OutputType = { char: string, count: number, isNumber: boolean };

export const algorithms: { [name:string]: (input: string) => string } = {
  "Regular Expression": (input: string) => input
    .replace(/(\d+)/g, '*$1') // Escape groups of numbers
    .replace(/([a-z])\1{2,}/ig, match => match[0] + match.length), // Compress

    "Array Functions": (input:string) => [ ...input ]
      .reduce((output: OutputType[], next: string) => {
        const index = output.length - 1;
        const last = output[index];
        const current = { char: next, count: 1, isNumber: Number.isInteger(+next) };

        if (last.char !== '') {
          if (current.isNumber) {
            if (last.isNumber) {
              last.char += next;
            } else {
              output.push(current);
            }
          } else if (last.char === next) {
            last.count++;
          } else {
            output.push(current);
          }
        } else {
          output[index] = current;
        }

        return output
      }, [ { char: '', count: 0, isNumber: false } ])
      .map(
        (
          { char, count, isNumber }: OutputType
        ) =>
          isNumber ?
            `*${char}` : // Escape groups of numbers
            count > 2 ?
              `${char}${count}` : // Compress
              char.repeat(count) // Leave untouched
      )
      .join(''),
};
