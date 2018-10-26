/**
 * Created by ez2sarang on 15. 2. 13..
 */
emitXmlHeader = function () {
    return '<?xml version="1.0"?>\n' +
        '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
        '<ss:Worksheet ss:Name="Sheet1">\n' +
        '<ss:Table>\n\n';
};

emitXmlFooter = function() {
    return '\n</ss:Table>\n' +
        '</ss:Worksheet>\n' +
        '</ss:Workbook>\n';
};

jsonToSsXml = function (jsonObject, excelForm) {
    var row;
    var col;
    var header, body = '', footer;
    var data = typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;

    header = emitXmlHeader();
    if(null == excelForm || undefined == excelForm) {
        excelForm = {};
        for (col in data[0]) {
            types = typeOf(data[0][col]);
            excelForm[col] = {"type":'number'==types?"Number":"String"};
        }
    }

    body += '<ss:Row>\n';
    for (col in excelForm) {
        body += '  <ss:Cell>\n';
        body += '    <ss:Data ss:Type="String">';
        body += col + '</ss:Data>\n';
        body += '  </ss:Cell>\n';
    }
    body += '</ss:Row>\n';

    for (row = 0; row < data.length; row++) {
        body += '<ss:Row>\n';
        for (col in data[row]) {
            if(undefined != excelForm[col]) {
                isJson = 'string'!=typeOf(excelForm[col]);
                //console.log(String.format("{0}-{1}:isJson({2}:{3}) => ({4}:{5})", row, col, typeOf(excelForm[col]), excelForm[col], typeOf(excelForm[col]['render']), excelForm[col].render));
                body += '  <ss:Cell>\n';
                body += String.format('    <ss:Data ss:Type="{0}">', isJson ? excelForm[col].type : excelForm[col]);
                body += (isJson ? ('function' == typeOf(excelForm[col]['render']) ? excelForm[col]['render'](data[row][col]) : data[row][col] ) : data[row][col]) + '</ss:Data>\n';
                body += '  </ss:Cell>\n';
            }
        }
        body += '</ss:Row>\n';
    }
    footer = emitXmlFooter();
    return header+body+footer;
};