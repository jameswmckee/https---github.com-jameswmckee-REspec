$(document).ready(function(){	
	//build dropdown
	$("<select />").appendTo("nav#main_menu div");
	
	// Create default option "Go to..."
	$("<option />", {
	   "selected": "selected",
	   "value"   : "",
	   "text"    : "Please choose page"
	}).appendTo("nav#main_menu select");	
	
	// Populate dropdowns with the first menu items
	$("nav#main_menu li a").each(function() {
	 	var el = $(this);
	 	$("<option />", {
	     	"value"   : el.attr("href"),
	    	"text"    : el.text()
	 	}).appendTo("nav#main_menu select");
	});
	
	//make responsive dropdown menu actually work			
  	$("nav#main_menu select").change(function() {
    	window.location = $(this).find("option:selected").val();
  	});
	
	//Iframe transparent
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
			
	//Twitter Setup
	$('.tweet_module').tweet({
		modpath: 'twitter/',
		count: 2,
		username : 'your_name'
	 });
	
	//PrettyPhoto
	$("a[rel^='prettyPhoto']").prettyPhoto();
	
	//Image hover
	$(".hover_img").live('mouseover',function(){
			var info=$(this).find("img");
			info.stop().animate({opacity:0.49},300);
			$(".preloader").css({'background':'none'});
		}
	);
	$(".hover_img").live('mouseout',function(){
			var info=$(this).find("img");
			info.stop().animate({opacity:1},300);
			$(".preloader").css({'background':'none'});
		}
	);
	
	//Zoom, Link effect
	jQuery(".hover_img").live('mouseover',function(){
			jQuery(this).find(".zoom").stop().animate({'top':'50%'},600, 'easeInOutBack');
			jQuery(this).find(".link").stop().animate({'bottom':'50%'},600, 'easeInOutBack');
		}
	);
	jQuery(".hover_img").live('mouseout',function(){
			jQuery(this).find(".zoom").stop().animate({'top':'-200px'},600, 'easeInOutBack');
			jQuery(this).find(".link").stop().animate({'bottom':'-200px'},600, 'easeInOutBack');
		}
	);
	
	
	
	//Accordion
	$(document).ready(function(){
		//accordion
		$(".accordion h3").eq(0).addClass("active");
		$(".accordion .accord_cont").eq(0).show();
	
		$(".accordion h3").click(function(){
			$(this).next(".accord_cont").slideToggle("slow")
			.siblings(".accord_cont:visible").slideUp("slow");
			$(this).toggleClass("active");
			$(this).siblings("h3").removeClass("active");
		});	
						
	});
	
	
							
});	