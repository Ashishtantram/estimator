myApp.controller('masterShapeCtrl', function ($scope, $http, $timeout, $uibModal, masterShapeService) {

    // *************************** default variables/tasks begin here ***************** //
    //- to show/hide sidebar of dashboard 
    $scope.$parent.isSidebarActive = false;
    $scope.showSaveBtn = true;
    $scope.showEditBtn = false;
    $scope.shapeVariables = [];

    // *************************** default functions begin here  ********************** //
    //- get data to generate material tree structure dynamically 
    $scope.getShapeData = function () {
        masterShapeService.geShapeData(function (data) {
            $scope.shapeData = data;
        });
    }
    //- get all variables to add in shape 
    $scope.getVariablesData = function () {
        masterShapeService.getVariablesData(function (data) {
            $scope.variablesData = data;
        });
    }


    // *************************** functions to be triggered form view begin here ***** //

    $scope.createOrEditShapeData = function (operation, shape) {
        masterShapeService.createOrEditShapeData(operation, shape, function (data) {
            $scope.formData = data.shape;
            $scope.variablesData = data.shapeVariables;
            $scope.showSaveBtn = data.saveBtn;
            $scope.showEditBtn = data.editBtn;
        });
    }
    $scope.createOrEditShape = function (shape, shapeVariables) {
        shape.variable = shapeVariables;
        masterShapeService.createOrEditShape(shape, function (data) {
            $scope.operationStatus = "Shape added successfully";
            $scope.getShapeData();
        });
    }
    $scope.deleteShapeModal = function (shapeId, getFunction) {
        $scope.idToDelete = shapeId;
        $scope.functionToCall = getFunction;

        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/content/master/base/deleteBaseMasterModal.html',
            scope: $scope,
            size: 'md'
        });
    }
    $scope.deleteShape = function (shapeId) {
        masterShapeService.deleteShape(shapeId, function (data) {
            $scope.operationStatus = "Record deleted successfully";
            $scope.cancelModal();
            $scope.getShapeData();
        });
    }

    //- to add/remove seleted variables in the shape's-->variable array 
    $scope.addVariableToShape = function (checkboxStatus, variableName) {
        if (checkboxStatus == 'unchecked') {
            var index = _.findIndex($scope.shapeVariables, ['varName', variableName]);
            $scope.shapeVariables.splice(index, 1);
        }
        else if (checkboxStatus == 'checked') {
            var tempVarObj = {
                varName: variableName
            };
            $scope.shapeVariables.push(tempVarObj);
        }
    }

    //- to dismiss modal instance
    $scope.cancelModal = function () {
        $scope.modalInstance.dismiss();
    };

    // *************************** init all default functions begin here ************** //
    //- to initilize the default function 
    $scope.init = function () {
        $scope.getShapeData();
        $scope.getVariablesData();
    }
    $scope.init();
});