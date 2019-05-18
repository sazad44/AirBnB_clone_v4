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
});
