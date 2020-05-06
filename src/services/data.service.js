
export const dataService = {
  saveSettings
};

function saveSettings(set, settings) {
  localStorage.setItem('set', set);
  localStorage.setItem('settings', settings);
}
