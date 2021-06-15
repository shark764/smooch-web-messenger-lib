# SerenovaWebChat Web Messenger

The SerenovaWebChat Web Messenger will add live web messaging to your website or web app.

## Usage

### **Note:** this document is for version `2`. If you are upgrading from version `1`, please see the upgrading documentation [here](UPGRADING-TO-V2.md).

### Script Tag

Add the following code towards the end of the `head` section on your page.

```html
<script>
    !function(o,i,s,c){var a,p,h,u=[],l=[];function e(){var t="You must provide a supported major version.";try{if(!c)throw new Error(t);var e,n="https://sdk.cxengage.net/webchat/2.2.1/",r="serenovawebchat";if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var o=i.getElementsByTagName("script")[0],s=i.createElement("script");s.async=!0;var a=c.match(/([0-9]+)\.?([0-9]+)?\.?([0-9]+)?/),p=a&&a[1];if(a&&a[3])s.src=n+r+"."+c+".min.js";else{if(!(1<=p&&e["v"+p]))throw new Error(t);s.src=e["v"+p]}o.parentNode.insertBefore(s,o)}}catch(e){e.message===t&&console.error(e)}}o[s]={init:function(){a=arguments;var t={then:function(e){return l.push({type:"t",next:e}),t},catch:function(e){return l.push({type:"c",next:e}),t}};return t},on:function(){u.push(arguments)},render:function(){p=arguments},destroy:function(){h=arguments}},o.__onWebMessengerHostReady__=function(e){if(delete o.__onWebMessengerHostReady__,o[s]=e,a)for(var t=e.init.apply(e,a),n=0;n<l.length;n++){var r=l[n];t="t"===r.type?t.then(r.next):t.catch(r.next)}p&&e.render.apply(e,p),h&&e.destroy.apply(e,h);for(n=0;n<u.length;n++)e.on.apply(e,u[n])};var t=new XMLHttpRequest;t.addEventListener("load",e),t.open("GET","https://sdk.cxengage.net/webchat/2.2.1/loader.json",!0),t.responseType="json",t.send()}(window,document,"SerenovaWebChat","2");
</script>
```

Then initialize the Web Messenger by placing this snippet towards the end of the `body` section of your page, replacing the `<integration-id>` with your integration id (id of the webchat itself, not the app).

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

Web Messenger is likely compatible with other and older browsers but we only test against the versions above.

## API

### Individual functions

#### init(options)

Initializes the SerenovaWebChat widget in the web page using the specified options. It returns a promise that will resolve when the Web Messenger is ready. Note that except`on` and `off`, all methods needs to be called after a successful `init`.

##### Options

| Option                           | Optional? | Default value                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------- | --------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| integrationId                    | No        | -                             | Your integration id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| region                           | Yes       | -                             | The target region in which the app is located.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| locale                           | Yes       | `en-US`                       | Locale used for date formatting using the `<language>-<COUNTRY>` format. Language codes can be found [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and country codes [here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). <br /> **Note 1 : ** The country part is optional, and if a country is either not recognized or supported, it will fallback to using the generic language. If the language isn't supported, it will fallback to `en-US`. <br /> **Note 2:** this is _only_ used for date formatting and doesn't provide built-in translations for Web Messenger. |
| soundNotificationEnabled         | Yes       | `true`                        | Enables the sound notification for new messages                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| imageUploadEnabled               | Yes       | `true`                        | Enables the image upload feature. (deprecated: use menuItems.imageUpload; if this option is `false`, it will disable `menuItems.imageUpload` and `menuItems.fileUpload`)                                                                                                                                                                                                                                                                                                                                                                                                                        |
| fixedHeader                      | Yes       | `false`                       | When enabled, the introduction pane will be pinned at the top of the conversation instead of scrolling with it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
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
| prechatCapture                   | Yes       | [See below.](#prechatcapture) | Enables automatically capturing a user's name and email via a form before the start of a conversation. Disables the chat input until the form has been submitted.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| canUserSeeConversationList       | Yes       | `true`                        | Allows users to view their list of conversations. This feature is not yet supported and should be set to false.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

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

| Option                                     | Default value                                                                                                                                                                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| actionPaymentCompleted                     | Payment Completed                                                                                                                                                                                                    |
| actionPaymentError                         | An error occurred while processing the card. `<br>` Please try again or use a different card.                                                                                                                        |
| actionPostbackError                        | An error occurred while processing your action. Please try again.                                                                                                                                                    |
| clickToRetry                               | Message not delivered. Click to retry.                                                                                                                                                                               |
| clickToRetryForm                           | Form not submitted. Click anywhere on the form to retry.                                                                                                                                                             |
| connectNotificationText                    | Sync your conversation and continue messaging us through your favorite app.                                                                                                                                          |
| connectNotificationSingleText              | Be notified when you get a reply.                                                                                                                                                                                    |
| conversationListHeaderText                 | My conversations                                                                                                                                                                                                     |
| conversationListRelativeTimeJustNow        | Just now                                                                                                                                                                                                             |
| conversationListRelativeTimeMinute         | 1 minute ago                                                                                                                                                                                                         |
| conversationListRelativeTimeMinutes        | {value} minutes ago                                                                                                                                                                                                  |
| conversationListRelativeTimeHour           | 1 hour ago                                                                                                                                                                                                           |
| conversationListRelativeTimeHours          | {value} hours ago                                                                                                                                                                                                    |
| conversationListRelativeTimeYesterday      | Yesterday                                                                                                                                                                                                            |
| conversationListTimestampFormat            | MM/DD/YY                                                                                                                                                                                                             |
| conversationListPreviewAnonymousText       | Someone                                                                                                                                                                                                              |
| conversationListPreviewCarouselText        | {user} sent a message                                                                                                                                                                                                |
| conversationListPreviewFileText            | {user} sent a file                                                                                                                                                                                                   |
| conversationListPreviewFormText            | {user} sent a form                                                                                                                                                                                                   |
| conversationListPreviewFormResponseText    | {user} filled a form                                                                                                                                                                                                 |
| conversationListPreviewImageText           | {user} sent an image                                                                                                                                                                                                 |
| conversationListPreviewUserText            | You                                                                                                                                                                                                                  |
| conversationTimestampHeaderFormat          | MMMM D YYYY, h:mm A                                                                                                                                                                                                  |
| couldNotConnect                            | Offline. You will not receive messages.                                                                                                                                                                              |
| couldNotConnectRetry                       | Reconnecting...                                                                                                                                                                                                      |
| couldNotConnectRetrySuccess                | You're back online!                                                                                                                                                                                                  |
| couldNotLoadConversations                  | Couldn’t load conversations.                                                                                                                                                                                         |
| fetchHistory                               | Load more                                                                                                                                                                                                            |
| fetchingHistory                            | Retrieving history...                                                                                                                                                                                                |
| fileTooLargeError                          | Max file size limit exceeded ({size})                                                                                                                                                                                |
| fileTypeError                              | Unsupported file type.                                                                                                                                                                                               |
| formErrorInvalidEmail                      | Email is invalid                                                                                                                                                                                                     |
| formErrorNoLongerThan                      | Must contain no more than ({characters}) characters                                                                                                                                                                  |
| formErrorNoShorterThan                     | Must contain at least ({characters}) characters                                                                                                                                                                      |
| formErrorUnknown                           | This doesn't look quite right                                                                                                                                                                                        |
| formFieldSelectPlaceholderFallback         | Choose one...                                                                                                                                                                                                        |
| headerText                                 | How can we help?                                                                                                                                                                                                     |
| imageClickToReload                         | Click to reload image.                                                                                                                                                                                               |
| imageClickToView                           | Click to view {size} image.                                                                                                                                                                                          |
| imagePreviewNotAvailable                   | Preview not available.                                                                                                                                                                                               |
| inputPlaceholder                           | Type a message...                                                                                                                                                                                                    |
| inputPlaceholderBlocked                    | Complete the form above...                                                                                                                                                                                           |
| messageError                               | An error occured while sending your message. Please try again.                                                                                                                                                       |
| messageIndicatorTitlePlural                | (`{count}`) New messages                                                                                                                                                                                             |
| messageIndicatorTitleSingular              | (`{count}`) New message                                                                                                                                                                                              |
| messageRelativeTimeDay                     | `{value}`d ago                                                                                                                                                                                                       |
| messageRelativeTimeHour                    | `{value}`h ago                                                                                                                                                                                                       |
| messageRelativeTimeJustNow                 | Just now                                                                                                                                                                                                             |
| messageRelativeTimeMinute                  | `{value}`m ago                                                                                                                                                                                                       |
| messageTimestampFormat                     | h:mm A                                                                                                                                                                                                               |
| messageDelivered                           | Delivered                                                                                                                                                                                                            |
| messageSeen                                | Seen                                                                                                                                                                                                                 |
| messageSending                             | Sending...                                                                                                                                                                                                           |
| messageTooLongError                        | Max message size limit exceeded ({size}).                                                                                                                                                                            |
| newConversationButtonText                  | New Conversation                                                                                                                                                                                                     |
| notificationSettingsConnected              | Connected                                                                                                                                                                                                            |
| notificationSettingsConnectedAs            | Connected as `{username}`                                                                                                                                                                                            |
| prechatCaptureGreetingText                 | Hi there 👋\nTo start off, we\'d like to know a little bit more about you:                                                                                                                                           |
| prechatCaptureNameLabel                    | Your name                                                                                                                                                                                                            |
| prechatCaptureNamePlaceholder              | Type your name...                                                                                                                                                                                                    |
| prechatCaptureEmailLabel                   | Email                                                                                                                                                                                                                |
| prechatCaptureEmailPlaceholder             | name@company.com                                                                                                                                                                                                     |
| prechatCaptureConfirmationText             | Thanks for that! What can we help you with?                                                                                                                                                                          |
| sendButtonText                             | Send                                                                                                                                                                                                                 |
| settingsHeaderText                         | Settings                                                                                                                                                                                                             |
| syncConversation                           | Sync conversation                                                                                                                                                                                                    |
| tapToRetry                                 | Message not delivered. Tap to retry.                                                                                                                                                                                 |
| tapToRetryForm                             | Form not submitted. Tap anywhere on the form to retry.                                                                                                                                                               |
| unsupportedMessageType                     | Unsupported message type.                                                                                                                                                                                            |
| unsupportedActionType                      | Unsupported action type.                                                                                                                                                                                             |
| uploadDocument                             | File                                                                                                                                                                                                                 |
| uploadInvalidError                         | Invalid file                                                                                                                                                                                                         |
| uploadPhoto                                | Image                                                                                                                                                                                                                |
| uploadVirusError                           | A virus was detected in your file and it has been rejected                                                                                                                                                           |

[See below](#example) for an example.

##### `menuItems`

| Option        | Optional? | Default value | Description                           |
| ------------- | --------- | ------------- | ------------------------------------- |
| imageUpload   | Yes       | `true`        | Enables the image upload menu item.   |
| fileUpload    | Yes       | `true`        | Enables the file upload menu item.    |

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
    },

    fixedHeader: false,

    customText: {
        actionPaymentCompleted: 'Payment Completed',
        actionPaymentError: 'An error occurred while processing the card. <br> Please try again or use a different card.',
        actionPostbackError: 'An error occurred while processing your action. Please try again.',
        clickToRetry: 'Message not delivered. Click to retry.',
        clickToRetryForm: 'Form not submitted. Click anywhere on the form to retry.',
        connectNotificationSingleText: 'Be notified when you get a reply.',
        conversationListHeaderText: 'My conversations',
        conversationListPreviewAnonymousText: 'Someone',
        conversationListPreviewCarouselText: '{user} sent a message',
        conversationListPreviewFileText: '{user} sent a file',
        conversationListPreviewFormText: '{user} sent a form',
        conversationListPreviewFormResponseText: '{user} filled a form',
        conversationListPreviewImageText: '{user} sent an image',
        conversationListPreviewLocationRequestText: '{user} sent a location request',
        conversationListPreviewUserText: 'You',
        conversationListRelativeTimeJustNow: 'Just now',
        conversationListRelativeTimeMinute: '1 minute ago',
        conversationListRelativeTimeMinutes: '{value} minutes ago',
        conversationListRelativeTimeHour: '1 hour ago',
        conversationListRelativeTimeHours: '{value} hours ago',
        conversationListRelativeTimeYesterday: 'Yesterday',
        conversationListTimestampFormat: 'MM/DD/YY',
        conversationTimestampHeaderFormat: 'MMMM D YYYY, h:mm A',
        couldNotConnect: 'Offline. You will not receive messages.',
        couldNotConnectRetry: 'Reconnecting...',
        couldNotConnectRetrySuccess: "You're back online!",
        couldNotLoadConversations: 'Couldn’t load conversations.',
        fetchHistory: 'Load more',
        fetchingHistory: 'Retrieving history...',
        fileTooLargeError: 'Max file size limit exceeded ({size})',
        fileTypeError: 'Unsupported file type.',
        formErrorInvalidEmail: 'Email is invalid',
        formErrorNoLongerThan: 'Must contain no more than ({characters}) characters',
        formErrorNoShorterThan: 'Must contain at least ({characters}) characters',
        formErrorUnknown: 'This doesn\'t look quite right',
        formFieldSelectPlaceholderFallback: 'Choose one...',
        headerText: 'How can we help?',
        imageClickToReload: 'Click to reload image.',
        imageClickToView: 'Click to view {size} image.',
        imagePreviewNotAvailable: 'Preview not available.',
        inputPlaceholder: 'Type a message...',
        inputPlaceholderBlocked: 'Complete the form above...',
        messageIndicatorTitlePlural: '({count}) New messages',
        messageIndicatorTitleSingular: '({count}) New message',
        messageRelativeTimeDay: '{value}d ago',
        messageRelativeTimeHour: '{value}h ago',
        messageRelativeTimeJustNow: 'Just now',
        messageRelativeTimeMinute: '{value}m ago',
        messageTimestampFormat: 'h:mm A',
        messageDelivered: 'Delivered',
        messageSeen: 'Seen',
        messageSending: 'Sending...',
        newConversationButtonText: 'New Conversation',
        notificationSettingsConnected: 'Connected',
        notificationSettingsConnectedAs: 'Connected as {username}',
        prechatCaptureGreetingText: 'Hi there 👋\nTo start off, we\'d like to know a little bit more about you:',
        prechatCaptureNameLabel: 'Your name',
        prechatCaptureNamePlaceholder: 'Type your name...',
        prechatCaptureEmailLabel: 'Email',
        prechatCaptureEmailPlaceholder: 'name@company.com',
        prechatCaptureConfirmationText: 'Thanks for that! What can we help you with?',
        sendButtonText: 'Send',
        settingsHeaderText: 'Settings',
        syncConversation: 'Sync conversation',
        tapToRetry: 'Message not delivered. Tap to retry.',
        tapToRetryForm: 'Form not submitted. Tap anywhere on the form to retry.',
        uploadDocument: 'File',
        uploadInvalidError: 'Invalid file',
        uploadPhoto: 'Image',
        uploadVirusError: 'A virus was detected in your file and it has been rejected',
        unsupportedMessageType: 'Unsupported message type.',
        unsupportedActionType: 'Unsupported action type.',
    }
}).then(function() {
    // Your code after init is complete
});

initPromise.then(function() {
    // do something
});

// pass it around...

initPromise.then(function() {
    //do something else
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

#### sendMessage(message, conversationId)

Sends a message to the targeted conversation on the user's behalf.

```javascript
SerenovaWebChat.sendMessage(
    {
        type: 'text',
        text: 'hello'
    },
    '<conversation-id>'
);

// OR

SerenovaWebChat.sendMessage('hello', '<conversation-id>');
```

#### startTyping(conversationId)

Sends an event indicating that the user has started typing.

Typing updates are automatically throttled, so you may call this method as often as necessary. The typing stop event will automatically fire 10 seconds after the most recent call to this method.

If **conversationId** is not provided, the currently loaded conversation will be used.

```javascript
SerenovaWebChat.startTyping('<conversation-id>');
```

#### stopTyping(conversationId)

Sends an event indicating that the user has stopped typing.

If **conversationId** is not provided, the currently loaded conversation will be used.

```javascript
SerenovaWebChat.stopTyping('<conversation-id>');
```

#### updateUser(user)

Updates the current user's information. If no user has been created yet, the Web Messenger will store the information and apply it to the user model when it is created. Set `givenName` and `metadata.customer` before an interaction is created to update the customer's name and have it used as the name/contact-point in flow. Add any additional properties to `metadata` to have them included on `customerMetadata.webClientProperties` on the interaction in flow.

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

// user object payload
user = {
    id: 'e70b153989345b0e178174b1',
    externalId: 'username',
    signedUpAt: '2019-09-26T14:48:58.167Z',
    hasPaymendInfo: false,
    metadata: {},
    surname: 'Surname',
    givenName: 'Given Name',
    email: 'email@domain.com',
    avatarUrl: 'https://pictureurl.com/avatar_icon.png',
};
```

#### getConversationById(conversationId)

Returns a `Promise<object>` whose payload is a conversation if it exists. If **conversationId** is not given, the current loaded conversation will be returned.

```javascript
SerenovaWebChat.getConversationById('62565b5c2b4039adff80b7fd').then((conversation) => {
    console.log(conversation);
});

// or

SerenovaWebChat.getConversationById().then((currentConversation) => {
    console.log(currentConversation);
});

// Data object
conversation = {
    id: '5aa4d7efdb32b10340db0223',
    lastUpdatedAt: 1581010017.596,
    businessLastRead: 1581010017.596,
    description: 'Conversation description',
    displayName: 'Conversation name',
    iconUrl: 'https://pictureurl.com/conversation_icon.png',
    type: 'sdkGroup',
    participants: [
        {
            id: '5f0cb8222c884d031ec05dd9',
            userId: 'e70b153989345b0e178174b1',
            unreadCount: 0,
            lastRead: 1581010017.596,
        },
    ],
    metadata: {},
    messages: [
        {
            role: 'user',
            userId: 'e70b153989345b0e178174b1',
            displayName: 'Some user',
            id: '5e6022c9cb55158bfd53f845',
            type: 'text',
            received: 1583358665.139,
            text: 'Hello',
            source: {
                type: 'web',
                id: 'c38ae913af7c4ef3800b339ee529c579',
                integrationId: '5d8274d4aa780a5483f0ee56',
            },
        },
        {
            role: 'business',
            displayName: 'Business display name',
            id: '5f0cb834bc8ea9e41b2af269',
            type: 'text',
            received: 1594669108.896,
            text: 'Greetings!',
            source: {
                type: 'slack',
            },
        },
    ],
};
```

#### getConversations()

Returns a list of conversations for the current user that were fetched during app initialization as well as the paginated results.

Note:

-   The `messages` property in each conversation may only have the most recent message in the conversation. The full message list will be available either when the conversation was loaded to the view or [SerenovaWebChat.getConversationById](#getconversationbyidconversationid) gets called.
-   In the event that the client reconnects due to a network issue, the list may only contain the `10` most recent conversations for the user. All the additional conversations that were fetched as a result of pagination will be discarded.

See [SerenovaWebChat.getConversationById](#getconversationbyidconversationid) for the definition of a conversation

```javascript
var conversations = SerenovaWebChat.getConversations();
// Your code after receiving the current user's loaded conversations
```

#### getDisplayedConversation()

Returns the conversation being viewed by the user if it exists or `null` if the current user is in the conversations list view.

See [SerenovaWebChat.getConversationById](#getconversationbyidconversationid) for the conversation definition

```javascript
var conversation = SerenovaWebChat.getDisplayedConversation();
```

#### getMoreConversations()

Fetches and returns the next 10 most active conversations of the current user. This call also appends the conversations to the conversation list view.

See [SerenovaWebChat.getConversationById](#getconversationbyidconversationid) for the conversation definition

```javascript
SerenovaWebChat.getMoreConversations().then((nextConversations) => {
    // Your code after receiving the next set of conversations for the user
});
```

#### hasMoreConversations()

Returns a `boolean` indicating whether the user has more conversations that can be fetched for the conversation list view.

```javascript
var hasMore = SerenovaWebChat.hasMoreConversations();

if (hasMore) {
    console.log('More conversations available to fetch...');
} else {
    console.log('There are no more conversations remaining for the user');
}
```

#### loadConversation(conversationId)

Loads a conversation into the current session

```javascript
SerenovaWebChat.loadConversation('<conversation-id>');
```

#### updateConversation(conversationId, options)

Updates the targeted conversation.

```javascript
SerenovaWebChat.updateConversation('<conversation-id>', {
    displayName: 'display name',
    iconUrl: 'https://www.example.png',
    description: 'description',
    metadata: {
        any: 'info',
    },
}).then((updatedConversation) => {
    // Your code after receiving the current user's updated conversation
});
```

where the fields are optional and could be set to `null` in the case integrators want to unset the value of the fields.

#### createConversation(options)

Creates a conversation on behalf of current user. If the user does not exist, it first creates the user and then a conversation associated with it.

All the options are optional.

```javascript
SerenovaWebChat.createConversation({
    displayName: "Friday's Order",
    iconUrl: 'https://www.zen-tacos.com/tacos.png',
    description: 'Order #13377430',
    metadata: {
        isFirstTimeCustomer: true,
    },
    messages: [
        {
            text: 'Hi there! Your order is being prepared: 2 burritos, 4 tacos, 8 churros',
            type: 'text',
        },
    ],
}).then((conversation) => {
    // Your code after receiving the current user's new conversation
});
```

To create more than one conversation using this method, or to allow your user to create more conversations via the conversation list's `New Conversation` button, you must:

-   have the Multi-Conversations feature enabled on your account
-   update your Web Messenger integration and set `canUserCreateMoreConversations` to `true`

Note that this API does not allow creating `sdkGroup` conversations. This type of conversation must be created by using the public API.

#### markAllAsRead(conversationId)

Marks all unread messages as read.

If **conversationId** is not provided, the currently loaded conversation will have its messages marked as read.

```javascript
SerenovaWebChat.markAllAsRead('<conversation-id>');
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

`beforeSend` delegate will apply to the `formResponse` message sent when a Prechat Capture form is completed.

```javascript
const delegate = {
    beforeDisplay(message, data) {
        if (data.conversation.id === '<my-conversation-id>') {
            message.displayName = 'Acme Blank';
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

// Message object for beforeDisplay and beforeSend delegates

message = {
    id: '5f0cb8226a5b27e41834f8f8',
    displayName: 'username',
    role: 'user',
    userId: 'e70b153989345b0e178174b1',
    avatarUrl: 'https://imageurl.com/avatar.png',
    type: 'text',
    received: 1594669090.954,
    source: {
        type: 'web',
        id: 'e91e070a9c4e4eb7b73fb0a376b340c7',
        integrationId: '5d72af033fbb2c05c87d5d94',
    },
    metadata: {
        isHidden: true,
    },
};

// Data object
data = {
    conversation: {
        id: '<conversation-id>',
        lastUpdatedAt: 1581010017.596,
        type: 'sdkGroup',
        participants: [
            {
                id: '<participant-id>',
                userId: '<user-id>',
                unreadCount: 0,
                lastRead: 1581010017.596,
            },
        ],
        metadata: {},
    },
};
```

#### beforeDisplay

The `beforeDisplay` delegate allows a message to be hidden or modified before it is displayed in the conversation. This delegate should return a falsy value such as `null` to hide the message. It can also return a modified message object in order to change what the user will see rendered in their conversation history. Note that this change affects the client side rendering only; the server side copy of this message can not be modified by this delegate.

```javascript
SerenovaWebChat.init({
    integrationId: '<integration-id>',
    delegate: {
        beforeDisplay(message, data) {
            if (data.conversation.id === '<conversation-id>' && message.metadata && message.metadata.isHidden) {
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
            if (data.conversation.id === '<conversation-id>') {
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
           if (data.conversation.id === '<conversation-id>') {
               postback.metadata = {
                   any: 'info'
               };
           }

           return postback;
       }
   }
});
```

#### onInvalidAuth

The `onInvalidAuth` delegate notifies the delegate of a failed request due to invalid credentials and allows the implementer to set a new auth token in order to retry the request. The delegate must return a new JWT token as a `string` or `Promise<string>` that will resolve into the JWT.

```javascript
SerenovaWebChat.init({
    integrationId: '<integration-id>',
    delegate: {
        onInvalidAuth() {
            return '<my-new-auth-token>';
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
    console.log(`A participant was added to conversation ${data.conversation.id}: `, participant);
});
```

#### participant:removed

```javascript
// This event triggers when a participant is removed from a conversation
SerenovaWebChat.on('participant:removed', function(participant, data) {
    console.log(`A participant was removed from conversation ${data.conversation.id}: `, participant);
});
```

#### conversation:added

```javascript
// This event triggers when a conversation is added
SerenovaWebChat.on('conversation:added', function(participants, data) {
    console.log(`Conversation ${data.conversation.id} was added with following participants: `, participants);
});
```

#### conversation:read

```javascript
// This event triggers when a participant in a sdkGroup chat reads a message
SerenovaWebChat.on('conversation:read', function(payload, data) {
    if (payload.role === 'business') {
        console.log(`Conversation ${data.conversation.id} was read by the business`);
    } else if (payload.role === 'user') {
        console.log(`Conversation ${data.conversation.id} was read by userId: ${payload.userId}`);
    }
});

// Payload and data objects. If the conversation was read by the business, the userId property will not exist
payload = {
    userId: '<user-id>',
    lastRead: 1581010017.596,
    role: 'user'
}

data = {
    conversation: {
        id: '<conversation-id>'
    }
}
```

#### conversation:removed

```javascript
// This event triggers when a conversation is removed
SerenovaWebChat.on('conversation:removed', function(data) {
    console.log(`Conversation ${data.conversation.id} was removed`);
});

// data object
data = {
    conversation: {
        id: '<conversation-id>'
    }
}
```

#### message:received

```javascript
// This event triggers when the user receives a message
SerenovaWebChat.on('message:received', function(message, data) {
    console.log(`The user received a message in conversation ${data.conversation.id}: `, message);
});

// data object
data = {
    conversation: {
        id: '<conversation-id>'
    }
}
```

#### message:sent

```javascript
// This event triggers when the user sends a message
SerenovaWebChat.on('message:sent', function(message, data) {
    console.log(`The user sent a message in conversation ${data.conversation.id}: `, message);
});

// data object
data = {
    conversation: {
        id: '<conversation-id>'
    }
}
```

#### message

```javascript
// This event triggers when a message was added to the conversation
SerenovaWebChat.on('message', function(message, data) {
    console.log(`A message was added in the conversation ${data.conversation.id}: `, message);
});

// data object
data = {
    conversation: {
        id: '<conversation-id>'
    }
}
```

#### unreadCount

```javascript
// This event triggers when the number of unread messages changes
SerenovaWebChat.on('unreadCount', function(unreadCount, data) {
    console.log(`the number of unread messages was updated for conversation ${data.conversation.id}:`, unreadCount);
});

// data object
data = {
    conversation: {
        id: '<conversation-id>'
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

#### log:debug

```javascript
// This event triggers when the codes emits debug information
SerenovaWebChat.on('log:debug', function (e) {
    console.log('Timestamp:', e.timestamp); // (Float) Date.now() when it was emitted
    console.log('Message:', e.message); // (String) Message being logged
    console.log('Data:', e.data); // (Object) Extra details to be logged
});
```

#### connected

```javascript
// This event triggers when an active connection has been established for the first time,
// or when the connection has been re-established after a `disconnected` or `reconnecting` event.
SerenovaWebChat.on('connected', function(data) {
    console.log('Connected with conversation', data.conversation.id);
});
```

#### disconnected

```javascript
// This event triggers when an active connection is lost
// While disconnected, the client will not be able to recieve messages or load a conversation
SerenovaWebChat.on('disconnected', function(data) {
    console.log('Disonnected with conversation', data.conversation.id);
});

// data object
data = {
    conversation: {
        id: '<conversation-id>',
    },
};
```

#### reconnecting

```javascript
// This event triggers when an active connection is lost and there is an attempt to reconnect
// While reconnecting, the client will not be able to receive messages or load a conversation
SerenovaWebChat.on('reconnecting', function (data) {
    console.log('Reconnecting with conversation', data.conversation.id);
});

/ data object
data = {
    conversation: {
        id: '<conversation-id>',
    },
};
```

#### typing:start

```javascript
// This event triggers when the business starts typing. The associated conversation is passed in the argument.
SerenovaWebChat.on('typing:start', function(data) {
    console.log(`${data.name} started typing!`, data.conversation.id);
});

// If the name and avatarUrl for the typing user is known it will be available as properties in the data object

// Data object
data = {
    conversation: {
        id: '<conversation-id>',
    },
    avatarUrl: 'http://path.com/to/avatar-url-of-user',
    name: 'Name of Typing User',
}
```

#### typing:stop

```javascript
// This event triggers when the business stops typing. The associated conversation is passed in the argument.
SerenovaWebChat.on('typing:stop', function(data) {
    console.log(`${data.name} stopped typing!`, data.conversation.id);
});

// data object
data = {
    conversation: {
        id: '<conversation-id>'
    }
}
```

### Embedded mode

As describe above, to activate the embedded mode, you need to pass `embedded: true` when calling `SerenovaWebChat.init`. By doing so, you are disabling the auto-rendering mechanism and you will need to call `SerenovaWebChat.render` manually. This method accepts a DOM element which will be used as the container where the widget will be rendered.

```javascript
SerenovaWebChat.init({
    integrationId: '<integration-id>',
    embedded: true
}).then(() => {
    SerenovaWebChat.render(document.getElementById('chat-container'));
});
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

Note that your CSP configuration should also include any domains used to host images or files sent in messages.
If you require `blob:` to be excluded for `img-src`, you must disable the image upload feature via the [init settings](#initoptions).
