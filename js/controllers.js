'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap']).
    controller('TimeCtrl', function ($scope) {
        var tw = 0;
        var td = 0;
        var th = 0;
        var tm = 0;

        var opId = 1;
        $scope.nop = {time: ''};
        $scope.ops = [];

        $scope.addOp = function () {
            document.getElementById('timeInput').focus();
            var ft = figureTime($scope.nop.time);
            //console.log(ft.w + 'w, ' + ft.d + 'd, ' + ft.h + 'h, ' + ft.m + 'm');
            tw += ft.w == '' ? 0 : parseInt(ft.w);
            td += ft.d == '' ? 0 : parseInt(ft.d);
            th += ft.h == '' ? 0 : parseInt(ft.h);
            tm += ft.m == '' ? 0 : parseInt(ft.m);
			
			// build total time
			var totalTime = buildVTime($scope.visualTime, tm, th, td, tw);
			
			//assign total time to scope variables
			$scope.visualTime = totalTime.str;
			tm = totalTime.tm;
			th = totalTime.th;
			td = totalTime.td;
			tw = totalTime.tw;
			
			//build time for new row
			var unitTime = buildVTime('', ft.m, ft.h, ft.d, ft.w);
			$scope.nop.time = unitTime.str;
			
			//add row to list
            $scope.nop.id = opId++;
            $scope.ops.push($scope.nop);
            $scope.nop = {time: ''};
        }

        $scope.updateTodo = function (name, time, id) {
            console.log('Saving id' + id + 'title' + name + ' value ' + time);
			tw = td = th = tm = 0;
            //recompute for all the rows
			for (var i = 0; i < $scope.ops.length; i++) {
                var ft = figureTime($scope.ops[i].time);
                tw += ft.w == '' ? 0 : parseInt(ft.w);
                td += ft.d == '' ? 0 : parseInt(ft.d);
                th += ft.h == '' ? 0 : parseInt(ft.h);
                tm += ft.m == '' ? 0 : parseInt(ft.m);
				
				//beautify time for every row
				var unitTime = buildVTime('', ft.m, ft.h, ft.d, ft.w);
				$scope.ops[i].time = unitTime.str;
            }
            
			//beautify for total time
			var totalTime = buildVTime($scope.visualTime, tm, th, td, tw);
			$scope.visualTime = totalTime.str;
			tm = totalTime.tm;
			th = totalTime.th;
			td = totalTime.td;
			tw = totalTime.tw;
        };

        $scope.del = function (op) {
            console.log('delete:' + op);
            for (var i = 0; i < $scope.ops.length; i++) {
                if ($scope.ops[i].id == op.id) {
                    $scope.ops.splice(i, 1);
                }
            }
            $scope.updateTodo();
        };

        $scope.cancelEdit = function (name, time) {
            console.log('Canceled editing ' + name + ' value ' + time);
        };

        var figureTime = function (t) {
			t.split(" ").join("");
			
            var w = t.split('w');
            if (w.length == 2) {
                t = w[1];
                w = w[0];
            } else {
                w = '';
            }

            var d = t.split('d');
            if (d.length == 2) {
                t = d[1];
                d = d[0];
            } else {
                d = '';
            }

            var h = t.split('h');
            if (h.length == 2) {
                t = h[1];
                h = h[0];
            } else {
                h = '';
            }
            var m = t.split('m');
            m = m[0];

            return {w: w, d: d, h: h, m: m};
        };

		var buildVTime = function (strTime, timeMin, timeHr, timeDay, timeWk) {
            strTime = '';
            if (timeMin >= 60) {
                timeHr += Math.floor(timeMin / 60);
                timeMin = timeMin % 60;
            }

            if (timeHr >= 8) {
                timeDay += Math.floor(timeHr / 8);
                timeHr = timeHr % 8;
            }

            if (timeDay >= 5) {
                timeWk += Math.floor(timeDay / 5);
                timeDay = timeDay % 5;
            }

            if (timeWk > 0) { strTime += timeWk + 'w '; }

            if (timeDay > 0) { strTime += timeDay + 'd '; }

            if (timeHr > 0) { strTime += timeHr + 'h '; }

            if (timeMin > 0) { strTime += timeMin + 'm '; }			
			return { tm:timeMin, th:timeHr, td:timeDay, tw:timeWk, str:strTime  }
        }
    });