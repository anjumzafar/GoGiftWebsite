
function FillFormatAndDataInListPage() {
    Search();
}
//Below TodayDate() function return today date in dd/MMM/yyyy format
function TodayDate() {
    let date = new Date(),
        day = date.getDate();
        month = date.getMonth(),
        year = date.getFullYear(),
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return day + '/' + months[month] + '/' + year;
}


function Search() {
    $('#CustomerPointTable').DataTable().destroy();
  //  alert($('#ToOrderDate').val());
  //  alert($('#FromOrderDate').val());
    var SearchCustomerPointObj = {
        CustomerID: $('#txtCustomerID').val(),
        EmailID: $('#txtEmailID').val(),
        FromPoint: $('#txtFromPoint').val(),
        ToPoint: $('#txtToPoint').val(),
        IsEmailSent: $('#ddlIsEmailSent').val()
    };
    $.ajax({
        url: "/gpanel/CustomerPoint/SearchCustomerPoint",
        data: JSON.stringify(SearchCustomerPointObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var datatableVariable = $('#CustomerPointTable').DataTable({
                data: data,
                columns: [
                    { 'data': 'CustomerID', 'autoWidth': true },
                    { 'data': 'FirstName', 'autoWidth': true },
                    { 'data': 'LastName', 'autoWidth': true },
                    { 'data': 'EmailID', 'autoWidth': true },
                    { 'data': 'CustomerPoint', 'autoWidth': true },
                    { 'data': 'IsEmailSent', 'autoWidth': true },
                ]
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}



function SendMail() {

    $.ajax({
        url: "/gpanel/CustomerPoint/SendMail",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result) {
                alert('10 Email Sent Successfully');
            }
            else {
                alert('Something went wrong. Email Not Sent');
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
            alert('Error')
        }
    });
}



