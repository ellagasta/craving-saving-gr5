$(document).ready(function(){

	$("#goal-total").spinner({
		min:0,
		max:100000,
		step:.01,
		culture:'en-US',
		numberFormat: "d",
		change: function(event,ui){
			var val;
			if ($(this).val() < 0){
				val = 0;
			}else{
				var val = Number($(this).val());
			}
			$(this).val(val.toFixed(2));

			console.log("CHANGE");
		}
	});
	$("#goal-total").keypress(function(e){
		if (e.keyCode==13){
			$("#goal-total").spinner('option','change').call($("#goal-total"));
			$("#goal-total").blur();
		}
	});
});