
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function FillFormatAndDataInListPage() {
    ActiveTab();
    loadData();
}


function loadData() {
    $.ajax({
        url: "/gpanel/EmailTemplate/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var datatableVariable = $('#EmailTemplateTable').DataTable({
                data: data,
                columns: [
                    { 'data': 'EmailTemplateID', 'autoWidth': true },
                    { 'data': 'ModuleName', 'autoWidth': true },
                    { 'data': 'EmailTitle', 'autoWidth': true },
                    { 'data': 'FromEmail', 'autoWidth': true },
                    { 'data': 'SMTPServer', 'autoWidth': true },
                    {
                        'data': 'IsActive', 'render': function (data, type, row) {
                            return '<div class="form-group"><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="chk' + row.EmailTemplateID + '" ' + (data ? 'checked' : '') + ' onclick="EmailTemplateAction(' + row.EmailTemplateID + ', this)" >  <label class="custom-control-label" for="chk' + row.EmailTemplateID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'EmailTemplateID', 'render': function (item) {
                            return '<a class="btn btn-info btn-sm" href="/EmailTemplate/Edit/' + item + '"><i class="fas fa-pencil-alt"></a>';
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



function ActiveTab() {
    selectedTab = $('#aEmailTemplate');
    parentTab = $('#aSetup');
    parentTabLi = $('#liTagSetup');
    selectedTab.addClass("active");
    parentTab.addClass("active");
    parentTabLi.addClass("menu-open");
}

//Add Data Function
//function Add() {
//    var res = validate();
//    if (res == false) {
//        return false;
//    }
//    var EmailTemplateObj = {
//        EmailTemplateID: 0,
//        EmailTitle: $('#EmailTitle').val(),
//        ModuleName: $('#ddlModuleName').val(),
//        FromName: $('#FromName').val(),
//        FromEmail: $('#FromEmail').val(),
//        CC: $('#CC').val(),
//        BCC: $('#BCC').val(),
//        CustomSubject: $('#CustomSubject').val(),
//        CustomBody: $('#CustomBody').val()
//    };
//    $.ajax({
//        url: "/EmailTemplate/Add",
//        data: EmailTemplateObj,
//        type: "POST",
//        //contentType: "application/json;charset=utf-8",
//        //dataType: "json",
//        success: function (result) {
//            alert('Record Saved Successfully');
//            clearTextBox();
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

//function for updating Email Template's record
//function Update(id) {
//    var res = validate();
//    if (res == false) {
//        return false;
//    }
//    var EmailTemplateObj = {
//        EmailTemplateID: id,
//        EmailTitle: $('#EmailTitle').val(),
//        ModuleName: $('#ddlModuleName').val(),
//        FromName: $('#FromName').val(),
//        FromEmail: $('#FromEmail').val(),
//        CC: $('#CC').val(),
//        BCC: $('#BCC').val(),
//        CustomSubject: $('#CustomSubject').val(),
//        CustomBody: $('#CustomBody').val()
//    };

//    $.ajax({
//        url: "/EmailTemplate/Update",
//        data: EmailTemplateObj,
//        type: "POST",
//        //contentType: "application/json;charset=utf-8",
//        //dataType: "json",
//        success: function (result) {
//            window.location.href = "/EmailTemplate/Index";
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

//function for Active/Deactive PromoCode's record
function EmailTemplateAction(ID, ctrl) {
    var ans = confirm("Are you sure you want to change the state of this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/EmailTemplate/EmailTemplateAction/" + ID,
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


//function SelectDDL(item) {
//    $("#ddlModuleName").val(item).change();
//}

function fnDateInFormat(myDate) {
    var objDate = new Date(myDate);
    var monthname = monthNames[((objDate.getMonth() > 8) ? (objDate.getMonth() + 1) : ('0' + (objDate.getMonth() + 1))) - 1];
    return ((objDate.getDate() > 9) ? objDate.getDate() : ('0' + objDate.getDate())) + '/' + monthname + '/' + objDate.getFullYear();
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#EmailTitle').val("");
    $('#ModuleName').val("");
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