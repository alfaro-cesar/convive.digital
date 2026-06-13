# 🔐 Variables de Entorno - Referencia Rápida

## 📊 Tabla Completa de Variables

| # | Variable | Requerida | Ubicación | Función | Ejemplo |
|---|----------|-----------|-----------|---------|---------|
| 1 | `NODE_ENV` | ✅ | backend/config/db.js | Define modo (production/development) | `production` |
| 2 | `PORT` | ❌ | backend/server.js | Puerto del servidor | `3000` |
| 3 | `DATABASE_URL` | ✅ | backend/models/index.js | Conexión a BD (preferida) | `mysql://root:pass@host:3306/db` |
| 4 | `MYSQLHOST` | ⚠️ | backend/scripts/migrate.js | Host BD (fallback) | `localhost` |
| 5 | `MYSQLPORT` | ⚠️ | backend/scripts/migrate.js | Puerto BD (fallback) | `3306` |
| 6 | `MYSQLUSER` | ⚠️ | backend/scripts/migrate.js | Usuario BD (fallback) | `root` |
| 7 | `MYSQLPASSWORD` | ⚠️ | backend/scripts/migrate.js | Contraseña BD (fallback) | `password123` |
| 8 | `MYSQLDATABASE` | ⚠️ | backend/scripts/migrate.js | Base de datos (fallback) | `proyecto_cero` |
| 9 | `RESEND_API_KEY` | ❌ | backend/routes/api.js | API para enviar emails | `re_xxxxx` |
| 10 | `RESEND_VERIFIED_EMAIL` | ❌ | backend/routes/api.js | Email verificado en Resend | `tu@email.com` |
| 11 | `PANICO_EMAIL` | ❌ | backend/routes/api.js | Email para alertas de pánico | `alerts@colegio.com` |
| 12 | `ANTHROPIC_API_KEY` | ❌ | backend/routes/api.js | API de Claude para chatbot | `sk-ant-xxxxx` |
| 13 | `FRONTEND_URL` | ❌ | backend/routes/api.js | URL del frontend | `https://app.vercel.app` |
| 14 | `VITE_API_BASE_URL` | ❌ | frontend/src/services/api.js | Base URL de API (frontend) | `/api` |

**Leyenda:**
- ✅ = **Requerida** para funcionamiento
- ⚠️ = **Fallback** (solo si no existe `DATABASE_URL`)
- ❌ = **Opcional** (funcionalidades específicas, app sigue funcionando)

---

## 🎯 Configuración por Entorno

### 📱 Desarrollo Local
```env
NODE_ENV=development
DATABASE_URL=mysql://root:pass@localhost:3306/proyecto_cero
# El resto pueden estar vacías, las funcionalidades opcionales se desactivan
```

### 🌐 Producción (Vercel)
```env
NODE_ENV=production
DATABASE_URL=mysql://user:pass@host:puerto/database
RESEND_API_KEY=re_xxxxx
RESEND_VERIFIED_EMAIL=info@empresa.com
PANICO_EMAIL=alerts@empresa.com
ANTHROPIC_API_KEY=sk-ant-xxxxx (opcional)
FRONTEND_URL=https://tu-app.vercel.app
```

---

## 📍 Dónde se Usan (Detallado)

### Base de Datos
- **Archivo:** `backend/models/index.js`
- **Línea:** 13-14
- **Lógica:**
  - Si existe `DATABASE_URL` → usa ese
  - Si no → usa `MYSQL*` variables individuales
  - Si nada existe → intenta conectar a `localhost`

### Emails
- **Archivo:** `backend/routes/api.js`
- **Líneas:** 20, 437, 562, 569, 672, 678
- **Usos:**
  - **Resend init (línea 20):** Inicializa cliente Resend con API Key
  - **Recuperación de contraseña (línea 562):** Valida RESEND_API_KEY
  - **Email verificado (línea 569):** Carga RESEND_VERIFIED_EMAIL (o usa default)
  - **Alerta pánico (línea 672):** Envía a PANICO_EMAIL
  - **Validación (línea 678):** Verifica que RESEND_API_KEY exista

### Chatbot IA
- **Archivo:** `backend/routes/api.js`
- **Líneas:** 437, 444
- **Lógica:**
  - Si no existe `ANTHROPIC_API_KEY` → error 400 (chatbot deshabilitado)
  - Si existe → inicializa cliente Anthropic

### URLs de Redirección
- **Archivo:** `backend/routes/api.js`
- **Línea:** 559
- **Uso:** URLs en emails de recuperación de contraseña
- **Default:** `http://localhost:5173` (Vite dev server)

---

## ✨ Cómo Habilitar/Deshabilitar Funcionalidades

### Email (Recuperación de contraseña, Alertas)
```env
# ✅ HABILITADO
RESEND_API_KEY=re_xxxxx
RESEND_VERIFIED_EMAIL=info@empresa.com

# ❌ DESHABILITADO (dejar vacío)
RESEND_API_KEY=
RESEND_VERIFIED_EMAIL=
```
**Comportamiento:** Si RESEND_API_KEY está vacío, los endpoints de email retornan error 400 con mensaje "Servicio de email no configurado"

### Chatbot IA
```env
# ✅ HABILITADO
ANTHROPIC_API_KEY=sk-ant-xxxxx

# ❌ DESHABILITADO (dejar vacío)
ANTHROPIC_API_KEY=
```
**Comportamiento:** Si ANTHROPIC_API_KEY está vacío, el endpoint retorna error 400 con mensaje "API de Anthropic no configurada"

### Base de Datos (Requerida siempre)
- Debe estar configurada sí o sí (DATABASE_URL o MYSQL* variables)
- Si no existe ninguna, la app no funcionará

---

## 🔄 Valores por Defecto

| Variable | Default | Cuándo se usa |
|----------|---------|---------------|
| `NODE_ENV` | `development` | Nunca especificada |
| `PORT` | `3000` | Nunca especificada |
| `RESEND_VERIFIED_EMAIL` | `sminacosme@gmail.com` | Si RESEND_API_KEY existe pero variable está vacía |
| `FRONTEND_URL` | `http://localhost:5173` | Si no está especificada |
| `VITE_API_BASE_URL` | `/api` | Si no está especificada |
| `MYSQLHOST` | `127.0.0.1` | Si DATABASE_URL no existe |
| `MYSQLPORT` | `3306` | Si DATABASE_URL no existe |
| `MYSQLUSER` | `root` | Si DATABASE_URL no existe |
| `MYSQLDATABASE` | `proyecto_cero` | Si DATABASE_URL no existe |

---

## 🚀 Checklist para Vercel

- [ ] `NODE_ENV` = `production`
- [ ] `DATABASE_URL` apunta a BD correcta (preferir sobre MYSQL*)
- [ ] `RESEND_API_KEY` configurada O variable deshabilita emails
- [ ] `RESEND_VERIFIED_EMAIL` coincide con Resend
- [ ] `PANICO_EMAIL` es email válido de la organización
- [ ] `ANTHROPIC_API_KEY` configurada O variable deshabilita chatbot
- [ ] `FRONTEND_URL` = URL real de Vercel (después de primer deploy)

---

## 🆘 Problemas Comunes

### "Cannot connect to database"
- ❌ DATABASE_URL está mal
- ❌ Credenciales incorrectas
- ❌ Host no es accesible desde Vercel

### "Email service not configured"
- ℹ️ Es normal si no tienes RESEND_API_KEY
- ✅ Otros features funcionan normalmente

### "API key is invalid"
- ❌ ANTHROPIC_API_KEY mal copiado
- ❌ API Key expirada

### "Frontend URL invalid"
- ⚠️ Links en emails no funcionan
- ✅ Resto de funcionalidades ok
