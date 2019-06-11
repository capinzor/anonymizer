const netanos = require('./Netanos.js');
const xlsx = require('xlsx');

const wb = xlsx.readFile('./docs/relatos.xlsx');
console.log(wb.SheetNames);

const ws = wb.Sheets['relatos'];

const data = xlsx.utils.sheet_to_json(ws);

data.map((record) => {
  record.relatoAn = netanos.noncontext(record.relato);
  delete record.relato;
});

const newWB = xlsx.utils.book_new();
const newWs = xlsx.utils.json_to_sheet(data);

xlsx.utils.book_append_sheet(newWB, newWs, "New Data");

xlsx.writeFile(newWB, './docs/relatos-anonymized.xlsx');
