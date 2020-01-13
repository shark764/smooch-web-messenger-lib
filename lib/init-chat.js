// Version: 0.2.1

if (cxengageWebAppId && cxengageTenantId) {

  const cxengageWebMessengerOptions = {
    appId: cxengageWebAppId,
    menuItems: {
      imageUpload: false,
      fileUpload: false,
      shareLocation: false,
    },
    delegate: {
      beforeDisplay: function(message) {
        if (message.role === 'appMaker' && message.metadata && message.metadata.firstName) {
          message.name = message.metadata.firstName;
        }
        return message;
      }
    },
    browserStorage: 'sessionStorage',
    customText: {}
  };

  if (cxengageRegion) {
    cxengageWebMessengerOptions.region = cxengageRegion;
  }

  if (cxengagePrechatCaptureGreetingText !== null) {
    cxengageWebMessengerOptions.customText.prechatCaptureGreetingText = cxengagePrechatCaptureGreetingText;
  }
  if (cxengagePrechatCaptureConfirmationText !== null) {
    cxengageWebMessengerOptions.customText.prechatCaptureConfirmationText = cxengagePrechatCaptureConfirmationText;
  }

  Smooch.init(cxengageWebMessengerOptions).then(function() {
    Smooch.updateUser({
      properties: {
        tenantId: cxengageTenantId
      }
    });
  });

} else {
  console.error('Unable to init chat without both app id and tenant id.');
}
