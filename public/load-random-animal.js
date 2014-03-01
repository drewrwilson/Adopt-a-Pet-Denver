
//requires jquery
$(function  () {
	var animaldata;

	$.getJSON("http://adoptabledenver.herokuapp.com/", function(data) {
    animaldata = data;
    // data is a JavaScript object now. Handle it as such
   //Get the HTML from the template   in the script tag
    var theTemplateScript = $("#animal-template").html(); 

   //Compile the template
    var compiledTemplate = Handlebars.compile (theTemplateScript); 
    $('#the-thing').append (compiledTemplate (animaldata));

	});
	

});