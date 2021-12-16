let searchBox=document.getElementById("searchtext");
let searchBtn= document.getElementById("btnSearchInvoice");
let searchResults=document.getElementById("customerDataTable");

searchBtn.addEventListener("click", function(){
    $.getJSON("/json/Invoice/invoice.json", function(data){
        console.log(data);
        for (let i=0; i<data.length; i++){
            if(data[i].id.includes(searchBox.value) || data[i].customer_name.includes(searchBox.value)){
                searchResults.innerHTML+=`<tr>
                <td ><a href="/pages/Invoice/edit.html" id="${data[i].id}">${data[i].id}</td>
                <td>${data[i].customer_name}</td><td>${data[i].ordered_equipment.forEach(element => {
                    element.date_ordered;
                })}</td>
                </tr>`;
            }
        }
    })
})
