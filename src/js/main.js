

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
    const swiper = new Swiper('.js-slider', {
        loop: false,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP
const popup = ()=> {
    const popup = document.querySelectorAll('.popup')
    const popupBtn = document.querySelectorAll("[data-popup='popup']")
    popup.forEach(item => {
      item.addEventListener('click', function(e){
        let itsBody = e.target == item.querySelector('.popup__body') || item.querySelector('.popup__body').contains(e.target)
        let itsClose = e.target.closest('.js-popupClose')
        if(!itsBody || itsClose){
          item.querySelector('.popup__body').classList.remove('animate__zoomIn')
          item.querySelector('.popup__body').classList.add('animate__zoomOut')
          setTimeout(()=> {
            item.classList.remove('is-open')
          },500)
        }
      })
    })
    popupBtn.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault()
            const hrefPopupBtn = item.getAttribute('href') || item.getAttribute('data-src')
            document.documentElement.classList.add('popup-open')
            popup.forEach(item => {
                item.classList.remove('is-open')
            })
            document.querySelector(hrefPopupBtn).classList.add('is-open')
            document.querySelector(hrefPopupBtn).querySelector('.popup__body').classList.add('animate__zoomIn')
            document.querySelector(hrefPopupBtn).querySelector('.popup__body').classList.remove('animate__zoomOut')
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FORM
const formValidation = () => {
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }
    function mask(event) {
        let matrix = "+7 (___) ___ __ __",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        if (event.type == "blur") {
            if (this.value.length == 2) this.value = ""
            if(this.value.length < 18) this.value = ""
        } else setCursorPosition(this.value.length, this)
    };
    let input = document.querySelectorAll(".js-maskPhone");
    input.forEach( item => {
        item.addEventListener("input", mask);
        item.addEventListener("focus", mask);
        item.addEventListener("blur", mask);
    })

    const forms = document.querySelectorAll('.form')
    forms.forEach(item =>{
        const inputName = item.querySelector('input[name="name"]')
        const inputPhone = item.querySelector('input[name="phone"]')
        item.addEventListener('submit', function(e){
            if(inputName.value.length == 0){
                e.preventDefault()
                inputName.closest('.form__field').classList.add('is-error')
            }
            if(inputPhone.value.length == 0){
                e.preventDefault()
                inputPhone.closest('.form__field').classList.add('is-error')
            }
        })
        inputName.addEventListener('input', function(){
            if(inputName.value.length != 0){
                inputName.closest('.form__field').classList.remove('is-error')
            }
        })
        inputName.addEventListener('keypress', function(event){
            if("1234567890".indexOf(event.key) != -1){
                event.preventDefault();
            }
        })
        inputPhone.addEventListener('input', function(){
            if(inputPhone.value.length != 0){
                inputPhone.closest('.form__field').classList.remove('is-error')
            }
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TABS
const services = ()=> {
    const tabs = document.querySelectorAll('.tab')
    const contents = document.querySelectorAll('.tab-content')
    contents.forEach(item => {
        item.style.display = 'none'
    })
    function removeActive(){
        tabs.forEach(item => {
            item.classList.remove('active')
        })
    }
    tabs[0].classList.add('active')
    contents[0].style.display = 'block'
    document.querySelector('.production__tabs').addEventListener('click', function(e){
        const tab = e.target.closest('.tab')
        if(tab){
            let attrVal = tab.dataset.tab
            if(tab && tab.classList.contains('active')){
                contents.forEach(item => {
                    item.style.display = "none"
                })
                removeActive()
                tab.classList.remove('active')
            } else{
                contents.forEach(item => {
                    if(item.id == attrVal){
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }
                })
                removeActive()
                tab.classList.add('active')
            }
        } 
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INIT
formValidation()
sliders()
popup()
services()
