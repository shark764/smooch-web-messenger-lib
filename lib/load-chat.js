// Version: 2.1.0

const cxengageWebScript =
  document.querySelector("script[src='https://us-east-1-prod-webchat.cxengage.net/load-chat.js']") ||
  document.querySelector("script[src='https://eu-west-1-prod-webchat.cxengage.net/load-chat.js']") ||
  document.querySelector("script[src='https://staging-webchat.cxengagelabs.net/load-chat.js']") ||
  document.querySelector("script[src='https://qe-webchat.cxengagelabs.net/load-chat.js']") ||
  document.querySelector("script[src='https://dev-webchat.cxengagelabs.net/load-chat.js']");

let cxengageWebAppId, cxengageTenantId, cxengageRegion, cxengageProactiveChatMessage, cxengagePrechatCaptureGreetingText, cxengagePrechatCaptureConfirmationText;

if (cxengageWebScript) {
  cxengageWebAppId = cxengageWebScript.getAttribute("data-cxengage-web-app-id");
  cxengageTenantId = cxengageWebScript.getAttribute("data-cxengage-tenant-id");
  cxengageRegion = cxengageWebScript.getAttribute("data-cxengage-region");
  cxengageProactiveChatMessage = cxengageWebScript.getAttribute("data-cxengage-proactive-chat-message");
  cxengageProactiveChatTimer = cxengageWebScript.getAttribute("data-cxengage-proactive-chat-timer");
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
  cxengageProactiveChatMessage = cxengageUrlParams.get('proactiveChatMessage');
  cxengageProactiveChatTimer = cxengageUrlParams.get('proactiveChatTimer');
  cxengagePrechatCaptureGreetingText = cxengageUrlParams.get('prechatCaptureGreetingText');
  cxengagePrechatCaptureConfirmationText = cxengageUrlParams.get('prechatCaptureConfirmationText');
  if (!cxengageWebAppId || !cxengageTenantId) {
    throw new Error('One or both of appId and tenantId not passed in as URL params. appId: ' + cxengageWebAppId + ', tenantId: ' + cxengageTenantId);
  }
}

let cxengageWebMessengerConfig;
if (cxengageProactiveChatMessage) {
  fetch(`https://${cxengageWebAppId}.config.${cxengageRegion ? (cxengageRegion + '.') : ''}smooch.io/sdk/apps/${cxengageWebAppId}/config`, {
    headers: {
      'x-smooch-sdk': 'web/serenovawebchat'
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to load chat config');
    }
  })
  .then((data) => {
    cxengageWebMessengerConfig = data;
  })
  .catch((error) => {
    console.error('Failed to load chat config', error);
  });
}

!function(s,r,o){
  var p,a,i,c=[],u=[];function e(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var n=r.getElementsByTagName("script")[0],t=r.createElement("script");t.async=!0,t.src=e.url,n.parentNode.insertBefore(t,n)}}catch(e){}}s[o]={init:function(){p=arguments;var n={then:function(e){return u.push({type:"t",next:e}),n},catch:function(e){return u.push({type:"c",next:e}),n}};return n},on:function(){c.push(arguments)},render:function(){a=arguments},destroy:function(){i=arguments}},s.__onWebMessengerHostReady__=function(e){if(delete s.__onWebMessengerHostReady__,s[o]=e,p)for(var n=e.init.apply(e,p),t=0;t<u.length;t++){var r=u[t];n="t"===r.type?n.then(r.next):n.catch(r.next)}a&&e.render.apply(e,a),i&&e.destroy.apply(e,i);for(t=0;t<c.length;t++)e.on.apply(e,c[t])};var n=new XMLHttpRequest;n.addEventListener("load",e),n.open("GET","https://sdk.cxengage.net/webchat/1.0.0/loader.json",!0),n.responseType="json",n.send()
}(window,document,"SerenovaWebChat");
