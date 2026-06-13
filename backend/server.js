const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const path = require('path');
const app = require('./app');

const frontEndDist = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontEndDist));
app.use((req, res) => {
  res.sendFile(path.join(frontEndDist, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Proyecto C.E.R.O. corriendo en el puerto ${PORT}`);
});