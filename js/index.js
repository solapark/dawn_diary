/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        window.onload = function(){
          printTime();
        };

        $(document).on( "pagecontainershow", function(){
            ScaleContentToDevice();
        });
        $(window).on("resize orientationchange", function(){
                ScaleContentToDevice();
        });

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    printTime:function() {
                  var clock = document.getElementById("clock");            // 출력할 장소 선택
                  var now = new Date();                                                  // 현재시간
                  var nowTime = now.getFullYear() + "년 " + (now.getMonth()+1) + "월 " + now.getDate() + "일</br>" + "새벽 " + now.getHours() + "시 " + now.getMinutes() + "분입니다.";
                  clock.innerHTML = nowTime;           // 현재시간을 출력

                  setTimeout("printTime()",1000);         // setTimeout(“실행할함수”,시간) 시간은1초의 경우 1000
    },

    ScaleContentToDevice:function(){
      var screen = $.mobile.getScreenHeight();
      var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight() - 1 : $(".ui-header").outerHeight();
      var footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight();
      var contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height();
      var content = screen - header - footer - contentCurrent;
      $(".ui-content").height(content);
      $('#head').height('95%')  ;
      $('#form').height('100%');
      $('#content').height('50%');
      /*
      		$('#subject').height('50%');
          $('#content').height('100%');
          $('#submit').height('10%');
      */
    }


};


var currentTitle = document.getElementById('current-year-month');
var calendarBody = document.getElementById('calendar-body');
var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(),1);
var dayList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
var pageFirst = first;
var pageYear;
if(first.getFullYear() % 4 === 0){
    pageYear = leapYear;
}else{
    pageYear = notLeapYear;
}

function showCalendar(){
    let monthCnt = 100;
    let cnt = 1;
    for(var i = 0; i < 6; i++){
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);
        for(var j = 0; j < 7; j++){
            if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]){
                var $td = document.createElement('td');
                $tr.appendChild($td);
            }else{
                var $td = document.createElement('td');
                $td.textContent = cnt;
                $td.setAttribute('id', cnt);
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        calendarBody.appendChild($tr);
    }
}
showCalendar();

function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}

app.initialize();
