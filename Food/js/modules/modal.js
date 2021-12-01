function modal () {
    const btnModalOpen = document.querySelectorAll('[data-modal]'),
        windowModal = document.querySelector('.modal');


    function closeModal() {
        windowModal.classList.remove('modal_active')
        document.body.style.overflow = 'auto'
    }

    function openModal() {
        windowModal.classList.add('modal_active')
        document.body.style.overflow = 'hidden'
        clearInterval(openModalTime)
    }

    function showModalTab() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalTab)
        }

    }

    btnModalOpen.forEach((item) => {
        item.addEventListener('click', openModal)
    });

    windowModal.addEventListener('click', (e) => {
        if (e.target === windowModal || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && windowModal.classList.contains('modal_active')) {
            closeModal()

        }
    })


    window.addEventListener('scroll', showModalTab)
    const openModalTime = setTimeout(openModal, 10000)
}
module.exports = modal;