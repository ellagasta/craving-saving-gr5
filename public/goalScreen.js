$(document).ready(function (){
	$("#back").click(function(){
		window.location.href = "/profile";
	});
	
	$("#logo").click(function(){
		window.location.href='/profile';
	})
	
	$("#delete-goal-btn").click(function(){
		$("#deleteModal").modal({show:true});
	})
	$("#deleteModal").find(".btn-danger").click(function(){
		$.ajax({
		    url: '/goals/'+id,
		    type: 'DELETE',
		    success: function(result) {
		    	window.location.href = '/profile';
		    }
		});
	});
	$("#deleteModal").find(".btn-default").click(function(){
		$("#deleteModal").modal({show:false});
	});

	$("#edit-goal-btn").click(function(){
		window.location.href = "/goals/"+id+"/edit";
	})

	$("#add-money-to-goal-btn").click(function(){
		setupModal(2);
		$("#modal-add-money").modal({show:true});
	})

	$("#purchase-goal-btn").click(function(){
		$("#purchaseModal").modal({show:true});
	})

	$("#purchase-btn").click(function(){
		$.post('/goals/'+id+'/purchase',null,function(){
			window.location.href = '/profile';
		})
	})
});
