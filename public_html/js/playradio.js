$("#radio-play").on("loadeddata", function(){
	$(".list-radio button.active").removeClass("loading");
	$("#box-radio > #Play").css("opacity", 1).hide();
	$("#box-radio > #Loading").hide();
	$("#box-radio > #Pause").show();
});

$.get("http://app.host-1gb.com/radio.php", function(data){
	$(".slide-one").html('');
	for (var i=0;i<data.length;i++){
            var html = '';
            if (data[i]['type'] == 'online'){
		html += "<button data-src=\"" + data[i]['url'] + "\">\n";
		html += "<h2>" + data[i]['name'] + "</h2>\n";
		html += "<div>" + data[i]['description'] + "</div>\n"
		html += "</button>\n";
		$(".slide-online").append(html);
            }else if (data[i]['type'] == 'fm'){
		html += "<button data-src=\"" + data[i]['url'] + "\">\n";
		html += "<h2>" + data[i]['name'] + "</h2>\n";
		html += "<div>" + data[i]['description'] + "</div>\n"
		html += "</button>\n";
		$(".slide-fm").append(html);
            }
	}
        
        $("#loadind-page").hide();
	
	$("button").click(function(e) {
		$(".list-radio button.active").each(function(index) {
			$(this).removeClass("active").removeClass("loading");
		});
		$(this).addClass("active");
		$("#radio-play").attr("src", $(this).attr("data-src")).trigger("play");
		$(this).addClass("loading");
		$("#box-radio > #Pause").hide();
		$("#box-radio > #Loading").show();
		$("#box-radio > #Play").css("opacity", 1).hide();
		$("#box-radio > h1").text($(this).find("h2").text());
	});
        
        var mySwiper = new Swiper('.swiper-container');
        
        $(".swiper-wrapper, .slide-online, .slide-fm").height("auto");
}, "json")
.fail(function() {
        var html = '<div class="box-error">ไม่สามารถเชื่อมต่อเพื่อดึงรายการสถานีเพลงได้ โปรดตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของคุณ หรือลองใหม่ภายหลัง</div>';
        $(".list-radio").html(html);
});

$("#Pause").click(function(e) {
	$("#radio-play").trigger("pause");
	$("#box-radio > #Play").show();
	$("#box-radio > #Pause").hide();
	
});

$("#Play").click(function(e) {
	if ($("#radio-play").attr("src")){
		$("#radio-play").trigger("play");
		$("#box-radio > #Play").hide();
		$("#box-radio > #Pause").show();
	}
});

$("#volumeset").change(function(e) {
	if ($(this).val() == 0)
		$("#volume").attr("src", "image/volume-icon-0.png");
	else if (($(this).val() > 0) && ($(this).val() < 40))
		$("#volume").attr("src", "image/volume-icon-1.png");
	else if (($(this).val() > 40) && ($(this).val() < 60))
		$("#volume").attr("src", "image/volume-icon-2.png");
	else if (($(this).val() > 60))
		$("#volume").attr("src", "image/volume-icon-3.png");
    var volume = $(this).val() / 100;
	$("#radio-play")[0].volume = volume;
});

$("#volumeset").mousemove(function(e) {
	if ($(this).val() == 0)
		$("#volume").attr("src", "image/volume-icon-0.png");
	else if (($(this).val() > 0) && ($(this).val() < 40))
		$("#volume").attr("src", "image/volume-icon-1.png");
	else if (($(this).val() > 40) && ($(this).val() < 60))
		$("#volume").attr("src", "image/volume-icon-2.png");
	else if (($(this).val() > 60))
		$("#volume").attr("src", "image/volume-icon-3.png");
    var volume = $(this).val() / 100;
	$("#radio-play")[0].volume = volume;
});

$("#radio-play")[0].volume = 0.5;