$(document).ready(() => {
  let amenityDict = {};
  $('input:checkbox').change(() => {
    if ($(this).is(':checked')) {
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

  function search_places(body='{}') {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    body: body,
    contentType: 'application/json',
    dataType: 'json',
    success: function (places) {
      $.each(places, function (i, place) {
        $('SECTION.places').append('<article></article>');
        $('SECTION.places > article:last').append('<div class="title"></div>').append('<div class="information"></div>').append('<div class="description"></div>');
        $('SECTION.places > article:last > div.title').append('<h2>' + place.name + '</h2>').append('<div class="price_by_night">' + place.price_by_night + '</div>');
        $('SECTION.places > article:last > div.information').append('<div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div>').append('<div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div>').append('<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div>');
        $('SECTION.places > article:last > div.description').append('<div class="description">' + place.description + '</div>');
      });
    }
  });
  }
  search_places();
  
  $('BUTTON').click(function () {
	  search_places({"amenities": Object.keys(amenityDict)});
  });
});
