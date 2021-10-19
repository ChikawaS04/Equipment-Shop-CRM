window.addEventListener("load",function(){

  let currentURL = window.location.href;
  let provinceClick = document.getElementById('inputProvince');
  let buttonClearClick;
  let buttonClearAllClick = document.getElementById('btnClearAll');
  let btnCustomerDeleteRecord = document.getElementById('btnCustomerDeleteRecord');

  if (currentURL.includes("/pages/customer")) {
    loadProvice();
    buttonClearClick= document.getElementById('btnClear');

    if (buttonClearClick != null)
    {
      buttonClearClick.addEventListener("click",function(){
        document.getElementById("confirmationModalLabel").innerHTML = "Confirmation"
      });

      buttonClearAllClick.addEventListener("click",function(){
        document.getElementById("firstName").value = "";
        document.getElementById("middleName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
      });
    }

  }
  
  function loadProvice() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);

            $.each( data, function( i, item ) {
              $('#inputProvince').append($('<option>', {
                value: item.name,
                text: item.name
              }));
            });
        }
    };
    xmlhttp.open("GET", "/json/province_cities.json", true);
    xmlhttp.send();
  }





  provinceClick.addEventListener("change",function(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            let provinceName = document.getElementById("inputProvince").value;
            let filteredCityList = getCityList(data, provinceName);
            displayResult(filteredCityList);
        }
    };
    xmlhttp.open("GET", "/json/province_cities.json", true);
    xmlhttp.send();
  });


  btnCustomerDeleteRecord.addEventListener("click",function(){
    window.location.href = "/pages/customer/index.html";
  });

  function getCityList(data, provinceName) {
      return data.filter( city => city.name === provinceName)
                  .sort((a, b) => a.cities < b.cities ? -1 : a.cities > b.cities ? 1 : 0); 
  }

  function displayResult(data) {
      let output = "";

      if(data.length==0) {
          output += "no matches found";
      }
      else {
          for(d of data[0].cities) {
            $('#inputCity').append($('<option>', {
              value: d,
              text: d
            }));
          }
      }
      return output;
  }
});
