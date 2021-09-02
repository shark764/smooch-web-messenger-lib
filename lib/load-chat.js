
const cxengageWebScript =
  document.querySelector("script[src='https://us-east-1-prod-webchat.cxengage.net/load-chat.js']") ||
  document.querySelector("script[src='https://eu-west-1-prod-webchat.cxengage.net/load-chat.js']") ||
  document.querySelector("script[src='https://staging-webchat.cxengagelabs.net/load-chat.js']") ||
  document.querySelector("script[src='https://qe-webchat.cxengagelabs.net/load-chat.js']") ||
  document.querySelector("script[src='https://dev-webchat.cxengagelabs.net/load-chat.js']");

let cxengageWebIntegrationId, cxengageWebAppId, cxengageRegion, cxengageProactiveChatMessage, cxengagePrechatCaptureGreetingText, cxengagePrechatCaptureConfirmationText;

if (cxengageWebScript) {
  cxengageWebIntegrationId = cxengageWebScript.getAttribute("data-cxengage-web-integration-id");
  cxengageWebAppId = cxengageWebScript.getAttribute("data-cxengage-web-app-id");
  cxengageRegion = cxengageWebScript.getAttribute("data-cxengage-region");
  cxengageProactiveChatMessage = cxengageWebScript.getAttribute("data-cxengage-proactive-chat-message");
  cxengageProactiveChatTimer = cxengageWebScript.getAttribute("data-cxengage-proactive-chat-timer");
  cxengagePrechatCaptureGreetingText = cxengageWebScript.getAttribute("data-cxengage-prechat-capture-greeting-text");
  cxengagePrechatCaptureConfirmationText = cxengageWebScript.getAttribute("data-cxengage-prechat-capture-confirmation-text");
  if (!cxengageWebIntegrationId && !cxengageWebAppId) {
    throw new Error('Neither web-integration-id nor web-app-id not passed into script as data attribute. data-cxengage-web-integration-id: ' + cxengageWebIntegrationId +  ', data-cxengage-web-app-id: ' + cxengageWebAppId);
  }
} else {
  console.warn('Script not found. Assuming it was loaded in a testing environment expecting URL params. Going to try and use integrationId or appId (and other optional settings) from URL query params.');
  const cxengageUrlParams = new URLSearchParams(window.location.search);
  cxengageWebIntegrationId = cxengageUrlParams.get('integrationId');
  cxengageWebAppId = cxengageUrlParams.get('appId');
  cxengageRegion = cxengageUrlParams.get('region');
  cxengageProactiveChatMessage = cxengageUrlParams.get('proactiveChatMessage');
  cxengageProactiveChatTimer = cxengageUrlParams.get('proactiveChatTimer');
  if (!cxengageWebIntegrationId && !cxengageWebAppId) {
    throw new Error('Neither integrationId nor appId passed in as URL parameters. integrationId: ' + cxengageWebIntegrationId +  ', appId: ' + cxengageWebAppId);
  }
  if (!cxengageWebIntegrationId) {
    console.error('Passing in the app id to initialize the chat has been deprecated. Please pass in the integration id to use the latest supported version of web chat.');
  }
}

let cxengageWebMessengerConfig;
if (cxengageProactiveChatMessage) {
  fetch(
    cxengageWebIntegrationId
      ? `https://${cxengageWebIntegrationId}.config.${cxengageRegion ? (cxengageRegion + '.') : ''}smooch.io/sdk/v2/integrations/${cxengageWebIntegrationId}/config`
      : `https://${cxengageWebAppId}.config.${cxengageRegion ? (cxengageRegion + '.') : ''}smooch.io/sdk/apps/${cxengageWebAppId}/config`,
    {
      headers: {
        'x-smooch-sdk': 'web/serenovawebchat'
      }
    }
  )
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

if (cxengageWebIntegrationId) {
  !function(o,i,s,c){
    var a,p,h,u=[],l=[];function e(){var t="You must provide a supported major version.";try{if(!c)throw new Error(t);var e,n="https://sdk.cxengage.net/webchat/2.2.1/",r="serenovawebchat";if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var o=i.getElementsByTagName("script")[0],s=i.createElement("script");s.async=!0;var a=c.match(/([0-9]+)\.?([0-9]+)?\.?([0-9]+)?/),p=a&&a[1];if(a&&a[3])s.src=n+r+"."+c+".min.js";else{if(!(1<=p&&e["v"+p]))throw new Error(t);s.src=e["v"+p]}o.parentNode.insertBefore(s,o)}}catch(e){e.message===t&&console.error(e)}}o[s]={init:function(){a=arguments;var t={then:function(e){return l.push({type:"t",next:e}),t},catch:function(e){return l.push({type:"c",next:e}),t}};return t},on:function(){u.push(arguments)},render:function(){p=arguments},destroy:function(){h=arguments}},o.__onWebMessengerHostReady__=function(e){if(delete o.__onWebMessengerHostReady__,o[s]=e,a)for(var t=e.init.apply(e,a),n=0;n<l.length;n++){var r=l[n];t="t"===r.type?t.then(r.next):t.catch(r.next)}p&&e.render.apply(e,p),h&&e.destroy.apply(e,h);for(n=0;n<u.length;n++)e.on.apply(e,u[n])};var t=new XMLHttpRequest;t.addEventListener("load",e),t.open("GET","https://sdk.cxengage.net/webchat/2.2.3/loader.json",!0),t.responseType="json",t.send()
  }(window,document,"SerenovaWebChat","2");
} else {
  !function(s,r,o){
    var p,a,i,c=[],u=[];function e(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var n=r.getElementsByTagName("script")[0],t=r.createElement("script");t.async=!0,t.src=e.url,n.parentNode.insertBefore(t,n)}}catch(e){}}s[o]={init:function(){p=arguments;var n={then:function(e){return u.push({type:"t",next:e}),n},catch:function(e){return u.push({type:"c",next:e}),n}};return n},on:function(){c.push(arguments)},render:function(){a=arguments},destroy:function(){i=arguments}},s.__onWebMessengerHostReady__=function(e){if(delete s.__onWebMessengerHostReady__,s[o]=e,p)for(var n=e.init.apply(e,p),t=0;t<u.length;t++){var r=u[t];n="t"===r.type?n.then(r.next):n.catch(r.next)}a&&e.render.apply(e,a),i&&e.destroy.apply(e,i);for(t=0;t<c.length;t++)e.on.apply(e,c[t])};var n=new XMLHttpRequest;n.addEventListener("load",e),n.open("GET","https://sdk.cxengage.net/webchat/1.0.9/loader.json",!0),n.responseType="json",n.send()
  }(window,document,"SerenovaWebChat");
}
