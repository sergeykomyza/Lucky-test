

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = () => {

    setTimeout(function() {
        var headID = document.getElementsByTagName("body")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        headID.appendChild(newScript);
    }, 3000);
    setTimeout(function() {
            var myMap = new ymaps.Map("map", {
            center: [55.917879, 37.806326],
            zoom: 13,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });

        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point"
            },
        });
        myMap.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark([55.917879, 37.806326], {
                balloonContent: '<strong></strong>',
                iconCaption: 'М.О., г. Королев, ул. Ленина 12'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));

        myMap.setType('yandex#publicMap');

        myMap.behaviors.disable('scrollZoom');
        //на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
        }
    }, 4000);

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
            var range = elem.createTextRange();
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
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);
    
    function hideContent(){
      content.forEach(item => {
        item.style.display = 'none';
      });
      tab.forEach(item => {
        item.classList.remove(activeClass);
      });
    }
    
    function showContent(i){
      content[i].style.display = 'block';
      tab[i].classList.add(activeClass);
    }
    
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.closest(tabSelector);
      if( target &&
              (target.classList.contains(tabSelector.replace(/\./,"")) ||  target.parentNode.classList.contains(tabSelector.replace(/\./,"")))){
              tab.forEach((item, i) => {
                  if(target == item || target.parentNode == item){
                      hideContent();
                      showContent(i);
                  }
              });
          }
    });
  
    hideContent();
    showContent(0); 
    
}

  
  
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INIT
// inputMask()
formValidation()
tabs('.production__tabs', '.tab', '.tab-content', 'active');
sliders()
popup()
