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
    'end'   : {},
    'distance' : 0,
    'open' : {},
    'close' : {},
    'curr' : {},
    'min' : 0,

    genArea : function(pos_x, pos_y){
        pfinder.size = {x:pos_x, y:pos_y};
        for (var y = 1; y <= pos_y; y++){
            for (var x = 1; x <= pos_x; x++){
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
        $('#pos_'+pos_x+'_'+pos_y).addClass('curr');
        pfinder.curr = pfinder.start;
    },

    setEnd : function(pos_x, pos_y){
        pfinder.end = {x:pos_x, y:pos_y};
        $('#pos_'+pos_x+'_'+pos_y).addClass('end');
    },

    calcDistance : function(start_x, start_y, end_x, end_y){
        return Math.abs(end_x - start_x) + Math.abs(end_y - start_y);
    },

    setPos : function(pos_x, pos_y){
        $('#area div.curr').removeClass('curr');

        $('#pos_'+pos_x+'_'+pos_y).addClass('curr');
        pfinder.curr = {x:pos_x, y:pos_y};
    },

    addClose : function(pos_x, pos_y){
        var define = false;
        if(pfinder.close[pos_x] != undefined){
            if(pfinder.close[pos_x][pos_y] != undefined){
                var define = true;
            }
        }

        if(!define){
            if(pfinder.close[pos_x] == undefined)
                pfinder.close[pos_x] = [];
            pfinder.close[pos_x][pos_y] = 0;
            $('#pos_'+pos_x+'_'+pos_y).removeClass('open');
            $('#pos_'+pos_x+'_'+pos_y).addClass('close');
        }

        if(pfinder.open[pos_x] != undefined){
            if(pfinder.open[pos_x][pos_y] != undefined){
                pfinder.open[pos_x][pos_y] = undefined;
            }
        }
    },

    addOpen : function(pos_x, pos_y, parent_x, parent_y){
        var define = false;
        if(pfinder.open[pos_x] != undefined){
            if(pfinder.open[pos_x][pos_y] != undefined){
                var define = true;
            }
        }

        if(pfinder.close[pos_x] != undefined){
            if(pfinder.close[pos_x][pos_y] != undefined){
                var define = true;
            }
        }

        if(!define){
            if(pfinder.open[pos_x] == undefined)
                pfinder.open[pos_x] = [];
            pfinder.open[pos_x][pos_y] = {x:parent_x,
                                          y:parent_y,
                                          to_end: pfinder.calcDistance(pos_x, pos_y, pfinder.end.x, pfinder.end.y),
                                          to_start: pfinder.calcDistance(pos_x, pos_y, pfinder.start.x, pfinder.start.y)
                                        };
            $('#pos_'+pos_x+'_'+pos_y).addClass('open');
        }
    },
	
	 addOpenLight : function(pos_x, pos_y){
        var define = false;
        if(pfinder.open[pos_x] != undefined){
            if(pfinder.open[pos_x][pos_y] != undefined){
                var define = true;
            }
        }

        if(pfinder.close[pos_x] != undefined){
            if(pfinder.close[pos_x][pos_y] != undefined){
                var define = true;
            }
        }

        if(!define){
                       $('#pos_'+pos_x+'_'+pos_y).addClass('open');
        }
    },

    addBush : function(pos_x, pos_y, ltbush, speed){
     
		$('#pos_'+pos_x+'_'+pos_y).addClass('bush');
        pfinder.addClose(pos_x, pos_y);
		
		function death(ltbush, speed){
		 $('#pos_'+pos_x+'_'+pos_y).removeClass('bush').removeClass('close');
         pfinder.close[pos_x][pos_y] = undefined;
		 pfinder.addOpenLight(pos_x, pos_y);
		
				
		}
		setTimeout(death, ltbush*speed);
		 },
	
	addTree : function(pos_x, pos_y){
        $('#pos_'+pos_x+'_'+pos_y).addClass('tree');
        pfinder.addClose(pos_x, pos_y);
		

    },

    findAround : function(){

       

        pfinder.addClose(pfinder.curr.x, pfinder.curr.y);

        var min_x = eval(pfinder.curr.x) - 1;
        var min_y = eval(pfinder.curr.y) - 1;
        var max_x = eval(pfinder.curr.x) + 1;
        var max_y = eval(pfinder.curr.y) + 1;

        for (var y = min_y; y <= max_y; y++){
            for (var x = min_x; x <= max_x; x++){
                if(x > 0 && y > 0 && x <= pfinder.size.x && y <= pfinder.size.y)
                    pfinder.addOpen(x, y, pfinder.curr.x, pfinder.curr.y);
            };
        };

        pfinder.min = 0;
        if(Object.keys(pfinder.open).length){
            for(var pos_x in pfinder.open){
                if(pfinder.open[pos_x] != undefined){
                    for(var pos_y in pfinder.open[pos_x]){
                        if(pfinder.open[pos_x][pos_y] != undefined){
                            var f = pfinder.open[pos_x][pos_y].to_end;
                          //  if(pfinder.curr.x != pos_x && pfinder.curr.y != pos_y) f = f * 1.5;
                            $('#pos_'+pos_x+'_'+pos_y).text(f);
                            if(pfinder.min){
                                if(f < pfinder.min.amount 
								//&& pfinder.calcDistance(pos_x, pos_y, pfinder.curr.x, pfinder.curr.y) <= 1
								){
                                    pfinder.min = {x:pos_x, y:pos_y, amount:f};
                                }
                            }else{
                                pfinder.min = {x:pos_x, y:pos_y, amount:f};
                            }
                        }
                    }
                }
            }
        }
		 if(pfinder.min) pfinder.setPos(pfinder.min.x, pfinder.min.y);
		 
	/*	 for (var y = min_y; y <= max_y; y++){
            for (var x = min_x; x <= max_x; x++){
                if(x > 0 && y > 0 && x <= pfinder.size.x && y <= pfinder.size.y)
                   { pfinder.open[x][y]= undefined;
				   $('#pos_'+x+'_'+y).text().removeClass("open");
					}
            };
        };*/
		 
    },
	
    find : function(swolf){
        //pfinder.distance = pfinder.calcDistance(pfinder.start.x, pfinder.start.y, pfinder.end.x, pfinder.end.y);
        pfinder.addOpen(pfinder.curr.x, pfinder.curr.y, pfinder.curr.x, pfinder.curr.y);

        /*$(document).keypress(function (e) {
            if (e.which == 13) {
                if(pfinder.curr.x == pfinder.end.x && pfinder.curr.y == pfinder.end.y) return false;
                pfinder.findAround();
                console.log(pfinder);
            }
        });*/

       /* $('.block').click(function(){
            var pos = $(this).attr('id').split('_');
            pfinder.addBarrier(pos[1], pos[2]);
        });
*/		
		var swolf = swolf;
		for (var count = 1; count<=swolf; count++){setTimeout(finder(), 0)};
        function finder(){
            pfinder.findAround();
			pfinder.setStart (pfinder.curr.x, pfinder.curr.y);
            console.log(pfinder);
		
									
								
            if(pfinder.curr.x == pfinder.end.x && pfinder.curr.y == pfinder.end.y) alert("Game over!");
			
        }
		
       
    }
};

function wolf(speed, swolf){
pfinder.find.call(this, speed, swolf);
};
