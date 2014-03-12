var person = {
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


var element5 = document.getElementById("content_value5");
ko.applyBindings(viewModel1, element5);
