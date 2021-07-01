const toggle1 = {
  control: document.getElementById('change1'),
  input: document.getElementById('input1'),
  theme: 'theme1',
};
const toggle2 = {
  control: document.getElementById('change2'),
  input: document.getElementById('input2'),
  theme: 'theme2',
};
const toggle3 = {
  control: document.getElementById('change3'),
  input: document.getElementById('input3'),
  theme: 'theme3',
};

const changeTheme = (theme) => {
  document.body.className = theme;
};

for (let toggle of [toggle1, toggle2, toggle3]) {
  toggle.control.addEventListener('click', () => {
    if (!toggle.input.checked) {
      toggle.input.checked = true;
      changeTheme(toggle.theme);
    }
  });
}
