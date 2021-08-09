const byId = document.getElementById.bind(document);
const byTag = document.getElementsByTagName.bind(document);

const createTextNode = (text) => document.createTextNode(text);
const createElement = (tag, text) => {
  const element = document.createElement(tag);
  if (text !== undefined) {
    element.append(createTextNode(text));
  }
  return element;
};

let selectedAlgorithm;
const algorithms = new Map([
  [
    'regex',
    {
      title: 'Regular Expressions',
      description: [
        'This algorithm uses regular expressions to, first, escape groups of numbers:',
        { tag: 'code', content: 'replace(/(\\d+)/g, \'*$1\')' },
        'After that, groups of 3 or more identical characters are selected with the following regular expression:',
        { tag: 'code', content: '/([a-z])\\1{2,}/ig' },
        'And replaced with the character followed by the number of repetitions:',
        { tag: 'code', content: `match => match[0] + match.length` },
      ],
      algorithm: input =>
        input
          .replace(/(\d+)/g, '*$1') // Escape groups of numbers
          .replace(/([a-z])\1{2,}/ig, match => match[0] + match.length) // Compress
    }
  ],
  [
    'array',
    {
      title: 'Array Functions',
      description: [
        'This algorithm uses a reduce function to analyze the string, identify groups of numbers',
        'and groups of identical characters, and save this information in an array of intermediate values:',
        { tag: 'code', content: '{ char: \'a\', count: 3, isNumber: false ' },
        'Then it maps each group to a string. First escaping numbers:',
        { tag: 'code', content: 'isNumber ? `*${char}` : ...' },
        'And, then, filtering string longer than 2:',
        { tag: 'code', content: '... count > 2 ? `${char}${count}` : char.repeat(count)' },
      ],
      algorithm: input =>
          [ ...input ]
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
          .join('')
    }
  ],
  [
    'decompress',
    {
      title: 'Decompress',
      description: [
        'This algorithm uses regular expressions to revert the compression. It\'s useful to test if the other algorithms work properly.',
      ],
      algorithm: input =>
        input
          .replace(/[a-z]\d+/ig, match => match[0].repeat(+match.substr(1))) // Decompress
          .replace(/\*(\d+)/g, '$1') // Unescape groups of numbers
    }
  ],
]);

addEventListener('load', () => {
  Array.from(byTag('AlgorithmLinks')).forEach(
    placeHolder => {
      const parent = placeHolder.parentElement;
      algorithms.forEach(({ title }, key) => {
        const link = createElement('a', title);
        link.href = `#${key}`;
        parent.insertBefore(link, placeHolder);
      })
    }
  );

  byId('Input').addEventListener('input', ({ target }) => {
    byId('Output').innerText = selectedAlgorithm.call(null, target.value);
  });

  selectSection(location.hash.substr(1));
});

addEventListener('hashchange', () => {
  selectSection(location.hash.substr(1));
});

function selectSection (section) {
  let current = byId(section || 'main');
  const isAlgorithm = algorithms.has(section);

  if (isAlgorithm) {
    fillAlgorithm(section);
    current = byId('algorithm');
  }

  for (let element of byTag('section')) {
    if (element === current) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }
}

function fillAlgorithm (key) {
  const algorithm = algorithms.get(key);
  selectedAlgorithm = algorithm.algorithm;
  const section = byId('algorithm');

  byId('Input').value = '';
  byId('Output').innerText = '';

  section.getElementsByTagName('h1').innerText = algorithm.title;
  const description = section.getElementsByTagName('aside')[0];
  description.textContent = '';
  algorithm.description.forEach(element => {
    if (element.tag !== undefined) {
      description.append(createElement(element.tag, element.content));
    } else {
      description.append(createTextNode(element));
    }
  });
}
