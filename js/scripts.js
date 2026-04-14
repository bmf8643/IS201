/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const btnUp = document.getElementById('scroll-up');
    const btnDown = document.getElementById('scroll-down');
    const sections = Array.from(document.querySelectorAll('section.resume-section'));
    const pageTop = document.getElementById('page-top');

    const getCurrentSectionIndex = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportCenter = scrollTop + window.innerHeight / 2;
        const currentIndex = sections.findIndex(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            return viewportCenter >= sectionTop && viewportCenter < sectionBottom;
        });
        return currentIndex >= 0 ? currentIndex : 0;
    };

    const isInLastSection = () => {
        if (sections.length === 0) {
            return false;
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const lastSection = sections[sections.length - 1];
        return scrollTop + window.innerHeight / 2 >= lastSection.offsetTop || window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 2;
    };

    const scrollToTarget = target => {
        if (!target) {
            return;
        }
        if (target === pageTop) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        target.scrollIntoView({ behavior: 'smooth' });
    };

    const getPreviousScrollTarget = () => {
        const currentIndex = getCurrentSectionIndex();
        return currentIndex <= 0 ? pageTop : sections[currentIndex - 1] || pageTop;
    };

    const getNextScrollTarget = () => {
        const currentIndex = getCurrentSectionIndex();
        return currentIndex >= sections.length - 1 || isInLastSection() ? pageTop : sections[currentIndex + 1] || pageTop;
    };

    if (btnUp) {
        btnUp.addEventListener('click', event => {
            event.preventDefault();
            scrollToTarget(getPreviousScrollTarget());
        });
    }
    if (btnDown) {
        btnDown.addEventListener('click', event => {
            event.preventDefault();
            scrollToTarget(getNextScrollTarget());
        });
    }

});
