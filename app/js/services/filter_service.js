angular.module('filterModule', [])

.service('filterService', [ function () {
    this.filterSet = function(filterObj, cards){
        let items = angular.copy(cards);
        switch (filterObj.filter_strategy){
            case "city":
                if(filterObj.filter_value == "All city"){
                    return cards
                }
                return cards.filter((_dataItem) => {
                  return _dataItem.city == filterObj.filter_value
                })
              break;

            case "category":
                let filteredAll = [];
                filterObj.filter_value.forEach(value => {
                    cards.forEach((_dataItem) => {
                        if(_dataItem.category == value.name){
                            filteredAll.push(_dataItem) 
                        }
                    })
                });
                return filteredAll
                break;

            case "range_price": 
                let filterStart = filterObj.filter_value.split(':')[0];
                let filterEnd = filterObj.filter_value.split(':')[1];
                return cards.filter((_dataItem) => {
                    return _dataItem.price <= filterEnd && _dataItem.price >= filterStart
                  })
                break;
            default:
        }
    }
    return this;
}]);