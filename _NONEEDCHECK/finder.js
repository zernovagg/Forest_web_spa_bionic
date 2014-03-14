/*
*
* Copyright 2012
* Denis Platonov (newpdv)
* http://habrahabr.ru/users/newpdv/
* newpdv@gmail.com
*
*/

var pfinder = {
    'size'  : {},
    'start' : {},
	'startR':{},
    'end'   : {},
	'endR':{},
    'distance' : 0,
    'open' : {},
    'close' : {},
    'curr' : {},
	'currR':{},
    'min' : 0,
	'max' : 0,
	'matrix':{},
	'step': {},
	
	genMatrix : function(pos_x, pos_y){
        pfinder.size = {x:pos_x, y:pos_y};
        for (var y = 0; y <= pos_y; y++){
		 pfinder.matrix[y]=[];
            for (var x = 0; x <= pos_x; x++){
                pfinder.matrix[y][x]= 0
			
            };
           
        };
		},
		
    genArea : function(pos_x, pos_y){
        pfinder.size = {x:pos_x, y:pos_y};
        for (var y = 0; y <= pos_y; y++){
            for (var x = 0; x <= pos_x; x++){
                $('#area').append('<div class="block" id="pos_'+x+'_'+y+'"></div>');
            };
            $('#area').append('<div class="clear"></div>');
        };
		
		
  
	var width = $(".app").css("width"); //вычисляет в пикселях ширину приложения(в стилях она = 75% ширины экрана)
	var height = (+width.slice(0,-2)); //высоте присваивает значение ширины. переводит в формат числа (обрезает в строке символы px, полученные при извлечении свйоства css)
	
	
	//делает квадратом блок поля игры (в стилях ширина блока = 65% от ширины приложения) 
	$(".table_field").css("width", Math.round(+height*0.65));
	$(".app, .table_field, .control_panel ").css("height",  Math.round(+height*0.65)); 
	
	var n = $("#fsize").val();
	var widthcell = Math.floor((+height*0.65)/n - 4); //вычисляет ширину одной клетки

	
	//по загрузке страницы всем клеточкам назначает вычисленную ширину-высоту

	$(".block").css("width", widthcell);
	$(".block").css("height", widthcell)


		
		
    },

    setStart : function(pos_x, pos_y){
        pfinder.start = {x:pos_x, y:pos_y};
        $('#pos_'+pos_x+'_'+pos_y).addClass('currWolf');
        pfinder.curr = pfinder.start;
		pfinder.matrix[pos_x][pos_y] = 1;
    },
	
	setStartR : function(pos_x, pos_y){
        pfinder.startR = {x:pos_x, y:pos_y};
        $('#pos_'+pos_x+'_'+pos_y).addClass('currRabbit');
        pfinder.currR = pfinder.startR;
		pfinder.matrix[pos_x][pos_y] = 1;
    },

    setEnd : function(){
        pfinder.end = {x:pfinder.currR.x, y:pfinder.currR.y};
       
    },

	setEndR : function(){
        pfinder.endR = {x:pfinder.curr.x, y:pfinder.curr.y};
       
    },
	
    calcDistance : function(start_x, start_y, end_x, end_y){
        return Math.abs(end_x - start_x) + Math.abs(end_y - start_y);
    },

    setPos : function(pos_x, pos_y){
        $('#area div.currWolf').removeClass('currWolf');

        $('#pos_'+pos_x+'_'+pos_y).addClass('currWolf');
        pfinder.curr = {x:pos_x, y:pos_y};
		pfinder.matrix[pos_x][pos_y] = 1;
    },
	
	setPosR : function(pos_x, pos_y){
        $('#area div.currRabbit').removeClass('currRabbit');

        $('#pos_'+pos_x+'_'+pos_y).addClass('currRabbit');
        pfinder.currR = {x:pos_x, y:pos_y};
		pfinder.matrix[pos_x][pos_y] = 1;
    },

	
	
	
    addBush : function(pos_x, pos_y, ltbush, speed){
		
		$('#pos_'+pos_x+'_'+pos_y).addClass('bush');
       
		pfinder.matrix[pos_x][pos_y] = 1;
		
		function death(ltbush, speed){
		 $('#pos_'+pos_x+'_'+pos_y).removeClass('bush');
       
		pfinder.matrix[pos_x][pos_y] = 0;
				
		}
		setTimeout(death, ltbush*speed);
		 },
	
	addTree : function(pos_x, pos_y, lttree, speed){
        $('#pos_'+pos_x+'_'+pos_y).addClass('tree');
    
		pfinder.matrix[pos_x][pos_y] = 1;
		function death(lttree, speed){
		 $('#pos_'+pos_x+'_'+pos_y).removeClass('tree').removeClass('close');
       
		pfinder.matrix[pos_x][pos_y] = 0;
				
		}
		setTimeout(death, lttree*speed);

    },
	
	wayWolf : function(){
		pfinder.matrix[pfinder.curr.x][pfinder.curr.y] = 1;
		
		var min_x = eval(pfinder.curr.x) - 1;
        var min_y = eval(pfinder.curr.y) - 1;
        var max_x = eval(pfinder.curr.x) + 1;
        var max_y = eval(pfinder.curr.y) + 1;

        for (var y = min_y; y <= max_y; y++){
            for (var x = min_x; x <= max_x; x++){
                if(x > 0 && y > 0 && x <= pfinder.size.x && y <= pfinder.size.y && pfinder.matrix[x][y] != 1 )
                    {
					
					pfinder.step[x][y] = pfinder.calcDistance(pfinder.curr.x, pfinder.curr.y, pfinder.end.x, pfinder.end.y);
					}
            };
        };
	
	pfinder.min = 0;
	 for(var pos_x in pfinder.step){
	  for(var pos_y in pfinder.step[pos_x]){
			
	   var f = pfinder.step[pos_x][pos_y];
	    $('#pos_'+pos_x+'_'+pos_y).text(f);
		 if(pfinder.min){
                                if(f < pfinder.min.amount 
								//&& pfinder.calcDistance(pos_x, pos_y, pfinder.curr.x, pfinder.curr.y) <= 1
								){
                                    pfinder.min = {x:pos_x, y:pos_y, amount:f};
                                }
                            }else{
                                pfinder.min = {x:pos_x, y:pos_y, amount:f};}
		
		
									}
							}
							
					 if(pfinder.min) { pfinder.setPos(pfinder.min.x, pfinder.min.y);
		 	pfinder.matrix[pfinder.curr.x][pfinder.curr.y] = 0;
				pfinder.matrix[pfinder.min.x][pfinder.min.y] = 1;
				 $('#pos_'+pfinder.min.x+'_'+pfinder.min.y).addClass('way');
		 pfinder.setEndR();
		 }		
	},
	
		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
   
	
	
   
	
	
    find : function(swolf){
	
		var swolf = swolf;
		for (var count = 1; count<=swolf; count++){setTimeout(finder(), 0)};
        function finder(){
            pfinder.wayWolf();
			pfinder.setStart (pfinder.curr.x, pfinder.curr.y);
          							
								
            if(pfinder.curr.x == pfinder.currR.x && pfinder.curr.y == pfinder.currR.y) alert("Game over!");
			
        }
		
       
    },
	
    findR : function(sRabbit){
      
        pfinder.addOpen(pfinder.currR.x, pfinder.currR.y, pfinder.currR.x, pfinder.currR.y);

       
		var sRabbit = sRabbit;
		for (var count = 1; count<=sRabbit; count++){setTimeout(finderR(), 0)};
        function finderR(){
            pfinder.findAroundR();
			//pfinder.setStartR (pfinder.currR.x, pfinder.currR.y);
            console.log(pfinder);
		
									
								
            if(pfinder.currR.x == pfinder.curr.x && pfinder.currR.y == pfinder.curr.y) alert("Game over!");
			
        }
		
       
    }
	
	
};

function wolf(swolf){
pfinder.find.call(this, swolf);
};

function rabbit(sRabbit){
pfinder.findR.call(this, sRabbit);
};
