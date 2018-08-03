loadData().then((response) => {
  data = response;
}).catch((err) => {
  alertTrigger('Server error');
});

document.getElementById('ok').onclick = () => {
  location.reload();
}