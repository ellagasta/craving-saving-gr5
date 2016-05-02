$(document).ready(function () {
    $('[data-toggle="popover"]').popover(); 
    $('[data-toggle="tooltip"]').tooltip({ 
	    placement : 'bottom'
	});

	$("#add-to-savings-btn").on("shown.bs.modal",function(){
		refreshDisplay();
	});

	$("#modal-add-money").on("shown.bs.modal",function(){
		refreshDisplay();
	});

	$("#spend-now-btn").on("shown.bs.modal",function(){
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
		$("#purchase-modal-btn").click(function(){
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
});

var newGoalClick = function(){
	$.post('/goals',user,function(data){
		window.location.href = data; //open that new goal's page
	});
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
