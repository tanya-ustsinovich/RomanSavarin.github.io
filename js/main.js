;
(function() {

  var menu = document.getElementById('menu');
  var main = document.getElementById('main');
  var ol = document.getElementById('numbers-column');
  var sectionsCollection = main.getElementsByClassName('toggleable-sections');

  var START_PAGE = {
    sectionToShow: 'index',
    fileName: 'index.html'
  };

  menu.addEventListener('click', handleMenuClick);
  window.addEventListener('resize', onWindowResize);

  showChosenSection(START_PAGE.sectionToShow);
  passItemTextToTab(START_PAGE.fileName);

  function handleMenuClick(e) {
    var chosenMenuItem = e.target.closest('li');
    var chosenMenuItemText = chosenMenuItem.innerText;
    var chosenMenuItemId = chosenMenuItem.id.replace('-li', '');
    if (chosenMenuItem && chosenMenuItemId) {
      highlightMenuItem(chosenMenuItem);
      passItemTextToTab(chosenMenuItemText);
      showChosenSection(chosenMenuItemId);
    }
  };

  function onWindowResize() {
    var activeSection = main.querySelector('section.active');
    addLinesNumbersColumn(activeSection);
  };

  function highlightMenuItem(item) {
    makeActive(item, menu.children);
  };

  function passItemTextToTab(name) {
    document.getElementById('file-name').innerText = name;
  }

  function showChosenSection(selector) {
    var sectionToShow = sectionsCollection.namedItem(selector);
    makeActive(sectionToShow, sectionsCollection);
    addLinesNumbersColumn(sectionToShow);
  };

  function makeActive(elementToActivate, collection) {
    removeClassFromElements(collection, 'active');
    elementToActivate.className += ' active';
  };

  function removeClassFromElements(collection, classToRemove) {
    [].forEach.call(collection, function(elem) {
      elem.classList.remove(classToRemove);
    });
  };

  function addLinesNumbersColumn(activeSection) {
    var linesAmount = activeSection.offsetHeight / getDefaultFontSize();
    removeElementsFromNode(ol);
    for (var i = 0; i < linesAmount; i++) {
      ol.appendChild(document.createElement('li'));
    }
  };

  function removeElementsFromNode(ol) {
    while (ol.firstChild) {
      ol.removeChild(ol.firstChild);
    }
  };

  function getDefaultFontSize() {
    var tempEl = document.createElement('div');
    tempEl.style.cssText = 'font-size:1em; display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden;';
    tempEl.appendChild(document.createTextNode('M'));
    document.body.appendChild(tempEl);
    var fontSize = tempEl.offsetHeight;
    document.body.removeChild(tempEl);
    return fontSize;
  };

})();