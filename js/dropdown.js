const selectContent = document.getElementById("content");
const optionDrop = document.getElementsByClassName("option-drop");
const listDrop = document.getElementById("tbList-drop");
const itemDrop = document.querySelector(".item-dropdown");

// gán thông tin khi chọn chức năng khác
console.log(optionDrop);
console.log(listDrop);
console.log(itemDrop);
console.log(selectContent.textContent);
for (op of optionDrop) {
    op.onclick = function () {
        listDrop.classList.toggle("hiden");
    }
}
// ẩn hiện thanh chọn 
itemDrop.onclick = function () {
    console.log("aa");
    console.log(listDrop.classList);
    listDrop.classList.toggle("hiden");
}