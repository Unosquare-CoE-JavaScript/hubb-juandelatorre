addEventListener('load', () => {
  const byId = document.getElementById.bind(document);
  byId('Input1').addEventListener('input', ({ target }) => {
    byId('Output1').innerText = target.value
    .replace(/(\d+)/g, '*$1') // Escape groups of numbers
    .replace(/([a-z])\1{2,}/ig, match => match[0] + match.length) // Compress
  });

  byId('Input2').addEventListener('input', ({ target }) => {
    byId('Output2').innerText = [ ...target.value ]
      .reduce((output, next) => {
        const index = output.length - 1;
        const last = output[index];
        const current = { char: next, count: 1, isNumber: Number.isInteger(+next) };

        if (last.char !== '') {
          if (current.isNumber) { // Numeric character
            if (last.isNumber) {
              last.char += next; // Add to the same group
            } else {
              output.push(current); // Start new group of numbers
            }
          } else if (last.char === next) { // Same character
            last.count++;
          } else {
            output.push(current); // Start new group
          }
        } else {
          output[index] = current; // First Character
        }

        return output;
      }, [ { char: '', count: 0, isNumber: false } ])
      .map(
        (
          { char, count, isNumber }
        ) =>
          isNumber ?
            `*${char}` : // Escape groups of numbers
            count > 2 ?
              `${char}${count}` : // Compress
              char.repeat(count) // Leave untouched
      )
      .join('');
  });

  byId('Input3').addEventListener('input', ({ target }) => {
    byId('Output3').innerText = target.value
      .replace(/[a-z]\d+/ig, match => match[0].repeat(+match.substr(1))) // Decompress
      .replace(/\*(\d+)/g, '$1') // Unescape groups of numbers
  });
});
