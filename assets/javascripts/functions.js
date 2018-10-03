// slider trick for card navigation menu
var Slider = function() { this.initialize.apply(this, arguments) };
Slider.prototype = {

    initialize: function(slider) {
        this.ul = slider.children[0];
        this.li = this.ul.children;

        // make <ul> as large as all <li>’s
        this.ul.style.width = (this.li[0].clientWidth * this.li.length) + 'px';

        this.currentIndex = 0
    },

    goTo: function(index) {
        // filter invalid indices
        if (index < 0 || index > this.li.length - 1)
            return;

        // move <ul> left
        this.ul.style.left = '-' + (100 * index) + '%';

        this.currentIndex = index
    },

    goToPrev: function() {
        this.goTo(this.currentIndex - 1)
    },

    goToNext: function() {
        this.goTo(this.currentIndex + 1)
    }
};


var sliders = [];
$(function () {
    // init navigation slider
    $('.card-navigator-active').each(function() {
        sliders.push(new Slider(this));
    });

    // handle click on navigator menu items
    $('.card-navigator li > a').click(function (e) {
        e.preventDefault();
        var target = $(this).parent().index();
        $('.card-navigator li > a.active').removeClass('active');
        $('.card-navigator li:nth-child('+(target+1)+') a').addClass('active');
        $('.card-navigator li > a.prev').removeClass('prev');
        $('.card-navigator li > a.prevPlus').removeClass('prevPlus');
        $('.card-navigator li > a.next').removeClass('next');
        $('.card-navigator li > a.nextPlus').removeClass('nextPlus');

        $('.card-navigator li:nth-child('+(target)+') > a').addClass('prev');
        $('.card-navigator li:nth-child('+(target-1)+') > a').addClass('prevPlus');
        $('.card-navigator li:nth-child('+(target+2)+') > a').addClass('next');
        $('.card-navigator li:nth-child('+(target+3)+') > a').addClass('nextPlus');

        $('.card-text-title span').text($(this).text());

        sliders[0].goTo(target);
    });

    // handle click on search button
    $('.card-header-search-btn').click(function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('active non-active');
        $('.card-header-search-input').val('');
        $('.card-header-title').toggleClass('visible');
    });

    // handle follow/un-follow button
    $('.card-detail-social-action-follow').click(function (e) {
        e.preventDefault();
        if($(this).is('.is-follow')) {
            $(this).text('Follow');
        }
        else {
            $(this).text('Following');
        }
        $(this).toggleClass('is-follow');
    });
});