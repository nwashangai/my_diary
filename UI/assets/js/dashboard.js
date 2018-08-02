loadData().then((response) => {
  data = response;
  console.log(data);
}).catch((err) => {
  alertTrigger('Server error');
});

document.getElementById('ok').onclick = () => {
  location.reload();
}