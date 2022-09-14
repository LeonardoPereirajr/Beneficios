
function validation(invalidForm) {
    document.querySelectorAll(`.obrigatorio`).forEach((field) => {
        if (field.children.length) {
            if (!field.querySelector('.p-inputtext').innerHTML && !field.querySelector('.p-inputtext').value) {
                field.classList.add('p-invalid');
                invalidForm = true;
            } else {
                field.classList.remove('p-invalid');
            }
        } else {
            if (!field.value) {
                field.classList.add('p-invalid');
                invalidForm = true;
            } else {
                field.classList.remove('p-invalid');
            }
        }
    })
}