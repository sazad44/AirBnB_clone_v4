$(document).ready(() => {
  let amenityDict = {};
  $('input').change(() => {
    if ($('input').prop('checked')) {
      $('input[type=checkbox]:checked').each((amenity) => {
        alert($(this).attr('data-name'));
        amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
      });
      $('div.amenities > h4').text(Object.values(amenityDict));
    } else {
      amenityDict[$('input').attr('data-id')] = null;
    }
  });
});
