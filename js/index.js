popup();
slider();

function slider() {
    const toggles = document.querySelector('.slider-toggles');
    const sliderList = document.querySelector('.slider-list');
    
    toggles.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('slider-toogle-checked')) return;
        
        if (evt.target.classList.contains('slider-toggle')) {
            const active = document.querySelector('.slider-toogle-checked');
            active.classList.remove('slider-toogle-checked');
            evt.target.classList.add('slider-toogle-checked');
            const index = evt.target.dataset.counter;
            
            const activeSlide = document.querySelector('.slider-item-active');
            activeSlide.classList.remove('slider-item-active');
            sliderList.children[index].classList.add('slider-item-active');
            document.body.className='';
            document.body.classList.add(`slider-${index}`)
        }
    });
}

function popup() {
    const btnContact = document.querySelector('.btn-contact');
    let popup = document.querySelector('.feedback');
    let overlay = document.querySelector('.overlay');
    
    const feedbackName = popup.querySelector('[name=feedback-name]');
    const feedbackTxt = popup.querySelector('[name=feedback-txt]');
    const feedbackEmail = popup.querySelector('[name=feedback-email]');
    
    const isStorageSupport = true;
    let storageName = '';
    let storageEmail = '';

    //trying to use localStorage
    try {
        storageName = localStorage.getItem('glassyFeedbackName');
        storageEmail = localStorage.getItem('glassyFeedbackEmail');
    } catch {
        isStorageSupport = false;
    }

    // catching clicking on button-opener of modal popup
    btnContact.addEventListener('click', (evt) => {
        evt.preventDefault();
        popup.classList.add('modal-show');
        overlay.classList.remove('hidden');

        // if there we have Name in storage we place it in input for name
        if (storageName) {		
            feedbackName.value = storageName;
            // if there we have Email in storage we place it in input
            // and place keyboard focus in textarea input
            if (storageEmail) {
                feedbackEmail.value = storageEmail;
                feedbackTxt.focus();
            //if we haven't Email in storage we place keyboard focus in input for emain
            } else {
                feedbackEmail.focus();
            }
        //if we haven't Name in storage we place keyboard focus in input for name
        } else {
            feedbackName.focus();
        }
    });
    
    const close = popup.querySelector('.close-btn');

    popup.addEventListener('submit', (evt) => {
        evt.preventDefault();

        //if inputs for name or textarea is empty we ask user to enter values
        if (!feedbackName.value || !feedbackTxt.value) {
            popup.classList.add('modal-error');
        } else {
            //if user entered name and textarea values we save name and email in localStorage
            if (isStorageSupport) {
                if (feedbackName) {
                    localStorage.removeItem('glassyFeedbackName');
                    localStorage.setItem('glassyFeedbackName', feedbackName.value);
                }
                if (feedbackEmail) {
                    localStorage.removeItem('glassyFeedbackEmail');
                    localStorage.setItem('glassyFeedbackEmail', feedbackEmail.value);
                }
            }
            closeModal(popup, overlay);
        }
    });

    //Closing modal popup on close button inside modal popup
    close.addEventListener('click', (evt) => {
        evt.preventDefault();
        closeModal(popup, overlay);
    });

    //Closing modal popup by ESC
    window.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            if (popup.classList.contains('modal-show')) closeModal(popup, overlay);
        }
    });

    //Closing modal popup by clicking somewhere outside of this popup
    overlay.addEventListener('click', () => closeModal(popup, overlay))
}

function closeModal(popup, overlay) {
    popup.classList.remove('modal-show');
    popup.classList.remove('modal-error');
    overlay.classList.add('hidden');	
}