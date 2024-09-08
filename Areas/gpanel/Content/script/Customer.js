
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
    ActiveTab();
});

$(function () {
    //Date picker Format
    $('#reservationdate').datetimepicker({
        format: 'DD/MMM/YYYY'
    });
})

function loadData() {
    $.ajax({
        url: "/gpanel/Customer/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log(data);
           // debugger;
            var datatableVariable = $('#Customertable').DataTable({
                data: data,
                columns: [
                    { 'data': 'CustomerID', 'autoWidth': true },
                    { 'data': 'CustomerName', 'autoWidth': true },
                    { 'data': 'MobileNo', 'autoWidth': true },
                    { 'data': 'City', 'autoWidth': true },
                    { 'data': 'EmailID', 'autoWidth': true },
                    {
                        'data': 'CreatedOn', 'render': function (CreatedOn) {
                            var objDate = new Date(CreatedOn);
                            var monthname = monthNames[((objDate.getMonth() > 8) ? (objDate.getMonth() + 1) : ('0' + (objDate.getMonth() + 1))) - 1];
                            return ((objDate.getDate() > 9) ? objDate.getDate() : ('0' + objDate.getDate())) + '/' + monthname + '/' + objDate.getFullYear();
                        }
                    },
                    {
                        'data': 'IsActive', 'render': function (data, type, row) {
                            return '<div class="form-group"><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="chk' + row.CustomerID + '" ' + (data ? 'checked' : '') + ' onclick="CustomerAction(' + row.CustomerID + ', this)" >  <label class="custom-control-label" for="chk' + row.CustomerID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'CustomerID', 'render': function (item) {
                            return '<a class="btn btn-info btn-sm" href="#" onclick="return getbyID(' + item + ')"><i class="fas fa-pencil-alt"></a>';
                        }
                    }
                ]
            });
        },
        error: function (errormessage) {
            //alert(errormessage.text);
            alert(errormessage.responseText);
        }
    });
}



function ActiveTab() {
    selectedTab = $('#aCustomer');
    parentTab = $('#aPartner');
    parentTabLi = $('#liTagPartner');
    selectedTab.addClass("active");
    parentTab.addClass("active");
    parentTabLi.addClass("menu-open");
}

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

//Add Data Function
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var objCustomer = {
        CustomerID: $('#CustomerID').val(),
        CustomerName: $('#CustomerName').val(),
        DOB: $('#DOB').val(),
        Gender: $('#Gender').val(),
        MobileNo: $('#MobileNo').val(),
        Address: $('#Address').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Pincode: $('#Pincode').val(),
        Country: $('#Country').val(),
        EmailID: $('#EmailID').val(),
        Password: $('#Password').val()
    };
    //console.log(objCustomer);
    //alert(objCustomer.CustomerName);
    //debugger;
    $.ajax({
        url: "/gpanel/Customer/Add",
       // data: '{objCustomer: ' + JSON.stringify(objCustomer) + '}',
        data: objCustomer,
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        cache: false,
        success: function (result) {
            //console.log(result);
            //debugger;
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            //debugger;
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Customer ID
function getbyID(CustomerID) {
    $('#CustomerName').css('border-color', 'lightgrey');
    $('#MobileNo').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#Pincode').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#EmailID').css('border-color', 'lightgrey');
   // alert(CustomerID);
    //debugger;
    $.ajax({
        url: "/gpanel/Customer/getbyID/" + CustomerID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
       
        success: function (result) {
            //console.log(result);
           // debugger;
            $('#CustomerID').val(result.CustomerID);
            $('#CustomerName').val(result.CustomerName);
            $('#DOB').val(fnDateInFormat(result.DOB));
            $('#Gender').val(result.Gender);
            $('#MobileNo').val(result.MobileNo);
            $('#Address').val(result.Address);
            $('#City').val(result.City);
            $('#State').val(result.State);
            $('#Pincode').val(result.Pincode);
            $('#Country').val(result.Country);
            $('#EmailID').val(result.EmailID);
            $('#Password').val(result.Password);
           // alert(result.CustomerName);
           // debugger;

            $('#myModal').modal('show');
            $('#myModalLabel').text('Update Customer');
            $('#btnUpdate').show();
            $('#ResetPassword').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating Customer's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var objCustomer = {
        CustomerID: $('#CustomerID').val(),
        CustomerName: $('#CustomerName').val(),
        DOB: $('#DOB').val(),
        Gender: $('#Gender').val(),
        MobileNo: $('#MobileNo').val(),
        Address: $('#Address').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Pincode: $('#Pincode').val(),
        Country: $('#Country').val(),
        EmailID: $('#EmailID').val(),
        Password: $('#Password').val()
    };
    alert(objCustomer.CustomerName);
     debugger;
    $.ajax({
        url: "/gpanel/Customer/Update",
        //data: JSON.stringify(objCustomer),
        data: objCustomer,
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        cache: false,
        success: function (result) {
            console.log(result);
             debugger;
            $('#myModal').modal('hide');
            $('#CustomerID').val("");
            $('#CustomerName').val("");
            $('#DOB').val("");
            $('#Gender').val("");
            $('#MobileNo').val("");
            $('#Address').val("");
            $('#City').val("");
            $('#State').val("");
            $('#Pincode').val("");
            $('#Country').val("");
            $('#EmailID').val("");
            $('#Password').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for Reset Customer's Password record
function ResetPassword() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var CustomerObj = {
        CustomerID: $('#CustomerID').val(),
        Password: $('#Password').val()
    };
    $.ajax({
        url: "/gpanel/Customer/ResetPassword",
        data: JSON.stringify(CustomerObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert('Password Reset Successfully');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for Active/Deactive PromoCode's record
function CustomerAction(ID, ctrl) {
    var ans = confirm("Are you sure you want to change the state of this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/Customer/CustomerAction/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            cache: false,
            success: function (result) {
              //  debugger;
                // loadData();
            },
            error: function (errormessage) {
             //   debugger;
                alert(errormessage.responseText);
            }
        });
    }
    else {
        if ($(ctrl).is(':checked')) {
            $(ctrl).prop('checked', false).change();
        }
        else {
            $(ctrl).prop('checked', true).change();
        }
    }
}

//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/Customer/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#CustomerID').val("");
    $('#CustomerName').val("");
    $('#MobileNo').val("");
    $('#Address').val("");
    $('#City').val("");
    $('#Pincode').val("");
    $('#Country').val("");
    $('#EmailID').val("");
    $('#FCMToken').val("");
    $('#Password').val("");
    $('#btnUpdate').hide();
    $('#ResetPassword').hide();
    $('#btnAdd').show();
    $('#myModalLabel').text('Add Customer');
    $('#CustomerName').css('border-color', 'lightgrey');
    $('#MobileNo').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#Pincode').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#EmailID').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#CustomerName').val().trim() == "") {
        $('#CustomerName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CustomerName').css('border-color', 'lightgrey');
    }
    if ($('#MobileNo').val().trim() == "") {
        $('#MobileNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MobileNo').css('border-color', 'lightgrey');
    }
    if ($('#City').val().trim() == "") {
        $('#City').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#City').css('border-color', 'lightgrey');
    }
    if ($('#EmailID').val().trim() == "") {
        $('#EmailID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmailID').css('border-color', 'lightgrey');
    }
    return isValid;
}


function fnDateInFormat(myDate) {
    var objDate = new Date(myDate);
    var monthname = monthNames[((objDate.getMonth() > 8) ? (objDate.getMonth() + 1) : ('0' + (objDate.getMonth() + 1))) - 1];
    return ((objDate.getDate() > 9) ? objDate.getDate() : ('0' + objDate.getDate())) + '/' + monthname + '/' + objDate.getFullYear();
}