$(document).ready(function (){

	$('#goals-tab').click(function(){
		window.location.href = "/profile";
	});

	var currHistoryRows = $('#history-table tr').length;
		console.log(currHistoryRows);
		console.log(user.history.length);
		for (var i = 0; i < user.history.length; i++) {
			var newRow = "<tr><td>" + user.history[i].date + "</td>";
			newRow += "<td><img src='" + user.history[i].imageURL + "' class='history-img'></td>";
			newRow += "<td>" + user.history[i].eventDescription + "</td>";
			newRow += "<td>" + user.history[i].availableFundsBalance + "</td>";
			$("#history-table-body").append(newRow);
		}

});

