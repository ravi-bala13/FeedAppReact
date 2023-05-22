function loadData(key) {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);

    return data;
  } catch (err) {
    console.log("err:", err);
    return undefined;
  }
}

function clearLocalStorage() {
  alert("Log out successfully");
  localStorage.clear();
}

function saveData(key, data) {
  console.log("saveData:", data);
  if (data) localStorage.setItem(key, JSON.stringify(data));
}

export { loadData, saveData, clearLocalStorage };
