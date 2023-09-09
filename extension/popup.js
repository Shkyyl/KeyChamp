function joinCaseBattle() {
  chrome.storage.local.get(["TARGETS"], function(result) {
    const targets = result.TARGETS || ['TOXIC', 'DIABLO', 'SPARK', 'ICE BLAST', 'TEETH', 'BEAST', 'SERENITY', 'JOY', 'PROGRESS', 'KITTY', 'ONYX'];
    (async () => {
      while (true) {
        await new Promise(r => setTimeout(r, 100));
        try {
          const caseNames = [...document.querySelectorAll('p.max-w-full.px-1.overflow-hidden')].splice(0, 5).map(e => e.textContent);
          const casePrices = [...document.querySelectorAll('div.w-fit p.text-center.font-semibold.leading-none')].splice(0, 5).map(e => e.textContent);
          const targetIndex = caseNames.findIndex(name => targets.includes(name));
          if (casePrices[targetIndex] === 'x1' && targetIndex !== -1) {
            const btns = [...document.querySelectorAll('a.button.mr-5')];
            const btn = btns[targetIndex];
            btn.click();
          }
        } catch {null;}
      }
    })();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("join-button").addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        var tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: joinCaseBattle,
        });
      } else {
        console.error("No active tab found.");
      }
    });
  });
  document.getElementById("options-button").addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
});