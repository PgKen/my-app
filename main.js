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

  win.loadURL('http://localhost:3000');
}

const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // สร้างตาราง users ถ้ายังไม่มี
    db.run(`
          CREATE TABLE IF NOT EXISTS "users" (
	        "id"	INTEGER,
	        "name"	TEXT NOT NULL,
	        "tel"	TEXT,
	        PRIMARY KEY("id" AUTOINCREMENT)
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