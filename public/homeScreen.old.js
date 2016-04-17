var hoverFunc = function() {
	$(this).find('.hover-div').stop(true, false).fadeTo("fast", 1);
	$(this).find('.non-hover-div').stop(true, false).fadeTo("fast", .5);
}

var unhoverFunc = function() {
    $(this).find('.hover-div').stop(true, false).fadeTo("fast", 0);
    $(this).find('.non-hover-div').stop(true, false).fadeTo("fast", 1);
}

var newGoalClick = function(){
	$(getHtmlForNewGoal("Goal Name Here", '10.00')).insertBefore('.add-new-goal-col');
	$(".btn.btn-default.hover-btn-top").click(openGoalClick);
	$(".btn.btn-default.hover-btn-bottom.addmode").click(function(){
		var id = $(this).parent().parent().parent().attr("id").split("goal")[1];
		console.log(id);
		addMoneyClick(id);
	});
	$('.hoverable-panel').hover(hoverFunc, unhoverFunc);
	addNewGoal();
	$("#home-screen").hide();
	$("#goal-menu-"+id).show();
	$("#back"+id).click(function(){
		console.log(id);
		$("#goal-menu-"+id).hide();
		$("#home-screen").show();
	});

}

var uploadLightsaber = function(id){
	console.log("upload the lightsaber");
	$("#photoModal"+id).find(".uploadPhotoBox").hide();
	$("#photoModal"+id).find(".lightsaber").show();
}

var replacePhotoWithLightSaber = function(id){
	console.log($("#photoModal"+id).find(".goal-pic"));
	$("#goal-menu-"+id).find(".goal-img").attr("src", "images/lightsaber.png");
	$("#goal-menu-"+id).find(".goal-img").css("border", "1px solid black");
	$("#goal-menu-"+id).find(".goal-img").css("border-radius", "4px");

	$("#goal"+id).find(".goal-icon").attr("src","images/lightsaber.png");
}


var addMoneyClick = function(id){
	$('#modal-add-money').modal({show:true});
	$("#modal-add-money").val(id);
}

var confirmPurchaseClick = function(id){
	$('#purchase-modal').modal({show:true});
	$("#purchase-modal").val(id);
	// should delete goal
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

$(document).ready(function () {
	$('#myTab a:first').tab('show');

	$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.hoverable-panel').hover(hoverFunc, unhoverFunc);

	$('.new-goal').click(newGoalClick);


	$.ajax({
    url : "goals.html",
    async:false,            //this is the trick
    success : function(result){
    		goal_html=result;
        } 
    });

	$.ajax({
	    url : "goalsEdit.html",
	    async:false,            //this is the trick
	    success : function(result){
	    		goal_edit_html=result;
	        } 
    });

    addNewGoal();

    $(".makeEditable.display").text("Savings");
    $(".goal-pic.goal-img").attr("src","images/piggy.png");
    $(".delete-goal-btn").unbind();
    $(".edit-goal-btn").remove();
    $(".goal-amt").find(".max-val").hide();
    $(".goal-amt").find(".of").hide();
    $(".goal-amt").css({
    	"position":"absolute",
    	"left":"45%"
    });
    $(".maingoal-bar").hide();
    $(".add-togoal").text("Add $ to Savings");
	$(".delete-goal-btn").text("Empty");
	$(".delete-goal-btn").css({
		"position":"absolute",
		"left":"-150px",
		"top":"-60px"
	});
	$(".delete-goal-btn").unbind();
	$(".delete-goal-btn").click(function(){
		$("#deleteModal0").find(".modal-header").find("h3").text("Empty Savings")

		$("#deleteModal0").find(".modal-body").replaceWith('<div class="modal-body" style = "height:250px"><div style="float:left; width:40%"><img src="images/piggy-broken.png" style="width:100%"/></div><div style="float:right; width:50%"><h4>Are you sure you want to empty the savings account?</h4></div></div>')


		// $("#deleteModal0").find(".modal-body").find("h4").text('Are you sure you want to empty the savings account?')
		// $("#deleteModal0").find(".modal-body").append("<img src='/images/piggy-broken.png' style='width:100px'/>");
		$("#deleteModal0").find(".btn.btn-danger").text("Yes, empty the Savings")		
		$('#deleteModal0').modal({show:true});
		//TODO: make a empty savings menu
	});
	$('#deleteModal0').find('.btn.btn-danger').first().unbind();
	$('#deleteModal0').find('.btn.btn-danger').first().click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("deleteModal")[1];

		var cur_value=$("#goal-menu-"+id).find('.goal-amt').find('.cur-val').text();
		$("#goal-menu-"+id).find('.goal-amt').find('.cur-val').text("0.00");
		$("#goal0").find('.text-center.savings-balance').text("$0.00 Saved!");

		balance+=Number(cur_value);

		var titleText = $('.available-funds').text().split("$");
		var nonbalanceText = titleText[titleText.length-2];
		var balanceText = titleText[titleText.length-1];
		$('.available-funds').text(nonbalanceText+"$"+balance.toFixed(2));
	   	createModalAddMoney();

	});






	$(".delete-goal-btn").attr("class","btn btn-danger btn-lg progress-row-btn empty-savings-btn");
})

var addNewGoal = function(){
	var thisID = goalID-1;
	$("#goals").append(goal_html);
	$('.tab-content').append(purchase_modal_html);
	$("#goal-menu").hide();
	$("#goal-menu").attr("id","goal-menu-"+thisID);
	$(".add-togoal").click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("goal-menu-")[1];
		addMoneyClick(id);
	});

	$(".purchase-goal").click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("goal-menu-")[1];
		confirmPurchaseClick(id);
	})

	$('#deleteModal').attr('id','deleteModal'+thisID);

	$('#deleteModal'+thisID).find('.btn.btn-danger').first().click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("deleteModal")[1];

		var cur_value=$("#goal-menu-"+id).find('.goal-amt').find('.cur-val').text();
		console.log(cur_value);

		$("#goal-menu-"+id).hide();
		$("#home-screen").show();
		$('#goal-menu-'+id).detach();
		$('#goal'+id).detach();

		balance+=Number(cur_value);

		var titleText = $('.available-funds').text().split("$");
		var nonbalanceText = titleText[titleText.length-2];
		var balanceText = titleText[titleText.length-1];
		$('.available-funds').text(nonbalanceText+"$"+balance.toFixed(2));
	   	createModalAddMoney();
	});

	$('#photoModal').attr('id','photoModal'+thisID);
	$("#goal-menu-"+thisID).find(".goal-pic").click(function(){
		var id = $(this).parent().parent().parent().attr("id").split("goal-menu-")[1];
		$("#photoModal"+id).modal({show:true});
		$("#photoModal"+id).find(".lightsaber").hide();
	});
	console.log("purchasemodal",thisID)
	$('#purchaseModal').attr('id','purchaseModal'+thisID);
	$("#purchaseModal"+thisID).find(".cancel-btn").click(function(){
		$(this).parent().parent().parent().parent().modal({show:false});
	});
	$("#purchaseModal"+thisID).find(".purchase-btn").click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("purchaseModal")[1];
		$("#goal-menu-"+id).hide();
		$("#home-screen").show();
		$('#goal-menu-'+id).detach();
		$('#goal'+id).detach();
	});

	$("#goal-menu-"+thisID).find(".purchase-goal.purchasemode").click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("goal-menu-")[1];
		$("#purchaseModal"+id).modal({show:true});
	});

	$("#goal"+thisID).find(".hover-btn-bottom.purchasemode").click(function(){
		var id = $(this).parent().parent().parent().attr("id").split("goal")[1];
		$("#purchaseModal"+id).modal({show:true});
	});


	$("#goal-menu-"+thisID).find('.uploadPhotoBox').click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("photoModal")[1];
		uploadLightsaber(id);
	});

	$("#goal-menu-"+thisID).find('.submitPhoto').click(function(){
		var id = $(this).parent().parent().parent().parent().attr("id").split("photoModal")[1];		
		replacePhotoWithLightSaber(id);
	})

	$(".edit-goal-btn").click(function(){
		var id = Number($(this).parent().parent().parent().attr("id").split("goal-menu-")[1]);
		$("#goal-menu-"+id).find('.edit').show();
		$("#goal-menu-"+id).find('.display').hide();
		$("#goal-menu-"+id).find('.purchasemode').hide();
		$("#goal-menu-"+id).find('.addmode').hide();

		var title = $("#goal-menu-"+id).find('.makeEditable.display').text();
		$("#goal-menu-"+id).find('.makeEditable.edit').val(title);

		var max_value = $("#goal-menu-"+id).find('.row.goal-amt.display').find(".max-val").text();
		var cur_value = $("#goal-menu-"+id).find('.row.goal-amt.display').find('.cur-val').text();

		$("#goal-menu-"+id).find('.goal-total').val(max_value);
		$("#goal-menu-"+id).find('.goal-amtedit').find('.cur-val').text(cur_value);

		$("#goal-menu-"+id).find(".save-goal").click(function(){
			var id=($(this).parent().parent().parent().attr("id").split('goal-menu-')[1]);

			$("#goal-menu-"+id).find('.edit').hide();
			$("#goal-menu-"+id).find('.display').show();
			var newName = $("#goal-menu-"+id).find('.makeEditable.edit').val();
			var newMax = $("#goal-menu-"+id).find('.goal-total').val();
			var curVal = $("#goal-menu-"+id).find('.goal-amt').find('.cur-val').text();

			if (curVal >= newMax) {
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

			console.log(curVal);

			$("#goal"+id).find(".goal-square-name").text(newName);
			$("#goal"+id).find(".progress-amount").text(curVal+'/'+Number(newMax).toFixed(2));
			$('#goal'+id).find(".progress-bar").css("width",Number(curVal)/Number(newMax)*100+"%");

			$("#goal-menu-"+id).find(".maingoal-progress").css("width",Number(curVal)/Number(newMax)*100+"%");
			$("#goal-menu-"+id).find(".progress-bar-text").text(Number(curVal)/Number(newMax)*100);
			
			$("#goal-menu-"+id).find('.makeEditable.display').text(newName);
			$("#goal-menu-"+id).find('.row.goal-amt.display').find(".max-val").text(Number(newMax).toFixed(2));
		});


		$("#goal-menu-"+id).find(".btn-danger").click(function(){
			$("#goal-menu-"+id).find('.edit').hide();
			$("#goal-menu-"+id).find('.add-togoal').show();
			$("#goal-menu-"+id).find('.display').show();

		});


	});
	


	$(".delete-goal-btn").click(function(){
		var id = Number($(this).parent().parent().parent().attr("id").split("goal-menu-")[1]);
		$('#deleteModal'+id).modal({show:true});
	});	
	$("#back").attr("id","back"+thisID);
	$("#back"+thisID).click(function(){
		var id = Number($(this).attr("id").split("back")[1]);
		$("#goal-menu-"+id).find('.edit').hide();
		$("#goal-menu-"+id).find('.display').show();

		$("#goal-menu-"+id).hide();
		$("#home-screen").show();
	});

	if (thisID!=0){
		$('.edit-goal-btn').click();
	}
}