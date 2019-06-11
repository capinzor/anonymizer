var netanos = require('./Netanos.js');

var xlsx = require('xlsx');

var wb = xlsx.readFile('relatos.xlsx');

var ws = wb.Sheets['relatos'];

var data = xlsx.utils.sheet_to_json(ws);
console.log(wb.SheetNames);
console.log(data);

var newData = data.map(function(record) {
    record.relatoAn = netanos.noncontext(record.relato);
    delete record.relato
});

var newWB = xlsx.utils.book_new();
var newWs = xlsx.utils.json_to_sheet(data);
xlsx.utils.book_append_sheet(newWB, newWs, "New Data");

xlsx.writeFile(newWB, 'NuevoRelatos.xlsx');