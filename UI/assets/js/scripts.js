
let data = [];
var homeBtn = document.getElementById('home');
var alertBx = document.getElementById('alert-box');

var openContent = (evt, tabName) => {
  var i, tabcontent, tablinks
  tabcontent = document.getElementsByClassName('tabcontent')
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
    }
    tablinks = document.getElementsByClassName('tabIndex')
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
    }
    document.getElementById(tabName).style.display = 'block'
    evt.currentTarget.className += ' active'
}

let loginAlert = (data, color ='#f58e89') => {
    if (color === '#f58e89') {
        document.getElementById('loginAlert').innerHTML = '<span class=\'closebtn\' onclick=\"this.parentElement.style.display = \'none\';\">&times;</span> <strong>Danger!</strong> ' + data;
    } else {

        document.getElementById('loginAlert').innerHTML = '<span class=\'closebtn\' onclick=\'this.parentElement.style.display = \'none\';\'>&times;</span> <strong>Success!</strong> ' + data;
    }
    document.getElementById('loginAlert').style.backgroundColor = color;
    document.getElementById('loginAlert').style.display = 'block';
}

let toggleMenu = () => {
    var toggle = document.getElementById('sidebar-left');
    if (toggle.style.display === 'none') {
        toggle.style.display = 'block';
        window.scrollTo(0, 0)
    } else {
        toggle.style.display = 'none';
    }
}

let validate = (str, regex) => {
    if (regex === 'name') {
        var re = /^[a-zA-Z]{3,25}$/
        if (!re.test(str.toLowerCase())) {
            loginAlert('Invalid name')
            return false
        }
    }
    if (regex === 'email') {
        var re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(str.toLowerCase())) {
            loginAlert('Invalid email address')
            return false
        }
    }
    if (regex === 'password') {
        var re = /^[a-zA-Z0-9$~.#,?:@*&]{5,16}$/
        if (!re.test(str.toLowerCase())) {
            loginAlert('Invalid password combination or password less than 5')
            return false
        }
    }
    return true
}

let RunSignupValidate = () => {
    var name = document.getElementById('sname').value;
    var email = document.getElementById('semail').value;
    var pass = document.getElementById('spassword').value;
    if (validate(name, 'name')) {
        if (validate(email, 'email')) {
            if (validate(pass, 'password')) {
                var data = { full_name: name, email: email, password: pass };
                document.getElementById('loginAlert').style.display = 'none';
                request('post', 'api/v1/auth/signup/', data).then((response) => {
                    if (response.status === 'error') {
                        loginAlert(response.message);
                    } else {
                        loginAlert(response.message, '#6378c0');
                    }
                });
                return true
            }
        }
    }
    return false
}

let RunLoginValidate = () => {
    var email = document.getElementById('lemail').value;
    var pass = document.getElementById('lpassword').value;
  if (validate(email, 'email')) {
    if (validate(pass, 'password')) {
      var data = { email: email, password: pass };
      document.getElementById('loginAlert').style.display = 'none';
      request('post', 'api/v1/auth/login/', data).then((response) => {
        if (response.status === 'error') {
          loginAlert(response.message);
        } else {
          window.localStorage.setItem('token-key', response.token);
          window.location.href = 'main.html';
        }
      });
      return true
    }
}
return false
}

let getDairy = () => {
  let tdata = '';
  data.forEach((item) => {
      tdata += `<tr><td id="diary-sub">${item.subject}</span></td><td><span id="bt-action"><input class="submit-btn btn-good" onclick="display('${item.id}')" id="addEntry" type="button" value="View"><input id="del-bt" class="submit-btn btn-danger" type="button" value="DELETE" onclick=""></span></td></tr>`
  }, this);
  document.getElementById('table-id').innerHTML = '<tbody id="tbody-id"><tr><th class="t-75" > Subject</th ><th class="t-25">Action</th></tr ></tbody>';
  document.getElementById('tbody-id').innerHTML += tdata;
  document.getElementById('welcome-wrapper').style.display = 'none';
  document.getElementById('my-table').style.display = 'block';
}

homeBtn.onclick = () => {
  document.getElementById('view-entry').style.display = 'none';
  document.getElementById('welcome-wrapper').style.display = 'block';
}

const modal = document.getElementById('dairy-modal');
const prfModal = document.getElementById('profile-modal');
const stngModal = document.getElementById('settings-modal');
const entModal = document.getElementById('entry-modal');

const addBtn = document.getElementById('addEntry');

var btn = document.getElementById('add')
var btn2 = document.getElementById('create')
var prf = document.getElementById('prf')
var settings = document.getElementById('settings')

var clsAdd = document.getElementsByClassName('close')[0]
var clsPrf = document.getElementsByClassName('close')[1]
var clsstng = document.getElementsByClassName('close')[2]
var clsent = document.getElementsByClassName('close')[3]

btn.onclick = () => {
    modal.style.display = 'block'
}
btn2.onclick = () => {
    modal.style.display = 'block'
}
prf.onclick = () => {
    prfModal.style.display = 'block'
}
settings.onclick = () => {
    stngModal.style.display = 'block'
}
addBtn.onclick = () => {
    document.getElementById('alert-data').innerHTML = 'Item added'
    modal.style.display = 'none'
    alertBx.style.display = 'block'
}

let display = (identifier) => {
    var item = search(identifier, data)
    document.getElementById('dairy-time').innerHTML = item.date;
    document.getElementById('dairy-subject').innerHTML = item.subject;
    document.getElementById('dairy-main').innerHTML = item.diary;
    entModal.style.display = 'block'
}

clsAdd.onclick = () => {
    modal.style.display = 'none'
}
clsPrf.onclick = () => {
    prfModal.style.display = 'none'
}
clsstng.onclick = () => {
    stngModal.style.display = 'none'
}
clsent.onclick = () => {
    entModal.style.display = 'none'
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
    if (event.target == prfModal) {
        prfModal.style.display = 'none'
    }
    if (event.target == stngModal) {
        stngModal.style.display = 'none'
    }
    if (event.target == entModal) {
        entModal.style.display = 'none'
    }
}

let search = (nameKey, obj) => {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].id == nameKey) {
            return obj[i]
        }
    }
}
