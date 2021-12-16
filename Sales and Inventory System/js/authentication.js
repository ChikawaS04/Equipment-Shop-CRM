window.addEventListener("load",function(){
  if("/pages/login.html")
  {
    let role = "";
    let user = $("#username").val().toUpperCase();;
    if (user="SALES")
      localStorage.setItem("currentRole", "SALES");
    else if (user="SUPERVISOR")
      localStorage.setItem("currentRole", "SUPERVISOR");
    else if (user="ADMIN")
      localStorage.setItem("currentRole", "ADMIN");      
    else 
      errorMessage

  }
});