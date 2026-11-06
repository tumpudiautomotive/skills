const chooser=document.querySelector('.course-chooser');let chooserTrigger=null;let previousOverflow='';
document.querySelectorAll('[data-open-courses]').forEach(button=>button.addEventListener('click',()=>{chooserTrigger=button;previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';chooser.showModal()}));
document.querySelector('.chooser-close').addEventListener('click',()=>chooser.close());
chooser.addEventListener('click',event=>{if(event.target!==chooser)return;const r=chooser.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)chooser.close()});
chooser.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;chooserTrigger?.focus()});
// Pause moving logos while they are touched, hovered or keyboard-focused.
document.querySelectorAll('.logo-lane').forEach(lane=>{
 lane.addEventListener('pointerdown',()=>lane.classList.add('is-paused'));
 lane.addEventListener('pointerleave',()=>lane.classList.remove('is-paused'));
 lane.addEventListener('pointerup',()=>lane.classList.remove('is-paused'));
 lane.addEventListener('pointercancel',()=>lane.classList.remove('is-paused'));
});
