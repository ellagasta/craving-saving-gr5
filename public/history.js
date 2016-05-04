$(document).ready(function (){

	createTableBody();

	$('#goals-tab').click(function(){
		window.location.href = "/profile";
	});

	$('#earn-tab').click(function(){
		window.location.href = "/earn";
	});

	$('#logout-btn').click(function(){
		window.location.href = "/";
	});

});

function createTableBody() {
	var tbody = "<tbody id='history-table-body'>";
	var length = user.history.length;
	for (var i = 0; i < length; i++) {
		var newRow = "<tr><td>" + user.history[length-i-1].date + "</td>";
		newRow += "<td><img src='" + user.history[length-i-1].imageURL + "' class='history-img'></td>";
		newRow += "<td>" + user.history[length-i-1].eventDescription + "</td>";
		console.log(user.history[length-i-1].changeToBalance);
		if(user.history[length-i-1].changeToBalance.substring(0,1) == "-") {
			newRow += "<td class='red-text' style='text-align: right; padding-right: 20px;'>";
		} else if(user.history[length-i-1].changeToBalance == "$0.00") {
			newRow += "<td class='blue-text' style='text-align: right; padding-right: 20px;'>";
		} else {
			newRow += "<td class='green-text' style='text-align: right; padding-right: 20px;'>+";
		}
		newRow += user.history[length-i-1].changeToBalance + "</td>";
		newRow += "<td style='text-align: right; padding-right: 40px;'>" + user.history[length-i-1].availableFundsBalance + "</td>";
		tbody += newRow;
	}
	tbody += "</tbody>";
	$("#history-table").append(tbody);
}

