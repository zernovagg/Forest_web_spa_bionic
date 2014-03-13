/*var person = {
    firstname:  ko.observable("Halyna"),
    lastname: ko.observable("ZErnova")
};



var element = document.getElementById("content");
ko.applyBindings(person, element);

var element1 = document.getElementById("content_value");
ko.applyBindings(person, element1);

var viewModel = {
    firstname: ko.observable("Andrey"),
    lastname: ko.observable("Drebot")
};


var element3 = document.getElementById("content2");
ko.applyBindings(viewModel, element3);

var element4 = document.getElementById("content_value2");
ko.applyBindings(viewModel, element4);

viewModel.lastname("Shevchenko");


viewModel.fullname = ko.computed(function () {
    return this.firstname() + " " + this.lastname();
}, viewModel);



viewModel.firstname.subscribe(function (newValue) {
    alert("Person name is changed to " + newValue);
});

viewModel.firstname("Sergey")



var viewModel1 = {
    firstname: ko.observable("Andrey"),
    lastname: ko.observable("Drebot"),
    fullname: ko.computed(function () {
        return this.firstname() + " " + this.lastname();
    }, viewModel)
};

var people ={first:{
    firstname: ko.observable("Andrey"),
    lastname: ko.observable("Drebot"),
    fullname: ko.computed(function () {
        return this.firstname() + " " + this.lastname();
    }, viewModel)},
	second:{
    firstname: ko.observable("Some"),
    lastname: ko.observable("Person"),
    fullname: ko.computed(function () {
        return this.firstname() + " " + this.lastname();
    }, viewModel)}, 
	third:{
    firstname: ko.observable("Sunny"),
    lastname: ko.observable("Squirell"),
    fullname: ko.computed(function () {
        return this.firstname() + " " + this.lastname();
    }, viewModel)}


}


var element5 = document.getElementById("content_value5");
ko.applyBindings(viewModel1, element5);

*/
function SeatReservation(name, initialMeal, fn, ln) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);
	self.firstname = ko.observable(fn);
    self.lastname = ko.observable(ln);
        
       
	
	
}



// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0],"Andrey", "Drebot"),
        new SeatReservation("Bert", self.availableMeals[0],"Ivan", "Petrov")
    ]);
	
	  self.p = ko.observableArray([
	 new SeatReservation("Steve", self.availableMeals[0],"Andrey", "Drebot"),
        new SeatReservation("Bert", self.availableMeals[0],"Ivan", "Petrov")
	
	]);
}

ko.applyBindings(new ReservationsViewModel());




function personViewModel(fn, ln) {
  
        firstname = ko.observable(fn);
        lastname = ko.observable(ln);
        
        fullname = ko.computed(function () {
            return firstname() + " " + lastname();
        });

   
}


function peopleViewModel() {
 
   
    p = ko.observableArray([
	new personViewModel("Andrey", "Drebot"),
	new personViewModel("Ivan", "Petrov")
	
	]);
};


ko.applyBindings(new peopleViewModel());

