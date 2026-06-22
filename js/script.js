// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    initSmoothScroll();
    
    // 导航栏滚动效果
    initNavbarScroll();
    
    // 卡片悬停效果
    initCardHover();
    
    // 滚动动画
    initScrollAnimations();
    
    // 主题切换功能
    initThemeToggle();
    
    // 技能标签动画
    initSkillTags();
    
    // 页面加载动画
    initPageLoadAnimation();
});

// 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // 移动设备上关闭导航菜单（如果有的话）
                closeMobileMenu();
            }
        });
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加背景模糊和阴影
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(248, 253, 249, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(42, 110, 63, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(248, 253, 249, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        // 隐藏/显示导航栏（滚动时）
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // 高亮当前部分
        highlightCurrentSection();
    });
    
    // 初始设置
    navbar.style.transition = 'all 0.3s ease';
}

// 高亮当前滚动到的部分
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 卡片悬停效果
function initCardHover() {
    const cards = document.querySelectorAll('.about-card, .project-card, .talent-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(42, 110, 63, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.about-card, .timeline-item, .skill-category, .project-card, .talent-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(odd).animate-in {
            transition-delay: 0.2s;
        }
        
        .timeline-item:nth-child(even).animate-in {
            transition-delay: 0.4s;
        }
        
        .about-card:nth-child(1).animate-in {
            transition-delay: 0.1s;
        }
        
        .about-card:nth-child(2).animate-in {
            transition-delay: 0.2s;
        }
        
        .about-card:nth-child(3).animate-in {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(style);
}

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.querySelector('.nav-theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        enableDarkTheme();
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-theme')) {
            disableDarkTheme();
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            enableDarkTheme();
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });
}

function enableDarkTheme() {
    document.body.classList.add('dark-theme');
    
    // 添加暗色主题样式
    const darkStyle = document.createElement('style');
    darkStyle.id = 'dark-theme-style';
    darkStyle.textContent = `
        .dark-theme {
            --primary-color: #4caf50;
            --secondary-color: #8bc34a;
            --accent-color: #a5d6a7;
            --light-color: #1a1a1a;
            --dark-color: #f8fdf9;
            --text-color: #e8f5e9;
            --text-light: #a5d6a7;
            --border-color: #2a2a2a;
            --shadow-color: rgba(0, 0, 0, 0.3);
            
            --gradient-primary: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
            --gradient-secondary: linear-gradient(135deg, #8bc34a 0%, #a5d6a7 100%);
            --gradient-light: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
            
            background-color: #121212;
            color: #e8f5e9;
        }
        
        .dark-theme .navbar {
            background-color: rgba(26, 26, 26, 0.95) !important;
            border-bottom-color: var(--border-color);
        }
        
        .dark-theme .about-card,
        .dark-theme .skill-category,
        .dark-theme .project-card,
        .dark-theme .talent-item,
        .dark-theme .contact-info,
        .dark-theme .contact-message {
            background-color: #2a2a2a;
            border-color: var(--border-color);
        }
        
        .dark-theme .hero::before {
            background: var(--gradient-light);
        }
        
        .dark-theme .visual-element {
            background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
        }
        
        .dark-theme .btn-secondary {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        
        .dark-theme .btn-secondary:hover {
            background: var(--primary-color);
            color: var(--dark-color);
        }
        
        .dark-theme .timeline::before {
            background: var(--gradient-primary);
        }
        
        .dark-theme .timeline-content::before {
            background: var(--gradient-primary);
            border-color: #2a2a2a;
            box-shadow: 0 0 0 3px var(--primary-color);
        }
        
        .dark-theme .skill-tag {
            background: #2a2a2a;
            border-color: var(--border-color);
        }
        
        .dark-theme .skill-tag:hover {
            background: var(--gradient-primary);
            color: white;
        }
        
        .dark-theme .social-link {
            background: #2a2a2a;
            border-color: var(--border-color);
        }
        
        .dark-theme .social-link:hover {
            background: var(--gradient-primary);
            color: white;
        }
        
        .dark-theme .footer {
            border-top-color: var(--border-color);
        }
        
        .dark-theme ::-webkit-scrollbar-track {
            background: #1a1a1a;
        }
    `;
    
    // 移除旧的暗色样式（如果存在）
    const oldStyle = document.getElementById('dark-theme-style');
    if (oldStyle) {
        oldStyle.remove();
    }
    
    document.head.appendChild(darkStyle);
}

function disableDarkTheme() {
    document.body.classList.remove('dark-theme');
    
    // 移除暗色主题样式
    const darkStyle = document.getElementById('dark-theme-style');
    if (darkStyle) {
        darkStyle.remove();
    }
}

// 技能标签动画
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const colors = ['#2a6e3f', '#4caf50', '#8bc34a', '#388e3c', '#66bb6a'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            this.style.setProperty('--hover-color', randomColor);
            this.style.animation = 'pulse 0.3s ease';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // 添加脉冲动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .skill-tag {
            --hover-color: var(--primary-color);
            transition: all 0.3s ease;
        }
        
        .skill-tag:hover {
            background-color: var(--hover-color) !important;
        }
    `;
    document.head.appendChild(style);
}

// 页面加载动画
function initPageLoadAnimation() {
    // 添加加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 英雄区域文字动画
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(20px)';
        heroDescription.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';
        
        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 700);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
        heroButtons.style.transition = 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s';
        
        setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 900);
    }
}

// 移动端菜单功能（如果需要的话）
function closeMobileMenu() {
    // 如果有移动端菜单，可以在这里添加关闭逻辑
    console.log('Mobile menu closed (if exists)');
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭任何打开的模态框或菜单
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // 空格键滚动到下一个部分
    if (e.key === ' ' && !e.target.matches('input, textarea, button, a')) {
        e.preventDefault();
        scrollToNextSection();
    }
});

function scrollToNextSection() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const currentScroll = window.pageYOffset;
    
    for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop - 100;
        
        if (sectionTop > currentScroll) {
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
            break;
        }
    }
}

// 添加打印样式
const printStyle = document.createElement('style');
printStyle.media = 'print';
printStyle.textContent = `
    @media print {
        .navbar,
        .hero-buttons,
        .scroll-indicator,
        .nav-theme-toggle {
            display: none !important;
        }
        
        body {
            background: white !important;
            color: black !important;
        }
        
        .container {
            max-width: 100% !important;
            padding: 0 !important;
        }
        
        .section {
            padding: 1rem 0 !important;
            page-break-inside: avoid;
        }
        
        .hero {
            min-height: auto !important;
            padding: 2rem 0 !important;
        }
        
        .hero-visual {
            display: none !important;
        }
        
        .about-card,
        .skill-category,
        .project-card,
        .talent-item {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            page-break-inside: avoid;
        }
        
        .btn-primary,
        .btn-secondary {
            display: none !important;
        }
        
        a {
            color: black !important;
            text-decoration: none !important;
        }
        
        .social-links {
            display: none !important;
        }
    }
`;
document.head.appendChild(printStyle);