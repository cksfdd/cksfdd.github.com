window.onload = function () {
    myWish();
    checkWord();
    clickFace();
    (function () {
        var oBtn = document.getElementById("send-btn");
        var oUserName = document.getElementById("username");
        var oCon = document.getElementById("content");
        oBtn.onclick = function () {
            ajax("wish.php?act=add&username=" + oUserName.value + "&content=" + oCon.value, function (str) {
                var json = eval("(" + str + ")");
                if (json.error) {
                    alert(json.msg)
                } else {
                    window.location.reload()
                }
            })
        }
    })();
    (function () {
        var oBox = document.getElementById("main");
        ajax("wish.php?act=get", function (str) {
            var json = eval("(" + str + ")");
            console.log(str);
            if (json.error) {
                alert(json.msg)
            } else {
                var arr = json.msg;
                for (var i = 0; i < arr.length; i++) {
                    var oDl = document.createElement("dl");
                    oDl.className = "paper a" + (i % 5 + 1);
                    var oDt = document.createElement("dt");
                    var oSpan = document.createElement("span");
                    oSpan.className = "username";
                    oSpan.innerHTML = arr[i].username;
                    oDt.appendChild(oSpan);
                    var oSpan = document.createElement("span");
                    oSpan.className = "num";
                    oSpan.innerHTML = "No." + arr[i].id;
                    oDt.appendChild(oSpan);
                    oDl.appendChild(oDt);
                    var oDd = document.createElement("dd");
                    oDd.className = "content";
                    oDd.innerHTML = filterFace(arr[i].content);
                    oDl.appendChild(oDd);
                    var oDd = document.createElement("dd");
                    oDd.className = "bottom";
                    var oDate = new Date();
                    oDate.setTime(arr[i].time * 1000);
                    var s = oDate.getFullYear() + "-" + (oDate.getMonth() + 1) + "-" + oDate.getDate() + " " + oDate.getHours() + ":" + oDate.getMinutes() + ":" + oDate.getSeconds();
                    oDd.innerHTML = '<span class="time">' + s + '</span><a href="javascript:;" class="close"></a>';
                    oDl.appendChild(oDd);
                    oBox.appendChild(oDl);
                    (function (index) {
                        oDd.children[1].onclick = function () {
                            if (confirm("确认删除此心愿么?")) {
                                ajax("wish.php?act=delete&id=" + arr[index].id, function (str) {
                                    var json = eval("(" + str + ")");
                                    if (json.error) {
                                        alert(json.msg)
                                    } else {
                                        window.location.reload()
                                    }
                                })
                            }
                        }
                    })(i)
                }
                nowDrag()
            }
        })
    })()
};