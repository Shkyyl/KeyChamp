document.addEventListener('DOMContentLoaded', function() {
    const caseList = document.getElementById('case-list');
    chrome.storage.local.get({TARGETS: [], USERS: []}, (data) => {
      const users = data.USERS;
      const targets = data.TARGETS;
      const checkboxElements = document.querySelectorAll('.checkbox-wrapper-18');
      const caseElements = document.querySelectorAll('.setting');
      checkboxElements.forEach((checkboxElement) => {
        const user = checkboxElement.querySelector('span').textContent;
        const checkbox = checkboxElement.querySelector('input[type="checkbox"]');
        if(users.includes(parseInt(user))){
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
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
      checkboxElements.forEach((checkboxElement) => {
        const user = checkboxElement.querySelector('span').textContent;
        const checkbox = checkboxElement.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
          if(checkbox.checked){
            users.push(parseInt(user));
          } else {
            const index = users.indexOf(parseInt(user));
            if(index !== -1){
              users.splice(index, 1);
            }
          }
        });
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
          chrome.storage.local.set({TARGETS: targets, USERS: users});
        }
        chrome.storage.local.get(["TARGETS", "USERS"], (data) => {
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


