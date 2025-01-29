$(function() {

  var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

});

document.addEventListener('DOMContentLoaded', () => {
	// Add animation classes to elements
	const sections = document.querySelectorAll('.py-5');
	
	sections.forEach(section => {
		const rows = section.querySelectorAll('.row');
		rows.forEach(row => {
			const leftElement = row.querySelector('.order-2, .col-md-6:not(.order-2)');
			const rightElement = row.querySelector('.order-1, .col-sm-12:not(.order-1)');
			
			if (leftElement) leftElement.classList.add('slide-in-left');
			if (rightElement) rightElement.classList.add('slide-in-right');
		});
	});
	
	// Smooth scroll implementation
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	  anchor.addEventListener('click', function(e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
		  const headerOffset = 100;
		  const elementPosition = target.getBoundingClientRect().top;
		  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
		  window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		  });
		}
	  });
	});
  
	// Intersection Observer for scroll animations
	const options = {
	  threshold: 0.2,
	  rootMargin: "0px 0px -100px 0px"
	};
  
	const observer = new IntersectionObserver((entries) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in, .fade-in')
			.forEach(element => {
			  element.classList.add('active');
			});
		}
	  });
	}, options);
  
	// Observe sections
	sections.forEach(section => {
	  observer.observe(section);
	});
  
	// Add parallax effect to carousel
	const carousel = document.querySelector('.carousel');
	let lastScrollTop = 0;
  
	window.addEventListener('scroll', () => {
	  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	  if (scrollTop < carousel.offsetHeight) {
		const speed = 0.5;
		const yPos = -(scrollTop * speed);
		carousel.style.transform = `translateY(${yPos}px)`;
	  }
	  lastScrollTop = scrollTop;
	});
  });
  
  // Add smooth scrolling for mobile menu
  document.querySelector('.js-menu-toggle').addEventListener('click', function() {
	const mobileMenu = document.querySelector('.site-mobile-menu');
	mobileMenu.classList.toggle('active');
	this.classList.toggle('active');
  });