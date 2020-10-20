// Version: 2.1.3

const showCxengageMessengerProactive = async () => {
  if (!cxengageProactiveChatMessage) {
    console.warn('showCxengageMessengerProactive() called but cxengageProactiveChatMessage is not defined');
    return;
  }
  const proactive = document.getElementById('cxengage-web-messenger-proactive');
  if (proactive) {
    proactive.style.display = 'block';
  } else {
    while (document.getElementById('web-messenger-container') === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }

    const cxengageProactiveChatColor = cxengageWebMessengerConfig ? cxengageWebMessengerConfig.config.style.brandColor : '65758e';
    let cxengageProactiveChatBottom;
    if (cxengageWebMessengerConfig) {
      if (cxengageWebMessengerConfig.config.style.displayStyle === 'tab') {
        cxengageProactiveChatBottom = 50;
      } else if (cxengageWebMessengerConfig.config.style.buttonHeight) {
        cxengageProactiveChatBottom = +cxengageWebMessengerConfig.config.style.buttonHeight + 50;
      } else {
        cxengageProactiveChatBottom = 108;
      }
    } else {
      cxengageProactiveChatBottom = 108;
    }

    document
      .getElementById('web-messenger-container')
      .insertAdjacentHTML(
        'beforebegin',
        `<style>
            @keyframes cxengage-web-fadein {
              from {
                  opacity:0;
              }
              to {
                  opacity:1;
              }
            }
        </style>
        <div id="cxengage-web-messenger-proactive" style="animation: cxengage-web-fadein 0.7s;">
          <div style="
              width: 0px;
              height: 0px;
              position: fixed;
              border-left: 10px solid transparent;
              border-right: 10px solid #${cxengageProactiveChatColor};
              border-top: 10px solid #${cxengageProactiveChatColor};
              border-bottom: 10px solid transparent;
              right: 46px;
              bottom: ${cxengageProactiveChatBottom}px;"
          ></div>
          <div
            onclick="SerenovaWebChat.open()"
            style="
              font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
              color: white;
              background-color: #${cxengageProactiveChatColor};
              cursor:pointer;
              right: 26px;
              bottom: ${+cxengageProactiveChatBottom + +13}px;
              padding: 20px;
              text-align: center;
              border-radius: 15px;
              margin-bottom: -1px;
              max-width: 350px;
              position: fixed;
              -webkit-font-smoothing: antialiased;">
            ${cxengageProactiveChatMessage}
          </div>
        </div`
      );
  }
};

const hideCxengageMessengerProactive = () => {
  const proactive = document.getElementById('cxengage-web-messenger-proactive');
  if (proactive) {
    proactive.style.display = 'none';
  }
};

if (cxengageWebAppId && cxengageTenantId) {
  const cxengageWebMessengerOptions = {
    appId: cxengageWebAppId,
    menuItems: {
      imageUpload: true,
      fileUpload: true,
      shareLocation: false,
    },
    delegate: {
      beforeDisplay: function(message) {
        if (message.role === 'appMaker' && message.metadata) {
          if (message.metadata.type === 'agent' && message.metadata.firstName) {
            message.name = message.metadata.firstName;
          } else if (message.metadata.from) {
            message.name = message.metadata.from;
          }
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

  SerenovaWebChat.init(cxengageWebMessengerOptions).then(function() {
    SerenovaWebChat.updateUser({
      properties: {
        tenantId: cxengageTenantId
      }
    });
    if (cxengageProactiveChatTimer) {
      if (!cxengageProactiveChatMessage) {
        console.warn('tried to set cxengageProactiveChatTimer called but cxengageProactiveChatMessage is not defined');
        return;
      }
      setTimeout(() => {
        showCxengageMessengerProactive();
      }, cxengageProactiveChatTimer * 1000);
    }
  });
  if (cxengageProactiveChatMessage) {
    SerenovaWebChat.on('widget:opened', function () {
      hideCxengageMessengerProactive();
    });
  }
} else {
  console.error('Unable to init chat without both app id and tenant id.');
}
