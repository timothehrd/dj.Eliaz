// script.js - navigation and simple behavior
document.addEventListener('DOMContentLoaded', ()=>{
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const links = document.querySelectorAll('a[href^="#"]');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  // Mobile menu toggle
  hamburger.addEventListener('click', ()=>{
    const open = mobileNav.getAttribute('aria-hidden') === 'false';
    if(open){
      mobileNav.setAttribute('aria-hidden','true');
      mobileNav.style.display = 'none';
    } else {
      mobileNav.setAttribute('aria-hidden','false');
      mobileNav.style.display = 'block';
    }
  });

  // Smooth scroll for anchor links (also close mobile menu)
  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
        // hide mobile nav if opened
        if(mobileNav.getAttribute('aria-hidden') === 'false'){
          mobileNav.setAttribute('aria-hidden','true');
          mobileNav.style.display = 'none';
        }
      }
    });
  });

  // Fake contact submit (localStorage)
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const obj = {};
      data.forEach((v,k)=> obj[k]=v);
      let arr = JSON.parse(localStorage.getItem('site_contacts')||'[]');
      arr.push(obj);
      localStorage.setItem('site_contacts', JSON.stringify(arr));
      if(status){
        status.hidden = false;
        setTimeout(()=> status.hidden = true, 3000);
      }
      form.reset();
    });
  }
});