# 📋 Variables de Entorno - RESUMEN VISUAL

## 🎯 Lo Esencial (Para Vercel)

```
┌─────────────────────────────────────────────────────────┐
│           VARIABLES PARA VERCEL DASHBOARD               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. NODE_ENV = production                              │
│  2. PORT = 3000                                        │
│  3. DATABASE_URL = mysql://...                         │
│  4. RESEND_API_KEY = re_... (o dejar vacío)           │
│  5. RESEND_VERIFIED_EMAIL = tu@email.com (o vacío)   │
│  6. PANICO_EMAIL = alertas@colegio.com                │
│  7. ANTHROPIC_API_KEY = sk-ant-... (opcional)         │
│  8. FRONTEND_URL = https://tu-app.vercel.app          │
│  9. VITE_API_BASE_URL = /api                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Matriz Rápida

```
Variable                    | Requerida | Dónde obtener
────────────────────────────┼───────────┼────────────────────────
NODE_ENV                    | ✅        | Fijo: "production"
PORT                        | ✅        | Fijo: "3000"
DATABASE_URL                | ✅        | Railway, Planetscale, MySQL
RESEND_API_KEY              | ❌        | https://resend.com
RESEND_VERIFIED_EMAIL       | ❌        | Tu email verificado
PANICO_EMAIL                | ❌        | Email de alertas
ANTHROPIC_API_KEY           | ❌        | https://console.anthropic.com
FRONTEND_URL                | ❌        | Tu URL de Vercel (después deploy)
VITE_API_BASE_URL           | ❌        | Fijo: "/api"
```

---

## 🔄 Workflow: Local → Vercel

### EN TU PC (Desarrollo)
```
backend/.env
│
├── NODE_ENV=development
├── DATABASE_URL=mysql://root:pass@localhost/db (local)
├── RESEND_API_KEY= (vacío, sin emails)
└── ANTHROPIC_API_KEY= (vacío, sin IA)
```

**Comando:** `cd backend && node server.js`
**URL:** `http://localhost:3000`

### EN VERCEL (Producción)
```
Vercel Settings → Environment Variables
│
├── NODE_ENV=production
├── DATABASE_URL=mysql://user:pass@host/db (Railway/Planetscale)
├── RESEND_API_KEY=re_xxxxx (API Key válida)
├── ANTHROPIC_API_KEY=sk-ant-xxxxx (opcional)
└── FRONTEND_URL=https://tu-app.vercel.app
```

**Deploy:** GitHub push a `main` → Vercel auto-deploy
**URL:** `https://tu-app.vercel.app`

---

## 💡 Servicios Externos Necesarios

### 1. Base de Datos MySQL ⭐ REQUERIDA
```
Opciones:
• Railway (recomendado) → railway.app
• Planetscale              → planetscale.com
• AWS RDS                  → aws.amazon.com
• DigitalOcean             → digitalocean.com
• Localhost (solo local)   → 127.0.0.1:3306

Formato DATABASE_URL:
mysql://usuario:contraseña@host:puerto/base_de_datos
```

### 2. Email (Resend) ⭐ RECOMENDADO
```
Sitio: https://resend.com
Qué hacer:
1. Crear cuenta gratis
2. Ir a API Keys → Create Token
3. Copiar la API Key (empieza con "re_")
4. Agregar dominio verificado (tu email)
5. Copiar el dominio verificado

Valor:
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_VERIFIED_EMAIL=tu-email-verificado@ejemplo.com
```

### 3. IA Claude (Opcional)
```
Sitio: https://console.anthropic.com
Qué hacer:
1. Crear cuenta gratis
2. Ir a API Keys
3. Click "Create Key"
4. Copiar la Key

Valor:
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

Si no lo configuras: El chatbot no funciona
                      Pero el resto de la app SÍ
```

---

## 🎯 Pasos Exactos para Vercel

### ANTES de hacer deploy:
```
[ ] Tienes DATABASE_URL de tu BD
[ ] Tienes RESEND_API_KEY (o vacío)
[ ] Tienes ANTHROPIC_API_KEY (o vacío)
[ ] Proyecto en GitHub
[ ] Vercel conectado a GitHub
```

### EN Vercel Dashboard:
```
1. Settings → Environment Variables
2. Agregar NODE_ENV = production
3. Agregar DATABASE_URL = mysql://...
4. Agregar RESEND_API_KEY = re_...
5. Agregar RESEND_VERIFIED_EMAIL = tu@email.com
6. Agregar PANICO_EMAIL = alertas@colegio.com
7. Agregar ANTHROPIC_API_KEY = sk-ant-...
8. Agregar FRONTEND_URL = https://tu-app.vercel.app
9. Agregar VITE_API_BASE_URL = /api
10. Deployments → Redeploy
```

### DESPUÉS del primer deploy:
```
1. Copiar URL real de Vercel (https://tu-app.vercel.app)
2. Settings → Environment Variables
3. Editar FRONTEND_URL = https://tu-app.vercel.app
4. Deployments → Redeploy (deployment actual)
```

---

## ⚠️ Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot find DATABASE_URL` | Variable no agregada | Revisar nombre exacto (mayúsculas) |
| `Connection timeout` | BD no accesible | Verificar host y puerto |
| `API key invalid` | Key mal copiada | Copiar de nuevo desde Resend/Anthropic |
| `Email not verified` | Email no confirmado en Resend | Ir a Resend y verificar dominio |
| `Build failed` | Dependencias no instaladas | Frontend build fallido |
| `Static files not found` | `dist/` no se generó | Verificar `npm run build` |

---

## 🔐 Seguridad

✅ **Lo que Vercel hace por ti:**
- Encripta todas las variables
- No aparecen en logs públicos
- No se incluyen en el código frontend
- Cada deploy tiene acceso seguro

❌ **Lo que NO debes hacer:**
- Nunca compartir `.env` file
- No copiar variables al código
- No hacer push de `.env` a GitHub
- No mostrar variables en pantalla

---

## 📞 Resumen de URLs y Keys

```
┌─────────────────────────────────────────┐
│ DONDE OBTENER CADA VARIABLE             │
├─────────────────────────────────────────┤
│ DATABASE_URL       → Railway, Planetscale
│ RESEND_API_KEY     → resend.com/api-keys
│ ANTHROPIC_API_KEY  → console.anthropic.com
│ PANICO_EMAIL       → Tu correo
│ FRONTEND_URL       → Tu URL de Vercel
│ VITE_API_BASE_URL  → Fijo: "/api"
│ NODE_ENV           → Fijo: "production"
│ PORT               → Fijo: "3000"
└─────────────────────────────────────────┘
```

---

## 🚀 Checklist Final

```
[ ] Proyecto en GitHub
[ ] Conectado a Vercel
[ ] DATABASE_URL validada
[ ] RESEND_API_KEY (si usas emails)
[ ] ANTHROPIC_API_KEY (si usas IA)
[ ] FRONTEND_URL actualizada (después deploy)
[ ] Primer deploy exitoso
[ ] Aplicación accesible
[ ] Emails funcionan (si está configurado)
[ ] Chatbot funciona (si está configurado)
```

**¡LISTO! Tu aplicación está en producción.** 🎉

---

**Documentación detallada:**
- 📖 [VERCEL_SETUP.md](VERCEL_SETUP.md) - Guía completa
- 🔐 [ENV_VARIABLES_REFERENCE.md](ENV_VARIABLES_REFERENCE.md) - Referencia técnica
- 🔧 [VERCEL_ENV_STEPS.md](VERCEL_ENV_STEPS.md) - Pasos en Vercel
