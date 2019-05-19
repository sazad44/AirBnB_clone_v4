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
  // TODO: change this IP to 0.0.0.0 and figure out a way for it to work
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
});
