/* ==========================================================================
   MOMMY TATTOO & PIERCING - NOWY SĄCZ
   Główna logika aplikacji, kalendarz, kreator rezerwacji, kompresja i panel
   ========================================================================== */

// --- 1. AMBIENT CANVAS (Subtelna czerwona mgła w tle) ---
(function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 120 + 80,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.12 + 0.05
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -p.radius) p.x = width + p.radius;
            if (p.x > width + p.radius) p.x = -p.radius;
            if (p.y < -p.radius) p.y = height + p.radius;
            if (p.y > height + p.radius) p.y = -p.radius;

            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            grad.addColorStop(0, `rgba(225, 29, 72, ${p.alpha})`);
            grad.addColorStop(0.6, `rgba(180, 15, 50, ${p.alpha * 0.4})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
})();

// --- 2. CUSTOM MODALS (Alert & Confirm bez alert()/confirm()) ---
function showCustomAlert(message, title = 'Mommy Tattoo', type = 'info') {
    const backdrop = document.getElementById('custom-modal-backdrop');
    const card = document.getElementById('custom-modal-card');
    const titleEl = document.getElementById('custom-modal-title');
    const bodyEl = document.getElementById('custom-modal-body');
    const iconContainer = document.getElementById('custom-modal-icon-container');
    const confirmBtn = document.getElementById('custom-modal-confirm-btn');
    const cancelBtn = document.getElementById('custom-modal-cancel-btn');

    if (!backdrop) return;

    titleEl.textContent = title;
    bodyEl.innerHTML = message;

    if (cancelBtn) cancelBtn.classList.add('hidden');

    if (type === 'success') {
        iconContainer.className = 'w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg bg-emerald-950 text-emerald-400 border border-emerald-800';
        iconContainer.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else if (type === 'error') {
        iconContainer.className = 'w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg bg-rose-950 text-rose-400 border border-rose-800';
        iconContainer.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    } else {
        iconContainer.className = 'w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg bg-neutral-900 text-rose-500 border border-neutral-700';
        iconContainer.innerHTML = '<i class="fa-solid fa-gem"></i>';
    }

    confirmBtn.onclick = () => closeCustomModal();
    backdrop.classList.remove('hidden');
    backdrop.classList.add('flex');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        card.classList.remove('scale-95', 'opacity-0');
    }, 10);
}

function showCustomConfirm(message, title = 'Potwierdzenie', callback = null) {
    const backdrop = document.getElementById('custom-modal-backdrop');
    const card = document.getElementById('custom-modal-card');
    const titleEl = document.getElementById('custom-modal-title');
    const bodyEl = document.getElementById('custom-modal-body');
    const iconContainer = document.getElementById('custom-modal-icon-container');
    const confirmBtn = document.getElementById('custom-modal-confirm-btn');
    const cancelBtn = document.getElementById('custom-modal-cancel-btn');

    if (!backdrop) return;

    titleEl.textContent = title;
    bodyEl.innerHTML = message;

    iconContainer.className = 'w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg bg-neutral-900 text-rose-500 border border-neutral-700';
    iconContainer.innerHTML = '<i class="fa-solid fa-circle-question"></i>';

    if (cancelBtn) {
        cancelBtn.classList.remove('hidden');
        cancelBtn.onclick = () => closeCustomModal();
    }

    confirmBtn.onclick = () => {
        closeCustomModal();
        if (typeof callback === 'function') callback();
    };

    backdrop.classList.remove('hidden');
    backdrop.classList.add('flex');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        card.classList.remove('scale-95', 'opacity-0');
    }, 10);
}

function closeCustomModal() {
    const backdrop = document.getElementById('custom-modal-backdrop');
    const card = document.getElementById('custom-modal-card');
    if (!backdrop) return;

    backdrop.classList.add('opacity-0');
    if (card) card.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        backdrop.classList.remove('flex');
        backdrop.classList.add('hidden');
    }, 250);
}

// --- 3. MODAL KONTAKTU Z WŁAŚCICIELEM (DEMO BAR) ---
function openContactOwnerModal() {
    const modal = document.getElementById('contact-owner-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeContactOwnerModal() {
    const modal = document.getElementById('contact-owner-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// --- 4. POLITYKA PRYWATNOŚCI & COOKIES ---
function openPrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closePrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function acceptCookies() {
    localStorage.setItem('mommy_cookies_accepted', 'true');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('translate-y-full', 'opacity-0');
    }
}

function initCookieBanner() {
    if (!localStorage.getItem('mommy_cookies_accepted')) {
        setTimeout(() => {
            const banner = document.getElementById('cookie-banner');
            if (banner) {
                banner.classList.remove('translate-y-full', 'opacity-0');
            }
        }, 1200);
    }
}

// --- 5. NAWIGACJA MOBILNA (DRAWER) ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    if (!menu) return;

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    } else {
        menu.classList.add('hidden');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }
}

// --- 6. LIGHTBOX PORTFOLIO ---
const portfolioItems = [
    {
        title: "Kolorowy Feniks",
        subtitle: "Kolor & Ilustracja • Artysta: Wookash",
        src: "portfolio-1.png"
    },
    {
        title: "Good Girl Chilli",
        subtitle: "Minimal & Kolor • Mommy Tattoo",
        src: "portfolio-2.png"
    },
    {
        title: "Fineline Motyl",
        subtitle: "Fineline & Linework • Artystka: Kalina",
        src: "portfolio-3.png"
    },
    {
        title: "Kwiat & Kaligrafia 'Grzegorz'",
        subtitle: "Fineline & Napis • Artystka: Kalina",
        src: "portfolio-4.png"
    }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) lightbox.classList.add('hidden');
    document.body.style.overflow = '';
}

function updateLightbox() {
    const item = portfolioItems[currentLightboxIndex];
    if (!item) return;

    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const subtitle = document.getElementById('lightbox-subtitle');
    const counter = document.getElementById('lightbox-counter');

    if (img) img.src = item.src;
    if (title) title.textContent = item.title;
    if (subtitle) subtitle.textContent = item.subtitle;
    if (counter) counter.textContent = `${currentLightboxIndex + 1} / ${portfolioItems.length}`;
}

function nextLightboxImage(e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % portfolioItems.length;
    updateLightbox();
}

function prevLightboxImage(e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + portfolioItems.length) % portfolioItems.length;
    updateLightbox();
}

function handleLightboxBackdropClick(e) {
    if (e.target.id === 'portfolio-lightbox' || e.target.id === 'lightbox-image-container') {
        closeLightbox();
    }
}

document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox && !lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
    }
});

// --- 7. LOGIKA KREATORA REZERWACJI (4-KROKOWY WIZARD) ---
let bookingState = {
    step: 1,
    service: 'fineline',
    date: null,
    time: null,
    clientName: '',
    clientPhone: '',
    countryCode: '+48',
    clientEmail: '',
    placement: '',
    description: '',
    images: [] // Baza Base64 po kompresji
};

const serviceNames = {
    'fineline': 'Fineline & Delikatne Linie (Kwiaty, Motyle, Napisy)',
    'kolor': 'Kolor & Tatuaż Autorski (Ilustracja, Czerwień/Barwy)',
    'piercing': 'Profesjonalny Piercing & Kolczyki'
};

function selectService(serviceKey) {
    bookingState.service = serviceKey;

    const buttons = ['fineline', 'kolor', 'piercing'];
    buttons.forEach(key => {
        const btn = document.getElementById(`service-option-${key}`);
        if (btn) {
            if (key === serviceKey) {
                btn.className = 'p-5 sm:p-6 rounded-3xl border border-rose-500 bg-rose-950/20 text-left transition hover:border-rose-400 cursor-pointer shadow-md';
                const icon = btn.querySelector('i');
                if (icon) icon.className = icon.className.replace('text-neutral-400', 'text-rose-500');
            } else {
                btn.className = 'p-5 sm:p-6 rounded-3xl border border-white/10 bg-neutral-900/60 text-left transition hover:border-rose-500/50 cursor-pointer shadow-xs';
                const icon = btn.querySelector('i');
                if (icon) icon.className = icon.className.replace('text-rose-500', 'text-neutral-400');
            }
        }
    });
}

function goToBookingStep(step) {
    if (step === 2) {
        if (!bookingState.service) {
            showCustomAlert('Wybierz usługę lub styl przed przejściem dalej.', 'Wybór Usługi', 'info');
            return;
        }
    }

    if (step === 3) {
        if (!bookingState.date || !bookingState.time) {
            showCustomAlert('Proszę wybrać wolny dzień oraz godzinę wizyty w kalendarzu.', 'Wybór Terminu', 'info');
            return;
        }
    }

    if (step === 4) {
        const nameInput = document.getElementById('booking-client-name');
        const phoneInput = document.getElementById('booking-client-phone');
        const emailInput = document.getElementById('booking-client-email');
        const placementInput = document.getElementById('booking-tattoo-placement');
        const descInput = document.getElementById('booking-description');

        if (!nameInput.value.trim()) {
            showCustomAlert('Wpisz swoje imię i nazwisko.', 'Brak Danych', 'error');
            nameInput.focus();
            return;
        }

        const phoneVal = phoneInput.value.trim().replace(/\s+/g, '');
        if (!phoneVal || phoneVal.length < 7) {
            showCustomAlert('Wprowadź prawidłowy numer telefonu (min. 7 cyfr).', 'Numer Telefonu', 'error');
            phoneInput.focus();
            return;
        }

        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
            showCustomAlert('Wprowadź prawidłowy adres e-mail.', 'Adres E-mail', 'error');
            emailInput.focus();
            return;
        }

        if (!placementInput.value.trim()) {
            showCustomAlert('Wskaż planowane miejsce na ciele (np. przedramię, udo, obojczyk).', 'Miejsce na Ciele', 'error');
            placementInput.focus();
            return;
        }

        bookingState.clientName = nameInput.value.trim();
        bookingState.clientPhone = `${bookingState.countryCode} ${phoneVal}`;
        bookingState.clientEmail = emailVal;
        bookingState.placement = placementInput.value.trim();
        bookingState.description = descInput ? descInput.value.trim() : '';

        // Uzupełnienie podsumowania
        document.getElementById('summary-service-text').textContent = serviceNames[bookingState.service] || bookingState.service;
        document.getElementById('summary-datetime-text').textContent = `${bookingState.date}, godz. ${bookingState.time}`;
        document.getElementById('summary-client-name').textContent = bookingState.clientName;
        document.getElementById('summary-placement-text').textContent = bookingState.placement;
        document.getElementById('summary-contact-text').textContent = `${bookingState.clientPhone} • ${bookingState.clientEmail}`;
        document.getElementById('summary-images-text').textContent = `${bookingState.images.length} szt.`;
    }

    bookingState.step = step;

    for (let i = 1; i <= 4; i++) {
        const stepEl = document.getElementById(`booking-step-${i}`);
        const tabEl = document.getElementById(`step-tab-${i}`);
        if (stepEl) {
            if (i === step) {
                stepEl.classList.remove('hidden');
                stepEl.classList.remove('step-slide-in');
                void stepEl.offsetWidth;
                stepEl.classList.add('step-slide-in');
            } else {
                stepEl.classList.add('hidden');
                stepEl.classList.remove('step-slide-in');
            }
        }
        if (tabEl) {
            if (i === step) {
                tabEl.className = 'text-white border-b-2 border-rose-500 pb-2 font-bold cursor-pointer transition-colors truncate whitespace-nowrap';
            } else if (i < step) {
                tabEl.className = 'text-rose-400 border-b-2 border-rose-500/40 pb-2 font-medium cursor-pointer transition-colors truncate whitespace-nowrap';
            } else {
                tabEl.className = 'text-neutral-500 pb-2 cursor-pointer font-normal transition-colors truncate whitespace-nowrap';
            }
        }
    }

    if (step === 2) {
        renderCalendar();
        renderTimeSlots();
    }
}

// --- 8. KALENDARZ I GENEROWANIE GODZIN ---
let currentCalDate = new Date();
const monthNamesPl = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

function changeMonth(delta) {
    currentCalDate.setMonth(currentCalDate.getMonth() + delta);
    renderCalendar();
}

// Funkcja pomocnicza do wyznaczania najbliższych dni roboczych
function getUpcomingWorkDay(startOffsetDays, targetDayOfWeek) {
    const d = new Date();
    d.setDate(d.getDate() + startOffsetDays);
    // Pomijamy niedziele (dzień 0)
    while (d.getDay() === 0 || (targetDayOfWeek !== undefined && d.getDay() !== targetDayOfWeek)) {
        d.setDate(d.getDate() + 1);
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Inicjalizacja przykładowych rezerwacji w dni robocze studia
function initSampleBookings() {
    const existing = localStorage.getItem('mommy_tattoo_bookings');
    if (!existing || JSON.parse(existing).length === 0) {
        const tuesdayDate = getUpcomingWorkDay(1, 2);  // Najbliższy wtorek (dzień roboczy)
        const thursdayDate = getUpcomingWorkDay(1, 4); // Najbliższy czwartek (dzień roboczy)

        const sampleBookings = [
            {
                id: 'MT-849201',
                service: 'fineline',
                serviceName: 'Fineline & Delikatne Linie (Kwiaty, Motyle, Napisy)',
                date: tuesdayDate,
                time: '13:00',
                clientName: 'Martyna Kruk',
                clientPhone: '+48 512 345 678',
                clientEmail: 'martyna.kruk@gmail.com',
                placement: 'Przedramię (delikatna gałązka z motylem)',
                description: 'Delikatny tatuaż na przedramieniu, motyw florystyczny z małym motylem w stylu fineline.',
                images: ['portfolio-3.png'],
                status: 'Zatwierdzona',
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
            },
            {
                id: 'MT-592814',
                service: 'kolor',
                serviceName: 'Kolor & Tatuaż Autorski (Ilustracja, Czerwień/Barwy)',
                date: thursdayDate,
                time: '11:30',
                clientName: 'Kamil Bochenek',
                clientPhone: '+48 601 234 567',
                clientEmail: 'kamil.b@onet.pl',
                placement: 'Ramię (kolorowy motyw graficzny)',
                description: 'Kolorowy tatuaż inspirowany pracami Wookasha, motyw z czerwonymi akcentami ok. 15 cm.',
                images: ['portfolio-1.png'],
                status: 'Zatwierdzona',
                createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
            },
            {
                id: 'MT-318492',
                service: 'piercing',
                serviceName: 'Profesjonalny Piercing & Kolczyki',
                date: thursdayDate,
                time: '16:00',
                clientName: 'Natalia Wójcik',
                clientPhone: '+48 790 123 456',
                clientEmail: 'natalia.wojcik@interia.pl',
                placement: 'Ucho (Helix)',
                description: 'Przekłucie chrząstki ucha (Helix) z doborem tytanowego kolczyka.',
                images: [],
                status: 'Oczekująca',
                createdAt: new Date().toISOString()
            }
        ];

        localStorage.setItem('mommy_tattoo_bookings', JSON.stringify(sampleBookings));
    }
}

function renderCalendar() {
    const grid = document.getElementById('calendar-days-grid');
    const monthYearEl = document.getElementById('current-month-year');
    if (!grid || !monthYearEl) return;

    grid.innerHTML = '';
    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();

    monthYearEl.textContent = `${monthNamesPl[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Niedziela
    const startingBlankDays = (firstDayIndex + 6) % 7; // Poniedziałek = 0
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allBookings = JSON.parse(localStorage.getItem('mommy_tattoo_bookings') || '[]');
    const activeBookings = allBookings.filter(b => b.status !== 'Anulowana');

    // Puste kafelki przed 1. dniem
    for (let i = 0; i < startingBlankDays; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'h-11 sm:h-12';
        grid.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        dateObj.setHours(0, 0, 0, 0);
        const dayOfWeek = dateObj.getDay(); // 0 = Niedziela, 6 = Sobota

        const btn = document.createElement('button');
        btn.type = 'button';

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Niedziele zamknięte lub dni z przeszłości
        if (dayOfWeek === 0 || dateObj < today) {
            btn.className = 'h-11 sm:h-12 rounded-xl text-neutral-600 bg-neutral-900/40 text-xs sm:text-sm font-medium flex flex-col items-center justify-center cursor-not-allowed border border-white/5 opacity-40 select-none';
            btn.disabled = true;
            btn.innerHTML = `<span>${day}</span>`;
            if (dayOfWeek === 0) btn.title = 'Niedziela - Studio nieczynne';
        } else {
            const isSelected = bookingState.date === dateStr;
            const dayBookings = activeBookings.filter(b => b.date === dateStr);
            const bookedCount = dayBookings.length;
            const totalSlots = (dayOfWeek === 6) ? 3 : 6;
            const isFull = bookedCount >= totalSlots;
            const isPartial = bookedCount > 0 && !isFull;

            let dotHtml = '<span class="w-1.5 h-1.5 rounded-full bg-transparent mt-0.5"></span>';
            if (isFull) {
                dotHtml = '<span class="w-1.5 h-1.5 rounded-full bg-rose-500 mt-0.5 shadow-xs" title="Brak wolnych miejsc"></span>';
            } else if (isPartial) {
                dotHtml = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5 shadow-xs" title="Ostatnie wolne miejsca"></span>';
            }

            if (isSelected) {
                btn.className = 'h-11 sm:h-12 rounded-xl bg-rose-600 text-white font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition shadow-lg shadow-rose-900/40 ring-2 ring-rose-400';
            } else if (isFull) {
                btn.className = 'h-11 sm:h-12 rounded-xl bg-neutral-900/90 text-neutral-400 text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition border border-rose-500/30 hover:border-rose-500/60 cursor-pointer';
            } else if (isPartial) {
                btn.className = 'h-11 sm:h-12 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition border border-amber-500/40 hover:border-amber-400 cursor-pointer';
            } else {
                btn.className = 'h-11 sm:h-12 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition border border-white/10 hover:border-rose-500/50 cursor-pointer';
            }

            btn.innerHTML = `<span class="leading-none">${day}</span>${dotHtml}`;

            btn.onclick = () => {
                bookingState.date = dateStr;
                bookingState.time = null;
                document.getElementById('selected-day-display').textContent = `${day} ${monthNamesPl[month]} ${year} (${dayOfWeek === 6 ? 'Sobota' : 'Dzień powszedni'})`;
                renderCalendar();
                renderTimeSlots();
            };
        }

        grid.appendChild(btn);
    }
}

function renderTimeSlots() {
    const container = document.getElementById('time-slots-container');
    if (!container) return;

    container.innerHTML = '';

    if (!bookingState.date) {
        container.innerHTML = '<div class="col-span-2 text-center text-xs sm:text-sm text-neutral-500 py-6">Wybierz najpierw dzień w kalendarzu.</div>';
        return;
    }

    const parts = bookingState.date.split('-');
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const dayOfWeek = dateObj.getDay();

    // Godziny pracy:
    // Pn-Pt: 10:00 - 18:00
    // Sb: 10:00 - 14:00
    let slots = [];
    if (dayOfWeek === 6) {
        slots = ['10:00', '11:30', '13:00'];
    } else {
        slots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:00'];
    }

    const allBookings = JSON.parse(localStorage.getItem('mommy_tattoo_bookings') || '[]');
    const bookedTimesOnDay = allBookings
        .filter(b => b.date === bookingState.date && b.status !== 'Anulowana')
        .map(b => b.time);

    slots.forEach(timeSlot => {
        const isBooked = bookedTimesOnDay.includes(timeSlot);
        const isSelected = bookingState.time === timeSlot;

        const btn = document.createElement('button');
        btn.type = 'button';

        if (isBooked) {
            btn.disabled = true;
            btn.className = 'py-3 px-3.5 rounded-xl bg-neutral-950/70 border border-white/5 text-neutral-500 text-xs font-semibold flex items-center justify-between opacity-50 cursor-not-allowed select-none';
            btn.innerHTML = `
                <span class="line-through">${timeSlot}</span>
                <span class="text-[10px] text-rose-400 font-bold uppercase tracking-wider bg-rose-950/50 px-2 py-0.5 rounded-md border border-rose-900/40">Zajęty</span>
            `;
        } else if (isSelected) {
            btn.className = 'py-3 px-3.5 rounded-xl bg-rose-600 text-white font-bold text-xs sm:text-sm flex items-center justify-between transition shadow-md ring-2 ring-rose-400 cursor-pointer';
            btn.innerHTML = `
                <span>${timeSlot}</span>
                <i class="fa-solid fa-check text-xs"></i>
            `;
        } else {
            btn.className = 'py-3 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-neutral-200 text-xs sm:text-sm font-semibold hover:border-rose-500/50 hover:bg-neutral-800 transition cursor-pointer flex items-center justify-between';
            btn.innerHTML = `
                <span>${timeSlot}</span>
                <span class="text-[10px] text-emerald-400 font-medium">Wolny</span>
            `;
            btn.onclick = () => {
                bookingState.time = timeSlot;
                renderTimeSlots();
            };
        }

        container.appendChild(btn);
    });
}

// --- 9. KRAJE I PREFIKS TELEFONICZNY ---
const countriesList = [
    { name: 'Polska', code: '+48', flag: 'fi fi-pl' },
    { name: 'Niemcy', code: '+49', flag: 'fi fi-de' },
    { name: 'Wielka Brytania', code: '+44', flag: 'fi fi-gb' },
    { name: 'Holandia', code: '+31', flag: 'fi fi-nl' },
    { name: 'Irlandia', code: '+353', flag: 'fi fi-ie' },
    { name: 'Norwegia', code: '+47', flag: 'fi fi-no' },
    { name: 'Szwecja', code: '+46', flag: 'fi fi-se' },
    { name: 'Czechy', code: '+420', flag: 'fi fi-cz' },
    { name: 'Słowacja', code: '+421', flag: 'fi fi-sk' },
    { name: 'Austria', code: '+43', flag: 'fi fi-at' },
    { name: 'Włochy', code: '+39', flag: 'fi fi-it' },
    { name: 'Hiszpania', code: '+34', flag: 'fi fi-es' },
    { name: 'Francja', code: '+33', flag: 'fi fi-fr' },
    { name: 'USA / Kanada', code: '+1', flag: 'fi fi-us' },
    { name: 'Ukraina', code: '+380', flag: 'fi fi-ua' }
];

function toggleCountryDropdown() {
    const menu = document.getElementById('country-dropdown-menu');
    if (!menu) return;
    menu.classList.toggle('hidden');
    if (!menu.classList.contains('hidden')) {
        renderCountryOptions('');
        const searchInput = document.getElementById('country-search-input');
        if (searchInput) searchInput.focus();
    }
}

function renderCountryOptions(filterText) {
    const list = document.getElementById('country-options-list');
    if (!list) return;
    list.innerHTML = '';

    const q = filterText.toLowerCase().trim();
    const filtered = countriesList.filter(c => c.name.toLowerCase().includes(q) || c.code.includes(q));

    filtered.forEach(c => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-2 rounded-lg hover:bg-neutral-800 cursor-pointer text-xs text-neutral-300 transition';
        item.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="${c.flag}"></span>
                <span>${c.name}</span>
            </div>
            <span class="font-mono text-neutral-400 font-bold">${c.code}</span>
        `;
        item.onclick = () => {
            bookingState.countryCode = c.code;
            document.getElementById('selected-country-flag').className = c.flag;
            document.getElementById('selected-country-code').textContent = c.code;
            document.getElementById('country-dropdown-menu').classList.add('hidden');
        };
        list.appendChild(item);
    });
}

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('country-dropdown-menu');
    const trigger = document.getElementById('country-select-trigger');
    if (dropdown && !dropdown.classList.contains('hidden')) {
        if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    }
});

// --- 10. KOMPRESJA ZDJĘĆ W CANVAS API (Przed zapisem do localStorage) ---
function compressImage(file, maxWidth = 900, quality = 0.82) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
        };
    });
}

async function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

async function processFiles(files) {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    const remainingSlots = 3 - bookingState.images.length;

    if (imageFiles.length > remainingSlots) {
        showCustomAlert(`Możesz załączyć maksymalnie 3 zdjęcia inspiracji. Załadowano pierwsze ${remainingSlots}.`, 'Limit Zdjęć', 'info');
    }

    const toProcess = imageFiles.slice(0, remainingSlots);

    for (const file of toProcess) {
        try {
            const compressedBase64 = await compressImage(file);
            bookingState.images.push(compressedBase64);
        } catch (err) {
            console.error('Błąd kompresji pliku:', err);
        }
    }

    renderUploadedImages();
}

function renderUploadedImages() {
    const preview = document.getElementById('uploaded-files-preview');
    if (!preview) return;

    preview.innerHTML = '';

    bookingState.images.forEach((dataUrl, idx) => {
        const item = document.createElement('div');
        item.className = 'relative aspect-video rounded-xl overflow-hidden border border-white/10 group';
        item.innerHTML = `
            <img src="${dataUrl}" class="w-full h-full object-cover">
            <button type="button" onclick="removeUploadedImage(${idx})" class="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs opacity-90 hover:opacity-100 transition shadow-sm">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        preview.appendChild(item);
    });
}

function removeUploadedImage(index) {
    bookingState.images.splice(index, 1);
    renderUploadedImages();
}

// --- 11. ZAPIS REZERWACJI I MODAL SUKCESU ---
document.addEventListener('DOMContentLoaded', () => {
    initSampleBookings();
    initCookieBanner();

    // IntersectionObserver do płynnych animacji
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Obsługa formularza rezerwacji
    const form = document.getElementById('main-booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const rodoCheckbox = document.getElementById('rodo-consent-checkbox');
            if (rodoCheckbox && !rodoCheckbox.checked) {
                showCustomAlert('Wymagana jest zgoda na przetwarzanie danych w celu realizacji rezerwacji.', 'Zgoda RODO', 'error');
                return;
            }

            // Generowanie unikalnego kodu rezerwacji #MT-...
            const randomCode = 'MT-' + Math.floor(100000 + Math.random() * 900000);

            const newBooking = {
                id: randomCode,
                service: bookingState.service,
                serviceName: serviceNames[bookingState.service] || bookingState.service,
                date: bookingState.date,
                time: bookingState.time,
                clientName: bookingState.clientName,
                clientPhone: bookingState.clientPhone,
                clientEmail: bookingState.clientEmail,
                placement: bookingState.placement,
                description: bookingState.description,
                images: bookingState.images,
                status: 'Oczekująca',
                createdAt: new Date().toISOString()
            };

            // Zapis do localStorage
            try {
                const existing = JSON.parse(localStorage.getItem('mommy_tattoo_bookings') || '[]');
                existing.unshift(newBooking);
                localStorage.setItem('mommy_tattoo_bookings', JSON.stringify(existing));
            } catch (err) {
                console.error('Błąd zapisu do localStorage:', err);
            }

            // Wyświetlenie modalu sukcesu (W trybie demo zawiera przycisk do Panelu Studia)
            showSuccessModal(newBooking);
        });
    }

    // Obsługa routingu hash #admin
    window.addEventListener('hashchange', checkHashRoute);
    checkHashRoute();
});

function showSuccessModal(booking) {
    const modal = document.getElementById('booking-success-modal');
    if (!modal) return;

    document.getElementById('success-booking-code').textContent = booking.id;
    document.getElementById('success-booking-datetime').textContent = `${booking.date} o godz. ${booking.time}`;
    document.getElementById('success-booking-client').textContent = booking.clientName;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeSuccessModal() {
    const modal = document.getElementById('booking-success-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    // Reset formularza i powrót do kroku 1
    bookingState = {
        step: 1,
        service: 'fineline',
        date: null,
        time: null,
        clientName: '',
        clientPhone: '',
        countryCode: '+48',
        clientEmail: '',
        placement: '',
        description: '',
        images: []
    };
    const form = document.getElementById('main-booking-form');
    if (form) form.reset();
    renderUploadedImages();
    goToBookingStep(1);
}

// --- 12. PANEL STUDIA (ADMINISTRATOR #admin) ---
function navigateToAdmin() {
    window.location.hash = '#admin';
}

function checkHashRoute() {
    const isHashAdmin = window.location.hash === '#admin';
    const mainView = document.getElementById('main-content-view');
    const adminView = document.getElementById('admin-view-container');

    if (!mainView || !adminView) return;

    if (isHashAdmin) {
        mainView.classList.add('hidden');
        adminView.classList.remove('hidden');
        window.scrollTo(0, 0);

        // Sprawdzenie sesji admina
        const isLoggedIn = sessionStorage.getItem('mommy_admin_logged') === 'true';
        if (isLoggedIn) {
            showAdminDashboard();
        } else {
            showAdminLogin();
        }
    } else {
        mainView.classList.remove('hidden');
        adminView.classList.add('hidden');
    }
}

function showAdminLogin() {
    const loginBox = document.getElementById('admin-login-box');
    const dashboard = document.getElementById('admin-dashboard-content');
    if (loginBox) loginBox.classList.remove('hidden');
    if (dashboard) dashboard.classList.add('hidden');
}

function showAdminDashboard() {
    const loginBox = document.getElementById('admin-login-box');
    const dashboard = document.getElementById('admin-dashboard-content');
    if (loginBox) loginBox.classList.add('hidden');
    if (dashboard) dashboard.classList.remove('hidden');
    renderAdminTables();
}

// Logowanie administratora
const adminLoginForm = document.getElementById('admin-login-form');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value.trim();
        const pass = document.getElementById('admin-password').value.trim();
        const errEl = document.getElementById('admin-login-error');

        if (email === 'admin@mommytattoo.pl' && pass === 'admin123') {
            sessionStorage.setItem('mommy_admin_logged', 'true');
            if (errEl) errEl.classList.add('hidden');
            showAdminDashboard();
        } else {
            if (errEl) {
                errEl.textContent = 'Nieprawidłowy e-mail lub hasło.';
                errEl.classList.remove('hidden');
            }
        }
    });
}

function logoutAdmin() {
    sessionStorage.removeItem('mommy_admin_logged');
    showAdminLogin();
}

function renderAdminTables() {
    const bookings = JSON.parse(localStorage.getItem('mommy_tattoo_bookings') || '[]');

    const activeBody = document.getElementById('admin-active-bookings-body');
    const historyBody = document.getElementById('admin-history-bookings-body');
    const activeCount = document.getElementById('admin-active-count');
    const historyCount = document.getElementById('admin-history-count');

    const activeList = bookings.filter(b => b.status === 'Oczekująca' || b.status === 'Zatwierdzona');
    const historyList = bookings.filter(b => b.status === 'Zrealizowano' || b.status === 'Anulowana');

    if (activeCount) activeCount.textContent = activeList.length;
    if (historyCount) historyCount.textContent = historyList.length;

    // Tabela 1: Aktywne
    if (activeBody) {
        activeBody.innerHTML = '';
        if (activeList.length === 0) {
            activeBody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-xs sm:text-sm text-neutral-500">Brak oczekujących rezerwacji.</td></tr>';
        } else {
            activeList.forEach(b => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-white/5 hover:bg-neutral-900/60 transition';

                const imagesHtml = (b.images && b.images.length > 0)
                    ? `<div class="flex items-center gap-1.5 mt-1">${b.images.map((img, i) => `<img src="${img}" onclick="openImageModal('${b.id}', ${i})" class="w-8 h-8 rounded-lg object-cover cursor-pointer border border-white/20 hover:scale-105 transition" title="Zobacz powiększenie">`).join('')}</div>`
                    : '<span class="text-xs text-neutral-500">Brak zdjęć</span>';

                const statusBadge = b.status === 'Zatwierdzona'
                    ? '<span class="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">Zatwierdzona</span>'
                    : '<span class="px-2.5 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-xs font-bold">Oczekująca</span>';

                tr.innerHTML = `
                    <td class="py-4 px-5">
                        <span class="font-bold text-white block text-sm">${b.date}</span>
                        <span class="font-mono text-rose-400 text-xs">${b.time}</span>
                        <span class="text-[10px] text-neutral-500 block font-mono">#${b.id}</span>
                    </td>
                    <td class="py-4 px-5 font-bold text-neutral-200 text-sm">${b.clientName}</td>
                    <td class="py-4 px-5 text-xs text-neutral-300">
                        <div><a href="tel:${b.clientPhone.replace(/\s+/g, '')}" class="hover:text-rose-400 font-mono">${b.clientPhone}</a></div>
                        <div class="text-neutral-400">${b.clientEmail}</div>
                    </td>
                    <td class="py-4 px-5 text-xs text-neutral-300 max-w-xs">
                        <span class="font-semibold text-rose-300 block">${b.serviceName}</span>
                        <span class="text-neutral-400 block">Miejsce: ${b.placement}</span>
                        ${b.description ? `<p class="italic text-[11px] text-neutral-400 mt-1 line-clamp-2">"${b.description}"</p>` : ''}
                        ${imagesHtml}
                    </td>
                    <td class="py-4 px-5">${statusBadge}</td>
                    <td class="py-4 px-5 text-right whitespace-nowrap">
                        <button onclick="updateBookingStatus('${b.id}', 'Zatwierdzona')" class="px-2.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-bold mr-1.5 transition" title="Potwierdź wizytę">
                            <i class="fa-solid fa-check mr-1"></i> Potwierdź
                        </button>
                        <button onclick="updateBookingStatus('${b.id}', 'Zrealizowano')" class="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold mr-1.5 transition" title="Oznacz jako zrealizowane">
                            Zrealizowano
                        </button>
                        <button onclick="updateBookingStatus('${b.id}', 'Anulowana')" class="px-2.5 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold mr-1.5 transition" title="Anuluj">
                            Anuluj
                        </button>
                        <button onclick="deleteBooking('${b.id}')" class="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950 text-neutral-400 hover:text-rose-400 text-xs transition" title="Usuń trwale">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                activeBody.appendChild(tr);
            });
        }
    }

    // Tabela 2: Historia
    if (historyBody) {
        historyBody.innerHTML = '';
        if (historyList.length === 0) {
            historyBody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-xs sm:text-sm text-neutral-500">Brak historii rezerwacji.</td></tr>';
        } else {
            historyList.forEach(b => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-white/5 hover:bg-neutral-900/60 transition opacity-80';

                const statusBadge = b.status === 'Zrealizowano'
                    ? '<span class="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium">Zrealizowano</span>'
                    : '<span class="px-2.5 py-1 rounded-full bg-rose-950/60 text-rose-400 text-xs font-medium">Anulowana</span>';

                tr.innerHTML = `
                    <td class="py-4 px-5">
                        <span class="font-bold text-neutral-300 block text-sm">${b.date}</span>
                        <span class="font-mono text-neutral-500 text-xs">${b.time}</span>
                        <span class="text-[10px] text-neutral-600 block font-mono">#${b.id}</span>
                    </td>
                    <td class="py-4 px-5 font-medium text-neutral-300 text-sm">${b.clientName}</td>
                    <td class="py-4 px-5 text-xs text-neutral-400 font-mono">${b.clientPhone}</td>
                    <td class="py-4 px-5 text-xs text-neutral-400">${b.serviceName}</td>
                    <td class="py-4 px-5">${statusBadge}</td>
                    <td class="py-4 px-5 text-right">
                        <button onclick="deleteBooking('${b.id}')" class="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950 text-neutral-500 hover:text-rose-400 text-xs transition" title="Usuń">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                historyBody.appendChild(tr);
            });
        }
    }
}

function updateBookingStatus(id, newStatus) {
    const bookings = JSON.parse(localStorage.getItem('mommy_tattoo_bookings') || '[]');
    const target = bookings.find(b => b.id === id);
    if (target) {
        target.status = newStatus;
        localStorage.setItem('mommy_tattoo_bookings', JSON.stringify(bookings));
        renderAdminTables();
        showCustomAlert(`Status rezerwacji ${id} zmieniono na: ${newStatus}`, 'Zaktualizowano', 'success');
    }
}

function deleteBooking(id) {
    showCustomConfirm(`Czy na pewno chcesz bezpowrotnie usunąć rezerwację #${id}?`, 'Usuwanie Rezerwacji', () => {
        let bookings = JSON.parse(localStorage.getItem('mommy_tattoo_bookings') || '[]');
        bookings = bookings.filter(b => b.id !== id);
        localStorage.setItem('mommy_tattoo_bookings', JSON.stringify(bookings));
        renderAdminTables();
        showCustomAlert('Rezerwacja została usunięta z bazy.', 'Usunięto', 'info');
    });
}

// Modal podglądu inspiracji w panelu admina
function openImageModal(bookingId, imageIndex) {
    const bookings = JSON.parse(localStorage.getItem('mommy_tattoo_bookings') || '[]');
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || !booking.images || !booking.images[imageIndex]) return;

    const modal = document.getElementById('admin-image-modal');
    const imgEl = document.getElementById('admin-modal-img');
    const infoEl = document.getElementById('admin-modal-img-info');

    if (imgEl) imgEl.src = booking.images[imageIndex];
    if (infoEl) {
        infoEl.innerHTML = `
            <span class="font-bold text-white">${booking.clientName}</span> (#${booking.id}) • 
            <span class="text-rose-400">${booking.serviceName}</span> • 
            <span>Miejsce: ${booking.placement}</span>
            ${booking.description ? `<p class="italic text-neutral-400 mt-2 text-xs">"${booking.description}"</p>` : ''}
        `;
    }

    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeImageModal() {
    const modal = document.getElementById('admin-image-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}
