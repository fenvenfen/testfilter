angular.module('filterDirective', [])
  //---- FILTER CITI -----
  .directive('filterCiti', [ function () {
    return {
      scope: {},
      controller: ['$scope', 'resources', 'Message', function ($scope, resources, Message) {
        // Take city from data service
        $scope.citys =  resources.getCity();

        let message = new Message({
          id_message: 99
        }, $scope);

        $scope.citys.unshift({id: 0, name: 'All city'}); // Add default value to data city

        $scope.citySelected = $scope.citys[0];  // Set Defaul value to show in option

        // --- CHANGE CITY ---
        $scope.changCity = function(){
          message.emit('filter', {
            to:{
              id_message: 99
            },
            value: {
              filter_strategy: 'city',
              filter_value:$scope.citySelected.name
            },
          });
        }

      }],
      template: function () {
        return `<div class="title_filter">CITY</div><select name="type" ng-model="citySelected" ng-dropdown ng-change="changCity()" ng-options="city.name for city in citys">
                </select>`
            }
        }  
    }])
  //---- FILTER CATEGORIES -----
  .directive('filterGategory', [ function () {
    return {
      scope: {},
      controller: ['$scope', 'resources', 'Message', function ($scope, resources, Message) {
        // Take city from data service
        $scope.categories =  resources.getGategories();

        let message = new Message({
          id_message: 99
        }, $scope);

        $scope.cards =  resources.getCards();

        $scope.categories.forEach(category => {
          let counter = 0;
          $scope.cards.forEach(card => {
            card.category == category.name ? counter += 1 : ''
          })
          category.count = counter;
        });

        $scope.selection = [];
        // Toggle selection
        $scope.toggleSelection = function toggleSelection(category) {
          var idx = $scope.selection.indexOf(category);

          // Is currently selected
          if (idx > -1) {
            $scope.selection.splice(idx, 1);
          }else {
            $scope.selection.push(category);
          }
           message.emit('filter', {
            to:{
              id_message: 99
            },
            value: {
              filter_strategy: 'category',
              filter_value: $scope.selection
            },
          });
        };
      }],
      template: function () {
        return `<div class="title_filter">CATEGORIES</div><label ng-repeat="category in categories">
        <input
          type="checkbox"
          value="{{category.name}}"
          ng-checked="selection.indexOf(category) > -1"
          ng-click="toggleSelection(category)"> {{category.name}} ({{category.count}})
          </label>`
      }
    }  
  }])
  //---- FILTER RAGE SLIDER PRICE -----
  .directive('filterRageSlider', [ '$document', function ($document) {
    return {
      scope: {
        min: '@',
        max: '@',
        precision: '@'
      },
      controller: ['$scope', '$element', 'Message', function ($scope, $element, Message) {
        const MIN = $scope.min || 0;
        const MAX = $scope.max || 100;
  
        let message = new Message({
          id_message: 99
        }, $scope);

        $scope.pointA = MIN;
        $scope.pointB = MAX;
  
        $scope.save = function () {
          if( isCorrectly() ){
            $scope.ghModel = $scope.pointA + ':' + $scope.pointB;
            message.emit('filter', {
              to:{
                id_message: 99
              },
              value: {
                filter_strategy: 'range_price',
                filter_value: $scope.ghModel
              },
            });
          }
        };
  
        $scope.changeNumber = function () {
          if( isCorrectly() ){
            setPercents();
            drawLine();
          }
        };
  
        let x, pointStart = 0;
        let point = '';
  
        const allLine = $element[0].querySelector('.gh_range_container');
        const pointAElement = allLine.querySelector('.gh_range_pointer_a');
        const pointBElement = allLine.querySelector('.gh_range_pointer_b');
        const rangeLine = allLine.querySelector('.gh_range_line');
  
        function isCorrectly() {
          return +$scope.pointA >= MIN && +$scope.pointB <= MAX && +$scope.pointA <= +$scope.pointB;
        }
  
        function allLineWidth() {
          return allLine.offsetWidth;
        }
  
        function onePercentWidth() {
          return allLineWidth() / 100;
        }
  
        function numberToPercent(number) {
          let pointsMax = MAX - MIN;
          let points = (+number) - MIN;
  
          return points * 100 / pointsMax;
        }
  
        function percentToNumber(percent) {
          let pointsMax = MAX - MIN;
  
          return (((+percent.replace('%', '')) * pointsMax / 100) + (+MIN)).toFixed($scope.precision);
        }
  
        function setPercents() {
          pointAElement.style.left = numberToPercent($scope.pointA) >= 0 ? numberToPercent($scope.pointA) + '%' : '0%';
          pointBElement.style.left = numberToPercent($scope.pointB) <= 100 ? numberToPercent($scope.pointB) + '%' : '100%';
        }
  
        setPercents();
  
        function setModelNumbers() {
          $scope.pointA = percentToNumber(pointAElement.style.left);
          $scope.pointB = percentToNumber(pointBElement.style.left);
  
          $scope.$apply();
        }
  
        function targetLeftPercent(element) {
          return +element.style.left.replace('%', '');
        }
  
        function drawLine() {
          rangeLine.style.left = pointAElement.style.left;
          rangeLine.style.width = targetLeftPercent(pointBElement) - targetLeftPercent(pointAElement) + '%';
        }
  
        drawLine();
  
        function targetLeftPX(element) {
          return (+element.style.left.replace('%', '')) * onePercentWidth();
        }
  
        function movePoint(move) {
          return move < allLineWidth() ? (move > 0 ? move / onePercentWidth() + '%' : '0%') : '100%';
        }
  
        function mouseMove(event) {
          let move = pointStart + event.x - x;
  
          switch (point) {
            case 'A':{
              if( move <= targetLeftPX(pointBElement) ){
                pointAElement.style.left = movePoint(move);
              }
  
              break;
            }
  
            case 'B': {
              if( move >= targetLeftPX(pointAElement) ){
                pointBElement.style.left = movePoint(move);
              }
  
              break;
            }
          }
  
          setModelNumbers();
          drawLine();
        }
  
        function mouseDown(event) {
          x = event.x;
          //check what span we click min or max
          if(event.target === pointAElement || event.target === pointBElement){
            event.preventDefault();
            pointStart = targetLeftPX(event.target);
  
            if(event.target === pointAElement){
              point = 'A';
            } else if(event.target === pointBElement){
              point = 'B';
            }
            // add listener to document
            document.addEventListener("mouseup", mouseUp, false);
            document.addEventListener("mousemove", mouseMove, false);
          }
        }
  
        function mouseUp() {
          $scope.save();
          document.removeEventListener("mouseup", mouseUp, false);
          document.removeEventListener("mousemove", mouseMove, false);
        }
  
        $element[0].addEventListener("mousedown", mouseDown, false);
        
        // Make this to remove event listener after destroy scope
        $scope.$on('$destroy', function() {
          $element[0].removeEventListener("mousedown", mouseDown, false);
          document.removeEventListener("mouseup", mouseUp, false);
          document.removeEventListener("mousemove", mouseMove, false);
        });
  
        $scope.checkNaN = function (value) {
          return isNaN(value);
        }
      }],
      template: function () {
        return ` <div class="title_filter">PRICE</div> <div class="gh_range">
        <div class="gh_range_container">
          <div class="range_all_line"></div>
          <div class="gh_range_line"></div>
          <span class="gh_range_pointer_a"></span>
          <span class="gh_range_pointer_b"></span>
        </div>
        <div class="range_container_input">
          $<input class="for_point_a" type="text" ng-class="{'no_valid' : +pointA < +min || +pointA > +pointB || checkNaN(+pointA)}" ng-model="pointA" ng-change="changeNumber()" ng-blur="save()">
          $<input class="for_point_b" type="text" ng-class="{'no_valid' : +pointB > +max || +pointB < +pointA || checkNaN(+pointB)}" ng-model="pointB" ng-change="changeNumber()" ng-blur="save()">
        </div>
      </div>`
      }
    }  
  }])