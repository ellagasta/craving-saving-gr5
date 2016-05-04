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

	$('#spend-now-btn').click(function(){
		setupModal(0);
		$("#modal-add-money").modal({show:true});
	});
});

