const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addUser: (name, phone) => ipcRenderer.invoke('add-user', name, phone),
});


