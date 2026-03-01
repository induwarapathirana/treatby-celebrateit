import './style.css';
import { PLATTERS } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Populate Platters on Home Page
  const grid = document.getElementById('platter-grid');
  if (grid) {
    PLATTERS.forEach(platter => {
      const card = document.createElement('div');
      card.className = 'platter-card';

      const contentsListHtml = platter.contents.map(item => `<li>${item}</li>`).join('');

      card.innerHTML = `
        <img src="${platter.imageUrl}" alt="${platter.name}" class="platter-img">
        <div class="platter-content">
          <h3 class="platter-title">${platter.name}</h3>
          <p class="platter-price">$${platter.price.toFixed(2)}</p>
          <p class="platter-desc">${platter.description}</p>
          <ul class="platter-contents-list">
            ${contentsListHtml}
          </ul>
          <a href="/customize.html" class="btn btn-outline" style="text-align: center; width: 100%; margin-top: auto;">Select This Base</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }
});
