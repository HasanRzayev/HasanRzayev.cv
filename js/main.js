(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Scroll Reveal Animation
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Initialize scroll reveal when DOM is ready
    $(document).ready(function() {
        initScrollReveal();
    });

    // Add scroll reveal class to elements
    $('.wow').addClass('scroll-reveal');


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills Animation
    $('.skill-item').waypoint(function () {
        $(this).find('.progress-bar').each(function () {
            const width = $(this).closest('.skill-item').find('.skill-percentage').text();
            $(this).css("width", width);
        });
    }, {offset: '80%'});

    // Counter Animation
    function animateCounters() {
        $('.stat-number').each(function () {
            const $this = $(this);
            const countTo = $this.attr('data-count') || $this.text();
            
            $({ countNum: 0 }).animate({
                countNum: parseInt(countTo.replace(/\D/g, ''))
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    const suffix = countTo.replace(/\d/g, '');
                    $this.text(Math.floor(this.countNum) + suffix);
                },
                complete: function() {
                    $this.text(countTo);
                }
            });
        });
    }

    // Trigger counter animation when stats section is visible
    $('.stats-grid').waypoint(function() {
        animateCounters();
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.6s'
    });
    
    // Add stagger animation to portfolio items
    $('.portfolio-item').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // Parallax Effect for Hero Section
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.hero-background');
        const speed = 0.5;
        
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });

    // Smooth hover effects for project cards
    $('.project-card').hover(
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1)');
        }
    );

    // Form validation and submission
    $('.contact-form form').on('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<span class="loading-spinner"></span> Sending...');
        submitBtn.prop('disabled', true);
        
        // Simulate form submission
        setTimeout(function() {
            submitBtn.html('<i class="fas fa-check me-2"></i>Message Sent!');
            submitBtn.removeClass('btn-primary').addClass('btn-success');
            
            // Reset form after 3 seconds
            setTimeout(function() {
                $('.contact-form form')[0].reset();
                submitBtn.html(originalText);
                submitBtn.removeClass('btn-success').addClass('btn-primary');
                submitBtn.prop('disabled', false);
            }, 3000);
        }, 2000);
    });

    // Add data attributes for counter animation
    $('.stat-number').each(function() {
        const text = $(this).text();
        $(this).attr('data-count', text);
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate theme toggle
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
        
        if (newTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // Add more animations to elements
    function addStaggeredAnimations() {
        $('.project-card').each(function(index) {
            $(this).css('animation-delay', (index * 0.2) + 's');
            $(this).addClass('animate-fadeInUp');
        });

        $('.skill-item').each(function(index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
            $(this).addClass('animate-fadeInUp');
        });

        $('.stat-item').each(function(index) {
            $(this).css('animation-delay', (index * 0.15) + 's');
            $(this).addClass('animate-bounceIn');
        });
    }

    // Initialize staggered animations
    addStaggeredAnimations();

    // Add hover sound effects (optional)
    $('.project-card, .btn, .social-icon').hover(
        function() {
            $(this).addClass('animate-pulse');
        },
        function() {
            $(this).removeClass('animate-pulse');
        }
    );

    // Add typing effect to hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after page load
    setTimeout(() => {
        const typedElement = document.querySelector('.typed-text-output');
        if (typedElement) {
            const texts = ['.NET Backend Developer', 'ASP.NET Core Specialist', 'C# Developer', 'API Architect'];
            let currentIndex = 0;
            
            function cycleTexts() {
                typeWriter(typedElement, texts[currentIndex], 80);
                currentIndex = (currentIndex + 1) % texts.length;
                setTimeout(cycleTexts, 3000);
            }
            cycleTexts();
        }
    }, 1000);

    // Image slider removed - using single profile image

    // Add more interactive animations
    function addInteractiveAnimations() {
        // Add ripple effect to buttons
        $('.btn').on('click', function(e) {
            const button = $(this);
            const ripple = $('<span class="ripple"></span>');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.css({
                width: size,
                height: size,
                left: x,
                top: y
            });
            
            button.append(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add magnetic effect to floating elements
        $('.floating-element').on('mousemove', function(e) {
            const element = $(this);
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.css({
                transform: `translate(${x * 0.1}px, ${y * 0.1}px)`
            });
        });

        $('.floating-element').on('mouseleave', function() {
            $(this).css('transform', 'translate(0, 0)');
        });
    }

    // Initialize interactive animations
    addInteractiveAnimations();


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    
})(jQuery);

