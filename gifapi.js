
var topics = ["toffe", "html", "node", "taco-bell", "soccer",
	"Accord", "Maxican"];
var input = "";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=10&sort=relevent&&api_key=dc6zaTOxFJmzC";
var APIKey ="dc6zaTOxFJmzC";


// Function to loop through the array of topics and create buttons for each
function renderButtons() {

	$("#buttons-view").empty();

	// Iterate through the topics array and assign each to a new button
	for (var i = 0; i < topics.length; i++) {
		  var newTopic = $("<button>");
		  newTopic.addClass("topicSearch");
		  newTopic.attr("topic-name", topics[i]);
		  newTopic.text(topics[i]);
		  $("#buttons-view").append(newTopic);
	}

	// On-click function to reset the input field after clicking the submit button
	$(".Topic-form").on("click", function() {
		this.reset();
	})
}


// Function to pull search results (JSON) from giphy and append images
function displayGiphy() {

	// $("#giphy").empty();
	input = $(this).attr("topic-name");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=10&api_key=dc6zaTOxFJmzC";
	console.log(input);
	$.ajax ({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		for(x = 0; x < 10; x++) {

			// Pulls and displays data from the "rating" object
	        var rating = response.data[x].rating;
	        var caption = $("<p>").text("Rating: " + rating);
	        $("#giphy").prepend(caption);

	        image = $("<img>");
	        image.addClass("imageLayout");
	        // image.addClass("image" + [j]);
	        image.attr("src", response.data[x].images.original_still.url);
	        image.attr("data-alt", response.data[x].images.original_still.url);
	        image.attr("data-gif", response.data[x].images.original.url);
	        image.attr("data-state", "still");

	        $("#giphy").prepend(image);

	        console.log(image);



        // Creates an on-click function to start/stop animation by cycling through still and gif versions
		       	$(".imageLayout").on("click", function() {
		       		var moving = $(this).attr("data-state");

		       		var animate = $(this).attr("data-gif");
		       		var still = $(this).attr("data-alt");

			    	// var imgSrc = $(this).attr("src");
			    	// var imgAlt = $(this).attr("data-alt");
			    	// var imgData = $(this).attr("data-gif");

			    	if(moving === "still") {
			    		$(this).attr("src", animate);
			    		$(this).attr("data-state", "animate");
			    		console.log("Turn Gif On");
			    		// imgSrc = imgData;
			    	}
			    	if(moving != "still") {
			    		$(this).attr("src", still);
			    		$(this).attr("data-state", "still");
			    		console.log("Turn Gif Off");
			    	}
				})
		}
	})
}


$("#add-topic").on("click", function(event) {
	event.preventDefault();

	var topic = $("#topic-input").val().trim();

	topics.push(topic);

	renderButtons();

});

$(document).on("click", ".topicSearch", displayGiphy);

renderButtons();