$(document).ready(function (){
    $('[data-toggle="popover"]').popover(); 
    $('[data-toggle="tooltip"]').tooltip({ 
	    placement : 'bottom'
	});


	$("#modal-add-money").on("shown.bs.modal",function(){
		refreshDisplay();
	});

	$('#spend-now-btn').click(function(){
		setupModal(0);
		$("#modal-add-money").modal({show:true});
	});

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
		// $.post('/history',{
		// 	date : getDate(),
  //           imageURL : $("#goal-photo")[0].src,
		// 	eventDescription : "Create " + $("#edit-goal-name").val() + " Goal of Amount " + $("#goal-price").val(),
  //           availableFundsBalance : "$" + user.balance.toFixed(2)
		// },function(){
			$.post('/goals',{
				price : Number($("#goal-price").val()),
				goalName : $("#edit-goal-name").val(),
				created : true,
				imageURL : $("#goal-photo")[0].src
			},function(){
				window.location.href = '/goals/'+id;
			});	
		// });		
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

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yy = today.getFullYear() % 100;
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = mm+'/'+dd+'/'+yy;
    return today;
}