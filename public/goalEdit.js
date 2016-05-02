$(document).ready(function (){

	$("#edit-goal-name").val(user.goals[id].goalName);

	var newPhoto = "";

	$("#edit-goal-name").click(function(){
		$(this).select();
	});

	$("#goal-price").click(function(){
		$(this).select();
	});

	$("#back").click(function(){
		$('#backFromEditModal').modal({show:true});
	});

	$("#logo").click(function(){
		window.location.href='/profile';
	})

	$('#spend-now-btn').click(function(){
		console.log("spend-now");
		$('#modal-add-money').modal({show:true});
	});

	$("#cancel-btn, #modal-cancel-btn").click(function(){
		console.log("cancel");
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

	$("#save-btn, #modal-save-btn").click(function(){
		console.log("post to history");
		$.post('/history',{
			date : getDate(),
            imageURL : $("#goal-photo")[0].src,
			eventDescription : "Edit Goal " + $("#edit-goal-name").val(), // TODO fix this
            availableFundsBalance : "$" + user.balance.toFixed(2)
		});		
		$.post('/goals/'+id+'/edit',{
			price : Number($("#goal-price").val()),
			goalName : $("#edit-goal-name").val(),
			created : true,
			imageURL : $("#goal-photo")[0].src
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



// function goalEditGetsHistoryEvent(oldImageURL, newImageURL, oldGoalName, newGoalName, oldGoalPrice, newGoalPrice) {
// 	return oldImageURL != newImageURL || oldGoalName != newGoalName || oldGoalPrice != newGoalPrice;
// }

// function getEditGoalDescription(oldImageURL, newImageURL, oldGoalName, newGoalName, oldGoalPrice, newGoalPrice) {
// 	var eventDescription = "";
// 	if (newGoalName != oldGoalName) {
// 		eventDescription += "Change Goal Name from " + oldGoalName + " to " + newGoalName;
// 		if (oldGoalPrice != newGoalPrice) {
// 			eventDescription += " and ";
// 		}
// 	}
// 	if (oldGoalPrice != newGoalPrice) {
// 		eventDescription += "Change Goal Amount from " + oldGoalPrice + " to " + newGoalPrice;
// 	}
// 	if (eventDescription == "") {
// 		eventDescription += "Update " + newGoalName + " Goal photo";
// 	}
// 	return eventDescription;
// }

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
    console.log(today);
    return today;
}

