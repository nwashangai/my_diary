loadData().then((response) => {
  data = response;
}).catch((err) => {
  alertTrigger('Server error');
});
loadUser().then((response) => {
  user = response;
}).catch((err) => {
  alertTrigger(err);
});


document.getElementById('ok').onclick = () => {
  location.reload();
}