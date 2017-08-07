var MyForm = new Object();
/**
 * @return  isValid: Boolean, errorFields: String[]
 */
MyForm.validate = function () {
    var errorFields = [];
    MyForm.validate.prototype.isValid = true;

    if (!MyForm.getData.prototype.fio || MyForm.getData.prototype.fio.match(/\S+?\s|\S+?$/g).length != 3) {
        MyForm.validate.prototype.isValid = false;
        errorFields.push("fio");
    }

    var reg = /^[a-z0-9-_\.]+@ya\.ru|yandex\.ru|yandex\.ua|yandex\.by|yandex\.kz|yandex\.com$/i;
    if (!MyForm.getData.prototype.email.match(reg)) {
        MyForm.validate.prototype.isValid = false;
        errorFields.push("email");
    }

    var reg = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;
    if (!MyForm.getData.prototype.phone.match(reg)) {
        MyForm.validate.prototype.isValid = false;
        errorFields.push("phone");
    } else {
        var phonetotal = 0;
        for (i = 1; i < MyForm.getData.prototype.phone.length; i++) {
            if (i != 2 && i != 6 && i != 10 && i != 13) {
                phonetotal += Number(MyForm.getData.prototype.phone[i]);
            }
        }
        if (phonetotal > 30) {
            MyForm.validate.prototype.isValid = false;
            errorFields.push("phone");
        }
    }
    MyForm.validate.prototype.errorFields = errorFields;
}


/**
 * @return Object
 */
MyForm.getData = function () {
    MyForm.getData.prototype.fio = document.getElementById('myForm').fio.value;
    MyForm.getData.prototype.email = document.getElementById('myForm').email.value;
    MyForm.getData.prototype.phone = document.getElementById('myForm').phone.value;
}
/**
 * @return undefined
 */
MyForm.setData = function (n) {
    document.getElementsByName('fio')[0].value = MyForm.getData.prototype.fio;
    document.getElementsByName('email')[0].value = MyForm.getData.prototype.email;
    document.getElementsByName('phone')[0].value = MyForm.getData.prototype.phone;
}
/**
 * @param n
 * @return undefined
 */
MyForm.submit = function (n) {

    if (!!n) {

        MyForm.getData();
        MyForm.validate();

        document.getElementsByName('fio')[0].classList.remove('error');
        document.getElementsByName('email')[0].classList.remove('error');
        document.getElementsByName('phone')[0].classList.remove('error');

        if (!MyForm.validate.prototype.isValid) {
            for (i = 0; i < MyForm.validate.prototype.errorFields.length; i++) {
                document.getElementsByName(MyForm.validate.prototype.errorFields[i])[0].setAttribute('class', 'error');
            }
            return null;
        }

        document.getElementById('submitButton').disabled = true;

    }

    var getJson = ['error.json', 'progress.json', 'success.json'];

    var xhr = new XMLHttpRequest();
    xhr.open("POST", './' + getJson[Math.floor(Math.random() * getJson.length)], false);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();

    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
        return null;
    }

    var responJson = JSON.parse(xhr.responseText);

    if (responJson.status == "success") {
        document.getElementById('resultContainer').setAttribute('class', 'success');
        document.getElementById('resultContainer').innerHTML = 'Success';
        MyForm.setData();
        document.getElementById('submitButton').disabled = false;
        return null;
    }

    if (responJson.status == "progress") {
        document.getElementById('resultContainer').setAttribute('class', 'progress');
        document.getElementById('resultContainer').innerHTML = '';
        setTimeout(MyForm.submit, responJson.timeout);
        return null;
    }

    if (responJson.status == "error") {
        document.getElementById('resultContainer').setAttribute('class', 'error');
        document.getElementById('resultContainer').innerHTML = responJson.reason;
        MyForm.setData();
        document.getElementById('submitButton').disabled = false;
    }
}
