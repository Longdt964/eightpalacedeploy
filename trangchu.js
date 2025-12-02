// Danh sách ID của các trang HERO (chỉ 3 trang này trượt ngang)
const heroPages = [
    'hero-one', 
    'hero-two', 
    'hero-three', 
];
const totalHeroPages = heroPages.length;
let currentHeroIndex = 0;
let heroSlider;

// Hàm trượt Hero (dùng cho nút mũi tên và cuộn chuột)
function scrollToPage(direction) {
    let nextIndex = currentHeroIndex;

    if (direction === 'next' && currentHeroIndex < totalHeroPages - 1) {
        nextIndex++;
    } else if (direction === 'previous' && currentHeroIndex > 0) {
        nextIndex--;
    } else if (direction === 'next' && currentHeroIndex === totalHeroPages - 1) {
        document.getElementById('gioi-thieu-chung').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        return; 
    } else {
        return; 
    }
    
    currentHeroIndex = nextIndex;

    const offset = currentHeroIndex * -100; 
    heroSlider.style.transform = `translateX(${offset}vw)`;
    
    updateVideoBackground();
}

// Hàm được gọi từ HTML
function goToNextPage() {
    scrollToPage('next');
}

function goToPreviousPage() {
    scrollToPage('previous');
}

// Cập nhật trạng thái phát/tạm dừng của video nền
function updateVideoBackground() {
    const allHeroVideos = document.querySelectorAll('#hero-slider .hero-video-bg');
    allHeroVideos.forEach((video, index) => {
        if (index === currentHeroIndex) {
            video.style.display = 'block';
            video.play();
        } else {
            video.style.display = 'none';
            video.pause();
        }
    });
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    heroSlider = document.getElementById('hero-slider');    
    currentHeroIndex = 0;
    updateVideoBackground();    
    window.addEventListener('wheel', (e) => {
        const heroSliderRect = heroSlider.getBoundingClientRect();
        
        if (heroSliderRect.top > window.innerHeight || heroSliderRect.bottom < 0) {
            return;
        }        
        // Xử lý cuộn ngang (trên trackpad hoặc magic mouse)
        if (Math.abs(e.deltaX) > 10) {
            e.preventDefault(); 
            scrollToPage(e.deltaX > 0 ? 'next' : 'previous');
        } 
        // Xử lý cuộn dọc khi đang ở Hero slider
        else if (Math.abs(e.deltaY) > 20) {
            if (e.deltaY > 0) {
                if (currentHeroIndex === totalHeroPages - 1) {
                    return; 
                } else {
                    e.preventDefault(); 
                    scrollToPage('next');
                }
            } 
            else { 
                if (currentHeroIndex === 0) {
                    return; 
                } else {
                    e.preventDefault(); 
                    scrollToPage('previous');
                }
            }
        }
    }, { passive: false });
});

// menudropdown
document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.querySelector('.menu-item-dropdown .main-link');
    const dropdownContent = document.querySelector('.dropdown-content');

    menuToggle.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn liên kết
        
        const isVisible = dropdownContent.style.display === 'flex';
        
        if (isVisible) {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'flex';
        }
    });

    window.addEventListener('click', function(event) {
        
        if (!menuToggle.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });

});


// Lazy load hình ảnh
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});


// Lazy load video
document.addEventListener("DOMContentLoaded", function() {
    // 1. Lấy tất cả các phần tử có class 'lazy'
    const lazyImages = document.querySelectorAll('.lazy');

    // 2. Kiểm tra xem trình duyệt có hỗ trợ IntersectionObserver không
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                // Nếu phần tử nằm trong viewport
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;

                    // 3. Tải hình ảnh thực
                    const realSrc = lazyImage.dataset.src; 
                    if (realSrc) {
                        lazyImage.src = realSrc;
                    }
                    
                    // Thêm class để kích hoạt hiệu ứng hiển thị
                    lazyImage.classList.add('lazy-loaded');
                    
                    // 4. Ngừng theo dõi phần tử này
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        // Áp dụng Observer cho từng hình ảnh
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback cho trình duyệt cũ (Nếu cần) - Tải tất cả ảnh ngay lập tức
        lazyImages.forEach(function(lazyImage) {
            const realSrc = lazyImage.dataset.src; 
            if (realSrc) {
                lazyImage.src = realSrc;
            }
            lazyImage.classList.add('lazy-loaded');
        });
    }
});
