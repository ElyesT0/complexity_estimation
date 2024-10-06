var e=document.body,t=document.querySelector(".container-figure"),s=0;t.style.height=`${document.documentElement.clientHeight}px`,t.style.width=`${document.documentElement.clientWidth}px`;const i=new class{constructor(e=randomized_sequences){this.participant_id=current_ID,this.original_seq=[...sequences_training,...shuffled_sequences,...shuffled_bloc2_sequences],this.seq=[...sequences_training,...randomized_sequences],this.performance=[],this.element_selectors={},this.confidence=[],this.counter=0,this.presentation_time=!0,this.start_time=Date.now(),this.click_timings_before=[],this.click_timings_after=[],this.interclick_timings_before=[],this.interclick_timings_after=[],this.response_sequences_before=[],this.response_sequences_after=[],this.score=[],this.current_score=initialScore,this.screen_width=window.screen.width,this.screen_height=window.screen.height,this.set_delay=set_delay,this.break_time=break_time,this.SOA=SOA,this.last_click=Date.now(),this.state="training",this.survey=sessionStorage.getItem("surveyChoices")}data_collection(e){(t=>{let s=Date.now();if(0===t){this.click_timings_before[this.counter-1].push(s-this.start_time);let t=this.click_timings_before[this.counter-1].length;1===this.click_timings_before[this.counter-1].length||this.interclick_timings_before[this.counter-1].push(this.click_timings_before[this.counter-1][t-1]-this.click_timings_before[this.counter-1][t-2]),this.response_sequences_before[this.counter-1].push(e)}else{this.click_timings_after[this.counter-1].push(s-this.start_time);let t=this.click_timings_after[this.counter-1].length;1===this.click_timings_after[this.counter-1].length||this.interclick_timings_after[this.counter-1].push(this.click_timings_after[this.counter-1][t-1]-this.click_timings_after[this.counter-1][t-2]),this.response_sequences_after[this.counter-1].push(e)}})(this.presentation_time?0:1)}create_csv(){}draw(){let i=function(){let e=window.innerHeight,t=document.documentElement.clientHeight,s=window.outerHeight-e;return{urlBarHeight:s,bottomBarHeight:t-e-s}}(),n=window.screen.height,o=window.screen.width;i.urlBarHeight,i.bottomBarHeight,e.style.margin="10px 0px",e.style.padding="15px 0px",e.style.height=`${n-20-30}px`;let r=t.offsetWidth/2,c=t.offsetHeight/2;var l=document.createElement("div");l.classList.add("fixation","no--zoom"),t.appendChild(l);var a=document.createElement("div");a.textContent="Pause",a.classList.add("pause","hidden","no-zoom"),a.style.top=`${c-70}px`,a.style.left=`${r}px`,t.appendChild(a),l.textContent="+";let h=l.offsetHeight,d=l.offsetWidth;l.style.top=`${c-h/3-70}px`,l.style.left=`${r-d/3}px`,l.classList.add("hidden");var _=[];for(let e=0;e<6;e++){var m=document.createElement("div");m.classList.add("circle","no--zoom"),m.classList.add("hidden"),m.id=`circleElement-${e}`,t.appendChild(m),_.push(m)}let u=document.querySelector(".circle").offsetHeight,p=[Math.sin(-Math.PI/2),Math.sin(-Math.PI/6),Math.sin(Math.PI/6),Math.sin(Math.PI/2),Math.sin(5*Math.PI/6),Math.sin(-5*Math.PI/6)],f=[Math.cos(-Math.PI/2),Math.cos(-Math.PI/6),Math.cos(Math.PI/6),Math.cos(Math.PI/2),Math.cos(5*Math.PI/6),Math.cos(-5*Math.PI/6)];p=p.map(e=>150*e+c-u/2),f=f.map(e=>150*e+r-u/2);for(let e=0;e<6;e++)_[e].style.top=`${p[e]-70}px`,_[e].style.left=`${f[e]}px`;var g=[],x=document.createElement("div");x.classList.add("container-confidence","hidden","no--zoom"),t.appendChild(x),x.style.left=r/5+"px",x.style.width=`${o/1.25}px`;for(let e=1;e<5;e++){var m=document.createElement("div");m.id=`conf-${e}`,m.classList.add("btn-confidence","no--zoom"),m.textContent=`${100*e}`,x.appendChild(m),g.push(m)}let y=document.createElement("div");y.textContent="TRAINING",y.classList.add("btn--training","no--zoom"),y.classList.add("no--zoom"),y.classList.add("hidden"),y.style.top="50%",t.appendChild(y),y.style.left="50%",y.style.transform="translate(-50%,0%)";let b=document.createElement("div");b.textContent="OK",b.classList.add("btn--ok","no--zoom"),b.style.top=`${n-140-15}px`,t.appendChild(b),b.style.left="50%",b.style.transform="translate(-50%,-200%)";let v=document.createElement("div");v.textContent="NEXT",v.classList.add("btn--next","no--zoom"),t.appendChild(v),v.style.top=`${n-140-15}px`,v.style.left="50%",v.style.transform="translate(-50%,-200%)",v.classList.add("hidden");let L=document.createElement("div");t.appendChild(L),L.classList.add("increase","no--zoom"),L.classList.add("hidden");let k=document.createElement("div");k.classList.add("txt--score","no--zoom"),k.textContent=`score : ${this.current_score}`,e.appendChild(k);let q=document.querySelector(".text-container");q.style.height=n/2+"px",q.style.width=`${o-50}px`,q.textContent=instruction_training_start[s],s+=1;var E=document.querySelector(".chart"),$=o/1.5;E.style.width=`${$}px`,E.style.height=`${n/100}px`;var w=document.querySelector(".bar");w.style.width=`${$}px`,w.style.height=`${n/100}px`,E.style.left=`${o/2-$/2}px`;let C=document.getElementById("progression--bar");this.element_selectors.circles=_,this.element_selectors.fixation=l,this.element_selectors.confidence=g,this.element_selectors.container_confidence=x,this.element_selectors.btn_next=v,this.element_selectors.btn_training=y,this.element_selectors.btn_ok=b,this.element_selectors.txt_score_increase=L,this.element_selectors.txt_score=k,this.element_selectors.txt_container=q,this.element_selectors.pauseElement=a,this.element_selectors.progression_bar=C}init(){this.element_selectors.btn_ok.addEventListener(keyEvent,()=>{"training"===this.state?s<instruction_training_start.length?(this.element_selectors.txt_container.textContent=instruction_training_start[s],s+=1):(this.element_selectors.btn_ok.classList.add("hidden"),this.element_selectors.txt_container.classList.add("hidden"),s=0,this.element_selectors.txt_container.textContent=instruction_training_end[s],this.element_selectors.btn_training.classList.remove("hidden")):s<instruction_training_end.length?(this.element_selectors.txt_container.textContent=instruction_training_end[s],s+=1):(this.element_selectors.btn_ok.classList.add("hidden"),this.element_selectors.txt_container.classList.add("hidden"),this.trial())}),this.element_selectors.btn_training.addEventListener(keyEvent,()=>{setTimeout(()=>this.trial(this.seq[this.counter]),this.set_delay),this.element_selectors.btn_training.classList.add("hidden"),this.element_selectors.txt_container.classList.add("hidden")});for(let e=0;e<this.seq.length;e++)this.interclick_timings_before.push([]),this.interclick_timings_after.push([]),this.click_timings_before.push([]),this.click_timings_after.push([]),this.response_sequences_before.push([]),this.response_sequences_after.push([]);for(let e=0;e<6;e++)this.element_selectors.circles[e].addEventListener(keyEvent,()=>this.data_collection(e));for(let e=0;e<4;e++)this.element_selectors.confidence[e].addEventListener(keyEvent,()=>{if(console.log("this.response_sequences_after : ",this.response_sequences_after),this.response_sequences_after[this.counter-1].length<3);else{let{final_score:t,feedbackTXT:s}=this.display_score_update(e);this.element_selectors.txt_score.textContent=`score: ${t}`,this.element_selectors.txt_score_increase.textContent=`${s}`,this.log_intermediate_data()}});this.element_selectors.btn_next.addEventListener(keyEvent,()=>{this.counter===sequences_training.length?(this.state="main_experiment",completion=0,progress=0,this.element_selectors.btn_ok.classList.remove("hidden"),this.element_selectors.txt_container.classList.remove("hidden"),this.current_score=initialScore,this.element_selectors.progression_bar.classList.add("hidden"),this.element_selectors.txt_score.textContent=`score : ${this.current_score}`,this.reset_next()):Date.now()-this.last_click>1e3&&(this.trial(this.seq[this.counter]),this.reset_next())})}elements(){return this.element_selectors}activate_point(e){e.classList.add("circle--active"),setTimeout(()=>{e.classList.remove("circle--active")},blink)}start(){console.log("starting experiment",this.element_selectors.length);for(let e=0;e<Object.keys(this.element_selectors.circles).length;e++)console.log(this.element_selectors.cicles),console.log(Object.keys(this.element_selectors.cicles[e]))}counter_increment(){this.counter+=1}click(){}explanations(e=!0){this.element_selectors.btn_ok.classList.remove("hidden")}reset_next(){this.element_selectors.btn_next.classList.add("hidden"),this.element_selectors.txt_score_increase.classList.add("hidden"),document.querySelector("body").classList.remove("success"),document.querySelector("body").classList.remove("fail"),document.querySelector("body").classList.remove("moderate--failure")}hideFigure(){this.element_selectors.container_confidence.classList.add("hidden"),this.element_selectors.progression_bar.classList.add("hidden"),this.element_selectors.fixation.classList.add("hidden");for(let e=0;e<n.circles.length;e++)this.element_selectors.circles[e].classList.add("hidden")}display_screen_next(){this.element_selectors.btn_next.classList.remove("hidden"),this.hideFigure(),this.element_selectors.txt_score_increase.classList.remove("hidden")}display_score_update(e,t=this.seq[this.counter-1],s=this.response_sequences_after[this.counter-1]){let{final_score:i,feedbackTXT:n}=score_update(this.seq[this.counter-1],this.response_sequences_after[this.counter-1],(e+1)*100,this.current_score,this.element_selectors.txt_score_increase),o=i-this.current_score;return t.join()===s.join()?(this.performance.push("success"),n=`${n} 
+${o}`,document.querySelector("body").classList.add("success"),setTimeout(function(){document.querySelector("body").classList.remove("success")},100),setTimeout(function(){document.querySelector("body").classList.add("success")},250)):o>0?(n=`${n} 
+${o}`,this.performance.push("fail"),document.querySelector("body").classList.add("moderate--failure"),setTimeout(function(){document.querySelector("body").classList.remove("moderate--failure")},100),setTimeout(function(){document.querySelector("body").classList.add("moderate--failure")},250)):(n=`${n} 
 ${o}`,this.performance.push("fail"),document.querySelector("body").classList.add("fail"),setTimeout(function(){document.querySelector("body").classList.remove("fail")},100),setTimeout(function(){document.querySelector("body").classList.add("fail")},250)),this.confidence.push(100*e),this.score.push(i),this.current_score=i,this.display_screen_next(),this.last_click=Date.now(),{final_score:i,feedbackTXT:n}}log_intermediate_data(){var e=convertCSV(this);console.log("intermediate data has been sent"),send_post(e),console.log("data2send:",this),postData(serverAddress,this).then(()=>{console.log("Data has been sent")})}presentation(e=this.seq){this.presentation_time=!0,this.element_selectors.fixation.classList.remove("hidden"),this.element_selectors.fixation.style.color="white";for(let e=0;e<this.element_selectors.circles.length;e++)this.element_selectors.circles[e].classList.remove("hidden"),this.element_selectors.circles[e].classList.remove("circle--reproduction");for(let t=0;t<e.length;t++)setTimeout(()=>this.activate_point(this.element_selectors.circles[e[t]]),SOA*(t+1));update_progression(completion)}reproduction(){this.presentation_time=!1;for(let e=0;e<this.element_selectors.circles.length;e++)this.element_selectors.circles[e].classList.add("circle--reproduction");this.element_selectors.progression_bar.classList.remove("hidden"),this.element_selectors.container_confidence.classList.remove("hidden")}pre_rep_break(){let e=this.set_delay+this.seq[this.counter].length*this.SOA+this.break_time;return setTimeout(()=>{this.element_selectors.fixation.classList.add("hidden"),"training"===this.state&&this.element_selectors.pauseElement.classList.remove("hidden")},e-this.break_time),setTimeout(()=>{this.element_selectors.fixation.style.color="#3bc9db",this.element_selectors.fixation.classList.remove("hidden"),this.element_selectors.pauseElement.classList.add("hidden"),this.element_selectors.progression_bar.classList.remove("hidden")},e),e}end_experiment(){var e=convertCSV(this);console.log("data_experiment = ",e),send_post(e),this.hideFigure(),this.element_selectors.txt_container.classList.remove("hidden"),this.element_selectors.txt_container.textContent="You have finished the experiment. Thank you for your participation !"}trial(e=this.seq[this.counter]){this.counter<this.seq.length-1?(this.presentation(e),setTimeout(()=>this.reproduction(),this.pre_rep_break()),this.counter_increment()):this.end_experiment()}info(){console.log(this),console.log(this.element_selectors),console.log("Tested sequences: ",this.seq)}testDataTransmission(){let e={performance:[],element_selectors:{},confidence:[],click_timings_before:[],click_timings_after:[],interclick_timings_before:[],interclick_timings_after:[],response_sequences_before:[],response_sequences_after:[],score:[],survey:null};for(let t in e)(void 0===this[t]||null===this[t])&&(this[t]=e[t]);this.end_experiment()}};i.draw();const n=i.elements();i.init(),document.addEventListener("gesturestart",function(e){e.preventDefault()}),document.addEventListener("dblclick",function(e){e.preventDefault()});
//# sourceMappingURL=animation_sequence.7d2c459f.js.map
