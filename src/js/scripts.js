/*!
* Site scripts
*/

(function($){
  $(document).ready(function() {

    function smoothScroll() {
        $(".menu a[href^='#']").on("click", function(e) {
            var offset = 0;

            if(e.target.nodeName.toLowerCase() !== "a") {
                var id = "#" + e.target.parentNode.hash.slice(1);
            } else {
                var id = "#" + e.target.hash.slice(1);
            }

            e.preventDefault();
            var targetOffset = parseFloat($(id).offset().top - offset);

            $("html, body").animate({
                scrollTop: targetOffset
            }, 1000);

            if(window.innerWidth < 800) {
                $(".social-media").removeClass("open");
                $(".navigation").removeClass("open");
                $(".close-mobile-nav").removeClass("open");
            }

            window.location.href = id;
        });
    }
    smoothScroll();

  })
})(jQuery);

document.querySelector(".nav-btn").onclick = function(e) {
    document.querySelector(".social-media").classList.add("open");
    document.querySelector(".navigation").classList.add("open");
    document.querySelector(".close-mobile-nav").classList.add("open");
}

document.querySelector(".close-mobile-nav").onclick = function(e) {
    document.querySelector(".social-media").classList.remove("open");
    document.querySelector(".navigation").classList.remove("open");
    document.querySelector(".close-mobile-nav").classList.remove("open");
}

function opinionsSlider() {
    var slider = {
        nav: function() {
            for(var i = 0; i < this.navs.length; i++) {
                this.navs[i].onclick = function(e) {
                    this.stopInterval();
                    this.i = parseInt(e.target.parentNode.dataset.opinion - 1);
                    this.clearClasses();
                    this.showSlide();

                    this.interval();
                }.bind(this);
            }
        },

        clearClasses: function() {
            for(var i = 0; i < this.elems.length; i++) {
                this.elems[i].classList.remove("active");
            }

            for(var i = 0; i < this.navs.length; i++) {
                this.navs[i].classList.remove("active");
            }
        },

        showSlide: function() {
            this.elems[this.i].classList.add("active");
            this.navs[this.i].classList.add("active");

            setTimeout(function() {
                this.elems[this.i].style.opacity = 1;
            }.bind(this), 250);
        },

        hideSlide: function() {
            this.elems[this.i].classList.remove("active");
            this.elems[this.i].style.opacity = 0;
            this.navs[this.i].removeAttribute("class");
        },

        stopInterval: function() {
            clearInterval(this.timer);
        },

        interval: function() {
            this.timer = setInterval(function() {
                this.hideSlide();

                this.i++;

                if(this.i >= this.elems.length) {
                    this.i = 0;
                }

                this.showSlide();
            }.bind(this), this.flipSlide)
        },

        init: function() {
            this.i = 0;
            this.flipSlide = 3000;
            this.elems = document.querySelectorAll(".quote-box .element");
            this.navs = document.querySelectorAll(".authors-thumb li");

            this.nav();
            this.interval();
        }
    }

    slider.init();
}

opinionsSlider();
