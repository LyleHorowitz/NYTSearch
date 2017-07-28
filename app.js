// globals

var keyword = "new york";
var key = "api-key=d5fb0ee0ea2a4439a2a4f5ad63f1f268";
var queryurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&" + key;

// placeholders
var begindate;
var enddate;
var numofarticles = 5;


$.ajax({
	url: queryurl,
	method: "GET"
}).done(function(object) {
	for (i = 0; i < numofarticles; i++) {
		var result = object.response;
		var author = result.docs[i].byline.original;
		console.log(author);
		var date = result.docs[i].pub_date;
		console.log(date);
		var section = result.docs[i].section_name;
		console.log(section);
		var title = result.docs[i].headline.main;
		var link = result.docs[i].web_url;
		// console.log(title);
		// console.log(link);
	}
})