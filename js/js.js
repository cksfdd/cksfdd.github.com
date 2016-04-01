addReady(function () {
    /*
    ** nav
    */
    (function () {
        var oNav = document.getElementById('nav');
        var oDiv = oNav.getElementsByTagName('div')[0];
        var oUl = oNav.getElementsByTagName('ul')[0];
        var aLi = oUl.getElementsByTagName('li');
        for (var i = 0; i < aLi.length; i++) {
            nav(aLi[i]);
        }
        nav(oDiv);

        function nav(obj) {
            var timer1 = null;
            var timer2 = null;
            var t = 0;
            var aSpan = obj.getElementsByTagName('span');
            obj.onmouseenter = function () {
                clearInterval(timer1);
                clearInterval(timer2);
                this.style.color = '#6e6f6f';
                timer1 = setInterval(function () {
                    if (t >= 5) {
                        t = 5;
                        clearInterval(timer1);
                        return;
                    }
                    t++;
                    aSpan[0].style.left = aSpan[0].offsetLeft - t + 'px';
                    aSpan[1].style.left = aSpan[1].offsetLeft + t + 'px';
                    aSpan[0].style.opacity = t / 5;
                    aSpan[0].style.opacity = 'alpha(opacity:' + t / 5 * 100 + ')';
                    aSpan[1].style.opacity = t / 5;
                    aSpan[1].style.filter = 'alpha(opacity:' + t / 5 * 100 + ')';
                }, 30);
            };
            obj.onmouseleave = function () {
                clearInterval(timer1);
                clearInterval(timer2);
                this.style.color = '#000';
                timer2 = setInterval(function () {
                    if (t <= 0) {
                        t = 0;
                        clearInterval(timer2);
                        return;
                    }
                    aSpan[0].style.left = aSpan[0].offsetLeft + t + 'px';
                    aSpan[1].style.left = aSpan[1].offsetLeft - t + 'px';
                    t--;
                    aSpan[0].style.opacity = t / 5;
                    aSpan[0].style.opacity = 'alpha(opacity:' + t / 5 * 100 + ')';
                    aSpan[1].style.opacity = t / 5;
                    aSpan[1].style.filter = 'alpha(opacity:' + t / 5 * 100 + ')';
                }, 30);
            };
        }
    })();

    (function () {
        var oNav = document.getElementById('nav');
        var oNav_mask = document.getElementById('nav_mask');
        var oNav_div = document.getElementById('nav_div');
        var oT = oNav.offsetTop;
        /*
        ** 导航吸顶条
        */
        var bOk=false;
        window.onscroll = function () {
            if(bOk){
                clearInterval(timer);
            }
            bOk=true;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (window.navigator.userAgent.indexOf('MSIE 6.0') != -1) {
                if (oT <= scrollTop) {
                    oNav.style.position = 'absolute';
                    oNav.style.top = scrollTop + 'px';
                    oNav_mask.style.display = 'block';
                    oNav_div.style.visibility = 'visible';
                } else {
                    oNav.style.position = 'relative';
                    oNav.style.top = '0';
                    oNav_mask.style.display = 'none';
                    oNav_div.style.visibility = 'hidden';
                }
            } else {
                if (oT <= scrollTop) {
                    oNav.style.position = 'fixed';
                    oNav.style.top = '0';
                    oNav_mask.style.display = 'block';
                    //oNav_div.style.display='block';
                    oNav_div.style.visibility = 'visible';
                } else {
                    oNav.style.position = 'relative';
                    oNav.style.position = '0';
                    oNav_mask.style.display = 'none';
                    //oNav_div.style.display='none';
                    oNav_div.style.visibility = 'hidden';
                }
            }
        };
        /*
        ** 回到页面顶端
        */
        var oHeader = document.getElementById('header');
        var timer = null;
        addEvent(oNav_div, 'click', function () {
            go(oHeader);
        });
        /*
        ** 去到作品当前页
        */
        var oNav_project = document.getElementById('nav_project');
        var oProject = document.getElementById('project');
        oNav_project.onclick = function () {
            go(oProject);
        };
        /*
        ** 去到个人信息当前页
        */
        var oNav_myself = document.getElementById('nav_myself');
        var oMyself = document.getElementById('myself');
        oNav_myself.onclick = function () {
            go(oMyself);
        };
        /*
        ** 去到写作当前页
        */
        var oNav_write = document.getElementById('nav_write');
        var oWrite = document.getElementById('write');
        oNav_write.onclick = function () {
            go(oWrite);
        };
        /*
        ** 去到获奖当前页
        */
        var oNav_awards = document.getElementById('nav_awards');
        var oAwards = document.getElementById('awards');
        oNav_awards.onclick = function () {
            go(oAwards);
        };
        /*
        ** 去到技能当前页
        */
        var oNav_skills = document.getElementById('nav_skills');
        var oSkills = document.getElementById('skills');
        oNav_skills.onclick = function () {
            go(oSkills);
        };
        /*
        ** 去到联系方式当前页
        */
        var oNav_contact = document.getElementById('nav_contact');
        var oContact = document.getElementById('contact');
        var btn_con=document.getElementById('btn_con');
        btn_con.onclick=function(){
            go(oContact);
        };
        oNav_contact.onclick = function () {
            go(oContact);
        };

        /*
        **　函数封装
        */
        function go(obj) {
            clearInterval(timer);
            var iSpeed = 0;
            timer = setInterval(function () {
                bOk=false;
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                iSpeed = (obj.offsetTop - scrollTop) / 13;

                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                if (scrollTop == obj.offsetTop) {
                    clearInterval(timer);
                    iSpeed=0;
                } else {
                    document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
                }
            }, 30);
        }

    })();
    /*
    ** banner
    */
    (function(){
        var oRound=document.getElementById('banner_round');
        for(var i=0;i<10;i++){
            var oS=document.createElement('span');
            oRound.appendChild(oS);
            oS.className='on';
            oS.style.WebkitTransform='rotate('+360*i/10+'deg)'
        }
    })();
    /*
    ** project
    */
    (function () {
        var oUl = document.getElementById('project_ul');
        var aLi = oUl.children;
        for(var i=0;i<aLi.length;i++){
            through(aLi[i]);
        }
        function a2d(n){
            return n*180/Math.PI;
        }
        //三角函数计算判断位置
        function hoverDir(obj,ev){
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            var w = obj.offsetWidth;
            var h = obj.offsetHeight;
            var x = obj.offsetLeft+w/2-ev.clientX;
            var y = obj.offsetTop+h/2-scrollTop-ev.clientY;
            //计算公式
            return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
        }
        function through(obj){
            var oS = obj.children[1];
            //鼠标移入的时候
            obj.onmouseover=function(ev){
                var oEvent = ev||event;
                var oForm = oEvent.fromElement||oEvent.relatedTarget;
                //处理onmouseover的bug
                if(this.contains(oForm))return;
                var dir = hoverDir(this,oEvent);
                //判断移入方向，设置初始位置
                switch(dir){
                    case 0:
                        //右
                        oS.style.left = '300px';
                        oS.style.top = 0;
                        break;
                    case 1:
                        //下
                        oS.style.left = 0;
                        oS.style.top = '300px';
                        break;
                    case 2:
                        //左
                        oS.style.left = '-300px';
                        oS.style.top = 0;
                        break;
                    case 3:
                        //上
                        oS.style.left = 0;
                        oS.style.top = '-300px';
                        break;
                }
                //运动目标点（0,0）
                startMove(oS,{'top':0,'left':0});
            };
            //鼠标移出的时候
            obj.onmouseout=function(ev){
                var oEvent = ev||event;
                var oTo = oEvent.toElement||oEvent.relatedTarget;
                //处理onmouseout的bug
                if(this.contains(oTo))return;
                var dir = hoverDir(this,oEvent);
                //判断移出方向，运动至目标点
                switch(dir){
                    case 0:
                        //右
                        startMove(oS,{left:300,top:0});
                        break;
                    case 1:
                        //下
                        startMove(oS,{left:0,top:300});
                        break;
                    case 2:
                        //左
                        startMove(oS,{left:-300,top:0});
                        break;
                    case 3:
                        //上
                        startMove(oS,{left:0,top:-300});
                        break;
                }
            };
        }
    })();
    /*
    ** myself
    */
    (function () {
        var oBirth = document.getElementById('birth');
        var oWork = document.getElementById('work');
        var oNow = document.getElementById('now');
        change(oBirth, 'baby_hover', 'span_hover');
        change(oWork, 'work_div', 'work_span');
        change(oNow, 'now_div', 'now_span');

        function change(obj, className1, className2) {
            obj.onmousemove = function () {
                var oDiv = this.getElementsByTagName('div')[0];
                var oSpan = this.getElementsByTagName('span')[0];
                oDiv.className = className1;
                oSpan.className = className2;
            };
            obj.onmouseout = function () {
                var oDiv = this.getElementsByTagName('div')[0];
                var oSpan = this.getElementsByTagName('span')[0];
                oDiv.className = '';
                oSpan.className = '';
            };
        }
    })();

    (function () {
        var oDiv = document.getElementById('btn_con');
        oDiv.onmouseover = function () {
            this.style.background = '#fff';
            this.style.color = '#1b7ee4';
        };
        oDiv.onmouseout = function () {
            this.style.background = '#4128f5';
            this.style.color = '#fff';
        };
    })();
    /*
    ** awards
    */
    (function () {
        var oUl = document.getElementById('awards_ul');
        var aLi = oUl.getElementsByTagName('li');
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].onmouseover = function () {
                var oA = this.getElementsByTagName('a')[0];
                var oI = this.getElementsByTagName('i')[0];
                oI.className = 'awards_i';
                oA.style.borderColor = '#ccc';
            };
            aLi[i].onmouseout = function () {
                var oA = this.getElementsByTagName('a')[0];
                var oI = this.getElementsByTagName('i')[0];
                oI.className = '';
                oA.style.borderColor = '#4128f5';
            };
        }
    })();
    /*
    ** skills
    */
    (function () {
        var oUl = document.getElementById('skills_ul');
        var aLi = oUl.getElementsByTagName('li');
        show(aLi[0], 'skills_l_a');
        show(aLi[1], 'skills_c_a');
        show(aLi[2], 'skills_r_a');
        function show(obj, className) {
            obj.onmouseover = function () {
                var oA = this.getElementsByTagName('a')[0];
                oA.className = className;
            };
            obj.onmouseout = function () {
                var oA = this.getElementsByTagName('a')[0];
                oA.className = '';
            };

        }
    })();

});