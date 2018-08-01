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

// Define validator
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

/* Run validator for SignUp */
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

/* Run validator for Login */
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

let getDairy = (identifier) => {
    var item = search(identifier, data)
    document.getElementById('welcome-wrapper').style.display = 'none'
    document.getElementById('dairy-time').innerHTML = item.date
    document.getElementById('dairy-subject').innerHTML = item.subject
    document.getElementById('dairy-main').innerHTML = item.dairy
    document.getElementById('view-entry').style.display = 'block'
    if (window.matchMedia('(max-width: 1000px)').matches) {
        document.getElementById('main').focus()
    }
}

homeBtn.onclick = () => {
    document.getElementById('view-entry').style.display = 'none'
    document.getElementById('welcome-wrapper').style.display = 'block'
}

// Get the modal
var modal = document.getElementById('dairy-modal')
var prfModal = document.getElementById('profile-modal')
var stngModal = document.getElementById('settings-modal')

//get the entry
var addBtn = document.getElementById('addEntry')

// Get the button that opens the modal
var btn = document.getElementById('add')
var btn2 = document.getElementById('create')
var prf = document.getElementById('prf')
var settings = document.getElementById('settings')

// Get the <span> element that closes the modal
var clsAdd = document.getElementsByClassName('close')[0]
var clsPrf = document.getElementsByClassName('close')[1]
var clsstng = document.getElementsByClassName('close')[2]

// When the user clicks the button, open the modal 
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

// When the user clicks on (x), close the modal
clsAdd.onclick = () => {
    modal.style.display = 'none'
}
clsPrf.onclick = () => {
    prfModal.style.display = 'none'
}
clsstng.onclick = () => {
    stngModal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
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
}

// search through an object
let search = (nameKey, obj) => {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].id == nameKey) {
            return obj[i]
        }
    }
}

var data = [
    { 'id': 'andela', 'subject': 'This is Andela', 'dairy': 'Andela is an American company that specializes in training software developers. The company was founded in 2014 and is based in New York City.', 'date': '2018 july 2 3:34 PM' },
    { 'id': 'africa', 'subject': 'This is Africa', 'dairy': 'Africa is the world\'s second largest and second most-populous continent. At about 30.3 million km² including adjacent islands, it covers 6% of Earth\'s total surface area and 20% of its land area.', 'date': '2018 may 5 4:04 AM' },
    { 'id': 'project', 'subject': 'Fast track project', 'dairy': 'Contemporary business and science treat as a project any undertaking, carried out individually or collaboratively and possibly involving research or design, that is carefully planned to achieve a particular aim.', 'date': '2018 feb 19 11:20 AM' },
    { 'id': 'work', 'subject': 'Done with work', 'dairy': 'Andela is an American company that specializes in training software developers. The company was founded in 2014 and is based in New York City.', 'date': '2018 Aug 26 1:01 PM' }
]