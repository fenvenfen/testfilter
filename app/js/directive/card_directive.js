angular.module('cardDirective', [])
  //---- CARDS DIRECTIVE-----
  .directive('cards', [ function () {
    return {
      scope: {},
      controller: ['$scope', 'resources', 'Message', 'filterService', function ($scope, resources, Message, filterService) {
        // Take cards from data service
        $scope.cards =  resources.getCards();
        var message = new Message({
            id_message: 99
          }, $scope).on('filter', function (data) {
                $scope.cards = filterService.filterSet(data.value, resources.getCards());
                console.log(data)
                if(data.value.filter_strategy == "range_price"){
                    $scope.$apply();
                }
          });


      }],
      template: function () {
        return `<div class="mail_block_card" ng-repeat="card in cards"><card name="{{card.name}}" city="{{card.city}}" 
        category="{{card.category}}" price="{{card.price}}" img-src="{{card.img}}"></card></div>`
            }
        }  
    }])
    //---- CARD DIRECTIVE-----
    .directive('card', [ function () {
        return {
            scope: {
                name: '@',
                city: '@',
                category: '@',
                price: '@',
                imgSrc: '@'
            },
            controller: ['$scope', 'resources', function ($scope, resources) {
                // console.log($scope)
            }],
            template: function () {
                return `<div class="block_image"><img src="{{imgSrc}}" alt="Smiley face">
                    <div class="city_text">{{city}}</div></div>
                    <div class="card_name">{{name}}</div>
                    <div class="block_category"><div class="card_category">{{category}}</div>
                    <div class="card_price">{{price}}$</div></div>`
            }
        }  
    }])