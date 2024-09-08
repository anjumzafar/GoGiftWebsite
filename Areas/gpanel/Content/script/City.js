//Load Data in Table when documents is ready
$(document).ready(function () {
    
    loadData();
    ActiveTab();
});


function ActiveTab() {


    selectedTab = $('#aCity');
    parentTab = $('#aSetup');
    parentTabLi = $('#liTagSetup');
    selectedTab.addClass("active");
    parentTab.addClass("active");
    parentTabLi.addClass("menu-open");
}

function loadData() {
    alert("Anjum");
    $.ajax({
        url: "/gpanel/City/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            //alert(data[0].customerID);
            // debugger;
            var datatableVariable = $('#Citytable').DataTable({
                data: data,
                columns: [
                    { 'data': 'CityID', 'autoWidth': true },
                    { 'data': 'City', 'autoWidth': true },
                    { 'data': 'DeliveryCharge', 'autoWidth': true },
                    { 'data': 'IsMidNightDeliveryPossible', 'autoWidth': true },
                    {
                        'data': 'IsActive', 'render': function (data, type, row) {
                            return '<div class="form-group"><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="chk' + row.CityID + '" ' + (data ? 'checked' : '') + ' onclick="CityAction(' + row.CityID + ', this)" >  <label class="custom-control-label" for="chk' + row.CityID + '"></label></div></div>';
                        }
                    },
                    {
                        'data': 'CityID', 'render': function (item) {
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

//Add Data Function
//function Add() {
//    var res = validate();
//    if (res == false) {
//        return false;
//    }
//    var CityObj = {
//        CityID: $('#CityID').val(),
//        City: $('#City').val(),
//        CategoryID: $('#CategoryID').val(),
//        DeliveryCharge: $('#DeliveryCharge').val(),
//        iIsMidNightDeliveryPossible:$('#IsMidNightDeliveryPossible').is(":checked")
//       // IsMidNightDeliveryPossible: $('#IsMidNightDeliveryPossible').val()
//    };
//    $.ajax({
//        url: "/gpanel/City/Add",
//        data: CityObj,
//        type: "POST",
//        //contentType: "application/json;charset=utf-8",
//        //dataType: "json",
//        success: function (result) {
//            $('#myModal').modal('hide');
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

//Function for getting the Data Based upon City ID
function getbyID(CityID) {
    $('#City').css('border-color', 'lightgrey');
    $('#CategoryID').css('border-color', 'lightgrey');
    $('#DeliveryCharge').css('border-color', 'lightgrey');
    $('#IsMidnightDeliveryPossible').css('border-color', 'lightgrey');
    alert("Anjum Zafar");
    $.ajax({
        url: "/gpanel/City/GetbyID/" + CityID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#CityID').val(result.CityID);
            $('#City').val(result.City);
            $('#DeliveryCharge').val(result.DeliveryCharge);
            $('#IsMidNightDeliveryPossible').val(result.IsMidNightDeliveryPossible);
            $('#myModal').modal('show');
            $('#myModalLabel').text('Update City');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


//function for Active/Deactive PromoCode's record
function CityAction(ID, ctrl) {
    var ans = confirm("Are you sure you want to change the state of this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/City/CityAction/" + ID,
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


//function for updating Customer's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var CityObj = {
        CityID: $('#CityID').val(),
        City: $('#City').val(),
        DeliveryCharge: $('#DeliveryCharge').val(),
        IsMidNightDeliveryPossible: $('#IsMidNightDeliveryPossible').val()
    };
    $.ajax({
        url: "/gpanel/City/Update",
        data: CityObj,
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');
            $('#CityID').val("");
            $('#City').val("");
            $('#DeliveryCharge').val("");
            $('#IsMidNightDeliveryPossible').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/gpanel/City/Delete/" + ID,
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
    $('#CityID').val("");
    $('#City').val("");
    $('#DeliveryCharge').val("");
    $('#IsMidNightDeliveryPossible').val("");
    $('#btnUpdate').hide();
    $('#myModalLabel').text('Add Promocode');
    $('#btnAdd').show();
    $('#City').css('border-color', 'lightgrey');
    $('#CategoryID').css('border-color', 'lightgrey');
    $('#DeliveryCharge').css('border-color', 'lightgrey');
    $('#IsMidNightDeliveryPossible').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#City').val().trim() == "") {
        $('#City').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#City').css('border-color', 'lightgrey');
    }
  
   
    if ($('#DeliveryCharge').val().trim() == "") {
        $('#DeliveryCharge').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DeliveryCharge').css('border-color', 'lightgrey');
    }
    
    return isValid;
}