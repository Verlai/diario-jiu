(() => {
  const status = document.getElementById('pwaStatus');
  const button = document.getElementById('pwaInstall');
  let promptEvent = null, offlineReady = false;
  const updateStatus = () => {
    status.textContent = navigator.onLine
      ? (offlineReady ? 'Online · interface pronta para uso offline neste navegador.' : 'Online · preparando interface offline…')
      : (offlineReady ? 'Sem internet · envios ficarão pendentes até reconectar.' : 'Sem internet · disponibilidade offline ainda não confirmada.');
  };
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); promptEvent = event; button.classList.remove('hidden');
  });
  button.addEventListener('click', async () => {
    if(!promptEvent) return;
    const event = promptEvent; promptEvent = null; button.classList.add('hidden');
    try { await event.prompt(); await event.userChoice; } catch { }
  });
  window.addEventListener('appinstalled', () => { promptEvent = null; button.classList.add('hidden'); });
  if(!('serviceWorker' in navigator) || !window.isSecureContext){
    status.textContent = 'Para instalar e usar offline, abra o endereço HTTPS publicado no GitHub Pages (não o arquivo local).';
    return;
  }
  updateStatus();
  navigator.serviceWorker.register('./sw.js', {scope:'./', updateViaCache:'none'}).then(reg => {
    const waitingNotice = () => {
      if(reg.waiting) status.textContent = 'Atualização disponível: aguarde o rascunho salvar, feche todas as janelas/abas deste app e abra novamente.';
    };
    waitingNotice();
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker?.addEventListener('statechange', () => { if(worker.state === 'installed') waitingNotice(); });
    });
    navigator.serviceWorker.ready.then(() => { offlineReady = true; updateStatus(); waitingNotice(); });
    reg.update().catch(() => {});
  }).catch(() => { status.textContent = 'Não foi possível preparar o modo offline. Verifique HTTPS e os arquivos publicados e recarregue online.'; });
})();
