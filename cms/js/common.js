function openInform(msgTitle, msgText, callback) {
	$("#cms-modals-alerts-success .modal-title").html(msgTitle);
	$("#cms-modals-alerts-success .modal-body").html(msgText);
	$("#cms-modals-alerts-success").modal('show');
	$('#cms-modals-alerts-success').off('hidden.bs.modal').on('hidden.bs.modal', callback);
}

function openAlert(msgTitle, msgText, callback) {
	$("#cms-modals-alerts-danger .modal-title").html(msgTitle);
	$("#cms-modals-alerts-danger .modal-body").html(msgText);
	$("#cms-modals-alerts-danger").modal('show');
	$('#cms-modals-alerts-danger').off('hidden.bs.modal').on('hidden.bs.modal', callback);
}

function openConfirm(msgText, callback) {
    $('#cms-modals-alerts-warning').modal({
    	show: true,
        backdrop: false,
        keyboard: false
    });
    $("#cms-modals-alerts-warning .modal-body").html(msgText);
    $('#cms-modals-alerts-warning').off('click.confirm').on('click.confirm', function () {
    	var str = $("#cms-modals-alerts-warning .modal-body").html();
    	if (str == 'OK') {
    		if (callback) callback(true);
    	} else if (str == 'Cancel') {
    		if (callback) callback(false);
    	}
    });
}

/* =============================================
Comment: 모달팝업창을 오픈한다.
Return :
Usage  : winNum=01, 02, 03
============================================= */
function openModalWindow(winNum, targetUrl) {
	try{
		if (winNum == '02') {
			$('#cmsModal01').css('cursor','wait');
			$('#cmsModal01 button').prop("disabled", true);
		} else if (winNum == '03') {
			$('#cmsModal02').css('cursor','wait');
			$('#cmsModal02 button').prop("disabled", true);
		} else {
			$('#content-wrapper').css('cursor','wait');
			$('#content-wrapper button').prop("disabled", true);
		}
	} catch(e) {alert("01:"+e)}
	
	//$("#cmsModal" + winNum + " .modal-content").load(targetUrl, function(e){
	$("#cmsModal" + winNum + " .modal-body").load(targetUrl, function(e){
		$("#cmsModal" + winNum).modal('show');
		
		try{
			if (winNum == '02') {
				$('#cmsModal01 button').prop("disabled", false);
				$('#cmsModal01').css('cursor','default');
			} else if (winNum == '03') {
				$('#cmsModal02 button').prop("disabled", false);
				$('#cmsModal02').css('cursor','default');
			} else {
				$('#content-wrapper button').prop("disabled", false);
				$('#content-wrapper').css('cursor','default');
			}
		} catch(e) {alert("02:"+e)}
	});
}

function closeModalWindow(winNum) {
	$("#cmsModal" + winNum).modal('hide');
}

/* =============================================
 * 총길이가 nLen이 될때까지 문자의 앞에 paddingChar를 추가한다.
 * 입력문자가 주어진 자릿수보다 크면 그대로 리턴한다.
 * @param str
 * @param nLen
 * @param paddingChar
 * @return
 * ex) pad(123, 7, '*') ==> ****123
 ============================================= */
function pad(str, nLen, paddingChar) {
	str = str.toString();
	if (str.length >= nLen)
		return str;
	
	return str.length < nLen ? pad(paddingChar + str, nLen, paddingChar) : str;
}

/* =============================================
Comment: 문자열 왼쪽의 공백을 없애주는 함수
Return :
Usage  :
============================================= */
function ltrim(ohs) {
	var str;
	str=ohs;
	if(str.charAt(0)==" ") {
		str=str.substring(1);
		return ltrim(str);
	} else {
		return str;
	}
}
 
/* =============================================
Comment: 문자열 오른쪽의 공백을 없애주는 함수
Return :
Usage  :
============================================= */
function rtrim (str) {
	if (isEmpty(str)) {
		return "";
	}
	
	var pos = str.length - 1;
	
	while (str.charAt(pos) == " ") {
		pos--;
	}
	
	return str.substring(0, pos + 1);
}

/* =============================================
Comment: 문자열 양끝의 공백을 없애주는 함수
Return :
Usage  :
============================================= */
function trim (str) {
	return rtrim(ltrim(str));
}

/* =============================================
Comment: 문자열이 비어 있으면 true를 리턴
Return :
Usage  :
============================================= */
function isEmpty(ohs) {
	if (ohs==null || ltrim(ohs)=="") {
		return true;
	} else {
		return false;
	}
}

/* =============================================
Comment: 문자열이 숫자이면 true를 리턴
Return :
Usage  :
============================================= */
function isNum(ohs) {
    if(isEmpty(ohs)) {
        return false;
    }
    if ((ohs.charAt(0)!='-') && (ohs.charAt(0)<'0'||ohs.charAt(0)>'9')) { //음수일경우
        return false;
    }
    for (var i=1; i<ohs.length; i++) {
        if (ohs.charAt(i)<'0' || ohs.charAt(i)>'9') {
            return false;
        }
    }

    return true;
}

/* =============================================
Comment: Key Event에서 숫자만 입력받게 함
Return :
Usage  : onkeyup="onlyNum(this);" onchange="onlyNum(this);"
============================================= */
function onlyNum(obj) {
	var str = obj.value;
	obj.value = str.replace(/[^0-9]/g,'');
}

/* =============================================
Comment: Key Event에서 숫자만 입력받게 함(.포함)
Return :
Usage  :
============================================= */
function onlyNumAndComma(obj) {
	var str = obj.value;
	obj.value = str.replace(/[^0-9.]/g,'');
}

/* =============================================
Return :
Usage  :
============================================= */
function openWindow(url, winName, winWidth, winHeight, winOptions) {
	var posX=0;
	var posY=0;
	var nWidth=Number(winWidth);
	var nHeight=Number(winHeight);

	if (screen.width>nWidth) {
		posX=(screen.width-nWidth)/2;
	} else {
		nWidth=screen.width;
	}

	if (screen.height>nHeight) {
		posY=(screen.height-nHeight)/2;
	} else {
		nHeight=screen.height;
	}

	winProps="width="+nWidth+", height="+nHeight+", top="+posY+", left="+posX+", "+winOptions;

	window.open(url,winName,winProps);
}

/* =============================================
 * 숫자를 주어진 길이의 문자열로 바꾼다.
 * 앞빈칸은 fillChar으로 채운다.
 * 숫자값이 주어진 자릿수보다 크만 뒤의숫자는 짤린다.
 * @param nDigit
 * @param nLen
 * @param fillChar
 * @return
 * ex) digitToString(123, 7, '*') ==> ****123
 ============================================= */
function digitToString(nDigit, nLen, fillChar) {
	var str = "";
	var n = Math.pow(10, nLen);
	var nDigitLen = nDigit.toString().length;

	if (nDigit >= n) {
		str = nDigit.toString().substring(0, nLen);
	} else {
		//n += nDigit;
		//str = n.toString().substring(1);
		for(i=0; i < (nLen - nDigitLen); i++) {
			str = str.concat(fillChar);
		}
		str = str.concat(nDigit.toString());
	}

	return str;
}

/* =============================================
Comment: 숫자에 콤마를 추가한다.
Return :
Usage  : <input type="text" name="won" onkeypress="onlyNum();" style="ime-mode:disabled;"
				 onKeyUp="this.value=toCurrencyFormat(this.value)">
============================================= */
function toCurrencyFormat(s) {
	if(ltrim(s) == "0") {
		return ltrim(s);
	}

	var str  = s.replace(/\D/g,"");
	var len  = str.length;
	var tmp  = "";
	var tm2  = "";
	var i    = 0;

	while (str.charAt(i) == '0') i++;
	str = str.substring(i,len);
	len = str.length;
	if(len < 3) {
		return str;
	} else {
		var sit = len % 3;
		if (sit > 0) {
			tmp = tmp + str.substring(0,sit) + ',';
			len = len - sit;
		}
		while (len > 3) {
			tmp = tmp + str.substring(sit,sit+3) + ',';
			len = len - 3;
			sit = sit + 3;
		}
		tmp = tmp + str.substring(sit,sit+3) + tm2;
		str = tmp;
	}
	return str;
}

/* =============================================
Comment: 변수의 콤마를 제거한다.
Return :
Usage  :
============================================= */
function removeComma(val) {
	str = "";
	strr = val.split(",");
	for (r=0;r<strr.length;r++){
		str += strr[r];
	}
	return str;
}

/* =============================================
Comment: 문자열 str1중에서 str2를 str3로 변환.
Return :
Usage  :
============================================= */
function replace(str1, str2, str3) {
	var temp;
	var nPos = -1;
	temp = "" + str1;
	while ((nPos = temp.indexOf(str2)) > -1) {
		temp = "" + (temp.substring(0, nPos) + str3 + temp.substring((nPos + str2.length), temp.length));
	}

	return temp;
}

/* =============================================
Comment: str1의 문자열을 str2의 태그로 둘러쌓인 문자열로 반환한다.
Return :
Usage  :
============================================= */
function setTagValue(str1, str2) {
	var rValue = "";

	if(str1 != null && !isEmpty(str2)) {
		rValue = "<" + str2 + ">" + str1 + "</" + str2 + ">";
	}

	return rValue;
}

/* =============================================
Comment: str1의 문장중 str2의 태그로 둘러쌓인 문자열을 반환한다
Return :
Usage  :
============================================= */
function getTagValue(str1, str2) {
	var rValue = "";
	var n1=str1.indexOf("<"+str2+">");
    var n2=str1.indexOf("</"+str2+">");

    if (n1 >= 0 && n2 >= 0) {
		rValue = str1.substring(n1 + 2 + str2.length, n2);
    }

    return rValue
}


/* =============================================
Comment: str1의 문장중 str2의 태그로 둘러쌓인
		 문자열들을 배열로 반환한다
Return :
Usage  :
============================================= */
function getTagValues(str1, str2) {
	var arrEvent = new Array();
	var nFrom = 0;
	var nCnt = 0;

	while (true) {
        var n1=str1.indexOf("<"+str2+">",nFrom);
        var n2=str1.indexOf("</"+str2+">",nFrom);
        if (n1 >= 0 && n2 >= 0) {
			arrEvent[nCnt] = str1.substring(n1 + 2 + str2.length, n2);
        } else {
            break;
        }

        nFrom = n2 + 3 + str2.length;
        nCnt++;
    }

    return arrEvent;
}


/* =============================================
Comment: cursor 모양을 컨트롤한다.
Return :
Usage  :
============================================= */
function setBodyCursor(cursorType) {
    document.body.style.cursor = cursorType;
}

function setCursor(objectName, cursorType) {
    document.all(objectName).style.cursor = cursorType;
}


/* =============================================
Comment: 윈도의 크기를 변화시킨다.
         입력 사이즈가 음수이면 현재 윈도사이즈,
         true 이면 창을 가운데로 위치시킨다.
Return :
Usage  : resizeWindow(-1, 500, true);
============================================= */
function resizeWindow(nWidth, nHeight, isCenter) {
	if (nWidth > 0) {
    	if (nWidth > screen.width) {
    		nWidth = screen.width;
    	}
    } else {
    	nWidth = document.body.clientWidth;
    }
    
    if (nHeight > 0) {
    	if (nHeight > screen.height) {
    		nHeight = screen.height;
    	}
    } else {
    	nHeight = document.body.clientHeight;
    }
    
    var posX=0;
    var posY=0;
	if (isCenter) {
        posX = (screen.width - nWidth) / 2;
		posY = (screen.height - nHeight) / 2;
		
        window.moveTo(posX, posY);
    }

    window.resizeBy(nWidth - document.body.clientWidth, nHeight - document.body.clientHeight);
    
    if (isCenter) { //창크기때문에 이동이 덜 되었을때 대비 재이동
        window.moveTo(posX, posY);
    }
}


/* =============================================
Comment: 객체의 속성리스트를 보여준다(개발시 사용).
Return :
Usage  : getObjectAttributes(document.body);
============================================= */
function getObjectAttributes(obj) {
    attWin = window.open("" , "attWin", "width=800, height=700,resizable=yes,scrollbars=yes");
    attWin.document.write("속성:" + obj + "<br><br>");

    for (p in obj) {
        attWin.document.write(p + ": ") + attWin.document.write(obj[p] + "<br>");
    }
}


/* =============================================
Comment: 날짜 형식을 변환한다(2004-11-11 --> 20041111)
Return :
Usage  : 
============================================= */
function convertDateFormat(formName, element1, element2) {
	var theForm = document.all(formName);
	theForm.all(element1).value = ltrim(replace(theForm.all(element2).value, "-", ""));
}


/* =============================================
Comment: 문자열중 숫자만 남기고 모두 제거한다(2005-05-19 --> 20050519)
Return :
Usage  : 
============================================= */
function getNumberOnly(str) {
	var numStr = "";
	
	var ch;
	for (var i = 0; i < str.length; i++) {
		ch = str.charAt(i);
        if (ch >= '0' && ch <='9') {
            numStr = numStr.concat(ch);
        }
    }

	return numStr;
}


/* =============================================
Comment: 문자열의 바이트 길이를 리턴한다.(한글=2byte,영숫자=1byte)
Return :
Usage  : 
============================================= */
function getByteLength(p1) {
	var len = 0;
	var str = p1.substring(0);
	
	if(str == null) return 0;
	
	for(var i = 0; i < str.length; i++) {
		var ch = escape(str.charAt(i));
		
		if(ch.length == 1) len++;
		else if(ch.indexOf("%u") != -1) len += 3;  // 한글 등 2bytes문자 - 기본은 2bytes이나 오라클이 UTF-8로 인코딩할 경우엔 3bytes로 처리하므로 +3
		else if(ch.indexOf("%") != -1) len += ch.length / 3; // 특수문자 등
	}
	
	return len;
}


/* =============================================
Comment: inputObj의 날짜값을 targetObj에 8자리 숫자로 표시한다.
Return :
Usage  : 
============================================= */
function setDate(inputObj, targetObj) {
	var dateStr = getNumberOnly(inputObj.value);
	
	if (!isValidDate(dateStr)) {
		openWarningMessageWindow('입력 값이 날짜 형식에 맞지 않습니다<br>가능예)<br>2009-05-19, 2009/05/19, 20090519 등..');
		targetObj.value = "";
		inputObj.value = "";
        inputObj.select();
        return;
	}

	targetObj.value = dateStr;
	inputObj.value = dateStr.substr(0, 4) + "-" + dateStr.substr(4, 2) + "-" + dateStr.substr(6, 2);
}


/* =============================================
Comment: 날짜형식이 맞는지 체크한다.
Return :
Usage  : 
============================================= */
function isValidDate(yyyymmdd) {
	yyyymmdd = getNumberOnly(yyyymmdd);
	if (yyyymmdd.length != 8) {
		return false;
	}
	
	var mm = parseInt(yyyymmdd.substr(4, 2), 10);
	if (mm < 1 || mm > 12) {
		return false;
	}

	var yyyy = yyyymmdd.substr(0, 4);
	mm = mm -1;
	var dd = parseInt(yyyymmdd.substr(6, 2), 10);
	var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
        end[1] = 29;
    }
    return (dd >= 1 && dd <= end[mm]);
}

/*******************************
 * 디자인
 *******************************/
// SNB영역 토글메뉴
function snb_style(div_i,className){			
	for(i=1;i<=100;i++){ 					
		if(document.getElementById("snb_menu"+i)!=null){ //div변경
			if(i==div_i){
				document.getElementById("snb_menu"+i).style.display='block';
			}else{
				document.getElementById("snb_menu"+i).style.display='none';
			}
		}
	}
}

function menu_on(div_i,className){			
	for(i=1;i<=20;i++){ 					
		if(document.getElementById("menu"+i)!=null){ //div변경
			if(i==div_i){
				document.getElementById("menu"+i).className='menu02';
			}else{
				document.getElementById("menu"+i).className='menu01';
			}
		}
	}
}

// 서브 메뉴 마우스 오버 영역
function ImageOver(imgEL){
	imgEL.src = imgEL.src.replace("_off.gif", "_on.gif");
}
function ImageOut(imgEL){
	imgEL.src = imgEL.src.replace("_on.gif", "_off.gif");
}

/**
 * Usage :
 * String.format( "no tokens<br />" );
 * String.format( "one token, no args ({0})<br />" );
 * String.format( "one token, one args ({0})<br />", "arg1" );
 * String.format( "one tokens, two args ({0})<br />", "arg1", "arg2" );
 * String.format( "two tokens, two args ({0},{1})<br />", "arg1", "arg2" );
 * String.format( "two tokens swapped, two args ({1},{0})<br />", "arg1", "arg2" );
 * String.format( "four tokens interwoven, two args ({0},{1},{0},{1})<br />", "arg1", "arg2" );
 * @param text
 * @returns
 */
String.format = function( text )
{
    //check if there are two arguments in the arguments list
    if ( arguments.length <= 1 )
    {
        //if there are not 2 or more arguments there's nothing to replace
        //just return the original text
        return text;
    }
    if('array' == typeOf(arguments[1])) {
		return eval(String.format("String.format('{0}',", arguments[0])+String.format("'{0}')", arguments[1].join("','")));
    } else {
    	//decrement to move to the second argument in the array
    	var tokenCount = arguments.length - 2;
    	for( var token = 0; token <= tokenCount; token++ )
    	{
    		//iterate through the tokens and replace their placeholders from the original text in order
    		text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ), arguments[ token + 1 ] );
    	}
    	return text;
    }
};
/**
 * String을 잘라서 배열로 리턴
 * @param text
 * @param ranges array,number type은 substring으로 리턴 그외타입은 ranges값 그대로 array에 담는다.
 * @returns array type
 */
function split(text,ranges) {
	result = new Array();
    if ( ranges == undefined || ranges.length == undefined )
    {
    	result.push(text);
        return result;
    }
    try {
	    for( var i = 0; i < ranges.length; i++ )
	    {
	    	if(typeOf(ranges[i]) == 'array') {
	    		result.push(text.substring(ranges[i][0],ranges[i][1]));
	    	} else if(typeOf(ranges[i]) == 'number'){
	    		result.push(text.substring(ranges[i]));
	    	} else {
	    		result.push(ranges[i]);
	    	}
	    }
	} catch (e) {
	}
    return result;
}
/**
 * 인자값을 타입형태를 문자로 리턴한다.
 * @param value
 * @returns
 */
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}
/**
 * 널 또는 선언되지 않았거나 빈값을 체크한다.
 * @param obj
 * @returns {Boolean}
 */
function isNull(obj) {
	var value;
	try {
		value = obj.value;
		if(undefined == value) {
			value = obj.val();
		}
	} catch (e) {
		//alert(e);
	}
	if(obj==null||obj==undefined||value==null||value==undefined||Trim(value)=='') {
		if ( arguments.length > 1 ) {
			openInform(arguments[1]);
		}
		try {
			obj.select();
			obj.focus();
		} catch (e) {
			//alert('처리중 오류:'+e);
		}
		return true;
	} else {
		return false;
	}
}

/**
 * 숫자검사
 * @returns {Boolean}
 */
function isNumeric(obj) {
	var value;
	try {
		value = obj.value;
		if(undefined == value) {
			value = obj.val();
		}
		if(value.length==0) {
			value = ' ';
		}
	} catch (e) {
		//alert(e);
	}
	var re = /[^0-9]/gi;
	
	if(re.test(value)) {
		if ( arguments.length > 1 ) {
			openInform(arguments[1]);
		}
		try {
			obj.select();
			obj.focus();
		} catch (e) {
			//alert('처리중 오류:'+e);
		}
		return false;
	} else {
		return true;
	}
}

function Trim(arg) {
    return arg.replace(/(^\s*)|(\s*$)/g, "");
}

function GenerateAlertDiv() {
    $(document.body)
    .append(/*Success*/
        $('<div id="cms-modals-alerts-success" class="modal modal-alert modal-success fade" data-backdrop="static">')
        .append(
            $('<div class="modal-dialog">')
            .append(
                $('<div class="modal-content">')
                .append(
                    $('<div class="modal-header">')
                    .append($('<i class="fa fa-check-circle">'))
                )
                .append(
                    $('<div class="modal-title">')
                )
                .append(
                    $('<div class="modal-body">')
                )
                .append(
                    $('<div class="modal-footer">')
                    .append($('<button type="button" class="btn btn-success">').on("click", function(){$('#cms-modals-alerts-success').modal('hide');}).text("OK"))
                )
            )
        )
    )
    .append(/*Danger*/
        $('<div id="cms-modals-alerts-danger" class="modal modal-alert modal-danger fade" data-backdrop="static">')
        .append(
            $('<div class="modal-dialog">')
            .append(
                $('<div class="modal-content">')
                .append(
                    $('<div class="modal-header">')
                    .append($('<i class="fa fa-times-circle">'))
                )
                .append(
                    $('<div class="modal-title">')
                )
                .append(
                    $('<div class="modal-body">')
                )
                .append(
                    $('<div class="modal-footer">')
                    .append($('<button type="button" class="btn btn-danger">').on("click", function(){$('#cms-modals-alerts-danger').modal('hide');}).text("OK"))
                )
            )
        )
    )
    .append(/*Warning*/
        $('<div id="cms-modals-alerts-warning" class="modal modal-alert modal-warning fade">')
        .append(
            $('<div class="modal-dialog">')
            .append(
                $('<div class="modal-content">')
                .append(
                    $('<div class="modal-header">')
                    .append($('<i class="fa fa-warning">'))
                )
                .append(
                    $('<div class="modal-title">').text("Confirmation")
                )
                .append(
                    $('<div class="modal-body">')
                )
                .append(
                    $('<div class="modal-footer">')
                    .append($('<button type="button" class="btn btn-default" id="confirmFalse" data-dismiss="modal">').on("click", function(){$('#cms-modals-alerts-warning .modal-body').html('Cancel');}).text("Cancel"))
                    .append($('<button type="button" class="btn btn-warning" id="confirmTrue" data-dismiss="modal">').on("click", function(){$('#cms-modals-alerts-warning .modal-body').html('OK');}).text("OK"))
                )
            )
        )
    )
    ;
}

function getResultJson(jsonObj, groupCode, detailCode, property) {
    try {
        var findJson = jQuery.grep(eval("jsonObj." + groupCode), function (obj) {
            return obj.code === detailCode;
        }).pop();
        return undefined == property ? findJson : eval("findJson." + property);
    } catch (e) {
        //alert("e:"+e);
        return "";
    }
}

function callbackCommonCode(groupCode, callback) {
    $.ajax({
        type: "POST"
        , url: ctxRoot+"/assets/getCommonCode.do"
        , data: {groupCode:groupCode}
        , async: false
        , beforeSend: function(xhr) {
            xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
        }
        , success: function(json){
            callback(json);
        }
        , error: function(jqXHR, textStatus, errorThrown){
            openAlert('<spring:message code="open.alert.fail"/>', 'Failure:' + this.data+"<br>"+textStatus+"<br>"+errorThrown);
        }
    });
}