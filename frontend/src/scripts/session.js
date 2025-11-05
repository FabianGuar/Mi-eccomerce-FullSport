// ================================================================
// SESSION.JS - GESTOR DE SESIONES PARA TECHSTORE PRO
// ================================================================
// Este archivo maneja TODA la lógica de sesiones de la aplicación
// Se encarga de verificar autenticación y proteger rutas
// ================================================================

console.log('🔐 session.js cargando...');

// ================================================================
// CONFIGURACIÓN GLOBAL
// ================================================================

const SessionManager = {
    // Nombre de la aplicación para logs
    appName: 'TechStore Pro',
    
    // Debug mode - Cambia a false en producción
    debug: true,
    
    // Configuración de rutas
    routes: {
        // Rutas públicas - Cualquiera puede acceder
        public: [
            'index.html',
            'productos.html',
            'producto-detalle.html',
            'contacto.html',
            'carrito.html',
    
        ],
        
        // Rutas protegidas - Solo usuarios logueados
        protected: [
            'perfil.html',
            'mis-pedidos.html',
            'checkout.html'
        ],
        
        // Rutas de autenticación - Solo usuarios NO logueados
        auth: [
            'login.html',
            'register.html'
        ],
        
        // Páginas de redirección
        redirects: {
            afterLogin: 'index.html',      // A dónde ir después de login
            afterLogout: 'index.html',     // A dónde ir después de logout
            needsAuth: 'login.html'        // A dónde ir si necesita autenticarse
        }
    }
};
// ================================================================
// FUNCIONES AUXILIARES
// ================================================================

/**
 * 🖨️ Log personalizado para debug
 * Solo se muestra si debug está activado
 */
SessionManager.log = function(message, type = 'info') {
    if (!this.debug) return;
    
    const emoji = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌',
        route: '🗺️'
    };
    
    console.log(`${emoji[type] || 'ℹ️'} [SESSION] ${message}`);
};

/**
 * 📄 Obtiene el nombre del archivo actual
 * Ejemplo: "login.html" o "productos.html"
 */
SessionManager.getCurrentPage = function() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    
    // Si está en la raíz, retorna index.html
    return page || 'index.html';
};

/**
 * 🔍 Verifica si la página actual es de cierto tipo
 */
SessionManager.isPublicPage = function() {
    const currentPage = this.getCurrentPage();
    return this.routes.public.includes(currentPage);
};

SessionManager.isProtectedPage = function() {
    const currentPage = this.getCurrentPage();
    return this.routes.protected.includes(currentPage);
};

SessionManager.isAuthPage = function() {
    const currentPage = this.getCurrentPage();
    return this.routes.auth.includes(currentPage);
};

/**
 * 🚀 Redirige a una página específica
 */
SessionManager.redirect = function(page, reason = '') {
    this.log(`Redirigiendo a ${page}. Razón: ${reason}`, 'route');
    
    // Pequeño delay para que se vea la notificación
    setTimeout(() => {
        window.location.href = page;
    }, 100);
};
// ================================================================
// VERIFICACIÓN DE AUTENTICACIÓN
// ================================================================

/**
 * 🔐 Verifica si el usuario está autenticado
 * Revisa:
 * 1. Si existe authAPI
 * 2. Si hay token guardado
 * 3. Si el token es válido (no expirado)
 */
SessionManager.checkAuth = function() {
    this.log('Verificando autenticación...', 'info');
    
    // Verificar que authAPI esté cargado
    if (typeof authAPI === 'undefined') {
        this.log('authAPI no está cargado', 'error');
        return false;
    }
    
    // Verificar si hay un token
    const token = authAPI.getToken();
    if (!token) {
        this.log('No hay token guardado', 'warning');
        return false;
    }
    
    // Verificar si el token es válido (no expirado)
    try {
        const isValid = authAPI.isAuthenticated();
        
        if (isValid) {
            const user = authAPI.getUser();
            this.log(`Usuario autenticado: ${user.email}`, 'success');
            return true;
        } else {
            this.log('Token inválido o expirado', 'warning');
            return false;
        }
        
    } catch (error) {
        this.log(`Error al verificar token: ${error.message}`, 'error');
        return false;
    }
};
// ================================================================
// LÓGICA PRINCIPAL DE PROTECCIÓN
// ================================================================

/**
 * 🛡️ Protege las rutas según el estado de autenticación
 * Esta función se ejecuta automáticamente al cargar cada página
 */
SessionManager.protectRoutes = function() {
    const currentPage = this.getCurrentPage();
    const isAuthenticated = this.checkAuth();
    
    this.log(`Página actual: ${currentPage}`, 'route');
    this.log(`Usuario autenticado: ${isAuthenticated}`, 'info');
    
    // ===== CASO 1: PÁGINAS PROTEGIDAS =====
    if (this.isProtectedPage()) {
        this.log('Página protegida detectada', 'warning');
        
        if (!isAuthenticated) {
            this.log('Usuario no autenticado, redirigiendo a login...', 'warning');
            
            // Mostrar notificación
            if (typeof authAPI !== 'undefined' && authAPI.showNotification) {
                authAPI.showNotification(
                    'Debes iniciar sesión para acceder a esta página',
                    'warning'
                );
            }
            
            // Guardar la página a la que quería ir
            sessionStorage.setItem('redirect-after-login', currentPage);
            
            // Redirigir a login
            this.redirect(this.routes.redirects.needsAuth, 'Acceso no autorizado');
            return false;
        }
        
        this.log('Acceso permitido a página protegida', 'success');
        return true;
    }
    
    // ===== CASO 2: PÁGINAS DE AUTENTICACIÓN =====
    if (this.isAuthPage()) {
        this.log('Página de autenticación detectada', 'info');
        
        if (isAuthenticated) {
            this.log('Usuario ya está autenticado, redirigiendo...', 'info');
            
            // Mostrar notificación
            if (typeof authAPI !== 'undefined' && authAPI.showNotification) {
                authAPI.showNotification(
                    'Ya tienes una sesión activa',
                    'info'
                );
            }
            
            // Redirigir a inicio
            this.redirect(this.routes.redirects.afterLogin, 'Ya está autenticado');
            return false;
        }
        
        this.log('Acceso permitido a página de autenticación', 'success');
        return true;
    }
    
    // ===== CASO 3: PÁGINAS PÚBLICAS =====
    if (this.isPublicPage()) {
        this.log('Página pública - Acceso libre', 'success');
        return true;
    }
    
    // ===== CASO 4: PÁGINA NO DEFINIDA =====
    this.log('Página no está en ninguna categoría - Permitiendo acceso', 'warning');
    return true;
};
// ================================================================
// INICIALIZACIÓN AUTOMÁTICA
// ================================================================

/**
 * 🚀 Inicializa el sistema de sesiones
 * Se ejecuta automáticamente cuando se carga la página
 */
SessionManager.init = function() {
    this.log(`Inicializando SessionManager para ${this.appName}`, 'info');
    this.log(`Página actual: ${this.getCurrentPage()}`, 'route');
    
    // Ejecutar protección de rutas
    this.protectRoutes();
    
    this.log('SessionManager inicializado correctamente', 'success');
};

// ================================================================
// EJECUTAR AL CARGAR EL DOM
// ================================================================

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        SessionManager.init();
    });
} else {
    // El DOM ya está cargado
    SessionManager.init();
}

console.log('✅ session.js cargado correctamente');

// Exponer SessionManager globalmente para debugging
window.SessionManager = SessionManager;
