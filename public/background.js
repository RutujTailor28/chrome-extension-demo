/*global chrome*/

chrome.runtime.onInstalled.addListener(() => {
  const secret = Math.random().toString(36).substring(2, 12);
  chrome.storage.sync.set({ secretKey: secret });
  return;
});
