(() => {
  const KEY='spark-site-demo-content-v1';
  const defaults={siteName:'Northstar Coffee',navLabel:'Northstar Coffee',heroTitle:'A good cup,\nmade slowly.',heroText:'Coffee with a little more care. We roast honest, seasonal beans and make space for the everyday ritual.',ctaText:'Explore the coffee',heroImage:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',aboutTitle:'Rooted in craft, made for every day.',aboutText:'We started Northstar with a simple idea: coffee should be a pleasure, not a puzzle. We partner with thoughtful growers, roast in small batches, and keep things warm, welcoming, and uncomplicated.',email:'hello@northstar.coffee',location:'18 Willow Lane, Portland',instagram:'https://instagram.com',accent:'#a44f31',products:[{name:'Daybreak Blend',description:'Chocolate, orange, and a soft caramel finish. Your everyday favorite.',price:'$18',image:'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=900&q=80'},{name:'Solstice Single Origin',description:'Bright, balanced, and full of stone fruit sweetness.',price:'$22',image:'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80'},{name:'After Hours Decaf',description:'All the warmth, none of the buzz. Smooth and naturally sweet.',price:'$19',image:'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'}]};
  function getData(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return defaults}}
  function render(data){
    document.querySelectorAll('[data-site="siteName"]').forEach(el=>el.textContent=data.siteName||defaults.siteName);
    document.querySelectorAll('[data-site="navLabel"]').forEach(el=>el.textContent=data.navLabel||defaults.navLabel);
    ['heroTitle','heroText','ctaText','aboutTitle','aboutText','email','location'].forEach(key=>document.querySelectorAll(`[data-site="${key}"]`).forEach(el=>el.textContent=data[key]||''));
    document.querySelector('#hero-image').src=data.heroImage||defaults.heroImage;
    document.querySelector('#email-link').href=`mailto:${data.email||defaults.email}`;
    document.querySelector('#instagram-link').href=data.instagram||defaults.instagram;
    document.documentElement.style.setProperty('--accent',data.accent||defaults.accent);
    const grid=document.querySelector('#product-grid');grid.innerHTML='';
    (data.products||[]).forEach(product=>{const article=document.createElement('article');article.className='product';article.innerHTML='<img alt="" loading="lazy"><div class="product-content"><h3></h3><p></p><div class="price"></div></div>';article.querySelector('img').src=product.image||data.heroImage||defaults.heroImage;article.querySelector('h3').textContent=product.name||'';article.querySelector('p').textContent=product.description||'';article.querySelector('.price').textContent=product.price||'';grid.append(article)});
    if(!grid.children.length)grid.innerHTML='<div class="empty">Products will appear here when you add them in the admin panel.</div>';
    document.querySelector('#year').textContent=new Date().getFullYear();
    document.title=`${data.siteName||defaults.siteName} | ${data.heroTitle||''}`;
  }
  render(getData());
  window.addEventListener('storage',event=>{if(event.key===KEY)render(getData())});
  window.addEventListener('message',event=>{if(event.data?.type==='spark-site-preview')render(event.data.data)});
})();
