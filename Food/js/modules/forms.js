function forms () {
    const forms = document.querySelectorAll('form');
    const messageChange = {
        loading: 'img/spinner.svg',
        error: 'Что-то пошло не так',
        success: 'Ваш запрос отправлен. Мы вам перезвоним'
    };
    forms.forEach(item => {
        bindPostData(item)
    })
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = document.createElement('img');
            message.src = messageChange.loading;
            message.style.cssText = `
    display: block;
    margin: 0 auto
`
            form.append(message)

            const obj = {}

            const formDate = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formDate.entries(obj)))
            postData('http://localhost:3000/requests', json)
                .then(response => {
                    console.log(response);
                    showThanksModal(messageChange.success);
                    message.remove();
                }).catch(() => {
                    showThanksModal(messageChange.error)
                }).finally(() => {
                    form.reset();
                });
        })
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
<div class = 'modal__content'>
<div data-close class='modal__close'>&times;</div>
<p class ='modal__title'>${message}</p>
</div>
`;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.remove('hide');
            prevModal.classList.add('show');
            closeModal()
        }, 4000)
    }

    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(() => console.log(Error.name))
}
module.exports = forms;