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
    success: (data) => {
      for (let i = 0; i < data.length; i++) {
	alert(data[i].name);
        let newArticle = document.createElement('article');
        let newDiv = document.createElement('div', {
          'class': 'title'
        });
        newDiv.textContent = i.name;
        $('section.places').appendChild(newArticle.appendChild(newDiv));
      }
    }
  });
});
