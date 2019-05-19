$(document).ready(() => {
  let amenityDict = {};
  $('input').change(() => {
    if ($('input').prop('checked')) {
      $('li > input:checkbox:checked').map(function () {
        amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
      }).get();
      $('div.amenities > h4').text(Object.values(amenityDict));
    } else {
      amenityDict = {};
      $('li > input:checkbox:checked').map(function () {
        amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
      }).get();
      $('div.amenities > h4').text(Object.values(amenityDict));
    }
  });
	const request = new XMLHttpRequest();
	const url = 'http://0.0.0.0:5001/api/v1/status/';
	
	request.responseType = 'json';
	request.open('GET', url, true);	
	request.onreadystatechange = function () {
		if (request.response['status'] === 'OK') {
			$('div#api_status').addClass('available');
		} else {
			$('div#api_status').removeClass('available');
		}
	};
	request.send();
	
	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		type: 'POST',
		data: '{}',
		contentType: 'application/json',
		dataType: 'json',
		success: function (places) {
			$.each(places, function(i, place) {
				$('SECTION.places').append('<article></article>');
				$('SECTION.places > article').append('<div class="title">'+ place.name +'</div>');
				//$('article').append($('h2').text(place.name));
				//$('SECTION.places').append('<article><div class=title"><h2>'+ place.name +'</h2><div class="price_by_night">'+ place.price_by_night +'</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />'+ place.max_guest +' Guests</div><div class="number_rooms"><i class="fa fa-bed 3x" aria-hidden="true"></i><br />'+ place.number_rooms +' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />'+ place.number_bathrooms +' Bathroom</div></div><div class="description">'+ place.description +'</div></article>');
			});
		}
	});
});
