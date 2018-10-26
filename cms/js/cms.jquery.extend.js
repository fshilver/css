var validateMethod = $.fn.validate;
$.fn.validate = function (o) {
    if (o && o.rules) {
        for (var name in o.rules) {
            var rule = o.rules[name];
            if (rule.required == true) {
                var label = $("label[for='" + name + "']");
                label.text(label.text() + "(*)");
            }
        }
    }
    return $.proxy(validateMethod, this)(o);
};

$.isBlank = function(obj) {
    return (!obj || $.trim(obj) === "");
};

/**
 * Created by ez2sarang on 2014. 9. 18..
 */
jQuery.extend({
    stringify: function stringify(obj) {
        if ("JSON" in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';

            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v + '"';
                    } else if (t == "object" && v !== null) {
                        v = jQuery.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }

            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});

jQuery.fn.dataTableExt.oApi.fnFakeRowspan = function ( oSettings, iColumn, bCaseSensitive ) {
    /* Fail silently on missing/errorenous parameter data. */
    if (isNaN(iColumn)) {
        return false;
    }

    if (iColumn < 0 || iColumn > oSettings.aoColumns.length-1) {
        alert ('Invalid column number choosen, must be between 0 and ' + (oSettings.aoColumns.length-1));
        return false;
    }

    bCaseSensitive = (typeof(bCaseSensitive) != 'boolean' ? true : bCaseSensitive);

    function fakeRowspan () {
        var firstOccurance = null,
            value = null,
            rowspan = 0;
        jQuery.each(oSettings.aoData, function (i, oData) {
            var val = oData._aData[iColumn],
                cell = oData.nTr.childNodes[iColumn];
            /* Use lowercase comparison if not case-sensitive. */
            if (!bCaseSensitive) {
                val = val.toLowerCase();
            }
            /* Reset values on new cell data. */
            if (val != value) {
                value = val;
                firstOccurance = cell;
                rowspan = 0;
            }

            if (val == value) {
                rowspan++;
            }

            if (firstOccurance !== null && val == value && rowspan > 1) {
                oData.nTr.removeChild(cell);
                firstOccurance.rowSpan = rowspan;
            }
        });
    }

    oSettings.aoDrawCallback.push({ "fn": fakeRowspan, "sName": "fnFakeRowspan" });

    return this;
};