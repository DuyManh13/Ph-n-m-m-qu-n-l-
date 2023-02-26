
const loading = document.getElementById("loading");
const btnThemMoi = document.querySelector(".title-btn");
const tablePopup = document.querySelector(".popup");
const btnClose = document.querySelector(".close");
const tdTable = document.getElementsByTagName("td");
function hienthi() {
   
    let tilte = document.querySelector(".font-20");
    tilte.textContent = "Sửa thông tin nhân viên";
    //Hiển thị form sửa
    tablePopup.style.display = "block";
    //Gán giá trị cho các ô nhập
    document.getElementById("txtEmployeeCode").value = item["EmployeeCode"];
    console.log(document.getElementById("txtEmployeeCode").value);
    console.log(item["EmployeeCode"]);
    document.getElementById("txtEmployeeCode").disabled = true;
    document.getElementById("txtFullName").value = item["FullName"];
    document.getElementById("txtIdentityCard").value = item["IdentityNumber"];
    document.getElementById("txtPosition").value = item["PositionName"];
    document.getElementById("txtIssuePlace").value = item["IdentityPlace"];
    document.getElementById("txtAddress").value = item["Address"];
    document.getElementById("txtMobilePhone").value = item["PhoneNumber"];
    document.getElementById("txtEmail").value = item["Email"];
    // document.getElementById("cbbDepartment").value = item["DepartmentName"];
    if (item["Gender"]) {
        document.getElementsByName("group-radio")[(item["Gender"])].checked = true;
    }

    if (item["DateOfBirth"]) {
        //Gán giá trị ngày 
        let date = new Date(item["DateOfBirth"]);
        //Lấy ra ngày
        let day = date.getDate().toString().padStart(2, '0');
        //Lấy ra tháng
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        //Lấy ra năm
        let year = date.getFullYear();
        document.getElementById("dateOfBirth").value = year + '-' + month + '-' + day;
    }

    if (item["IdentityDate"]) {
        date = new Date(item["IdentityDate"]);
        //Lấy ra ngày
        day = date.getDate().toString().padStart(2, '0');
        //Lấy ra tháng
        month = (date.getMonth() + 1).toString().padStart(2, '0');
        //Lấy ra năm
        year = date.getFullYear();

        document.getElementById("dateOfIssue").value = year + '-' + month + '-' + day;
    }

}


console.log(tdTable);

window.onload = function () {
    new EmployeePage();
    createEvent();
}
// nút load lại dữ liệu
let btnLoad = document.querySelector(".title-item1");
btnLoad.onclick = function () {
    location.reload();
}

class EmployeePage {
    ListEmployee;
    constructor() {
        this.loadData();
        this.intEvents();
    }
    /**
     * Load dữ liệu cho table
     */
    loadData() {
        try {
            loading.style.display = "flex"; // Hiển thị màn hình loading
            // Gọi api lấy dữ liệu
            fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
                .then((res) => res.json())
                .then((data) => {
                    loading.style.display = "none"; // Ẩn màn hình loading
                    this.ListEmployee = data;
                    this.buildTableData(data);
                });
            // buil table
        } catch (error) {
            loading.style.display = "none"; // Ẩn màn hình loading
            console.log(error);
        }
    }

    /**
     * Xử lý dữ liệu đẩy vào table Employee
     */
    buildTableData(data) {
        try {
            let tableEmployee = document.getElementById("tableEmployee");
            let bodyTable = tableEmployee.lastElementChild;

            // Duyệt các tiêu đề của table, đọc các thông tin được khai báo
            let thList = tableEmployee.getElementsByTagName("th");

            // Duyệt các đối tượng trong danh sách dữ liệu -> Lấy các thông tin tương ứng và build tr
            for (const item of data) {
                let trElement = document.createElement("tr");
                for (const col of thList) {
                    // Lấy ra cột có attribute là type = checkbox
                    const type = col.getAttribute("type");
                    if (type == "checkbox") {
                        let tdCheckbox = document.createElement("td");
                        tdCheckbox.classList.add("text-align");

                        // Tạo element div
                        let divCheckbox = document.createElement("div");
                        divCheckbox.classList.add("checkbox-size");
                        //Tạo element label
                        let labelCheckbox = document.createElement("label");
                        labelCheckbox.classList.add("container-checkbox");
                        // Tạo element input
                        let inputCheckbox = document.createElement("input");
                        inputCheckbox.setAttribute("type", "checkbox");
                        inputCheckbox.setAttribute("name", "elCheckbox");

                        let spanCheckbox = document.createElement("span");
                        spanCheckbox.classList.add("checkmark");

                        labelCheckbox.append(inputCheckbox);
                        labelCheckbox.append(spanCheckbox);
                        divCheckbox.append(labelCheckbox);
                        tdCheckbox.append(divCheckbox);
                        trElement.append(tdCheckbox);
                    } else if (type == "editfunction") {
                        let tdCombobox = document.createElement("td");

                        // Tạo element div
                        let divCombobox = document.createElement("div");
                        divCombobox.classList.add("supper");
                        let divDrop = document.createElement("div");
                        divDrop.classList.add("dropdown-list");
                        let content1 = document.createElement("div");
                        content1.setAttribute("id", "content");
                        content1.textContent = "Sửa";
                        let content2 = document.createElement("div");
                        content2.classList.add("dropdown");
                        let item = document.createElement("div");
                        item.classList.add("item-dropdown");
                        item.setAttribute("id", "itemDrop");

                        content2.append(item);
                        divDrop.append(content1);
                        divDrop.append(content2);
                        divCombobox.append(divDrop);
                        tdCombobox.append(divCombobox);
                        trElement.append(tdCombobox);
                    }
                    else {

                        // Lấy ra modul-name
                        const modelName = col.getAttribute("model-name");
                        // console.log(modelName.length);
                        // for (let i = 0; i < modelName.length; i++) {
                        //     if (modelName == "Salary") {
                        //         const value = item[modelName];
                        //         let tdElement = document.createElement("td");
                        //         tdElement.classList.add("text-right");
                        //         tdElement.textContent = value;
                        //         trElement.append(tdElement);
                        //         break;
                        //     }

                        // }
                        const value = item[modelName];
                        let tdElement = document.createElement("td");
                        tdElement.setAttribute("ondblclick", "hienthi()");
                        tdElement.textContent = value;
                        trElement.append(tdElement);
                    }
                }
                bodyTable.append(trElement);
            }
            //
            // Tạo từng dòng dữ liệu tương ứng với từng đối tượng trong danh sách nhân viên sau đó đẩy lên table
            // 1. Duyệt từng đối tượng trong danh sách
            // 2. Lấy ra các thông tin tương ứng với các cột table
            // 3. Build html thể hiện các thông tin trên table
            // 4. Đẩy vào table
        } catch (error) {
            console.log(error);
        }
    }

    intEvents() { }
}

function createEvent() {
    //Hiển thị form thêm nhân viên
    btnThemMoi.addEventListener("click", function () {
        tablePopup.style.display = "block";
        let tilte = document.querySelector(".font-20");
        tilte.textContent = "Thêm mới nhân viên";
    });
    // Đóng form thêm nhân viên
    btnClose.addEventListener("click", function () {
        tablePopup.style.display = "none";
    });
    // set sự kiện checkbox
    // 1.Lấy danh sách các checkbox trong nhóm
    let checkboxes = document.getElementsByName("groupckb");

    // 2.Lặp qua từng checkbox trong danh sách
    for (let i = 0; i < checkboxes.length; i++) {
        // 3.set sự kiện click cho từng checkbox
        checkboxes[i].addEventListener("click", function () {
            // Nếu checkbox đang được chọn, thì bỏ chọn các checkbox khác trong nhóm
            if (this.checked) {
                for (let j = 0; j < checkboxes.length; j++) {
                    if (checkboxes[j] != this) {
                        checkboxes[j].checked = false;
                    }
                }
            }
        });
    }
    // Kiểm tra radio btn 
    // set sự kiện cho các ô bắt buộc nhập thông tin
    document.querySelectorAll(" div [required]").forEach(function (el) {
        el.addEventListener("blur", onValidate);
    });
    // validate cho ô cmnd
    document.getElementById("txtIdentityCard").addEventListener("blur", onValidateSo);
    // validate cho ô điện thoại di động
    document.getElementById("txtMobilePhone").addEventListener("blur", onValidateSodtdd);
    // validate cho ô điện thoại cố định
    document.getElementById("txtLandlinePhone").addEventListener("blur", onValidateSodtcd);
    // validate cho ô Ngay sinh
    document.getElementById("dateOfBirth").addEventListener("blur", onValidateNgay);
    // validate cho ô Ngay cap
    document.getElementById("dateOfIssue").addEventListener("blur", onValidateNgay);

    // Tạo sự kiện tabindex
    tabIndex();
};
function onValidate() {
    try {
        //Lấy ra value trong input vừa nhập
        let input = this;
        let value = input.value;
        console.log(value);
        // Kiểm tra dữ liệu có trống hay không
        if (value.trim() == "".trim() || value == null || value == undefined) {
            console.log("Sai dữ liệu");
            // gán border màu đỏ
            input.classList.add("input--error");
            // Nếu trống hiển thị thông báo lỗi
            // Đặt hiển thị thông báo lỗi
            //1. Kiểm tra xem đã có element thông tin lỗi chưa?
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits == null) {
                //Tạo element thông tin lỗi:
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Thông tin không được phép trống.";
                // Sử dụng cha của input và append:
                this.parentElement.append(elError);
                console.log(this.parentElement);

            }
        }
        else {
            console.log("Ok");
            input.classList.remove("input--error");
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits != null) {
                elErrorExits.remove();
            }
        }


    } catch (error) {

    }
}
function onValidateSo() {
    let input = this;
    let value = input.value;
    if (value.trim() == "".trim() || isNaN(value) == false && value.length == 9 || isNaN(value) == false && value.length == 12) {

        console.log("Ok");
        input.classList.remove("input--error");
        let elErrorExits = this.nextElementSibling;
        if (elErrorExits != null) {
            elErrorExits.remove();
        }

    }
    else {
        console.log("Sai dữ liệu");
        if (isNaN(value) == true || value.length != 9 || value.length != 12) {
            // gán border màu đỏ
            console.log("sai");
            input.classList.add("input--error");
            // Nếu trống hiển thị thông báo lỗi
            // Đặt hiển thị thông báo lỗi
            //1. Kiểm tra xem đã có element thông tin lỗi chưa?
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits == null) {
                //Tạo element thông tin lỗi:
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Thông tin nhập phải đúng và đủ.";
                // Sử dụng cha của input và append:
                this.parentElement.append(elError);
            }
        }

    }

}
function onValidateSodtdd() {
    let input = this;
    let value = input.value;
    if (value.trim() == "".trim() || isNaN(value) == false && value.length == 10) {

        console.log("Ok");
        input.classList.remove("input--error");
        let elErrorExits = this.nextElementSibling;
        if (elErrorExits != null) {
            elErrorExits.remove();
        }

    }
    else {
        console.log("Sai dữ liệu");
        if (isNaN(value) == true || value.length != 10) {
            // gán border màu đỏ
            console.log("sai");
            input.classList.add("input--error");
            // Nếu trống hiển thị thông báo lỗi
            // Đặt hiển thị thông báo lỗi
            //1. Kiểm tra xem đã có element thông tin lỗi chưa?
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits == null) {
                //Tạo element thông tin lỗi:
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Số điện thoại phải là số và 10 kí tự.";
                // Sử dụng cha của input và append:
                this.parentElement.append(elError);
            }
        }

    }

}
function onValidateSodtcd() {
    let input = this;
    let value = input.value;
    if (value.trim() == "".trim() || isNaN(value) == false && value.length == 8 || isNaN(value) == false && value.length == 7) {

        console.log("Ok");
        input.classList.remove("input--error");
        let elErrorExits = this.nextElementSibling;
        if (elErrorExits != null) {
            elErrorExits.remove();
        }

    }
    else {
        console.log("Sai dữ liệu");
        if (isNaN(value) == true || value.length != 8 || value.length != 7) {
            // gán border màu đỏ
            console.log("sai");
            input.classList.add("input--error");
            // Nếu trống hiển thị thông báo lỗi
            // Đặt hiển thị thông báo lỗi
            //1. Kiểm tra xem đã có element thông tin lỗi chưa?
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits == null) {
                //Tạo element thông tin lỗi:
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Số điện thoại cố định không hợp lệ.";
                // Sử dụng cha của input và append:
                this.parentElement.append(elError);
            }
        }

    }

}
function onValidateKbb() {
    try {
        //Lấy ra value trong input vừa nhập
        let input = this;
        let value = input.value;
        console.log(value.length);
        // Kiểm tra dữ liệu có trống hay không
        if (isNaN(value) || value == "") {

            console.log("Ok");
            input.classList.remove("input--error");
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits != null) {
                elErrorExits.remove();
            }

        }
        else {

            console.log("Sai dữ liệu");
            // gán border màu đỏ
            input.classList.add("input--error");
            // Nếu trống hiển thị thông báo lỗi
            // Đặt hiển thị thông báo lỗi
            //1. Kiểm tra xem đã có element thông tin lỗi chưa?
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits == null) {
                //Tạo element thông tin lỗi:
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Bạn phải nhập vào một chuỗi";
                // Sử dụng cha của input và append:
                this.parentElement.append(elError);
            }
        }

    } catch (error) {

    }
}

function onValidateNgay() {
    try {
        //Lấy ra value trong input vừa nhập
        let input = this;
        let value = input.value;
        console.log(value.length);
        // Kiểm tra value có định dạng đúng không 
        if (value) {
            value = new Date(value);
        }
        // Kiểm tra ngày chọn so với hiện tại
        if (value > new Date()) {
            console.log("Sai dữ liệu");
            // gán border màu đỏ
            input.classList.add("input--error");
            // Nếu trống hiển thị thông báo lỗi
            // Đặt hiển thị thông báo lỗi
            //1. Kiểm tra xem đã có element thông tin lỗi chưa?
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits == null) {
                //Tạo element thông tin lỗi:
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Ngày phải bé hơn ngày hiện tại";
                // Sử dụng cha của input và append:
                this.parentElement.append(elError);
            }

        }
        else {

            console.log("Ok");
            input.classList.remove("input--error");
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits != null) {
                elErrorExits.remove();
            }
        }

    } catch (error) {

    }
}
// set tabindex
function tabIndex() {
    const formElement = document.querySelector('#form');
    const inputElements = formElement.querySelectorAll('input');

    let tabindex = 1;

    inputElements.forEach(input => {
        input.tabIndex = tabindex;
        tabindex++;
    });

}
// set sự kiện checkbox full
// lấy ra nút checkbox
const checkboxAll = document.querySelector("#checkboxAll");
// console.log(checkboxAll);
// 1.Lấy danh sách các checkbox trong nhóm
const elCheckboxes = document.getElementsByName("elCheckbox");
// hàm thay đổi 
function updateCheckAllCheckbox() {
    var allChecked = true;
    for (var i = 0; i < elCheckboxes.length; i++) {
        if (!elCheckboxes[i].checked) {
            allChecked = false;
            break;
        }
    }
    checkboxAll.checked = allChecked;
}

// set sự kiện
checkboxAll.addEventListener("change", function () {
    for (var i = 0; i < elCheckboxes.length; i++) {
        elCheckboxes[i].checked = checkboxAll.checked;
    }
});

for (var i = 0; i < elCheckboxes.length; i++) {
    elCheckboxes[i].addEventListener("change", function () {
        updateCheckAllCheckbox();
    });
}

// Initial state
updateCheckAllCheckbox();