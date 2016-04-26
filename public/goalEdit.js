$(document).ready(function (){

	$("#edit-goal-name").focus(function(){
		$(this).select();
	});

	$("#goal-price").focus(function(){
		$(this).select();
	})

	$("#back").click(function(){
		window.location.href = "/profile";
	});

	$("#logo").click(function(){
		window.location.href='/profile';
	})
	$('#spend-now-btn').click(function(){
		console.log("spend-now");
		$('#modal-add-money').modal({show:true});
	});

	$("#cancel-btn").click(function(){
		if(user.goals[id].created){
			window.location.href = '/goals/'+id;
		} else {
			$.ajax({
			    url: '/goals/'+id,
			    type: 'DELETE',
			    success: function(result) {
			    	window.location.href = '/profile';
			    }
			});
			window.location.href = "/profile";
		}
	});

	$("#save-btn").click(function(){
		$.post('/goals/'+id+'/edit',{
			price : Number($("#goal-price").val()),
			goalName : $("#edit-goal-name").val(),
			created : true
		},function(){
			window.location.href = '/goals/'+id;
		});
	});

	$("#goal-photobox").mouseenter(function(){
		$('html,body').css('cursor','pointer');
		$("#goal-photobox .goal-img").css("opacity", .5);
	})

	$("#goal-photobox").mouseleave(function(){
		$('html,body').css('cursor','default');
		$("#goal-photobox .goal-img").css("opacity", 1);
	})

	$("#goal-photobox").click(function(){
		$("#photoModal").modal({show:true});
	});

	$("#uploadPhotoBox").click(function(){
		$("#lightsaber").show();
		$("#uploadPhotoBox").hide();
	})

	// $("#submit-photo-btn")
});
