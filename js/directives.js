'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('inlineName', function ($timeout) {
        return {
            scope: {
                model: '=inlineName',
                value: '=inlineValue',
                id: '=inlineId',
                handleSave: '&onSave',
                handleCancel: '&onCancel',
                handleDelete: '&onDelete'
            },
            link: function (scope, elm, attr) {
                var previousValue;
                var previousTime;

                scope.edit = function () {
                    scope.editMode = true;
                    previousValue = scope.model;
                    previousTime = scope.value;

                    $timeout(function () {
                        elm.find('input')[0].focus();
                    }, 0, false);
                };

                scope.delete = function () {
                    console.log('delete this');
                    scope.handleDelete();
                };

                scope.save = function () {
                    scope.editMode = false;
                    scope.handleSave({name: scope.model});
                };
                scope.cancel = function () {
                    scope.editMode = false;
                    scope.model = previousValue;
                    scope.value = previousTime;
                    scope.handleCancel({name: scope.model});
                };
            },
            templateUrl: 'partials/record.html'
        };
    })// On esc event
.directive('onEsc', function() {
    return function(scope, elm, attr) {
        elm.bind('keydown', function(e) {
            if (e.keyCode === 27) {
                scope.$apply(attr.onEsc);
            }
        });
    };
})
// On enter event
.directive('onEnter', function() {
    return function(scope, elm, attr) {
        elm.bind('keypress', function(e) {
            if (e.keyCode === 13) {
                scope.$apply(attr.onEnter);
            }
        });
    };
});
