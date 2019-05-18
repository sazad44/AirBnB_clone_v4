$(document).ready(() => {
  let amenityDict = {};
  $('input').change(() => {
    if ($('input').prop('checked')) {
      $("li > input:checkbox:checked").map(function(){
	amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
      }).get();
      $('div.amenities > h4').text(Object.values(amenityDict));
    } else {
      amenityDict = {};
      $("li > input:checkbox:checked").map(function(){
	amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
      }).get();
      $('div.amenities > h4').text(Object.values(amenityDict));
    }
  });
	const request = new XMLHttpRequest();
	url = 'http://0.0.0.0:5001/api/v1/status/';

	request.open('GET', url, true);
	request.onreadystatechange = function () {
		$('div#api_status').addClass('available');
	}
	request.send();
});
