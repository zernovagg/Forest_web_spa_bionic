
  
	var width = $(".app").css("width"); //вычисляет в пикселях ширину приложения(в стилях она = 75% ширины экрана)
	var height = (+width.slice(0,-2)); //высоте присваивает значение ширины. переводит в формат числа (обрезает в строке символы px, полученные при извлечении свйоства css)
	
	
	//делает квадратом блок поля игры (в стилях ширина блока = 65% от ширины приложения) 
	$(".table_field").css("width", Math.round(+height*0.65));
	$(".app, .table_field, .control_panel ").css("height",  Math.round(+height*0.65)); 
	
	var n = prompt("Enter N",''); //запрашивает ввести количество квадратиков в сетке поля
	var widthcell = Math.floor((+height*0.65)/n - 2); //вычисляет ширину одной клетки

	
	//по загрузке страницы всем клеточкам назначает вычисленную ширину-высоту
	$(window).load (function(){
	$(".cell").css("width", widthcell);
	$(".cell").css("height", widthcell)
	})



//темплейты для клеточек и строчек. соль в том, что вычисленные по формулам клетки должны бы собираться в квадрат. НО! как уже я не считала, они не влазят в ряд и сыпятся по флоату хтознакак. по-этому для каждого ряда в стиле прописано clear:both, и все ок, вроде бы
 
var template_cell = {name: "div", class:"cell"} 
var template_row = {name: "div", class:"row"}


//создает разметку для темплейтов
function generateMarkup(template, container){
    var element = $(document.createElement(template.name));
    element.appendTo(container);
    
    if("class" in template){
        element.addClass(template.class);
    }
    
  }

//для заданного количества ячеек строит поле
for(var i=1; i<=n; ++i){
	 generateMarkup(template_row, $("#field"))
    for (var j=1; j<=n; ++j){
        generateMarkup(template_cell, $(".row"))}};




