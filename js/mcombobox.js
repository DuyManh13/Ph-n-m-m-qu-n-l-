
class Combobox{
    Data;
    ListDataCombobox = [];
    IsFocus = false;
    constructor(){
        let rootHTML = document.querySelectorAll("mcombobox"); 
        for (const item of rootHTML) {
            let api = item.getAttribute("api");
            this.getApi(api);
            this.renderHTML(item);
        }
    }
    
    // 1. gọi API lấy dữ liệu
    getApi(api){
        try {
            fetch(api)
            .then((res) => res.json())
            .then((data) => {
                this.Data = data;
                console.log(this.Data);
                this.pushDataToList(data);
                this.handleEvent();
            });
        } catch (error) {
            
        }
    }
    
    // 2. Đổ dữ liệu vào list trong conbobox
    // 2.1 Tạo html từ đầu vào
    renderHTML(root){
        let newRootElement = document.createElement("div");
        newRootElement.classList.add("mcombobox");
        if(root.hasAttribute('required')){
            newRootElement.innerHTML = `<input type="text" placeholder="Chọn đơn vị" name="unit-employee" class="emmployee__input" autocomplete="off">
                                        <ul class="mcombobox__select">
                                            <!-- data được push vào các thẻ li và render lên đây -->
                                        </ul>
                                        <div class="item-mcbbx"></div>`
        }else{
            newRootElement.innerHTML = `<input type="text" placeholder="Chọn đơn vị" name="unit-employee" class="emmployee__input" autocomplete="off">
                                        <ul class="mcombobox__select">
                                            <!-- data được push vào các thẻ li và render lên đây -->
                                        </ul>`
        }
        root.replaceWith(newRootElement);
    }

    // 2.2 Đổ dữ liệu từ api vào html vừa tạo ở 2.1
    pushDataToList(data){
        try {
            let comboboxElement = document.querySelector(".mcombobox .mcombobox__select");
            // lấy ra list data không trùng lặp
            for (const item of data) {
                let isExists = false;
                isExists = this.ListDataCombobox.every(function(itemDataCombobox, index){
                    return item["DepartmentName"] != itemDataCombobox;
                })
                if(isExists && item["DepartmentName"]){
                    this.ListDataCombobox.push(item["DepartmentName"]);
    
                    // push dữ liệu vào các thẻ li và đẩy vào conbobox
                    this.createOption(comboboxElement, item["DepartmentName"]);
                }
            }   
        } catch (error) {
            console.log(error);
        }
    }

     /**
     * Hàm xử lý tạo ra 1 Element option trong combobox
     */
    createOption(comboboxElement, dataItem){
        let comboboxItemElement = document.createElement("li");
        comboboxItemElement.classList.add("mcombobox__option");
        comboboxItemElement.textContent = dataItem;
        comboboxElement.appendChild(comboboxItemElement);
        this.handleOption(comboboxItemElement);
    }

    // 3. xử lý các sự kiện khi người dùng tương tác
     /**
     * Hàm xử lý các sự kiện khi người dùng tương tác
     */
    handleEvent(){
        // 3.1 tìm kiếm giá trị
        this.handleSearchData();
         // 3.2 chọn giá trị từ combobox bằng bàn phím
        this.handlePressKey();

    }
    /**
     * Hàm xử lý tìm kiếm theo từ khóa
     */
    handleSearchData(){
        try {
            var _this = this
            let searchBoxElement = document.querySelector('input[name="unit-employee"]');
            let comboboxElement = document.querySelector(".mcombobox .mcombobox__select");

            function filterResults() {
                var keyword = _this.removeVietnameseDiacritics(searchBoxElement.value)
                var matches = _this.ListDataCombobox.filter(function(item) {
                    item = _this.removeVietnameseDiacritics(item);
                    return item.toLowerCase().includes(keyword);
                });

            
                
                // Xóa danh sách kết quả hiện tại
                while (comboboxElement.firstChild) {
                    comboboxElement.removeChild(comboboxElement.firstChild);
                }
    
                // Thêm các kết quả mới vào danh sách
                matches.forEach(function(match) {
                    // push dữ liệu vào các thẻ li và đẩy vào conbobox
                    _this.createOption(comboboxElement, match);
                });

                _this.handlePressKey();
            }
    
            searchBoxElement.addEventListener("input", filterResults);
            searchBoxElement.addEventListener("focus", filterResults);

        } catch (error) {
            console.log(error);
        }
    }
    
    /**
     * Hàm loại bỏ dấu trong tiếng việt
     */
    removeVietnameseDiacritics(str) {
        try {
            str = str.toLowerCase();
            str = str.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a');
            str = str.replace(/đ/g, 'd');
            str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e');
            str = str.replace(/í|ì|ỉ|ĩ|ị/g, 'i');
            str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o');
            str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u');
            str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y');
            return str;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Hàm xử lý khi người dùng lựa chọn giá trị
     */
        // 3.3 chọn giá trị từ combobox bằng chuột
        handleOption(comboboxItemElement){
            try {
                var _this = this
                let searchBoxElement = document.querySelector('input[name="unit-employee"]')
                let comboboxElement = document.querySelector(".mcombobox .mcombobox__select");
                // xử lý focus hoặc blur khỏi ô input
                _this.handleFocusInput(searchBoxElement, comboboxElement);
    
                // xử lý khi chọn 1 giá trị
                comboboxItemElement.addEventListener("mousedown", function(){
                    _this.handleSelectValue(searchBoxElement, comboboxElement, comboboxItemElement);
                })
                
            } catch (error) {
                console.log(error);
            }
        } 
        
    /**
     * Hàm xử lý khi click vào hoặc blur khỏi ô input
     */
        handleFocusInput(searchBoxElement, comboboxElement){
            searchBoxElement.onfocus = function(){
                this.IsFocus = true;
                comboboxElement.style.display = "block";
            }
            searchBoxElement.addEventListener("blur", function(){
                this.IsFocus = false;
                comboboxElement.style.display = "none";
            })
        }

    /**
     * Hàm xử lý khi click vào chọn 1 giá trị
     */
    handleSelectValue(searchBoxElement, comboboxElement, comboboxItemElement){
        searchBoxElement.value = comboboxItemElement.textContent;
        searchBoxElement.focus();
        searchBoxElement.blur();
        comboboxElement.style.display = "none";
        console.log(searchBoxElement.value);
    }

   
    /**
     * Hàm xử lý khi dùng phím để lựa chọn giá trị
     */
    handlePressKey(){
        let _this = this;
        let searchBoxElement = document.querySelector('input[name="unit-employee"]');
        let listItemElement = document.querySelectorAll(".mcombobox .mcombobox__option");
        console.log(listItemElement);
        let comboboxElement = document.querySelector(".mcombobox .mcombobox__select");
        let index = -1;
        if(listItemElement[0]){
            // Xử lý sự kiện nhấn phím mũi tên ở đây
            searchBoxElement.onkeydown = function(event) {
                switch (event.keyCode) {
                    // Khi nhấn phím mũi tên xuống
                    case 40:
                        if(index < listItemElement.length - 1){
                            index++;
                            console.log("a");
                        }else{
                            index = 0;
                        }
                        break;
                    // Khi nhấn phím mũi tên lên
                    case 38:
                        if(index > 0){
                            index--;
                        }else{
                            index = listItemElement.length - 1;
                        }
                        break;
                    // Khi nhấn enter hoặc tab
                    case 13:
                    case 9:
                        let comboboxElement = document.querySelector(".mcombobox .mcombobox__select");
                        let itemElementActive = document.querySelector(".mcombobox .mcombobox__option.active");
                        if(itemElementActive){
                            _this.handleSelectValue(searchBoxElement, comboboxElement, itemElementActive);
                        }
                        break;
                
                    default:
                        break;
                }
                let itemElementActive = document.querySelector(".mcombobox .mcombobox__option.active");
                if(itemElementActive){
                    itemElementActive.classList.remove("active");
                } 
                if(index >= 0) {
                    listItemElement[index].classList.add("active");
                    // console.log([comboboxElement])
                    // comboboxElement.scrollTo(0, 1000)
                }
              };
        }
    }
}

new Combobox();