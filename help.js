(() => {
 const input = document.getElementById('help-query');
 const answers = [...document.querySelectorAll('#help-results details')];
 const filters = [...document.querySelectorAll('[data-filter]')];
 let category = 'all';
 function update() {
  const words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let count = 0;
  answers.forEach(answer => {
   const matches = (category === 'all' || answer.dataset.category === category) && words.every(word => answer.textContent.toLowerCase().includes(word));
   answer.hidden = !matches;
   if (matches) count++;
  });
  filters.forEach(button => {
   const active = button.dataset.filter === category;
   button.classList.toggle('is-active', active);
   button.setAttribute('aria-pressed', String(active));
  });
  document.getElementById('help-result-count').textContent = count + (count === 1 ? ' answer' : ' answers') + (words.length ? ' matching your search' : '');
  document.getElementById('help-empty').hidden = count > 0;
 }
 filters.forEach(button => button.addEventListener('click', () => {category = button.dataset.filter; update();}));
 document.querySelectorAll('[data-topic]').forEach(link => link.addEventListener('click', () => {category = link.dataset.topic; input.value = ''; update();}));
 document.querySelectorAll('[data-search]').forEach(link => link.addEventListener('click', () => {category = 'all'; input.value = link.dataset.search; update();}));
 input.addEventListener('input', update);
 document.getElementById('help-search').addEventListener('submit', event => {event.preventDefault();update();document.getElementById('answers-heading').tabIndex = -1;document.getElementById('answers-heading').focus();});
 document.getElementById('help-reset').addEventListener('click', () => {category = 'all';input.value = '';update();input.focus();});
 update();
})();
