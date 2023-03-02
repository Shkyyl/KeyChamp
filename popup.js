function joinCaseBattle(){
    
const TARGETS = ['TOXIC', 'DIABLO', 'SPARK', 'ICE BLAST', 'TEETH', 'BEAST', 'SERENITY', 'JOY', 'PROGRESS'];

(async () => {
  while (true) {
    const offset = (Math.random() + 1.2);
    await new Promise(r => setTimeout(r, 100));
    try {
      const caseNames = (([...document.querySelectorAll('p.max-w-full.px-1.overflow-hidden')]).splice(0, 3)).map(e => e.textContent);
      const casePrices = (([...document.querySelectorAll('div.flex.items-center.justify-center.rounded-tl-lg')]).splice(0, 3)).map(e => e.textContent);
      if (casePrices[caseNames.indexOf(caseNames.find(name => TARGETS.includes(name)))] === 'FREE' && caseNames.some(str => TARGETS.includes(str))) {
        const btns = [...document.querySelectorAll('a.button.mr-5')];
        const btn = btns[caseNames.indexOf(caseNames.find(name => TARGETS.includes(name)))];
        btn.click();
        while (true) {
          const offset = (Math.random() + 1.2);
          await new Promise(r => setTimeout(r, (100 * offset)));
          try {
            const joinBtn = document.querySelector('button.h-12.button-green-dimmed');
            if (joinBtn) {
              joinBtn.click();
              break;
            }
          } catch {null;}
        }
      }
    } catch {null;}
  }
})();
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("join-button").addEventListener('click', function(){
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
    })
})