const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addUser: (name, phone) => ipcRenderer.invoke('add-user', name, phone),
  addTicket: (title, create_at) => ipcRenderer.invoke('add-ticket', title, create_at),
});


