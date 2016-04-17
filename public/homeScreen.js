$(document).ready(function () {
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
