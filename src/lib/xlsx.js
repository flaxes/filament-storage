const exceljs = require("exceljs");

function createXlsx(worksheet, columns, data) {
    const book = new exceljs.Workbook();

    const sheet = book.addWorksheet(worksheet);

    sheet.addRow(columns);

    sheet.addRows(data);

    return book;
}

module.exports = createXlsx;
