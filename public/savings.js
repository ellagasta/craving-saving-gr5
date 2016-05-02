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
		$.post('/history',{
			date : getDate(),
            imageURL : 'images/piggy-broken-transparent.png',
			eventDescription : "Empty $" + user.savingsBalance.toFixed(2) + " from Savings Account",
            availableFundsBalance : "$" + (user.balance + user.savingsBalance).toFixed(2)
		});		
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