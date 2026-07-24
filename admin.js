let CURRENT_SETTINGS = {};

async function loginAdmin() {
  const pass = document.getElementById('adminPass').value;
  const settings = await getCompanySettings();
  if (pass === (settings.adminPassword || '1234')) {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    loadAdminFields(settings);
    loadMessages();
  } else {
    alert('❌ Teny miafina tsy izy!');
  }
}

function logoutAdmin() {
  document.getElementById('adminDashboard').classList.add('hidden');
  document.getElementById('authSection').classList.remove('hidden');
}

function loadAdminFields(settings) {
  CURRENT_SETTINGS = settings;
  document.getElementById('admCompanyName').value = settings.companyName || '';
  document.getElementById('admPhone').value = settings.phone || '';
  document.getElementById('admEmail').value = settings.email || '';
  document.getElementById('admAddress').value = settings.address || '';
  document.getElementById('admHeroTitle').value = settings.heroTitle || '';
}

async function saveGeneralSettings() {
  CURRENT_SETTINGS.companyName = document.getElementById('admCompanyName').value;
  CURRENT_SETTINGS.phone = document.getElementById('admPhone').value;
  CURRENT_SETTINGS.email = document.getElementById('admEmail').value;
  CURRENT_SETTINGS.address = document.getElementById('admAddress').value;
  CURRENT_SETTINGS.heroTitle = document.getElementById('admHeroTitle').value;

  if (db) {
    try {
      await db.collection('company_settings').doc('general').set(CURRENT_SETTINGS, { merge: true });
    } catch(e) { console.error(e); }
  }
  localStorage.setItem('apex_company_settings', JSON.stringify(CURRENT_SETTINGS));
  alert('✅ Voahitsy sy voatehiry soa aman-tsara ny fampahafantarana!');
}

async function loadMessages() {
  const container = document.getElementById('messagesContainer');
  let list = [];
  if (db) {
    try {
      const snap = await db.collection('contact_messages').get();
      snap.forEach(d => list.push(d.data()));
    } catch(e) { console.warn(e); }
  }
  if (list.length === 0) {
    list = JSON.parse(localStorage.getItem('apex_messages') || '[]');
  }
  if (list.length === 0) {
    container.innerHTML = '<p class="text-slate-500">Tsy misy hafatra voaray amin\'izao fotoana izao.</p>';
    return;
  }
  container.innerHTML = list.map(m => `
    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
      <div class="flex justify-between items-center text-blue-400 font-bold">
        <span>${m.name} (${m.phone || m.email})</span>
        <span class="text-[10px] text-slate-500">${m.date || ''}</span>
      </div>
      <p class="font-semibold text-white">${m.subject || 'Tsy misy lohahevitra'}</p>
      <p class="text-slate-400">${m.message}</p>
    </div>
  `).join('');
}