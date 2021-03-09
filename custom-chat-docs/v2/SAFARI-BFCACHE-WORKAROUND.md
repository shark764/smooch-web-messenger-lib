# Safari bfcache Workaround

`SerenovaWebChat` has `connected`, `disconnected`, and `reconnecting` events that can be subscribed to. In any event of the chat being `disconnected` (mainly noted in Safari when navigating forward and back), the chat will need to be reloaded to reconnect. When the `disconnected` event is handled, a link/button can be presented to the user to reload the chat and reconnect.

```javascript
SerenovaWebChat.on('disconnected', function(e) {
  console.log('SerenovaWebChat disconnected');
  // Show something for the user to click and reload the chat to reconnect
  document.getElementById('disconnect-container').style.display = 'block';
});
```
