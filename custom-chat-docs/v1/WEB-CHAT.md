# SerenovaWebChat Web Messenger

The SerenovaWebChat Web Messenger will add live web messaging to your website or web app.

## Usage

### Script Tag

Add the following code towards the end of the `head` section on your page and replace `<integration-id>` with your integration id at the end of the script.

```html
<script>
    !function(s,r,o){var p,a,i,c=[],u=[];function e(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var n=r.getElementsByTagName("script")[0],t=r.createElement("script");t.async=!0,t.src=e.url,n.parentNode.insertBefore(t,n)}}catch(e){}}s[o]={init:function(){p=arguments;var n={then:function(e){return u.push({type:"t",next:e}),n},catch:function(e){return u.push({type:"c",next:e}),n}};return n},on:function(){c.push(arguments)},render:function(){a=arguments},destroy:function(){i=arguments}},s.__onWebMessengerHostReady__=function(e){if(delete s.__onWebMessengerHostReady__,s[o]=e,p)for(var n=e.init.apply(e,p),t=0;t<u.length;t++){var r=u[t];n="t"===r.type?n.then(r.next):n.catch(r.next)}a&&e.render.apply(e,a),i&&e.destroy.apply(e,i);for(t=0;t<c.length;t++)e.on.apply(e,c[t])};var n=new XMLHttpRequest;n.addEventListener("load",e),n.open("GET","https://sdk.cxengage.net/webchat/1.0.0/loader.json",!0),n.responseType="json",n.send()}(window,document,"SerenovaWebChat");
</script>
```

then initialize the Web Messenger by placing this snippet towards the end of the `body` section of your page.

```html
<script>
    SerenovaWebChat.init({integrationId: '<integration-id>'}).then(function() {
        // Your code after init is complete
    });
</script>
```

## Browser support

Web Messenger supports all popular browsers.

#### Desktop versions

-   Chrome: Latest and one major version behind
-   Edge: Latest and one major version behind
-   Firefox: Latest and one major version behind
-   Internet Explorer: 11+
-   Safari: Latest and one major version behind

#### Mobile versions

-   Stock browser on Android 4.1+
-   Safari on iOS 8+

#### Other browsers

Web Messenger is likely compatible with other and older browsers but it is only tested against the versions above.

## API

### Individual functions

#### init(options)

Initializes the SerenovaWebChat widget in the web page using the specified options. It returns a promise that will resolve when the Web Messenger is ready. Note that except `on` and `off`, all methods needs to be called after a successful `init`.

##### Options

| Option                           | Optional? | Default value                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------- | --------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appId                            | Yes       | -                             | Your app id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| integrationId                    | No        | -                             | Your integration id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| region                           | Yes       | -                             | The target region in which the app is located.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| locale                           | Yes       | `en-US`                       | Locale used for date formatting using the `<language>-<COUNTRY>` format. Language codes can be found [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and country codes [here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). <br /> **Note 1:** The country part is optional, and if a country is either not recognized or supported, it will fallback to using the generic language. If the language isn't supported, it will fallback to `en-US`. <br /> **Note 2:** this is _only_ used for date formatting and doesn't provide built-in translations for Web Messenger. |
| soundNotificationEnabled         | Yes       | `true`                        | Enables the sound notification for new messages                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| fixedIntroPane                   | Yes       | `false`                       | When enabled, the introduction pane will be pinned at the top of the conversation instead of scrolling with it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| embedded                         | Yes       | False                         | Tells the widget it will be embedded. (see Embedded section below)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| displayStyle                     | Yes       | `button`                      | Choose how the messenger will appear on your website. Must be either `button` or `tab`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| buttonIconUrl                    | Yes       | -                             | When the `displayStyle` is `button`, you have the option of selecting your own button icon. The image must be at least 200 x 200 pixels and must be in either JPG, PNG, or GIF format.                                                                                                                                                                                                                                                                                                                                                                                                          |
| buttonWidth                      | Yes       | `58px`                        | When the `displayStyle` is `button`, you have the option of specifying the button width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| buttonHeight                     | Yes       | `58px`                        | When the `displayStyle` is `button`, you have the option of specifying the button height.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| businessName                     | Yes       | -                             | A custom business name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| businessIconUrl                  | Yes       | -                             | A custom business icon url. The image must be at least 200 x 200 pixels and must be in either JPG, PNG, or GIF format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| backgroundImageUrl               | Yes       | -                             | A background image url for the conversation. Image will be tiled to fit the window.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| customColors                     | Yes       | [See below.](#customcolors)   | Colors used in the Web Messenger UI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| customText                       | Yes       | See the example below         | Strings used in the Web Messenger UI. You can use these to either customize the text or translate it. _Note_: Some strings include variables (surrounded by `{}`) which must remain in your customized text.                                                                                                                                                                                                                                                                                                                                                                                    |
| menuItems                        | Yes       | [See below.](#menuitems)      | Choose menu items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| browserStorage                   | Yes       | `localStorage`                | Choose the storage type to use for storing user identity in the browser. Must be either `localStorage` or `sessionStorage`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| delegate                         | Yes       | `undefined`                   | Sets a delegate on the conversation. See the [delegate](#delegate) section for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

##### `region`

SerenovaWebChat is available in the following regions:

| Region         | Region Identifier   |
| -------------- | ------------------- |
| United States  | _Leave unspecified_ |
| European Union | `eu-1`              |

##### `customColors`

| Option            | Optional? | Default value | Description                                                                                                                           |
| ----------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| brandColor        | Yes       | `65758e`      | This color will be used in the messenger header and the button or tab in idle state. Must be a 3 or 6-character hexadecimal color.    |
| conversationColor | Yes       | `0099ff`      | This color will be used for customer messages, quick replies and actions in the footer. Must be a 3 or 6-character hexadecimal color. |
| actionColor       | Yes       | `0099ff`      | This color will be used for call-to-actions inside your messages. Must be a 3 or 6-character hexadecimal color.                       |

##### `customText`

The list of localizable strings. These strings can be modified. _If an option is not given a custom string, the default value will be used._

| Option                                   | Default value                                                                                                                                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| actionPaymentCompleted                   | Payment Completed                                                                                                                                                                                                    |
| actionPaymentError                       | An error occurred while processing the card. `<br>` Please try again or use a different card.                                                                                                                        |
| actionPostbackError                      | An error occurred while processing your action. Please try again.                                                                                                                                                    |
| clickToRetry                             | Message not delivered. Click to retry.                                                                                                                                                                               |
| clickToRetryForm                         | Form not submitted. Click anywhere on the form to retry.                                                                                                                                                             |
| conversationTimestampHeaderFormat        | MMMM D YYYY, h:mm A                                                                                                                                                                                                  |
| couldNotConnect                          | Couldn't connect. You can {retry}.                                                                                                                                                                                   |
| couldNotConnectInner                     | retry connecting now                                                                                                                                                                                                 |
| couldNotConnectWithRetry                 | Couldn't connect. We'll keep retrying, or you can {retry}.                                                                                                                                                           |
| couldNotConnectWithRetryInner            | try now                                                                                                                                                                                                              |
| fetchHistory                             | Load more                                                                                                                                                                                                            |
| fetchingHistory                          | Retrieving history...                                                                                                                                                                                                |
| fileTooLargeError                        | Max file size limit exceeded ({size})                                                                                                                                                                                |
| fileTypeError                            | Unsupported file type.                                                                                                                                                                                               |
| formErrorInvalidEmail                    | Email is invalid                                                                                                                                                                                                     |
| formErrorNoLongerThan                    | Must contain no more than ({characters}) characters                                                                                                                                                                  |
| formErrorNoShorterThan                   | Must contain at least ({characters}) characters                                                                                                                                                                      |
| formErrorUnknown                         | This doesn't look quite right                                                                                                                                                                                        |
| formFieldSelectPlaceholderFallback       | Choose one...                                                                                                                                                                                                        |
| headerText                               | How can we help?                                                                                                                                                                                                     |
| imageClickToReload                       | Click to reload image.                                                                                                                                                                                               |
| imageClickToView                         | Click to view {size} image.                                                                                                                                                                                          |
| imagePreviewNotAvailable                 | Preview not available.                                                                                                                                                                                               |
| inputPlaceholder                         | Type a message...                                                                                                                                                                                                    |
| inputPlaceholderBlocked                  | Complete the form above...                                                                                                                                                                                           |
| introAppText                             | Message us below or from your favorite app.                                                                                                                                                                          |
| introductionText                         | We\'re here to talk, so ask us anything!                                                                                                                                                                             |
| linkError                                | An error occurred when attempting to generate a link for this channel. Please try again.                                                                                                                             |
| messageError                             | An error occured while sending your message. Please try again.                                                                                                                                                       |
| messageIndicatorTitlePlural              | (`{count}`) New messages                                                                                                                                                                                             |
| messageIndicatorTitleSingular            | (`{count}`) New message                                                                                                                                                                                              |
| messageRelativeTimeDay                   | `{value}`d ago                                                                                                                                                                                                       |
| messageRelativeTimeHour                  | `{value}`h ago                                                                                                                                                                                                       |
| messageRelativeTimeJustNow               | Just now                                                                                                                                                                                                             |
| messageRelativeTimeMinute                | `{value}`m ago                                                                                                                                                                                                       |
| messageTimestampFormat                   | h:mm A                                                                                                                                                                                                               |
| messageSending                           | Sending...                                                                                                                                                                                                           |
| messageDelivered                         | Delivered                                                                                                                                                                                                            |
| prechatCaptureGreetingText               | Hi there 👋\nTo start off, we\'d like to know a little bit more about you:                                                                                                                                           |
| prechatCaptureNameLabel                  | Your name                                                                                                                                                                                                            |
| prechatCaptureNamePlaceholder            | Type your name...                                                                                                                                                                                                    |
| prechatCaptureEmailLabel                 | Email                                                                                                                                                                                                                |
| prechatCaptureEmailPlaceholder           | name@company.com                                                                                                                                                                                                     |
| prechatCaptureConfirmationText           | Thanks for that! What can we help you with?                                                                                                                                                                          |
| prechatCaptureMailgunLinkingConfirmation | You\'ll be notified here and by email at {email} once we reply.                                                                                                                                                      |
| sendButtonText                           | Send                                                                                                                                                                                                                 |
| settingsHeaderText                       | Settings                                                                                                                                                                                                             |
| tapToRetry                               | Message not delivered. Tap to retry.                                                                                                                                                                                 |
| tapToRetryForm                           | Form not submitted. Tap anywhere on the form to retry.                                                                                                                                                               |
| uploadDocument                           | Upload document                                                                                                                                                                                                      |
| uploadInvalidError                       | Invalid file                                                                                                                                                                                                         |
| uploadPhoto                              | Upload photo                                                                                                                                                                                                         |
| uploadVirusError                         | A virus was detected in your file and it has been rejected                                                                                                                                                           |
| unsupportedMessageType                   | Unsupported message type.                                                                                                                                                                                            |
| unsupportedActionType                    | Unsupported action type.                                                                                                                                                                                             |

[See below](#example) for an example.

##### `menuItems`

| Option        | Optional? | Default value | Description                           |
| ------------- | --------- | ------------- | ------------------------------------- |
| imageUpload   | Yes       | `true`        | Enables the image upload menu item.   |
| fileUpload    | Yes       | `true`        | Enables the file upload menu item.    |
| shareLocation | Yes       | `true`        | Enables share location menu item.     |

[See below](#example) for an example.

##### Example

```javascript
var initPromise = SerenovaWebChat.init({
    integrationId: '<integration-id>',

    // Leave unspecified for US region (default)
    region: 'eu-1',

    locale: 'en-US',

    customColors: {
        brandColor: '65758e',
        conversationColor: '65758e',
        actionColor: '65758e',
    },

    menuItems: {
        imageUpload: true,
        fileUpload: true,
        shareLocation: true,
    },

    fixedIntroPane: false,

    customText: {
        actionPaymentCompleted: 'Payment Completed',
        actionPaymentError: 'An error occurred while processing the card. <br> Please try again or use a different card.',
        actionPostbackError: 'An error occurred while processing your action. Please try again.',
        clickToRetry: 'Message not delivered. Click to retry.',
        clickToRetryForm: 'Form not submitted. Click anywhere on the form to retry.',
        conversationTimestampHeaderFormat: 'MMMM D YYYY, h:mm A',
        couldNotConnect: 'Couldn\'t connect. You can {retry}. '
        couldNotConnectInner: 'retry connecting now'
        couldNotConnectWithRetry: 'Couldn\'t connect. We\'ll keep retrying, or you can {retry}.',
        couldNotConnectWithRetryInner: 'try now',
        fetchHistory: 'Load more',
        fetchingHistory: 'Retrieving history...',
        fileTooLargeError: 'Max file size limit exceeded ({size})',
        fileTypeError: 'Unsupported file type.',
        formErrorInvalidEmail: 'Email is invalid',
        formErrorNoLongerThan: 'Must contain no more than ({characters}) characters',
        formErrorNoShorterThan: 'Must contain at least ({characters}) characters',
        formErrorUnknown: 'This doesn\'t look quite right',
        formFieldSelectPlaceholderFallback: 'Choose one...',
        frontendEmailChannelDescription: 'To talk to us using email just send a message to our email address and we\'ll reply shortly:',
        headerText: 'How can we help?',
        imageClickToReload: 'Click to reload image.',
        imageClickToView: 'Click to view {size} image.',
        imagePreviewNotAvailable: 'Preview not available.',
        inputPlaceholder: 'Type a message...',
        inputPlaceholderBlocked: 'Complete the form above...',
        introAppText: 'Message us below or from your favorite app.',
        introductionText: 'We\'re here to talk, so ask us anything!',
        linkError: 'An error occurred when attempting to generate a link for this channel. Please try again.',
        messageError: 'An error occured while sending your message. Please try again.',
        messageIndicatorTitlePlural: '({count}) New messages',
        messageIndicatorTitleSingular: '({count}) New message',
        messageRelativeTimeDay: '{value}d ago',
        messageRelativeTimeHour: '{value}h ago',
        messageRelativeTimeJustNow: 'Just now',
        messageRelativeTimeMinute: '{value}m ago',
        messageTimestampFormat: 'h:mm A',
        messageSending: 'Sending...',
        messageDelivered: 'Delivered',
        prechatCaptureGreetingText: 'Hi there 👋\nTo start off, we\'d like to know a little bit more about you:',
        prechatCaptureNameLabel: 'Your name',
        prechatCaptureNamePlaceholder: 'Type your name...',
        prechatCaptureEmailLabel: 'Email',
        prechatCaptureEmailPlaceholder: 'name@company.com',
        prechatCaptureConfirmationText: 'Thanks for that! What can we help you with?',
        sendButtonText: 'Send',
        settingsHeaderText: 'Settings',
        tapToRetry: 'Message not delivered. Tap to retry.',
        tapToRetryForm: 'Form not submitted. Tap anywhere on the form to retry.',
        uploadDocument: 'Upload document',
        uploadInvalidError: 'Invalid file',
        uploadPhoto: 'Upload photo',
        uploadVirusError: 'A virus was detected in your file and it has been rejected',
        unsupportedMessageType: 'Unsupported message type.',
        unsupportedActionType: 'Unsupported action type.'
    }
}).then(function() {
    // Your code after init is complete
});

initPromise.then(function() {
    // do something
});

// pass it around...

initPromise.then(function() {
    // do something else
});

```

#### open()

Opens the conversation widget (noop when embedded)

```javascript
SerenovaWebChat.open();
```

#### close()

Closes the conversation widget (noop when embedded)

```javascript
SerenovaWebChat.close();
```

#### isOpened()

Tells if the widget is currently opened or closed.

```javascript
SerenovaWebChat.isOpened();
```

#### destroy()

Destroys the Web Messenger and makes it disappear. The Web Messenger has to be reinitialized with `init` to be working again because it also clears up the integration id from the Web Messenger. It will also unbind all listeners you might have with `SerenovaWebChat.on`.

```javascript
SerenovaWebChat.destroy();
```

#### sendMessage(message)

Sends a message on the user's behalf

```javascript
SerenovaWebChat.sendMessage({
    type: 'text',
    text: 'hello'
});

// OR

SerenovaWebChat.sendMessage('hello', '<conversation-id>');

// OR

SerenovaWebChat.sendMessage(
    {
        type: 'formResponse',
        fields: [
            {
                label: message.text,
                name: 'collect-message',
                type: 'text',
                text: value,
            }
        ],
        quotedMessageId: message._id,
    },
    '<conversation-id>'
);
```

#### startTyping()

Sends an event indicating the appUser has started typing. When called, a `stopTyping` timer will be created and will call `stopTyping()` after 10s, unless `stopTyping()` has been called manually. Everytime `startTyping()` is called the timer is reset. If `startTyping()` is called repeatedly, an event will only be sent if the time since the last sent event is greater then 10s.

If **conversationId** is not provided, the currently loaded conversation will be used.

```javascript
SerenovaWebChat.startTyping();
```

#### stopTyping()

Sends an event indicating the appUser has stoped typing.

```javascript
SerenovaWebChat.stopTyping();
```
#### updateUser(user)

Updates the current user's information. Set `givenName` and `metadata.customer` before an interaction is created to update the customer's name and have it used as the name/contact-point in flow. Add any additional properties to `metadata` to have them included on `customerMetadata.webClientProperties` on the interaction in flow.

```javascript
SerenovaWebChat.updateUser({
    givenName: 'Manually set name', // Set before interaction is created to use as name/contact-point in flow
    metadata: {
        customer: 'Manually set name', // Set before interaction is created to use as name/contact-point in flow
        customDataForFlow: 'example-data' // Set any other data here before interaction be accessable in flow
    },
});
```

#### getUser()

Returns the current user.

```javascript
var user = SerenovaWebChat.getUser()
```

#### getConversation()

Returns the conversation if it exists

```javascript
var conversation = SerenovaWebChat.getConversation();

// Data object
conversation = {
    _id: '<conversation-id>',
    unreadCount: 0,
    lastUpdatedAt: 1581010017.596,
    type: "personal",
    participants: [
        {
            _id: '<participant-id>',
            appUserId: '<appUser-id>',
            unreadCount: 0,
            lastRead: 1581010017.596
        }
    ],
    metadata: {},
    messages: [
        {
            role: 'appUser',
            authorId: '6ac41c8b32e704f3cdb9052d',
            name: 'Some user',
            _id: '5e6022c9cb55158bfd53f845',
            type: "text",
            received: 1583358665.139,
            text: 'Hello',
            source: {
                type: 'web',
                id: 'c38ae913af7c4ef3800b339ee529c579',
                integrationId: '5d8274d4aa780a5483f0ee56'
            }
        }
    ]
}
```

#### loadConversation(conversationId)

Loads a conversation into the current session

```javascript
SerenovaWebChat.loadConversation('<conversation-id>');
```

#### startConversation()

Creates a user and conversation on the server, allowing the business to reach out proactively to the user via the public API.

It is strongly recommended to only call this method in the case where a message is likely to be sent.

This method is called automatically when starting a conversation via the `sendMessage` method, or when a user sends a message via the conversation view.

If a conversation already exists for the current user, this call is a no-op.

```javascript
SerenovaWebChat.startConversation();
```

#### markAllAsRead()

Marks all unread messages as read.

```javascript
SerenovaWebChat.markAllAsRead();
```

#### setPredefinedMessage(message)

Prefills the user's chat input with a predefined message.

```javascript
SerenovaWebChat.setPredefinedMessage(message);
```

#### setDelegate(delegate)

Sets a delegate on the conversation. SerenovaWebChat must be initialized before calling this method. See the [delegate](#delegate) section for more details.

```javascript
SerenovaWebChat.setDelegate(delegate);
```

### Delegate

SerenovaWebChat allows you to set a delegate to receive callbacks when important changes happen in the conversation.
To set a delegate, pass the `delegate` parameter in to [init options](#options), or use the [setDelegate](#setdelegatedelegate) method. The `delegate` object may optionally contain `beforeDisplay`, `beforeSend`, and `beforePostbackSend` delegate functions.

A `data` object is passed down with all the delegate events. This is a read-only object containing a truncated version of the conversation associated with the event.

`beforeSend` delegate will apply to the `formResponse` message sent when a prechat capture form is completed.

```javascript
const delegate = {
    beforeDisplay(message, data) {
        if (data.conversation._id === '<my-conversation-id>') {
            message.name = 'Acme Blank';
        }

        return message;
    },
    beforeSend(message, data) {
        return message;
    },
    beforePostbackSend(postback, data) {
        return postback;
    }
}

// Passing delegate as an init parameter
SerenovaWebChat.init({
    integrationId: '<integration-id>',
    delegate
});

// Using setDelegate
SerenovaWebChat.init({ integrationId: '<integration-id>' }).then(() => {
    SerenovaWebChat.setDelegate(delegate);
});
```

#### beforeDisplay

The `beforeDisplay` delegate allows a message to be hidden or modified before it is displayed in the conversation. This delegate should return a falsy value such as `null` to hide the message. It can also return a modified message object in order to change what the user will see rendered in their conversation history. Note that this change affects the client side rendering only; the server side copy of this message can not be modified by this delegate.

```javascript
SerenovaWebChat.init({
    integrationId: '<integration-id>',
    delegate: {
        beforeDisplay(message, data) {
            if (data.conversation._id === '<conversation-id>' && message.metadata && message.metadata.isHidden) {
                return null;
            }

            return message;
        }
    }
});
```

#### beforeSend

The `beforeSend` delegate method allows you to modify properties of a message before sending it to SerenovaWebChat.
The modified message must be returned for it to take effect.

Note that when a file or an image is uploaded, only the message `metadata` may be updated. Other message properties such as `type` or `text` won't be considered.

```javascript
SerenovaWebChat.init({
    integrationId: '<integration-id>'
    delegate: {
        beforeSend(message, data) {
            if (data.conversation._id === '<conversation-id>') {
                message.metadata = {
                    any: 'info'
                };
            }

            return message;
        }
    }
});
```

#### beforePostbackSend

The `beforePostbackSend` delegate method allows you to modify properties of a postback before sending it to SerenovaWebChat.
The modified postback must be returned for it to take effect.

```javascript
SerenovaWebChat.init({
   integrationId: '<integration-id>',
   delegate: {
       beforePostbackSend(postback) {
           if (data.conversation._id === '<conversation-id>') {
               postback.metadata = {
                   any: 'info'
               };
           }

           return postback;
       }
   }
});
```

### Events

If you want to make sure your events are triggered, try to bind them before calling `SerenovaWebChat.init`.

To bind an event, use `SerenovaWebChat.on(<event name>, <handler>);`. To unbind events, you can either call `SerenovaWebChat.off(<event name>, handler)` to remove one specific handler, call `SerenovaWebChat.off(<event name>)` to remove all handlers for an event, or call `SerenovaWebChat.off()` to unbind all handlers.

#### ready

```javascript
// This event triggers when init completes successfully... Be sure to bind before calling init!
SerenovaWebChat.on('ready', function(){
    console.log('the init has completed!');
});

SerenovaWebChat.init(...).then(function() {
    // Your code after init is complete
});
```

#### destroy

```javascript
// This event triggers when the widget is destroyed.
SerenovaWebChat.on('destroy', function(){
    console.log('the widget is destroyed!');
});

SerenovaWebChat.destroy();
```

#### participant:added

```javascript
// This event triggers when a participant is added to a conversation
SerenovaWebChat.on('participant:added', function(participant, data) {
    console.log(`A participant was added to conversation ${data.conversation._id}: `, participant);
});
```

#### participant:removed

```javascript
// This event triggers when a participant is removed from a conversation
SerenovaWebChat.on('participant:removed', function(participant, data) {
    console.log(`A participant was removed from conversation ${data.conversation._id}: `, participant);
});
```

#### conversation:added

```javascript
// This event triggers when a conversation is added
SerenovaWebChat.on('conversation:added', function(participants, data) {
    console.log(`Conversation ${data.conversation._id} was added with following participants: `, participants);
});
```

#### conversation:read

```javascript
// This event triggers when a participant in a sdkGroup chat reads a message
SerenovaWebChat.on('conversation:read', function(payload, data) {
    if (data.role === 'appMaker') {
        console.log(`Conversation ${data.conversation._id} was read by appMaker`);
    } else if (data.role === 'appUser') {
        console.log(`Conversation ${data.conversation._id} was read by appUserId: ${payload.appUserId}`);
    }
});

// Data object, if the conversation was read by the appMaker, the appUser property will not exist
payload = {
    appUserId: '<appUser-id>',
    lastRead: 1581010017.596,
    role: 'appUser'
}

data = {
    conversation: {
        _id: '<conversation-id>'
    }
}
```

#### conversation:removed

```javascript
// This event triggers when a conversation is removed
SerenovaWebChat.on('conversation:removed', function(data) {
    console.log(`Conversation ${data.conversation._id} was removed`);
});

// data object
data = {
    conversation: {
        _id: '<conversation-id>'
    }
}
```

#### message:received

```javascript
// This event triggers when the user receives a message
SerenovaWebChat.on('message:received', function(message, data) {
    console.log(`The user received a message in conversation ${data.conversation._id}: `, message);
});

// data object
data = {
    conversation: {
        _id: '<conversation-id>'
    }
}
```

#### message:sent

```javascript
// This event triggers when the user sends a message
SerenovaWebChat.on('message:sent', function(message, data) {
    console.log(`The user sent a message in conversation ${data.conversation._id}: `, message);
});

// data object
data = {
    conversation: {
        _id: '<conversation-id>'
    }
}
```

#### message

```javascript
// This event triggers when a message was added to the conversation
SerenovaWebChat.on('message', function(message, data) {
    console.log(`A message was added in the conversation ${data.conversation._id}: `, message);
});

// data object
data = {
    conversation: {
        _id: '<conversation-id>'
    }
}
```

#### unreadCount

```javascript
// This event triggers when the number of unread messages changes
SerenovaWebChat.on('unreadCount', function(unreadCount, data) {
    console.log(`the number of unread messages was updated for conversation ${data.conversation._id}:`, unreadCount);
});

// data object
data = {
    conversation: {
        _id: '<conversation-id>'
    }
}
```

#### widget:opened

```javascript
// This event triggers when the widget is opened
SerenovaWebChat.on('widget:opened', function() {
    console.log('Widget is opened!');
});
```

#### widget:closed

```javascript
// This event triggers when the widget is closed
SerenovaWebChat.on('widget:closed', function() {
    console.log('Widget is closed!');
});
```

#### connected

```javascript
// This event triggers when an active connection has been established for the first time,
// or when the connection has been re-established after a `disconnect` event.
SerenovaWebChat.on('connected', function(e) {
    console.log('Connected');
});
```

#### disconnected

```javascript
// This event triggers when an active connection is lost
// While disconnected, the client will not be able to recieve messages
SerenovaWebChat.on('disconnected', function(e) {
    console.log('Disonnected');
});
```

#### typing:start

```javascript
// This event triggers when appMaker starts typing. The associated conversation is passed in the argument.
SerenovaWebChat.on('typing:start', function(data) {
    console.log(`${data.name} started typing!`, data.conversation._id);
});

// If the name and avatarUrl for the typing user is known it will be available as properties in the data object

// Data object
data = {
    conversation: {
        _id: '<conversation-id>',
    },
    avatarUrl: 'http://path.com/to/avatar-url-of-user',
    name: 'Name of Typing User',
}
```

#### typing:stop

```javascript
// This event triggers when appMaker stops typing. The associated conversation is passed in the argument.
SerenovaWebChat.on('typing:stop', function(data) {
    console.log(`${data.name} stopped typing!`, data.conversation._id);
});

// data object
data = {
    conversation: {
        _id: '<conversation-id>'
    }
}
```

### Embedded mode

As describe above, to activate the embedded mode, you need to pass `embedded: true` when calling `SerenovaWebChat.init`. By doing so, you are disabling the auto-rendering mechanism and you will need to call `SerenovaWebChat.render` manually. This method accepts a DOM element which will be used as the container where the widget will be rendered.

```javascript
SerenovaWebChat.init({
    integrationId: '<integration-id>',
    embedded: true
});

SerenovaWebChat.render(document.getElementById('chat-container'));
```

The embedded widget will take full width and height of the container. You must give it a height, otherwise, the widget will collapse.

## Content Security Policy

If your deployment requires [CSP compatibility](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), add the following meta tag to your configuration.

```html
<meta
    http-equiv="Content-Security-Policy"
    content="
    connect-src
        wss://*.smooch.io
        https://*.smooch.io;
    font-src
        https://*.smooch.io;
    script-src
        https://*.smooch.io;
    style-src
        https://*.smooch.io;
    img-src
        blob:
        https://*.smooch.io;"
/>
```

Note that an equivalent configuration can be done [server side](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy).

If you require `blob:` to be excluded for `img-src`, you must disable the image upload feature via the [init settings](#initoptions).
