var freeaps_determineBasal;(()=>{var e={5546:(e,t,a)=>{var r=a(6880);function o(e,t){t||(t=0);var a=Math.pow(10,t);return Math.round(e*a)/a}function n(e,t){return"mmol/L"===t.out_units?o(.0555*e,1):Math.round(e)}e.exports=function(e,t,a,i,s,l,u,m,d,c,g,h,p,v){var f=i.min_bg,B=v.overrideTarget;const b=v.smbIsOff,M=v.advancedSettings,_=v.isfAndCr,y=v.isf,x=v.cr,S=v.smbIsAlwaysOff,D=v.start,w=v.end,G=v.smbMinutes,T=v.uamMinutes;var C=0,U=0,O="",R="",A="",I="",F="",j=0,P=0,E=0,q=0,W=0,k=0;const L=v.weightedAverage;var z=1,N=i.sens,H=i.carb_ratio;v.useOverride&&(z=v.overridePercentage/100,_?(N/=z,H/=z):(x&&(H/=z),y&&(N/=z)));const Z=i.weightPercentage,$=v.average_total_data;function J(e,t){var a=e.getTime();return new Date(a+36e5*t)}function K(e){var t=i.bolus_increment;.025!=t&&(t=.05);var a=e/t;return a>=1?o(Math.floor(a)*t,5):0}function Q(e){function t(e){return e<10&&(e="0"+e),e}return t(e.getHours())+":"+t(e.getMinutes())+":00"}function V(e,t){var a=new Date("1/1/1999 "+e),r=new Date("1/1/1999 "+t);return(a.getTime()-r.getTime())/36e5}function X(e,t){var a=0,r=t,o=(e-t)/36e5,n=0,i=o,s=0;do{if(o>0){var l=Q(r),u=p[0].rate;for(let e=0;e<p.length;e++){var m=p[e].start;if(l==m){if(e+1<p.length){o>=(s=V(p[e+1].start,p[e].start))?n=s:o<s&&(n=o)}else if(e+1==p.length){let t=p[0].start;s=24-V(p[e].start,t),o>=s?n=s:o<s&&(n=o)}a+=K((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+K(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=J(r,n)}else if(l>m)if(e+1<p.length){var d=p[e+1].start;l<d&&(o>=(s=V(d,l))?n=s:o<s&&(n=o),a+=K((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+K(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=J(r,n))}else if(e==p.length-1){o>=(s=V("23:59:59",l))?n=s:o<s&&(n=o),a+=K((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+K(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=J(r,n)}}}}while(o>0&&o<i);return a}if(g.length){let e=g.length-1;var Y=new Date(g[e].timestamp),ee=new Date(g[0].timestamp);if("TempBasalDuration"==g[0]._type&&(ee=new Date),(U=(ee-Y)/36e5)<23.9&&U>21)W=X(Y,(te=24-U,ae=Y.getTime(),new Date(ae-36e5*te))),I="24 hours of data is required for an accurate tdd calculation. Currently only "+U.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+W.toPrecision(5)+" U. ";else U<21?(he=!1,enableDynamicCR=!1):I=""}else console.log("Pumphistory is empty!"),he=!1,enableDynamicCR=!1;var te,ae;for(let e=0;e<g.length;e++)"Bolus"==g[e]._type&&(q+=g[e].amount);for(let e=1;e<g.length;e++)if("TempBasal"==g[e]._type&&g[e].rate>0){j=e,k=g[e].rate;var re=g[e-1]["duration (min)"]/60,oe=re,ne=new Date(g[e-1].timestamp),ie=ne,se=0;do{if(e--,0==e){ie=new Date;break}if("TempBasal"==g[e]._type||"PumpSuspend"==g[e]._type){ie=new Date(g[e].timestamp);break}var le=e-2;if(le>=0&&"Rewind"==g[le]._type){let e=g[le].timestamp;for(;le-1>=0&&"Prime"==g[le-=1]._type;)se=(g[le].timestamp-e)/36e5;se>=re&&(ie=e,se=0)}}while(e>0);var ue=(ie-ne)/36e5;ue<oe&&(re=ue),E+=K(k*(re-se)),e=j}for(let e=0;e<g.length;e++)if(0,0==g[e]["duration (min)"]||"PumpResume"==g[e]._type){let t=new Date(g[e].timestamp),a=t,r=e;do{if(r>0&&(--r,"TempBasal"==g[r]._type)){a=new Date(g[r].timestamp);break}}while(r>0);(a-t)/36e5>0&&(W+=X(a,t))}for(let e=g.length-1;e>0;e--)if("TempBasalDuration"==g[e]._type){let t=g[e]["duration (min)"]/60,a=new Date(g[e].timestamp);var me=a;let r=e;do{if(--r,r>=0&&("TempBasal"==g[r]._type||"PumpSuspend"==g[r]._type)){me=new Date(g[r].timestamp);break}}while(r>0);if(0==e&&"TempBasalDuration"==g[0]._type&&(me=new Date,t=g[e]["duration (min)"]/60),(me-a)/36e5-t>0){W+=X(me,J(a,t))}}var de,ce={TDD:o(P=q+E+W,5),bolus:o(q,5),temp_basal:o(E,5),scheduled_basal:o(W,5)};U>21?(R=". Bolus insulin: "+q.toPrecision(5)+" U",A=". Temporary basal insulin: "+E.toPrecision(5)+" U",O=". Insulin with scheduled basal rate: "+W.toPrecision(5)+" U",F=I+(" TDD past 24h is: "+P.toPrecision(5)+" U")+R+A+O,tddReason=", Total insulin: "+o(P,2)+" U, "+o(q/P*100,0)+"% Bolus "+o((E+W)/P*100,0)+"% Basal"):tddReason=", TDD: Not enough pumpData (< 21h)";const ge=e.glucose;var he=h.useNewFormula;const pe=h.enableDynamicCR,ve=Math.min(i.autosens_min,i.autosens_max),fe=Math.max(i.autosens_min,i.autosens_max);(fe==ve||fe<1||ve>1)&&(he=!1,console.log("Dynamic ISF disabled due to current autosens settings"));const Be=h.adjustmentFactor,be=i.min_bg;var Me=!1,_e="",ye=1,xe="";$>0&&(ye=L/$),xe=ye>1?"Basal adjustment with a 24 hour  to total average (up to 14 days of data) TDD ratio (limited by Autosens max setting). Basal Ratio: "+(ye=o(ye=Math.min(ye,i.autosens_max),2))+". Upper limit = Autosens max ("+i.autosens_max+")":ye<1?"Basal adjustment with a 24 hour to  to total average (up to 14 days of data) TDD ratio (limited by Autosens min setting). Basal Ratio: "+(ye=o(ye=Math.max(ye,i.autosens_min),2))+". Lower limit = Autosens min ("+i.autosens_min+")":"Basal adjusted with a 24 hour to total average (up to 14 days of data) TDD ratio: "+ye,xe=", Basal ratio: "+ye,(i.high_temptarget_raises_sensitivity||i.exercise_mode||v.isEnabled)&&(Me=!0),be>=118&&Me&&(he=!1,_e="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+be);var Se=", Dynamic ratios log: ",De=", AF: "+Be,we="BG: "+ge+" mg/dl ("+(.0555*ge).toPrecision(2)+" mmol/l)",Ge="",Te="";const Ce=h.curve,Ue=h.insulinPeakTime,Oe=h.useCustomPeakTime;var Re=55,Ae=65;switch(Ce){case"rapid-acting":Ae=65;break;case"ultra-rapid":Ae=50}Oe?(Re=120-Ue,console.log("Custom insulinpeakTime set to :"+Ue+", insulinFactor: "+Re)):(Re=120-Ae,console.log("insulinFactor set to : "+Re)),de=P,Z<1&&L>0&&(P=L,console.log("Using weighted TDD average: "+o(P,2)+" U, instead of past 24 h ("+o(de,2)+" U), weight: "+Z),Te=", Weighted TDD: "+o(P,2)+" U");const Ie=h.sigmoid;var Fe="";if(he){var je=N*Be*P*Math.log(ge/Re+1)/1800;Ge=", Logarithmic formula"}if(he&&Ie){const e=ve,t=fe-e,a=.0555*(ge-i.min_bg);var Pe=ye,Ee=fe-1;1==fe&&(Ee=fe+.01-1);const r=Math.log10(1/Ee-e/Ee)/Math.log10(Math.E),o=a*Be*Pe+r;je=t/(1+Math.exp(-o))+e,Ge=", Sigmoid function"}var qe=H;const We=o(H,1);var ke="",Le="";if(he&&P>0){if(ke=", Dynamic ISF/CR: On/",je>fe?(_e=", Dynamic ISF limited by autosens_max setting: "+fe+" ("+o(je,2)+"), ",Le=", Autosens/Dynamic Limit: "+fe+" ("+o(je,2)+")",je=fe):je<ve&&(_e=", Dynamic ISF limited by autosens_min setting: "+ve+" ("+o(je,2)+"). ",Le=", Autosens/Dynamic Limit: "+ve+" ("+o(je,2)+")",je=ve),pe){ke+="On";var ze=". New Dynamic CR: "+o(H/=je,1)+" g/U"}else ze=" CR: "+qe+" g/U",ke+="Off";const e=N/je;s.ratio=je,Fe=". Using Sigmoid function, the autosens ratio has been adjusted with sigmoid factor to: "+o(s.ratio,2)+". New ISF = "+o(e,2)+" mg/dl ("+o(.0555*e,2)+" (mmol/l). CR adjusted from "+o(We,2)+" to "+o(H,2),_e+=Ie?Fe:", Dynamic autosens.ratio set to "+o(je,2)+" with ISF: "+e.toPrecision(3)+" mg/dl/U ("+(.0555*e).toPrecision(3)+" mmol/l/U)",F+=Se+we+De+Ge+_e+ke+ze+Te}else F+=Se+"Dynamic Settings disabled";console.log(F),he||pe?he&&i.tddAdjBasal?tddReason+=ke+Ge+Le+De+xe:he&&!i.tddAdjBasal&&(tddReason+=ke+Ge+Le+De):tddReason+="";var Ne={},He=new Date;if(c&&(He=c),void 0===i||void 0===i.current_basal)return Ne.error="Error: could not get current basal rate",Ne;var Ze=r(i.current_basal,i)*z,$e=Ze;v.useOverride&&(0==v.duration?console.log("Profile Override is active. Override "+o(100*z,0)+"%. Override Duration: Enabled indefinitely"):console.log("Profile Override is active. Override "+o(100*z,0)+"%. Override Expires in: "+v.duration+" min."));var Je=new Date;c&&(Je=c);var Ke,Qe=new Date(e.date),Ve=o((Je-Qe)/60/1e3,1),Xe=e.glucose,Ye=e.noise;Ke=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var et=Math.min(e.delta,e.short_avgdelta),tt=Math.min(e.short_avgdelta,e.long_avgdelta),at=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(Xe<=10||38===Xe||Ye>=3)&&(Ne.reason="CGM is calibrating, in ??? state, or noise is high");if(Xe>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(Xe,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),Ve>12||Ve<-5?Ne.reason="If current system time "+Je+" is correct, then BG data is too old. The last BG data was read "+Ve+"m ago at "+Qe:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?Ne.reason="CGM was just calibrated":Ne.reason="CGM data is unchanged ("+n(Xe,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,i)+" mg/dL ~45m change"),Xe<=10||38===Xe||Ye>=3||Ve>12||Ve<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return t.rate>=$e?(Ne.reason+=". Canceling high temp basal of "+t.rate,Ne.deliverAt=He,Ne.temp="absolute",Ne.duration=0,Ne.rate=0,Ne):0===t.rate&&t.duration>30?(Ne.reason+=". Shortening "+t.duration+"m long zero temp to 30m. ",Ne.deliverAt=He,Ne.temp="absolute",Ne.duration=30,Ne.rate=0,Ne):(Ne.reason+=". Temp "+t.rate+" <= current basal "+$e+"U/hr; doing nothing. ",Ne);var rt,ot,nt,it,st=i.max_iob;if(void 0!==i.min_bg&&(ot=i.min_bg),void 0!==i.max_bg&&(nt=i.max_bg),void 0!==i.enableSMB_high_bg_target&&(it=i.enableSMB_high_bg_target),void 0===i.min_bg||void 0===i.max_bg)return Ne.error="Error: could not determine target_bg. ",Ne;rt=(i.min_bg+i.max_bg)/2;var lt=i.exercise_mode||i.high_temptarget_raises_sensitivity||v.isEnabled,ut=100,mt=160;if(mt=i.half_basal_exercise_target,v.isEnabled){const e=v.hbt;console.log("Half Basal Target used: "+n(e,i)+" "+i.out_units),mt=e}else console.log("Default Half Basal Target used: "+n(mt,i)+" "+i.out_units);if(lt&&i.temptargetSet&&rt>ut||i.low_temptarget_lowers_sensitivity&&i.temptargetSet&&rt<ut||v.isEnabled&&i.temptargetSet&&rt<ut){var dt=mt-ut;sensitivityRatio=dt*(dt+rt-ut)<=0?i.autosens_max:dt/(dt+rt-ut),sensitivityRatio=Math.min(sensitivityRatio,i.autosens_max),sensitivityRatio=o(sensitivityRatio,2),process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+rt+"; ")}else void 0!==s&&s&&(sensitivityRatio=s.ratio,0===B||B===i.min_bg||i.temptargetSet||(rt=B,console.log("Current Override Profile Target: "+n(B,i)+" "+i.out_units)),process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(i.temptargetSet&&rt<ut&&he&&ge>=rt&&sensitivityRatio<je&&(s.ratio=je*(ut/rt),s.ratio=Math.min(s.ratio,i.autosens_max),sensitivityRatio=o(s.ratio,2),console.log("Dynamic ratio increased from "+o(je,2)+" to "+o(s.ratio,2)+" due to a low temp target ("+rt+").")),sensitivityRatio&&!he?($e=i.current_basal*z*sensitivityRatio,$e=r($e,i)):he&&i.tddAdjBasal&&($e=i.current_basal*ye*z,$e=r($e,i),$>0&&(process.stderr.write("TDD-adjustment of basals activated, using tdd24h_14d_Ratio "+o(ye,2)+", TDD 24h = "+o(de,2)+"U, Weighted average TDD = "+o(L,2)+"U, (Weight percentage = "+Z+"), Total data of TDDs (up to 14 days) average = "+o($,2)+"U. "),$e!==Ze*z?process.stderr.write("Adjusting basal from "+Ze*z+" U/h to "+$e+" U/h; "):process.stderr.write("Basal unchanged: "+$e+" U/h; "))),i.temptargetSet);else if(void 0!==s&&s&&(i.sensitivity_raises_target&&s.ratio<1||i.resistance_lowers_target&&s.ratio>1)){ot=o((ot-60)/s.ratio)+60,nt=o((nt-60)/s.ratio)+60;var ct=o((rt-60)/s.ratio)+60;rt===(ct=Math.max(80,ct))?process.stderr.write("target_bg unchanged: "+n(ct,i)+"; "):process.stderr.write("target_bg from "+n(ct,i)+" to "+n(ct,i)+"; "),rt=ct}var gt=n(rt,i);rt!=f&&(gt=0!==B&&B!==rt?n(f,i)+"→"+n(B,i)+"→"+n(rt,i):n(f,i)+"→"+n(rt,i));var ht=200,pt=200,vt=200;if(e.noise>=2){var ft=Math.max(1.1,i.noisyCGMTargetMultiplier);Math.min(250,i.maxRaw);ht=o(Math.min(200,ot*ft)),pt=o(Math.min(200,rt*ft)),vt=o(Math.min(200,nt*ft)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+n(ct,i)+" to "+n(pt,i)+"; "),ot=ht,rt=pt,nt=vt}var Bt=ot-.5*(ot-40),bt=i.threshold_setting;bt>Bt&&bt<=120&&bt>=65?(console.error("Threshold changed in settings from "+n(Bt,i)+" to "+n(bt,i)+". "),Bt=bt):console.error("Current threshold: "+n(Bt,i));var Mt="",_t=(o(N,1),N);if(void 0!==s&&s&&((_t=o(_t=N/sensitivityRatio,1))!==N?process.stderr.write("ISF from "+n(N,i)+" to "+n(_t,i)):process.stderr.write("ISF unchanged: "+n(_t,i)),Mt+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+n(N,i)+"→"+n(_t,i)),console.error("CR:"+H),void 0===a)return Ne.error="Error: iob_data undefined. ",Ne;var yt,xt=a;if(a.length,a.length>1&&(a=xt[0]),void 0===a.activity||void 0===a.iob)return Ne.error="Error: iob_data missing some property. ",Ne;var St=((yt=void 0!==a.lastTemp?o((new Date(Je).getTime()-a.lastTemp.date)/6e4):0)+t.duration)%30;if(console.error("currenttemp:"+t.rate+" lastTempAge:"+yt+"m, tempModulus:"+St+"m"),Ne.temp="absolute",Ne.deliverAt=He,m&&t&&a.lastTemp&&t.rate!==a.lastTemp.rate&&yt>10&&t.duration)return Ne.reason="Warning: currenttemp rate "+t.rate+" != lastTemp rate "+a.lastTemp.rate+" from pumphistory; canceling temp",u.setTempBasal(0,0,i,Ne,t);if(t&&a.lastTemp&&t.duration>0){var Dt=yt-a.lastTemp.duration;if(Dt>5&&yt>10)return Ne.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+Dt+"m ago; canceling temp",u.setTempBasal(0,0,i,Ne,t)}var wt=o(-a.activity*_t*5,2),Gt=o(6*(et-wt));Gt<0&&(Gt=o(6*(tt-wt)))<0&&(Gt=o(6*(e.long_avgdelta-wt)));var Tt=Xe,Ct=(Tt=a.iob>0?o(Xe-a.iob*_t):o(Xe-a.iob*Math.min(_t,N)))+Gt;if(void 0===Ct||isNaN(Ct))return Ne.error="Error: could not calculate eventualBG. Sensitivity: "+_t+" Deviation: "+Gt,Ne;var Ut,Ot,Rt=function(e,t,a){return o(a+(e-t)/24,1)}(rt,Ct,wt);Ne={temp:"absolute",bg:Xe,tick:Ke,eventualBG:Ct,insulinReq:0,reservoir:d,deliverAt:He,sensitivityRatio,TDD:de,insulin:ce,current_target:rt,insulinForManualBolus:C,manualBolusErrorString:0,minDelta:et,expectedDelta:Rt,minGuardBG:Ot,minPredBG:Ut};var At=[],It=[],Ft=[],jt=[];At.push(Xe),It.push(Xe),jt.push(Xe),Ft.push(Xe);var Pt=function(e,t,a,r,o,i){return t?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&o>100?(console.error("SMB disabled due to high temptarget of "+o),!1):!0===a.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&a.mealCOB?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of "+a.mealCOB),!0):!0===e.enableSMB_after_carbs&&a.carbs?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&o<100?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of "+n(o,e)),!0):!0===e.enableSMB_high_bg&&null!==i&&r>=i?(console.error("Checking BG to see if High for SMB enablement."),console.error("Current BG",r," | High BG ",i),a.bwFound?console.error("Warning: High BG SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("High BG detected. Enabling SMB."),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(i,m,l,Xe,rt,it);if(b)if(S){let e=c.getHours();e>=D&&e<=w&&(console.error("SMB disabled by schedule (a Profile is active with SMBs disabled)"),Pt=!1)}else console.error("SMBs are disabled (a Profile is active with SMBs disabled)"),Pt=!1;var Et=i.enableUAM,qt=0,Wt=0;qt=o(et-wt,1);var kt=o(et-wt,1);csf=_t/H,console.error("profile.sens:"+n(N,i)+", sens:"+n(_t,i)+", CSF:"+o(csf,1));var Lt=o(30*csf*5/60,1);qt>Lt&&(console.error("Limiting carb impact from "+qt+" to "+Lt+"mg/dL/5m (30g/h)"),qt=Lt);var zt=3;sensitivityRatio&&(zt/=sensitivityRatio);var Nt=zt;if(l.carbs){zt=Math.max(zt,l.mealCOB/20);var Ht=o((new Date(Je).getTime()-l.lastCarbTime)/6e4),Zt=(l.carbs-l.mealCOB)/l.carbs;Nt=o(Nt=zt+1.5*Ht/60,1),console.error("Last carbs "+Ht+" minutes ago; remainingCATime:"+Nt+"hours; "+o(100*Zt,1)+"% carbs absorbed")}var $t=Math.max(0,qt/5*60*Nt/2)/csf,Jt=90,Kt=1;i.remainingCarbsCap&&(Jt=Math.min(90,i.remainingCarbsCap)),i.remainingCarbsFraction&&(Kt=Math.min(1,i.remainingCarbsFraction));var Qt=1-Kt,Vt=Math.max(0,l.mealCOB-$t-l.carbs*Qt),Xt=(Vt=Math.min(Jt,Vt))*csf*5/60/(Nt/2),Yt=o(l.slopeFromMaxDeviation,2),ea=o(l.slopeFromMinDeviation,2),ta=Math.min(Yt,-ea/3);Wt=0===qt?0:Math.min(60*Nt/5/2,Math.max(0,l.mealCOB*csf/qt)),console.error("Carb Impact:"+qt+"mg/dL per 5m; CI Duration:"+o(5*Wt/60*2,1)+"hours; remaining CI ("+Nt/2+"h peak):"+o(Xt,1)+"mg/dL per 5m");var aa,ra,oa,na,ia=999,sa=999,la=999,ua=999,ma=999,da=999,ca=999,ga=Ct,ha=Xe,pa=Xe,va=0,fa=[],Ba=[];try{xt.forEach((function(e){var t=o(-e.activity*_t*5,2),a=o(-e.iobWithZeroTemp.activity*_t*5,2),r=Tt,n=qt*(1-Math.min(1,It.length/12));if(!0===(he&&!Ie))ga=It[It.length-1]+o(-e.activity*(1800/(P*Be*Math.log(Math.max(It[It.length-1],39)/Re+1)))*5,2)+n,r=jt[jt.length-1]+o(-e.iobWithZeroTemp.activity*(1800/(P*Be*Math.log(Math.max(jt[jt.length-1],39)/Re+1)))*5,2),console.log("Dynamic ISF (Logarithmic Formula) )adjusted predictions for IOB and ZT: IOBpredBG: "+o(ga,2)+" , ZTpredBG: "+o(r,2));else ga=It[It.length-1]+t+n,r=jt[jt.length-1]+a;var i=Math.max(0,Math.max(0,qt)*(1-At.length/Math.max(2*Wt,1))),s=Math.min(At.length,12*Nt-At.length),l=Math.max(0,s/(Nt/2*12)*Xt);i+l,fa.push(o(l,0)),Ba.push(o(i,0)),COBpredBG=At[At.length-1]+t+Math.min(0,n)+i+l;var u=Math.max(0,kt+Ft.length*ta),m=Math.max(0,kt*(1-Ft.length/Math.max(36,1))),d=Math.min(u,m);if(d>0&&(va=o(5*(Ft.length+1)/60,1)),!0===(he&&!Ie))UAMpredBG=Ft[Ft.length-1]+o(-e.activity*(1800/(P*Be*Math.log(Math.max(Ft[Ft.length-1],39)/Re+1)))*5,2)+Math.min(0,n)+d,console.log("Dynamic ISF (Logarithmic Formula) adjusted prediction for UAM: UAMpredBG: "+o(UAMpredBG,2));else UAMpredBG=Ft[Ft.length-1]+t+Math.min(0,n)+d;It.length<48&&It.push(ga),At.length<48&&At.push(COBpredBG),Ft.length<48&&Ft.push(UAMpredBG),jt.length<48&&jt.push(r),COBpredBG<ua&&(ua=o(COBpredBG)),UAMpredBG<ma&&(ma=o(UAMpredBG)),ga<da&&(da=o(ga)),r<ca&&(ca=o(r));It.length>18&&ga<ia&&(ia=o(ga)),ga>ha&&(ha=ga),(Wt||Xt>0)&&At.length>18&&COBpredBG<sa&&(sa=o(COBpredBG)),(Wt||Xt>0)&&COBpredBG>ha&&(pa=COBpredBG),Et&&Ft.length>12&&UAMpredBG<la&&(la=o(UAMpredBG)),Et&&UAMpredBG>ha&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}l.mealCOB&&(console.error("predCIs (mg/dL/5m):"+Ba.join(" ")),console.error("remainingCIs:      "+fa.join(" "))),Ne.predBGs={},It.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))}));for(var ba=It.length-1;ba>12&&It[ba-1]===It[ba];ba--)It.pop();for(Ne.predBGs.IOB=It,ra=o(It[It.length-1]),jt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ba=jt.length-1;ba>6&&!(jt[ba-1]>=jt[ba]||jt[ba]<=rt);ba--)jt.pop();if(Ne.predBGs.ZT=jt,o(jt[jt.length-1]),l.mealCOB>0&&(qt>0||Xt>0)){for(At.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ba=At.length-1;ba>12&&At[ba-1]===At[ba];ba--)At.pop();Ne.predBGs.COB=At,oa=o(At[At.length-1]),Ct=Math.max(Ct,o(At[At.length-1]))}if(qt>0||Xt>0){if(Et){for(Ft.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ba=Ft.length-1;ba>12&&Ft[ba-1]===Ft[ba];ba--)Ft.pop();Ne.predBGs.UAM=Ft,na=o(Ft[Ft.length-1]),Ft[Ft.length-1]&&(Ct=Math.max(Ct,o(Ft[Ft.length-1])))}Ne.eventualBG=Ct}console.error("UAM Impact:"+kt+"mg/dL per 5m; UAM Duration:"+va+"hours"),ia=Math.max(39,ia),sa=Math.max(39,sa),la=Math.max(39,la),Ut=o(ia);var Ma=l.mealCOB/l.carbs;aa=o(la<999&&sa<999?(1-Ma)*UAMpredBG+Ma*COBpredBG:sa<999?(ga+COBpredBG)/2:la<999?(ga+UAMpredBG)/2:ga),ca>aa&&(aa=ca),Ot=o(Ot=Wt||Xt>0?Et?Ma*ua+(1-Ma)*ma:ua:Et?ma:da);var _a=la;if(ca<Bt)_a=(la+ca)/2;else if(ca<rt){var ya=(ca-Bt)/(rt-Bt);_a=(la+(la*ya+ca*(1-ya)))/2}else ca>la&&(_a=(la+ca)/2);if(_a=o(_a),l.carbs)if(!Et&&sa<999)Ut=o(Math.max(ia,sa));else if(sa<999){var xa=Ma*sa+(1-Ma)*_a;Ut=o(Math.max(ia,sa,xa))}else Ut=Et?_a:Ot;else Et&&(Ut=o(Math.max(ia,_a)));Ut=Math.min(Ut,aa),process.stderr.write("minPredBG: "+Ut+" minIOBPredBG: "+ia+" minZTGuardBG: "+ca),sa<999&&process.stderr.write(" minCOBPredBG: "+sa),la<999&&process.stderr.write(" minUAMPredBG: "+la),console.error(" avgPredBG:"+aa+" COB/Carbs:"+l.mealCOB+"/"+l.carbs),pa>Xe&&(Ut=Math.min(Ut,pa)),Ne.COB=l.mealCOB,Ne.IOB=a.iob,Ne.BGI=n(wt,i),Ne.deviation=n(Gt,i),Ne.ISF=n(_t,i),Ne.CR=o(H,1),Ne.target_bg=n(rt,i),Ne.TDD=o(de,2),Ne.current_target=o(rt,0);var Sa=Ne.CR;We!=Ne.CR&&(Sa=We+"→"+Ne.CR),Ne.reason=Mt+", COB: "+Ne.COB+", Dev: "+Ne.deviation+", BGI: "+Ne.BGI+", CR: "+Sa+", Target: "+gt+", minPredBG "+n(Ut,i)+", minGuardBG "+n(Ot,i)+", IOBpredBG "+n(ra,i),oa>0&&(Ne.reason+=", COBpredBG "+n(oa,i)),na>0&&(Ne.reason+=", UAMpredBG "+n(na,i)),Ne.reason+=tddReason,Ne.reason+="; ";var Da=Tt;Da<40&&(Da=Math.min(Ot,Da));var wa,Ga=Bt-Da,Ta=240,Ca=240;if(l.mealCOB>0&&(qt>0||Xt>0)){for(ba=0;ba<At.length;ba++)if(At[ba]<ot){Ta=5*ba;break}for(ba=0;ba<At.length;ba++)if(At[ba]<Bt){Ca=5*ba;break}}else{for(ba=0;ba<It.length;ba++)if(It[ba]<ot){Ta=5*ba;break}for(ba=0;ba<It.length;ba++)if(It[ba]<Bt){Ca=5*ba;break}}Pt&&Ot<Bt&&(console.error("minGuardBG "+n(Ot,i)+" projected below "+n(Bt,i)+" - disabling SMB"),Ne.manualBolusErrorString=1,Ne.minGuardBG=Ot,Ne.insulinForManualBolus=o((Ne.eventualBG-Ne.target_bg)/_t,2),Pt=!1),void 0===i.maxDelta_bg_threshold&&(wa=.2),void 0!==i.maxDelta_bg_threshold&&(wa=Math.min(i.maxDelta_bg_threshold,.4)),at>wa*Xe&&(console.error("maxDelta "+n(at,i)+" > "+100*wa+"% of BG "+n(Xe,i)+" - disabling SMB"),Ne.reason+="maxDelta "+n(at,i)+" > "+100*wa+"% of BG "+n(Xe,i)+" - SMB disabled!, ",Pt=!1),console.error("BG projected to remain above "+n(ot,i)+" for "+Ta+"minutes"),(Ca<240||Ta<60)&&console.error("BG projected to remain above "+n(Bt,i)+" for "+Ca+"minutes");var Ua=Ca,Oa=i.current_basal*z*_t*Ua/60,Ra=Math.max(0,l.mealCOB-.25*l.carbs),Aa=(Ga-Oa)/csf-Ra;Oa=o(Oa),Aa=o(Aa),console.error("naive_eventualBG:",Tt,"bgUndershoot:",Ga,"zeroTempDuration:",Ua,"zeroTempEffect:",Oa,"carbsReq:",Aa),"Could not parse clock data"==l.reason?console.error("carbsReq unknown: Could not parse clock data"):Aa>=i.carbsReqThreshold&&Ca<=45&&(Ne.carbsReq=Aa,Ne.reason+=Aa+" add'l carbs req w/in "+Ca+"m; ");var Ia=0;if(Xe<Bt&&a.iob<-i.current_basal*z*20/60&&et>0&&et>Rt)Ne.reason+="IOB "+a.iob+" < "+o(-i.current_basal*z*20/60,2),Ne.reason+=" and minDelta "+n(et,i)+" > expectedDelta "+n(Rt,i)+"; ";else if(Xe<Bt||Ot<Bt)return Ne.reason+="minGuardBG "+n(Ot,i)+"<"+n(Bt,i),Ga=rt-Ot,Ot<Bt&&(Ne.manualBolusErrorString=2,Ne.minGuardBG=Ot),Ne.insulinForManualBolus=o((Ct-rt)/_t,2),Ia=o(60*(Ga/_t)/i.current_basal*z),Ia=30*o(Ia/30),Ia=Math.min(120,Math.max(30,Ia)),u.setTempBasal(0,Ia,i,Ne,t);if(i.skip_neutral_temps&&Ne.deliverAt.getMinutes()>=55)return Ne.reason+="; Canceling temp at "+Ne.deliverAt.getMinutes()+"m past the hour. ",u.setTempBasal(0,0,i,Ne,t);var Fa=0,ja=$e,Pa=0;if(Ct<ot){if(Ne.reason+="Eventual BG "+n(Ct,i)+" < "+n(ot,i),et>Rt&&et>0&&!Aa)return Tt<40?(Ne.reason+=", naive_eventualBG < 40. ",u.setTempBasal(0,30,i,Ne,t)):(e.delta>et?Ne.reason+=", but Delta "+n(Ke,i)+" > expectedDelta "+n(Rt,i):Ne.reason+=", but Min. Delta "+et.toFixed(2)+" > Exp. Delta "+n(Rt,i),t.duration>15&&r($e,i)===r(t.rate,i)?(Ne.reason+=", temp "+t.rate+" ~ req "+$e+"U/hr. ",Ne):(Ne.reason+="; setting current basal of "+$e+" as temp. ",u.setTempBasal($e,30,i,Ne,t)));Fa=o(Fa=2*Math.min(0,(Ct-rt)/_t),2);var Ea=Math.min(0,(Tt-rt)/_t);if(Ea=o(Ea,2),et<0&&et>Rt)Fa=o(Fa*(et/Rt),2);ja=r(ja=$e+2*Fa,i),Pa=t.duration*(t.rate-$e)/60;var qa=Math.min(Fa,Ea);if(console.log("naiveInsulinReq:"+Ea),Pa<qa-.3*$e)return Ne.reason+=", "+t.duration+"m@"+t.rate.toFixed(2)+" is a lot less than needed. ",u.setTempBasal(ja,30,i,Ne,t);if(void 0!==t.rate&&t.duration>5&&ja>=.8*t.rate)return Ne.reason+=", temp "+t.rate+" ~< req "+ja+"U/hr. ",Ne;if(ja<=0){if((Ia=o(60*((Ga=rt-Tt)/_t)/i.current_basal*z))<0?Ia=0:(Ia=30*o(Ia/30),Ia=Math.min(120,Math.max(0,Ia))),Ia>0)return Ne.reason+=", setting "+Ia+"m zero temp. ",u.setTempBasal(ja,Ia,i,Ne,t)}else Ne.reason+=", setting "+ja+"U/hr. ";return u.setTempBasal(ja,30,i,Ne,t)}if(et<Rt&&(Ne.minDelta=et,Ne.expectedDelta=Rt,(Rt-et>=2||Rt+-1*et>=2)&&(Ne.manualBolusErrorString=et>=0&&Rt>0?3:et<0&&Rt<=0||et<0&&Rt>=0?4:5),Ne.insulinForManualBolus=o((Ne.eventualBG-Ne.target_bg)/_t,2),!m||!Pt))return e.delta<et?Ne.reason+="Eventual BG "+n(Ct,i)+" > "+n(ot,i)+" but Delta "+n(Ke,i)+" < Exp. Delta "+n(Rt,i):Ne.reason+="Eventual BG "+n(Ct,i)+" > "+n(ot,i)+" but Min. Delta "+et.toFixed(2)+" < Exp. Delta "+n(Rt,i),t.duration>15&&r($e,i)===r(t.rate,i)?(Ne.reason+=", temp "+t.rate+" ~ req "+$e+"U/hr. ",Ne):(Ne.reason+="; setting current basal of "+$e+" as temp. ",u.setTempBasal($e,30,i,Ne,t));if(Math.min(Ct,Ut)<nt&&(Ut<ot&&Ct>ot&&(Ne.manualBolusErrorString=6,Ne.insulinForManualBolus=o((Ne.eventualBG-Ne.target_bg)/_t,2),Ne.minPredBG=Ut),!m||!Pt))return Ne.reason+=n(Ct,i)+"-"+n(Ut,i)+" in range: no temp required",t.duration>15&&r($e,i)===r(t.rate,i)?(Ne.reason+=", temp "+t.rate+" ~ req "+$e+"U/hr. ",Ne):(Ne.reason+="; setting current basal of "+$e+" as temp. ",u.setTempBasal($e,30,i,Ne,t));if(Ct>=nt&&(Ne.reason+="Eventual BG "+n(Ct,i)+" >= "+n(nt,i)+", ",Ct>nt&&(Ne.insulinForManualBolus=o((Ct-rt)/_t,2))),a.iob>st)return Ne.reason+="IOB "+o(a.iob,2)+" > max_iob "+st,t.duration>15&&r($e,i)===r(t.rate,i)?(Ne.reason+=", temp "+t.rate+" ~ req "+$e+"U/hr. ",Ne):(Ne.reason+="; setting current basal of "+$e+" as temp. ",u.setTempBasal($e,30,i,Ne,t));Fa=o((Math.min(Ut,Ct)-rt)/_t,2),C=o((Ct-rt)/_t,2),Fa>st-a.iob?(console.error("SMB limited by maxIOB: "+st-a.iob+" (. insulinReq: "+Fa+" U)"),Ne.reason+="max_iob "+st+", ",Fa=st-a.iob):console.error("SMB not limited by maxIOB ( insulinReq: "+Fa+" U)."),C>st-a.iob?(console.error("Ev. Bolus limited by maxIOB: "+st-a.iob+" (. insulinForManualBolus: "+C+" U)"),Ne.reason+="max_iob "+st+", "):console.error("Ev. Bolus would not be limited by maxIOB ( insulinForManualBolus: "+C+" U)."),ja=r(ja=$e+2*Fa,i),Fa=o(Fa,3),Ne.insulinReq=Fa;var Wa=o((new Date(Je).getTime()-a.lastBolusTime)/6e4,1);if(m&&Pt&&Xe>Bt){var ka=30;void 0!==i.maxSMBBasalMinutes&&(ka=i.maxSMBBasalMinutes);var La=30;void 0!==i.maxUAMSMBBasalMinutes&&(La=i.maxUAMSMBBasalMinutes),v.useOverride&&M&&G!==ka&&(console.error("SMB Max Minutes - setting overriden from "+ka+" to "+G),ka=G),v.useOverride&&M&&T!==La&&(console.error("UAM Max Minutes - setting overriden from "+La+" to "+T),La=T);var za=o(l.mealCOB/H,3),Na=0;void 0===ka?(Na=o(i.current_basal*z*30/60,1),console.error("smbMinutesSetting undefined: defaulting to 30m"),Fa>Na&&console.error("SMB limited by maxBolus: "+Na+" ( "+Fa+" U)")):a.iob>za&&a.iob>0?(console.error("IOB"+a.iob+"> COB"+l.mealCOB+"; mealInsulinReq ="+za),La?(console.error("maxUAMSMBBasalMinutes: "+La+", profile.current_basal: "+i.current_basal*z),Na=o(i.current_basal*z*La/60,1)):(console.error("maxUAMSMBBasalMinutes undefined: defaulting to 30m"),Na=o(i.current_basal*z*30/60,1)),Fa>Na?console.error("SMB limited by maxUAMSMBBasalMinutes [ "+La+"m ]: "+Na+"U ( "+Fa+"U )"):console.error("SMB is not limited by maxUAMSMBBasalMinutes. ( insulinReq: "+Fa+"U )")):(console.error(".maxSMBBasalMinutes: "+ka+", profile.current_basal: "+i.current_basal*z),Fa>(Na=o(i.current_basal*ka/60,1))?console.error("SMB limited by maxSMBBasalMinutes: "+ka+"m ]: "+Na+"U ( insulinReq: "+Fa+"U )"):console.error("SMB is not limited by maxSMBBasalMinutes. ( insulinReq: "+Fa+"U )"));var Ha=i.bolus_increment,Za=1/Ha,$a=i.smb_delivery_ratio;$a>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o($a,2));var Ja=Math.min(Fa*$a,Na);Ja=Math.floor(Ja*Za)/Za,Ia=o(60*((rt-(Tt+ia)/2)/_t)/i.current_basal*z),Fa>0&&Ja<Ha&&(Ia=0);var Ka=0;Ia<=0?Ia=0:Ia>=30?(Ia=30*o(Ia/30),Ia=Math.min(60,Math.max(0,Ia))):(Ka=o($e*Ia/30,2),Ia=30),Ne.reason+=" insulinReq "+Fa,Ja>=Na&&(Ne.reason+="; maxBolus "+Na),Ia>0&&(Ne.reason+="; setting "+Ia+"m low temp of "+Ka+"U/h"),Ne.reason+=". ";var Qa=3;i.SMBInterval&&(Qa=Math.min(10,Math.max(1,i.SMBInterval)));var Va=o(Qa-Wa,0),Xa=o(60*(Qa-Wa),0)%60;if(console.error("naive_eventualBG "+Tt+","+Ia+"m "+Ka+"U/h temp needed; last bolus "+Wa+"m ago; maxBolus: "+Na),Wa>Qa?Ja>0&&(Ne.units=Ja,Ne.reason+="Microbolusing "+Ja+"U. "):Ne.reason+="Waiting "+Va+"m "+Xa+"s to microbolus again. ",Ia>0)return Ne.rate=Ka,Ne.duration=Ia,Ne}var Ya=u.getMaxSafeBasal(i);return ja>Ya&&(Ne.reason+="adj. req. rate: "+ja+" to maxSafeBasal: "+o(Ya,2)+", ",ja=r(Ya,i)),(Pa=t.duration*(t.rate-$e)/60)>=2*Fa?(Ne.reason+=t.duration+"m@"+t.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+ja+"U/hr. ",u.setTempBasal(ja,30,i,Ne,t)):void 0===t.duration||0===t.duration?(Ne.reason+="no temp, setting "+ja+"U/hr. ",u.setTempBasal(ja,30,i,Ne,t)):t.duration>5&&r(ja,i)<=r(t.rate,i)?(Ne.reason+="temp "+t.rate+" >~ req "+ja+"U/hr. ",Ne):(Ne.reason+="temp "+t.rate+"<"+ja+"U/hr. ",u.setTempBasal(ja,30,i,Ne,t))}},6880:(e,t,a)=>{var r=a(6654);e.exports=function(e,t){var a=20;void 0!==t&&"string"==typeof t.model&&(r(t.model,"54")||r(t.model,"23"))&&(a=40);return e<1?Math.round(e*a)/a:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,t,a)=>{var r=a(5639).Symbol;e.exports=r},9932:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length,o=Array(r);++a<r;)o[a]=t(e[a],a,e);return o}},9750:e=>{e.exports=function(e,t,a){return e==e&&(void 0!==a&&(e=e<=a?e:a),void 0!==t&&(e=e>=t?e:t)),e}},4239:(e,t,a)=>{var r=a(2705),o=a(9607),n=a(2333),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},531:(e,t,a)=>{var r=a(2705),o=a(9932),n=a(1469),i=a(3448),s=r?r.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(n(t))return o(t,e)+"";if(i(t))return l?l.call(t):"";var a=t+"";return"0"==a&&1/t==-Infinity?"-0":a}},7561:(e,t,a)=>{var r=a(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(o,""):e}},1957:(e,t,a)=>{var r="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=r},9607:(e,t,a)=>{var r=a(2705),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=n.call(e,s),a=e[s];try{e[s]=void 0;var r=!0}catch(e){}var o=i.call(e);return r&&(t?e[s]=a:delete e[s]),o}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:(e,t,a)=>{var r=a(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=r||o||Function("return this")();e.exports=n},7990:e=>{var t=/\s/;e.exports=function(e){for(var a=e.length;a--&&t.test(e.charAt(a)););return a}},6654:(e,t,a)=>{var r=a(9750),o=a(531),n=a(554),i=a(9833);e.exports=function(e,t,a){e=i(e),t=o(t);var s=e.length,l=a=void 0===a?s:r(n(a),0,s);return(a-=t.length)>=0&&e.slice(a,l)==t}},1469:e=>{var t=Array.isArray;e.exports=t},3218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,t,a)=>{var r=a(4239),o=a(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},8601:(e,t,a)=>{var r=a(4841),o=1/0;e.exports=function(e){return e?(e=r(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,t,a)=>{var r=a(8601);e.exports=function(e){var t=r(e),a=t%1;return t==t?a?t-a:t:0}},4841:(e,t,a)=>{var r=a(7561),o=a(3218),n=a(3448),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var a=s.test(e);return a||l.test(e)?u(e.slice(2),a?2:8):i.test(e)?NaN:+e}},9833:(e,t,a)=>{var r=a(531);e.exports=function(e){return null==e?"":r(e)}}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var r=a(5546);freeaps_determineBasal=r})();