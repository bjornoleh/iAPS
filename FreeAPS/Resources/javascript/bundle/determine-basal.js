var freeaps_determineBasal;(()=>{var e={9636:(e,t,a)=>{var r=a(7749);function o(e,t){t||(t=0);var a=Math.pow(10,t);return Math.round(e*a)/a}function n(e,t){return"mmol/L"===t.out_units?o(.0555*e,1):Math.round(e)}e.exports=function(e,t,a,i,s,l,u,m,d,c,g,h,p,v){var f=i.min_bg,B=v.overrideTarget;0!=B&&6!=B&&v.useOverride&&!i.temptargetSet&&(f=B);const b=v.smbIsOff,M=v.advancedSettings,_=v.isfAndCr,y=v.isf,x=v.cr,S=v.smbIsAlwaysOff,D=v.start;var w=v.end;const G=v.smbMinutes,T=v.uamMinutes;var C=h.useNewFormula,U=0,O=f,A=0,R="",I="",F="",j="",P="",E="",q=0,W=0,k=0,L=0,z=0,N=0;const H=v.weightedAverage;var Z=1,$=i.sens,J=i.carb_ratio;v.useOverride&&(Z=v.overridePercentage/100,_?($/=Z,J/=Z):(x&&(J/=Z),y&&($/=Z)));const K=i.weightPercentage,Q=v.average_total_data;function V(e,t){var a=e.getTime();return new Date(a+36e5*t)}function X(e){var t=i.bolus_increment;.1!=t&&(t=.05);var a=e/t;return a>=1?o(Math.floor(a)*t,5):0}function Y(e){function t(e){return e<10&&(e="0"+e),e}return t(e.getHours())+":"+t(e.getMinutes())+":00"}function ee(e,t){var a=new Date("1/1/1999 "+e),r=new Date("1/1/1999 "+t);return(a.getTime()-r.getTime())/36e5}const te=Math.min(i.autosens_min,i.autosens_max),ae=Math.max(i.autosens_min,i.autosens_max);function re(e,t){var a=0,r=t,o=(e-t)/36e5,n=0,i=o,s=0;do{if(o>0){var l=Y(r),u=p[0].rate;for(let e=0;e<p.length;e++){var m=p[e].start;if(l==m){if(e+1<p.length){o>=(s=ee(p[e+1].start,p[e].start))?n=s:o<s&&(n=o)}else if(e+1==p.length){let t=p[0].start;o>=(s=24-ee(p[e].start,t))?n=s:o<s&&(n=o)}a+=X((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+X(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=V(r,n)}else if(l>m)if(e+1<p.length){var d=p[e+1].start;l<d&&(o>=(s=ee(d,l))?n=s:o<s&&(n=o),a+=X((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+X(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=V(r,n))}else if(e==p.length-1){o>=(s=ee("23:59:59",l))?n=s:o<s&&(n=o),a+=X((u=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+X(u*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+u+" U/h. Time :"+l),r=V(r,n)}}}}while(o>0&&o<i);return a}if((ae==te||ae<1||te>1)&&(C=!1,console.log("Dynamic ISF disabled due to current autosens settings")),g.length){if(C){let e=g.length-1;var oe=new Date(g[e].timestamp),ne=new Date(g[0].timestamp);if("TempBasalDuration"==g[0]._type&&(ne=new Date),(A=(ne-oe)/36e5)<23.9&&A>21)z=re(oe,(ie=24-A,se=oe.getTime(),new Date(se-36e5*ie))),j="24 hours of data is required for an accurate tdd calculation. Currently only "+A.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+z.toPrecision(5)+" U. ";else A<21?(C=!1,enableDynamicCR=!1):j=""}}else console.log("Pumphistory is empty!"),C=!1,enableDynamicCR=!1;var ie,se;if(C){for(let e=0;e<g.length;e++)"Bolus"==g[e]._type&&(L+=g[e].amount);for(let e=1;e<g.length;e++)if("TempBasal"==g[e]._type&&g[e].rate>0){q=e,N=g[e].rate;var le=g[e-1]["duration (min)"]/60,ue=le,me=new Date(g[e-1].timestamp),de=me,ce=0;do{if(e--,0==e){de=new Date;break}if("TempBasal"==g[e]._type||"PumpSuspend"==g[e]._type){de=new Date(g[e].timestamp);break}var ge=e-2;if(ge>=0&&"Rewind"==g[ge]._type){let e=g[ge].timestamp;for(;ge-1>=0&&"Prime"==g[ge-=1]._type;)ce=(g[ge].timestamp-e)/36e5;ce>=le&&(de=e,ce=0)}}while(e>0);var he=(de-me)/36e5;he<ue&&(le=he),k+=X(N*(le-ce)),e=q}for(let e=0;e<g.length;e++)if(0,0==g[e]["duration (min)"]||"PumpResume"==g[e]._type){let t=new Date(g[e].timestamp),a=t,r=e;do{if(r>0&&(--r,"TempBasal"==g[r]._type)){a=new Date(g[r].timestamp);break}}while(r>0);(a-t)/36e5>0&&(z+=re(a,t))}for(let e=g.length-1;e>0;e--)if("TempBasalDuration"==g[e]._type){let t=g[e]["duration (min)"]/60,a=new Date(g[e].timestamp);var pe=a;let r=e;do{if(--r,r>=0&&("TempBasal"==g[r]._type||"PumpSuspend"==g[r]._type)){pe=new Date(g[r].timestamp);break}}while(r>0);if(0==e&&"TempBasalDuration"==g[0]._type&&(pe=new Date,t=g[e]["duration (min)"]/60),(pe-a)/36e5-t>0){z+=re(pe,V(a,t))}}var ve={TDD:o(W=L+k+z,5),bolus:o(L,5),temp_basal:o(k,5),scheduled_basal:o(z,5)};A>21?(I=". Bolus insulin: "+L.toPrecision(5)+" U",F=". Temporary basal insulin: "+k.toPrecision(5)+" U",R=". Insulin with scheduled basal rate: "+z.toPrecision(5)+" U",P=j+(" TDD past 24h is: "+W.toPrecision(5)+" U")+I+F+R,E=", TDD: "+o(W,2)+" U, "+o(L/W*100,0)+"% Bolus "+o((k+z)/W*100,0)+"% Basal"):E=", TDD: Not enough pumpData (< 21h)"}var fe;const Be=e.glucose,be=h.enableDynamicCR,Me=h.adjustmentFactor,_e=f;var ye=!1,xe="",Se=1,De="";Q>0&&(Se=H/Q),De=Se>1?"Basal adjustment with a 24 hour  to total average (up to 14 days of data) TDD ratio (limited by Autosens max setting). Basal Ratio: "+(Se=o(Se=Math.min(Se,i.autosens_max),2))+". Upper limit = Autosens max ("+i.autosens_max+")":Se<1?"Basal adjustment with a 24 hour to  to total average (up to 14 days of data) TDD ratio (limited by Autosens min setting). Basal Ratio: "+(Se=o(Se=Math.max(Se,i.autosens_min),2))+". Lower limit = Autosens min ("+i.autosens_min+")":"Basal adjusted with a 24 hour to total average (up to 14 days of data) TDD ratio: "+Se,De=", Basal ratio: "+Se,(i.high_temptarget_raises_sensitivity||i.exercise_mode||v.isEnabled)&&(ye=!0),_e>=118&&ye&&(C=!1,xe="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+_e);var we=", Dynamic ratios log: ",Ge=", AF: "+Me,Te="BG: "+Be+" mg/dl ("+(.0555*Be).toPrecision(2)+" mmol/l)",Ce="",Ue="";const Oe=h.curve,Ae=i.insulinPeakTime,Re=h.useCustomPeakTime;var Ie=55,Fe=65;switch(Oe){case"rapid-acting":Fe=65;break;case"ultra-rapid":Fe=50}Re?(Ie=120-Ae,console.log("Custom insulinpeakTime set to :"+Ae+", insulinFactor: "+Ie)):(Ie=120-Fe,console.log("insulinFactor set to : "+Ie)),fe=W,K<1&&H>0&&(W=H,console.log("Using weighted TDD average: "+o(W,2)+" U, instead of past 24 h ("+o(fe,2)+" U), weight: "+K),Ue=", Weighted TDD: "+o(W,2)+" U");const je=h.sigmoid;var Pe="";if(C){var Ee=$*Me*W*Math.log(Be/Ie+1)/1800;Ce=", Logarithmic formula"}if(C&&je){const e=te,t=ae-e,a=.0555*(Be-f);var qe=Se,We=ae-1;1==ae&&(We=ae+.01-1);const r=Math.log10(1/We-e/We)/Math.log10(Math.E),o=a*Me*qe+r;Ee=t/(1+Math.exp(-o))+e,Ce=", Sigmoid function"}var ke=J;const Le=o(J,1);var ze="",Ne="";if(C&&W>0){if(ze=", Dynamic ISF/CR: On/",Ee>ae?(xe=", Dynamic ISF limited by autosens_max setting: "+ae+" ("+o(Ee,2)+"), ",Ne=", Autosens/Dynamic Limit: "+ae+" ("+o(Ee,2)+")",Ee=ae):Ee<te&&(xe=", Dynamic ISF limited by autosens_min setting: "+te+" ("+o(Ee,2)+"). ",Ne=", Autosens/Dynamic Limit: "+te+" ("+o(Ee,2)+")",Ee=te),be){ze+="On";var He=". New Dynamic CR: "+o(J/=Ee,1)+" g/U"}else He=" CR: "+ke+" g/U",ze+="Off";const e=$/Ee;s.ratio=Ee,Pe=". Using Sigmoid function, the autosens ratio has been adjusted with sigmoid factor to: "+o(s.ratio,2)+". New ISF = "+o(e,2)+" mg/dl ("+o(.0555*e,2)+" (mmol/l). CR adjusted from "+o(Le,2)+" to "+o(J,2),P+=we+Te+Ge+Ce+(xe+=je?Pe:", Dynamic autosens.ratio set to "+o(Ee,2)+" with ISF: "+e.toPrecision(3)+" mg/dl/U ("+(.0555*e).toPrecision(3)+" mmol/l/U)")+ze+He+Ue}else P+=we+"Dynamic Settings disabled";console.log(P),C||be?C&&i.tddAdjBasal?E+=ze+Ce+Ne+Ge+De:C&&!i.tddAdjBasal&&(E+=ze+Ce+Ne+Ge):E+="";var Ze={},$e=new Date;if(c&&($e=c),void 0===i||void 0===i.current_basal)return Ze.error="Error: could not get current basal rate",Ze;var Je=r(i.current_basal,i)*Z,Ke=Je;v.useOverride&&(0==v.duration?console.log("Profile Override is active. Override "+o(100*Z,0)+"%. Override Duration: Enabled indefinitely"):console.log("Profile Override is active. Override "+o(100*Z,0)+"%. Override Expires in: "+v.duration+" min."));var Qe=new Date;c&&(Qe=c);var Ve,Xe=new Date(e.date),Ye=o((Qe-Xe)/60/1e3,1),et=e.glucose,tt=e.noise;Ve=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var at=Math.min(e.delta,e.short_avgdelta),rt=Math.min(e.short_avgdelta,e.long_avgdelta),ot=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(et<=10||38===et||tt>=3)&&(Ze.reason="CGM is calibrating, in ??? state, or noise is high");if(et>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&400!=et&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(et,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):400!=et&&!0),Ye>12||Ye<-5?Ze.reason="If current system time "+Qe+" is correct, then BG data is too old. The last BG data was read "+Ye+"m ago at "+Xe:0===e.short_avgdelta&&0===e.long_avgdelta&&400!=et&&(e.last_cal&&e.last_cal<3?Ze.reason="CGM was just calibrated":Ze.reason="CGM data is unchanged ("+n(et,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,i)+" mg/dL ~45m change"),400!=et&&(et<=10||38===et||tt>=3||Ye>12||Ye<-5||0===e.short_avgdelta&&0===e.long_avgdelta))return t.rate>=Ke?(Ze.reason+=". Canceling high temp basal of "+t.rate,Ze.deliverAt=$e,Ze.temp="absolute",Ze.duration=0,Ze.rate=0,Ze):0===t.rate&&t.duration>30?(Ze.reason+=". Shortening "+t.duration+"m long zero temp to 30m. ",Ze.deliverAt=$e,Ze.temp="absolute",Ze.duration=30,Ze.rate=0,Ze):(Ze.reason+=". Temp "+t.rate+" <= current basal "+Ke+"U/hr; doing nothing. ",Ze);var nt,it,st,lt,ut=i.max_iob;if(void 0!==f&&(it=f),void 0!==i.max_bg&&(st=f),void 0!==i.enableSMB_high_bg_target&&(lt=i.enableSMB_high_bg_target),void 0===f)return Ze.error="Error: could not determine target_bg. ",Ze;nt=f;var mt=i.exercise_mode||i.high_temptarget_raises_sensitivity||v.isEnabled,dt=100,ct=160;if(ct=i.half_basal_exercise_target,v.isEnabled){const e=v.hbt;console.log("Half Basal Target used: "+n(e,i)+" "+i.out_units),ct=e}else console.log("Default Half Basal Target used: "+n(ct,i)+" "+i.out_units);if(mt&&i.temptargetSet&&nt>dt||i.low_temptarget_lowers_sensitivity&&i.temptargetSet&&nt<dt||v.isEnabled&&i.temptargetSet&&nt<dt){var gt=ct-dt;sensitivityRatio=gt*(gt+nt-dt)<=0?i.autosens_max:gt/(gt+nt-dt),sensitivityRatio=Math.min(sensitivityRatio,i.autosens_max),sensitivityRatio=o(sensitivityRatio,2),process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+nt+"; ")}else void 0!==s&&s&&(sensitivityRatio=s.ratio,0===B||6===B||B===i.min_bg||i.temptargetSet||(nt=B,console.log("Current Override Profile Target: "+n(B,i)+" "+i.out_units)),process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(i.temptargetSet&&nt<dt&&C&&Be>=nt&&sensitivityRatio<Ee&&(s.ratio=Ee*(dt/nt),s.ratio=Math.min(s.ratio,i.autosens_max),sensitivityRatio=o(s.ratio,2),console.log("Dynamic ratio increased from "+o(Ee,2)+" to "+o(s.ratio,2)+" due to a low temp target ("+nt+").")),sensitivityRatio&&!C?(Ke=i.current_basal*Z*sensitivityRatio,Ke=r(Ke,i)):C&&i.tddAdjBasal&&(Ke=i.current_basal*Se*Z,Ke=r(Ke,i),Q>0&&(process.stderr.write("TDD-adjustment of basals activated, using tdd24h_14d_Ratio "+o(Se,2)+", TDD 24h = "+o(fe,2)+"U, Weighted average TDD = "+o(H,2)+"U, (Weight percentage = "+K+"), Total data of TDDs (up to 14 days) average = "+o(Q,2)+"U. "),Ke!==Je*Z?process.stderr.write("Adjusting basal from "+Je*Z+" U/h to "+Ke+" U/h; "):process.stderr.write("Basal unchanged: "+Ke+" U/h; "))),i.temptargetSet);else if(void 0!==s&&s&&(i.sensitivity_raises_target&&s.ratio<1||i.resistance_lowers_target&&s.ratio>1)){it=o((it-60)/s.ratio)+60,st=o((st-60)/s.ratio)+60;var ht=o((nt-60)/s.ratio)+60;nt===(ht=Math.max(80,ht))?process.stderr.write("target_bg unchanged: "+n(ht,i)+"; "):process.stderr.write("target_bg from "+n(ht,i)+" to "+n(ht,i)+"; "),nt=ht}var pt=n(nt,i);nt!=f&&(pt=0!==B&&6!==B&&B!==nt?n(f,i)+"→"+n(B,i)+"→"+n(nt,i):n(f,i)+"→"+n(nt,i));var vt=200,ft=200,Bt=200;if(e.noise>=2){var bt=Math.max(1.1,i.noisyCGMTargetMultiplier);Math.min(250,i.maxRaw);vt=o(Math.min(200,it*bt)),ft=o(Math.min(200,nt*bt)),Bt=o(Math.min(200,st*bt)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+n(ht,i)+" to "+n(ft,i)+"; "),it=vt,nt=ft,st=Bt}O=it-.5*(it-40),O=Math.min(Math.max(i.threshold_setting,O,65),120),console.error("Threshold set to ${convert_bg(threshold, profile)}");var Mt="",_t=(o($,1),$);if(void 0!==s&&s&&((_t=o(_t=$/sensitivityRatio,1))!==$?process.stderr.write("ISF from "+n($,i)+" to "+n(_t,i)):process.stderr.write("ISF unchanged: "+n(_t,i)),Mt+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+n($,i)+"→"+n(_t,i)),console.error("CR:"+J),void 0===a)return Ze.error="Error: iob_data undefined. ",Ze;var yt,xt=a;if(a.length,a.length>1&&(a=xt[0]),void 0===a.activity||void 0===a.iob)return Ze.error="Error: iob_data missing some property. ",Ze;var St=((yt=void 0!==a.lastTemp?o((new Date(Qe).getTime()-a.lastTemp.date)/6e4):0)+t.duration)%30;if(console.error("currenttemp:"+t.rate+" lastTempAge:"+yt+"m, tempModulus:"+St+"m"),Ze.temp="absolute",Ze.deliverAt=$e,m&&t&&a.lastTemp&&t.rate!==a.lastTemp.rate&&yt>10&&t.duration)return Ze.reason="Warning: currenttemp rate "+t.rate+" != lastTemp rate "+a.lastTemp.rate+" from pumphistory; canceling temp",u.setTempBasal(0,0,i,Ze,t);if(t&&a.lastTemp&&t.duration>0){var Dt=yt-a.lastTemp.duration;if(Dt>5&&yt>10)return Ze.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+Dt+"m ago; canceling temp",u.setTempBasal(0,0,i,Ze,t)}var wt=o(-a.activity*_t*5,2),Gt=o(6*(at-wt));Gt<0&&(Gt=o(6*(rt-wt)))<0&&(Gt=o(6*(e.long_avgdelta-wt)));var Tt=et,Ct=(Tt=a.iob>0?o(et-a.iob*_t):o(et-a.iob*Math.min(_t,$)))+Gt;if(void 0===Ct||isNaN(Ct))return Ze.error="Error: could not calculate eventualBG. Sensitivity: "+_t+" Deviation: "+Gt,Ze;var Ut,Ot,At=function(e,t,a){return o(a+(e-t)/24,1)}(nt,Ct,wt);Ze={temp:"absolute",bg:et,tick:Ve,eventualBG:Ct,insulinReq:0,reservoir:d,deliverAt:$e,sensitivityRatio,CR:o(J,1),TDD:fe,insulin:ve,current_target:nt,insulinForManualBolus:U,manualBolusErrorString:0,minDelta:at,expectedDelta:At,minGuardBG:Ot,minPredBG:Ut,threshold:n(O,i)};var Rt=[],It=[],Ft=[],jt=[];Rt.push(et),It.push(et),jt.push(et),Ft.push(et);var Pt=function(e,t,a,r,o,i){return t?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&o>100?(console.error("SMB disabled due to high temptarget of "+o),!1):!0===a.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):400==r?(console.error("Invalid CGM (HIGH). SMBs disabled."),!1):!0===e.enableSMB_always?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&a.mealCOB?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of "+a.mealCOB),!0):!0===e.enableSMB_after_carbs&&a.carbs?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&o<100?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of "+n(o,e)),!0):!0===e.enableSMB_high_bg&&null!==i&&r>=i?(console.error("Checking BG to see if High for SMB enablement."),console.error("Current BG",r," | High BG ",i),a.bwFound?console.error("Warning: High BG SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("High BG detected. Enabling SMB."),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(i,m,l,et,nt,lt);if(b)if(S){let e=c.getHours();w<D&&e<24&&e>D&&(w+=24),e>=D&&e<=w&&(console.error("SMB disabled by profile override"),Pt=!1),w<D&&e<w&&(console.error("SMB disabled by profile override"),Pt=!1)}else console.error("SMBs are disabled by profile override"),Pt=!1;var Et=i.enableUAM,qt=0,Wt=0;qt=o(at-wt,1);var kt=o(at-wt,1);csf=_t/J,console.error("profile.sens:"+n($,i)+", sens:"+n(_t,i)+", CSF:"+o(csf,1));var Lt=o(30*csf*5/60,1);qt>Lt&&(console.error("Limiting carb impact from "+qt+" to "+Lt+"mg/dL/5m (30g/h)"),qt=Lt);var zt=3;sensitivityRatio&&(zt/=sensitivityRatio);var Nt=zt;if(l.carbs){zt=Math.max(zt,l.mealCOB/20);var Ht=o((new Date(Qe).getTime()-l.lastCarbTime)/6e4),Zt=(l.carbs-l.mealCOB)/l.carbs;Nt=o(Nt=zt+1.5*Ht/60,1),console.error("Last carbs "+Ht+" minutes ago; remainingCATime:"+Nt+"hours; "+o(100*Zt,1)+"% carbs absorbed")}var $t=Math.max(0,qt/5*60*Nt/2)/csf,Jt=90,Kt=1;i.remainingCarbsCap&&(Jt=Math.min(90,i.remainingCarbsCap)),i.remainingCarbsFraction&&(Kt=Math.min(1,i.remainingCarbsFraction));var Qt=1-Kt,Vt=Math.max(0,l.mealCOB-$t-l.carbs*Qt),Xt=(Vt=Math.min(Jt,Vt))*csf*5/60/(Nt/2),Yt=o(l.slopeFromMaxDeviation,2),ea=o(l.slopeFromMinDeviation,2),ta=Math.min(Yt,-ea/3);Wt=0===qt?0:Math.min(60*Nt/5/2,Math.max(0,l.mealCOB*csf/qt)),console.error("Carb Impact:"+qt+"mg/dL per 5m; CI Duration:"+o(5*Wt/60*2,1)+"hours; remaining CI ("+Nt/2+"h peak):"+o(Xt,1)+"mg/dL per 5m");var aa,ra,oa,na,ia=999,sa=999,la=999,ua=999,ma=999,da=999,ca=999,ga=Ct,ha=et,pa=et,va=0,fa=[],Ba=[];try{xt.forEach((function(e){var t=o(-e.activity*_t*5,2),a=o(-e.iobWithZeroTemp.activity*_t*5,2),r=Tt,n=qt*(1-Math.min(1,It.length/12));if(!0===(C&&!je))ga=It[It.length-1]+o(-e.activity*(1800/(W*Me*Math.log(Math.max(It[It.length-1],39)/Ie+1)))*5,2)+n,r=jt[jt.length-1]+o(-e.iobWithZeroTemp.activity*(1800/(W*Me*Math.log(Math.max(jt[jt.length-1],39)/Ie+1)))*5,2),console.log("Dynamic ISF (Logarithmic Formula) )adjusted predictions for IOB and ZT: IOBpredBG: "+o(ga,2)+" , ZTpredBG: "+o(r,2));else ga=It[It.length-1]+t+n,r=jt[jt.length-1]+a;var i=Math.max(0,Math.max(0,qt)*(1-Rt.length/Math.max(2*Wt,1))),s=Math.min(Rt.length,12*Nt-Rt.length),l=Math.max(0,s/(Nt/2*12)*Xt);i+l,fa.push(o(l,0)),Ba.push(o(i,0)),COBpredBG=Rt[Rt.length-1]+t+Math.min(0,n)+i+l;var u=Math.max(0,kt+Ft.length*ta),m=Math.max(0,kt*(1-Ft.length/Math.max(36,1))),d=Math.min(u,m);if(d>0&&(va=o(5*(Ft.length+1)/60,1)),!0===(C&&!je))UAMpredBG=Ft[Ft.length-1]+o(-e.activity*(1800/(W*Me*Math.log(Math.max(Ft[Ft.length-1],39)/Ie+1)))*5,2)+Math.min(0,n)+d,console.log("Dynamic ISF (Logarithmic Formula) adjusted prediction for UAM: UAMpredBG: "+o(UAMpredBG,2));else UAMpredBG=Ft[Ft.length-1]+t+Math.min(0,n)+d;It.length<48&&It.push(ga),Rt.length<48&&Rt.push(COBpredBG),Ft.length<48&&Ft.push(UAMpredBG),jt.length<48&&jt.push(r),COBpredBG<ua&&(ua=o(COBpredBG)),UAMpredBG<ma&&(ma=o(UAMpredBG)),ga<da&&(da=o(ga)),r<ca&&(ca=o(r));It.length>18&&ga<ia&&(ia=o(ga)),ga>ha&&(ha=ga),(Wt||Xt>0)&&Rt.length>18&&COBpredBG<sa&&(sa=o(COBpredBG)),(Wt||Xt>0)&&COBpredBG>ha&&(pa=COBpredBG),Et&&Ft.length>12&&UAMpredBG<la&&(la=o(UAMpredBG)),Et&&UAMpredBG>ha&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}l.mealCOB&&(console.error("predCIs (mg/dL/5m):"+Ba.join(" ")),console.error("remainingCIs:      "+fa.join(" "))),Ze.predBGs={},It.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))}));for(var ba=It.length-1;ba>12&&It[ba-1]===It[ba];ba--)It.pop();for(Ze.predBGs.IOB=It,ra=o(It[It.length-1]),jt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ba=jt.length-1;ba>6&&!(jt[ba-1]>=jt[ba]||jt[ba]<=nt);ba--)jt.pop();if(Ze.predBGs.ZT=jt,o(jt[jt.length-1]),l.mealCOB>0&&(qt>0||Xt>0)){for(Rt.forEach((function(e,t,a){a[t]=o(Math.min(1500,Math.max(39,e)))})),ba=Rt.length-1;ba>12&&Rt[ba-1]===Rt[ba];ba--)Rt.pop();Ze.predBGs.COB=Rt,oa=o(Rt[Rt.length-1]),Ct=Math.max(Ct,o(Rt[Rt.length-1])),console.error("COBpredBG: "+o(Rt[Rt.length-1]))}if(qt>0||Xt>0){if(Et){for(Ft.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ba=Ft.length-1;ba>12&&Ft[ba-1]===Ft[ba];ba--)Ft.pop();Ze.predBGs.UAM=Ft,na=o(Ft[Ft.length-1]),Ft[Ft.length-1]&&(Ct=Math.max(Ct,o(Ft[Ft.length-1])))}Ze.eventualBG=Ct}console.error("UAM Impact:"+kt+"mg/dL per 5m; UAM Duration:"+va+"hours"),ia=Math.max(39,ia),sa=Math.max(39,sa),la=Math.max(39,la),Ut=o(ia);var Ma=l.mealCOB/l.carbs;aa=o(la<999&&sa<999?(1-Ma)*UAMpredBG+Ma*COBpredBG:sa<999?(ga+COBpredBG)/2:la<999?(ga+UAMpredBG)/2:ga),ca>aa&&(aa=ca),Ot=o(Ot=Wt||Xt>0?Et?Ma*ua+(1-Ma)*ma:ua:Et?ma:da);var _a=la;if(ca<O)_a=(la+ca)/2;else if(ca<nt){var ya=(ca-O)/(nt-O);_a=(la+(la*ya+ca*(1-ya)))/2}else ca>la&&(_a=(la+ca)/2);if(_a=o(_a),l.carbs)if(!Et&&sa<999)Ut=o(Math.max(ia,sa));else if(sa<999){var xa=Ma*sa+(1-Ma)*_a;Ut=o(Math.max(ia,sa,xa))}else Ut=Et?_a:Ot;else Et&&(Ut=o(Math.max(ia,_a)));Ut=Math.min(Ut,aa),process.stderr.write("minPredBG: "+Ut+" minIOBPredBG: "+ia+" minZTGuardBG: "+ca),sa<999&&process.stderr.write(" minCOBPredBG: "+sa),la<999&&process.stderr.write(" minUAMPredBG: "+la),console.error(" avgPredBG:"+aa+" COB/Carbs:"+l.mealCOB+"/"+l.carbs),pa>et&&(Ut=Math.min(Ut,pa)),Ze.COB=l.mealCOB,Ze.IOB=a.iob,Ze.BGI=n(wt,i),Ze.deviation=n(Gt,i),Ze.ISF=n(_t,i),Ze.CR=o(J,1),Ze.target_bg=n(nt,i),Ze.TDD=o(fe,2),Ze.current_target=o(nt,0);var Sa=Ze.CR;Le!=Ze.CR&&(Sa=Le+"→"+Ze.CR),Ze.reason=Mt+", COB: "+Ze.COB+", Dev: "+Ze.deviation+", BGI: "+Ze.BGI+", CR: "+Sa+", Target: "+pt+", minPredBG "+n(Ut,i)+", minGuardBG "+n(Ot,i)+", IOBpredBG "+n(ra,i),oa>0&&(Ze.reason+=", COBpredBG "+n(oa,i)),na>0&&(Ze.reason+=", UAMpredBG "+n(na,i)),Ze.reason+=E,.5!=i.smb_delivery_ratio&&(Ze.reason+=", SMB Ratio: "+i.smb_delivery_ratio),Ze.reason+="; ";var Da=Tt;Da<40&&(Da=Math.min(Ot,Da));var wa,Ga=O-Da,Ta=240,Ca=240;if(l.mealCOB>0&&(qt>0||Xt>0)){for(ba=0;ba<Rt.length;ba++)if(Rt[ba]<it){Ta=5*ba;break}for(ba=0;ba<Rt.length;ba++)if(Rt[ba]<O){Ca=5*ba;break}}else{for(ba=0;ba<It.length;ba++)if(It[ba]<it){Ta=5*ba;break}for(ba=0;ba<It.length;ba++)if(It[ba]<O){Ca=5*ba;break}}Pt&&Ot<O&&(console.error("minGuardBG "+n(Ot,i)+" projected below "+n(O,i)+" - disabling SMB"),Ze.manualBolusErrorString=1,Ze.minGuardBG=Ot,Ze.insulinForManualBolus=o((Ze.eventualBG-Ze.target_bg)/_t,2),Pt=!1),void 0===i.maxDelta_bg_threshold&&(wa=.2),void 0!==i.maxDelta_bg_threshold&&(wa=Math.min(i.maxDelta_bg_threshold,.4)),ot>wa*et&&(console.error("maxDelta "+n(ot,i)+" > "+100*wa+"% of BG "+n(et,i)+" - disabling SMB"),Ze.reason+="maxDelta "+n(ot,i)+" > "+100*wa+"% of BG "+n(et,i)+" - SMB disabled!, ",Pt=!1),console.error("BG projected to remain above "+n(it,i)+" for "+Ta+"minutes"),(Ca<240||Ta<60)&&console.error("BG projected to remain above "+n(O,i)+" for "+Ca+"minutes");var Ua=Ca,Oa=i.current_basal*Z*_t*Ua/60,Aa=Math.max(0,l.mealCOB-.25*l.carbs),Ra=(Ga-Oa)/csf-Aa;Oa=o(Oa),Ra=o(Ra),console.error("naive_eventualBG:",Tt,"bgUndershoot:",Ga,"zeroTempDuration:",Ua,"zeroTempEffect:",Oa,"carbsReq:",Ra),"Could not parse clock data"==l.reason?console.error("carbsReq unknown: Could not parse clock data"):Ra>=i.carbsReqThreshold&&Ca<=45&&(Ze.carbsReq=Ra,Ze.reason+=Ra+" add'l carbs req w/in "+Ca+"m; ");var Ia=0;if(et<O&&a.iob<-i.current_basal*Z*20/60&&at>0&&at>At)Ze.reason+="IOB "+a.iob+" < "+o(-i.current_basal*Z*20/60,2),Ze.reason+=" and minDelta "+n(at,i)+" > expectedDelta "+n(At,i)+"; ";else if(et<O||Ot<O)return Ze.reason+="minGuardBG "+n(Ot,i)+"<"+n(O,i),Ga=nt-Ot,Ot<O&&(Ze.manualBolusErrorString=2,Ze.minGuardBG=Ot),Ze.insulinForManualBolus=o((Ct-nt)/_t,2),Ia=o(60*(Ga/_t)/i.current_basal*Z),Ia=30*o(Ia/30),Ia=Math.min(120,Math.max(30,Ia)),u.setTempBasal(0,Ia,i,Ze,t);if(i.skip_neutral_temps&&Ze.deliverAt.getMinutes()>=55)return Ze.reason+="; Canceling temp at "+Ze.deliverAt.getMinutes()+"m past the hour. ",u.setTempBasal(0,0,i,Ze,t);var Fa=0,ja=Ke,Pa=0;if(Ct<it){if(Ze.reason+="Eventual BG "+n(Ct,i)+" < "+n(it,i),at>At&&at>0&&!Ra)return Tt<40?(Ze.reason+=", naive_eventualBG < 40. ",u.setTempBasal(0,30,i,Ze,t)):(e.delta>at?Ze.reason+=", but Delta "+n(Ve,i)+" > expectedDelta "+n(At,i):Ze.reason+=", but Min. Delta "+at.toFixed(2)+" > Exp. Delta "+n(At,i),t.duration>15&&r(Ke,i)===r(t.rate,i)?(Ze.reason+=", temp "+t.rate+" ~ req "+Ke+"U/hr. ",Ze):(Ze.reason+="; setting current basal of "+Ke+" as temp. ",u.setTempBasal(Ke,30,i,Ze,t)));Fa=o(Fa=2*Math.min(0,(Ct-nt)/_t),2);var Ea=Math.min(0,(Tt-nt)/_t);if(Ea=o(Ea,2),at<0&&at>At)Fa=o(Fa*(at/At),2);ja=r(ja=Ke+2*Fa,i),Pa=t.duration*(t.rate-Ke)/60;var qa=Math.min(Fa,Ea);if(console.log("naiveInsulinReq:"+Ea),Pa<qa-.3*Ke)return Ze.reason+=", "+t.duration+"m@"+t.rate.toFixed(2)+" is a lot less than needed. ",u.setTempBasal(ja,30,i,Ze,t);if(void 0!==t.rate&&t.duration>5&&ja>=.8*t.rate)return Ze.reason+=", temp "+t.rate+" ~< req "+ja+"U/hr. ",Ze;if(ja<=0){if((Ia=o(60*((Ga=nt-Tt)/_t)/i.current_basal*Z))<0?Ia=0:(Ia=30*o(Ia/30),Ia=Math.min(120,Math.max(0,Ia))),Ia>0)return Ze.reason+=", setting "+Ia+"m zero temp. ",u.setTempBasal(ja,Ia,i,Ze,t)}else Ze.reason+=", setting "+ja+"U/hr. ";return u.setTempBasal(ja,30,i,Ze,t)}if(at<At&&(Ze.minDelta=at,Ze.expectedDelta=At,(At-at>=2||At+-1*at>=2)&&(Ze.manualBolusErrorString=at>=0&&At>0?3:at<0&&At<=0||at<0&&At>=0?4:5),Ze.insulinForManualBolus=o((Ze.eventualBG-Ze.target_bg)/_t,2),!m||!Pt))return e.delta<at?Ze.reason+="Eventual BG "+n(Ct,i)+" > "+n(it,i)+" but Delta "+n(Ve,i)+" < Exp. Delta "+n(At,i):Ze.reason+="Eventual BG "+n(Ct,i)+" > "+n(it,i)+" but Min. Delta "+at.toFixed(2)+" < Exp. Delta "+n(At,i),t.duration>15&&r(Ke,i)===r(t.rate,i)?(Ze.reason+=", temp "+t.rate+" ~ req "+Ke+"U/hr. ",Ze):(Ze.reason+="; setting current basal of "+Ke+" as temp. ",u.setTempBasal(Ke,30,i,Ze,t));if(Math.min(Ct,Ut)<st&&(Ut<it&&Ct>it&&(Ze.manualBolusErrorString=6,Ze.insulinForManualBolus=o((Ze.eventualBG-Ze.target_bg)/_t,2),Ze.minPredBG=Ut),!m||!Pt))return Ze.reason+=n(Ct,i)+"-"+n(Ut,i)+" in range: no temp required",t.duration>15&&r(Ke,i)===r(t.rate,i)?(Ze.reason+=", temp "+t.rate+" ~ req "+Ke+"U/hr. ",Ze):(Ze.reason+="; setting current basal of "+Ke+" as temp. ",u.setTempBasal(Ke,30,i,Ze,t));if(Ct>=st&&(Ze.reason+="Eventual BG "+n(Ct,i)+" >= "+n(st,i)+", ",Ct>st&&(Ze.insulinForManualBolus=o((Ct-nt)/_t,2))),a.iob>ut)return Ze.reason+="IOB "+o(a.iob,2)+" > max_iob "+ut,t.duration>15&&r(Ke,i)===r(t.rate,i)?(Ze.reason+=", temp "+t.rate+" ~ req "+Ke+"U/hr. ",Ze):(Ze.reason+="; setting current basal of "+Ke+" as temp. ",u.setTempBasal(Ke,30,i,Ze,t));Fa=o((Math.min(Ut,Ct)-nt)/_t,2),U=o((Ct-nt)/_t,2),Fa>ut-a.iob?(console.error("SMB limited by maxIOB: "+ut-a.iob+" (. insulinReq: "+Fa+" U)"),Ze.reason+="max_iob "+ut+", ",Fa=ut-a.iob):console.error("SMB not limited by maxIOB ( insulinReq: "+Fa+" U)."),U>ut-a.iob?(console.error("Ev. Bolus limited by maxIOB: "+ut-a.iob+" (. insulinForManualBolus: "+U+" U)"),Ze.reason+="max_iob "+ut+", "):console.error("Ev. Bolus would not be limited by maxIOB ( insulinForManualBolus: "+U+" U)."),ja=r(ja=Ke+2*Fa,i),Fa=o(Fa,3),Ze.insulinReq=Fa;var Wa=o((new Date(Qe).getTime()-a.lastBolusTime)/6e4,1);if(m&&Pt&&et>O){var ka=30;void 0!==i.maxSMBBasalMinutes&&(ka=i.maxSMBBasalMinutes);var La=30;void 0!==i.maxUAMSMBBasalMinutes&&(La=i.maxUAMSMBBasalMinutes),v.useOverride&&M&&G!==ka&&(console.error("SMB Max Minutes - setting overriden from "+ka+" to "+G),ka=G),v.useOverride&&M&&T!==La&&(console.error("UAM Max Minutes - setting overriden from "+La+" to "+T),La=T);var za=o(l.mealCOB/J,3),Na=0;void 0===ka?(Na=o(i.current_basal*Z*30/60,1),console.error("smbMinutesSetting undefined: defaulting to 30m"),Fa>Na&&console.error("SMB limited by maxBolus: "+Na+" ( "+Fa+" U)")):a.iob>za&&a.iob>0?(console.error("IOB"+a.iob+"> COB"+l.mealCOB+"; mealInsulinReq ="+za),La?(console.error("maxUAMSMBBasalMinutes: "+La+", profile.current_basal: "+i.current_basal*Z),Na=o(i.current_basal*Z*La/60,1)):(console.error("maxUAMSMBBasalMinutes undefined: defaulting to 30m"),Na=o(i.current_basal*Z*30/60,1)),Fa>Na?console.error("SMB limited by maxUAMSMBBasalMinutes [ "+La+"m ]: "+Na+"U ( "+Fa+"U )"):console.error("SMB is not limited by maxUAMSMBBasalMinutes. ( insulinReq: "+Fa+"U )")):(console.error(".maxSMBBasalMinutes: "+ka+", profile.current_basal: "+i.current_basal*Z),Fa>(Na=o(i.current_basal*ka/60,1))?console.error("SMB limited by maxSMBBasalMinutes: "+ka+"m ]: "+Na+"U ( insulinReq: "+Fa+"U )"):console.error("SMB is not limited by maxSMBBasalMinutes. ( insulinReq: "+Fa+"U )"));var Ha=i.bolus_increment,Za=1/Ha,$a=i.smb_delivery_ratio;$a>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o($a,2));var Ja=Math.min(Fa*$a,Na);Ja=Math.floor(Ja*Za)/Za,Ia=o(60*((nt-(Tt+ia)/2)/_t)/i.current_basal*Z),Fa>0&&Ja<Ha&&(Ia=0);var Ka=0;Ia<=0?Ia=0:Ia>=30?(Ia=30*o(Ia/30),Ia=Math.min(60,Math.max(0,Ia))):(Ka=o(Ke*Ia/30,2),Ia=30),Ze.reason+=" insulinReq "+Fa,Ja>=Na&&(Ze.reason+="; maxBolus "+Na),Ia>0&&(Ze.reason+="; setting "+Ia+"m low temp of "+Ka+"U/h"),Ze.reason+=". ";var Qa=3;i.SMBInterval&&(Qa=Math.min(10,Math.max(1,i.SMBInterval)));var Va=o(Qa-Wa,0),Xa=o(60*(Qa-Wa),0)%60;if(console.error("naive_eventualBG "+Tt+","+Ia+"m "+Ka+"U/h temp needed; last bolus "+Wa+"m ago; maxBolus: "+Na),Wa>Qa?Ja>0&&(Ze.units=Ja,Ze.reason+="Microbolusing "+Ja+"U. "):Ze.reason+="Waiting "+Va+"m "+Xa+"s to microbolus again. ",Ia>0)return Ze.rate=Ka,Ze.duration=Ia,Ze}var Ya=u.getMaxSafeBasal(i);return 400==et?u.setTempBasal(i.current_basal,30,i,Ze,t):(ja>Ya&&(Ze.reason+="adj. req. rate: "+ja+" to maxSafeBasal: "+o(Ya,2)+", ",ja=r(Ya,i)),(Pa=t.duration*(t.rate-Ke)/60)>=2*Fa?(Ze.reason+=t.duration+"m@"+t.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+ja+"U/hr. ",u.setTempBasal(ja,30,i,Ze,t)):void 0===t.duration||0===t.duration?(Ze.reason+="no temp, setting "+ja+"U/hr. ",u.setTempBasal(ja,30,i,Ze,t)):t.duration>5&&r(ja,i)<=r(t.rate,i)?(Ze.reason+="temp "+t.rate+" >~ req "+ja+"U/hr. ",Ze):(Ze.reason+="temp "+t.rate+"<"+ja+"U/hr. ",u.setTempBasal(ja,30,i,Ze,t)))}},7749:(e,t,a)=>{var r=a(4312);e.exports=function(e,t){var a=20;void 0!==t&&"string"==typeof t.model&&(r(t.model,"54")||r(t.model,"23"))&&(a=40);return e<1?Math.round(e*a)/a:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},7128:(e,t,a)=>{var r=a(7188).Symbol;e.exports=r},2040:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length,o=Array(r);++a<r;)o[a]=t(e[a],a,e);return o}},3256:e=>{e.exports=function(e,t,a){return e==e&&(void 0!==a&&(e=e<=a?e:a),void 0!==t&&(e=e>=t?e:t)),e}},6944:(e,t,a)=>{var r=a(7128),o=a(5664),n=a(3168),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},6524:(e,t,a)=>{var r=a(7128),o=a(2040),n=a(2488),i=a(7712),s=r?r.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(n(t))return o(t,e)+"";if(i(t))return l?l.call(t):"";var a=t+"";return"0"==a&&1/t==-Infinity?"-0":a}},4428:(e,t,a)=>{var r=a(5608),o=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(o,""):e}},4848:(e,t,a)=>{var r="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=r},5664:(e,t,a)=>{var r=a(7128),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=n.call(e,s),a=e[s];try{e[s]=void 0;var r=!0}catch(e){}var o=i.call(e);return r&&(t?e[s]=a:delete e[s]),o}},3168:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},7188:(e,t,a)=>{var r=a(4848),o="object"==typeof self&&self&&self.Object===Object&&self,n=r||o||Function("return this")();e.exports=n},5608:e=>{var t=/\s/;e.exports=function(e){for(var a=e.length;a--&&t.test(e.charAt(a)););return a}},4312:(e,t,a)=>{var r=a(3256),o=a(6524),n=a(4400),i=a(1972);e.exports=function(e,t,a){e=i(e),t=o(t);var s=e.length,l=a=void 0===a?s:r(n(a),0,s);return(a-=t.length)>=0&&e.slice(a,l)==t}},2488:e=>{var t=Array.isArray;e.exports=t},8940:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},2892:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},7712:(e,t,a)=>{var r=a(6944),o=a(2892);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},7556:(e,t,a)=>{var r=a(8472),o=1/0;e.exports=function(e){return e?(e=r(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},4400:(e,t,a)=>{var r=a(7556);e.exports=function(e){var t=r(e),a=t%1;return t==t?a?t-a:t:0}},8472:(e,t,a)=>{var r=a(4428),o=a(8940),n=a(7712),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var a=s.test(e);return a||l.test(e)?u(e.slice(2),a?2:8):i.test(e)?NaN:+e}},1972:(e,t,a)=>{var r=a(6524);e.exports=function(e){return null==e?"":r(e)}}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var r=a(9636);freeaps_determineBasal=r})();