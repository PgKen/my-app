const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL('http://localhost:3000'); // Test GitHub Pages URL
}

const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // สร้างตาราง users ถ้ายังไม่มี
    db.run(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT NOT NULL,
        "tel"	TEXT
      )
    `);

    // สร้างตาราง add ถ้ายังไม่มี
    db.run(`
      CREATE TABLE IF NOT EXISTS "ticket" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "naneticket" TEXT NOT NULL,
        "created_date" DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

//ต้องมี handler นี้!
ipcMain.handle('add-user', async (event, name,phone) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (name,tel) VALUES (?,?)', [name,phone], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, name, phone: phone });
    });
  });
});

ipcMain.handle('add-ticket', async (event, naneticket, create_at) => {
  const vardate = create_at || new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO ticket (naneticket,created_date) VALUES (?, ?)', [naneticket, create_at], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, naneticket, created_date : vardate });
    });
  });
});

// ตัวอย่าง handler
// ipcMain.handle('add-user', async (event, name) => {
//   // ตัวอย่าง: เพิ่ม user (คุณเปลี่ยนเป็นโค้ดฐานข้อมูลได้)
//   return { id: Date.now(), name };
// });

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (db) db.close();
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});