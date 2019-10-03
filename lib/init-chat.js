// Version: 0.1.0

if (cxengageWebIntegrationId && cxengageTenantId) {

  var cxengageWebMessengerOptions = {
    appId: cxengageWebIntegrationId,
    delegate: {
      beforeDisplay(message) {
        if (message.role === 'appMaker' && message.metadata && message.metadata.from) {
          message.name = message.metadata.from;
        }
        return message;
      }
    },
    browserStorage: 'sessionStorage'
  };

  if (cxengageRegion) {
    cxengageWebMessengerOptions.region = cxengageRegion;
  }

  Smooch.init(cxengageWebMessengerOptions).then(() => {
    Smooch.updateUser({
      properties: {
        tenantId: cxengageTenantId
      }
    });
  });

} else {
  console.error('Unable to init chat without both integration id and tenant id.');
}
