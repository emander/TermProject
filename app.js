let signinbtn = document.querySelector('#signinbtn');
let signinModal = document.querySelector('#signinModal');
let signinModalBg = document.querySelector('#signinModalBg');

signinbtn.addEventListener('click', () => {
  console.log("test");
  signinModal.classList.add('is-active');
});

signinModalBg.addEventListener('click', () => {
  signinModal.classList.remove('is-active');
});