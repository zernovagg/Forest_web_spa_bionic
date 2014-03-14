
var pfinder = {
    'size'  : {},
    'end'   : {},
	'endR':{},
    'curr' : {},
	'currR':{},
    'min' : 0,
	'max' : 0,
	'matrix':{},

	
	
		
    genArea : function(pos_x, pos_y){
        pfinder.size = {x:pos_x, y:pos_y};
        for (var x = 0; x <= pos_x; x++){
			pfinder.matrix[x]=[];
            for (var y = 0; y <= pos_y; y++){
                $('#area').append('<div class="block" id="pos_'+x+'_'+y+'"></div>');
			pfinder.matrix[x][y]= 0;	
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
        $('#pos_'+pos_x+'_'+pos_y).addClass('currWolf');
        pfinder.curr =  {x:pos_x, y:pos_y};
		pfinder.matrix[pos_x][pos_y] = 1;
    },
	
	setStartR : function(pos_x, pos_y){
        $('#pos_'+pos_x+'_'+pos_y).addClass('currRabbit');
        pfinder.currR = {x:pos_x, y:pos_y};
		pfinder.matrix[pos_x][pos_y] = 1;
    },

    setEnd : function(){
		var x = pfinder.currR.x;
		var y = pfinder.currR.y;
        pfinder.end = {x:x, y:y};
       
    },

	setEndR : function(){
	    var x = pfinder.curr.x;
		var y = pfinder.curr.y;
        pfinder.endR = {x:x, y:y};
       
    },
	
    calcDistance : function(start_x, start_y, end_x, end_y){
        return Math.abs(end_x - start_x) + Math.abs(end_y - start_y);
    },

    setPos : function(pos_x, pos_y){
        $('#area div.currWolf').removeClass('currWolf');
        $('#pos_'+pos_x+'_'+pos_y).addClass('currWolf');
        pfinder.matrix[pfinder.curr.x][pfinder.curr.y]=0;
		pfinder.curr = {x:pos_x, y:pos_y};
		pfinder.matrix[pos_x][pos_y] = 1;
    },
	
	setPosR : function(pos_x, pos_y){
        $('#area div.currRabbit').removeClass('currRabbit');
		$('#pos_'+pos_x+'_'+pos_y).addClass('currRabbit');
		pfinder.matrix[pfinder.currR.x][pfinder.currR.y]=0;
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
				
		var min_x = eval(pfinder.curr.x) - 1;
        var min_y = eval(pfinder.curr.y) - 1;
        var max_x = eval(pfinder.curr.x) + 1;
        var max_y = eval(pfinder.curr.y) + 1;
		
		var minimum = pfinder.calcDistance(pfinder.curr.x, pfinder.curr.y, pfinder.end.x, pfinder.end.y);
		pfinder.min ={x:pfinder.curr.x, y:pfinder.curr.y};
        for (var x = min_x; x <= max_x; x++){
			    for (var y = min_y; y <= max_y; y++){
                if(x >= 0 && y >= 0 && x <= pfinder.size.x && y <= pfinder.size.y && pfinder.matrix[x][y] != 1 )
               { f = pfinder.calcDistance(x, y, pfinder.end.x, pfinder.end.y);
				$('#pos_'+x+'_'+y).text(f);
				if (f < minimum) 
				{minimum = f;  pfinder.min = {x:x, y:y};}
				}
            };
        };
	
			pfinder.setPos(pfinder.min.x, pfinder.min.y);
		 	$('#pos_'+pfinder.min.x+'_'+pfinder.min.y).addClass('way');
			pfinder.setEndR();
		 		
	},
	
	
	wayRabbit : function(){
				
		var min_x = eval(pfinder.currR.x) - 1;
        var min_y = eval(pfinder.currR.y) - 1;
        var max_x = eval(pfinder.currR.x) + 1;
        var max_y = eval(pfinder.currR.y) + 1;
		
		var maximum = pfinder.calcDistance(pfinder.currR.x, pfinder.currR.y, pfinder.endR.x, pfinder.endR.y);
		pfinder.max ={x:pfinder.currR.x, y:pfinder.currR.y};
        for (var x = min_x; x <= max_x; x++){
			    for (var y = min_y; y <= max_y; y++){
                if(x >= 0 && y >= 0 && x <= pfinder.size.x && y <= pfinder.size.y && pfinder.matrix[x][y] != 1 )
               { f = pfinder.calcDistance(x, y, pfinder.endR.x, pfinder.endR.y);
				$('#pos_'+x+'_'+y).text(f);
				if (f > maximum) 
				{max = f;  pfinder.max = {x:x, y:y};}
				}
            };
        };
	
			pfinder.setPosR(pfinder.max.x, pfinder.max.y);
		 	$('#pos_'+pfinder.max.x+'_'+pfinder.max.y).addClass('wayR');
			pfinder.setEnd();
		 		
	},
		
	
	
   
	
	
    find : function(swolf){
	
		var swolf = swolf;
		for (var count = 1; count<=swolf; count++){setTimeout(finder(), 0)};
        function finder(){
            pfinder.wayWolf();
			if( Math.abs(pfinder.curr.x - pfinder.currR.x) <= 1 && Math.abs(pfinder.curr.y - pfinder.currR.y)<=1 ) alert("Game over!");
		        }
		},
	
	
	
    findR : function(sRabbit){
         
       
		var sRabbit = sRabbit;
		for (var count = 1; count<=sRabbit; count++){setTimeout(finderR(), 0)};
        function finderR(){
            pfinder.wayRabbit();
			
        }
		
       
    }
	
	
};

function wolf(swolf){
pfinder.find.call(this, swolf);
};

function rabbit(sRabbit){
pfinder.findR.call(this, sRabbit);
};
