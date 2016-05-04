$(document).ready(function (){
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip({
	    placement : 'bottom'
	});


	$("#modal-add-money").on("shown.bs.modal",function(){
		refreshDisplay();
	});

	var newPhoto = "";

	$("#edit-goal-name").click(function(){
		$(this).select();
	});

	$("#goal-price").click(function(){
		$(this).select();
	});

	$("#back").click(function(){
		$('#backFromNewEditModal').modal({show:true});
	});

	$("#cancel-btn, #modal-return-to-goals-btn").click(function(){
		window.location.href = "/profile";
	});

	$("#save-btn").click(function(){
		$.post('/goals',{
			price : Number($("#goal-price").val()),
			goalName : $("#edit-goal-name").val(),
			created : true,
			imageURL : $("#goal-photo")[0].src
		},function(){
			window.location.href = '/goals/'+id;
		});
	});

	$("#history-modal-go-to-history-btn").click(function(){
		window.location.href = "/history";
	});

	$("#earn-modal-go-to-earn-btn").click(function(){
		window.location.href = "/earn";
	});

	$("#logout-modal-logout-btn").click(function(){
		window.location.href = "/";
	});

    $("#goal-photobox").mouseenter(function(){
		$('html,body').css('cursor','pointer');
		$("#goal-photobox .goal-img").css("opacity", .5);
        $("#goal-photobox #goal-photo-hover").css("opacity", .5);
	})

	$("#goal-photobox").mouseleave(function(){
		$('html,body').css('cursor','default');
		$("#goal-photobox .goal-img").css("opacity", 1);
        $("#goal-photobox #goal-photo-hover").css("opacity", 0);
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

    $('#history-tab').click(function(){
		$('#historyFromNewEditModal').modal({show:true});
	});

	$('#earn-tab').click(function(){
		$('#earnFromNewEditModal').modal({show:true});
	});

	$('#logout-btn').click(function(){
		$('#logoutFromNewEditModal').modal({show:true});
	});
});

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
        var filesize = ((input.files[0].size/1024)/1024).toFixed(4); // MB

        if (filesize > 0.5){
            $('#photo-upload-failure').show();
        } else {
            $('#photo-upload-failure').hide();
            reader.onload = function (e) {
    			$('#new-goal-photo')
    				.attr('src', e.target.result).height(300);
    		};
    		reader.readAsDataURL(input.files[0]);
        }
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
