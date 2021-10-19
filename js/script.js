(function() {
  var listProvince = loadProvice();
  console.log(listProvince);

  $( "#inputProvince" ).change(function() {
    alert( "Handler for .change() called." );
  });

  function loadProvice() {
    var proviceAPI = "/json/province_cities.json";
    $.getJSON( proviceAPI, {
      tagmode: "any",
      format: "json"
    })
    .done(function( data ) {
      listProvince = data;
      $.each( data, function( i, item ) {
        $('#inputProvince').append($('<option>', {
          value: item.name,
          text: item.name
        }));
      });
    });
  }
})();