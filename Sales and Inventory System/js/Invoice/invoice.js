let customerLegend=document.getElementById("customerLegend");
let billToExistingFieldset=document.getElementById("billToExisting");
let billToNewFieldset = document.getElementById("billToNew");
let radExisting=document.getElementById("existing");
let radNew=document.getElementById("new");
let searchBtn=document.getElementById("btnEquipmentOrder");
let invenDescSearch=document.getElementById("equipmentDescription");
let equipmentResults=document.getElementById("resultsTable");
let InvenDetailsSection=document.getElementById("invenDetails");
let invenSearchResults= document.getElementById("invenSearchResults");
let invenTextArea= document.getElementById("txtSelectedEquipment");
let btnConfirmItemSelections=document.getElementById("confirmItemSelections");
let invenLegend=document.getElementById("invenLegendLink");
let btnSearch =document.getElementById('btnSearch');
//------------------------------------
let existingCustomerSearch=document.getElementById("searchBox");
let existingCustomerResultsTable=document.getElementById("customerResultsTable");
//let equipmentResults=document.getElementById("resultsTable");
let OrderDetailsSection=document.getElementById("orderDetails");

window.onload=function(){
  alert('here');
}
//Events-----------------------------------
// search field on New Invoice page
btnSearch.addEventListener('click', function(){
  
  $.getJSON('/json/customer.json',function(data){
      console.log(data);
      for( let i=0; i<data.length; i++){
        
        if((data[i].firstName+" "+data[i].lastName).includes(existingCustomerSearch.value)){
          
          existingCustomerResultsTable.innerHTML+=`<tr>
          <td><input type="radio" name="radSearchResults" id= "${data[i].id}" value="${data[i].firstName} ${data[i].lastName}"> ${data[i].firstName +" "+ data[i].lastName}</td>
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
          document.getElementById("invenLegend").style.display='block';
          InvenDetailsSection.style.display='block';
          //OrderDetailsSection.style.display='none';
        })
    }
    //existingCustomerResultsTable.innerHTML=searchResults;
  })
   
  

})
btnConfirmItemSelections.addEventListener("click", function(){
  invenSearchResults.innerHTML='';
  invenDescSearch.innerHTML='';
  InvenDetailsSection.style.display='none';
  document.getElementById('orderDetailsLegend').style.display='block';
  OrderDetailsSection.style.display='block';
  invenLegend.textContent= 'Inventory Selection > Complete';

})
//Search Field under the Inventory Section

searchBtn.addEventListener('click',function(){
  invenSearchResults.innerHTML='';
  $.getJSON('/json/Store Inventory List/inventory.json',function(data){
    console.log(data);
    if(invenDescSearch.value !=''){
      for (let i=0; i<data.length; i++){
        if(data[i].description.includes(invenDescSearch.value)){
         invenSearchResults.innerHTML+=`<tr>
          <td>${data[i].description} - ${data[i].brand}</td>
          <td>
            <select style=" height: auto;" id="select_id#${data[i].id}" name="equipmentColor" required>
            <option selected disabled>Item Color</option>
            <option value="${data[6].color}">Silver</option>
            <option value="${data[0].color}">Grey</option>
            <option value="${data[1].color}">Blue</option>
            <option value="${data[5].color}" >Dull White</option>
            </select>
          </td>
          <td><input type="radio" name="radWarranty" id= "warranty_id#${data[i].id}" value="${this.checked? true :false}"></td>
          <td><a href="#" name="addLink" id="addLink_id#${data[i].id}">Add</a></td>
          </tr>`;
  
        }
       
      }
      let addLinks= document.getElementsByName("addLink");
      
      
      for(let i=0; i<addLinks.length;i++){

        addLinks[i].addEventListener('click', function(){
          btnConfirmItemSelections.style.display='block';
          for(let j=0; j<data.length;j++){
            if(`addLink_id#${data[j].id}` == addLinks[i].id && document.getElementById(`warranty_id#${data[j].id}`).checked ){
              let color= document.getElementById(`select_id#${data[j].id}`).value;
    
              invenTextArea.innerHTML+= `<div id="item_id#${data[j].id}"> <select style="border: 1px solid #1f3a4d;height: auto;"  name="selectedItemsDDL">
              <option selected >${data[j].brand} ${data[j].description}</option>
              <option  disabled >Color:    ${color}</option>
              <option disabled  value="${true}">Warranty:   Yes</option>
              
              </select> <a href="#" style="color: red;"name="removeLink" id="removeLink_id#${data[j].id}">Remove</a></div>`;
              
              document.getElementById("tblInvoiceBody").innerHTML+=`<tr>
              <td><select id="quantity${data[j].id}">
                <option selected disabled >Select Quantity</option>
               </select></td>
              <td>
              <select style="border: 1px solid #1f3a4d;height: auto;"  name="selectedItemsDDL">
              <option selected >${data[j].brand} ${data[j].description}</option>
              <option  disabled >Color:    ${color}</option>
              <option disabled  value="${true}">Warranty:   Yes</option>
              
              </select> </td><td>${data[j].serial}</td><td>$ ${data[j].unit_price}</td>
              <td style="width: 100px;" id="totalAmt-${data[j].brand}">$ </td>
            </tr>`;
            }else if (`addLink_id#${data[j].id}` == addLinks[i].id && !document.getElementById(`warranty_id#${data[j].id}`).checked ){
              let color= document.getElementById(`select_id#${data[j].id}`).value;
    
              invenTextArea.innerHTML+= `<div id="item_id#${data[j].id}"> <select style="border: 1px solid #1f3a4d;height: auto;"  name="selectedItemsDDL">
              <option selected >${data[j].brand} ${data[j].description}</option>
              <option  disabled >Color:    ${color}</option>
              <option disabled  value="${false}">Warranty:   No</option>
              
              </select>   <a href="#" style="color: red;"name="removeLink" id="removeLink_id#${data[j].id}">Remove</a></div>`;
              
              document.getElementById("tblInvoiceBody").innerHTML+=`<tr>
              <td><select id="quantity${data[j].id}">
                <option selected disabled >Select Quantity</option>
              </select></td>
              <td>
              <select style="border: 1px solid #1f3a4d;height: auto;"  name="selectedItemsDDL">
              <option selected >${data[j].brand} ${data[j].description}</option>
              <option  disabled >Color:    ${color}</option>
              <option disabled  value="${false}">Warranty:   No</option>
              
              </select> </td><td style="width: 100px;">${data[j].serial}</td><td style="width: 100px;">$ ${data[j].unit_price}</td>
              <td style="width: 100px;" id="totalAmt-${data[j].brand}">$ </td>
            </tr>`;
            }
          }
        })

   
      }
      
      let removeLinks=document.getElementsByName("removeLink");
      for(let i=0; i<removeLinks.length;i++){
        removeLinks[i].addEventListener('click', function(){
          for(let j=0; j<data.length;j++){
            if(`removeLink_id#${data[j].id}`==removeLinks[i].id){
              document.getElementById(`item_id#${data[j].id}`).remove();
            }
          }
        })
      }

    }
  })
  equipmentResults.style.display="block";
  document.getElementById("invenTextarea").style.display="block";
})

document.getElementById("btnSave").addEventListener('click', function(){

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
}else if(customerLegend.textContent=="Customer  >" && radExisting.checked){
  billToExistingFieldset.style.display="block";
  customerLegend.textContent="Customer  ^";
  
}else if(customerLegend.textContent=="Customer  >" && radNew.checked){
  billToNewFieldset.style.display="block";
  customerLegend.textContent="Customer  ^";
}               
}

document.getElementById('invenLegendLink').onmouseover=function(){
  document.getElementById('invenLegendLink').style.color='skyblue';
  document.getElementById('invenLegendLink').style.textDecoration='none';
}
document.getElementById('invenLegendLink').onmouseleave=function(){
  document.getElementById('invenLegendLink').style.color='#ffffff';
}
document.getElementById('invenLegendLink').onclick=function(){ //Controls inventory section behaviour
  if(document.getElementById('invenLegendLink').textContent.includes('Complete')){
    if(document.getElementById('invenLegendLink').textContent.includes('^')){
    
      document.getElementById('invenLegendLink').textContent="Inventory Selection > Complete";
      InvenDetailsSection.style.display="none";
      
      
    }else if(document.getElementById('invenLegendLink').textContent.includes('>')){
      let textContent=document.getElementById('invenLegendLink').textContent;
      InvenDetailsSection.style.display="block";
      
      document.getElementById('invenLegendLink').textContent="Inventory Selection ^ Complete";
    }
  }else{
    if(document.getElementById('invenLegendLink').textContent.includes('^')){
    
      document.getElementById('invenLegendLink').textContent="Inventory Selection > ";
      InvenDetailsSection.style.display="none";
      
      
    }else if(document.getElementById('invenLegendLink').textContent.includes('>')){
      let textContent=document.getElementById('invenLegendLink').textContent;
      InvenDetailsSection.style.display="block";
      
      document.getElementById('invenLegendLink').textContent="Inventory Selection ^";
    }
  }
  
}
document.getElementById("btnAddNewCustomer").addEventListener("click", function(){
  billToNewFieldset.style.display="none"; 
  customerLegend.textContent="Customer  >" + ` ${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`;

  $.getJSON("/json/customer.json", function(data){
    console.log(data);
    
  })
})
searchBtn.onclick=function(){
    equipmentResults.style.display="block";
}
//------------------------------------------------
//Functions--------------------------------------
