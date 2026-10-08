(() => {
  const KEY = 'spark-site-demo-content-v1';
  const defaults = {
    siteName: 'Northstar Coffee', navLabel: 'Northstar Coffee',
    heroTitle: 'A good cup,\nmade slowly.', heroText: 'Coffee with a little more care. We roast honest, seasonal beans and make space for the everyday ritual.',
    ctaText: 'Explore the coffee', heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
    aboutTitle: 'Rooted in craft, made for every day.', aboutText: 'We started Northstar with a simple idea: coffee should be a pleasure, not a puzzle. We partner with thoughtful growers, roast in small batches, and keep things warm, welcoming, and uncomplicated.',
    email: 'hello@northstar.coffee', location: '18 Willow Lane, Portland', instagram: 'https://instagram.com', accent: '#a44f31',
    products: [
      {name:'Daybreak Blend',description:'Chocolate, orange, and a soft caramel finish. Your everyday favorite.',price:'$18',image:'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=900&q=80'},
      {name:'Solstice Single Origin',description:'Bright, balanced, and full of stone fruit sweetness.',price:'$22',image:'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80'},
      {name:'After Hours Decaf',description:'All the warmth, none of the buzz. Smooth and naturally sweet.',price:'$19',image:'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'}
    ]
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  const load = () => { try { return {...clone(defaults), ...JSON.parse(localStorage.getItem(KEY) || '{}')}; } catch { return clone(defaults); } };
  let data = load();
  const form = document.querySelector('#editor-form');
  const status = document.querySelector('#save-status');
  const preview = document.querySelector('.preview-frame');
  function fill() {
    form.querySelectorAll('[data-path]').forEach(input => { input.value = data[input.dataset.path] ?? ''; });
    renderProducts();
  }
  function renderProducts() {
    const wrap = document.querySelector('#products-list');
    wrap.innerHTML = '';
    data.products.forEach((product, index) => {
      const box = document.createElement('div'); box.className = 'product-editor';
      box.innerHTML = `<div class="product-editor-header"><span>Product ${index + 1}</span><button class="btn btn-sm btn-link text-danger p-0" type="button" data-remove="${index}" aria-label="Remove product">Remove</button></div>
        <div class="row g-3"><div class="col-md-6"><label class="form-label">Product name</label><input class="form-control" data-product="name" data-index="${index}" value=""></div><div class="col-md-6"><label class="form-label">Price</label><input class="form-control" data-product="price" data-index="${index}" value=""></div><div class="col-12"><label class="form-label">Description</label><textarea class="form-control" rows="2" data-product="description" data-index="${index}"></textarea></div><div class="col-12"><label class="form-label">Image URL</label><input class="form-control" data-product="image" data-index="${index}" value=""></div></div>`;
      wrap.append(box);
      box.querySelectorAll('[data-product]').forEach(input => { input.value = product[input.dataset.product] || ''; });
    });
  }
  function syncPreview() { if (preview.contentWindow) preview.contentWindow.postMessage({type:'spark-site-preview',data}, '*'); }
  form.addEventListener('input', event => {
    const target = event.target;
    if (target.dataset.path) data[target.dataset.path] = target.value;
    if (target.dataset.product) data.products[Number(target.dataset.index)][target.dataset.product] = target.value;
    syncPreview(); status.textContent = 'Unsaved changes';
  });
  document.querySelector('#products-list').addEventListener('click', event => {
    const button = event.target.closest('[data-remove]'); if (!button) return;
    data.products.splice(Number(button.dataset.remove), 1); renderProducts(); syncPreview(); status.textContent='Unsaved changes';
  });
  document.querySelector('#add-product').addEventListener('click', () => {
    data.products.push({name:'New coffee',description:'Add a short product description.',price:'$18',image:''}); renderProducts(); syncPreview(); status.textContent='Unsaved changes';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    try { localStorage.setItem(KEY, JSON.stringify(data)); status.textContent = 'Saved. The website is up to date.'; syncPreview(); }
    catch { status.textContent = 'Could not save. Try using smaller image URLs.'; }
  });
  document.querySelector('#sidebar-toggle')?.addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('show'));
  fill();
  preview.addEventListener('load', syncPreview);
})();
