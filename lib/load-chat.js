// Version: 0.2.2

const cxengageWebScript =
  document.querySelector("script[src='http://us-east-1-prod-webchat.cxengage.net/load-chat.js']") ||
  document.querySelector("script[src='http://eu-west-1-prod-webchat.cxengage.net/load-chat.js']") ||
  document.querySelector("script[src='http://staging-webchat.cxengagelabs.net/load-chat.js']") ||
  document.querySelector("script[src='http://qe-webchat.cxengagelabs.net/load-chat.js']") ||
  document.querySelector("script[src='http://dev-webchat.cxengagelabs.net/load-chat.js']");

let cxengageWebAppId, cxengageTenantId, cxengageRegion, cxengagePrechatCaptureGreetingText, cxengagePrechatCaptureConfirmationText;

if (cxengageWebScript) {
  cxengageWebAppId = cxengageWebScript.getAttribute("data-cxengage-web-app-id");
  cxengageTenantId = cxengageWebScript.getAttribute("data-cxengage-tenant-id");
  cxengageRegion = cxengageWebScript.getAttribute("data-cxengage-region");
  cxengagePrechatCaptureGreetingText = cxengageWebScript.getAttribute("data-cxengage-prechat-capture-greeting-text");
  cxengagePrechatCaptureConfirmationText = cxengageWebScript.getAttribute("data-cxengage-prechat-capture-confirmation-text");
  if (!cxengageWebAppId || !cxengageTenantId) {
    throw new Error('One or both of web-app-id and tenant-id not passed into script as data attributes. data-cxengage-web-app-id: ' + cxengageWebAppId + ', data-cxengage-tenant-id: ' + cxengageTenantId);
  }
} else {
  console.warn('Script not found. Assuming it was loaded in a testing environment expecting URL params. Going to try and use appId and tenantId (and optionally region) from URL query params.');
  const cxengageUrlParams = new URLSearchParams(window.location.search);
  cxengageWebAppId = cxengageUrlParams.get('appId');
  cxengageTenantId = cxengageUrlParams.get('tenantId');
  cxengageRegion = cxengageUrlParams.get('region');
  cxengagePrechatCaptureGreetingText = cxengageUrlParams.get('prechatCaptureGreetingText');
  cxengagePrechatCaptureConfirmationText = cxengageUrlParams.get('prechatCaptureConfirmationText');
  if (!cxengageWebAppId || !cxengageTenantId) {
    throw new Error('One or both of appId and tenantId not passed in as URL params. appId: ' + cxengageWebAppId + ', tenantId: ' + cxengageTenantId);
  }
}

!function(e,n,t,r){
  function o(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o),u.open("GET","https://"+r+".webloader.smooch.io/",!0),u.responseType="json",u.send()
}(window,document,"Smooch",cxengageWebAppId);
