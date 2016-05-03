$(document).ready(function () {

    $('[data-toggle="popover"]').popover(); 
    $('[data-toggle="tooltip"]').tooltip({ 
	    placement : 'bottom'
	});

	$("#modal-add-money").on("shown.bs.modal",function(){
		refreshDisplay();
	});

	$("#logo").click(function(){
		window.location.href='/profile';
	})
	$('#myTab a:first').tab('show');

	$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.hoverable-panel').hover(hoverFunc, unhoverFunc);

	$('.new-goal').click(newGoalClick);

	$('#open-savings-btn').click(function(){
		window.location.href = "/savings";
	});

	$("#add-to-savings-btn").click(function(){
		setupModal(1);
		$("#modal-add-money").modal({show:true});
	})

	$('#spend-now-btn').click(function(){
		setupModal(0);
		$("#modal-add-money").modal({show:true});
	});

	$(".purchase-goal-main-menu-btn").click(function(){
		var id = Number($(this).attr("id").split("purchase-")[1]);
		console.log(id);
		$("#purchaseModal").modal({show:true});
		$("#purchase-btn").click(function(){
			// console.log("purchase");
			// $.post('/history',{
			// 	date : getDate(),
	  //           imageURL : user.goals[id].imageURL,
			// 	eventDescription : "Purchase " + user.goals[id].goalName,
	  //           availableFundsBalance : "$" + user.balance
			// });		
			$.post('/goals/'+id+"/purchase",null, function(){
				window.location.reload();
			})
		});
	});

	$(".add-money-main-menu-btn").click(function(){
		var id = Number($(this).attr("id").split("add-money-")[1]);
		setupModal(2, id);
		$("#modal-add-money").modal({show:true});
	})

	$('#logout-btn').click(function(){
		window.location.href = "/";
	})

	$('#history-tab').click(function(){
		window.location.href = "/history";
	});

	$('#earn-tab').click(function(){
		window.location.href = "/earn";
	});
});

var newGoalClick = function(){
	window.location.href = "/newGoal"; 

}

var hoverFunc = function() {
	$(this).find('.hover-div').stop(true, false).fadeTo("fast", 1);
	$(this).find('.non-hover-div').stop(true, false).fadeTo("fast", .5);
}

var unhoverFunc = function() {
    $(this).find('.hover-div').stop(true, false).fadeTo("fast", 0);
    $(this).find('.non-hover-div').stop(true, false).fadeTo("fast", 1);
}

var openGoalClick = function(){
	var id = $(this).parent().parent().parent().attr("id").split("goal")[1];
	console.log(id);
	$("#home-screen").hide();
	$("#goal-menu-"+id).show();
	$("#back"+id).click(function(){
		$("#goal-menu-"+id).hide();
		$("#home-screen").show();
	});
	console.log("open goal "+id);
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

