const selectField = document.getElementById("selectField");
const selectText = document.getElementById("selectText");
const options = document.getElementsByClassName("option");
const list = document.getElementById("tbList");
const item = document.getElementById("item");
const divider = document.querySelector(".divider");



// gán thông tin khi di chuột vào hộp chọn

console.log(selectField.textContent);
for (op of options) {
    op.onclick = function () {
        selectText.innerHTML = this.textContent;
        list.classList.toggle("hiden");
        item.classList.toggle("rotate");
    }
}
// ẩn hiện thanh chọn 
selectField.onclick = function () {
    list.classList.toggle("hiden");
    item.classList.toggle("rotate");
}
divider.onclick = function () {
    list.classList.toggle("hiden");
    item.classList.toggle("rotate");
}
console.log(divider);