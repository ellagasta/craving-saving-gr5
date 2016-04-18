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
		$.ajax({
		    url: '/savings',
		    type: 'DELETE',
		    success: function(result) {
		    	window.location.href = '/profile';
		    }
		});
	});
	$("#emptyModal").find(".btn-default").click(function(){
		$("#emptyModal").modal({show:false});
	});

	$("#add-to-savings").click(function(){
		setupModal(1);
		$("#modal-add-money").modal({show:true});
	});
});
