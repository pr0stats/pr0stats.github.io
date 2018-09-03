$(document).ready(function() {
	// Image toggle (show large image on click)
	$('.image-toggle').hide();
	$('.image-toggle-button').click(function() {
		$(this).next('.image-toggle').show();
		$(this).hide();
	});

	// Table of contents: hide all submenu items that don't have corresponding h2 headlines
	$('.toc.toc-analysen li').hide();
	$('.toc.toc-analysen li').each(function() {
		var href = $(this).find('a').attr('href');
		if ($("h2"+href).length > 0){
			$(this).show();
		}
	});

	// Table of contents for analysen archive
	if($('body').hasClass('archive')) {
		if ($("h1").length > 0){
			$('body.archive h1').first().before('<ul class="toc"></ul>');
			var toc = $('body.archive .toc');
			
			// Add years to primary subnav
			$('body.archive h1').each(function() {
				var href = $(this).find('a').attr('href');
				var name = $(this).text().substr(1);
				toc.append('<li><a href="'+href+'">'+name+'</a></li>');
			});
			
			// Add month to year subnav
			$('body.archive h2').each(function() {
				var parent = $(this).prev('h1');
				parent.after('<ul class="toc"></ul>');
				var href = $(this).find('a').attr('href');
				var name = $(this).text().substr(1);
				parent.next('.toc').append('<li><a href="'+href+'">'+name+'</a></li>');
			});
		} else {
			// Add month to year subnav
			$('body.archive h2').first().before('<ul class="toc"></ul>');
			$('body.archive h2').each(function() {
				var href = $(this).find('a').attr('href');
				var name = $(this).text().substr(1);
				$('.toc').append('<li><a href="'+href+'">'+name+'</a></li>');
			});
		}
	}

	// Keynav for index, methodik and archive
	$("body").keydown(function(e) {
		if (e.keyCode == 73) { // i -> index
			window.location.href = '/index.html';
		} else if (e.keyCode == 77) { // m -> methodik
			window.location.href = '/methodik.html';
		} else if (e.keyCode == 65) { // a -> archive
			window.location.href = '/analysen/index.html';
		}
	});
	
	// Left and right arrow navigation
	if(document.URL.indexOf("/analysen/") > -1) {
		var pages = Array(
			'index.html',
			'01-tagcloud.html',
			'02-altschwuchteln-vs-neuschwuchteln-top-uploader.html',
			'03-uploads-nach-quartal-tag-wochentag.html',
			'04-dateitypen.html',
			'05-uploads-pro-tag.html',
			'06-anteil-reposts.html',
			'07-uploads-nach-stunde.html',
			'08-top-ten-juni-2014.html',
			'09-tagcloud-juli1.html',
			'10-tagcloud-juli2.html',
			'11-tagcloud-juli3.html',
			'12-tagcloud-juli4.html',
			'13-safe-for-distribution.html',
			'14-top-five-engaging-uploads.html',
			'15-tagcloud-wuerde.html',
			'16-tagcloud-juni-2014.html',
			'17-sflevel-durchschnittswerte.html',
			'18-vergleich-werktage-wochenende.html',
			'19-beliebte-posts-usergruppen.html',
			'20-pr0gramm-hat-auftrag.html',
			'21-korrelation-upvotes-kommentare.html',
			'22-top-ten-juli-2014.html',
			'23-wochenstatistik-kw-35.html',
			'24-wochenstatistik-kw-35.html',
			'25-wochenstatistik-kw-36.html',
			'26-wochenstatistik-kw-37.html',
			'27-top-15-staedte.html',
			'28-pr0gramm-hat-auftraege.html',
			'29-tagcloud-august2014.html',
			'30-wochenstatistik-kw-38.html',
			'31-wochenstatistik-kw-39.html',
			'32-wochenstatistik-kw-40.html',
			'33-loeschrate-sommerferien.html'
		);
		var index = pages[0];
		var currenturl = document.location.pathname;
		var match = currenturl.match(/[^\/]+$/);
		if(match !== null) {
			currentfile = match[0];
		} else {
			currentfile = index;
		}
		var currentkey  = jQuery.inArray(currentfile, pages);
		var prev = currentkey - 1;
		var next = currentkey + 1;
		
		if(prev < 0) {
			prev = false;
		} else {
			prev = pages[prev];
			$('body').append('<div id="keynav-left" class="keynav">◄</div>');
		}
		
		if(next > pages.length-1) {
			next = false;
		} else {
			next = pages[next];
			$('body').append('<div id="keynav-right" class="keynav">►</div>');
		}
		
		// Keynav by left and right button
		// Key up redirects to index
		$("body").keydown(function(e) {
			if (e.keyCode == 37 && prev !== false) {// left
				$("#keynav-left.keynav").addClass("activate");
				window.location.href = prev;
			} else if (e.keyCode == 39 && next !== false) {// right
				$("#keynav-right.keynav").addClass("activate");
				window.location.href = next;
			}
		});
		
		// Keynav by clicking the left or right arrow
		$("#keynav-left").click(function() {
			window.location.href = prev;
		});
		$("#keynav-right").click(function() {
			window.location.href = next;
		});

		// Keynav for touch devies
		// $("body").on("swipeleft", swipeHandler("left"));
		// $("body").on("swiperight", swipeHandler("right"));
		// function swipeHandler(event, side) {
			// if(side !== false) {
				// window.location.href = side;
			// }
		// }
	}

});

$(function() {
	// Thumbnail hover and click raw images
	$('.thumbnail').before('<span class="thumbnail-hover-overlay">Klick für Vollbild</span>');
	
	$(".thumbnail-hover-overlay").css("opacity", "0");

	// mouse over
	$(".thumbnail-hover-overlay").hover(function() {
		$(this).stop().animate({
			opacity : .85
		}, "fast");
	},

	// mouse out
	function() {
		$(this).stop().animate({
			opacity : 0
		}, "fast");
	});
});

// Google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-53004741-1', 'auto');
ga('send', 'pageview');