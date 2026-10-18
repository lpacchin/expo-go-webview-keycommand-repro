# Expo Go: hardware-keyboard dev shortcuts fire while typing in a WebView

Minimal reproduction for an Expo Go (iOS) bug.

## Steps

1. `npm install && npx expo start`
2. Open the project in **Expo Go** on a **physical iPad with a hardware keyboard** (e.g. Magic Keyboard).
3. Tap the `<textarea>` inside the WebView and type `r`: the app reloads (the "JS started at" time changes).
   Type `d`: the dev menu opens.
4. Type the same letters in the native `TextInput`: nothing happens (expected behavior).

## Expected

Dev-menu key commands without modifiers (`r`, `d`) should be ignored while a text field inside a WebView is focused,
the same way they are ignored for native `UITextField` / `UITextView`.

## Cause (from source)

`apps/expo-go/ios/Exponent/Kernel/DevSupport/EXKernelDevKeyCommands.m`:
`UIResponder (EXKeyCommands) -EX_keyCommands` returns `@[]` only for `UITextView` / `UITextField`.
When the first responder is `WKContentView` (focused field in a `WKWebView`) the dev commands are still returned,
including `r` and `d` registered with `modifierFlags:0`. The `WKContentView` check exists only in the
simulator-only `EX_handleKeyUIEventSwizzle:` path. Same symptom as expo/expo#20107, which fixed native inputs only.
