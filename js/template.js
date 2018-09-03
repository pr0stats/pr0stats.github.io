$(document).ready(function() {
	// Add header
	$.get('/template/header.html', function(response) {
		var header = response;
		$('body').prepend(header);
	});
	
	// Add footer
	$.get('/template/footer.html', function(response) {
		var footer = response;
		$('body').append(footer);
		
		// Add edit link to every page with link to github source
		var githubRepoTarget = 'https://github.com/pr0stats/pr0stats.github.io/blob/master/';
		var currentUrl = document.URL.split('/');
		var query = currentUrl.splice(3, (currentUrl.length-1));
		
		if(query.length == 1 && query[0] == "") {
			query[0] = 'index.html';
		}

		var target = githubRepoTarget + query.join('/');
		var editLink = $('.edit-link a');
		editLink.attr('href', target);
	});
});
