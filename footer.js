// The single footer component used by every page on the website.
(() => {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = "<div class=\"container osr-footer-grid\">\n<div class=\"osr-footer-brand\"><a class=\"osr-footer-logo\" href=\"index.html\" aria-label=\"OSR Digital Solutions home\">osr<span>.</span><small>DIGITAL<br>SOLUTIONS</small></a><p>Thoughtful technology, focused expertise and connected digital possibilities.</p></div>\n<nav aria-label=\"Footer services\"><h2>Services</h2><a href=\"domains.html\">Domains</a><a href=\"websites.html\">Websites &amp; development</a><a href=\"commerce.html\">Digital commerce</a><a href=\"seo.html\">Marketing &amp; SEO</a><a href=\"seo.html#backlinks\">Backlinks &amp; link building</a></nav>\n<nav aria-label=\"Footer company\"><h2>Company</h2><a href=\"about.html\">About OSR</a><a href=\"index.html#ecosystem\">Our brands</a><a href=\"contact.html\">Contact us</a></nav>\n<nav aria-label=\"Footer support\"><h2>Let's connect</h2><a href=\"contact.html\">Start a project</a><a href=\"contact.html\">Help &amp; inquiries</a><a href=\"auth.html?site=all\">Sign in</a><p>Made for the digital future.</p></nav>\n</div><div class=\"container osr-footer-bottom\"><small>? <span id=\"year\">2026</span> OSR Digital Solutions. Concept website prototype.</small><a href=\"index.html\">OSR Digital Solutions home ?</a></div>";
  const year = footer.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
