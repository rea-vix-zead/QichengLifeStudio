const inquiryForm = document.getElementById('inquiry-form');
const contactMethod = inquiryForm.elements.namedItem('偏好聯絡方式');
const contactFields = inquiryForm.querySelectorAll('[data-contact]');
const serviceChoices = Array.from(inquiryForm.querySelectorAll('[name="希望服務"]'));

function updateContactFields() {
    contactFields.forEach(label => {
        const active = label.dataset.contact === contactMethod.value;
        label.hidden = !active;
        label.querySelector('input').disabled = !active;
    });
}

function validateServices() {
    const selected = serviceChoices.some(choice => choice.checked);
    serviceChoices[0].setCustomValidity(selected ? '' : '請至少選擇一項服務，也可以選「其他／尚不確定」。');
}

contactMethod.addEventListener('change', updateContactFields);
serviceChoices.forEach(choice => choice.addEventListener('change', validateServices));
updateContactFields();
validateServices();

inquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;

    const fields = new FormData(inquiryForm);
    const body = Array.from(fields.entries())
        .filter(([, value]) => value.trim())
        .map(([label, value]) => `${label}：${value}`)
        .join('\n\n');
    const services = fields.getAll('希望服務').join('、');
    const subject = `QichengLifeStudio 服務詢問｜${services}`;
    window.location.href = 'mailto:qicheng_life_studio@goldfishgateway.com?subject='
        + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
