$(document).ready(function (){
	$("#back").click(function(){
		window.location.href = "/profile";
	});

	$("#delete-goal-btn").click(function(){
		$.ajax({
		    url: '/goals/'+id,
		    type: 'DELETE',
		    success: function(result) {
		    	window.location.href = '/profile';
		    }
		});
	})

	$("#edit-goal-btn").click(function(){
		window.location.href = "/goals/"+id+"/edit";
	})
});
