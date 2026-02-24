/**
 * Project: DevOps-Nexus-Bento-Portfolio
 * File: script.js
 * Description: Core logic for Lucide icons, ScrollReveal animations, 
 * dynamic uptime simulation, and project filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initScrollAnimations();
    initUptimeSimulator();
    initProjectFiltering();
});

/**
 * Инициализация иконок Lucide
 * Заменяет элементы с атрибутом data-lucide на SVG
 */
const initLucideIcons = () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error('Lucide library not found');
    }
};

/**
 * Каскадное появление карточек с помощью ScrollReveal
 */
const initScrollAnimations = () => {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '20px',
            duration: 800,
            delay: 200,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            interval: 100,
            reset: false
        });

        // Сначала анимируем заголовок, затем карточки Bento-сетки
        sr.reveal('.hero-content');
        sr.reveal('.bento-grid > div', { interval: 150 });
    }
};

/**
 * Имитация динамического 'Uptime' систем
 * Генерирует реалистичные колебания процентов для DevOps-визуализации
 */
const initUptimeSimulator = () => {
    const uptimeElement = document.querySelector('[data-uptime-value]');
    if (!uptimeElement) return;

    const updateUptime = () => {
        // Имитируем стабильность системы 99.9x%
        const baseUptime = 99.9;
        const fluctuation = (Math.random() * 0.09).toFixed(2);
        const finalValue = (baseUptime + parseFloat(fluctuation)).toFixed(2);
        
        uptimeElement.textContent = `${finalValue}%`;
    };

    // Обновляем раз в 5 секунд для эффекта "живого" мониторинга
    setInterval(updateUptime, 5000);
};

/**
 * Фильтрация проектов по тегам (Docker, K8s, Terraform)
 */
const initProjectFiltering = () => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-category]');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Смена активного состояния кнопок
            filterButtons.forEach(btn => btn.classList.remove('bg-indigo-500', 'text-white'));
            button.classList.add('bg-indigo-500', 'text-white');

            // Логика фильтрации
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    // Добавляем микро-анимацию появления
                    card.classList.add('animate-fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate-fade-in');
                }
            });
        });
    });
};

/**
 * Плавный скролл для якорных ссылок
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
