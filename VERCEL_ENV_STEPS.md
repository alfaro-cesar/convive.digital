# 🔧 Paso a Paso: Agregar Variables en Vercel

## 📌 Paso 1: Entra a tu Proyecto en Vercel

1. Ve a https://vercel.com/dashboard
2. Haz clic en tu proyecto **"convive.digital"**
3. Ve a la pestaña **"Settings"** (arriba)

```
[Dashboard] → [convive.digital] → [Settings]
```

---

## 🔐 Paso 2: Ve a Environment Variables

En el menú izquierdo:
```
Settings → Environment Variables
```

Deberías ver una sección así:
```
┌─────────────────────────────────────┐
│  Environment Variables              │
├─────────────────────────────────────┤
│                                     │
│  Add environment variables:         │
│  [Name dropdown] [Value] [Add]      │
│                                     │
│  Existing Variables:                │
│  [Lista de variables agregadas]     │
│                                     │
└─────────────────────────────────────┘
```

---

## ➕ Paso 3: Agregar Cada Variable

**Haz clic en el campo de entrada y sigue este orden:**

### 1️⃣ NODE_ENV
```
Name:  NODE_ENV
Value: production
```
Haz clic en **"Add" / "Save"**

### 2️⃣ PORT
```
Name:  PORT
Value: 3000
```

### 3️⃣ DATABASE_URL ⭐ (IMPORTANTE)
Copia la URL exacta de tu railway o proveedor de BD:
```
Name:  DATABASE_URL
Value: mysql://root:LzGcEoihrDIxPXgQbkYPMnwvWCUjyICl@tramway.proxy.rlwy.net:56633/railway
```

### 4️⃣ RESEND_API_KEY (Si tienes)
Ve a https://resend.com → API Keys:
```
Name:  RESEND_API_KEY
Value: re_xxxxxxxxxxxxxxxxxxxxx
```

### 5️⃣ RESEND_VERIFIED_EMAIL (Si tienes)
```
Name:  RESEND_VERIFIED_EMAIL
Value: tu-email-verificado@ejemplo.com
```
⚠️ **Importante:** Este email debe estar verificado en Resend

### 6️⃣ PANICO_EMAIL
```
Name:  PANICO_EMAIL
Value: autoridades@colegio.com
```

### 7️⃣ ANTHROPIC_API_KEY (Opcional)
Si tienes account en Anthropic:
```
Name:  ANTHROPIC_API_KEY
Value: sk-ant-xxxxxxxxxxxxxxxxxxxxx
```
Si no tienes, **deja este en blanco**

### 8️⃣ FRONTEND_URL (Actualizar después del primer deploy)
```
Name:  FRONTEND_URL
Value: https://tu-proyecto.vercel.app
```
ℹ️ Actualiza esto DESPUÉS de tu primer deploy exitoso

### 9️⃣ VITE_API_BASE_URL
```
Name:  VITE_API_BASE_URL
Value: /api
```

---

## ✅ Verificar Variables Agregadas

Después de agregar todas, deberías ver algo así:

```
┌──────────────────────────────────────────┐
│ Environment Variables                    │
├──────────────────────────────────────────┤
│ NODE_ENV             production          │
│ PORT                 3000                │
│ DATABASE_URL         mysql://root:...    │
│ RESEND_API_KEY       re_xxxxx...         │
│ RESEND_VERIFIED_EMAIL tu@email.com       │
│ PANICO_EMAIL         alerts@colegio.com  │
│ ANTHROPIC_API_KEY    sk-ant-xxxxx...     │
│ FRONTEND_URL         https://...         │
│ VITE_API_BASE_URL    /api                │
└──────────────────────────────────────────┘
```

---

## 🚀 Paso 4: Hacer Deploy

Después de agregar todas las variables:

1. Ve a la pestaña **"Deployments"**
2. Haz clic en el último deployment
3. Haz clic en los **"..."** (arriba derecha)
4. Selecciona **"Redeploy"**
5. Confirma con **"Redeploy"**

La aplicación se compilará nuevamente con las nuevas variables.

---

## 🔄 Paso 5: Después del Primer Deploy

**Una vez que tu proyecto esté en Vercel:**

1. Copia la URL que Vercel te asignó (ej: https://convive-digital-xyz.vercel.app)
2. Vuelve a **Settings → Environment Variables**
3. Edita la variable `FRONTEND_URL`
4. Cambia el valor a tu URL real
5. Haz clic en **"Save"**
6. Ve a **Deployments** → **Redeploy** para aplicar cambios

---

## 🛡️ Opciones Avanzadas

### Secretos Sensibles
- Vercel encripta automáticamente todas las variables
- Las variables nunca aparecen en logs públicos
- Cada ambiente (production, preview) puede tener variables diferentes

### Múltiples Ambientes
Si quieres tener variables diferentes para:
- **Production:** Tu rama `main` en GitHub
- **Preview:** Pull requests y ramas de desarrollo

En cada variable, haz clic en **"Show/Hide Environment"** para elegir:

```
✓ Production
✓ Preview  
✓ Development
```

---

## ❌ Errores Comunes y Soluciones

### "Build failed: Cannot find DATABASE_URL"
**Solución:** Verifica que agreguaste la variable exactamente como `DATABASE_URL` (mayúsculas)

### "Connection timeout on DATABASE_URL"
**Solución:** 
- La BD no es accesible desde Vercel
- Verifica que el host es correcto
- Si uses Railway, asegúrate que es `tramway.proxy.rlwy.net`

### "RESEND_API_KEY rejected"
**Solución:**
- La API Key está mal copiada
- Ve a Resend y regenera una nueva key
- Asegúrate que incluyes `re_` al inicio

### "Application loads but no styling"
**Solución:** Verifica que `VITE_API_BASE_URL=/api` está correcta

---

## 📋 Checklist de Seguridad

- [ ] Nunca compartas tu `.env` archivo
- [ ] Los valores en Vercel están encriptados
- [ ] Las API Keys son privadas
- [ ] DATABASE_URL contiene contraseña (normal, está protegida)
- [ ] Usa variables diferentes si tienes múltiples ambientes

---

## 🎯 Próximos Pasos

1. ✅ Agregar todas las variables en Vercel
2. ✅ Hacer Redeploy
3. ✅ Esperar a que compile
4. ✅ Probar tu aplicación
5. ✅ Actualizar FRONTEND_URL con URL real
6. ✅ Hacer Redeploy final

**¡Listo! Tu aplicación está en producción.** 🎉

Cualquier push a `main` en GitHub realizará un deploy automático con estas variables.
