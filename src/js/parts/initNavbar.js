import { $, $doc, $wnd } from './_utility';

/*------------------------------------------------------------------

  Navbar

-------------------------------------------------------------------*/
function initNavbar() {
    const self = this;

    self.navbarSmall = false;
    self.navbarMaxTop = 100;

    // navbar size
    self.navbarSize = function (curTop) {
        if (curTop > self.navbarMaxTop && !self.navbarSmall) {
            self.navbarSmall = true;
            $('.navbar-youplay').addClass('navbar-small');
        }

        if (curTop <= self.navbarMaxTop && self.navbarSmall) {
            self.navbarSmall = false;
            $('.navbar-youplay').removeClass('navbar-small');
        }
    };

    // navbar collapse
    self.navbarCollapse = function () {
        $doc.on('click', '.navbar-youplay [data-toggle=off-canvas]', function () {
            const $toggleTarget = $('.navbar-youplay').find($(this).attr('data-target'));
            const collapsed = $toggleTarget.hasClass('collapse');
            $toggleTarget[`${collapsed ? 'remove' : 'add'}Class`]('collapse');
            $('.navbar-youplay')[`${collapsed ? 'add' : 'remove'}Class`]('youplay-navbar-collapsed');
        });

        let resizeTimeout;
        $wnd.on('resize', () => {
            $('.navbar-youplay').addClass('no-transition');

            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                $('.navbar-youplay').removeClass('no-transition');
            }, 50);
        });

        // close navbar if clicked on content
        $doc.on('click', '.youplay-navbar-collapsed ~ .content-wrap', () => {
            $('.navbar-youplay').find('[data-toggle=off-canvas]').click();
        });

        // prevent follow link when there is dropdown
        if (!self.options.fadeBetweenPages || !$('.page-preloader').length) {
            $doc.on('click', '.navbar-youplay .dropdown-toggle', function () {
                if ($(this).next('.dropdown-menu').css('visibility') === 'visible' && !$(this).parent().hasClass('open')) {
                    window.location.href = this.href;
                }
            });
        }
    };

    // navbar submenu fix
    self.navbarSubmenuFix = function () {
        const $navbar = $('.navbar-youplay');

        // don't close submenu if click on child submenu toggle
        $navbar.on('click', '.dropdown-menu .dropdown-toggle', function (e) {
            $(this).parent('.dropdown').toggleClass('open');
            e.preventDefault();
            e.stopPropagation();
        });

        // don't close submenu with form if one of the inputs focused
        $navbar.on('focus', 'input, textarea, button', function () {
            if ($(this).closest('.dropdown-menu').css('visibility') === 'visible') {
                $(this).parents('.dropdown').addClass('open');
            }
        });
    };

    // navbar collapse
    self.navbarCollapse();

    // navbar set to small
    if (!self.options.navbarSmall) {
        $wnd.on('scroll', () => {
            self.navbarSize($wnd.scrollTop());
        });
        self.navbarSize($wnd.scrollTop());
    }

    // navbar submenu fix
    // don't close submenu if click on child submenu toggle
    self.navbarSubmenuFix();
}

export { initNavbar };
