// globals


$("#submit-search-info").on("click", function(event) {

event.preventDefault();
	
$("#articles").empty();

var keyword = $("#search-term").val();
var key = "api-key=d5fb0ee0ea2a4439a2a4f5ad63f1f268";
var startyear = "start_year=" + $("#start-year").val().trim();
var endyear = "end_year=" + $("#end-year").val().trim();
var number = $("#numRecordsSelect").val();
var queryurl;

if ($("#start-year").val().trim().length === 4 && $("#end-year").val().trim() === 4) {
	queryurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&" + key + "&" + startyear + "&" + endyear;
}
else if ($("#start-year").val().trim().length === 4 && $("#end-year").val().trim() !== 4) {
	queryurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&" + key + "&" + startyear;
}
else if ($("#start-year").val().trim().length !== 4 && $("#end-year").val().trim() === 4) {
	queryurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&" + key  + "&" + endyear;
}
else {
	queryurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&" + key;
}

var numofarticles = number;

$.ajax({
	url: queryurl,
	method: "GET"
}).done(function(object) {
	for (i = 0; i < numofarticles; i++) {
		var result = object.response;
		var author = result.docs[i].byline.original;
		var date = result.docs[i].pub_date;
		var section = result.docs[i].section_name;
		var title = result.docs[i].headline.main;
		var link = result.docs[i].web_url;
		// console.log(title);
		// console.log(link);
		var indexlabel = $("<span class='label label-primary'>").html(i + 1);
		var newdiv = $("<div class='well'>");
		var titleHead = $("<h1>").html(title).prepend(indexlabel);
		var authorline = $("<p>").html(author);
		var dateline = $("<p>").html(date);
		var sectionline = $("<p>").html(section);
		var linkline = $("<a>").attr("href", link).text(link);
		newdiv.append(titleHead, authorline, dateline, sectionline, linkline);
		$("#articles").append(newdiv);

	}
})
})

$("#clear-results").on("click", function() {
	event.preventDefault();
	$("#articles").empty();
})