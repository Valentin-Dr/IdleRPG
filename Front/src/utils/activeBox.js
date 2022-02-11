

const activeThumb = (elem) => {
  if (!elem.classList.contains('on')) {
    let objects =  elem.parentElement.children;
    for(let i = 0; i < objects.length; i++) {
      if (objects[i].classList.contains('on')) {
        objects[i].classList.remove('on');
        break;
      }
    }
    elem.classList.add('on');
  } 
}

export default activeThumb;
