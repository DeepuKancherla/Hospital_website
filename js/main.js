/* ── GLOBAL STATE & INIT ── */
document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    renderDepartments();
    renderDoctors();
    renderPackages();
    renderStories();
    initSearch();
    setMinDate();
    initToast();
});

/* ── RENDER DEPARTMENTS ── */
function renderDepartments() {
    const grid = document.getElementById('deptGrid');
    if(!grid) return;
    grid.innerHTML = clinicData.departments.map((dept, i) => `
        <div class="dept-card reveal" data-cat="${dept.category}" style="transition-delay:${i * 0.04}s">
            <div class="dept-card-icon">${dept.icon}</div>
            <h3>${dept.title}</h3>
            <p>${dept.desc}</p>
            <div class="dept-card-footer">
                <span><strong>${dept.specialists}</strong> Specialists</span>
                <span class="dept-arrow">→</span>
            </div>
        </div>
    `).join('');
    observeReveals();
}

/* ── RENDER DOCTORS ── */
function renderDoctors() {
    const grid = document.getElementById('doctorsGrid');
    if(!grid) return;
    grid.innerHTML = clinicData.doctors.map((doc, i) => `
        <div class="doctor-card reveal" data-dept="${doc.department}" data-avail="${doc.availability}" style="transition-delay:${i * 0.04}s">
            <div class="doctor-img">${doc.image}<span class="doctor-avail avail-${doc.availability}">
                ${doc.availability === 'today' ? '✓ Today' : '⏰ Tomorrow'}
            </span></div>
            <div class="doctor-body">
                <h3>${doc.name}</h3>
                <div class="doctor-spec">${doc.specialty}</div>
                <div class="doctor-exp">${doc.credentials} · ${doc.experience}</div>
                <div class="doctor-rating-row">
                    <span class="doctor-stars">★★★★★</span>
                    <span class="doctor-reviews">${doc.rating} · ${doc.reviews} reviews</span>
                </div>
                <div class="doctor-tags">
                    ${doc.tags.map(tag => `<span class="doctor-tag">${tag}</span>`).join('')}
                </div>
                <div class="doctor-actions">
                    <button class="btn-book" onclick="openModal('${doc.name}', '${doc.department}')">Book Appointment</button>
                    <button class="btn-profile">Profile</button>
                </div>
            </div>
        </div>
    `).join('');
    observeReveals();
}

/* ── RENDER PACKAGES ── */
function renderPackages() {
    const grid = document.querySelector('.packages-grid');
    if(!grid) return;
    grid.innerHTML = clinicData.packages.map((pkg, i) => `
        <div class="package-card ${pkg.featured ? 'featured' : ''} reveal" style="transition-delay:${i * 0.04}s">
            <div class="package-header">
                <div class="package-icon">${pkg.icon}</div>
                <h3>${pkg.title}</h3>
                <p>${pkg.desc}</p>
            </div>
            <div class="package-price">
                <span class="currency">₹</span>
                <span class="amount">${pkg.price}</span>
                <span class="original">₹${pkg.originalPrice}</span>
                <span class="save">${pkg.save}</span>
            </div>
            <div class="package-tests">
                <h4>${pkg.testCount}</h4>
                <ul>
                    ${pkg.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            <div class="package-footer">
                <button class="btn-package ${pkg.featured ? 'primary' : 'outline'}" onclick="openModal('', '', '${pkg.title}')">Book This Package</button>
            </div>
        </div>
    `).join('');
    observeReveals();
}

/* ── RENDER STORIES ── */
function renderStories() {
    const grid = document.querySelector('.stories-grid');
    if(!grid) return;
    grid.innerHTML = clinicData.patientStories.map((story, i) => `
        <div class="story-card reveal" style="transition-delay:${i * 0.04}s">
            <div class="story-quote">"</div>
            <div class="story-stars">★★★★★</div>
            <p class="story-text">${story.quote}</p>
            <div class="story-author">
                <div class="story-av">${story.avatar}</div>
                <div>
                    <h5>${story.name}</h5>
                    <span>${story.location}</span>
                    <div class="story-dept">${story.department}</div>
                </div>
            </div>
        </div>
    `).join('');
    observeReveals();
}

/* ── NAV SCROLL & SMOOTH SCROLL ── */
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if(nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if(href === '#') return;
            const t = document.querySelector(href);
            if (t) {
                e.preventDefault();
                t.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile nav if open
                const mNav = document.getElementById('mobileNav');
                if(mNav && mNav.classList.contains('open')) mNav.classList.remove('open');
            }
        });
    });
}

/* ── SCROLL REVEAL ── */
let revObs;
function observeReveals() {
    if(!revObs) {
        revObs = new IntersectionObserver(entries => {
            entries.forEach((en, i) => {
                if (en.isIntersecting) setTimeout(() => en.target.classList.add('visible'), i * 50);
            });
        }, { threshold: 0.08 });
    }
    document.querySelectorAll('.reveal:not(.visible), .reveal-scale:not(.visible)').forEach(el => revObs.observe(el));
}

/* ── SEARCH ── */
function initSearch() {
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
}
function toggleSearch() {
    const o = document.getElementById('search-overlay');
    o.classList.toggle('open');
    if (o.classList.contains('open')) setTimeout(() => document.getElementById('searchInput').focus(), 100);
}
function closeSearch(e) {
    if (!e || e.target === document.getElementById('search-overlay')) {
        const o = document.getElementById('search-overlay');
        if(o) o.classList.remove('open');
    }
}
function fillSearch(v) {
    document.getElementById('searchInput').value = v;
    handleSearch(v);
}
function handleSearch(v) {
    const res = document.getElementById('searchResults');
    if (!v.trim()) { res.style.display = 'none'; return; }
    
    // Create searchable array from data
    const searchable = [
        ...clinicData.departments.map(d => ({icon: d.icon, title: d.title, sub: d.desc.substring(0,40)+'...' })),
        ...clinicData.doctors.map(d => ({icon: d.image, title: d.name, sub: d.specialty})),
        ...clinicData.packages.map(p => ({icon: p.icon, title: p.title, sub: p.price}))
    ];

    const filtered = searchable.filter(d => d.title.toLowerCase().includes(v.toLowerCase()) || d.sub.toLowerCase().includes(v.toLowerCase()));
    if (!filtered.length) { res.style.display = 'none'; return; }
    res.style.display = 'block';
    res.innerHTML = filtered.map(d => `
        <div class="search-result-item" onclick="closeSearch()">
            <div class="sr-icon">${d.icon}</div>
            <div class="sr-text"><h5>${d.title}</h5><span>${d.sub}</span></div>
        </div>`).join('');
}

/* ── MOBILE NAV ── */
function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('open');
}

/* ── QUICK PANEL TABS ── */
function switchQPTab(btn, type) {
    document.querySelectorAll('.qp-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const form = document.getElementById('qpForm');
    const placeholders = {
        book: ['Select Department', 'Patient Name', 'Mobile Number'],
        video: ['Select Speciality', 'Patient Name', 'Mobile Number'],
        lab: ['Select Test Category', 'Patient Name', 'Mobile Number']
    };
    const inputs = form.querySelectorAll('input[type=text],input[type=tel]');
    if(inputs.length >= 2) {
        inputs[0].placeholder = placeholders[type][1];
        inputs[1].placeholder = placeholders[type][2];
    }
}
function submitQuickBooking() {
    const dept = document.getElementById('qpDept').value;
    if (!dept) { showToast('Please select a department.', 'error'); return; }
    openModal('', dept);
}

/* ── DEPT & DOCTOR FILTERS ── */
function filterDepts(btn, cat) {
    document.querySelectorAll('.dept-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.dept-card').forEach(card => {
        const show = cat === 'all' || card.dataset.cat.includes(cat);
        card.style.display = show ? '' : 'none';
    });
}

function filterDoctors() {
    const name = document.getElementById('doctorSearch').value.toLowerCase();
    const dept = document.getElementById('doctorDeptFilter').value;
    const avail = document.getElementById('doctorAvailFilter').value;
    document.querySelectorAll('.doctor-card').forEach(card => {
        const h3 = card.querySelector('h3').textContent.toLowerCase();
        const cDept = card.dataset.dept;
        const cAvail = card.dataset.avail;
        const nameOk = !name || h3.includes(name);
        const deptOk = !dept || cDept === dept;
        const availOk = !avail || cAvail === avail;
        card.style.display = nameOk && deptOk && availOk ? '' : 'none';
    });
}

/* ── MODAL & APPOINTMENT LOGIC (LOCAL STORAGE) ── */
function openModal(doctorName, dept, pkg) {
    const overlay = document.getElementById('modal-overlay');
    if(!overlay) return;
    document.getElementById('modalBookingForm').style.display = 'block';
    document.getElementById('modalSuccess').style.display = 'none';
    
    if (dept) document.getElementById('m_dept').value = dept;
    if (pkg) document.getElementById('m_dept').value = "Package: " + pkg;
    
    const d = new Date(); d.setDate(d.getDate() + 1);
    document.getElementById('m_date').value = d.toISOString().split('T')[0];
    overlay.classList.add('open');
}

function closeModal() { 
    const o = document.getElementById('modal-overlay');
    if(o) o.classList.remove('open');
}

function closeModalOutside(e) { 
    if (e.target === document.getElementById('modal-overlay')) closeModal(); 
}

function saveBookingToLocal(booking) {
    let bookings = JSON.parse(localStorage.getItem('lifecare_bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('lifecare_bookings', JSON.stringify(bookings));
}

function submitModal() {
    const name = document.getElementById('m_name').value.trim();
    const phone = document.getElementById('m_phone').value.trim();
    const email = document.getElementById('m_email').value.trim();
    const dept = document.getElementById('m_dept').value;
    const date = document.getElementById('m_date').value;
    const slot = document.getElementById('m_slot').value;

    if (!name || !phone || !dept || !date) {
        showToast('Please fill Name, Mobile, Date, and Department.', 'error');
        return;
    }
    
    // Simple validation
    if (!/^\+?[0-9\s\-]{8,15}$/.test(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }

    const refId = 'LCH-2025-' + Math.floor(1000 + Math.random() * 9000);
    
    // Save to localStorage
    saveBookingToLocal({
        id: refId,
        patientName: name,
        phone: phone,
        email: email,
        department: dept,
        date: date,
        slot: slot,
        status: 'Confirmed',
        timestamp: new Date().toISOString()
    });

    document.getElementById('modalBookingForm').style.display = 'none';
    document.getElementById('modalSuccess').style.display = 'block';
    document.getElementById('bookingRef').textContent = 'Booking ID: ' + refId;
}

function submitAppointmentForm() {
    const fname = document.getElementById('af_fname').value.trim();
    const lname = document.getElementById('af_lname').value.trim();
    const phone = document.getElementById('af_phone').value.trim();
    const email = document.getElementById('af_email').value.trim();
    const dept = document.getElementById('af_dept').value;
    const date = document.getElementById('af_date').value;

    if (!fname || !phone || !dept || !date) {
        showToast('Please fill all required fields (*).', 'error');
        return;
    }
    
    if (!/^\+?[0-9\s\-]{8,15}$/.test(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }

    openModal();
    document.getElementById('m_name').value = fname + ' ' + lname;
    document.getElementById('m_phone').value = phone;
    document.getElementById('m_email').value = email;
    document.getElementById('m_dept').value = dept;
    document.getElementById('m_date').value = date;
    
    // Auto submit from the main page form
    submitModal();
}

/* ── SET MIN DATE ── */
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type=date]').forEach(i => i.min = today);
}

/* ── TOAST NOTIFICATIONS ── */
function initToast() {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(toastContainer);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const bgColor = type === 'error' ? '#E53935' : '#00A86B';
    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        display:flex;
        align-items:center;
        gap:8px;
    `;
    
    toast.innerHTML = `<span>${type === 'error' ? '⚠️' : '✅'}</span> ${message}`;
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Animate out
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ── STRIP ITEM ACTIVE ── */
document.querySelectorAll('.strip-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.strip-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});