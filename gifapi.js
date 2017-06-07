var listOfGifs= ['cat','funny'];


function onLoadFun()
{
	for(l in listOfGifs )
	{
		console.log(listOfGifs[l]);

		var button ='<button class="callgifapi" onclick="callApi(\''+listOfGifs[l]+'\')">'+listOfGifs[l]+'</button>';
		$('#catList').append(button);
	}
		
}



function callApi(cat)
{
var gifUri='http://api.giphy.com/v1/gifs/search?q='+cat+'&api_key=dc6zaTOxFJmzC';
$( "#result" ).html( 'Loading...' );
console.log(gifUri);
$.get( gifUri, function( res ) {
	console.log(res);


var dataset=res.data;
	for(i in dataset )
	{
		console.log(dataset[i]);
		var daSet=dataset[i];
		var imgsrc=daSet['images']['downsized'].url;
		console.log(imgsrc);
		var img='<img width="150" height="150" src="'+imgsrc+'" alt="git" />';
		var nDiv=$('div');
		nDiv.append(img);
		  $( "#result" ).html( nDiv );
	}
 // $( "#result" ).html( daSet );
  
});
}