/**
 * Clifton Danish - Computer Science Engineer & Software Developer Portfolio
 * Interactive Application Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Particle Canvas Engine
  initParticleCanvas();

  // 2. Dynamic Typing Effect for Hero
  initTypingEffect();

  // 3. Navigation & Scroll Tracking
  initNavigation();

  // 4. Skills Category Filtering
  initSkillsFilter();

  // 5. Interactive Sandbox CLI Terminal
  initInteractiveTerminal();

  // 6. Project Modals & Case Studies
  initProjectModals();

  // 7. Theme Accent Switcher
  initThemeSwitcher();

  // 8. Contact Form & Toast Notifications
  initContactForm();

  // 9. Email Copy & Utility Interactions
  initUtilityInteractions();
});

/* ==========================================================================
   1. Particle Canvas Engine (Ambient Network)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
  const mouse = { x: null, y: null, radius: 120 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Dynamic Typing Effect for Hero
   ========================================================================== */
function initTypingEffect() {
  const roleEl = document.getElementById('dynamicRole');
  if (!roleEl) return;

  const roles = [
    'Backend Python Developer @ Stackly',
    'FastAPI & Python Engineer',
    'Software Developer',
    'Computer Science Engineer',
    'Database & Backend Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 85;
  const deleteSpeed = 40;
  const delayBetweenRoles = 2100;

  function type() {
    const current = roles[roleIdx];

    if (!isDeleting) {
      charIdx++;
      roleEl.textContent = current.substring(0, charIdx);

      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenRoles);
        return;
      }
      setTimeout(type, typeSpeed);
    } else {
      charIdx--;
      roleEl.textContent = current.substring(0, charIdx);

      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, deleteSpeed);
    }
  }

  type();
}

/* ==========================================================================
   3. Navigation & Scroll Tracking
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const mobileToggle = document.getElementById('mobileToggle');
  const navItems = document.querySelectorAll('.nav-item');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((item) => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   4. Skills Category Filtering
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'slideIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Sandbox CLI Terminal
   ========================================================================== */
function initInteractiveTerminal() {
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  const body = document.getElementById('terminalBody');
  if (!input || !output) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
      <div class="t-line">Available commands:</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">skills</span>         - List Clifton's technical skills</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">experience</span>     - View professional role at Stackly & track record</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">projects</span>       - View featured projects (Job Portal, Inventory, E-Commerce)</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">certifications</span> - View professional certifications (Oracle, Wipro, Rinex)</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">education</span>      - Display B.E. CSE and academic record</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">contact</span>        - Show direct email and mobile number</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">hire</span>           - Display availability for software engineering roles</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">theme</span>          - Cycle portfolio color scheme</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">whoami</span>         - Display current visitor session</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-highlight">clear</span>          - Clear terminal window</div>
    `,
    skills: () => `
      <div class="t-line"><span class="t-highlight">[Backend & APIs]</span> Python (AsyncIO, OOP), FastAPI, REST APIs, SQL, Java</div>
      <div class="t-line"><span class="t-highlight">[Web Front-End]</span> HTML5, CSS3, JavaScript (DOM, Async, Responsive Layouts)</div>
      <div class="t-line"><span class="t-highlight">[Databases]</span>     SQL Relational Design, Query Optimization, Schema Architecture</div>
      <div class="t-line"><span class="t-highlight">[Soft Skills]</span>    Problem Solving, Time Management, Decision Making, Teamwork</div>
      <div class="t-line"><span class="t-highlight">[Spoken]</span>         English, Tamil</div>
    `,
    experience: () => `
      <div class="t-line">&bull; <span class="t-highlight">Backend Python Developer</span> @ <span class="t-success">Stackly</span> (Nov 2025 &mdash; Present)</div>
      <div class="t-line">&nbsp;&nbsp;&bull; Developing asynchronous RESTful APIs using FastAPI and Python</div>
      <div class="t-line">&nbsp;&nbsp;&bull; Designing optimized SQL queries, database migrations, and schema models</div>
      <div class="t-line">&nbsp;&nbsp;&bull; Implementing Pydantic validation & OpenAPI specifications</div>
    `,
    projects: () => `
      <div class="t-line">1. <span class="t-highlight">Job Portal</span> &mdash; Full functional recruitment hub (HTML, CSS, JS, SQL)</div>
      <div class="t-line">2. <span class="t-highlight">Inventory Management System</span> &mdash; Real-time stock & order tracking in Java & SQL</div>
      <div class="t-line">3. <span class="t-highlight">E-Commerce Platform</span> &mdash; Online transaction portal with Auth & Payments in Java/SQL</div>
      <div class="t-line text-muted">Click 'Projects' in the navigation bar to read full architecture details.</div>
    `,
    certifications: () => `
      <div class="t-line">&bull; <span class="t-highlight">Database Programming on SQL</span> &mdash; Oracle Academy</div>
      <div class="t-line">&bull; <span class="t-highlight">Java Full Stack Completion</span> &mdash; Wipro TalentNext</div>
      <div class="t-line">&bull; <span class="t-highlight">Front End Web Development</span> &mdash; Rinex Technologies</div>
    `,
    education: () => `
      <div class="t-line">&bull; <span class="t-highlight">B.E. Computer Science and Engineering</span> &mdash; Rajalakshmi Engineering College (7.58 CGPA, 2020-2024)</div>
      <div class="t-line">&bull; <span class="t-highlight">Class XII (CBSE)</span> &mdash; Francis Xavier's School (76.6%, 2019-2020)</div>
      <div class="t-line">&bull; <span class="t-highlight">Class X (State Board)</span> &mdash; St. Xavier's Matric. Hr. Sec. School (87.6%, 2017-2018)</div>
    `,
    contact: () => `
      <div class="t-line">Email: <span class="t-highlight">cliftondanish3@gmail.com</span></div>
      <div class="t-line">Phone: <span class="t-highlight">+91 936-181-2603</span></div>
      <div class="t-line">Location: Chennai, Tamil Nadu - 600063</div>
      <div class="t-line">LinkedIn: <a href="https://www.linkedin.com/in/clifton-danish-j-1234567890cd" target="_blank" class="t-highlight">linkedin.com/in/clifton-danish-j-1234567890cd</a></div>
      <div class="t-line">GitHub: <a href="https://github.com/cliftondanish-pixel" target="_blank" class="t-highlight">github.com/cliftondanish-pixel</a></div>
    `,
    hire: () => `
      <div class="t-line t-success">✓ STATUS: Actively seeking Software Developer & Engineering roles.</div>
      <div class="t-line">Available: Immediate start. Location: Chennai / Remote / Open to Relocation.</div>
      <div class="t-line text-muted">Send an email to cliftondanish3@gmail.com or submit the contact form below.</div>
    `,
    whoami: () => `
      <div class="t-line">recruiter@clifton-portfolio:guest-tier [Authorized to explore & hire]</div>
    `,
    theme: () => {
      cycleTheme();
      return `<div class="t-line t-success">Theme updated successfully!</div>`;
    },
    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      const cmd = rawCmd.toLowerCase();

      if (rawCmd) {
        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;

        // Render user line
        const userLine = document.createElement('div');
        userLine.className = 't-line';
        userLine.innerHTML = `<span class="t-prompt">clifton@portfolio:~$</span> ${escapeHTML(rawCmd)}`;
        output.appendChild(userLine);

        // Process command
        if (cmd === 'clear') {
          commands.clear();
        } else if (commands[cmd]) {
          const res = commands[cmd]();
          if (res) {
            const respDiv = document.createElement('div');
            respDiv.innerHTML = res;
            output.appendChild(respDiv);
          }
        } else {
          const errDiv = document.createElement('div');
          errDiv.className = 't-line t-error';
          errDiv.textContent = `command not found: "${rawCmd}". Type "help" for a list of valid commands.`;
          output.appendChild(errDiv);
        }

        input.value = '';
        body.scrollTop = body.scrollHeight;
      }
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

/* ==========================================================================
   6. Project Modals & Case Studies
   ========================================================================== */
function initProjectModals() {
  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDynamicContent = document.getElementById('modalDynamicContent');

  const resumeModal = document.getElementById('resumeModal');
  const resumeModalBtn = document.getElementById('resumeModalBtn');
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');

  const studies = {
    jobportal: {
      title: 'Job Portal Web Application',
      subtitle: 'Dynamic recruitment platform connecting candidates and employers',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'SQL Database', 'DOM Manipulation'],
      overview: 'Developed a fully functional recruitment application providing seamless interaction between job seekers and employers. Built with clean, accessible HTML5, responsive CSS3 styling, interactive JavaScript for client-side validation, and a relational SQL database.',
      challenges: [
        'Organizing structured SQL relational tables for user credentials, employer profiles, and dynamic job postings.',
        'Creating responsive candidate search filters without page reloads.',
        'Ensuring clean form validation for resume submissions and employer registrations.'
      ],
      solutions: [
        'Structured normalized SQL schemas with primary/foreign key relations for fast, indexed queries.',
        'Utilized JavaScript DOM events to deliver real-time feedback on application status.',
        'Engineered responsive mobile-friendly layouts using CSS Flexbox and Grid.'
      ],
      outcome: 'Resulted in an intuitive, fully operational job portal successfully demonstrated and validated during academic reviews.'
    },
    inventory: {
      title: 'Inventory Management System',
      subtitle: 'Enterprise stock monitoring and order fulfillment software',
      tech: ['Java', 'SQL', 'OOP Concepts', 'JDBC / Data Processing', 'Unit Testing'],
      overview: 'Designed and implemented an inventory management application that enables businesses to track stock levels, record product entries, and manage incoming customer orders efficiently.',
      challenges: [
        'Preventing inventory race conditions or inconsistent data states during concurrent order processing.',
        'Executing fast batch SQL queries for low-stock reporting.',
        'Validating business rules across different user access permissions.'
      ],
      solutions: [
        'Leveraged Java Object-Oriented principles (encapsulation, abstraction, and clean model classes) for robust business logic.',
        'Constructed optimized SQL transaction routines to update stock counts safely upon order confirmation.',
        'Collaborated with peers to execute rigorous unit and system integration testing.'
      ],
      outcome: 'Delivered a highly reliable application reducing manual inventory counting errors and accelerating order tracking.'
    },
    ecommerce: {
      title: 'E-Commerce Web Application',
      subtitle: 'Online shopping platform featuring authentication and order transactions',
      tech: ['Java', 'SQL', 'HTML5', 'CSS3', 'JavaScript', 'User Authentication'],
      overview: 'Contributed to the development of a comprehensive e-commerce platform facilitating secure online transactions, catalog browsing, shopping cart management, and payment verification.',
      challenges: [
        'Implementing secure user authentication and session management.',
        'Coordinating payment processing flows between UI actions and backend order registers.',
        'Designing a smooth, responsive shopping cart experience on mobile and desktop.'
      ],
      solutions: [
        'Integrated Java backend controllers with SQL databases to verify credentials and store encrypted password hashes.',
        'Built dynamic product card rendering and quantity adjusters using JavaScript.',
        'Enhanced UI aesthetics with modern CSS transitions and accessible form elements.'
      ],
      outcome: 'Achieved an end-to-end shopping workflow praised for ease of use, security, and fluid user experience.'
    }
  };

  document.querySelectorAll('.view-details-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const study = studies[key];
      if (!study) return;

      modalDynamicContent.innerHTML = `
        <h2 style="font-size: 1.5rem; margin-bottom: 6px; color: var(--text-main);">${study.title}</h2>
        <p style="color: var(--accent-secondary); font-size: 0.95rem; margin-bottom: 20px;">${study.subtitle}</p>
        
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
          ${study.tech.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>

        <section style="margin-bottom: 20px;">
          <h4 style="color: var(--accent-primary); font-size: 1rem; text-transform: uppercase; margin-bottom: 6px;">Project Overview</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${study.overview}</p>
        </section>

        <section style="margin-bottom: 20px;">
          <h4 style="color: var(--accent-primary); font-size: 1rem; text-transform: uppercase; margin-bottom: 8px;">Key Technical Challenges</h4>
          <ul style="list-style: none; padding-left: 0;">
            ${study.challenges.map((c) => `<li style="position: relative; padding-left: 20px; color: var(--text-muted); margin-bottom: 8px; font-size: 0.95rem;"><span style="position: absolute; left: 0; color: #ef4444;">✕</span>${c}</li>`).join('')}
          </ul>
        </section>

        <section style="margin-bottom: 20px;">
          <h4 style="color: var(--accent-primary); font-size: 1rem; text-transform: uppercase; margin-bottom: 8px;">Implementation & Solutions</h4>
          <ul style="list-style: none; padding-left: 0;">
            ${study.solutions.map((s) => `<li style="position: relative; padding-left: 20px; color: var(--text-muted); margin-bottom: 8px; font-size: 0.95rem;"><span style="position: absolute; left: 0; color: #10b981;">✓</span>${s}</li>`).join('')}
          </ul>
        </section>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 18px; margin-top: 24px;">
          <h4 style="color: #34d399; font-size: 0.95rem; margin-bottom: 4px;">Project Result & Impact</h4>
          <p style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 0;">${study.outcome}</p>
        </div>
      `;

      caseStudyModal.classList.add('active');
    });
  });

  // Modal close handlers
  if (modalCloseBtn && modalBackdrop) {
    [modalCloseBtn, modalBackdrop].forEach((el) => {
      el.addEventListener('click', () => {
        caseStudyModal.classList.remove('active');
      });
    });
  }

  // Resume modal handlers
  if (resumeModalBtn && resumeModal) {
    resumeModalBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });

    [resumeCloseBtn, resumeModalBackdrop].forEach((el) => {
      el.addEventListener('click', () => {
        resumeModal.classList.remove('active');
      });
    });
  }

  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
      showToast('✓ Downloading Clifton_Danish_Resume.pdf...', 'success');
    });
  }

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      caseStudyModal.classList.remove('active');
      resumeModal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   7. Theme Accent Switcher
   ========================================================================== */
const themes = ['dark', 'cyber', 'midnight'];

function initThemeSwitcher() {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    cycleTheme();
  });
}

function cycleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const nextIdx = (themes.indexOf(current) + 1) % themes.length;
  const nextTheme = themes[nextIdx];

  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);

  const themeNames = {
    dark: 'Sleek Dark Glow',
    cyber: 'Cyberpunk Emerald & Azure',
    midnight: 'Midnight Obsidian & Rose'
  };

  showToast(`Switched palette to: ${themeNames[nextTheme]}`, 'info');
}

/* ==========================================================================
   8. Contact Form & Toast Notifications
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitContactBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Reset errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    if (!nameInput.value.trim()) {
      document.getElementById('nameError').textContent = 'Please provide your name';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address';
      valid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      document.getElementById('messageError').textContent = 'Please write a message with at least 10 characters';
      valid = false;
    }

    if (!valid) return;

    // Simulate sending state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting message...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span class="btn-text">Send Message to Clifton</span> <span class="btn-icon">⚡</span>`;
      form.reset();
      showToast('✓ Message received! Clifton will follow up within 24 hours.', 'success');
    }, 1100);
  });
}

/* ==========================================================================
   9. Email Copy & Utility Interactions
   ========================================================================== */
function initUtilityInteractions() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: cliftondanish3@gmail.com', 'success');
      }).catch(() => {
        showToast(`Email: ${email}`, 'info');
      });
    });
  }
}

/* Toast Dispatcher */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === 'success' ? '⚡' : '💡';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
