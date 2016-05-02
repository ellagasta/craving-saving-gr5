$(document).ready(function (){

	createTableBody();

	$('#goals-tab').click(function(){
		window.location.href = "/profile";
	});

	$('#earn-tab').click(function(){
		window.location.href = "/earn";
	});

});

function createTableBody() {
	var tbody = "<tbody id='history-table-body'>";
	var length = user.history.length;
	for (var i = 0; i < length; i++) {
		var newRow = "<tr><td>" + user.history[length-i-1].date + "</td>";
		newRow += "<td><img src='" + user.history[length-i-1].imageURL + "' class='history-img'></td>";
		newRow += "<td>" + user.history[length-i-1].eventDescription + "</td>";
		newRow += "<td>" + user.history[length-i-1].availableFundsBalance + "</td>";
		tbody += newRow;
	}
	tbody += "</tbody>";
	$("#history-table").append(tbody);
}

