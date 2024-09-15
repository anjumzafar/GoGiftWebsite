
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
        url: "/gpanel/Vendor/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            // debugger;
            var datatableVariable = $('#Vendortable').DataTable({
                data: data,
                columns: [
                    { 'data': 'VendorID', 'autoWidth': true },
                    { 'data': 'VendorName', 'autoWidth': true },
                    { 'data': 'STDCode', 'autoWidth': true },
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
                            return '<div class="form-group"><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="chk' + row.VendorID + '" ' + (data ? 'checked' : '') + ' onclick="VendorAction(' + row.VendorID + ', this)" >  <label class="custom-control-label" for="chk' + row.VendorID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'VendorID', 'render': function (item) {
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
    selectedTab = $('#aVendor');
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



//Function for getting the Data Based upon Vendor ID
function getbyID(VendorID) {
    $('#VendorName').css('border-color', 'lightgrey');
    $('#MobileNo').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#Pincode').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#EmailID').css('border-color', 'lightgrey');
    // alert(VendorID);
    //debugger;
    $.ajax({
        url: "/gpanel/Vendor/getbyID/" + VendorID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",

        success: function (result) {
            //console.log(result);
            // debugger;
            $('#VendorID').val(result.VendorID);
            $('#VendorName').val(result.VendorName);
            $('#DOB').val(fnDateInFormat(result.DOB));
            $('#Gender').val(result.Gender);
            $('#STDCode').val(result.STDCode);
            $('#MobileNo').val(result.MobileNo);
            $('#Address').val(result.Address);
            $('#City').val(result.City);
            $('#State').val(result.State);
            $('#Pincode').val(result.Pincode);
            $('#Country').val(result.Country);
            $('#EmailID').val(result.EmailID);
            $('#Password').val(result.Password);
            // alert(result.VendorName);
            // debugger;

            $('#myModal').modal('show');
            $('#myModalLabel').text('Update Vendor');
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

//function for updating Vendor's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var objVendor = {
        VendorID: $('#VendorID').val(),
        VendorName: $('#VendorName').val(),
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
    alert(objVendor.VendorName);
    debugger;
    $.ajax({
        url: "/gpanel/Vendor/Update",
        //data: JSON.stringify(objVendor),
        data: objVendor,
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        cache: false,
        success: function (result) {
            console.log(result);
            debugger;
            $('#myModal').modal('hide');
            $('#VendorID').val("");
            $('#VendorName').val("");
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

//function for Reset Vendor's Password record
function ResetPassword() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var VendorObj = {
        VendorID: $('#VendorID').val(),
        Password: $('#Password').val()
    };
    $.ajax({
        url: "/gpanel/Vendor/ResetPassword",
        data: JSON.stringify(VendorObj),
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
function VendorAction(ID, ctrl) {
    var ans = confirm("Are you sure you want to change the state of this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/Vendor/VendorAction/" + ID,
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
            url: "/gpanel/Vendor/Delete/" + ID,
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
    $('#VendorID').val("");
    $('#VendorName').val("");
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
    $('#myModalLabel').text('Add Vendor');
    $('#VendorName').css('border-color', 'lightgrey');
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
    if ($('#VendorName').val().trim() == "") {
        $('#VendorName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#VendorName').css('border-color', 'lightgrey');
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