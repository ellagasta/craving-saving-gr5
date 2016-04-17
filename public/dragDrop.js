balance = 23.50;
MARGIN_LEFT_LEFT = 20;
MARGIN_TOP = 50;
MARGIN_LEFT_RIGHT = 470;

$(document).ready(function(){
	modal = $('#modal-add-money').html();
   	createModalAddMoney();

	$(".btn.btn-default.hover-btn-top").click(openGoalClick);
	$(".btn.btn-default.hover-btn-bottom.addmode").click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("goal")[1];
		addMoneyClick(0);
	});
	$('#spend-now-btn').click(function(){
		$('#modal-add-money').modal({show:true});
		$('#modal-add-money').val("-1");
	});

});

function addMoney(denomination, num, side){
	if (side =='left'){
		for (var i = 0; i < num; i++){
			$("#drag-and-drop-wrapper").append('<img id='+idNum+' class="money" src="images/'+denomination+'.png" height='+imgHeight(denomination)+'/>');
			$("#"+idNum).css("top",startYLeft+"px");
			$("#"+idNum).css("left",startXLeft+"px");
			$("#"+idNum).draggable({
				'containment':"parent",
				'revert':"invalid",
				'revertDuration':100,
			});
			$("#"+idNum).draggable({stack:"img"});
			$("#"+idNum).dblclick(function(){
				splitDenomination(denomination,$(this).attr("id"));
			});

			item_locations[idNum] = 'left';
			idNum += 1;
			startYLeft += 20;
	    	startXLeft += 20;
		}
		startXLeft -= 20*num;
		startYLeft += 30;
	}else if (side =='right'){
		for (var i = 0; i < num; i++){
			$("#drag-and-drop-wrapper").append('<img id='+idNum+' class="money" src="images/'+denomination+'.png" height='+imgHeight(denomination)+'/>');
			$("#"+idNum).css("top",startYRight+"px");
			$("#"+idNum).css("left",startXRight+"px");
			$("#"+idNum).draggable({
				'containment':"parent",
				'revert':"invalid",
				'revertDuration':100,
			});
			$("#"+idNum).draggable({stack:"img"});
			$("#"+idNum).dblclick(function(){
				splitDenomination(denomination,$(this).attr("id"));
			});
			item_locations[idNum] = 'right';
			idNum += 1;

			startYRight += 20;
	    	startXRight += 20;
		}
		startXRight -= 20*num;
		startYRight += 30;		
	}else{
		alert('add money side error')
	}
    
}

function splitDenomination(denomination, idNum){
	var newMoney;
	switch(denomination){
		case "hundred":
			newMoney= {"fifty":2};
			break;
		case "fifty":
			newMoney=	{"twenty":2,"ten":1};
			break;
		case "twenty":
			newMoney={"ten":2};
			break;
		case "ten":
			newMoney= {"five":2};
			break;
		case "five":
			newMoney= {"one":5};
			break;
		case "one":
			newMoney= {"quarter":4};
			break;
		case "quarter":
			newMoney={"dime":2,"nickel":1};
			break;
		case "dime":
			newMoney= {"nickel":2};
			break;
		case "nickel":
			newMoney = {"penny":5};
			break;
		case "penny":
			return;
		default:
			newMoney= undefined;
	}
	if (item_locations[idNum] == "left"){
		startXLeft = Number($("#"+idNum).css("left").split("px")[0]);
		startYLeft = Number($("#"+idNum).css("top").split("px")[0]);
	}else{
		startXRight = Number($("#"+idNum).css("left").split("px")[0]);
		startYRight = Number($("#"+idNum).css("top").split("px")[0]);
	}
	for (var denomination in newMoney){
		addMoney(denomination,newMoney[denomination],item_locations[idNum]);
	}
	$("#"+idNum).remove();
	delete item_locations[idNum];
}

function divideDenomination(balance){
	var original_balance = balance.toFixed(2);

	var hundreds = Math.floor(balance.toFixed(2)/100);// toFixed for float imprecision errors
	balance -= hundreds*100

	var fifties = Math.floor(balance.toFixed(2)/50);
	balance -= fifties*50

	var twenties = Math.floor(balance.toFixed(2)/20);
	balance -= twenties*20

	var tens = Math.floor(balance.toFixed(2)/10);
	balance -= tens*10

	var fives = Math.floor(balance.toFixed(2)/5);
	balance -= fives*5

	var ones = Math.floor(balance.toFixed(2));
	balance -= ones

	var quarters = Math.floor(balance.toFixed(2)*4);
	balance -= quarters*.25
	
	var dimes = Math.floor(balance.toFixed(2)*10);
	balance -= dimes*.10

	var nickels = Math.floor(balance.toFixed(2)*20);
	balance -= nickels*.05
	
	var pennies = Math.floor(balance.toFixed(2)*100); 
	balance -= pennies*.01

	sum = hundreds*100+fifties*50+twenties*20+tens*10+fives*5+ones+quarters*.25+dimes*.1+nickels*.05+pennies*.01
	if (Number(sum.toFixed(2))!=original_balance){
		alert("Denomination devision does not add up");
	}
	return {
		hundred:hundreds,
		fifty:fifties,
		twenty:twenties,
		ten:tens,
		five:fives,
		one:ones,
		quarter:quarters,
		dime:dimes,
		nickel:nickels,
		penny:pennies
	}
}

function imgHeight(denomination){
	switch(denomination){
		case "quarter":
			return "50px";
		case "dime": 
			return "30px";
		case "nickel":
			return "40px";
		case "penny":
			return "30x";
		default:
			return "50px";
	}
}

function monetaryValue(denomination){
	switch(denomination){
		case "hundred":
			return 100;
		case "fifty":
			return 50;
		case "twenty":
			return 20;
		case "ten":
			return 10;
		case "five":
			return 5;
		case "one":
			return 1;
		case "quarter":
			return 0.25;
		case "dime":
			return 0.1;
		case "nickel":
			return 0.05;
		case "penny":
			return 0.01;
		default:
			return undefined;
	}	
}


function refreshDisplay(){
	item_locations={};
	startXLeft = MARGIN_LEFT_LEFT;
	startYLeft = MARGIN_TOP;
	startXRight = MARGIN_LEFT_RIGHT;
	startYRight = MARGIN_TOP;
	idNum=0;

	$('.money').remove();
	var dividedCount = divideDenomination(left_balance);
    for (var denomination in dividedCount){
    	if (dividedCount[denomination] !== 0){
    		addMoney(denomination,dividedCount[denomination],'left');
    	}
    }
    dividedCount = divideDenomination(right_balance);
    for (var denomination in dividedCount){
    	if (dividedCount[denomination] !== 0){
    		addMoney(denomination,dividedCount[denomination],'right');
    	}
    }
    $("#left-balance").text("$"+left_balance.toFixed(2));
    $("#right-balance").text("$"+right_balance.toFixed(2));
}

var createModalAddMoney = function(){
	left_balance = balance;
	right_balance = 0;
	refreshDisplay();

	$("#left-window").droppable({
		drop: function(event,ui){
			if (item_locations[ui.draggable.attr('id')] === 'right' ){
				var source = ui.draggable.attr('src').split('/');
				var value = monetaryValue(source[source.length - 1].split('.')[0]);
				left_balance += value;
				right_balance -= value;
				$("#left-balance").text("$"+left_balance.toFixed(2));
				$("#right-balance").text("$"+right_balance.toFixed(2));
				item_locations[ui.draggable.attr('id')] = 'left';
				var prevTransferValue = Number($("#transfer").val());
				var newValue = prevTransferValue - value;
				$("#transfer").val(newValue.toFixed(2));
			}
		},
		tolerance: "intersect"
	});
	
	$("#right-window").droppable({		
		drop: function(event,ui){
			if (item_locations[ui.draggable.attr('id')] === 'left'){
				var source = ui.draggable.attr('src').split('/');
				var value = monetaryValue(source[source.length - 1].split('.')[0]);
				right_balance += value;
				left_balance -= value;
				$("#left-balance").text("$"+left_balance.toFixed(2));
				$("#right-balance").text("$"+right_balance.toFixed(2));
				item_locations[ui.draggable.attr('id')] = 'right';
				var prevTransferValue = Number($("#transfer").val());
				var newValue = prevTransferValue + value;
				$("#transfer").val(newValue.toFixed(2)); //use val instead of .spinner('value') to not trigger 'change'
			}
		},
		tolerance: "intersect"
	});

	$("#transfer").spinner({
		min:0,
		max:balance,
		step:.01,
		culture:'en-US',
		numberFormat: "d",
		change: function(event,ui){
			var val;
			var id =$("#modal-add-money").val();
			var max_val = Number($("#goal-menu-"+id).find(".max-val").text());
			var cur_val = Number($("#goal-menu-"+id).find(".display").find(".cur-val").text());
			console.log(Number($("#goal-menu-"+id).find(".max-val").text()));
			if ($(this).val() < 0){
				val = 0;
			}else if ($(this).val() > max_val - cur_val){
				val = max_val-cur_val;
			}else{
				val = Number($(this).val());
			}
			val = Math.min(val,balance);
			console.log(val);

			$(this).val(val.toFixed(2));
			var total = left_balance + right_balance; 
			right_balance = val;
			left_balance = total - right_balance;

			$("#left-balance").text("$"+left_balance.toFixed(2));
			$("#right-balance").text("$"+right_balance.toFixed(2));
			refreshDisplay();
		}
	});
	$("#transfer").keypress(function(e){
		if (e.keyCode==13){
			$("#transfer").spinner('option','change').call($("#transfer"));
			$("#transfer").blur();
		}
	});
	$("#organize-button").click(refreshDisplay);
	$("#cancel-transaction-button").click(function(){
		$('#modal-add-money').modal('toggle');
	});
	$("#confirm-transaction-button").unbind();
	$("#confirm-transaction-button").click(function(){
		var transfer_amount = Number($("#right-balance").text().split("$")[1]);
		balance-=transfer_amount;
		console.log("transfer "+transfer_amount+" to leave a balance of " + balance+".");
	    $('#modal-add-money').modal('toggle');
	    var id=$("#modal-add-money").val();
	    console.log("id",id);
 		var cur_value = $("#goal-menu-"+id).find('.row.goal-amt.display').find('.cur-val').text();
 		var new_value = Number(cur_value)+Number(transfer_amount)
 		$("#goal-menu-"+id).find('.row.goal-amt.display').find('.cur-val').text(new_value.toFixed(2));
 		var max =  $("#goal-menu-"+id).find('.row.goal-amt.display').find('.max-val').text();

 		if (id==0){

 			var savedText = $("#goal"+id).find('.non-hover.non-hover-div').find('.text-center.savings-balance').text();
 			var moneySaved = savedText.split(" ")[0].split("$")[1];
 			var textSaved = savedText.split(" ")[1];
			console.log(savedText,moneySaved,textSaved,new_value);
 			$("#goal"+id).find('.non-hover.non-hover-div').find('.text-center.savings-balance').text("$"+new_value.toFixed(2)+" "+textSaved);
 		}else{
			$("#goal"+id).find(".progress-amount").text(new_value.toFixed(2)+'/'+Number(max).toFixed(2));
			$('#goal'+id).find(".progress-bar").css("width",Number(new_value)/Number(max)*100+"%");			
		}
		$("#goal-menu-"+id).find(".maingoal-progress").css("width",Number(new_value)/Number(max)*100+"%");
		$("#goal-menu-"+id).find(".progress-bar-text").text(Number(new_value)/Number(max)*100);


		var titleText = $('.available-funds').text().split("$");
		var nonbalanceText = titleText[titleText.length-2];
		var balanceText = titleText[titleText.length-1];
		$('.available-funds').text(nonbalanceText+"$"+balance.toFixed(2));

		if (new_value >= max) {
			$("#goal-menu-"+id).find('.purchasemode').show();
			$("#goal"+id).find('.purchasemode').show();
			$("#goal-menu-"+id).find('.addmode').hide();
			$("#goal"+id).find('.addmode').hide();
		} else {
			$("#goal-menu-"+id).find('.addmode').show();
			$("#goal"+id).find('.addmode').show();
			$("#goal-menu-"+id).find('.purchasemode').hide();
			$("#goal"+id).find('.purchasemode').hide();
		}
	});

	$('#modal-add-money').on('hidden.bs.modal', function(){
		var newModal = '<div id ="modal-add-money" class = "modal fade" role="dialog" tabindex="-1">'+modal+'</div';
    	$(this).replaceWith(newModal);
    	createModalAddMoney();
	});


	$("#transfer").val("0.00");
}

