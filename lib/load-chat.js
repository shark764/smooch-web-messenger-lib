// Version: 0.1.1

// TODO replace with actual URL when we have it
var cxengageWebIntegrationScript = document.querySelector("script[src='http://webchat.cxengage.net/load-chat.js']");
if (cxengageWebIntegrationScript) {
  var cxengageWebIntegrationId = cxengageWebIntegrationScript.getAttribute("data-cxengage-web-integration-id");
  var cxengageTenantId = cxengageWebIntegrationScript.getAttribute("data-cxengage-tenant-id");
  var cxengageRegion = cxengageWebIntegrationScript.getAttribute("data-cxengage-region");
  if (!cxengageWebIntegrationId || !cxengageTenantId) {
    throw new Error('One or both of web-integration-id and tenant-id not passed into script as data attributes. web-integration-id: ' + cxengageWebIntegrationId + ', tenant-id: ' + cxengageTenantId);
  }
} else {
  console.warn('Production script not found. Going to try and use appId and tenantId (and optionally region) from URL query params.');
  var cxengageUrlParams = new URLSearchParams(window.location.search);
  var cxengageWebIntegrationId = cxengageUrlParams.get('integrationId');
  var cxengageTenantId = cxengageUrlParams.get('tenantId');
  var cxengageRegion = cxengageUrlParams.get('region');
  if (!cxengageWebIntegrationId || !cxengageTenantId) {
    throw new Error('One or both of integrationId and tenantId not passed in as URL params. integrationId: ' + cxengageWebIntegrationId + ', tenantId: ' + cxengageTenantId);
  }
}

!function(e,n,t,r){
  function o(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o),u.open("GET","https://"+r+".webloader.smooch.io/",!0),u.responseType="json",u.send()
}(window,document,"Smooch",cxengageWebIntegrationId);
