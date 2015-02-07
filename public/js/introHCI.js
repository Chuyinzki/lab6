'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(function(e) {
		var projectID = $(this).closest('.project').attr('id');
		//console.log("User clicked on project " + projectID)
		var idNumber = projectID.substr('project'.length);
		$.get("/project/" + idNumber, addProjectDetails);
		//console.log("URL called: /project/" + idNumber);
	});

	$('#colorBtn').click(function(e) {
		$.get("/palette",randomizeColors);
	});
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(result) {
	// Prevent following the link
	//result.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	//var idNumber = projectID.substr('project'.length);

	//console.log("User clicked on project " + projectID);

	console.log(result);
	var projectHTML = '<a href="#" class"thumbnail">' +
	'<img src="' + result['image'] + '" class = "detailsImage">' +
	'<h5><small>' + result['date'] + '</small></h5></a>' +
	'<p>' + result['summary'] + '</p>';

	//$(".details").html(projectHTML);
	var resultID = "project" + result['id'];
	//console.log("Result ID is: " + resultID);

	$('.details#'+resultID).html(projectHTML);
	//$('.details#'+resultID).html(result['summary']);

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(result) {
	console.log(result);
	var colors1 = result['colors'];
	var colors = colors1['hex'];
	console.log(colors);
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}