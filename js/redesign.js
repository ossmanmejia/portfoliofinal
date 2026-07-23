const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const header = document.querySelector('[data-header]');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
const emptyState = document.querySelector('.empty-state');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    let visible = 0;

    projects.forEach((project) => {
      const shouldShow = category === 'all' || project.dataset.category === category;
      project.hidden = !shouldShow;
      if (shouldShow) visible += 1;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
  });
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  header?.classList.toggle('is-sticky', currentScroll > 120);
  lastScroll = currentScroll;
}, { passive: true });
