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
  $.ajax({ url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: (res) => {
      if (res.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
  $.ajax({ url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: '{}',
    headers: { 'Content-Type': 'application/json' },
    success: (places) => {
      $.each(places, (i, place) => {
        $('SECTION.places').append('<article></article>')
        $('SECTION.places > article:last')
          .append('<div class="title"></div>')
          .append('<div class="information"></div>')
        $('DIV.title:last')
          .append('<h2>' + place.name + '</h2>')
          .append('<div class="price_by_night">$' + place.price_by_night + '</div>')
        $('DIV.information:last')
          .append('<div class="max_guest"></div>')
        $('DIV.max_guest:last')
          .append('<i class="fa fa-users fa-3x" aria-hidden="true"></i>')
          .append('<br />' + place.max_guest + ' Guests')
      });
    }});
});
