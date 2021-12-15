
//-----------------------------
let customerLegend=document.getElementById("customerLegend");
let billToExistingFieldset=document.getElementById("billToExisting");
let billToNewFieldset = document.getElementById("billToNew");
let radExisting=document.getElementById("existing");
let radNew=document.getElementById("new");
//--------Inventory Section------------
let searchBtn=document.getElementById("btnEquipmentOrder");
let invenDescSearch=document.getElementById("equipmentDescription");
let equipmentResults=document.getElementById("resultsTable");
let InvenDetailsSection=document.getElementById("invenDetails");
let invenSearchResults= document.getElementById("invenSearchResults");
//------------------------------------
let existingCustomerSearch=document.getElementById("searchBox");
let btnSearch= document.getElementById("btnSearch");
let existingCustomerResultsTable=document.getElementById("customerResultsTable");


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
          
          existingCustomerResultsTable.innerHTML+=`<tr>
          <td><input type="radio" name="radSearchResults" id= "${data[i].id}" value="${data[i].firstName}""> ${data[i].firstName +" "+ data[i].lastName}</td>
          <td>${data[i].email}</td>
          <td>${data[i].address}, ${data[i].city}, ${data[i].province}</td>
          <td>${data[i].phone}</td>
          </tr>`;
        }
         
      }
      let radOptions= document.getElementsByName("radSearchResults");
      for(let i=0; i<radOptions.length;i++){
        radOptions[i].addEventListener('click',function(){
          customerLegend.textContent="Customer  >"+" "+radOptions[i].value;
          billToExistingFieldset.style.display="none";
          InvenDetailsSection.style.display='block';
          //OrderDetailsSection.style.display='none';
        })
    }
    //existingCustomerResultsTable.innerHTML=searchResults;
  })
   
  

})
//Search Field under the Inventory Section

searchBtn.addEventListener('click',function(){
  let results='';
  $.getJSON('/json/Store Inventory List/inventory.json',function(data){
    console.log(data);
    if(invenDescSearch.value !=''){
      for (let i=0; i<data.length; i++){
        if(data[i].description.includes(invenDescSearch.value)){
         invenSearchResults.innerHTML+=`<tr>
          <td>${data[i].description} - ${data[i].brand}</td>
          <td>
            <select style=" height: auto;" id="equipmentColor" name="equipmentColor" required>
            <option selected disabled>Item Color</option>
            <option>Silver</option>
            <option>Grey</option>
            <option>Blue</option>
            <option>Dull White</option>
            </select>
          </td>
          <td><a href="#" name="addLink" id="${data[i].id}">Add</a></td>
          </tr>`;
  
        }
       
        //if(data[i].equipment[i].description.includes(invenDescSearch.value)){
          //results+=`${data[i].equipment[i].description} \n`;
        //}
      }
      let addLinks= document.getElementsByName("addLink");
      let colourSelect=document.createElement('SELECT');
      for(let i=0; i<addLinks.length;i++){
        addLinks[i].addEventListener('click', function(){
          for(let j=0; j<data.length;j++){
            if(data[j].id == addLinks[i].id){
              document.getElementById("txtSelectedEquipment").innerHTML+=`${data[j].description} - ${data[j].brand} `;
                
            }
          }
        })
      }
      //invenSearchResults.innerHTML=results;//alert(results);

    }
  })
  equipmentResults.style.display="block";
  document.getElementById("invenTextarea").style.display="block";
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

//------------------------------------------------
//Functions--------------------------------------
