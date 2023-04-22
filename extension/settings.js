document.addEventListener('DOMContentLoaded', function() {
    const caseList = document.getElementById('case-list');

    chrome.storage.local.get({TARGETS: []}, (data) => {
      const targets = data.TARGETS;
      const caseElements = document.querySelectorAll('.setting');
      caseElements.forEach((caseElement) => {
        const caseType = caseElement.dataset.case;
        const checkbox = caseElement.querySelector('.case-checkbox');
        if (targets.includes(caseType)) {
          checkbox.checked = true;
          caseElement.classList.add('s-active');
          caseElement.classList.remove('s-disabled');
        } else {
          checkbox.checked = false;
          caseElement.classList.add('s-disabled');
          caseElement.classList.remove('s-active');
        }
      });
      caseList.addEventListener('click', function(event) {
        const caseElement = event.target.closest('.setting');
        if (caseElement) {
          const caseType = caseElement.dataset.case;
          const checkbox = caseElement.querySelector('.case-checkbox');
          if (checkbox) {
            const isChecked = checkbox.checked;
            if (!isChecked && targets.includes(caseType)) {
              caseElement.classList.remove('s-active');
              caseElement.classList.add('s-disabled');
              const index = targets.indexOf(caseType);
              targets.splice(index, 1);
              checkbox.checked = false;
            } else if(isChecked && !targets.includes(caseType)){
              caseElement.classList.add('s-active');
              caseElement.classList.remove('s-disabled');
              targets.push(caseType);
              checkbox.checked = true;
            }
  
            
          }
          chrome.storage.local.set({TARGETS: targets});
        }
        chrome.storage.local.get(["TARGETS"], (data) => {
          console.log(data);
        })
      });
    })



    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
        event.stopPropagation();
      }, true
    );
  });


