function showPassword() {
    // event.preventDefault();
    if ($('#Password').attr("type") == "text") {
        $('#Password').attr('type', 'password');
        $('#iTag').addClass("fa-eye-slash");
        $('#iTag').removeClass("fa-eye");
    } else if ($('#Password').attr("type") == "password") {
        $('#Password').attr('type', 'text');
        $('#iTag').removeClass("fa-eye-slash");
        $('#iTag').addClass("fa-eye");
    }
}


function LoginBHDPanel(UserName, Password) {
  //  alert(UserName);
  //  alert(Password);
    var objUser = {
        UserName: UserName,
        Password: Password
    };
   // alert(objUser.UserName);
    $.ajax({
        url: "/gpanel/Login/LoginBHDPanel",
        data: JSON.stringify(objUser),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result) {
                window.location.href = "/gpanel/Dashboard";
            }
            else {
                alert('Wrong UserName or Password');
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
