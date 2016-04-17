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

	$('#spend-now-btn').click(function(){
		console.log("spend-now");
		$('#modal-add-money').modal({show:true});
	});

	$("#edit-goal-name").focus();

	$("#cancel-btn").click(function(){

	});

	$("#save-btn").click(function(){
		$.post('/goals/'+id+'/edit',{
			price : Number($("#goal-price").val()),
			goalName : $("#edit-goal-name").val()
		},function(){
			window.location.href = '/goals/'+id;
		});
	});

});
