/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
const $ = jQuery;
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
const $wnd = $(window);
const $doc = $(document);

export {
    $, $wnd, $doc, isMobile,
};
