// Navigation & pages logic
const menuBtn = document.getElementById('menu-btn');
const navPanel = document.getElementById('main-nav');
const navOverlay = document.getElementById('nav-overlay');
const closeNav = document.getElementById('close-nav');
const links = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const content = document.getElementById('content');

// Toggle nav panel (right sliding)
function openNav(){
  navPanel.classList.add('show');
  navOverlay.classList.add('show');
  menuBtn.classList.add('open');
  menuBtn.setAttribute('aria-expanded','true');
  navPanel.setAttribute('aria-hidden','false');
  navOverlay.setAttribute('aria-hidden','false');
}
function closeNavPanel(){
  navPanel.classList.remove('show');
  navOverlay.classList.remove('show');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
  navPanel.setAttribute('aria-hidden','true');
  navOverlay.setAttribute('aria-hidden','true');
}
menuBtn.addEventListener('click', ()=> {
  if(navPanel.classList.contains('show')) closeNavPanel(); else openNav();
});
closeNav.addEventListener('click', closeNavPanel);
navOverlay.addEventListener('click', closeNavPanel);

// Show page by id (full-screen)
function showPage(id){
  // close nav if open
  closeNavPanel();
  // simple transition: fade blur background
  content.classList.add('transitioning');
  setTimeout(()=> {
    pages.forEach(p=> {
      if(p.id === id){
        p.classList.add('active');
        // scroll to top of this page (just in case)
        p.scrollTop = 0;
      } else {
        p.classList.remove('active');
      }
    });
    content.classList.remove('transitioning');
  }, 200);
}

// Attach nav link listeners
links.forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const target = e.currentTarget.dataset.page;
    showPage(target);
  });
});

// Back buttons and hero CTA
document.querySelectorAll('[data-page]').forEach(btn=>{
  // skip nav buttons (already bound)
  if(btn.classList.contains('nav-link')) return;
  btn.addEventListener('click', e=>{
    const target = e.currentTarget.dataset.page;
    if(target) showPage(target);
  });
});

// Fake submit for reviews (localStorage)
function submitForm(e){
  e.preventDefault();
  const f = document.getElementById('review-form');
  if(!f) return;
  const data = new FormData(f);
  const obj = {};
  data.forEach((v,k)=> obj[k]=v);
  let arr = JSON.parse(localStorage.getItem('dj_eliaz_reviews')||'[]');
  arr.push(obj);
  localStorage.setItem('dj_eliaz_reviews', JSON.stringify(arr));
  const msg = document.getElementById('form-msg');
  if(msg){ msg.hidden = false; setTimeout(()=> msg.hidden = true, 3000); }
  f.reset();
}
