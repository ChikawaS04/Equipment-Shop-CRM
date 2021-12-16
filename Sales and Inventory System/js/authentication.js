window.addEventListener("load",function(){
  let currentURL = window.location.href;
  let currentUser = localStorage.getItem("currentRole");


  if(currentURL.includes("/pages/login.html"))
  {
    document.getElementById("loginForm").addEventListener("submit",function(event)
    {
      document.getElementById("errorMessage").innerHTML = "";
      if(checkRequired() == false)
      {
          document.getElementById("errorMessage").innerHTML = "Invalid Username/Password";
          event.preventDefault();
      }
      else
      {
        let user = $("#username").val().toUpperCase();
        if (user=="SALES")
          localStorage.setItem("currentRole", "SALES");
        else if (user=="SUPERVISOR")
          localStorage.setItem("currentRole", "SUPERVISOR");
        else if (user=="ADMIN")
          localStorage.setItem("currentRole", "ADMIN");
        else if(user=="DANNELLA") {
          localStorage.setItem("currentRole", "Dannella");
        }
        else 
          document.getElementById("errorMessage").innerHTML = "Invalid Username/Password";
      }
      alert(user);
    },false);

  }
  else {
    if(currentUser=="SALES" || currentUser=="Dannella") 
    {
      $("#dataConfig").hide();
      $("#manageUsers").hide();
    }
    else {
      $("#dataConfig").show();
      $("#manageUsers").show();
    }
  }

  function checkRequired()
  {
    let bRetVal = true;

    let user = $("#username").val().toUpperCase();

    if (user=="SALES" || user=="SUPERVISOR" || user=="ADMIN" || user=="DANNELLA")
    {
      bRetVal = true;
    }
    else {
      document.getElementById("errorMessage").innerHTML = "Invalid Username/Password";
      bRetVal = false;
    }
    
    return bRetVal;
  }
});

