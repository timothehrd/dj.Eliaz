const btn = document.getElementById('menu-btn');
const nav = document.getElementById('main-nav');
const pages = document.querySelectorAll('.page');
const main = document.getElementById('content');

btn.addEventListener('click', () => {
  nav.classList.toggle('nav-closed');
});

nav.querySelectorAll('a[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = e.target.dataset.page;
    showPage(targetId);
    nav.classList.add('nav-closed');
  });
});

document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => showPage('home'));
});

function showPage(id) {
  main.classList.add('transitioning');
  setTimeout(() => {
    pages.forEach(p => {
      p.classList.remove('active');
      if (p.id === id) p.classList.add('active');
    });
    main.classList.remove('transitioning');
  }, 200);
}

function submitForm(e){
  e.preventDefault();
  const f = document.getElementById('review-form');
  const data = new FormData(f);
  const obj = {};
  data.forEach((v,k)=> obj[k]=v);
  let arr = JSON.parse(localStorage.getItem('dj_eliaz_reviews')||'[]');
  arr.push(obj);
  localStorage.setItem('dj_eliaz_reviews', JSON.stringify(arr));
  document.getElementById('form-msg').hidden = false;
  f.reset();
  setTimeout(()=> document.getElementById('form-msg').hidden=true,3000);
}
