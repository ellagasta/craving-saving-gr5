$(".modal-body.add-money-body").ready(function(){
	balance = user.balance;
	MARGIN_LEFT_LEFT = 32/1224*$(".modal-body.add-money-body").width();
	MARGIN_TOP = 62/510*$(".modal-body.add-money-body").height();
	MARGIN_LEFT_RIGHT = 720/1224*$(".modal-body.add-money-body").width();

	$('#modal-add-money').on('hidden.bs.modal', resetModal);
});

function resetModal(){
	left_balance = balance;
	right_balance = 0;
	$("#transfer").val("0.00");
	$("#warning-transfer-money").hide();
	refreshDisplay();
}

function addMoney(denomination, num, side){
	var overflowX = false;
	var overflowY = false;
	if (side =='left'){
		for (var i = 0; i < num; i++){
			$("#drag-and-drop-wrapper").append('<img id='+idNum+' class="money" src="/images/'+denomination+'.png" />');
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
			$("#"+idNum).click(function(){
				$("#warning-transfer-money").hide();
			})

			item_locations[idNum] = 'left';
			if (startXLeft > $("#left-window").width() - imgWidth(denomination)){
				startXLeft = 20/1224*$(".modal-body.add-money-body").width() +$("#left-window").width() - imgWidth(denomination);
				overflowX=true;
			}else{
				startXLeft += 20/1224*$(".modal-body.add-money-body").width();
			}
			if (startYLeft + 20/510*$(".modal-body.add-money-body").height() > $("#left-window").position().top+$("#left-window").height() - 80){
				startYLeft =  $("#left-window").position().top+$("#left-window").height() - 80;
				overflowY=true;
			}else{
				startYLeft+=20/510*$(".modal-body.add-money-body").height();
			}

			idNum += 1;
		}
		if (!overflowX){
			startXLeft -= 20*num/1224*$(".modal-body.add-money-body").width();
		}
		if (!overflowY){
			startYLeft += 30/510*$(".modal-body.add-money-body").height();
		}
	}else if (side =='right'){
		for (var i = 0; i < num; i++){
			$("#drag-and-drop-wrapper").append('<img id='+idNum+' class="money" src="/images/'+denomination+'.png" />');
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
			$("#"+idNum).click(function(){
				$("#warning-transfer-money").hide();
			})

			item_locations[idNum] = 'right';
			idNum += 1;

			if (startXRight > 630/1224*$(".modal-body.add-money-body").width()+$("#right-window").width() - imgWidth(denomination)){
				startXRight = (20 +630)/1224*$(".modal-body.add-money-body").width()+$("#right-window").width() - imgWidth(denomination);
				overflowX=true;
			}else{
				startXRight += 20/1224*$(".modal-body.add-money-body").width();
			}
			if (startYRight > $("#right-window").height() - 100/510*$(".modal-body.add-money-body").height()){
				startYRight =  430/510*$(".modal-body.add-money-body").height();
				overflowY=true;
			}else{
				startYRight+=20/510*$(".modal-body.add-money-body").height();
			}

		}
		if (!overflowX){
			startXRight-= 20*num/1224*$(".modal-body.add-money-body").width();
		}
		if (!overflowY){
			startYRight += 30/510*$(".modal-body.add-money-body").height();
		}
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

function imgWidth(denomination){
	switch(denomination){
		case "hundred":
			return 185/1224*$(".modal-body.add-money-body").width();
		case "fifty":
			return 180/1224*$(".modal-body.add-money-body").width();
		case "twenty":
			return 187/1224*$(".modal-body.add-money-body").width();
		case "ten":
			return 189/1224*$(".modal-body.add-money-body").width();
		case "five":
			return 176/1224*$(".modal-body.add-money-body").width();
		case "one":
			return 189/1224*$(".modal-body.add-money-body").width();
		default:
			return 80/1224*$(".modal-body.add-money-body").width();
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
	console.log(MARGIN_LEFT_LEFT,MARGIN_TOP,MARGIN_LEFT_RIGHT)
	MARGIN_LEFT_LEFT = 32/1224*$(".modal-body.add-money-body").width();
	MARGIN_TOP = 62/510*$(".modal-body.add-money-body").height();
	MARGIN_LEFT_RIGHT = 720/1224*$(".modal-body.add-money-body").width();
	console.log(MARGIN_LEFT_LEFT,MARGIN_TOP,MARGIN_LEFT_RIGHT)
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
    $(".money").effect("shake",{direction:"up", distance:10,times:3});
}

// was createModalAddMoney();
var setupModal = function(typeCode, goalID){ // typeCode: 0 is spend money now, 1 is add money to savings, 2 is add money to goal 
	if (typeCode == 2 && goalID == null){
		goalID = id;
	}

	left_balance = balance;
	right_balance = 0;
	refreshDisplay();

	// $("#transfer").unbind();
	$("#organize-button").unbind();
	$("#cancel-transaction-button").unbind();
	$("#confirm-transaction-button").unbind();
			
	

	$("#transfer").spinner({
		min: 0,
		max: balance,
		step: .01,
		culture:'en-US',
		numberFormat: "n2"
	});
	
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
			if (ui.position.top < $(this).position().top + 3){
				console.log('right top small');
				ui.draggable.css("top", $(this).position().top + 3);
			}else if (ui.position.top + $(ui.draggable).height() > $(this).position().top + $(this).height() - 3){
				console.log('right top big');
				ui.draggable.css("top", $(this).position().top +$(this).height() - $(ui.draggable).height()- 3);
			}
			if (ui.position.left < $(this).parent().position().left + 3){
				console.log('right left small');
				ui.draggable.css("left", $(this).parent().position().left + 3);
			}else if (ui.position.left + $(ui.draggable).width() > $(this).parent().position().left + $(this).width() - 3){
				console.log('right left big');
				ui.draggable.css("left", $(this).parent().position().left + $(this).width() - $(ui.draggable).width() - 3 );
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
			if (ui.position.top < $(this).position().top + 3){
				console.log('right top small');
				ui.draggable.css("top", $(this).position().top + 3);
			}else if (ui.position.top + $(ui.draggable).height() > $(this).position().top + $(this).height() - 3){
				console.log('right top big');
				ui.draggable.css("top", $(this).position().top +$(this).height() - $(ui.draggable).height()- 3);
			}
			if (ui.position.left < $(this).parent().position().left + 3){
				console.log('right left small');
				ui.draggable.css("left", $(this).parent().position().left + 3);
			}else if (ui.position.left + $(ui.draggable).width() > $(this).parent().position().left + $(this).width() - 3){
				console.log('right left big');
				ui.draggable.css("left", $(this).parent().position().left + $(this).width() - $(ui.draggable).width() - 3 );
			}

		},
		tolerance: "intersect"
	});	

	if (typeCode == 0){
		$(".modal-header").find("h3").text("Spend Money Now");
        $("#transfer").spinner({
			change: function(event,ui){
				console.log("change");
				var val = Number($(this).val());
				if (val > balance){
					$("#warning-transfer-money").text("You don't have enough money!");
					$("#warning-transfer-money").show();
				}
				if (val < 0 ){
					$("#warning-transfer-money").text("You can't add negative money!")
					$("#warning-transfer-money").show();
				}
				val = Math.min(val,balance);
				val = Math.max(val, 0);
				var total = left_balance + right_balance;
				right_balance = val;
				left_balance = total - right_balance;
				$(this).val(val.toFixed(2));
				$("#left-balance").text("$"+left_balance.toFixed(2));
				$("#right-balance").text("$"+right_balance.toFixed(2));
				refreshDisplay();				
			}
		});
		$("#confirm-transaction-button").click(function(){
			balance = left_balance;
			console.log('balance',balance);
			$.post('/history',{
				date : getDate(),
	            imageURL : 'images/logo-letter-s.png',
				eventDescription : "Spend directly from Available Funds",
	            changeToBalance : "-$" + right_balance.toFixed(2),
	            availableFundsBalance : "$" + left_balance.toFixed(2)
			},function() {
				$.post('/profile',{balance:balance, user:user},function(data){
					resetModal();
					window.location.reload();
				});
			});
		});

	}else if (typeCode ==1){ 
		$(".modal-header").find("h3").text("Add Money to Savings");
		$("#transfer").spinner({
			change: function(event,ui){
				var val = Number($(this).val());
				if (val > balance){
					$("#warning-transfer-money").text("You don't have enough money!");
					$("#warning-transfer-money").show();
				}
				if (val < 0 ){
					$("#warning-transfer-money").text("You can't add negative money!")
					$("#warning-transfer-money").show();
				}

				val = Math.min(val,balance);
				val = Math.max(val, 0);
				var total = left_balance + right_balance;
				right_balance = val;
				left_balance = total - right_balance;
				$(this).val(val.toFixed(2));
				$("#left-balance").text("$"+left_balance.toFixed(2));
				$("#right-balance").text("$"+right_balance.toFixed(2));
				refreshDisplay();				
			}
		});
		$("#confirm-transaction-button").click(function(){
			console.log("add to savings");
			$.post('/history',{
				date : getDate(),
	            imageURL : 'images/piggy-transparent.png',
				eventDescription : "Add $ to Savings Account",
				changeToBalance : "-$" + right_balance.toFixed(2),
	            availableFundsBalance : "$" + left_balance.toFixed(2)
			},function() {
				$.post('/savings',{addedSavings:right_balance},function(data){
					resetModal();
					window.location.reload();
				});
			});
		});

	}else if (typeCode == 2){
		$(".modal-header").find("h3").text("Add Money to "+user.goals[goalID].goalName);
		$("#transfer").spinner({
			change: function(event,ui){
				console.log('change',user.goals[goalID]);	
				var val;
				var max_val = user.goals[goalID].price;
				var cur_val = user.goals[goalID].saved;

				if ($(this).val() < 0){
					val = 0;
					$("#warning-transfer-money").text("You can't add negative money!");
					$("#warning-transfer-money").show();
				}else if ($(this).val() > max_val - cur_val){
					val = max_val-cur_val;

					$("#warning-transfer-money").text("You added more money than you need!");
					$("#warning-transfer-money").show();
				}else{
					val = Number($(this).val());
				}
				console.log("val:",val);
				if (val > balance){
					$("#warning-transfer-money").text("You don't have enough money!");
					$("#warning-transfer-money").show();
					val = balance;
				}
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

				if (ui.position.top < $(this).position().top + 3){
					console.log('right top small');
					ui.draggable.css("top", $(this).position().top + 3);
				}else if (ui.position.top + $(ui.draggable).height() > $(this).position().top + $(this).height() - 3){
					console.log('right top big');
					ui.draggable.css("top", $(this).position().top +$(this).height() - $(ui.draggable).height()- 3);
				}
				if (ui.position.left < $(this).parent().position().left + 3){
					console.log('right left small');
					ui.draggable.css("left", $(this).parent().position().left + 3);
				}else if (ui.position.left + $(ui.draggable).width() > $(this).parent().position().left + $(this).width() - 3){
					console.log('right left big');
					ui.draggable.css("left", $(this).parent().position().left + $(this).width() - $(ui.draggable).width() - 3 );
				}
			}
		});
		
		$("#right-window").droppable({		
			drop: function(event,ui){
				if (item_locations[ui.draggable.attr('id')] === 'left'){
					var source = ui.draggable.attr('src').split('/');
					var value = monetaryValue(source[source.length - 1].split('.')[0]);

					var max_val = user.goals[goalID].price;
					var cur_val = user.goals[goalID].saved;
					if (value+right_balance > max_val-cur_val){					
						$("#warning-transfer-money").text("You added more money than you need!");
						$("#warning-transfer-money").show();

                        var new_val = max_val - cur_val;
						right_balance = new_val;
						left_balance = balance - right_balance;
						$("#transfer").val((new_val).toFixed(2));
						refreshDisplay();
					}else{
						right_balance += value;
						left_balance -= value;
						$("#left-balance").text("$"+left_balance.toFixed(2));
						$("#right-balance").text("$"+right_balance.toFixed(2));
						item_locations[ui.draggable.attr('id')] = 'right';
						var prevTransferValue = Number($("#transfer").val());
						var newValue = prevTransferValue + value;
						$("#transfer").val(newValue.toFixed(2)); //use val instead of .spinner('value') to not trigger 'change'
					}
				}


				if (ui.position.top < $(this).position().top + 3){
					console.log('right top small');
					ui.draggable.css("top", $(this).position().top + 3);
				}else if (ui.position.top + $(ui.draggable).height() > $(this).position().top + $(this).height() - 3){
					console.log('right top big');
					ui.draggable.css("top", $(this).position().top +$(this).height() - $(ui.draggable).height()- 3);
				}
				if (ui.position.left < $(this).parent().position().left + 3){
					console.log('right left small');
					ui.draggable.css("left", $(this).parent().position().left + 3);
				}else if (ui.position.left + $(ui.draggable).width() > $(this).parent().position().left + $(this).width() - 3){
					console.log('right left big');
					ui.draggable.css("left", $(this).parent().position().left + $(this).width() - $(ui.draggable).width() - 3 );
				}

			}
		});

		$("#confirm-transaction-button").click(function(){
			balance = left_balance;
			console.log('balance',balance);
			$.post('/history',{
				date : getDate(),
	            imageURL : user.goals[goalID].imageURL,
				eventDescription : "Add $ to " + user.goals[goalID].goalName,
	            changeToBalance : "-$" + right_balance.toFixed(2),
	            availableFundsBalance : "$" + left_balance.toFixed(2)
			},function(){
				$.post('/goals/'+goalID,{balance:balance, addedValue: right_balance},function(data){
					resetModal();
					window.location.reload();
				});				
			});
		});
	}
	$("#transfer").keypress(function(e){
		if (e.keyCode==13){
			$("#transfer").spinner('option','change').call($("#transfer"));
			$("#transfer").blur();
		}
	});
	$("#organize-button").click(function(){
		refreshDisplay();
		$("#warning-transfer-money").hide();
	});
	$("#cancel-transaction-button").click(function(){
		$('#modal-add-money').modal('toggle');
	});
}

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yy = today.getFullYear() % 100;
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = mm+'/'+dd+'/'+yy;
    console.log(today);
    return today;
}

