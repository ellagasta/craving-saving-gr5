$(document).ready(function (){
	$("#back").click(function(){
		window.location.href = "/profile";
	});
	
	$("#logo").click(function(){
		window.location.href='/profile';
	})
	
	$("#empty-savings-btn").click(function(){
		$("#emptyModal").modal({show:true});
	})

	$("#emptyModal").find(".btn-danger").click(function(){
		$.post('/savings/',function(result) {
		    	window.location.href = '/profile';
		    }
		);
	});
	$("#emptyModal").find(".btn-default").click(function(){
		$("#emptyModal").modal({show:false});
	});
});
