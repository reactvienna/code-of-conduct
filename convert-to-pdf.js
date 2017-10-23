const convertToPDF = require('markdown-pdf');
const through2 = require('through2');
const prompt = require('prompt');

const extra = `
## The Less Quick Version

Read the full Code of Conduct at **github.com/ReactVienna/code-of-conduct**!
`

const convert = (phones) => {
  console.log('Starting conversion to PDF...');
  convertToPDF({
    preProcessMd: () => through2(function (chunk, enc, callback) {
      const string = chunk.toString();
      // Cut everything after "The less quick version"
      let short = string.substring(0, string.indexOf('The Less Quick Version')); 
      short = `${short}${extra}`
      // Insert phone numbers
      const text = "There'll always be at least one of them at any ReactVienna-sponsored space.";
      const index = short.indexOf(text);
      const before = short.substring(0, index);
      const after = short.substring(index);
      const numbers = `You can also call them:\n${phones.map(data => `- ${data.name}: ${data.phone}`).join('\n')}\n\n`;
      this.push(before + numbers + after);
      callback();
    }),
  }).from('./readme.md').to('./readme.pdf', () => {
    console.log('Conversion to PDF finished, check readme.pdf');
  });
}

const schema = {
  properties: {
    name: {
      description: 'Enter the full name of an organizer. (e.g. Max Mustermann)'
    },
    phone: {
      description: 'Enter their phone number, including country code (e.g. +43 664 1231231).'
    },
    more: {
      description: 'Do you want to add another phone number? ("true" or "false")',
      type: 'boolean'
    }
  }
};

const phones = [];

const askForPhone = () => {
  prompt.get(schema, (err, result) => {
    if (err) return console.error('\n\nError:', err.message);

    phones.push(result);

    if (result.more) {
      askForPhone();
    } else {
      convert(phones);
    }
  })
}

prompt.start();
askForPhone();
