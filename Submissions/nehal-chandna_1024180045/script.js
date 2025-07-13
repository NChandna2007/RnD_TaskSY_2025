let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slide-dot');
        const totalSlides = slides.length;
        const progressBar = document.getElementById('progress-bar');
        const currentSlideElement = document.getElementById('current-slide');
        let autoSlideInterval;

        function showSlide(index) {
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            
            currentSlideElement.textContent = index + 1;
            
            
            const progress = ((index + 1) / totalSlides) * 100;
            progressBar.style.width = progress + '%';
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000); 
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        
        document.querySelector('.slideshow-nav.next').addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        document.querySelector('.slideshow-nav.prev').addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoSlide();
                startAutoSlide();
            });
        });

       
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            }
        });

        
        const slideshowWrapper = document.querySelector('.slideshow-wrapper');
        slideshowWrapper.addEventListener('mouseenter', stopAutoSlide);
        slideshowWrapper.addEventListener('mouseleave', startAutoSlide);

        showSlide(0);
        startAutoSlide();