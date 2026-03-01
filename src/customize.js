import './style.css';
import { CUSTOM_ITEMS, EMAIL_CONFIG } from './config.js';
import emailjs from '@emailjs/browser';

let cart = {};

document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Load items
    renderCustomItems();

    // Modal handlers
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('checkout-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const orderForm = document.getElementById('order-form');

    checkoutBtn.addEventListener('click', () => {
        if (Object.keys(cart).length === 0) return;
        modal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleOrderSubmit();
    });
});

function renderCustomItems() {
    const container = document.getElementById('custom-items-container');
    if (!container) return; // not on customize page

    CUSTOM_ITEMS.forEach(categoryMap => {
        const categoryHtml = document.createElement('div');
        categoryHtml.className = 'category-section';

        let itemsHtml = categoryMap.items.map(item => `
      <div class="item-card">
        <img src="${item.imageUrl}" alt="${item.name}" class="item-img">
        <div class="item-info">
          <div class="item-title">${item.name}</div>
          <div class="item-price">$${item.price.toFixed(2)} /ea</div>
        </div>
        <div class="quantity-controls">
          <button class="qty-btn" onclick="updateCart('${item.id}', -1)">-</button>
          <span class="qty-display" id="qty-${item.id}">0</span>
          <button class="qty-btn" onclick="updateCart('${item.id}', 1)">+</button>
        </div>
      </div>
    `).join('');

        categoryHtml.innerHTML = `
      <h3 class="category-title">${categoryMap.category}</h3>
      ${itemsHtml}
    `;

        container.appendChild(categoryHtml);
    });

    // Attach updateCart to window so inline onclick works
    window.updateCart = updateCart;
}

function updateCart(itemId, change) {
    // Find item
    let itemDef = null;
    CUSTOM_ITEMS.forEach(cat => {
        const found = cat.items.find(i => i.id === itemId);
        if (found) itemDef = found;
    });

    if (!itemDef) return;

    const currentQty = cart[itemId]?.qty || 0;
    let newQty = currentQty + change;
    if (newQty < 0) newQty = 0;

    if (newQty === 0) {
        delete cart[itemId];
    } else {
        cart[itemId] = { ...itemDef, qty: newQty };
    }

    // Update DOM quantity display for item
    const qtyDisplay = document.getElementById(`qty-${itemId}`);
    if (qtyDisplay) qtyDisplay.textContent = newQty;

    renderCartSidebar();
}

function renderCartSidebar() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceNode = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    let html = '';
    let grandTotal = 0;

    const itemKeys = Object.keys(cart);

    if (itemKeys.length === 0) {
        html = `<p style="color: #888; text-align: center; margin-top: 2rem;">Your platter is empty.</p>`;
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.pointerEvents = 'none';
    } else {
        itemKeys.forEach(key => {
            const lineTotal = cart[key].qty * cart[key].price;
            grandTotal += lineTotal;
            html += `
        <div class="cart-item">
          <span>${cart[key].qty}x ${cart[key].name}</span>
          <span>$${lineTotal.toFixed(2)}</span>
        </div>
      `;
        });
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.pointerEvents = 'auto';
    }

    cartItemsContainer.innerHTML = html;
    cartTotalPriceNode.textContent = `$${grandTotal.toFixed(2)}`;
}

async function handleOrderSubmit() {
    const submitBtn = document.getElementById('submit-order-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const neededDate = document.getElementById('neededDate').value;

    // Format cart items into an HTML table for the email template
    let orderDetailsHtml = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-family: sans-serif;">
        <thead>
          <tr style="background-color: #7851A9; color: white;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
            <th style="padding: 10px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
    `;

    let total = 0;
    Object.values(cart).forEach(item => {
        const linePrice = item.qty * item.price;
        total += linePrice;
        orderDetailsHtml += `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px;">${item.name}</td>
            <td style="padding: 10px; text-align: center;">${item.qty}</td>
            <td style="padding: 10px; text-align: right;">$${item.price.toFixed(2)}</td>
            <td style="padding: 10px; text-align: right;">$${linePrice.toFixed(2)}</td>
          </tr>
        `;
    });

    orderDetailsHtml += `
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Grand Total:</td>
            <td style="padding: 10px; text-align: right; font-weight: bold; color: #FF7F50;">$${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    `;

    // Add extra customer details to the HTML
    orderDetailsHtml += `
      <div style="margin-top: 20px; font-family: sans-serif; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
        <h4 style="margin-top: 0; color: #7851A9;">Order & Contact Details:</h4>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin: 5px 0;"><strong>Needed Date:</strong> ${neededDate}</p>
      </div>
    `;

    const templateParams = {
        to_name: "Celebrateit Team", // You will setup sender in emailjs dash
        customer_name: name,
        customer_email: email,
        order_details_html: orderDetailsHtml,
    };

    try {
        // If not configured, we'll mimic success visually and print error in console
        if (EMAIL_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
            console.warn("EmailJS is not configured. Replace YOUR_SERVICE_ID in config.js to enable real emails. Payload:", templateParams);
            showToastAndReset();
        } else {
            await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams, EMAIL_CONFIG.publicKey);
            showToastAndReset();
        }
    } catch (error) {
        console.error("Failed to place order via EmailJS", error);
        alert("Could not place order. Please check EmailJS configuration.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Confirm Order";
    }
}

function showToastAndReset() {
    document.getElementById('checkout-modal').classList.remove('active');
    const toast = document.getElementById('toast');
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);

    // Clear Form and reset cart
    document.getElementById('order-form').reset();
    cart = {};

    // Reset UI quantities
    const qtyDisplays = document.querySelectorAll('.qty-display');
    qtyDisplays.forEach(node => node.textContent = '0');

    renderCartSidebar();
}
