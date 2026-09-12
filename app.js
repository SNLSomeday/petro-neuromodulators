'use strict';

const regions = {
  frontalis: '<path class="region" d="M33 26.3 Q36.6 22.4 43.2 20.2 Q47.9 27.1 46.3 35.2 L33.5 35 Q34 31 33 26.3 Z M67 26.3 Q63.4 22.4 56.8 20.2 Q52.1 27.1 53.7 35.2 L66.5 35 Q66 31 67 26.3 Z"/>',
  corrugator: '<path class="region" d="M41 34.3 Q45 35.1 47.7 39 L46.4 41.5 Q43.1 39 40.8 36.6 Z M59 34.3 Q55 35.1 52.3 39 L53.6 41.5 Q56.9 39 59.2 36.6 Z"/>',
  procerus: '<ellipse class="region" cx="49.8" cy="39.3" rx="2.8" ry="5"/>',
  eyes: '<ellipse class="region" cx="38" cy="44.5" rx="9.6" ry="8.4"/><ellipse class="region" cx="61.5" cy="44.5" rx="9.6" ry="8.4"/>',
  outerEyes: '<path class="region" d="M29.2 39 Q27.7 44.5 29.5 51.5 L33 49.5 Q30.8 44.5 32.8 41 Z M70.3 39 Q71.8 44.5 70 51.5 L66.5 49.5 Q68.7 44.5 66.7 41 Z"/>',
  mentalis: '<ellipse class="region" cx="49.3" cy="82.4" rx="5.7" ry="4.1"/>',
  dao: '<path class="region" d="M 39.5 71.4 Q 36.3 75.8 35.8 79.2 Q 38.7 82 43 83.1 L 42.2 76 Z M 60.5 71.4 Q 63.7 75.8 64.2 79.2 Q 61.3 82 57 83.1 L 57.8 76 Z"/>',
  platysma: '<path class="region" d="M32 89 Q32.8 101 20.2 111.7 L11.5 117 L46.4 124.5 L48 91.8 Z M68 89 Q67.2 101 79.8 111.7 L88.5 117 L53.6 124.5 L52 91.8 Z"/>',
  masseter: '<path class="region" d="M 28 59.2 Q 31 58.8 33.2 62.8 L 35 75.8 Q 33.6 77.9 31.6 75.6 Q 28 70.7 27.8 64.5 Z M 72 59.2 Q 69 58.8 66.8 62.8 L 65 75.8 Q 66.4 77.9 68.4 75.6 Q 72 70.7 72.2 64.5 Z"/>',
  glabella: '<ellipse class="region" cx="49.8" cy="37.8" rx="8.1" ry="5"/>',
  lips: '<ellipse class="region" cx="49.3" cy="66.9" rx="10.5" ry="2.2"/>',
  oris: '<ellipse class="region" cx="49.3" cy="70.3" rx="12" ry="6.2"/>',
  zygomaticus: '<path class="region" d="M 29.8 52.9 Q 37.4 56.7 42 67.3 L 39.4 70.7 Q 35.1 62.6 28.4 57.3 Z M 70.2 52.9 Q 62.6 56.7 58 67.3 L 60.6 70.7 Q 64.9 62.6 71.6 57.3 Z"/>',
  elevators: '<path class="region" d="M 41.6 52.2 Q 43.2 54.7 43.3 58.2 Q 43.2 62.2 45.5 65.8 L 41 66.8 Q 37.8 62.9 39 58.2 Q 39.5 54.5 41.6 52.2 Z M 58.4 52.2 Q 56.8 54.7 56.7 58.2 Q 56.8 62.2 54.5 65.8 L 59 66.8 Q 62.2 62.9 61 58.2 Q 60.5 54.5 58.4 52.2 Z"/>',
  bunny: '<ellipse class="region" cx="49.8" cy="50.7" rx="6.3" ry="3.8"/>',
  nasal: '<path class="region" d="M 45.2 49 Q 43.5 52.2 42.4 55.8 L 42 61 Q 45.4 62.3 47.8 59.6 L 52.2 59.6 Q 54.6 62.3 58 61 L 57.6 55.8 Q 56.5 52.2 54.8 49 Z"/>',
  alar: '<path class="region" d="M 43 56 Q 40.6 57.9 42 61.3 L 46.5 62.5 L 47 60 Q 44.4 60.2 43 56 Z M 57 56 Q 59.4 57.9 58 61.3 L 53.5 62.5 L 53 60 Q 55.6 60.2 57 56 Z"/>'
};

const muscles = [
  {name:'Frontalis',label:'Lifts the brows',region:'frontalis',title:'The brow lifter.',copy:'This forehead muscle raises the eyebrows. As the skin moves upward, horizontal forehead folds can appear.',note:'Brow position matters along with the lines. Some people use their forehead to help support their brows.'},
  {name:'Corrugator',label:'Gathers the inner brows',region:'corrugator',title:'A small muscle. An inward pull.',copy:'The corrugator supercilii draws the inner brows toward one another and downward. It works with neighboring muscles during a frown.',note:'The familiar vertical “11s” are skin folds. The muscle pattern underneath varies.'},
  {name:'Procerus',label:'Lowers the inner-brow region',region:'procerus',title:'Across the bridge.',copy:'This small muscle over the root of the nose pulls the inner-brow region downward and can create horizontal folds at the upper bridge.',note:'It overlaps and works with the nearby brow muscles.'},
  {name:'Orbicularis oculi',label:'Closes the eyes',region:'eyes',title:'More than crow’s feet.',copy:'This muscle surrounds the eye and helps close the eyelids. Its outer activity gathers skin during smiling and squinting.',note:'Eye closure is an important function. A line is only one part of the muscle’s job.'},
  {name:'Mentalis',label:'Lifts the chin tissue',region:'mentalis',title:'The chin in motion.',copy:'These paired central chin muscles lift the soft tissue of the chin and help support the lower lip. Contraction can make the skin look pebbled or dimpled.',note:'The chin and the lower lip need to be considered together.'},
  {name:'DAO',label:'Draws mouth corners down',region:'dao',title:'One pull down. Another pull up.',copy:'The depressor anguli oris pulls a mouth corner down. The zygomaticus major helps lift it up and outward. Dr. Petro looks at how these pulls work together while you talk and smile.',note:'Softening a downward pull may let the upward movement show more. It does not change your mood or strengthen the lifting muscle.'},
  {name:'Platysma',label:'Moves the neck and lower face',region:'platysma',title:'A thin, broad sheet.',copy:'The platysma is a superficial muscle that continues from the neck into the lower face. Its activity can make vertical neck bands more visible.',note:'A vertical band and a horizontal neck crease are different observations.'},
  {name:'Masseter',label:'Closes the jaw for chewing',region:'masseter',title:'This one helps you chew.',copy:'This powerful muscle lies over the back of the jaw and becomes firm when you clench. It is a muscle of chewing, rather than a muscle of facial expression.',note:'Jaw width can come from bone, fat, muscle or a combination.'},
  {name:'Orbicularis oris',label:'Closes and puckers the lips',region:'oris',title:'Think of a drawstring purse.',copy:'Dr. Petro compares the muscle around your mouth to a purse’s drawstring. It helps close and pucker your lips. Relaxing a small part near the upper lip can let a little more pink show.',note:'The fibers overlap and work with neighboring muscles. The drawstring is an analogy; this muscle also helps you speak, sip and eat.'},
  {name:'Zygomaticus major',label:'Lifts the mouth corners',region:'zygomaticus',title:'The upward side of your smile.',copy:'This muscle helps draw the corner of your mouth up and outward. Its pull works alongside the DAO’s downward pull and other smile muscles.',note:'Dr. Petro watches the whole smile. A downturned corner can involve muscle pull, tissue position or both.'},
  {name:'Upper-lip elevators',label:'Raise the upper lip',region:'elevators',title:'How far does your lip lift?',copy:'Several muscles beside the nose and above the mouth lift your upper lip. A strong upward movement can reveal more gum when you smile. Dr. Petro watches that lift alongside the rest of your smile.',note:'Gum display also depends on teeth, gums and jaw structure. Showing some gum is normal and does not automatically need treatment.'},
  {name:'Nasal & alar muscles',label:'Move the nose and nostrils',region:'nasal',title:'A scrunch and a flare.',copy:'Small muscles around the nose help move its sides and nostrils. Scrunching can gather skin near the bridge; flaring moves the nostril edges outward. Several neighboring muscles can contribute.',note:'Dr. Petro distinguishes the movement you notice from the shape of your nasal bone and cartilage.'}
];

function setPressed(container, selected) {
  container.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
}
function reading(title, copy, note, eyebrow='') {
  return `${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h3>${title}</h3><p>${copy}</p>${note ? `<p class="detail-note">${note}</p>` : ''}`;
}

const muscleList = document.getElementById('muscle-list');
// Coordinates share the portrait's viewBox so movement stays registered at every size.
const muscleMovements = {
  frontalis: {label:'The brows lift upward.', paths:['M38 33 Q38 28 37 24','M62 33 Q62 28 63 24']},
  corrugator: {label:'The inner brows draw inward and down.', paths:['M40 33 Q44 34 46.7 38','M60 33 Q56 34 53.3 38']},
  procerus: {label:'The inner-brow region moves downward.', paths:['M49.8 33 L49.8 41']},
  eyes: {label:'The eyelids move toward each other to close.', paths:['M38 36.5 L38 41','M38 52 L38 48','M61.5 36.5 L61.5 41','M61.5 52 L61.5 48']},
  mentalis: {label:'The chin tissue lifts toward the lower lip.', paths:['M47 85 L47 79','M52 85 L52 79']},
  dao: {label:'The mouth corners pull downward.', paths:['M39.5 72 Q37.5 75 36.8 79','M60.5 72 Q62.5 75 63.2 79']},
  platysma: {label:'The lower face pulls down as the neck tenses.', paths:['M35 88 Q34 94 30 100','M65 88 Q66 94 70 100']},
  masseter: {label:'The lower jaw lifts to close the mouth.', paths:['M30 76 L29.5 65','M70 76 L70.5 65']},
  oris: {label:'The lips gather inward to close and purse.', paths:['M34 70 L40 70','M65 70 L59 70','M49.5 61.5 L49.5 66','M49.5 79 L49.5 74']},
  zygomaticus: {label:'The mouth corners lift up and outward.', paths:['M39.5 70 Q35 63 30 58','M60.5 70 Q65 63 70 58']},
  elevators: {label:'The upper lip lifts beside the nose.', paths:['M43 66 Q40 60 41 55','M57 66 Q60 60 59 55']}
};
const nasalMovements = {
  compress: {
    label:'The nasal sides draw inward.',
    paths:['M41 54.5 L46 54.5','M59 54.5 L54 54.5'],
    region:'<path class="region" d="M43 51.5 Q46 52.2 49.7 53.2 L49.7 55.7 Q46.1 55.1 43 56.7 Z M57 51.5 Q54 52.2 50.3 53.2 L50.3 55.7 Q53.9 55.1 57 56.7 Z"/>',
    copy:'The transverse part of nasalis compresses the nasal opening. A nose scrunch can also involve neighboring muscles.'
  },
  flare: {
    label:'The nostril edges move outward.',
    paths:['M44 59.8 L38.5 59.8','M56 59.8 L61.5 59.8'],
    region:regions.alar,
    copy:'The alar part helps draw the nostril edges outward. Watch the sides widen.'
  }
};
function movementArrows(paths, prefix) {
  return `<defs><marker id="${prefix}-head" viewBox="0 0 6 6" markerWidth="3.2" markerHeight="3.2" refX="4.8" refY="3" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1 L5 3 L1 5" class="movement-arrow-head"/></marker></defs>` + paths.map(d=>`<path d="${d}" class="movement-arrow" marker-end="url(#${prefix}-head)"/>`).join('');
}
let selectedMuscle = 0;
let muscleView = true;
let nasalMode = 'compress';
function showMuscle(index) {
  selectedMuscle = index;
  const item = muscles[index];
  setPressed(muscleList, muscleList.children[index]);
  const isNasal = item.region === 'nasal';
  const movement = isNasal ? nasalMovements[nasalMode] : muscleMovements[item.region];
  const region = isNasal ? movement.region : regions[item.region];
  document.getElementById('anatomy-region').innerHTML = muscleView ? region : '';
  document.getElementById('muscle-arrows').innerHTML = movementArrows(movement.paths,'muscle');
  document.getElementById('muscle-direction').textContent = movement.label;
  document.getElementById('nasal-detail').hidden = !isNasal;
  if(isNasal) {
    document.getElementById('nasal-closeup-region').innerHTML = muscleView ? region : '';
    document.getElementById('nasal-closeup-arrows').innerHTML = movementArrows(movement.paths,'nasal');
    document.getElementById('nasal-closeup-title').textContent = `Close-up: ${movement.label}`;
    document.getElementById('nasal-explanation').textContent = movement.copy;
  }
  document.getElementById('muscle-reading').innerHTML = reading(item.title,item.copy,item.note,item.name);
}
document.querySelectorAll('[data-nasal]').forEach(button => {
  button.addEventListener('click',()=>{
    nasalMode = button.dataset.nasal;
    setPressed(button.parentElement,button);
    showMuscle(selectedMuscle);
  });
});
muscles.forEach((item,index) => {
  const button = document.createElement('button');
  button.type='button'; button.innerHTML=`${item.name}<small>${item.label}</small>`;
  button.setAttribute('aria-pressed','false');
  button.addEventListener('click',()=>showMuscle(index));
  muscleList.append(button);
});
showMuscle(0);
const anatomyImg=document.querySelector('#anatomy-image img');
function changeView(show) {
  muscleView=show;
  anatomyImg.src=show?'assets/melanie-anatomy-watercolor-v2.png':'assets/melanie-skin-watercolor-v2.png';
  anatomyImg.alt=show?'Watercolor likeness of Dr. Melanie Petro with the selected muscle outlined and arrows showing movement.':'Watercolor likeness of Dr. Melanie Petro at the skin surface, with arrows showing the selected movement.';
  document.getElementById('nasal-closeup-image').setAttribute('href',anatomyImg.getAttribute('src'));
  document.getElementById('muscle-view').setAttribute('aria-pressed',String(show));
  document.getElementById('skin-view').setAttribute('aria-pressed',String(!show));
  showMuscle(selectedMuscle);
}
document.getElementById('muscle-view').addEventListener('click',()=>changeView(true));
document.getElementById('skin-view').addEventListener('click',()=>changeView(false));

const expressions=[
  {title:'At rest',pos:'0% 0%',copy:'A resting face gives a starting point. Natural asymmetry, brow position and lines visible without movement all matter.'},
  {title:'Brows lift',pos:'50% 0%',copy:'The frontalis lifts the brows, moving the forehead skin upward. Horizontal folds may appear as it does.'},
  {title:'Brows gather',pos:'100% 0%',copy:'The inner brows draw closer and lower. Several muscles contribute; the folds alone do not describe the whole pattern.'},
  {title:'Smile & squint',pos:'0% 100%',copy:'The cheeks lift and the skin around the outer eyes gathers. A smile is a coordinated movement, not an isolated wrinkle.'},
  {title:'Lips purse',pos:'50% 100%',copy:'The orbicularis oris gathers the lips like a drawstring. These small movements help you speak, sip, eat and express yourself. Dr. Petro considers those jobs along with the look of your lips.'},
  {title:'One brow lifts',pos:'100% 100%',copy:'One side can move differently from the other. The visible movement is real; its meaning depends on the person and the context.'}
];
const expressionGrid=document.getElementById('expression-grid');
function showExpression(index){
  setPressed(expressionGrid,expressionGrid.children[index]);
  document.getElementById('expression-reading').innerHTML=`<h3>${expressions[index].title}</h3><p>${expressions[index].copy}</p>`;
}
expressions.forEach((item,index)=>{
  const button=document.createElement('button');button.type='button';button.className='expression-button';
  button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',`Explore expression: ${item.title}`);
  button.innerHTML=`<div class="expression-portrait" style="background-position:${item.pos}" aria-hidden="true"></div><span class="expression-title"><span class="count">0${index+1}</span>${item.title}</span>`;
  button.addEventListener('click',()=>showExpression(index));expressionGrid.append(button);
});
showExpression(0);

const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const microFrame=document.getElementById('micro-frame');
const briefButton=document.getElementById('play-brief');
const slowButton=document.getElementById('play-slow');
const microStatus=document.getElementById('micro-status');
let microTimer=null;
function microPose(changed){
  microFrame.style.backgroundPosition=changed?'100% 100%':'0% 0%';
  microFrame.setAttribute('aria-label',changed?'Illustrated face with one eyebrow slightly lifted':'Illustrated face at rest');
}
function configureMotion(){
  clearTimeout(microTimer);microPose(false);briefButton.disabled=false;slowButton.disabled=false;
  briefButton.textContent=reducedMotion.matches?'Show the brow movement':'See the brief movement';
  slowButton.textContent=reducedMotion.matches?'Show the resting face':'Slow it down';
  microStatus.textContent=reducedMotion.matches?'Reduced-motion view: change between the two poses at your own pace.':'Press play. Watch the brow on your right.';
}
function playMicro(slow){
  if(reducedMotion.matches){microPose(!slow);microStatus.textContent=slow?'Resting face.':'One brow has lifted. This still frame does not identify an emotion.';return;}
  clearTimeout(microTimer);microPose(true);briefButton.disabled=true;slowButton.disabled=true;
  microStatus.textContent=slow?'Slowed illustration: the changed pose is held for 1.6 seconds.':'A brief illustrated brow movement: 200 milliseconds.';
  microTimer=setTimeout(()=>{microPose(false);briefButton.disabled=false;slowButton.disabled=false;microStatus.textContent=slow?'Back at rest. The longer view makes the brow movement easier to see.':'Back at rest. Use “Slow it down” to take a closer look.';},slow?1600:200);
}
briefButton.addEventListener('click',()=>playMicro(false));slowButton.addEventListener('click',()=>playMicro(true));reducedMotion.addEventListener('change',configureMotion);configureMotion();

const upperFace=[
  {name:'Forehead lines',region:'frontalis',title:'When your brows go up.',copy:'Raise your eyebrows and notice the horizontal folds. The forehead muscle creates that lift. Softening its activity can change both the lines and the brow position.',note:'Some people use their forehead to help hold their brows up. That support needs to be considered.'},
  {name:'Frown lines',region:'glabella',title:'That crease between the brows.',copy:'Concentrate, frown or face a bright light. Your inner brows may gather and draw downward. Neuromodulator treatment can soften selected movement in this area.',note:'Dr. Petro watches how you move while you talk. A photograph of the crease tells only part of the story.'},
  {name:'Crow’s feet',region:'outerEyes',title:'The crinkle beside your eyes.',copy:'Smile or squint and the skin beside your eyes gathers. Treatment can soften some of that activity. The same muscle also helps close your eyelids.',note:'The goal should consider comfortable eye closure as well as how the lines look.'},
  {name:'Nose-scrunch lines',region:'bunny',title:'When you scrunch your nose.',copy:'These little creases beside the bridge are often called bunny lines. Dr. Petro watches your nose, cheeks and upper lip move together. Softening a selected pull may soften the scrunch.',note:'An off-label cosmetic use. This changes movement; it does not shrink nasal bone or cartilage. Bunny lines and nostril flare are different concerns.'},
  {name:'Nostril flare',region:'alar',title:'When the sides of your nose widen.',copy:'The ala is the rounded edge of a nostril. When you smile or flare your nose, those edges may move outward. Dr. Petro can assess whether softening selected muscle activity may reduce that movement.',note:'An off-label use with limited evidence. It may reduce flare during expression; it does not promise a narrower nose at rest.'}
];
const lowerFace=[
  {name:'Lip flip',region:'lips',title:'A little more pink.',copy:'Think of the muscle around your lips like a drawstring purse. A lip flip relaxes a small part near the upper lip’s border so a little more pink may show. Dr. Petro considers how your lip sits and moves; this does not add filler volume.',note:'An off-label use. Even a small change can affect sipping, speech or lip control. Talk with Dr. Petro about what you want to keep as well as change.'},
  {name:'Gummy smile',region:'elevators',title:'More pink, or less lift?',copy:'A lip flip aims to show a little more pink lip. For a gummy smile, the goal may be to reduce a strong upward pull so the lip rises less. Dr. Petro watches your full smile and considers your teeth, gums and jaw before deciding whether muscle treatment makes sense.',note:'An off-label use. Some gum showing is normal. Treatment can also change smile symmetry or lip movement.'},
  {name:'Dimpled chin',region:'mentalis',title:'The chin that puckers.',copy:'Pout or press your lips together. The muscle in your chin may make the skin look pebbled. Softening selected activity may reduce movement-related dimpling.',note:'An off-label use. Your lower lip depends on nearby muscle support too.'},
  {name:'Mouth corners',region:'dao',title:'Finding the balance in your smile.',copy:'The DAO pulls down; the zygomaticus major helps pull the mouth corner up and outward. If downward pull is a big part of what you notice, Dr. Petro may soften it so the upward movement shows more. Your corners may look less downturned without your mood changing.',note:'An off-label use. Nearby muscles also move your lower lip. Unwanted weakness or asymmetry can affect your smile and normal mouth movements.'},
  {name:'Masseter prominence',region:'masseter',title:'The muscle you feel when you clench.',copy:'Place your fingers near the back of your jaw and gently clench. The muscle that firms up helps you chew. Treatment may reduce its prominence when enlarged muscle is the cause.',note:'An off-label cosmetic use. Jaw width can also come from bone or fat. Chewing weakness and jaw fatigue are possible.'},
  {name:'Platysma bands',region:'platysma',title:'The vertical bands in your neck.',copy:'A thin, broad muscle connects the neck with the lower face. When it tightens, vertical bands may become more visible. Treatment can soften selected muscle activity.',note:'Approval depends on the exact product. Vertical muscle bands are different from horizontal neck creases or loose skin.'}
];
const areaList=document.getElementById('area-list');let activeAreas=upperFace;let lowerSelected=false;
function showArea(index){
  const area=activeAreas[index];setPressed(areaList,areaList.children[index]);
  document.getElementById('area-region').innerHTML=regions[area.region];
  document.getElementById('area-reading').innerHTML=reading(area.title,area.copy,area.note,lowerSelected?'Lower face & neck':'Upper face');
}
function areaCategory(lower){
  lowerSelected=lower;activeAreas=lower?lowerFace:upperFace;
  document.getElementById('labeled-areas').setAttribute('aria-pressed',String(!lower));
  document.getElementById('offlabel-areas').setAttribute('aria-pressed',String(lower));
  document.getElementById('area-category-note').textContent='Dr. Petro will explain which medicine fits the movement you want to soften. Approval depends on the product and the area; some uses are off-label.';
  areaList.replaceChildren();activeAreas.forEach((area,index)=>{const button=document.createElement('button');button.type='button';button.textContent=area.name;button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>showArea(index));areaList.append(button);});showArea(0);
}
document.getElementById('labeled-areas').addEventListener('click',()=>areaCategory(false));document.getElementById('offlabel-areas').addEventListener('click',()=>areaCategory(true));areaCategory(false);

const patterns=[
  {name:'A broad lift',title:'Dr. Petro starts by watching you talk.',copy:'No two foreheads move exactly alike. Dr. Petro watches how your brows lift across the forehead while you talk, then looks at where they rest. That combination helps shape your plan.',note:'She reassesses your movement at each visit. The plan can change as your face and preferences change.',arrows:[[35,31,35,25],[43,29,43,22],[57,29,57,22],[65,31,65,25]],pos:'50% 0%'},
  {name:'More central lift',title:'Small adjustments can matter.',copy:'You may lift more through the center while the outer brow moves less. Dr. Petro considers those differences so selected movement can soften while other movement remains.',note:'Treatment is not an all-or-none choice. These arrows show an idea of movement, not a formula for your forehead.',arrows:[[43,29,43,21.5],[57,29,57,21.5]],pos:'50% 0%'},
  {name:'Two sides, different lift',title:'Keep the movements that make you, you.',copy:'That one-brow lift may be one of the quirky movements that decorate your face. Dr. Petro wants to know which expressions feel like you and which changes bother you before deciding what to soften.',note:'The two sides do not have to become mirror images. Bring your preferences into the conversation.',arrows:[[35,33,35,29],[65,30,65,25]],pos:'100% 100%'},
  {name:'A brow that needs support',title:'The forehead may be helping you.',copy:'You may use your forehead to help hold your brows up. Dr. Petro looks at your eyelids, resting brows and movement together before softening that support.',note:'Tell Dr. Petro how your last treatment felt when you talked, smiled and raised your brows. Each visit is a chance to reassess.',arrows:[[35,31,35,24.5],[65,31,65,24.5]],pos:'50% 0%'}
];
const patternList=document.getElementById('pattern-list');
function showPattern(index){
  const item=patterns[index];setPressed(patternList,patternList.children[index]);
  document.querySelector('.pattern-portrait .expression-portrait').style.backgroundPosition=item.pos;
  document.getElementById('pattern-reading').innerHTML=reading(item.title,item.copy,item.note);
  document.getElementById('pattern-arrows').innerHTML=`<defs><marker id="movement-arrow" markerWidth="5" markerHeight="5" refX="3.8" refY="2.5" orient="auto"><path d="M0 0 L4 2.5 L0 5" fill="none" stroke="#4a4a49" stroke-width=".9"/></marker></defs>${item.arrows.map(a=>`<path d="M${a[0]} ${a[1]} Q${(a[0]+a[2])/2+.5} ${(a[1]+a[3])/2} ${a[2]} ${a[3]}" fill="none" stroke="#4a4a49" stroke-width=".4" marker-end="url(#movement-arrow)"/>`).join('')}`;
}
patterns.forEach((item,index)=>{const button=document.createElement('button');button.type='button';button.textContent=item.name;button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>showPattern(index));patternList.append(button);});showPattern(0);

window.initMechanism('#mechanism');

// Open source notes before navigating to a reference inside them.
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
  const target=document.getElementById(link.getAttribute('href').slice(1));
  if(!target)return;let parent=target.closest('details');if(parent)parent.open=true;
  const sourceDetails=target.id==='sources'?target.querySelector('details'):null;
  if(sourceDetails)sourceDetails.open=true;
}));
const navLinks=[...document.querySelectorAll('.chapter-links a')];
const chapterNodes=navLinks.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
function updateChapter(){
  if(!chapterNodes.length)return;
  let current=chapterNodes[0];for(const chapter of chapterNodes){if(chapter.getBoundingClientRect().top<=150)current=chapter;}
  navLinks.forEach(link=>{if(link.hash==='#'+current.id)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
}
let ticking=false;window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{updateChapter();ticking=false;});ticking=true;}},{passive:true});updateChapter();
