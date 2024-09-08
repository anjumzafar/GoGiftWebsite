
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
    FillData();
    ActiveTab();
});

$(function () {
    //Date picker Format
    $('#reservationdate').datetimepicker({
        format: 'DD/MMM/YYYY'
    });
})


function ActiveTab() {
    selectedTab = $('#aPromocode');
    parentTab = $('#aSetup');
    parentTabLi = $('#liTagSetup');
    selectedTab.addClass("active");
    parentTab.addClass("active");
    parentTabLi.addClass("menu-open");
}


function loadData() {
    $.ajax({
        url: "/gpanel/PromotionalCode/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var datatableVariable = $('#PromotionalCodetable').DataTable({
                data: data,
                columns: [
                    { 'data': 'PromotionalCodeID', 'autoWidth': true },
                    { 'data': 'PromotionalCode', 'autoWidth': true },
                    { 'data': 'PromotionalDiscount', 'autoWidth': true },
                    { 'data': 'DiscountType', 'autoWidth': true },
                    { 'data': 'TblDDValue.DDValue', 'autoWidth': true },
                    { 'data': 'MinimumCartValue', 'autoWidth': true },
                    { 'data': 'MaximumDiscount', 'autoWidth': true },
                    {
                        'data': 'ExpiryDate', 'render': function (ExpiryDate) {
                            var objDate = new Date(ExpiryDate);
                            var monthname = monthNames[((objDate.getMonth() > 8) ? (objDate.getMonth() + 1) : ('0' + (objDate.getMonth() + 1))) - 1];
                            return ((objDate.getDate() > 9) ? objDate.getDate() : ('0' + objDate.getDate())) + '/' + monthname + '/' + objDate.getFullYear();
                        }
                    },
                    { 'data': 'Remark', 'autoWidth': true },
                    {
                        'data': 'IsActive', 'render': function (data, type, row) {
                            return '<div class="form-group"><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="chk' + row.PromotionalCodeID + '" ' +  (data ? 'checked' : '') + ' onclick="PromotionalCodeAction(' + row.PromotionalCodeID + ', this)" >  <label class="custom-control-label" for="chk' + row.PromotionalCodeID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'PromotionalCodeID', 'render': function (item) {
                            return '<a class="btn btn-info btn-sm" href="#" onclick="return getbyID(' + item + ')"><i class="fas fa-pencil-alt"></a>';
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


function FillData() {
    $.ajax({
        url: "/gpanel/PromotionalCode/DDValueList",
        type: "GET",
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

//Add Data Function
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    $('#PromotionalCodetable').DataTable().destroy();
    var PromocodeObj = {
        PromotionalCodeID: $('#PromotionalCodeID').val(),
        PromotionalCode: $('#PromotionalCode').val(),
        PromotionalDiscount: $('#PromotionalDiscount').val(),
        DiscountType: $('#DiscountType').val(),
        PromotionalTypeID: $('#PromotionalType').val(),
        MinimumCartValue: $('#MinimumCartValue').val(),
        MaximumDiscount: $('#MaximumDiscount').val(),
        ExpiryDate: $('#ExpiryDate').val(),
        Remark: $('#Remark').val()
    };
    $.ajax({
        url: "/PromotionalCode/Add",
        data: PromocodeObj,
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon PromotionalCodeID
function getbyID(PromotionalCodeID) {
    $('#PromotionalCode').css('border-color', 'lightgrey');
    $('#PromotionalDiscount').css('border-color', 'lightgrey');
    $('#DiscountType').css('border-color', 'lightgrey');
    $('#PromotionalType').css('border-color', 'lightgrey');
    $('#MinimumCartValue').css('border-color', 'lightgrey');
    $('#MaximumDiscount').css('border-color', 'lightgrey');
    $('#ExpiryDate').css('border-color', 'lightgrey');
    $('#Remark').css('border-color', 'lightgrey');
    $('#IsActive').css('border-color', 'lightgrey');
    $.ajax({
        url: "/PromotionalCode/getbyID/" + PromotionalCodeID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#PromotionalCodeID').val(result.PromotionalCodeID);
            $('#PromotionalCode').val(result.PromotionalCode);
            $('#PromotionalDiscount').val(result.PromotionalDiscount);
            $("#DiscountType").val(result.DiscountType).change();
            $("#PromotionalType").val(result.PromotionalTypeID).change();
            $('#MinimumCartValue').val(result.MinimumCartValue);
            $('#MaximumDiscount').val(result.MaximumDiscount);
            $('#ExpiryDate').val(fnDateInFormat(result.ExpiryDate));
            $('#Remark').val(result.Remark);
            $('#myModal').modal('show');
            $('#myModalLabel').text('Update Promocode');
            $('#btnUpdate').show();
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
    $('#PromotionalCodetable').DataTable().destroy();
    var PromocodeObj = {
        PromotionalCodeID: $('#PromotionalCodeID').val(),
        PromotionalCode: $('#PromotionalCode').val(),
        PromotionalDiscount: $('#PromotionalDiscount').val(),
       
        DiscountType: $('#DiscountType').val(),
        PromotionalTypeID: $('#PromotionalType').val(),

        MinimumCartValue: $('#MinimumCartValue').val(),
        MaximumDiscount: $('#MaximumDiscount').val(),

        ExpiryDate: $('#ExpiryDate').val(),
        Remark: $('#Remark').val()
    };
    
    $.ajax({
        url: "/gpanel/PromotionalCode/Update",
        data: PromocodeObj,
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#PromotionalCodeID').val("");
            $('#PromotionalCode').val("");
            $('#PromotionalDiscount').val("");
            $('#MinimumCartValue').val("");
            $('#MaximumDiscount').val("");
            $('#ExpiryDate').val("");
            $('#DiscountType').val("");
            $('#Remark').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting PromoCode's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/PromotionalCode/Delete/" + ID,
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
function PromotionalCodeAction(ID, ctrl) {
    var ans = confirm("Are you sure you want to change the state of this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/PromotionalCode/PromotionalCodeAction/" + ID,
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


function fnDateInFormat (myDate) {
    var objDate = new Date(myDate);
    var monthname = monthNames[((objDate.getMonth() > 8) ? (objDate.getMonth() + 1) : ('0' + (objDate.getMonth() + 1))) - 1];
    return ((objDate.getDate() > 9) ? objDate.getDate() : ('0' + objDate.getDate())) + '/' + monthname + '/' + objDate.getFullYear();
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#PromotionalCodeID').val("");
    $('#PromotionalCode').val("");
    $('#PromotionalDiscount').val("");
    $('#DiscountType').val("");
    $('#MinimumCartValue').val("");
    $('#MaximumDiscount').val("");
    $('#ExpiryDate').val("");
    $('#Remark').val("");
    $('#IsActive').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#myModalLabel').text('Add Promocode');
    $('#PromotionalCode').css('border-color', 'lightgrey');
    $('#PromotionalDiscount').css('border-color', 'lightgrey');
    $('#ExpiryDate').css('border-color', 'lightgrey');
    $('#DiscountType').css('border-color', 'lightgrey');
    $('#PromotionalTypeID').css('border-color', 'lightgrey');
    $('#PromotionalType').css('border-color', 'lightgrey');
    $('#Remark').css('border-color', 'lightgrey');
    $('#IsActive').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#PromotionalCode').val().trim() == "") {
        $('#PromotionalCode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PromotionalCode').css('border-color', 'lightgrey');
    }
    if ($('#PromotionalDiscount').val().trim() == "") {
        $('#PromotionalDiscount').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PromotionalDiscount').css('border-color', 'lightgrey');
    }
    if ($('#ExpiryDate').val().trim() == "") {
        $('#ExpiryDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ExpiryDate').css('border-color', 'lightgrey');
    }
    if ($('#DiscountType').val().trim() == "") {
        $('#DiscountType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DiscountType').css('border-color', 'lightgrey');
    }
    if ($('#PromotionalType').val().trim() == "") {
        $('#PromotionalType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PromotionalType').css('border-color', 'lightgrey');
    }
    return isValid;
}