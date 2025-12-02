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