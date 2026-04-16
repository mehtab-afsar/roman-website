const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, Number(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// Contact form
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-submit');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    status.textContent = '';

    const data = {
      name: form.name.value,
      organisation: form.organisation.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        submitBtn.textContent = 'Message sent';
        status.textContent = 'Thank you — I will be in touch shortly.';
        status.style.color = 'var(--gold)';
      } else {
        throw new Error('Server error');
      }
    } catch {
      submitBtn.textContent = 'Start a conversation';
      submitBtn.disabled = false;
      status.textContent = 'Something went wrong. Please email roman@romangaus.com directly.';
      status.style.color = 'var(--ink-faint)';
    }
  });
}
