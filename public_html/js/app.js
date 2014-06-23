$(document).ready(function(e) {	
	function PlayRadio(url){
		
	}
	
	function LoadData(){
		$.get("http://app.host-1gb.com/radio.php", function(data){
			$("#radio-online, #radio-fm").html('');
			for (var i=0;i<data.length;i++){
				var html = '';
				html += '<a class="box-radio" href="' + data[i]['url'] + '">';
				html += '<div class="image">';
				html += '<img src="' + data[i]['icon'] + '" class="image-icon">';
				html += '<div class="back-play"><i class="fa fa-play"></i></div>';
				html += '</div>';
				html += '<h4>' + data[i]['name'] + '</h4>';
				html += '</a>';
				if (data[i]['type'] == 'online'){
					$("#radio-online").append(html);
				}else if (data[i]['type'] == 'fm'){
					$("#radio-fm").append(html);
         	   }
			}
		
			$(".box-radio").click(function(e) {
				e.preventDefault();
				$(".box-radio.active").removeClass("active");
				$(this).addClass("active");
				$("#radio-play").attr("src", $(this).attr("href")).trigger("play");
				$(".pause-play").removeClass("show-play").removeClass("show-pause").addClass("show-loading");
    		});
		}, "json")
		.fail(function() {
			$("#radio-online, #radio-fm").html('<button class="reload btn btn-block">ลองใหม่อีกครั้ง</button>');
			$(".reload").click(function(e) {
        		LoadData();
			});
			$("#alert-error").show();
		});
	}
	
	LoadData();
	
	$("#radio-play").on("loadeddata", function(){
		$(".pause-play").removeClass("show-play").removeClass("show-loading").addClass("show-pause");
	});
	
	$("#pause").click(function(e) {
		$("#radio-play").trigger("pause");
		$(".pause-play").removeClass("show-pause").removeClass("show-loading").addClass("show-play");
	});
	
	$("#play").click(function(e) {
		if ($("#radio-play").attr("src")){
			$("#radio-play").trigger("play");
			$(".pause-play").removeClass("show-play").removeClass("show-loading").addClass("show-pause");
		}
	});
	
	$("#radio-play")[0].volume = 1;
	
	$("#back").click(function(e) {
		$(".active").prev().trigger("click");
    });
	
	$("#next").click(function(e) {
        $(".active").next().trigger("click");
    });
	
	$(".alert-popup #cancel").click(function(e) {
        $(this).parents(".alert-popup").fadeOut();
    });
});