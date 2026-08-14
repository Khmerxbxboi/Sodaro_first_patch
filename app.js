const $=(s)=>document.querySelector(s), $$=(s)=>document.querySelectorAll(s);
const menu=$('.menu'),nav=$('.topbar nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
const datasets={
slow:{word:'SLOW',reason:'Road construction on Telegraph Avenue is reducing nearby foot traffic.',action:'Try a lunch special from 12–2 PM and post a same-day offer.',impact:'A focused promotion may recover 12–18% of weekday sales.',visitors:43,sales:'$318',customers:4,traffic:'-28%',trend:[72,64,58,51,46,42,40,44,39,36,41,43]},
normal:{word:'NORMAL',reason:'Typical weekday activity with steady nearby traffic.',action:'Keep regular hours and promote today’s best seller.',impact:'Maintain stable sales and prepare for the evening rush.',visitors:84,sales:'$612',customers:9,traffic:'Normal',trend:[58,62,59,65,63,68,66,70,67,72,71,74]},
busy:{word:'BUSY',reason:'A community event near Lake Merritt is increasing foot traffic.',action:'Stay open one hour later and highlight fast-selling items.',impact:'The extra traffic could add 20–31% in daily revenue.',visitors:132,sales:'$1,084',customers:18,traffic:'+31%',trend:[42,49,55,60,68,73,78,84,88,82,94,100]}
};
const nonprofitDatasets={
slow:{word:'SLOW',reason:'Construction and transit changes are making it harder for community members to reach the organization.',action:'Send a community update, promote alternate access, and move one program or service online if possible.',impact:'Clear outreach can protect attendance, volunteers, and donation activity during the disruption.',visitors:38,sales:'$1,240',customers:6,traffic:'-24%',trend:[70,63,57,52,48,43,41,45,42,40,44,46]},
normal:{word:'NORMAL',reason:'Regular community activity is steady and nearby access is operating normally.',action:'Keep the normal program schedule and remind supporters about this week’s services or events.',impact:'Stable visibility can maintain attendance, volunteer participation, and recurring support.',visitors:91,sales:'$2,860',customers:14,traffic:'Normal',trend:[57,60,61,64,66,65,69,68,71,73,72,75]},
busy:{word:'BUSY',reason:'A nearby cultural event is increasing community interest and visitor activity.',action:'Add volunteers, extend welcome hours, and highlight donation, membership, or program information.',impact:'Higher visibility may increase attendance, volunteers, donations, and future community participation.',visitors:156,sales:'$4,420',customers:27,traffic:'+36%',trend:[43,50,56,62,69,75,82,86,90,88,96,100]}
};
const organizationTypes={
business:['Cafe','Retail','Food Truck','Creative Studio'],
nonprofit:['Cambodian Temple','Community Center','Arts Nonprofit','Food Program']
};
let current='normal',business='Cafe',organizationKind='business';
function updateTypeButtons(){const wrap=$('#businessTypes');wrap.innerHTML=organizationTypes[organizationKind].map((name,i)=>`<button class="${i===0?'active':''}" data-business="${name}">${name}</button>`).join('');business=organizationTypes[organizationKind][0];wrap.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{wrap.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');business=b.dataset.business;updateDashboard()}));}
function updateDashboard(){const d=(organizationKind==='nonprofit'?nonprofitDatasets:datasets)[current];$('#statusWord').textContent=d.word;$('#reasonText').textContent=d.reason;$('#actionText').textContent=d.action;$('#impactText').textContent=d.impact;$('#visitors').textContent=d.visitors;$('#sales').textContent=d.sales;$('#customers').textContent=d.customers;$('#traffic').textContent=d.traffic;$('#businessLabel').textContent=`${business} · Downtown Oakland`;$('#visitorsLabel').textContent=organizationKind==='nonprofit'?'Visitors':'Visitors';$('#salesLabel').textContent=organizationKind==='nonprofit'?'Donations':'Sales';$('#customersLabel').textContent=organizationKind==='nonprofit'?'New supporters':'New customers';$('#trafficLabel').textContent=organizationKind==='nonprofit'?'Community activity':'Foot traffic';drawChart(d.trend);renderMiniAlerts();}
function drawChart(values){const c=$('#trendChart'),ctx=c.getContext('2d'),w=c.width,h=c.height;ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(255,255,255,.09)';ctx.lineWidth=1;for(let i=1;i<4;i++){ctx.beginPath();ctx.moveTo(0,(h/4)*i);ctx.lineTo(w,(h/4)*i);ctx.stroke()}const min=Math.min(...values)-5,max=Math.max(...values)+5;ctx.beginPath();values.forEach((v,i)=>{const x=i*(w/(values.length-1)),y=h-((v-min)/(max-min))*h*.78-15;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle=current==='busy'?'#b7e51c':current==='slow'?'#ffb21c':'#16b7ff';ctx.lineWidth=5;ctx.stroke();values.forEach((v,i)=>{const x=i*(w/(values.length-1)),y=h-((v-min)/(max-min))*h*.78-15;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill()})}
function renderMiniAlerts(){const stack=$('#alertStack');stack.innerHTML=current==='slow'?'<div class="mini-alert"><strong>Construction impact</strong><span>Telegraph Ave lane closure</span></div><div class="mini-alert"><strong>Suggestion</strong><span>Promote delivery and lunch offers</span></div>':current==='busy'?'<div class="mini-alert"><strong>Community event</strong><span>Night market starts at 5 PM</span></div><div class="mini-alert"><strong>Suggestion</strong><span>Prepare extra inventory</span></div>':'<div class="mini-alert"><strong>City-code reminder</strong><span>Outdoor sign renewal due soon</span></div>';}
$$('#statusSwitch button').forEach(b=>b.addEventListener('click',()=>{$$('#statusSwitch button').forEach(x=>x.classList.remove('active'));b.classList.add('active');current=b.dataset.status;updateDashboard()}));
updateTypeButtons();
$$('#organizationKinds button').forEach(b=>b.addEventListener('click',()=>{$$('#organizationKinds button').forEach(x=>x.classList.remove('active'));b.classList.add('active');organizationKind=b.dataset.kind;updateTypeButtons();updateDashboard()}));
const scenes={crime:{title:'Safety alert near Lake Merritt',body:'Sodaro suggests adjusting closing procedures, sharing the alert with staff or volunteers, and choosing a safer access or pickup plan.'},construction:{title:'Construction is reducing access',body:'The system connects the street closure to lower visits and recommends clearer wayfinding, outreach, or an alternate access plan.'},event:{title:'Community event may increase visitors',body:'Sodaro recommends preparing staff or volunteers, extending hours when appropriate, and posting an event-specific update.'},code:{title:'Local code or permit rule changed',body:'A location-based alert explains the update in plain language and links it to the organization’s next task.'}};
$$('[data-scene]').forEach(b=>b.addEventListener('click',()=>{const s=scenes[b.dataset.scene];$('#sceneDetail h3').textContent=s.title;$('#sceneDetail p').textContent=s.body;document.querySelector('#alerts').scrollIntoView({behavior:'smooth',block:'center'})}));
const input=$('#photoInput'),upload=$('#uploadButton'),preview=$('#previewWrap'),img=$('#previewImage'),empty=$('#resultEmpty'),scan=$('#scanState'),result=$('#inspectionResult'),bar=$('#progressBar');
const accessModal=$('#inspectionAccess'),readyModal=$('#inspectionReady'),accessForm=$('#accessForm'),accessCode=$('#accessCode'),accessError=$('#accessError');
const INSPECTION_PASSCODE='3829';
const INSPECTION_LINK=''; // Add tomorrow's private link here.
function setModal(modal,open){modal.hidden=!open;document.body.classList.toggle('modal-open',open);if(open)setTimeout(()=>modal.querySelector('input,button')?.focus(),50)}
function openInspection(){if(sessionStorage.getItem('sodaroInspectionUnlocked')==='true'){launchInspection();return}accessCode.value='';accessError.hidden=true;setModal(accessModal,true)}
function launchInspection(){if(INSPECTION_LINK){window.location.href=INSPECTION_LINK;return}setModal(accessModal,false);setModal(readyModal,true)}
upload.addEventListener('click',openInspection);
accessForm.addEventListener('submit',e=>{e.preventDefault();if(accessCode.value===INSPECTION_PASSCODE){sessionStorage.setItem('sodaroInspectionUnlocked','true');launchInspection()}else{accessError.hidden=false;accessCode.classList.remove('shake');void accessCode.offsetWidth;accessCode.classList.add('shake');accessCode.select()}});
$$('[data-close-access]').forEach(el=>el.addEventListener('click',()=>setModal(accessModal,false)));
$$('[data-close-ready]').forEach(el=>el.addEventListener('click',()=>setModal(readyModal,false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setModal(accessModal,false);setModal(readyModal,false)}});
$('#scanAgain').addEventListener('click',openInspection);input.addEventListener('change',()=>{const file=input.files[0];if(!file)return;img.src=URL.createObjectURL(file);upload.hidden=true;preview.hidden=false;empty.hidden=true;result.hidden=true;scan.hidden=false;let p=0;bar.style.width='0%';const timer=setInterval(()=>{p+=Math.floor(Math.random()*16)+8;if(p>=100){p=100;clearInterval(timer);setTimeout(showResult,350)}bar.style.width=p+'%';},320)});
function showResult(){scan.hidden=true;result.hidden=false;const score=82+Math.floor(Math.random()*12);$('#scoreRing').textContent=score;$('#resultTitle').textContent=score>=88?'Likely ready':'Review recommended';$('#findingList').innerHTML='<li class="pass">Accessible entrance appears visible</li><li class="pass">Primary walkway appears open</li><li class="warn">Check outdoor sign permit and mounting height</li><li class="warn">Keep sidewalk display at least 36 inches clear</li>';}
updateDashboard();window.addEventListener('resize',()=>drawChart((organizationKind==='nonprofit'?nonprofitDatasets:datasets)[current].trend));

const mapAreas={
  north:{name:'North Oakland',detail:'Track transit changes, neighborhood events, and small-business activity near major corridors.'},
  west:{name:'West Oakland',detail:'See construction, freight movement, safety updates, and opportunities affecting local foot traffic.'},
  downtown:{name:'Downtown Oakland',detail:'Understand event activity, office traffic, permits, street closures, and nearby business conditions.'},
  lake:{name:'Lake Merritt',detail:'Connect festivals, safety notices, parking conditions, and recreation traffic to business recommendations.'},
  east:{name:'East Oakland',detail:'Surface community resources, transportation disruptions, local events, and neighborhood support.'},
  fruitvale:{name:'Fruitvale',detail:'Highlight cultural events, transit activity, business openings, and community collaboration opportunities.'},
  laurel:{name:'Laurel District',detail:'Follow MacArthur Boulevard activity, local commerce, events, safety concerns, and neighborhood change.'},
  port:{name:'Oakland Port',detail:'Monitor freight traffic, road impacts, air-quality concerns, and movement affecting nearby businesses and nonprofits.'}
};
$$('.district').forEach(area=>area.addEventListener('click',()=>{
  $$('.district').forEach(x=>x.classList.remove('active'));
  area.classList.add('active');
  const data=mapAreas[area.dataset.mapArea];
  $('#mapInsight small').textContent=data.name.toUpperCase();
  $('#mapInsight strong').textContent=data.detail;
}));

// Interactive Neighborhood Pulse Map
const pulseAreas={
  west:{name:'West Oakland',condition:'stable',label:'Stable',detail:'Freight movement is active, while neighborhood organizations remain in manageable conditions.',score:71,signals:14,businesses:214,ticker:'West Oakland: freight activity elevated · neighborhood conditions remain stable'},
  north:{name:'North Oakland / Adams Point',condition:'critical',label:'Critical',detail:'Multiple street-level signals are creating higher pressure for nearby businesses and nonprofits.',score:43,signals:27,businesses:289,ticker:'North Oakland / Adams Point: pressure rising · 27 active signals'},
  northhills:{name:'North Oakland Hills',condition:'strong',label:'Strong',detail:'Current community indicators show healthy conditions with lower immediate disruption.',score:86,signals:9,businesses:174,ticker:'North Oakland Hills: strong conditions · low disruption detected'},
  downtown:{name:'Downtown Oakland',condition:'risk',label:'At risk',detail:'Permit activity, office traffic shifts, and street closures are creating a higher-priority environment.',score:54,signals:31,businesses:612,ticker:'Downtown: permit activity updated · street closure impact detected'},
  glenview:{name:'Glenview / Redwood Heights',condition:'stable',label:'Stable',detail:'Local activity is balanced, with manageable transportation and community signals.',score:74,signals:12,businesses:238,ticker:'Glenview / Redwood Heights: stable activity · 12 signals monitored'},
  fruitvale:{name:'Eastlake / Fruitvale',condition:'caution',label:'Caution',detail:'Transit flow is changing around key corridors. Organizations may need to adjust timing and outreach.',score:63,signals:24,businesses:441,ticker:'Eastlake / Fruitvale: transit pattern changing · caution around peak-hour access'},
  central:{name:'Central / East Oakland',condition:'stable',label:'Stable',detail:'Transit and community activity are balanced, with several localized opportunity signals.',score:73,signals:18,businesses:498,ticker:'Central / East Oakland: transit flow stable · opportunity signals active'},
  easthills:{name:'East Oakland Hills',condition:'strong',label:'Strong',detail:'Current neighborhood signals show healthier conditions and lower near-term disruption.',score:82,signals:11,businesses:205,ticker:'East Oakland Hills: strong conditions · 11 active signals'},
  coliseum:{name:'Coliseum / Airport',condition:'caution',label:'Caution',detail:'Event, airport, and transportation activity can create moderate access and traffic changes.',score:61,signals:16,businesses:122,ticker:'Coliseum / Airport: transportation activity elevated · access impacts monitored'}
};
const pulseStage=$('#realMapStage'),pulseTooltip=$('#hotspotTooltip'),pulseRing=$('#mapFocusRing'),pulseTitle=$('#pulseTitle'),pulseDetail=$('#pulseDetail'),pulseScore=$('#pulseScore'),pulseSignals=$('#pulseSignals'),pulseBusinesses=$('#pulseBusinesses'),pulseTicker=$('#mapTickerText'),mapModeLabel=$('#mapModeLabel');
function setPulseArea(key,source){const data=pulseAreas[key];if(!data)return;$$('.map-hotspot').forEach(h=>h.classList.toggle('active',h.dataset.area===key));$$('#districtChips button').forEach(b=>b.classList.toggle('active',b.dataset.area===key));pulseTitle.textContent=data.name+' · '+data.label;pulseDetail.textContent=data.detail;pulseScore.textContent=data.score;pulseSignals.textContent=data.signals;pulseBusinesses.textContent=data.businesses;pulseTicker.textContent=data.ticker;if(source){const stageRect=pulseStage.getBoundingClientRect(),rect=source.getBoundingClientRect();pulseRing.style.left=((rect.left-stageRect.left)+rect.width/2)+'px';pulseRing.style.top=((rect.top-stageRect.top)+rect.height/2)+'px';pulseRing.classList.add('show');pulseStage.classList.add('is-focused');setTimeout(()=>pulseRing.classList.remove('show'),700)}}
function showHotspotTooltip(h){const data=pulseAreas[h.dataset.area],stageRect=pulseStage.getBoundingClientRect(),rect=h.getBoundingClientRect();pulseTooltip.hidden=false;pulseTooltip.querySelector('small').textContent=data.label.toUpperCase()+' CONDITION';pulseTooltip.querySelector('b').textContent=data.name;pulseTooltip.querySelector('p').textContent=data.detail;const w=240,x=Math.min(stageRect.width-w-12,Math.max(12,rect.left-stageRect.left+24)),y=Math.min(stageRect.height-125,Math.max(12,rect.top-stageRect.top-30));pulseTooltip.style.left=x+'px';pulseTooltip.style.top=y+'px';h.classList.add('highlighted')}
function hideHotspotTooltip(h){pulseTooltip.hidden=true;h.classList.remove('highlighted')}
$$('.map-hotspot').forEach(h=>{h.addEventListener('mouseenter',()=>showHotspotTooltip(h));h.addEventListener('mouseleave',()=>hideHotspotTooltip(h));h.addEventListener('focus',()=>showHotspotTooltip(h));h.addEventListener('blur',()=>hideHotspotTooltip(h));h.addEventListener('click',()=>setPulseArea(h.dataset.area,h))});
$$('#districtChips button').forEach(b=>b.addEventListener('click',()=>{const h=$(`.map-hotspot[data-area="${b.dataset.area}"]`);setPulseArea(b.dataset.area,h)}));
$$('.pulse-filter').forEach(btn=>btn.addEventListener('click',()=>{$$('.pulse-filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;$$('.map-hotspot').forEach(h=>h.classList.toggle('dimmed',filter!=='all'&&h.dataset.condition!==filter));mapModeLabel.textContent=filter==='all'?'All neighborhood signals':btn.textContent.trim()+' conditions';pulseStage.classList.remove('is-focused');pulseTicker.textContent=filter==='all'?'Lake Merritt event traffic rising · Downtown permit activity updated · Fruitvale transit flow changing':`Filtered to ${btn.textContent.trim()} conditions · select a visible signal to inspect`;}));
$('#mapReset').addEventListener('click',()=>{$$('.pulse-filter').forEach((x,i)=>x.classList.toggle('active',i===0));$$('.map-hotspot').forEach(h=>h.classList.remove('dimmed','active','highlighted'));$$('#districtChips button').forEach(b=>b.classList.remove('active'));pulseStage.classList.remove('is-focused');mapModeLabel.textContent='All neighborhood signals';pulseTitle.textContent='Explore Oakland';pulseDetail.textContent='Hover over a marker or select a neighborhood to see what is changing and why it matters.';pulseScore.textContent='72';pulseSignals.textContent='18';pulseBusinesses.textContent='342';pulseTicker.textContent='Lake Merritt event traffic rising · Downtown permit activity updated · Fruitvale transit flow changing';});
let pulseDemoTimer=null;$('#mapDemo').addEventListener('click',()=>{if(pulseDemoTimer){clearInterval(pulseDemoTimer);pulseDemoTimer=null;$('#mapDemo').textContent='▶ Pulse demo';return}const keys=Object.keys(pulseAreas);let i=0;$('#mapDemo').textContent='■ Stop demo';const advance=()=>{const key=keys[i%keys.length],h=$(`.map-hotspot[data-area="${key}"]`);setPulseArea(key,h);i++};advance();pulseDemoTimer=setInterval(advance,1800)});

// Back-to-top control
const backToTop=$('#backToTop');
window.addEventListener('scroll',()=>backToTop.classList.toggle('show',window.scrollY>520),{passive:true});
backToTop.addEventListener('click',()=>document.querySelector('#top').scrollIntoView({behavior:'smooth',block:'start'}));


// Floating navigation: fade while scrolling and highlight the current section
const topbar=document.querySelector('.topbar');
const navLinks=[...document.querySelectorAll('.topbar nav a[href^="#"]')];
const navSections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
function updateFloatingNav(){
  topbar.classList.toggle('scrolled',window.scrollY>24);
  const marker=window.scrollY+Math.max(130,window.innerHeight*.2);
  let current=navSections[0];
  navSections.forEach(section=>{if(section.offsetTop<=marker)current=section});
  navLinks.forEach(link=>link.classList.toggle('active',current&&link.getAttribute('href')==='#'+current.id));
}
window.addEventListener('scroll',updateFloatingNav,{passive:true});
window.addEventListener('resize',updateFloatingNav,{passive:true});
navLinks.forEach(link=>link.addEventListener('click',()=>{if(nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}}));
updateFloatingNav();
