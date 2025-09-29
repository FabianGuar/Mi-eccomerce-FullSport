// product-url-handler.js - Manejo de parámetros URL y carga dinámica con imágenes Unsplash

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔗 Sistema de URL cargado');
    
    const productId = getProductIdFromURL();
    
    if (productId) {
        console.log(`📱 Producto solicitado: ${productId}`);
        loadProductData(productId);
    } else {
        console.log('📱 Producto por defecto');
        loadProductData('macbook-pro-16');
    }
});

function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(`🔍 URL detectada: ${productId || 'ninguno'}`);
    return productId;
}

function loadProductData(productId) {
    console.log(`📄 Cargando: ${productId}`);
    
    const products = {
        'macbook-pro-16': {
            name: 'Guayos-Air Zoom',
            shortDesc: 'Mejora tu rendimiento',
            price: '$790.000',
            originalPrice: '$800.000',
            images: {
                main: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkh9nl15SOyrcljf46qwS1RVvZ2X-z_JTg9Q&s',
                gallery: [
                    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&w=800&q=90'

                ]
            },
            category: 'laptops'
        },
        'iphone-15-pro': {
            name: 'zapatos-Nike-II',
            shortDesc: 'Suela ultra liviana, y con tu mejor confort en la tela',
            price: '$500.000',
            originalPrice: '$520.000',
            images: {
                main: 'https://www.basketballemotion.com/imagesuploads/cromosportadas/web/500x281-CROMO-ZAPATILLAS-NIKE.webp',
                gallery: [
                    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1605236453806-b25e5d5cce04?ixlib=rb-4.0.3&w=800&q=90'
                ]
            },
            category: 'celulares'
        },
        'nvidia-rtx-4080': {
            name: 'Raqueta-tennis-pro',
            shortDesc: 'Dobla tu power con la mejor flexibilidad OC',
            price: '$870.000',
            originalPrice: '$950.000',
            images: {
                main: 'https://www.industriadeltenis.com/wp-content/uploads/2023/05/La-importancia-de-elegir-bien-la-raqueta.png',
                gallery: [
                    'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1555617981-dac3880eac6e?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1518826778770-a729fb53327c?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&w=800&q=90'
                ]
            },
            category: 'componentes'
        },
        'samsung-galaxy-s24': {
            name: 'Balon-ultra-Champions',
            shortDesc: 'Tu Modelo para mejores partidos',
            price: '$180.000',
            originalPrice: '$250.000',
            images: {
                main: 'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/f9454a20bdea41968ae66e3b2583ae7a_9366/balon-profesional-para-la-fase-de-liga-de-ucl-25-26.jpg',
                gallery: [
                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1605236453806-b25e5d5cce04?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&w=800&q=90'
                ]
            },
            category: 'celulares'
        },
        'dell-xps-13': {
            name: 'Guates-box',
            shortDesc: 'MD-3 M-Y 8',
            price: '$6.200.000',
            originalPrice: '$9.000.000',
            images: {
                main: 'https://media.falabella.com/falabellaCO/129434286_01/w=800,h=800,fit=pad',
                gallery: [
                    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&w=800&q=90'
                ]
            },
            category: 'laptops'
        },
        'amd-ryzen-7': {
            name: 'SUPLEMENTO',
            shortDesc: 'Obten la mejor alimentacion para un mayor rendimiento',
            price: '$180.000',
            originalPrice: '$330.000',
            images: {
                main: 'https://suplementos.b-cdn.net/categorias/categorias-web-proteinas-500x500.webp',
                gallery: [
                    'https://images.unsplash.com/photo-1555617981-dac3880eac6e?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1518826778770-a729fb53327c?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&w=800&q=90'
                ]
            },
            category: 'componentes'
        },
        'airpods-pro': {
            name: 'RODILLERAS',
            shortDesc: 'Ajusta de manera suave tu extremidad',
            price: '$750.000',
            originalPrice: '$850.000',
            images: {
                main: 'https://m.media-amazon.com/images/I/71mUmHflo-L._UY1000_.jpg',
                gallery: [
                    'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&w=800&q=90'
                ]
            },
            category: 'accesorios'
        },
        'silla-gaming': {
            name: 'Zapatillas-Adidas',
            shortDesc: 'Mejora tu power con la mejor comodidad',
            price: '$890.000',
            originalPrice: '$990.000',
            images: {
                main: 'https://static.runnea.com/images/202409/adidas-adizero-adios-pro-4-zapatillas-running-400x400x90xX-1.png?1',
                gallery: [
                    'https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&w=800&q=90',
                    'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&w=800&q=90'
                ]
            },
            category: 'accesorios'
        }
    };
    
    const product = products[productId];
    if (!product) {
        console.log('❌ Producto no encontrado, usando default');
        return;
    }
    
    // Actualizar título principal (dentro de main)
    const titleElement = document.querySelector('main h1');
    if (titleElement) {
        titleElement.textContent = product.name;
        console.log(`✅ Título actualizado: ${product.name}`);
    } else {
        console.error('❌ No se encontró el título principal');
    }
    
    // Actualizar descripción
    const descElement = document.querySelector('main h1 + p');
    if (descElement) {
        descElement.textContent = product.shortDesc;
        console.log(`✅ Descripción actualizada`);
    }
    
    // Actualizar precio principal
    const priceElement = document.querySelector('.text-4xl.font-bold.text-blue-600');
    if (priceElement) {
        priceElement.textContent = product.price;
        console.log(`✅ Precio actualizado: ${product.price}`);
    }
    
    // Actualizar precio original
    const originalPriceElement = document.querySelector('.text-xl.text-gray-500.line-through');
    if (originalPriceElement) {
        originalPriceElement.textContent = product.originalPrice;
        console.log(`✅ Precio original actualizado: ${product.originalPrice}`);
    }
    
    // Actualizar breadcrumb
    const breadcrumbElement = document.querySelector('nav.text-sm span.text-gray-900');
    if (breadcrumbElement) {
        breadcrumbElement.textContent = product.name;
        console.log(`✅ Breadcrumb actualizado: ${product.name}`);
    }
    
    // NUEVO: Actualizar imagen principal
    updateMainImage(product.images.main, product.name);
    
    // NUEVO: Actualizar galería de imágenes
    updateImageGallery(product.images.gallery, product.name);
    
    // Actualizar título de página
    document.title = `${product.name} - TechStore Pro`;
    
    console.log(`🎉 COMPLETADO: ${product.name}`);
}

// NUEVA FUNCIÓN: Actualizar imagen principal
function updateMainImage(imageSrc, productName) {
    const mainImageContainer = document.getElementById('main-image');
    if (mainImageContainer) {
        // Limpiar contenido actual
        mainImageContainer.innerHTML = '';
        
        // Crear nueva imagen
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = productName;
        img.className = 'w-full h-full object-cover rounded-xl';
        img.loading = 'lazy';
        
        img.onerror = function() {
            // Fallback si la imagen no carga
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'w-full h-full flex items-center justify-center bg-gray-200 rounded-xl';
            fallback.innerHTML = '<span class="text-6xl">💻</span>';
            mainImageContainer.appendChild(fallback);
        };
        
        mainImageContainer.appendChild(img);
        
        // Mantener el badge de descuento
        const discountBadge = document.createElement('div');
        discountBadge.className = 'absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold';
        discountBadge.textContent = '-15%';
        mainImageContainer.appendChild(discountBadge);
        
        console.log(`✅ Imagen principal actualizada: ${imageSrc}`);
    }
}

// NUEVA FUNCIÓN: Actualizar galería de imágenes
function updateImageGallery(images, productName) {
    const thumbnails = document.querySelectorAll('.thumbnail-image');
    
    thumbnails.forEach((thumbnail, index) => {
        if (images[index]) {
            // Limpiar contenido actual
            thumbnail.innerHTML = '';
            
            // Crear nueva imagen miniatura
            const img = document.createElement('img');
            img.src = images[index];
            img.alt = `${productName} vista ${index + 1}`;
            img.className = 'w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity';
            img.loading = 'lazy';
            
            img.onerror = function() {
                // Fallback si la imagen no carga
                this.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = 'text-2xl';
                fallback.textContent = '💻';
                thumbnail.appendChild(fallback);
            };
            
            thumbnail.appendChild(img);
            
            // Agregar evento click para cambiar imagen principal
            thumbnail.addEventListener('click', function() {
                updateMainImage(images[index], productName);
                
                // Actualizar estado activo de thumbnails
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('ring-2', 'ring-blue-500');
                    thumb.classList.add('opacity-70');
                });
                
                this.classList.add('ring-2', 'ring-blue-500');
                this.classList.remove('opacity-70');
            });
            
            // Marcar la primera imagen como activa
            if (index === 0) {
                thumbnail.classList.add('ring-2', 'ring-blue-500');
                thumbnail.classList.remove('opacity-70');
            }
        }
    });
    
    console.log(`✅ Galería actualizada con ${images.length} imágenes`);
}