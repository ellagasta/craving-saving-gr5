$(document).ready(function (){

	$('#goals-tab').click(function(){
		window.location.href = "/profile";
	});

	$('#history-tab').click(function(){
		window.location.href = "/history";
	});
	
	$('#logout-btn').click(function(){
		window.location.href = "/";
	});

});

