/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): local-toc.js
 * --------------------------------------------------------------------------
 */

/* Fix for the first item when using the Bootstrap scrollspy in our documentation */
if ( $('#local-toc').length > 0 ) {
  /* Fix the href of the first item */
  const firstLocalTocItem = $('#local-toc > .navbar-nav > .nav-item:first-of-type > .nav-link');
  const firstSection = $('main:first-of-type > .section:first-of-type');
  firstLocalTocItem.attr('href', firstLocalTocItem.attr('href') + firstSection.attr('id'));
}

/* Expand accordion functionality for the local-toc */
$('#local-toc .nav-link').on('click', function(e) {
  const anchor = $(e.target).attr('href');
  const accordion = $('[href="'+anchor+'"].headerlink').parent();
  if ( accordion.hasClass('collapsed') ) {
    accordion.click();
  }
});
