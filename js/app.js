window.addEventListener("load",function(){

  let currentURL = window.location.href;
  let provinceClick = document.getElementById('province');
  let buttonClearAllClick = document.getElementById('btnClearAll');
  let btnCustomerDeleteRecord = document.getElementById('btnCustomerDeleteRecord');

  if (currentURL.includes("/pages/customer")) {
    loadProvice();

    let buttonClearClick= document.getElementById('btnClear');

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
        document.getElementById("address").value = "";
        document.getElementById("province").value = "";
        document.getElementById("city").value = "";
        document.getElementById("postalCode").value = "";
      });
    }

    let btnEditClick = this.document.getElementById("btnEdit");

    if(btnEditClick !== null)
    {
      $("#btnSave").hide();
      btnEditClick.addEventListener("click",function(){
        $('#firstName').removeAttr('disabled');
        $('#firstName').removeAttr('disabled');
        $('#middleName').removeAttr('disabled');
        $('#lastName').removeAttr('disabled');
        $('#email').removeAttr('disabled');
        $('#phone').removeAttr('disabled');
        $('#address').removeAttr('disabled');
        $('#province').removeAttr('disabled');
        $('#city').removeAttr('disabled');
        $('#postalCode').removeAttr('disabled');
        $("#btnEdit").hide();
        $("#btnSave").show();
      });
    }

    if(currentURL.includes("/pages/customer/edit.html")) {
      loadDefaultEditData();
    }
  }

  function loadDefaultEditData()
  {
    document.getElementById("firstName").value = "John";
    document.getElementById("middleName").value = " ";
    document.getElementById("lastName").value = "White";
    document.getElementById("email").value = "jwhite@gmail.com";
    document.getElementById("phone").value = "905-555-5551";
    document.getElementById("address").value = "123 Strathmore";
    document.getElementById("postalCode").value = "L3A 3B1";
  }

  
  function loadProvice() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);

            $.each( data, function( i, item ) {
              $('#province').append($('<option>', {
                value: item.name,
                text: item.name
              }));
            });

            if(currentURL.includes("/pages/customer/edit.html")) {
              loadCity();
              $('#province').val("Ontario");
            }
        }
    };
    xmlhttp.open("GET", "/json/province_cities.json", true);
    xmlhttp.send();
  }

  provinceClick.addEventListener("change",function(){
    loadCity();
  });

  function loadCity()
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            let provinceName = document.getElementById("province").value;
            let filteredCityList = getCityList(data, provinceName);
            displayResult(filteredCityList);

            if(currentURL.includes("/pages/customer/edit.html")) {
              $('#city').val("Brampton");
            }
        }
    };
    xmlhttp.open("GET", "/json/province_cities.json", true);
    xmlhttp.send();
  }

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
            $('#city').append($('<option>', {
              value: d,
              text: d
            }));
          }
      }
      return output;
  }
});
