/**
 * FIGHTER FORGE — UNIFIED ZERO-DEPENDENCY NODE SERVER
 * 
 * Serves the React frontend + handles /api/enquiries, /api/custom-enquiry,
 * and /api/gear-ideas with zero external dependencies.
 * Run with: agy-node server.js or node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const UPLOADS_DIR = path.join(ROOT_DIR, 'backend', 'uploads');
const DATA_DIR = path.join(ROOT_DIR, 'backend', 'data');

// Catch any unexpected errors to keep server running continuously
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]:', err.message);
});
process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION]:', reason);
});

// Ensure storage directories exist
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function appendJsonRecord(filename, record) {
  const filepath = path.join(DATA_DIR, filename);
  let data = [];
  try {
    if (fs.existsSync(filepath)) {
      data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
  } catch (e) {
    data = [];
  }
  data.push(record);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // ==========================================
  // API ROUTING
  // ==========================================

  // GET /api/health
  if (req.method === 'GET' && pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      brand: 'FIGHTER FORGE',
      server: 'Zero-Dep Node Runner'
    }));
    return;
  }

  // POST /api/enquiries (Cart Enquiry Checkout)
  if (req.method === 'POST' && pathname === '/api/enquiries') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const record = {
          id: 'enq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          ...payload,
          savedAt: new Date().toISOString()
        };
        appendJsonRecord('enquiries.json', record);
        console.log(`[ENQUIRY SAVED] ${record.customer?.name} - ${record.items?.length} items`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, enquiry: record }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // GET /api/enquiries (List Saved Enquiries)
  if (req.method === 'GET' && pathname === '/api/enquiries') {
    const filepath = path.join(DATA_DIR, 'enquiries.json');
    let items = [];
    if (fs.existsSync(filepath)) {
      try { items = JSON.parse(fs.readFileSync(filepath, 'utf8')); } catch (e) {}
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ enquiries: items }));
    return;
  }

  // POST /api/custom-enquiry (Custom Build with Multipart or JSON)
  if (req.method === 'POST' && pathname === '/api/custom-enquiry') {
    const contentType = req.headers['content-type'] || '';
    
    // Check if multipart form
    if (contentType.includes('multipart/form-data')) {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
        const boundary = boundaryMatch ? (boundaryMatch[1] || boundaryMatch[2]) : null;

        let type = 'ring';
        let specs = {};
        let customer = {};
        const uploadedUrls = [];

        if (boundary) {
          const parts = buffer.toString('binary').split('--' + boundary);
          parts.forEach(part => {
            if (part.includes('name="type"')) {
              const val = part.split('\r\n\r\n')[1]?.split('\r\n')[0];
              if (val) type = val.trim();
            }
            if (part.includes('name="specs"')) {
              const val = part.split('\r\n\r\n')[1]?.split('\r\n')[0];
              try { specs = JSON.parse(val); } catch (e) {}
            }
            if (part.includes('name="customer"')) {
              const val = part.split('\r\n\r\n')[1]?.split('\r\n')[0];
              try { customer = JSON.parse(val); } catch (e) {}
            }
            if (part.includes('filename="')) {
              const filenameMatch = part.match(/filename="([^"]+)"/);
              if (filenameMatch) {
                const origName = filenameMatch[1];
                const cleanName = `${Date.now()}_${path.basename(origName)}`;
                const fileHeaderEnd = part.indexOf('\r\n\r\n') + 4;
                const fileContent = part.substring(fileHeaderEnd, part.length - 2);
                const dest = path.join(UPLOADS_DIR, cleanName);
                fs.writeFileSync(dest, Buffer.from(fileContent, 'binary'));
                uploadedUrls.push(`/uploads/${cleanName}`);
              }
            }
          });
        }

        const record = {
          id: 'custom_' + Date.now(),
          type,
          specs,
          customer,
          uploadedUrls,
          savedAt: new Date().toISOString()
        };
        appendJsonRecord('custom_quotes.json', record);
        console.log(`[CUSTOM ARENA QUOTE] ${customer?.name} - ${type}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, uploadedUrls, record }));
      });
      return;
    }

    // JSON fallback
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        appendJsonRecord('custom_quotes.json', payload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, uploadedUrls: [] }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request' }));
      }
    });
    return;
  }

  // POST /api/gear-ideas
  if (req.method === 'POST' && pathname === '/api/gear-ideas') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        appendJsonRecord('gear_ideas.json', {
          id: 'gear_' + Date.now(),
          ...payload,
          savedAt: new Date().toISOString()
        });
        console.log(`[GEAR IDEA] Category: ${payload.gearCategory} from ${payload.name}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request' }));
      }
    });
    return;
  }

  // POST /api/rentals (Event Rental Enquiry)
  if (req.method === 'POST' && pathname === '/api/rentals') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const record = {
          id: 'rental_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          ...payload,
          savedAt: new Date().toISOString()
        };
        appendJsonRecord('rentals.json', record);
        console.log(`[RENTAL ENQUIRY SAVED] ${record.contactName || record.name || 'Client'} - ${record.eventType || 'Event Arena'}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, rental: record }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // GET /api/rentals (List Saved Rental Enquiries)
  if (req.method === 'GET' && pathname === '/api/rentals') {
    const filepath = path.join(DATA_DIR, 'rentals.json');
    let items = [];
    if (fs.existsSync(filepath)) {
      try { items = JSON.parse(fs.readFileSync(filepath, 'utf8')); } catch (e) {}
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ rentals: items }));
    return;
  }

  // ==========================================
  // STATIC FILE SERVING
  // ==========================================
  let relativePath = pathname === '/' ? '/public/index.html' : pathname;

  // Map /assets/... to /public/assets/...
  if (relativePath.startsWith('/assets/')) {
    relativePath = '/public' + relativePath;
  }

  // Map /uploads/... to /backend/uploads/...
  if (relativePath.startsWith('/uploads/')) {
    relativePath = '/backend' + relativePath;
  }

  let filePath = path.join(ROOT_DIR, relativePath);

  // If path has no extension and is not an API call, serve public/index.html (SPA Fallback)
  if (!path.extname(filePath)) {
    filePath = path.join(ROOT_DIR, 'public', 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routes (e.g. /boxing-rings, /cart, etc.)
      const indexPath = path.join(ROOT_DIR, 'public', 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🥊 FIGHTER FORGE PRODUCTION PLATFORM RUNNING`);
  console.log(`======================================================`);
  console.log(`Local PC:    http://localhost:${PORT}`);
  console.log(`On Phone:    http://10.68.76.30:${PORT} (same Wi-Fi)`);
  console.log(`API Health:  http://localhost:${PORT}/api/health`);
  console.log(`Cart & Quotes: WhatsApp Click-to-Chat Integrated`);
  console.log(`======================================================\n`);
});
