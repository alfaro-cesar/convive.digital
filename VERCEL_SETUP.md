# 📋 Guía: Configurar Proyecto C.E.R.O en Vercel

## ✅ Requisitos previos
- [ ] Proyecto en GitHub: https://github.com/alfaro-cesar/convive.digital
- [ ] Cuenta en Vercel: https://vercel.com
- [ ] Cuenta en Railway o base de datos MySQL accesible
- [ ] API Keys configuradas (ver sección de Servicios)

---

## 🚀 Paso 1: Conectar GitHub a Vercel

1. Ve a https://vercel.com/dashboard
2. Click en **"Add New..."** → **"Project"**
3. Selecciona **"Import Git Repository"**
4. Autoriza a Vercel con GitHub
5. Busca el repositorio **"convive.digital"**
6. Click en **"Import"**

---

## 🔧 Paso 2: Configurar Variables de Entorno en Vercel

### En la página de importación del proyecto:

1. **Haz clic en "Environment Variables"** (antes de hacer clic en "Deploy")
2. Agrega cada variable según la tabla de abajo
3. Asegúrate de que estén todas configuradas
4. Luego click en **"Deploy"**

### Variables Requeridas:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Entorno de producción |
| `PORT` | `3000` | Puerto (Vercel lo ignora, pero déjalo) |
| `DATABASE_URL` | `mysql://usuario:pass@host:puerto/db` | Conexión a base de datos |
| `RESEND_API_KEY` | `re_xxxxx...` | API Key de Resend (de paso 3) |
| `RESEND_VERIFIED_EMAIL` | `tu_email@ejemplo.com` | Email verificado en Resend |
| `PANICO_EMAIL` | `autoridades@colegio.com` | Email para alertas |
| `ANTHROPIC_API_KEY` | `sk-ant-xxxxx...` | API de Claude (opcional) |
| `FRONTEND_URL` | `https://tu-proyecto.vercel.app` | URL de Vercel (después del primer deploy) |

---

## 📦 Paso 3: Obtener API Keys

### 3a. DATABASE_URL (Railway o tu proveedor)
```
Formato: mysql://usuario:contraseña@host:puerto/base_de_datos
Ejemplo: mysql://root:LzGcEoihrDIxPXgQbkYPMnwvWCUjyICl@tramway.proxy.rlwy.net:56633/railway
```

### 3b. RESEND_API_KEY (Para emails)
1. Ve a https://resend.com
2. Crea una cuenta si no tienes
3. Ve a **Tokens** → **"Create Token"**
4. Copia la API Key
5. Verifica que el email esté confirmado en **Domains**

```
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_VERIFIED_EMAIL=tu_email_verificado@ejemplo.com
```

### 3c. ANTHROPIC_API_KEY (Opcional - para chatbot)
1. Ve a https://console.anthropic.com
2. Ve a **API Keys**
3. Click en **"Create Key"**
4. Copia la API Key

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

---

## 🎯 Paso 4: Realizar el Primer Deploy

1. En el tablero de Vercel, verás el proyecto importado
2. Haz clic en **"Deploy"** (o espera el deploy automático)
3. Vercel comenzará a:
   - Instalar dependencias del frontend
   - Construir la aplicación Vue
   - Crear funciones serverless para el backend
4. Espera a que termine (5-10 minutos)

### ✅ Si el deploy es exitoso:
- Verás un dominio como `https://convive-digital.vercel.app`
- La aplicación estará en vivo
- Los logs aparecerán en tiempo real

### ❌ Si hay errores:
- Ve a la pestaña **"Deployments"** → Último deploy
- Haz clic en **"Logs"** para ver los errores
- Consulta la sección de Troubleshooting

---

## 🔄 Paso 5: Actualizar FRONTEND_URL

**Después del primer deploy exitoso:**

1. Copia tu URL de Vercel (ej: `https://convive-digital.vercel.app`)
2. Ve a Vercel Dashboard → Proyecto → **Settings** → **Environment Variables**
3. Edita `FRONTEND_URL` y cambia a tu URL real
4. Haz clic en **"Save"**
5. En la pestaña **"Deployments"**, haz clic en **"Redeploy"** para el último deployment

---

## 🧪 Paso 6: Probar la Aplicación

### En tu dominio de Vercel:
- [ ] Accede a `https://tu-proyecto.vercel.app`
- [ ] La aplicación debe cargar sin errores
- [ ] Intenta crear una cuenta
- [ ] Intenta recuperar contraseña (si RESEND_API_KEY está configurada)
- [ ] Verifica que los emails se envíen correctamente

### Ver Logs en Tiempo Real:
```bash
vercel logs --follow
```

---

## 📊 Monitoreo en Producción

### Ver Logs:
1. Ve a Vercel Dashboard → Proyecto
2. Pestaña **"Deployments"** → Deploy actual
3. Haz clic en **"Logs"** para ver actividad en tiempo real

### Variables de Entorno:
1. Ve a **Settings** → **Environment Variables**
2. Aquí puedes editar cualquier variable sin redeploy
3. Los cambios se aplican en el siguiente request

### Redeploy Manual:
1. Pestaña **"Deployments"**
2. Haz clic en los **"..."** de tu deployment
3. Click en **"Redeploy"**

---

## 🔧 Troubleshooting

### Error: "Cannot find module 'sequelize'"
- Verifica que `npm install` se ejecutó en frontend/
- Revisa los logs de build en Vercel

### Error: "Database connection failed"
- Verifica que DATABASE_URL es correcta
- Asegúrate que tu host MySQL es accesible desde Vercel
- Verifica que el usuario y contraseña son correctos

### Error: "RESEND_API_KEY is not valid"
- Verifica que la API Key es correcta en Resend
- Asegúrate que el email esté verificado en Resend
- El formato debe ser: `re_xxxxx`

### Error: "Cannot find dist folder"
- El frontend debe construirse exitosamente
- Verifica que `frontend/package.json` tiene `"build": "vite build"`
- Revisa los logs de build

### Los emails no se envían
- Verifica RESEND_API_KEY en Vercel
- Verifica RESEND_VERIFIED_EMAIL existe en Resend
- Ve a los logs de Vercel para ver qué error retorna Resend

---

## 📝 Checklist Final

- [ ] Proyecto en GitHub
- [ ] Proyecto conectado a Vercel
- [ ] Todas las variables de entorno configuradas
- [ ] DATABASE_URL apunta a base de datos correcta
- [ ] RESEND_API_KEY configurada (o emails deshabilitados)
- [ ] Primer deploy exitoso
- [ ] Aplicación accesible en dominio Vercel
- [ ] FRONTEND_URL actualizada con dominio real
- [ ] Deploy final realizado
- [ ] Aplicación testeada en producción

---

## 🎉 ¡Listo!

Tu proyecto está en producción. Cualquier push a `main` en GitHub generará automáticamente un nuevo deploy en Vercel.

**Próximos pasos:**
- Monitorear los logs regularmente
- Hacer backups de la base de datos
- Configurar dominio personalizado (opcional)
- Activar protección SSL (automática en Vercel)
