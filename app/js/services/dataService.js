angular.module('dataService', [])
    .service('resources', function(){
        // Service simulete data from server
        // when we must make some post to bd, and must use resources () angular js
        let originalData = [];
        let city = [
            {id:1,name:'London'},
            {id:2,name:'Barcelona'},
            {id:3,name:'Antananarivy'},
            {id:4,name:'Roma'},
            {id:5,name:'Vinnica'},
        ];
        let categories = [
            {id:1,name:'Architecture'},
            {id:2,name:'Business'},
            {id:3,name:'Design'},
            {id:4,name:'Development'},
            {id:5,name:'Marketing'},
            {id:6,name:'Photography'},
        ];

        let cards=[
            {id:1,name:'Affiliate Marketing - A Beginner\'s Guide to Earning Online', city:'London', category:'Business', price:50, img: 'testfilter/app/css/img/1.jpg'},
            {id:2,name:'Affiliate Marketing - A Beginner\'s Guide to Earning Online', city:'Barcelona', category:'Architecture', price:100, img: 'testfilter/app/css/img/2.jpg'},
            {id:3,name:'Affiliate Marketing - A Beginner\'s Guide to Earning Online', city:'Antananarivy', category:'Architecture', price:1, img: 'testfilter/app/css/img/3.jpg'},
            {id:4,name:'Affiliate Marketing - A Beginner\'s Guide to Earning Online', city:'London', category:'Development', price:150, img: 'testfilter/app/css/img/2.jpg'},
            {id:5,name:'Affiliate Marketing - A Beginner\'s Guide to Earning Online', city:'Barcelona', category:'Marketing', price:200, img: 'testfilter/app/css/img/1.jpg'},
            {id:3,name:'Affiliate Marketing - A Beginner\'s Guide to Earning Online', city:'Roma', category:'Architecture', price:1, img: 'testfilter/app/css/img/3.jpg'}

        ];

        this.getCity = function(){
            return city;
        }

        this.getCards = function(){
            return cards;
        }

        this.getGategories = function(){
            return categories;
        }
    })