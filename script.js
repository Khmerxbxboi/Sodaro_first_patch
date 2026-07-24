const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});

const projectModal = document.getElementById('project-modal');
const featureModal = document.getElementById('feature-modal');
const featureContent = document.getElementById('feature-modal-content');

const featureData = {
  assistant: {
    eyebrow: 'AI business assistant',
    title: 'Ask questions in plain language.',
    body: 'Business owners can ask about permits, licenses, city services, grants, and next steps without searching across multiple government websites.'
  },
  inspection: {
    eyebrow: 'Photo inspection check',
    title: 'Check possible issues before the inspector arrives.',
    body: 'A business owner photographs a storefront, sign, entrance, workspace, or outdoor setup. Sodaro reviews visible conditions, connects them to relevant city-code guidance, and explains what may need attention. Results are guidance, not an official inspection decision.'
  },
  alerts: {
    eyebrow: 'City code alerts',
    title: 'Stay informed when requirements change.',
    body: 'Location-based alerts notify users about updated inspection rules, permit deadlines, closures, and city requirements that may affect their business.'
  },
  opportunities: {
    eyebrow: 'Local opportunities',
    title: 'Bring useful programs into one view.',
    body: 'Sodaro organizes grants, workshops, events, local vendors, and community resources around the owner’s business type, neighborhood, and goals.'
  }
};

function openModal(modal) {
  if (typeof modal.showModal === 'function') modal.showModal();
}

function closeModal(modal) {
  if (modal.open) modal.close();
}

document.querySelectorAll('[data-open-modal="project-modal"]').forEach(button => {
  button.addEventListener('click', () => openModal(projectModal));
});

document.querySelectorAll('.feature-card').forEach(button => {
  button.addEventListener('click', () => {
    const data = featureData[button.dataset.feature];
    featureContent.innerHTML = `
      <p class="eyebrow">${data.eyebrow}</p>
      <h2>${data.title}</h2>
      <p>${data.body}</p>
    `;
    openModal(featureModal);
  });
});

document.querySelectorAll('.modal-close').forEach(button => {
  button.addEventListener('click', () => closeModal(button.closest('dialog')));
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeModal(dialog);
  });
});
