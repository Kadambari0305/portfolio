/* ==========================================================================
   KADAMBARI MARNE - SOFTWARE ENGINEERING PORTFOLIO SCRIPT
   Interactivity: Theme Toggle, Avatar Switcher, Category Filters,
   Interactive Project Live Simulators, Copy Email, Resume Viewer & Form Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. THEME SWITCHER (Dark / Light Mode)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlTag = document.documentElement;

  // Saved theme or default dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlTag.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlTag.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} theme mode`);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'light') {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#F59E0B';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '#38BDF8';
    }
  }

  /* ------------------------------------------------------------------------
     2. MOBILE NAVIGATION TOGGLE & SMOOTH SCROLL
     ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      navLinks.classList.remove('active');
    });
  });

  /* ------------------------------------------------------------------------
     4. COPY EMAIL ACTION
     ------------------------------------------------------------------------ */
  const copyEmailChip = document.getElementById('copy-email-chip');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = "kadambari.marne@gmail.com";

  function copyEmailToClipboard() {
    navigator.clipboard.writeText(emailText).then(() => {
      showToast("Email address copied to clipboard!");
    }).catch(err => {
      showToast("Email: " + emailText);
    });
  }

  if (copyEmailChip) copyEmailChip.addEventListener('click', copyEmailToClipboard);
  if (copyEmailBtn) copyEmailBtn.addEventListener('click', copyEmailToClipboard);

  /* ------------------------------------------------------------------------
     5. SKILLS CATEGORY FILTER TABS
     ------------------------------------------------------------------------ */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-category');
      skillCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. INTERACTIVE PROJECT LIVE DEMO SIMULATORS MODAL
     ------------------------------------------------------------------------ */
  const demoModal = document.getElementById('demo-modal');
  const closeDemoModalBtn = document.getElementById('close-demo-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalContent = document.getElementById('modal-project-content');

  const demoSimulators = {
    chatbot: {
      title: "Data Analysis Hub — Python NLP Dataset Query Chatbot Simulator",
      render: () => `
        <div class="simulator-wrapper" style="background: #0B1120; padding: 1.5rem; border-radius: 12px; color: #FFF;">
          <p style="font-size: 0.9rem; color: #94A3B8; margin-bottom: 1rem;">
            Ask the Python Data Analytics Chatbot a natural language question about sample sales/meteorological datasets:
          </p>
          <div style="margin-bottom: 1rem;">
            <input type="text" id="sim-chatbot-query" value="Show monthly sales trends for Q1 2026 and highlight top revenue regions" style="width:100%; padding: 0.7rem; border-radius: 6px; border: 1px solid #334155; background: #1E293B; color: #FFF; font-size:0.88rem;" />
          </div>
          <button id="sim-query-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-brain"></i> Execute Dataset Query</button>

          <div id="sim-chatbot-output" style="margin-top: 1.2rem; padding: 1rem; background: #000; border-radius: 8px; font-family: 'Fira Code', monospace; font-size: 0.84rem; border-left: 3px solid #38BDF8; max-height: 180px; overflow-y: auto;">
            <div style="color: #4ADE80;">[SYSTEM] Data Analysis Hub Engine initialized... Loaded pandas DataFrame (12,450 rows).</div>
          </div>
        </div>
      `,
      init: () => {
        const queryBtn = document.getElementById('sim-query-btn');
        const output = document.getElementById('sim-chatbot-output');

        queryBtn.addEventListener('click', () => {
          const q = document.getElementById('sim-chatbot-query').value;
          output.innerHTML += `<div style="color: #F59E0B; margin-top:0.4rem;">[USER QUERY] "${q}"</div>`;
          output.innerHTML += `<div style="color: #38BDF8;">[NLP TOKENIZER] Extracted intent: TREND_ANALYSIS | Entities: ['Q1 2026', 'Sales']</div>`;
          output.innerHTML += `<div style="color: #4ADE80;">[INSIGHTS GENERATED] Q1 Growth: +24.8% YoY. Top Region: West Zone (₹14.2M). Variance Index: 0.04</div>`;
          output.scrollTop = output.scrollHeight;
        });
      }
    },
    barter: {
      title: "ShadowBarter — Anonymous Barter Platform (Live App & Simulator)",
      render: () => `
        <div class="simulator-wrapper" style="background: #0B1120; padding: 1.5rem; border-radius: 12px; color: #FFF;">
          <div style="margin-bottom: 1.2rem; padding: 1rem; background: linear-gradient(135deg, rgba(255, 122, 0, 0.2), rgba(99, 102, 241, 0.15)); border-radius: 8px; border: 1px solid var(--accent-orange); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #FFF; font-size: 0.95rem;"><i class="fa-solid fa-rocket text-accent"></i> Deployed Live Render Web App</strong>
              <p style="color: #94A3B8; font-size: 0.82rem; margin-top: 0.2rem;">Full-stack MERN anonymous item bartering platform live online.</p>
            </div>
            <a href="https://anonymous-barter-system.onrender.com/" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live App
            </a>
          </div>

          <p style="font-size: 0.9rem; color: #94A3B8; margin-bottom: 1rem;">
            Or test the anonymous trade proposal algorithm below:
          </p>
          <div style="display: flex; gap: 0.8rem; margin-bottom: 1.2rem;">
            <input type="text" id="sim-my-item" value="Mechanical Keyboard RGB" style="flex:1; padding: 0.6rem; border-radius: 6px; border: 1px solid #334155; background: #1E293B; color: #FFF;" />
            <input type="text" id="sim-target-item" value="Wireless Gaming Mouse" style="flex:1; padding: 0.6rem; border-radius: 6px; border: 1px solid #334155; background: #1E293B; color: #FFF;" />
          </div>
          <button id="sim-propose-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-paper-plane"></i> Propose Anonymous Trade</button>
          
          <div id="sim-trade-log" style="margin-top: 1.2rem; padding: 1rem; background: #000; border-radius: 8px; font-family: 'Fira Code', monospace; font-size: 0.82rem; border-left: 3px solid #38BDF8; max-height: 180px; overflow-y: auto;">
            <div style="color: #4ADE80;">[SYSTEM] Anonymous Barter Engine Initialized...</div>
            <div style="color: #94A3B8;">[STATUS] Peer-to-Peer Encryption Key: RSA-2048 Ready.</div>
          </div>
        </div>
      `,
      init: () => {
        const proposeBtn = document.getElementById('sim-propose-btn');
        const tradeLog = document.getElementById('sim-trade-log');
        
        proposeBtn.addEventListener('click', () => {
          const myItem = document.getElementById('sim-my-item').value;
          const targetItem = document.getElementById('sim-target-item').value;
          
          const timestamp = new Date().toLocaleTimeString();
          tradeLog.innerHTML += `<div style="color: #F59E0B; margin-top:0.4rem;">[${timestamp}] Trading "${myItem}" ⇄ "${targetItem}"</div>`;
          tradeLog.innerHTML += `<div style="color: #38BDF8;">[MATCHING] Searching anonymous counter-party... Match Found (98% match)!</div>`;
          tradeLog.innerHTML += `<div style="color: #4ADE80;">[SUCCESS] Anonymous Trade Proposal Sent successfully. ID: #TRD-${Math.floor(Math.random()*90000+10000)}</div>`;
          tradeLog.scrollTop = tradeLog.scrollHeight;
        });
      }
    },

    vivek: {
      title: "Vivek Raksha — Senior Citizen Online Banking & Cyber Fraud Protection (Live App & Simulator)",
      render: () => `
        <div class="simulator-wrapper" style="background: #0B1120; padding: 1.5rem; border-radius: 12px; color: #FFF;">
          <div style="margin-bottom: 1.2rem; padding: 1rem; background: linear-gradient(135deg, rgba(255, 122, 0, 0.2), rgba(56, 189, 248, 0.15)); border-radius: 8px; border: 1px solid var(--accent-orange); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #FFF; font-size: 0.95rem;"><i class="fa-solid fa-rocket text-accent"></i> Deployed Live Vercel Web App</strong>
              <p style="color: #94A3B8; font-size: 0.82rem; margin-top: 0.2rem;">Full-featured digital safety &amp; cyber fraud learning platform live online.</p>
            </div>
            <a href="https://vivek-raksha.vercel.app/" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live App
            </a>
          </div>

          <p style="font-size: 0.9rem; color: #94A3B8; margin-bottom: 1rem;">
            Or test the Senior Citizen Cyber Fraud Detection Engine below. Paste a suspicious SMS message or banking link:
          </p>
          <div style="margin-bottom: 1rem;">
            <input type="text" id="sim-fraud-input" value="URGENT: Your SBI Bank Account will be blocked today! Click http://sbi-verify-kyc-update.com to update OTP." style="width:100%; padding: 0.7rem; border-radius: 6px; border: 1px solid #334155; background: #1E293B; color: #FFF; font-size:0.88rem;" />
          </div>
          <div style="display: flex; gap: 0.8rem; margin-bottom: 1.2rem;">
            <button id="sim-analyze-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-shield-cat"></i> Analyze Message for Fraud</button>
            <button id="sim-guide-btn" class="btn btn-secondary btn-sm"><i class="fa-solid fa-book-open-reader"></i> Senior Banking Safety Guide</button>
          </div>
          
          <div id="sim-safety-screen" style="padding: 1rem; background: #1E293B; border-radius: 8px; font-size: 0.9rem;">
            <div style="font-weight: 700; color: #38BDF8;"><i class="fa-solid fa-user-shield"></i> Vivek Raksha Fraud Guard Status</div>
            <div id="sim-fraud-result" style="margin-top: 0.8rem; font-family: 'Fira Code', monospace; font-size: 0.84rem; color: #4ADE80;">
              Click "Analyze Message" to test scam detection...
            </div>
          </div>
        </div>
      `,
      init: () => {
        const analyzeBtn = document.getElementById('sim-analyze-btn');
        const guideBtn = document.getElementById('sim-guide-btn');
        const resultBox = document.getElementById('sim-fraud-result');

        analyzeBtn.addEventListener('click', () => {
          const inputVal = document.getElementById('sim-fraud-input').value;
          if (inputVal.toLowerCase().includes('http') || inputVal.toLowerCase().includes('otp') || inputVal.toLowerCase().includes('block')) {
            resultBox.innerHTML = `
              <span style="color: #EF4444; font-weight:700;">[HIGH FRAUD RISK DETECTED ⚠️]</span><br/>
              • Fake Domain: "sbi-verify-kyc-update.com" (Phishing link targeting senior citizens)<br/>
              • Urgency Threat: Banks NEVER ask for OTP or KYC via SMS links.<br/>
              <span style="color: #F59E0B; font-weight:600;">➡️ Advisory: DO NOT click. Block & Report to Cyber Crime Helpline (1930).</span>
            `;
          } else {
            resultBox.innerHTML = `<span style="color: #4ADE80;">[SAFE] Message contains no known financial fraud triggers.</span>`;
          }
        });

        guideBtn.addEventListener('click', () => {
          resultBox.innerHTML = `
            <span style="color: #38BDF8; font-weight:700;">[SENIOR CITIZEN BANKING RULEBOOK 📘]</span><br/>
            1. Never share 6-digit OTP or Card PIN with anyone.<br/>
            2. Official banks never call asking to download Anydesk or TeamViewer.<br/>
            3. Always verify UPI payments — money comes IN without entering PIN!
          `;
        });
      }
    },

    insignify: {
      title: "Insignify PDF — Interactive Signature Sandbox & Live Streamlit App",
      render: () => `
        <div class="simulator-wrapper" style="background: #0B1120; padding: 1.5rem; border-radius: 12px; color: #FFF;">
          <div style="margin-bottom: 1.2rem; padding: 1rem; background: linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(99, 102, 241, 0.15)); border-radius: 8px; border: 1px solid var(--accent-cyan); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #FFF; font-size: 0.95rem;"><i class="fa-solid fa-rocket text-accent"></i> Deployed Live Streamlit Web App</strong>
              <p style="color: #94A3B8; font-size: 0.82rem; margin-top: 0.2rem;">Full-featured PDF processing, merging &amp; signing application live online.</p>
            </div>
            <a href="https://insigtify-pdf-fnmamgvrcsryr5qmkfv53w.streamlit.app/" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live App
            </a>
          </div>

          <p style="font-size: 0.9rem; color: #94A3B8; margin-bottom: 0.8rem;">
            Or draw your signature below to test in-browser canvas PDF signing:
          </p>
          <div style="background: #FFF; border-radius: 8px; padding: 4px; margin-bottom: 1rem;">
            <canvas id="sim-sig-canvas" width="450" height="130" style="width:100%; border: 1px dashed #CBD5E1; border-radius: 6px; cursor: crosshair; background: #FFFFFF;"></canvas>
          </div>
          <div style="display: flex; gap: 0.8rem;">
            <button id="sim-clear-sig" class="btn btn-outline btn-sm"><i class="fa-solid fa-eraser"></i> Clear Canvas</button>
            <button id="sim-stamp-sig" class="btn btn-secondary btn-sm"><i class="fa-solid fa-stamp"></i> Apply Digital Stamp to PDF</button>
          </div>
          <div id="sim-sig-out" style="margin-top: 1rem; font-size: 0.82rem; color: #4ADE80; font-family: 'Fira Code', monospace;"></div>
        </div>
      `,
      init: () => {
        const canvas = document.getElementById('sim-sig-canvas');
        const ctx = canvas.getContext('2d');
        let drawing = false;

        ctx.strokeStyle = "#0284C7";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        canvas.addEventListener('mousedown', (e) => {
          drawing = true;
          ctx.beginPath();
          ctx.moveTo(e.offsetX, e.offsetY);
        });

        canvas.addEventListener('mousemove', (e) => {
          if (drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
          }
        });

        window.addEventListener('mouseup', () => drawing = false);

        document.getElementById('sim-clear-sig').addEventListener('click', () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          document.getElementById('sim-sig-out').innerText = "";
        });

        document.getElementById('sim-stamp-sig').addEventListener('click', () => {
          document.getElementById('sim-sig-out').innerText = `[SUCCESS] Signature rendered & embedded into sample PDF at (x: 120, y: 450). Privacy preserved!`;
        });
      }
    },

    pizza: {
      title: "Pizza Shop — E-Commerce Application (Live App & Order Simulator)",
      render: () => `
        <div class="simulator-wrapper" style="background: #0B1120; padding: 1.5rem; border-radius: 12px; color: #FFF;">
          <div style="margin-bottom: 1.2rem; padding: 1rem; background: linear-gradient(135deg, rgba(255, 122, 0, 0.2), rgba(234, 179, 8, 0.15)); border-radius: 8px; border: 1px solid var(--accent-orange); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #FFF; font-size: 0.95rem;"><i class="fa-solid fa-rocket text-accent"></i> Deployed Live Render Web App</strong>
              <p style="color: #94A3B8; font-size: 0.82rem; margin-top: 0.2rem;">Full-stack Pizza Shop application live online.</p>
            </div>
            <a href="https://pizza-shop-master.onrender.com" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live App
            </a>
          </div>

          <p style="font-size: 0.9rem; color: #94A3B8; margin-bottom: 1rem;">
            Customize your pizza order to test real-time cart state management:
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.2rem;">
            <div>
              <label style="font-size: 0.82rem; color: #94A3B8; display:block; margin-bottom: 0.4rem;">Select Pizza</label>
              <select id="sim-pizza-type" style="width:100%; padding: 0.5rem; background: #1E293B; color: #FFF; border: 1px solid #334155; border-radius: 6px;">
                <option value="12">Artisanal Margherita (₹350)</option>
                <option value="15">Paneer Pepper Crunch (₹450)</option>
                <option value="18">Supreme Veggie Feast (₹520)</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.82rem; color: #94A3B8; display:block; margin-bottom: 0.4rem;">Add Toppings (+₹50 each)</label>
              <label style="display:block; font-size: 0.82rem;"><input type="checkbox" class="sim-topping" value="50" checked> Extra Cheese</label>
              <label style="display:block; font-size: 0.82rem;"><input type="checkbox" class="sim-topping" value="50"> Jalapeños &amp; Olives</label>
            </div>
          </div>

          <div style="background: #1E293B; padding: 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 0.82rem; color: #94A3B8;">Cart Total:</span>
              <div id="sim-cart-price" style="font-size: 1.4rem; font-weight: 800; color: #FF7A00;">₹400</div>
            </div>
            <button id="sim-checkout-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-cart-shopping"></i> Simulate Checkout</button>
          </div>
          <div id="sim-pizza-status" style="margin-top: 0.8rem; font-family: 'Fira Code', monospace; font-size: 0.82rem; color: #4ADE80;"></div>
        </div>
      `,
      init: () => {
        const typeSelect = document.getElementById('sim-pizza-type');
        const toppings = document.querySelectorAll('.sim-topping');
        const priceDisplay = document.getElementById('sim-cart-price');
        const checkoutBtn = document.getElementById('sim-checkout-btn');
        const statusBox = document.getElementById('sim-pizza-status');

        function calcTotal() {
          let base = parseInt(typeSelect.options[typeSelect.selectedIndex].text.match(/₹(\d+)/)[1]);
          toppings.forEach(t => {
            if (t.checked) base += 50;
          });
          priceDisplay.innerText = `₹${base}`;
        }

        typeSelect.addEventListener('change', calcTotal);
        toppings.forEach(t => t.addEventListener('change', calcTotal));

        checkoutBtn.addEventListener('click', () => {
          statusBox.innerHTML = `[ORDER CONFIRMED] Order #PZ-${Math.floor(Math.random()*9000+1000)} sent to Kitchen pipeline! Live status: Baking 🔥`;
        });
      }
    }
  };

  document.querySelectorAll('.open-demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const sim = demoSimulators[projKey];
      if (sim) {
        modalTitle.innerText = sim.title;
        modalContent.innerHTML = sim.render();
        sim.init();
        demoModal.classList.add('active');
      }
    });
  });

  closeDemoModalBtn.addEventListener('click', () => {
    demoModal.classList.remove('active');
  });

  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) demoModal.classList.remove('active');
  });

  /* ------------------------------------------------------------------------
     7. RESUME MODAL VIEWER (REMOVED PER USER REQUEST)
     ------------------------------------------------------------------------ */
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    const closeResumeModalBtn = document.getElementById('close-resume-modal');
    const btnNavResume = document.getElementById('btn-resume-nav');
    const btnHeroResume = document.getElementById('btn-hero-resume');

    function openResumeModal() {
      resumeModal.classList.add('active');
    }
    function closeResumeModal() {
      resumeModal.classList.remove('active');
    }

    if (btnNavResume) btnNavResume.addEventListener('click', openResumeModal);
    if (btnHeroResume) btnHeroResume.addEventListener('click', openResumeModal);
    if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  /* ------------------------------------------------------------------------
     8. CONTACT DETAILS & DIRECT EMAIL HELPERS
     ------------------------------------------------------------------------ */
  // Contact section features direct verified contact cards (Email, LinkedIn, GitHub, Phone, Location & Tech Stack)

  /* ------------------------------------------------------------------------
     9. TOAST NOTIFICATION HELPER
     ------------------------------------------------------------------------ */
  function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    toast.innerText = msg;
    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }

  /* ------------------------------------------------------------------------
     10. SKILL CATEGORY FILTER TABS HANDLER
     ------------------------------------------------------------------------ */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (skillTabs.length > 0) {
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const targetCategory = tab.getAttribute('data-category');

        skillCards.forEach(card => {
          const cardCat = card.getAttribute('data-cat');
          if (targetCategory === 'all' || cardCat === targetCategory) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

});
