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
	
	$("#logo").click(function(){
		window.location.href='/profile';
	})
	
	$("#empty-savings-btn").click(function(){
		$("#emptyModal").modal({show:true});
	})

	$("#emptyModal").find(".btn-danger").click(function(){
		$.post('/history',{
			date : getDate(),
            imageURL : 'images/piggy-broken-transparent.png',
			eventDescription : "Empty Savings Account",
			changeToBalance : "$"+user.savingsBalance.toFixed(2),
            availableFundsBalance : "$" + (user.balance + user.savingsBalance).toFixed(2)
		}, function() {
			$.ajax({
			    url: '/savings',
			    type: 'DELETE',
			    success: function(result) {
			    	window.location.href = '/profile';
			    }
			});
		});		
	});

	$("#emptyModal").find(".btn-default").click(function(){
		$("#emptyModal").modal({show:false});
	});

	$("#add-to-savings").click(function(){
		setupModal(1);
		$("#modal-add-money").modal({show:true});
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

	$('#goals-tab').click(function(){
		window.location.href = "/profile";
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