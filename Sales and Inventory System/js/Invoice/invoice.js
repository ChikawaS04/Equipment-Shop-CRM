let customerLegend=document.getElementById("customerLegend");
let billToExistingFieldset=document.getElementById("billToExisting");
let billToNewFieldset = document.getElementById("billToNew");
let radExisting=document.getElementById("existing");
let radNew=document.getElementById("new");
let searchBtn=document.getElementById("btnEquipmentOrder");
let existingCustomerSearch=document.getElementById("searchBox");
let existingCustomerResultsTable=document.getElementById("customerResultsTable");
let equipmentResults=document.getElementById("resultsTable");
let OrderDetailsSection=document.getElementById("orderDetails");

//Events-----------------------------------
//Dynamic search field on New Invoice page
existingCustomerSearch.onselect=search();
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
    customerLegend.textContent="Customer  ^";
    billToExistingFieldset.style.display="block";
  }else if(customerLegend.textContent=="Customer  >" && radNew.checked){
    billToNewFieldset.style.display="block";
    customerLegend.textContent="Customer  ^";
  }               
}

searchBtn.onclick=function(){
    equipmentResults.style.display="block";
}
//------------------------------------------------
//Functions--------------------------------------
function search(){
    let searchResults=[];
    $.getJSON("/json/customer.json",function(data){
        console.log(data);
        for( let i=0; i<data.length; i++){
            if( existingCustomerSearch.innerHTML!="" && (data[i].firstName.includes(existingCustomerSearch.innerHTML) || data[i].phone.includes(existingCustomerSearch.innerHTML))){
                searchResults.push(`<tr>
                    <td>${data[i].firstName +" "+ data[i].lastName}</td>
                    <td>${data[i].email}</td>
                    <td>${data[i].address}, ${data[i].city},\n ${data[i].province}</td>
                    <td>${data[i].phone}</td>
                </tr>`)
            }
           
            /*if( existingCustomerSearch.innerHTML!="" && (data[i].firstName +" "+ data[i].lastName || data[i].phone).includes(existingCustomerSearch.innerHTML) ){
               
            }else{

            }*/
        }
    })
    existingCustomerSearch.onkeyup=function(){
       alert(searchResults[0])
    }


}