	
	//algolia search
	//public api
	
	var apiClient = algoliasearch('JOGCH2FTZE', '419e2068929e7ba2486943d05e51b40f');  
	var idx = apiClient.initIndex('meph_site');

	autocomplete('#mp_sbar', {
		hint: false,
		autoselect: false
	},[{
		source: autocomplete.sources.hits(idx, {
			hitsPerPage: 12,
			//restrictSearchableAttributes: 'actor_name'
		}),
		//displayKey: 'value',
		templates: {
			footer: '<div class="aa-branding">Powered by <a href="https://www.algolia.com"><img src="https://www.algolia.com/assets/algolia128x40.png" /></a></div>',
			suggestion: function(suggestion) {
				for (var hr_name in suggestion._highlightResult){
					//check match level
					if (suggestion._highlightResult[hr_name].matchLevel !== 'none') {
						if (hr_name === 'Content') {
							//only content has a snippet result
							return suggestion._snippetResult[hr_name].value + '<br>'
								+ '<span style="font-size:0.7rem;">Section: ' + suggestion.Section + '<br></span>';
						} else {
							//all others have highlighted result
							return suggestion._highlightResult[hr_name].value + '<br>'
								+ '<span style="font-size:0.7rem;">Section: ' + suggestion.Section + '<br></span>';
						}
					}
				}
			}
		}
    }
	]).on('autocomplete:selected', function(event, suggestion, dataset) {
		console.log(suggestion, dataset);
		//window.location.href = '/meph-corporate' + suggestion.URL;
	});
 