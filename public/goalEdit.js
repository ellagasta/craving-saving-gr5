$(document).ready(function (){
    $('[data-toggle="popover"]').popover(); 
    $('[data-toggle="tooltip"]').tooltip({ 
	    placement : 'bottom'
	});

	$("#edit-goal-name").val(user.goals[id].goalName);

	var newPhoto = "";

	$("#edit-goal-name").click(function(){
		$(this).select();
	});

	$("#goal-price").click(function(){
		$(this).select();
	});

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
			created : true,
			imageURL : $("#goal-photo")[0].src
		},function(){
			window.location.href = '/goals/'+id;
		});
	});

	// $("#save-btn").click(function(){
	// 	console.log("posting");
	// 	$.post('/history/'+id,{
 // 			date : "050432",
 //     		imageURL : "testing",
 //     		eventDescription : "testing",
 //     		availableFundsBalance : 500
 // 		},function(){
 // 			window.location.href = '/history/'+id;
 // 		});
	// });

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

	$("#submit-photo-btn").click(function(){
		newPhoto = $('#new-goal-photo')[0].src
		$("#goal-photo")[0].src = newPhoto;
	});
    
    $("#goal-price").change(function(){
        $("#goal-price").val(Number($("#goal-price").val()).toFixed(2));
    });
});

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#new-goal-photo')
				.attr('src', e.target.result).height(300);
		};

		reader.readAsDataURL(input.files[0]);
	}
}
