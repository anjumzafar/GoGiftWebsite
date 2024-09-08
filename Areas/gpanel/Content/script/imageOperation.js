 // Function to set image dimensions in large
function enlargeImg(img1) {
    img1.style.width = "60%";
    img1.style.height = "auto";
    img1.style.transition = "width 0.5s ease";
}

// Function to reset image dimensions
function resetImg(img) {
    img.style.width = "40%";
    img.style.height = "auto";
    img.style.transition = "width 0.5s ease";
}

function showImageInModel(img, imageModal, imagePreview) {
       imagePreview.attr('src', img.attr('src')); // here asign the image to the modal when the user click the enlarge link
       imageModal.modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
}

function loadImage(event, imgOutput) {
      
    imgOutput.attr('src', URL.createObjectURL(event.target.files[0]));
    imgOutput.onload = function () {
        URL.revokeObjectURL(imgOutput.attr('src')) // free memory
    }
}

function ReadImage(event, imgOutput, dvImagePreview, dvUploadedImage) {
    var file = event.target.files[0];
    var reader = new FileReader;
    var image = new Image;
    reader.readAsDataURL(file);
    reader.onload = function (_file) {
        image.src = _file.target.result;
        image.onload = function () {
            var height = this.height;
            var width = this.width;
            var type = file.type;
            var size = ~~(file.size / 1024) + "KB";

            imgOutput.attr('src', _file.target.result);
          //  $("#description").text("Size:" + size + ", " + height + "X " + width + ", " + type + "");
            dvImagePreview.show();
            if (typeof (dvUploadedImage) !== 'undefined') {
                dvUploadedImage.hide();
            }
        }
    }
}

function ClearPreview(file, dvImagePreview) {
    file.val('');
    dvImagePreview.hide();
}
