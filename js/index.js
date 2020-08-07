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

app.initialize();
