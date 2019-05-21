$(document).ready(() => {
  let amenityDict = {};
  $('.amenities').find('input:checkbox').change(() => {
    let amenityString = '';
    if (!$(this).is(':checked')) {
      amenityDict = {};
    }
    $('ul.popover > li > input:checkbox:checked').map(function () {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    }).get();
    Object.values(amenityDict).forEach((amenity, i) => {
      amenityString += amenity;
      if (i !== Object.values(amenityDict).length - 1) {
        amenityString += ', ';
      }
    });
    $('div.amenities > h4').text(amenityString);
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: (status) => {
      if (status.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  let userNames = [];

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/users/',
    success: (users) => {
      $.each(users, function (i, user) {
        userNames[user['id']] = user['first_name'] + ' ' + user['last_name'];
      });
    }
  });

  function placeFilter (data) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: function (places) {
        alert(places);
        $('SECTION.places').empty();
        $('SECTION.places').append('<h1>Places</h1>');
        $.each(places, function (i, place) {
          $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places/' + place.id + '/reviews',
            success: (reviews) => {
              let reviewList = reviews;
            }
          });
          $('SECTION.places').append('<article></article>');
          $('SECTION.places > article:last')
            .append('<div class="title"></div>')
            .append('<div class="information"></div>')
            .append('<div class="user"></div>')
            .append('<div class="description"></div>')
	    .append('<div class="reviews"></div>');
          $('DIV.title:last')
            .append('<h2>' + place.name + '</h2>')
            .append('<div class="price_by_night">$' + place.price_by_night + '</div>');
          $('DIV.information:last')
            .append('<div class="max_guest"></div>')
            .append('<div class="number_rooms"></div>')
            .append('<div class="number_bathrooms"></div>');
          $('DIV.max_guest:last')
            .append('<i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests');
          $('DIV.number_rooms:last')
            .append('<i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms');
          $('DIV.number_bathrooms:last')
            .append('<i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom');
          $('DIV.user:last')
            .append('<strong>Owner:</strong> ' + userNames[place.user_id]);
          $('DIV.description:last').append('<div class="description">' + place.description + '</div>');
	  $('DIV.reviews:last')
	    .append('<h2>Reviews</h2>')
            .append('<span>show</span>')
	    .append('<ul></ul>')
	  $.each(reviewList, function (i, review) {
            if (review['place_id'] === place.id) {
	      $('DIV.reviews > ul').append('<li></li>');
	      $('DIV.reviews > ul > li:last')
	        .append('<h3>From ' + userNames[review['user_id']] + ' the ' + review['created_at'] + '</h3>')
	        .append('<p>' + review['text'] + '</p>');
            }
	  });
          $('DIV.reviews > ul:last').css('visibility', 'hidden');
        });
      }
    });
  };

  let show = 0;
  $('span').click(() => {
    if (show === 0) {
      $('DIV.reviews > span').text('hide');
      $('DIV.reviews > ul').css('visibility', 'visible');
      show = 1;
    } else {
      $('DIV.reviews > ul').css('visibility', 'hidden');
    }
  });

  $('button').click(() => {
    placeFilter({'amenities': Object.keys(amenityDict), 'states': Object.keys(stateDict), 'cities': Object.keys(cityDict)});
  });

  let stateDict = {};
  let cityDict = {};
  let cityStateString = '';
  $('.locations > .popover > li > h2 > input:checkbox').change(() => {
    cityStateString = '';
    if (!$(this).is(':checked')) {
      stateDict = {};
    }
    $('.locations > .popover > li > h2 > input:checkbox:checked').map(function () {
      stateDict[$(this).attr('data-id')] = $(this).attr('data-name');
    }).get();
    Object.values(stateDict).forEach((state, i) => {
      cityStateString += state;
      if (i !== Object.values(stateDict).length - 1) {
        cityStateString += ', ';
      }
    });
    if (Object.values(cityDict).length > 0 && Object.values(stateDict).length > 0) {
      cityStateString += ', ';
    };
    Object.values(cityDict).forEach((city, i) => {
      cityStateString += city;
      if (i !== Object.values(cityDict).length - 1) {
        cityStateString += ', ';
      }
    });
    $('div.locations h4').text(cityStateString);
  });
  $('.locations > .popover > li > ul > li > input:checkbox').change(() => {
    cityStateString = '';
    if (!$(this).is(':checked')) {
      cityDict = {};
    }
    $('.locations > .popover > li > ul > li > input:checkbox:checked').map(function () {
      cityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    }).get();
    Object.values(stateDict).forEach((state, i) => {
      cityStateString += state;
      if (i !== Object.values(stateDict).length - 1) {
        cityStateString += ', ';
      }
    });
    if (Object.values(cityDict).length > 0 && Object.values(stateDict).length > 0) {
      cityStateString += ', ';
    }
    Object.values(cityDict).forEach((city, i) => {
      cityStateString += city;
      if (i !== Object.values(cityDict).length - 1) {
        cityStateString += ', ';
      }
    });
    $('div.locations h4').text(cityStateString);
  });
});
