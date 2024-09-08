
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function FillFormatAndDataInListPage() {
    //Date picker Format
    $('#dvFromDate').datetimepicker({
        format: 'DD/MMM/YYYY'
    });

    $('#dvToDate').datetimepicker({
        format: 'DD/MMM/YYYY'
    });
    ActiveTab();
    loadData();
}



function loadData(){
    $.ajax({
        url: "/gpanel/DeliveryPerson/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var datatableVariable = $('#DeliveryPersonTable').DataTable({
                data: data,
                columns: [
                    { 'data': 'DeliveryPersonID', 'autoWidth': true },
                    { 'data': 'PersonName', 'autoWidth': true },
                    { 'data': 'MobileNo', 'autoWidth': true },
                    { 'data': 'City', 'autoWidth': true },
                    { 'data': 'MyPromocode', 'autoWidth': true },
                    {
                        'data': 'IsVerified', 'render': function (data, type, row) {
                            return '<div class="form-group"><div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success"><input type="checkbox" class="custom-control-input" id="chkIsVerified' + row.DeliveryPersonID + '" ' + (data ? 'checked' : '') + ' onclick="DeliveryPersonVerifyAction(' + row.DeliveryPersonID + ', this)" >  <label class="custom-control-label" for="chkIsVerified' + row.DeliveryPersonID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'IsActive', 'render': function (data, type, row) {
                            return '<div class="form-group"><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="chkIsActive' + row.DeliveryPersonID + '" ' + (data ? 'checked' : '') + ' onclick="DeliveryPersonAction(' + row.DeliveryPersonID + ', this)" >  <label class="custom-control-label" for="chkIsActive' + row.DeliveryPersonID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'DeliveryPersonID', 'render': function (item) {
                            return '<a class="btn btn-info btn-sm" href="/bhdpanel/DeliveryPerson/Edit/' + item + '"><i class="fas fa-pencil-alt"></a>';
                        }
                    }
                ]
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// This is for testing purpose
function loadDataServerSide() {
    $('#DeliveryPersonTable').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/gpanel/DeliveryPerson/List",
            "type": "POST",
            "datatype": "json"
        },
       
        "columns": [
            { "data": "deliveryPersonID", "name": "ID", "autoWidth": true },
            { "data": "personName", "name": "PersonName", "autoWidth": true },
            { "data": "mobileNo", "name": "MobileNo", "autoWidth": true },
            { "data": "city", "name": "City", "autoWidth": true },
            { "data": "myPromocode", "name": "MyPromocode", "autoWidth": true },
            ]
            });
       
    }


function Search() {
    $('#DeliveryPersonTable').DataTable().destroy();
    var SearchDeliveryPersonObj = {
        DeliveryPersonID: $('#DeliveryPersonID').val(),
        PersonName: $('#PersonName').val(),
        MobileNo: $('#MobileNo').val(),
        City: $('#City').val(),
        IsVerified: $('#ddlIsVerified').val(),
        IsActive: $('#ddlIsActive').val(),
        FromDate: $('#FromDate').val(),
        ToDate: $('#ToDate').val()
    };
    $.ajax({
        url: "/gpanel/DeliveryPerson/SearchDeliveryPerson",
        data: JSON.stringify(SearchDeliveryPersonObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var datatableVariable = $('#DeliveryPersonTable').DataTable({
                data: data,
                columns: [
                    { 'data': 'DeliveryPersonID', 'autoWidth': true },
                    { 'data': 'PersonName', 'autoWidth': true },
                    { 'data': 'MobileNo', 'autoWidth': true },
                    { 'data': 'City', 'autoWidth': true },
                    { 'data': 'MyPromocode', 'autoWidth': true },
                    {
                        'data': 'IsVerified', 'render': function (data, type, row) {
                           // return '<div class="form-group"><div class="custom-control custom-switch"><input type="checkbox" data-bootstrap-switch data-off-color="danger" data-on-color="success" id="chkIsVerified' + row.DeliveryPersonID + '" ' + (data ? 'checked' : '') + ' onclick="DeliveryPersonVerifyAction(' + row.DeliveryPersonID + ', this)" >  <label class="form-check-label" for="chkIsVerified' + row.DeliveryPersonID + '"></label></div></div>';
                            return '<div class="form-group"><div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success"><input type="checkbox" class="custom-control-input" id="chkIsVerified' + row.DeliveryPersonID + '" ' + (data ? 'checked' : '') + ' onclick="DeliveryPersonVerifyAction(' + row.DeliveryPersonID + ', this)" >  <label class="custom-control-label" for="chkIsVerified' + row.DeliveryPersonID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'IsActive', 'render': function (data, type, row) {
                            return '<div class="form-group"><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="chkIsActive' + row.DeliveryPersonID + '" ' + (data ? 'checked' : '') + ' onclick="DeliveryPersonAction(' + row.DeliveryPersonID + ', this)" >  <label class="custom-control-label" for="chkIsActive' + row.DeliveryPersonID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'DeliveryPersonID', 'render': function (item) {
                            return '<a class="btn btn-info btn-sm" href="/bhdpanel/DeliveryPerson/Edit/' + item + '"><i class="fas fa-pencil-alt"></a>';
                        }
                    }
                ]
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UploadimageInDatabaseColumn(tableName, IDColumnName, IDValue, fieldName, files, imgUploadedImage, dvUploadedImage, dvImagePreview, documentType) {
    var file = files.get(0).files;
  //  $("#FileUpload1").get(0).files[0];  
    var data = new FormData;
    data.append("tableName", tableName);
    data.append("IDColumnName", IDColumnName);
    data.append("IDValue", IDValue);
    data.append("ColumnName", fieldName);
    data.append("ImageFile", file[0]);
    data.append("DocumentType", documentType)
    $.ajax({
        type: "Post",
        url: "/gpanel/DeliveryPerson/UploadimageInDatabaseColumn",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            ClearPreview(files, dvImagePreview);
            imgUploadedImage.show();
            //dvImagePreview.show();
            dvUploadedImage.show();
            imgUploadedImage.attr('src',  response);
            //$("#uploadedImage").append('<img src="/UploadedImage/' + response + '" class="img-responsive thumbnail"/>');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
            console.log(errormessage.responseText);
        }
    })
}




function fnDateInFormat(date) {
    var date = new Date(parseInt(date.substr(6)));
    var month = date.getMonth() + 1;
    return date.getDate() + "/" + monthNames[month - 1] + "/" + date.getFullYear();
}

function FillDeliveryCity(DDKey) {
    $.ajax({
        url: "/gpanel/DeliveryPerson/DDValueList/" + DDKey,
        type: "Get",
        dataType: "json",
        success: function (data) {
            $('#PromotionalType').empty();
            for (var i = 0; i < data.length; i++) {
                var opt = new Option(data[i].DDValue, data[i].DDValueID);
                $('#PromotionalType').append(opt);

            }

        }
    });
}


function ActiveTab() {
    selectedTab = $('#aDeliveryPerson');
    parentTab = $('#aPartner');
    parentTabLi = $('#liTagPartner');
    selectedTab.addClass("active");
    parentTab.addClass("active");
    parentTabLi.addClass("menu-open");
}



function ActiveTab_Old() {
    $('#aDeliveryPerson').addClass("active");
    $('#aPartner').addClass("active");
    $('#liTagPartner').addClass("menu-open");
}
//function for Reset Customer's Password record
function ResetPassword(ID) {
   
    var DeliveryPersonObj = {
        DeliveryPersonID: ID,
        Password: $('#Password').val()
    };
    $.ajax({
        url: "/gpanel/DeliveryPerson/ResetPassword",
        data: JSON.stringify(DeliveryPersonObj),
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

//Add Data Function
function Add() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}

    var profileImageFile = $("#ProfileImage").get(0).files;
   
    var data = new FormData;
    var FolderPath = "/images/blob/documents/";

    data.append("DeliveryPersonID", 0);
    data.append("PersonName", $('#PersonName').val());
    data.append("MobileNo", $('#MobileNo').val());
    data.append("AlternateNo", $('#AlternateNo').val());
    data.append("Address", $('#Address').val());
    data.append("City", $('#City').val());
    data.append("Pincode", $('#Pincode').val());
    data.append("EmailID", $('#EmailID').val());
    data.append("Password", $('#Password').val());
    data.append("ReferPromocode", $('#ReferPromocode').val());
    data.append("ProfileImage", $("#ProfileImage").get(0).files[0]);
    data.append("AadhaarNo", $('#AadhaarNo').val());
    data.append("AadhaarFrontImage", $("#AadhaarFrontImage").get(0).files[0]);
    data.append("AadhaarBackImage", $("#AadhaarBackImage").get(0).files[0]);
    data.append("PAN", $('#PAN').val());
    data.append("PANImage", $("#PANImage").get(0).files[0]);
    data.append("DrivingLicenceNo", $('#DrivingLicenceNo').val());
    data.append("DrivingLicenceFrontImage", $("#DrivingLicenceFrontImage").get(0).files[0]);
    data.append("DrivingLicenceBackImage", $("#DrivingLicenceBackImage").get(0).files[0]);
    data.append("VehicleNo", $('#VehicleNo').val());
    data.append("VehicleDocumentImage", $("#VehicleDocumentImage").get(0).files[0]);
    data.append("VehicleFrontPhoto", $("#VehicleFrontPhoto").get(0).files[0]);
    data.append("VehicleBackPhoto", $("#VehicleBackPhoto").get(0).files[0]);
    data.append("VehicleInsuranceNo", $('#VehicleInsuranceNo').val());
    data.append("VehicleInsuranceDocumentImage", $("#VehicleInsuranceDocumentImage").get(0).files[0]);
    data.append("AccountName", $('#AccountName').val());
    data.append("AccountNo", $('#AccountNo').val());
    data.append("BankName", $('#BankName').val());
    data.append("IFSC", $('#IFSC').val());
    data.append("CanceledChequeImage", $("#CanceledChequeImage").get(0).files[0]);
    $.ajax({
        type: "Post",
        url: "/gpanel/DeliveryPerson/Add",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            alert('Record Saved Successfully');
            window.location.href = "/bhdpanel/DeliveryPerson/Index";
            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating Delivery Person's record
function Update(id) {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var DeliveryPersonObj = {
        DeliveryPersonID: id,
        PersonName: $('#PersonName').val(),
        MobileNo: $('#MobileNo').val(),
        AlternateNo: $('#AlternateNo').val(),
        Address: $('#Address').val(),
        City: $('#City').val(),
        Pincode: $('#Pincode').val(),
        EmailID: $('#EmailID').val(),
        ReferPromoCode: $('#ReferPromoCode').val(),
        AadhaarNo: $('#AadhaarNo').val(),
        PAN: $('#PAN').val(),
        DrivingLicenceNo: $('#DrivingLicenceNo').val(),
        VehicleNo: $('#VehicleNo').val(),
        VehicleInsuranceNo: $('#VehicleInsuranceNo').val(),
        AccountName: $('#AccountName').val(),
        AccountNo: $('#AccountNo').val(),
        BankName: $('#BankName').val(),
        IFSC: $('#IFSC').val(),
        IsActive: $('#ddlIsActive').val(),
        IsVerified: $('#ddlIsVerified').val()
    };
    

    $.ajax({
        url: "/gpanel/DeliveryPerson/Update",
        data: JSON.stringify(DeliveryPersonObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = "/bhdpanel/DeliveryPerson/Index";
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function showPassword() {
       // event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("fa-eye-slash");
            $('#show_hide_password i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("fa-eye-slash");
            $('#show_hide_password i').addClass("fa-eye");
        }
    }

//function for deleting PromoCode's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/DeliveryPerson/Delete/" + ID,
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

//function for Active/Deactive PromoCode's record
function DeliveryPersonAction(ID, ctrl) {
    var ans = confirm("Are you sure you want to change the state of this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/DeliveryPerson/DeliveryPersonAction/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                // loadData();
            },
            error: function (errormessage) {
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


//function for Active/Deactive PromoCode's record
function DeliveryPersonVerifyAction(ID, ctrl) {
    var ans = confirm("Are you sure you want to change the state of this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/DeliveryPerson/DeliveryPersonVerified/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                // loadData();
            },
            error: function (errormessage) {
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

function SelectDDL(item) {
    $("#ddlModuleName").val(item).change();
}

function fnDateInFormat(date) {
    var date = new Date(parseInt(date.substr(6)));
    var month = date.getMonth() + 1;
    return date.getDate() + "/" + monthNames[month - 1] + "/" + date.getFullYear();
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#EmailTitle').val("");
    $('#ddlModuleName').val("");
    $('#FromName').val("");
    $('#FromEmail').val("");
    $('#CC').val("");
    $('#BCC').val("");
    $('#Attachment').val("");
    $('#CustomSubject').val("");
    $('#CustomBody').val("");
    $('#EmailTitle').css('border-color', 'lightgrey');
    $('#ModuleName').css('border-color', 'lightgrey');
    $('#FromName').css('border-color', 'lightgrey');
    $('#FromEmail').css('border-color', 'lightgrey');
    $('#CC').css('border-color', 'lightgrey');
    $('#BCC').css('border-color', 'lightgrey');
    $('#CustomSubject').css('border-color', 'lightgrey');
    $('#CustomBody').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#EmailTitle').val().trim() == "") {
        $('#EmailTitle').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmailTitle').css('border-color', 'lightgrey');
    }
    if ($('#ddlModuleName').val().trim() == "") {
        $('#ddlModuleName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlModuleName').css('border-color', 'lightgrey');
    }
    if ($('#CustomSubject').val().trim() == "") {
        $('#CustomSubject').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CustomSubject').css('border-color', 'lightgrey');
    }
    if ($('#FromName').val().trim() == "") {
        $('#FromName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FromName').css('border-color', 'lightgrey');
    }
    if ($('#FromEmail').val().trim() == "") {
        $('#FromEmail').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FromEmail').css('border-color', 'lightgrey');
    }
    return isValid;
}