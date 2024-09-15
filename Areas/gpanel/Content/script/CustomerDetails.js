const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


//In this below function, the first line is looking for the question mark(?) because it will slice the URL from there.
//After slicing the URL it will split the URL values using the "&" mark, in other words, It'll split wherever it finds the "&" mark.

    //$(document).ready(function () {
    //    var name = GetParameterValues('Name');
    //var id = GetParameterValues('ID');
    //alert("Hello " + name + " your ID is " + id);
    //function GetParameterValues(param) {
    //        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    //for (var i = 0; i < url.length; i++) {
    //            var urlparam = url[i].split('=');
    //if (urlparam[0] == param) {
    //                return urlparam[1];
    //            }
    //        }
    //    }
    //});

//Load Data in Table when documents is ready
$(document).ready(function () {
   
    //function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1);
       // alert(url);
       // for (var i = 0; i < url.length; i++) {
            var urlparam = url.split('=');
       // alert(urlparam[0]);
       // alert(urlparam[1]);
           // if (urlparam[0] == param) {
    var id = urlparam[1];
   // alert(id);
           // }
       // }
   // }
    loadDataForCustomerPoint(id);
   // loadDataForCustomerOrder(id);
    loadDataForCustomerRecipientAddress(id);
    ActiveTab();

}); 

$(function () {
    //Date picker Format
    $('#DOBDate').datetimepicker({
        format: 'DD/MMM/YYYY'
    });
})

function loadDataForCustomerPoint(ID) {
    $.ajax({
        url: "/gpanel/Customer/PointList/" + ID,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
          //  alert(data.TblDDValue.DDValue);
             debugger;
            var datatableVariable = $('#CustomerPointtable').DataTable({
                data: data,
                columns: [
                    { 'data': 'CustomerID', 'autoWidth': true },
                    { 'data': 'TblCustomer.CustomerName', 'autoWidth': true },
                    { 'data': 'OrderID', 'autoWidth': true },
                    { 'data': 'Point', 'autoWidth': true },
                    { 'data': 'TblDDValue.DDValue', 'autoWidth': true }
                ]
            });
        },
        error: function (errormessage) {
              alert(errormessage.responseText);
        }
    });
}


function loadDataForCustomerRecipientAddress(ID) {
    alert("Anjum");
    $.ajax({
        url: "/gpanel/Customer/RecipientAddressList/" + ID,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            //  alert(data.TblDDValue.DDValue);
            debugger;
            var datatableVariable = $('#Recipienttable').DataTable({
                data: data,
                autoWidth: false,
                columns: [
                    { 'data': 'RecipientName' },
                    {
                        'data': null, // No direct data field, using 'null' for custom rendering
                        'autoWidth': true,
                        'render': function (data, type, row) {
                            return row.STDCode + row.MobileNo; // Concatenate STDCode and MobileNo
                        }
                    },
                    { 'data': 'Address' },
                    { 'data': 'City' },
                    { 'data': 'State' },
                    { 'data': 'Pincode' },
                    { 'data': 'Country' }
                ]
            });
        },
        error: function (errormessage) {
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
