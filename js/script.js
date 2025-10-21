$(document).ready(function() {
    // переменные для карусели
    var currentSlide = 0;
    var totalSlides = $('.skill-item').length;
    var carouselInterval;

    // выпадающее меню для мобильных
    $('#nav-toggle').click(function() {
        $(this).toggleClass('active');
        $('#nav-menu .nav-list').toggleClass('active');
    });

    // закрытие меню при клике на ссылку
    $('.nav-link').click(function() {
        $('#nav-toggle').removeClass('active');
        $('#nav-menu .nav-list').removeClass('active');
    });

    // плавная прокрутка к секциям
    $('.nav-link, .cta-button').click(function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // подсветка активного пункта меню при скролле
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            
            if (refElement.length && 
                refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // кнопка "вверх"
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scroll-top').addClass('visible');
        } else {
            $('#scroll-top').removeClass('visible');
        }
    });

    $('#scroll-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // модальное окно
    $('#contact-btn, #open-form-btn').click(function() {
        $('#contact-modal').fadeIn(300);
        $('body').css('overflow', 'hidden');
    });

    $('#close-modal, #contact-modal').click(function(e) {
        if (e.target === this) {
            $('#contact-modal').fadeOut(300);
            $('body').css('overflow', 'auto');
        }
    });

    // закрытие модального окна по escape
    $(document).keydown(function(e) {
        if (e.key === 'Escape') {
            $('#contact-modal').fadeOut(300);
            $('body').css('overflow', 'auto');
        }
    });

    // валидация формы
    function validateForm() {
        var isValid = true;
        
        // очистка предыдущих ошибок
        $('.error-message').text('');
        $('.form-group input, .form-group textarea').removeClass('error');

        // валидация имени
        var name = $('#name').val().trim();
        if (!name) {
            $('#name-error').text('имя обязательно для заполнения');
            $('#name').addClass('error');
            isValid = false;
        }

        // валидация email
        var email = $('#email').val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            $('#email-error').text('email обязателен для заполнения');
            $('#email').addClass('error');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $('#email-error').text('введите корректный email');
            $('#email').addClass('error');
            isValid = false;
        }

        // валидация сообщения
        var message = $('#message').val().trim();
        if (!message) {
            $('#message-error').text('сообщение обязательно для заполнения');
            $('#message').addClass('error');
            isValid = false;
        }

        return isValid;
    }

    // обработка отправки формы
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // симуляция отправки формы через ajax
            var formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                subject: $('#subject').val(),
                message: $('#message').val()
            };

            // показываем индикатор загрузки
            var submitBtn = $('.submit-btn');
            var originalText = submitBtn.text();
            submitBtn.text('отправляется...').prop('disabled', true);

            // симуляция ajax запроса
            $.ajax({
                url: '/api/contact', // заглушка url
                method: 'POST',
                data: formData,
                timeout: 5000
            })
            .done(function(response) {
                // успешная отправка
                alert('сообщение успешно отправлено!');
                $('#contact-form')[0].reset();
                $('#contact-modal').fadeOut(300);
                $('body').css('overflow', 'auto');
            })
            .fail(function(xhr, status, error) {
                // обработка ошибки
                if (status === 'timeout') {
                    alert('время ожидания истекло. попробуйте еще раз.');
                } else {
                    alert('произошла ошибка при отправке сообщения. попробуйте еще раз.');
                }
            })
            .always(function() {
                // восстанавливаем кнопку
                submitBtn.text(originalText).prop('disabled', false);
            });
        }
    });

    // карусель навыков
    function showSlide(index) {
        $('.skill-item').removeClass('active');
        $('.skill-item').eq(index).addClass('active');
        $('.dot').removeClass('active');
        $('.dot').eq(index).addClass('active');
        
        // сдвигаем карусель
        var translateX = -index * 100;
        $('.carousel-wrapper').css('transform', 'translateX(' + translateX + '%)');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // кнопки навигации карусели
    $('#next-btn').click(function() {
        nextSlide();
        resetCarouselInterval();
    });

    $('#prev-btn').click(function() {
        prevSlide();
        resetCarouselInterval();
    });

    // точки навигации
    $('.dot').click(function() {
        currentSlide = $(this).data('slide');
        showSlide(currentSlide);
        resetCarouselInterval();
    });

    // автоматическая прокрутка карусели
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 4000);
    }

    function resetCarouselInterval() {
        clearInterval(carouselInterval);
        startCarousel();
    }

    // остановка автопрокрутки при наведении
    $('.skills-carousel').mouseenter(function() {
        clearInterval(carouselInterval);
    }).mouseleave(function() {
        startCarousel();
    });

    // запуск карусели
    startCarousel();

    // загрузка портфолио из json
    function loadPortfolio() {
        $.getJSON('data/portfolio.json')
            .done(function(data) {
                renderPortfolio(data.projects);
                animatePortfolioItems();
            })
            .fail(function() {
                console.error('ошибка загрузки портфолио');
                // fallback контент
                $('#portfolio-grid').html('<p>портфолио временно недоступно</p>');
            });
    }

    function renderPortfolio(projects) {
        var portfolioGrid = $('#portfolio-grid');
        portfolioGrid.empty();

        projects.forEach(function(project, index) {
            var portfolioItem = $('<div class="portfolio-item" data-category="' + project.category + '">' +
                '<div class="portfolio-image">' +
                    '<i class="' + project.image + '"></i>' +
                '</div>' +
                '<div class="portfolio-content">' +
                    '<h3>' + project.title + '</h3>' +
                    '<p>' + project.description + '</p>' +
                    '<div class="portfolio-tags">' +
                        project.tags.map(function(tag) {
                            return '<span class="tag">' + tag + '</span>';
                        }).join('') +
                    '</div>' +
                '</div>' +
            '</div>');
            
            portfolioGrid.append(portfolioItem);
        });
    }

    function animatePortfolioItems() {
        $('.portfolio-item').each(function(index) {
            var item = $(this);
            // делаем элементы видимыми сразу
            item.addClass('visible');
        });
    }

    // фильтрация портфолио
    $('.filter-btn').click(function() {
        var filter = $(this).data('filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.portfolio-item').fadeIn(300);
        } else {
            $('.portfolio-item').each(function() {
                if ($(this).data('category') === filter) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    });

    // анимации при скролле
    function animateOnScroll() {
        $('.section-title, .about-text, .contact-item').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate');
            }
        });
    }

    $(window).scroll(animateOnScroll);
    animateOnScroll(); // запуск при загрузке страницы

    // плавное появление элементов при загрузке
    $(window).on('load', function() {
        $('.hero-content').addClass('loaded');
    });

    // эффект параллакса для hero секции (ограниченный)
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var heroHeight = $('.hero').outerHeight();
        
        // параллакс только пока hero секция видна
        if (scrolled < heroHeight) {
            var parallax = $('.hero');
            var speed = scrolled * 0.3; // уменьшили скорость
            parallax.css('transform', 'translateY(' + speed + 'px)');
        }
    });

    // hover эффекты для кнопок
    $('.cta-button, .contact-form-btn, .submit-btn').hover(
        function() {
            $(this).addClass('hover');
        },
        function() {
            $(this).removeClass('hover');
        }
    );

    // анимация навигации при скролле
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // инициализация
    loadPortfolio();
    
    // инициализация карусели
    showSlide(0);

    console.log('jquery портфолио инициализировано успешно!');
});