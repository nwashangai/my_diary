loadData().then((response) => {
  data = response;
}).catch((err) => {
  alertTrigger('Server error');
});
