function showPassword() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function ActiveTab(item, parentItem) {
    item.addClass('active');
    parentItem.addClass('active');
    }
