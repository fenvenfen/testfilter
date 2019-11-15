angular.module('pipeModule', [])

.factory('Message', ['$rootScope', function ($rootScope) {

    function Message(id, scope) {
      this.subjects = [];
      this.destination_id = createId(id);
      this.scope = scope;
      var self = this;
  
      // Main listener of message object
      scope.$on('message', function (event, data) {
        var listenerId = createId(data.to);
  
        if(listenerId == self.destination_id){
          angular.forEach(self.subjects, function (subject) {
            if(subject.id == data.subject){
              subject.func(data);
            }
          });
        }
      });
  
    }
  
    Message.prototype.on = function (subjects, callback) {
  
      var self = this;
      subjects.split(' ').forEach(function(subject){
  
        self.subjects.push({
          id: subject,
          func: callback
        });
  
      });
  
      return this;
    };
  
    Message.prototype.emit = function (subjects, data) {
  
      subjects.split(' ').forEach(function(subject){
        data.subject = subject;
        $rootScope.$broadcast('message', data);
      });
  
      return this;
    };
  
    // Create id of listener from Object to String
    function createId(obj){
      var stringId = '';
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key]) {
          stringId += '.' + obj[key];
        }
      }
      return stringId ? stringId.substring(1) : 'any';
    }
  
  
    return Message;
  }]);