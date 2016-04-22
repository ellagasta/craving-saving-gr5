$(document).ready(function (){
	var original_name;
	var original_price;

	$("#edit-goal-name").focus(function(){
		original_name = $("#edit-goal-name").val();
		$("#edit-goal-name").val("");
	});

	$("#edit-goal-name").focusout(function(){
		if ($("#edit-goal-name").val() == ""){
			$("#edit-goal-name").val(original_name);
		}
	});

	$("#goal-price").focus(function(){
		original_price = $("#goal-price").val();
		$("#goal-price").val("");
	})

	$("#goal-price").focusout(function(){
		if ($("#goal-price").val() == ""){
			$("#goal-price").val(original_price);
		}else{
			var inputPrice = Number($("#goal-price").val());
			if (isNaN(inputPrice) || inputPrice <= 0){
				$("#goal-price").val(original_price);
			}else{
				$("#goal-price").val(inputPrice.toFixed(2));
			}
		}
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

	$("#edit-goal-name").focus();

	$("#cancel-btn").click(function(){
		// quick fix. need to have a way to check if this is a newly created goal or not.
		if(user.goals[id].goalName == ""){
			$.ajax({
			    url: '/goals/'+id,
			    type: 'DELETE',
			    success: function(result) {
			    	window.location.href = '/profile';
			    }
			});
			window.location.href = "/profile";
		} else {
			window.location.href = '/goals/'+id;
		}
	});

	$("#save-btn").click(function(){
		$.post('/goals/'+id+'/edit',{
			price : Number($("#goal-price").val()),
			goalName : $("#edit-goal-name").val()
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
