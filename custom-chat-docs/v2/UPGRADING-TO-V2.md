# Upgrading to V2 of SerenovaWebChat

## Loader script

- There is a new loader script for version 2.0.0 of SerenovaWebChat that will need to be used to load the latest version:

```html
<script>
  !function(o,i,s,c){var a,p,h,u=[],l=[];function e(){var t="You must provide a supported major version.";try{if(!c)throw new Error(t);var e,n="https://sdk.cxengage.net/webchat/2.2.1/",r="serenovawebchat";if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var o=i.getElementsByTagName("script")[0],s=i.createElement("script");s.async=!0;var a=c.match(/([0-9]+)\.?([0-9]+)?\.?([0-9]+)?/),p=a&&a[1];if(a&&a[3])s.src=n+r+"."+c+".min.js";else{if(!(1<=p&&e["v"+p]))throw new Error(t);s.src=e["v"+p]}o.parentNode.insertBefore(s,o)}}catch(e){e.message===t&&console.error(e)}}o[s]={init:function(){a=arguments;var t={then:function(e){return l.push({type:"t",next:e}),t},catch:function(e){return l.push({type:"c",next:e}),t}};return t},on:function(){u.push(arguments)},render:function(){p=arguments},destroy:function(){h=arguments}},o.__onWebMessengerHostReady__=function(e){if(delete o.__onWebMessengerHostReady__,o[s]=e,a)for(var t=e.init.apply(e,a),n=0;n<l.length;n++){var r=l[n];t="t"===r.type?t.then(r.next):t.catch(r.next)}p&&e.render.apply(e,p),h&&e.destroy.apply(e,h);for(n=0;n<u.length;n++)e.on.apply(e,u[n])};var t=new XMLHttpRequest;t.addEventListener("load",e),t.open("GET","https://sdk.cxengage.net/webchat/2.2.1/loader.json",!0),t.responseType="json",t.send()}(window,document,"SerenovaWebChat","2");
</script>
```

_Note the integrationId no longer needs to be passed in to the loader script_


## Conversations

A future version of the API will allow for multiple conversations to be created for the same user. Although this is not fully supported yet, the API and SDK have been updated to eventually support this.

The main change is that a `conversation` needs to be created (using the `createConversation` function) and have its `id` kept track of to pass into the `sendMessage` function:

```javascript
SerenovaWebChat.createConversation().then(function (newConversation) {
  // Your code after receiving the current user's new conversation
  conversation = newConversation;
  SerenovaWebChat.sendMessage(
    inputElement.value,
    conversation.id
  ).then(function () {
    inputElement.value = '';
  });
});
```

Similarily, when retrieving the intial messages from the conversation, the specific conversation will need to be taken from the list and loaded:

```javascript
conversation = SerenovaWebChat.getConversations()[0];
SerenovaWebChat.loadConversation(conversation.id);
conversation.messages.forEach(function (message) {
  displayMessage(message, { conversation: conversation });
});
```

## Client APIs

- `getUser` will now return an empty object rather than undefined if there is no user
- `updateUser` will now return an empty object rather than undefined if there is no user
- `conversationId` is now a required argument for `sendMessage`
- The following user properties have been updated for the payload returned by `getUser` and `updateUser`:
  - `_id` is now `id`
  - `userId` is now `externalId`
  - `properties` is now `metadata`
- The following conversation properties have been updated for the payload returned by `createConversation`, `getConversationById`, `getConversations`, `getDisplayedConversation`, and `getMoreConversations`:
  - `_id` is now `id`
  - The following participant properties have been updated for the participants included in the participants array:
    - `_id` is now `id`
    - `appUserId` is now `userId`
  - The following message properties have been updated for the messages included in the messages array:
    - `_id` is now `id`
    - `authorId` is now `userId` and will only be included for messages with `role = "user"`
    - `name` is now `displayName`
    - `role` now has the values of either `user` or `business` rather than `appUser` or `appMaker`
    - The following `action` properties have been updated for the actions included in the `actions` array
      - `_id` is now `id`

## Delegates and Events

- All `conversation`, `participant`, `message`, and `action` property changes described in the Client APIs sections also apply to delegates and events.