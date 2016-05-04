$(document).ready(function (){
    $('[data-toggle="popover"]').popover(); 
    $('[data-toggle="tooltip"]').tooltip({ 
	    placement : 'bottom'
	});

	$("#modal-add-money").on("shown.bs.modal",function(){
		refreshDisplay();
	});

	$("#back").click(function(){
		window.location.href = "/profile";
	});
		
	$("#delete-goal-btn").click(function(){
		$("#deleteModal").modal({show:true});
	})

	$("#return-to-goals-btn").click(function(){
		window.location.href = "/profile";
	});

	$("#deleteModal").find(".btn-danger").click(function(){
		$.post('/history',{
			date : getDate(),
            imageURL : user.goals[id].imageURL,
			eventDescription : "Delete " + user.goals[id].goalName,
			changeToBalance : "$" + user.goals[id].saved.toFixed(2),
            availableFundsBalance : "$" + (user.balance + user.goals[id].saved).toFixed(2)
		},function() {
			$.ajax({
			    url: '/goals/'+id,
			    type: 'DELETE',
			    success: function(result) {
			    	window.location.href = '/profile';
			    }
			});
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

	$('#spend-now-btn').click(function(){
		setupModal(0);
		$("#modal-add-money").modal({show:true});
	});

	$("#purchase-btn").click(function(){
		$.post('/history',{
		 	date : getDate(),
            imageURL : user.goals[id].imageURL,
		 	eventDescription : "Purchase " + user.goals[id].goalName,
			changeToBalance : "$0.00",
			availableFundsBalance : "$" + user.balance.toFixed(2)
		 },function() {
			$.post('/goals/'+id+'/purchase',null,function(){
				window.location.href = '/profile';
			});
		});		

	});

	$('#history-tab').click(function(){
		window.location.href = "/history";
	});

	$('#earn-tab').click(function(){
		window.location.href = "/earn";
	});

	$('#logout-btn').click(function(){
		window.location.href = "/";
	});
});

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
