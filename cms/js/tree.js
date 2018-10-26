/**
 * Created by ez2sarang on 2014. 8. 20..
 */

var treeClone;
var debug = false;
var dep = ['','▩','▩▩','▩▩▩','▩▩▩▩','▩▩▩▩▩','▩▩▩▩▩▩','▩▩▩▩▩▩▩','▩▩▩▩▩▩▩▩','▩▩▩▩▩▩▩▩▩'];
var currentTree = null;
var rootTree = null;
var treeIcon = {"minus":"icon-minus-sign","leaf":"icon-leaf"};
var orderValue = 0;
var selectTree = {
    tree : function(currentTree) {
        try {
            var tUrl = ctxRoot + "/category/infoCategoryForm.do?categoryId=" + currentTree.id;
            $('#detailViewDiv').load(tUrl);
        } catch (e) {
            alert("error:"+e);
        }
    }
    , categoryMove : function(currentTree) {
        try {
            openConfirm(requestParam['treeMove']['moveAlertMessage'], function(result) {
                if (result) {
                    try {
                        $.ajax({
                            type: "GET"
                            , url: ctxRoot + "/category/setParent.do"
                            ,
							data : {
								id : requestParam['treeMove']['parentId'],
								parentId : currentTree.id
							},
							success : function(msg) {
								if (msg == "Success") {
									if (opener == undefined) {
										location.reload();
									} else {
										opener.location.reload();
										window.close();
									}
								} else {
                                    openAlert('Fail', msg, function () {
                                    });
								}
							}
                            , error:  function (xhr, ajaxOptions, thrownError) {
                                openAlert('Fail', 'Failure');
                            }
                        });
                    } catch (e) {
                        alert(e);
                    }
                } else {
                }
            });
        } catch (e) {
            alert("error:"+e);
        }
    }
    , categorySelect : function(currentTree) {
    	$('#banner #linkInfo').val(currentTree.id);
    	closeModalWindow('02');
    }
    , categoryMultiSelect : function(currentTree) {
    	viewCategoryInfo();
    }
    , categorySelectBox : function(currentTree) {
        if(currentTree.id == '0' || currentTree.id == '') {
            openAlert('Warn', 'Please, Choose another.');
        } else {
            $('#'+requestParam['treeMove']['targetId']+" option").each(function(){
                $(this).remove();
            });

            $('#'+requestParam['treeMove']['targetId']).append($('<option>').val(currentTree.id).text(currentTree.name).attr('selected', true)).trigger('change');

            closeModalWindow('02');
        }
    }
    , menuTree : function(currentTree) {
        try {
            var tUrl = ctxRoot + "/menu/infoMenuForm.do?menuId=" + currentTree.id;
            $('#detailViewDiv').load(tUrl);
        } catch (e) {
            alert("error:"+e);
        }
    }
    , menuMove : function(currentTree) {
        try {
            openConfirm(requestParam['treeMove']['moveAlertMessage'], function(result) {
                if (result) {
                    try {
                        $.ajax({
                            type: "GET"
                            , url: ctxRoot + "/menu/setParent.do"
                            , data: {id:requestParam['treeMove']['parentId'], parentId:currentTree.id}
                            , success: function (msg) {
                                if(opener == undefined) {
                                    location.reload();
                                } else {
                                    opener.location.reload();
                                    window.close();
                                }
                            }
                            , error:  function (xhr, ajaxOptions, thrownError) {
                                openAlert('Fail', 'Failure');
                            }
                        });
                    } catch (e) {
                        alert(e);
                    }
                } else {
                }
            });
        } catch (e) {
            alert("error:"+e);
        }
    }
}

/**
 * 카테고리 또는 메뉴에서 사용되는 트리형태의 객체
 * @param treeId
 * @param treeName
 * @param parentId
 * @returns {*}
 * @constructor
 */
function Tree(tree) {
    this.id = tree.id;
    this.name = tree.name;
    this.parentId = tree.parentId;
    this.path = "";
    this.displayOrder = tree.displayOrder;
    this.visible = tree.visible;
    
    // 20150120. Added by LEE SANG-YOUB
    this.uriId = tree.uriId;
    this.leaf = tree.leaf;
    
    this.children = [];
}

/**
 * 순서와 상관없이 트리 목록을 계층구조로 만듬
 * @param treesObj
 * @returns {Array}
 */
function makeTree(treesObj) {
    var newTrees = [], roots = [];
    if (debug) {
        try {
            $("#console_sub").html("");
        } catch (e) {
        }
    }
    for (var i = 0; i < treesObj.length; i++) {
        if (parseInt(treesObj[i].parentId, 10) == rootTree.id) {
            treesObj[i].path = "/" + treesObj[i].name;
            roots.push(treesObj[i]);
            treesObj.splice(i, 1);
            i--;
        }
    }
    for (var ti = 0; ti < roots.length; ti++) {
        newTrees.push(
            appendChild(treesObj, roots[ti])
        );
    }
    return newTrees;
}

/**
 * 재귀호출로 트리 하위 노드를 추가한다.
 * @param treesObj 트리목록
 * @param tree 트리객체
 * @returns {*}
 */
function appendChild(treesObj, tree) {
    var treeObj;
    for(var idx = 0, listSize = treesObj.length; idx<treesObj.length; idx++) {
        treeObj = treesObj[idx];
        if (debug) {
            try {
                $("#console_sub").append(
                    String.format(
                        "<table>" +
                            "<tr bgcolor='" + (treeObj.parentId == tree.id ? "yellow" : "") + "'>" +
                            "<td width='200'>{0}{1}</td>" +
                            "<td width='120'>parentId:{2} - <font color='white' size='1'>{3} {4}</font></td>" +
                            "<td width='700'>{5}</td>" +
                            "<td width='150'>i:{6}</td>" +
                            "</tr>" +
                        "</table>"
                        , treesObj.length
                        , dep[tree.path.split("/ ").length-1]
                        , tree.id
                        , treeObj.parentId
                        , treeObj.id
                        , printArray(14, treesObj, idx)
                        , idx + 1
                    )
                );
            } catch (e) {
            }
        }
        if(tree.id == treeObj.parentId) {
            treeObj.path = tree.path + "/" + treeObj.name;
            if (debug) {
                try {
                    $("#console_sub").append(String.format("{0}<br/>", treeObj.path));
                } catch (e) {
                }
            }

            tree.children.push(
                appendChild(treesObj, treeObj)
            );

            var tmpIdx = -1;
            if (treesObj.length != listSize) {
                for (var i = 0, n = treesObj.length; i < n; i++) {
                    if (treeObj.id == treesObj[i].id) {
                        tmpIdx = i;
                        break;
                    }
                }
            }
            if (tmpIdx > -1) {
                treesObj.splice(tmpIdx, 1);
                idx = tmpIdx;
                idx--;
            } else {
                treesObj.splice(idx, 1);
                idx--;
            }
            listSize = treesObj.length;
        }
    }
    return tree;
}

/**
 * 트리 배열 출력
 * @param len 총길이
 * @param array 트리배열
 * @param current 현재 인덱스
 * @returns {string}
 */
function printArray(len, array, current) {
    var printer = [];
    var blank = [];
    for (var j=0; j<array.length; j++) {
        if (current == j) {
            array[j].id;
            printer.push("<td width='45' align='center' style='"+"color:red'>[" + array[j].id + "<font size='1'> -"+array[j].parentId+"</font>]</td>");
        } else {
            printer.push("<td width='45' align='center'>[" + array[j].id + "<font size='1'> -"+array[j].parentId+"</font>]</td>");
        }
    }
    for (var i=0; i<len - array.length; i++) {
        blank.push("<td width='45' align='center'>▩</td>");
    }
    return "<table><tr>"+printer.join("")+blank.join("")+"</tr></table>";
}

/**
 * Tree structure 리스트를 html 엘리먼트 객체로 반환한다.
 * @param treesObj
 * @returns {*|jQuery|HTMLElement}
 */
function makeHtmlTree(id, treesObj, parent) {
    var htmlObj = $("<ul class='ulTree'>");
    $.each(treesObj, function(i, treeObj) {
        htmlObj.append(
            $("<li id='"+treeObj.id+"' class='liTree'>")
            .append(
                $("<span>").css("background-color", treeObj.visible?"#fff":"gray")
                .on('click',function(){selectTree[id](currentTree=treeObj);})
                .html("<i class='"+(treeObj.children.length==0?treeIcon.leaf:treeIcon.minus)+"' id='nodeIcon' />"+treeObj.name+" ")
                .append(
                    $("<div class='label'>")
                        .append($("<i id='treeMenu' class='fa child fa-bars'>"))
                )
            )
            .append(makeHtmlTree(id, treeObj.children, treeObj))
        );
        treeObj.children.length = 0;
    });
    return htmlObj;
}

function loadTreeMenu() {
    if(undefined == treeMenu || null == treeMenu) {
        $(".fa-bars").remove();
    } else {
        var rootCommand = $.grep(treeMenu, function (e) {return e.id == 'add';});
        if(undefined != rootCommand && null != rootCommand) {
            $(".root.fa-bars").contextMenu(rootCommand);
        }

        try {
            if (menuOptions == undefined) {
                $(".child.fa-bars").contextMenu(treeMenu);
            } else {
                $(".child.fa-bars").contextMenu(treeMenu, menuOptions);
            }
        } catch(e) {
            $(".child.fa-bars").contextMenu(treeMenu);
        }

        try {
            $('.switcher-example-square').switcher({ theme: 'square' });
        } catch (e) {
        }
    }
}


/**
 * 1st Level의 Child node를 Open
 */
function expandFirstLevelNode()
{
	var numberOfIconMinus = $('.icon-minus-sign').length;
	for(var i = 0 ; i < numberOfIconMinus ; i++)
	{
 		var nodeChildren = $('.icon-minus-sign').eq(0).parent('span').parent('li.parent_li').find(' > .ulTree > .liTree');
 		nodeChildren.toggle('fast');
 		$('.icon-minus-sign').eq(0).parent('span').attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
 	}
}

/**
 * 트리를 html로 생성한다.
 * @param id 엘리먼트 아이디
 * @param treesObj 트리객체 목록
 */
function loadTree(id, treesObj, draggable) {
    if(null == treeClone) {
        treeClone = {}
    }
    treeClone[id] = treesObj.slice(0);
    if (debug) {
        try {
            console(id);
        } catch (e) {
        }
    }
    rootTree = undefined==rootTree||null==rootTree?rootTree=new Tree({id:0, name:"Root", parentId:0}):rootTree;
    var newTrees = makeTree(treesObj);
    $("#"+id).html("").append(
        $("<ul class='ulTree'>").append(
            $("<li class='liTree'>").attr("id",rootTree.id)
                .append(
                    $("<span>")
                    .on('click',function(){selectTree[id](currentTree=rootTree);})
                    .html("<i class='icon-home' id='rootIcon'/>"+rootTree.name+" ")
                    .append(
                        $("<div class='label'>")
                        .append($("<i id='treeMenu' class='fa root fa-bars'>"))
                    )
                )
                .append(makeHtmlTree(id, newTrees, rootTree))
        )
    );

    $('.tree .liTree:has(.ulTree)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    
    $('#rootIcon').on('click', function (e) {
    });

    
    $('.tree .liTree.parent_li > span > i').on('click', function (e) {
        var children = $(this).parent('span').parent('li.parent_li').find(' > .ulTree > .liTree');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).parent('span').attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).parent('span').attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });

    if(undefined == draggable) {
        $(".ulTree").sortable();
        $('.liTree').draggable({
            revert: 'invalid'
        });
        $('span').droppable({
            accept: '.liTree',
            tolerance: 'pointer',
            drop: function (event, ui) {
                if (ui.draggable.parent()[0] === this) {
                    //drag and drop on same ul do nothing
                    alert("not thing!");
                } else {
                    var thisParentId = $(this).parent().attr("id");
                    openConfirm(requestParam['treeMove']['moveAlertMessage'], function(result) {
                        if (result) {
                            try {
                                $.ajax({
                                    type: "GET"
                                    , url: ctxRoot + "/category/setParent.do"
                                    , data: {id:ui.draggable.attr("id"), parentId:thisParentId}
                                    , success: function (msg) {
                                        if (msg == 'Success') {
                                            for (var idx = 0; idx < treeClone[id].length; idx++) {
                                                try {
                                                    if (ui.draggable.attr("id") == treeClone[id][idx].id) {
                                                        treeClone[id][idx].parentId = thisParentId;
                                                        if (rootTree.id == parseInt(treeClone[id][idx].parentId, 10)) {
                                                            treeClone[id][idx].depth = 1;
                                                        } else {
                                                            treeClone[id][idx].depth = 0;
                                                        }
                                                    }
                                                } catch (e) {
                                                    alert("error:"+e);
                                                }
                                            }
                    						openInform('Success', msg, function() {
                    							location.reload();
                    						});
                                        } else {
                                            openAlert('Fail', msg, function () {
                                                location.reload();
                                            });
                                        }
                                        /* Otherwise
                                        loadTree(id, treeClone[id]);
                                        $('.switcher-example-square').switcher({ theme: 'square' });
                                        */
                                    }
                                    , error:  function (xhr, ajaxOptions, thrownError) {
                                        openAlert('Fail', 'Failure');

                                        loadTree(id, treeClone[id]);
                                        $('.switcher-example-square').switcher({ theme: 'square' });
                                    }
                                });
                            } catch (e) {
                                alert(e);
                            }
                        } else {
                            loadTree(id, treeClone[id]);
                            $('.switcher-example-square').switcher({ theme: 'square' });
                        }
                    });
                }
            },
            over: function (event, ui) {
                //alert('over');
            },
            out: function (event, ui) {
                //$('#log').text('out');
            },
            activate: function( event, ui ) {
                //alert('activate');
            }
        });
    }

    loadTreeMenu();
    
    expandFirstLevelNode()
}

/**
 * @param direction
 *  음의 정수 : 아래로
 *  양의 정수 : 위로
 **/
function getOrder(id, direction) {
    var orders = [];
    var tempOrder = null, step = 0, minusStep = null;
    try {
        for(idx=0; idx<treeClone[id].length; idx++) {
            if(currentTree.parentId == treeClone[id][idx].parentId) {
                if(currentTree.id == treeClone[id][idx].id) {
                    if(direction<0) {
                        if(orders.length+direction > -1) {
                            orders.splice(orders.length+direction, 0, treeClone[id][idx].id);
                        } else {
                            minusStep = treeClone[id][idx].id;
                        }
                    } else {
                        tempOrder = treeClone[id][idx].id;
                    }
                } else {
                    if(tempOrder != null) {
                        if(step == direction) {
                            orders.push(tempOrder);
                            tempOrder = null;
                        } else {
                            step++;
                        }
                    }
                    orders.push(treeClone[id][idx].id);
                }
            }
        }
        if(tempOrder != null) {
            orders.push(tempOrder);
        }
        if(minusStep != null) {
            orders.splice(0,0,minusStep);
        }
    } catch (e) {
        alert("error:"+e);
    }
    return orders.join(",");
}

/**
 * debug용
 */
function console(id) {
    $("#console").html("");
    for(var idx=0; idx<treeClone[id].length; idx++){
        $("#console").append(
            String.format(idx+"] parent={0}, id={1}, name={2}, children={3}, visible={4} <br/>", treeClone[id][idx].parentId, treeClone[id][idx].id, treeClone[id][idx].name, treeClone[id][idx].children.length, treeClone[id][idx].visible)
        );
    }
}