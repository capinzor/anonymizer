const netanos = require('./Netanos.js');
const xlsx = require('xlsx');

const path = './docs/relatos.xlsx';
const column = 'relato2';
const sheet = 1;

const newName = (path) => {
  path = path.split('/');
  let [name, extension] = path.pop().split('.');
  return `${path.join('/')}/${name}_${Date.now()}.anonymized.${extension}`;
}

const wb = xlsx.readFile(path);

const ws = wb.Sheets[wb.SheetNames[sheet - 1]];

const data = xlsx.utils.sheet_to_json(ws);

data.map(record => record[column] = netanos.noncontext(record[column]));

const newWB = xlsx.utils.book_new();
const newWs = xlsx.utils.json_to_sheet(data);

xlsx.utils.book_append_sheet(newWB, newWs, 'New Data');

xlsx.writeFile(newWB, newName(path));
