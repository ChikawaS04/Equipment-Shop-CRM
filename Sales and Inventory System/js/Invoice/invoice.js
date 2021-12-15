let customerLegend=document.getElementById("customerLegend");
let billToExistingFieldset=document.getElementById("billToExisting");
let billToNewFieldset = document.getElementById("billToNew");
let radExisting=document.getElementById("existing");
let radNew=document.getElementById("new");
let searchBtn=document.getElementById("btnEquipmentOrder");
let existingCustomerSearch=document.getElementById("searchBox");
let btnSearch= document.getElementById("btnSearch");
let existingCustomerResultsTable=document.getElementById("customerResultsTable");
let equipmentResults=document.getElementById("resultsTable");
let InvenDetailsSection=document.getElementById("invenDetails");
let OrderDetailsSection=document.getElementById("orderDetails");
let btnConfirmExistingCustomer= document.getElementById("btnConfirmExistingCustomer");

//Events-----------------------------------
// search field on New Invoice page
btnSearch.addEventListener('click', function(){
  let searchResults='';
  $.getJSON('/json/customer.json',function(data){
      console.log(data);
      for( let i=0; i<data.length; i++){
        
        if(data[i].firstName.includes(existingCustomerSearch.value)){
          
          searchResults+=`<tr>
          <td><input type="radio" name="radSearchResults" id= "${data[i].id}" value="${data[i].firstName}""> ${data[i].firstName +" "+ data[i].lastName}</td>
          <td>${data[i].email}</td>
          <td>${data[i].address}, ${data[i].city}, ${data[i].province}</td>
          <td>${data[i].phone}</td>
          </tr>`;
        }
         
      }
    existingCustomerResultsTable.innerHTML=searchResults;

    let radOptions= document.getElementsByName("radSearchResults");
    for(let i=0; i<radOptions.length;i++){
      radOptions[i].addEventListener('click',function(){
        customerLegend.textContent="Customer  >"+" "+radOptions[i].value;
        billToExistingFieldset.style.display="none";
        InvenDetailsSection.style.display='block';
        OrderDetailsSection.style.display='none';
      })
    }
  })

})


//----------------------------------------
radNew.onclick=function(){
  billToExistingFieldset.style.display="none";
  billToNewFieldset.style.display="block";
  customerLegend.textContent="Customer  ^";
  
}
radExisting.onclick=function(){
    customerLegend.textContent="Customer  ^";
  billToExistingFieldset.style.display="block";
  billToNewFieldset.style.display="none"; 
}

customerLegend.onmouseover=function(){
    
    customerLegend.style.color="skyblue";
    customerLegend.style.textDecoration="none";
}
customerLegend.onmouseleave=function(){
    
    customerLegend.style.color="#ffffff";
}
customerLegend.onclick=function(){
    
  if(customerLegend.textContent=="Customer  ^" && radExisting.checked){
    billToExistingFieldset.style.display="none";
    
    customerLegend.textContent="Customer  >";
    
  }else if (customerLegend.textContent=="Customer  ^" && radNew.checked){
    billToNewFieldset.style.display="none";
    customerLegend.textContent="Customer  >";     
  }else if(customerLegend.textContent.includes("Customer  >") && radExisting.checked){
    customerLegend.textContent="Customer  ^";
    billToExistingFieldset.style.display="block";
  }else if(customerLegend.textContent.includes("Customer  >") && radNew.checked){
    billToNewFieldset.style.display="block";
    customerLegend.textContent="Customer  ^";
  }               
}

searchBtn.onclick=function(){
    equipmentResults.style.display="block";
}
//------------------------------------------------
//Functions--------------------------------------
