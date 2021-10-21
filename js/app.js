window.addEventListener("load",function(){
  let currentURL = window.location.href;
  let btnSaveIsClicked = false;
  var jsonString = localStorage.getItem("customerObject");
  //this.localStorage.clear();
  if(jsonString==null) 
  {
    loadCustomerData(); //loads customer data from json and store it on the local storage
  }

  if (currentURL.includes("/pages/customer")) {
    loadProvice();

    if(currentURL.includes("/pages/customer/create.html") || currentURL.includes("/pages/customer/edit.html"))
    {
      let provinceClick = document.getElementById('province');
      provinceClick.addEventListener("change",function(){
        loadCity();
      });

      document.getElementById("btnSave").addEventListener("click",function(event)
      {

        var retrievedObject = JSON.parse(jsonString);
        let selectedID = retrievedObject.length + 1

        let newCustomer = {
          "id": selectedID,
          "firstName": document.getElementById("firstName").value,
          "middleName": document.getElementById("middleName").value,
          "lastName": document.getElementById("lastName").value,
          "email": document.getElementById("email").value,
          "phone": document.getElementById("phone").value,
          "address": document.getElementById("address").value,
          "province": document.getElementById("province").value,
          "city": document.getElementById("city").value,
          "postalCode": document.getElementById("postalCode").value,
          "equipment": []
        };
        retrievedObject.push(newCustomer);

        localStorage.setItem("customerObject", JSON.stringify(retrievedObject)); 
        localStorage.setItem("currentCustomer", selectedID);
        btnSaveIsClicked = true;
        
      },false);
    }
  }

  if (currentURL.includes("/pages/customer/index.html")) //This is for the customer list page (index.html)
  {
    var jsonString = localStorage.getItem("customerObject");
    var retrievedObject = JSON.parse(jsonString);
    loadCustomerDataOnTable(retrievedObject);

    $(".data-link").click(function(){ //This enables the clicking on the customer data to link to its details
      localStorage.setItem("currentCustomer", $(this).attr("dataid"));
      window.location.href = "/pages/customer/edit.html";
    });
  }
  else if (currentURL.includes("/pages/customer/edit.html"))
  {
    let retrievedObject = localStorage.getItem("customerObject");
    let currentCustomerID = localStorage.getItem("currentCustomer");
    
    let customerData = getCustomerData(JSON.parse(retrievedObject), currentCustomerID);
    document.getElementById("firstName").value = customerData[0].firstName;

    if(customerData[0].middleName.trim()=="") {
      document.getElementById("middleName").value = " ";
    }
    else{
      document.getElementById("middleName").value = customerData[0].middleName.trim();
    }
    
    document.getElementById("lastName").value = customerData[0].lastName;
    document.getElementById("email").value = customerData[0].email;
    document.getElementById("phone").value = customerData[0].phone;
    document.getElementById("address").value = customerData[0].address;
    document.getElementById("postalCode").value = customerData[0].postalCode;
    assignProvince(customerData[0].province, customerData[0].city);

    if (customerData[0].equipment.length > 0) 
    {
      loadEquipmentDetails(customerData);
      $("#btnDelete").hide();
      document.getElementById("confirmationMessage").innerHTML = "Record cannot be deleted since transactions exists!";
    }
    else{
      $("#btnDelete").show();
      document.getElementById("confirmationMessage").innerHTML = "Are you sure you want to DELETE the record?";
    }

    let buttonClearAllClick = document.getElementById('btnClearAll');
    let btnCustomerDeleteRecord = document.getElementById('btnCustomerDeleteRecord');

    let buttonClearClick= document.getElementById('btnClear');

    if (buttonClearClick != null)
    {
      buttonClearClick.addEventListener("click",function(){
        document.getElementById("confirmationModalLabel").innerHTML = "Confirmation";
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
      btnSaveIsClicked = false;
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

      btnCustomerDeleteRecord.addEventListener("click",function(){
        btnSaveIsClicked = true;
        window.location.href = "/pages/customer/index.html";
      });

      document.getElementById("btnClose").addEventListener("click",function()
      {
        btnSaveIsClicked = false;
        window.location.href = "/pages/customer/index.html";

      },false);

      var form = document.getElementById("equipmentForm");
      form.addEventListener("submit", onSubmitForm);

      function onSubmitForm(e) {
          e.preventDefault();
          $('#equipmentModal').modal('hide');
      }

      document.getElementById("btnDelete").addEventListener("click",function()
      {
        let retrievedObject = localStorage.getItem("customerObject");
        let currentCustomerID = localStorage.getItem("currentCustomer");
        
        let customerData = getCustomerData(JSON.parse(retrievedObject), currentCustomerID);
        if (customerData[0].equipment.length > 0) 
        {
          $("#btnCustomerDeleteRecord").hide();
          document.getElementById("confirmationMessage").innerHTML = "Record cannot be deleted since transactions exists!";
        }
        else{
          $("#btnCustomerDeleteRecord").show();
          document.getElementById("confirmationMessage").innerHTML = "Are you sure you want to DELETE the record?";
        }
        console.log(customerData[0].equipment.length); 
      },false);
    }

    document.getElementById("customerEditForm").addEventListener("submit",function(event)
    {
      if(checkForm() === false || !btnSaveIsClicked)
      {
          event.preventDefault();
      }
      
    },false);
  }

  /***This is for general function to use ***/
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
            }
        }
    };
    xmlhttp.open("GET", "/json/province_cities.json", true);
    xmlhttp.send();
  }

  function loadCity()
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            let provinceName = document.getElementById("province").value;
            let filteredCityList = getCityList(data, provinceName);
            displayResult(filteredCityList);
        }
    };
    xmlhttp.open("GET", "/json/province_cities.json", true);
    xmlhttp.send();
  }

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
   
  function getCustomerData(data, customerID) {
    return data.filter( customer => customer.id == customerID);      
  }

  function loadCustomerData()
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            localStorage.setItem("customerObject", JSON.stringify(data));
        }
    };
    xmlhttp.open("GET", "/json/customer.json", true);
    xmlhttp.send();
  }

  function loadCustomerDataOnTable(data)
  {
    let output = "";

    if(data.length==0) {
        output += "no matches found";
    }
    else {
        for(d of data) {
          output +="<tr>";
          output += `<td>${d.id}</td>`;
          output += `<td class="data-link" dataid="${d.id}">${d.firstName} ${d.lastName}</td>`;
          output += `<td>${d.email}</td>`;
          output += `<td>${d.phone}</td>`;
          output +="</tr>"
        }
        document.getElementById("customerDataTable").innerHTML = output;
    }
  }
  
  function checkForm()
  {
    let bRetVal = true;
    let firstNameCk = document.getElementById("firstName").value.trim();
    let lastNameCk = document.getElementById("lastName").value.trim();
    let emailCk = document.getElementById("email").value.trim();
    let phoneCk = document.getElementById("phone").value.trim();
    let addressCk = document.getElementById("address").value.trim();
    let postalCodeCk = document.getElementById("postalCode").value.trim();
    let provinceCk = document.getElementById("province").value.trim();
    let cityCk = document.getElementById("city").value.trim();

    if (firstNameCk == "" || lastNameCk == "" || emailCk == "" || phoneCk == "" || addressCk == "" || postalCodeCk == "" || provinceCk == "" || cityCk == "") {
      bRetVal = false;
    }
    return bRetVal;
  }

  function assignProvince(province, city)
  {
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
              $("#province").val(province);

              var xmlhttp = new XMLHttpRequest();
              xmlhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                      let data = JSON.parse(this.responseText);
                      let provinceName = document.getElementById("province").value;
                      let filteredCityList = getCityList(data, provinceName);
                      displayResult(filteredCityList);
                      $("#city").val(city);
                  }
              };
              xmlhttp.open("GET", "/json/province_cities.json", true);
              xmlhttp.send();
              
            }
        }
    };
    xmlhttp.open("GET", "/json/province_cities.json", true);
    xmlhttp.send();
  }

  function loadEquipmentDetails(customerData) {
    let output = "";
    let custID = customerData[0].id;
    console.log(custID);
    
    for(c of customerData[0].equipment) {
      output +="<tr>";
      output += `<td class="data-link" custid="${custID}" dataid="${String(c.id)}" data-toggle="modal" data-target="#equipmentModal" data-dashlane-rid="2081001e4e21294c" data-dashlane-label="true" data-form-type="action">${c.description}</td>`;
      output += `<td>${c.brand}</td>`;
      output += `<td>${c.type}</td>`;
      output += `<td>${c.Date_Checkin}</td>`;
      output += `<td>${c.Date_Checkout}</td>`;
      output +="</tr>"
    }
    document.getElementById("equipmentDetails").innerHTML = output;

    $(".data-link").click(function(){ //This enables the clicking on the customer data to link to its details
      localStorage.setItem("currentEquipment", $(this).attr("dataid"));
      getEquipmentDetails($(this).attr("custid"), $(this).attr("dataid"))
    });

  }

  function getEquipmentDetails(customerID, equipmentID) {
    var jsonString = localStorage.getItem("customerObject");
    var retrievedObject = JSON.parse(jsonString);

    let selectedCustomer = retrievedObject.filter(cust => cust.id == customerID);
    let equipmentCustomer = selectedCustomer[0].equipment.filter(e => e.id == equipmentID);
    console.log(equipmentCustomer);
    document.getElementById("equipmentDescription").value = equipmentCustomer[0].description;
    document.getElementById("inputColour").value = equipmentCustomer[0].color;
    document.getElementById("engineSize").value = equipmentCustomer[0].engineSize;
    document.getElementById("bladeSize").value = equipmentCustomer[0].bladeSize;
    document.getElementById("equipmentType").value = equipmentCustomer[0].type;
    document.getElementById("equipmentBrand").value = equipmentCustomer[0].brand;
  }    
});
