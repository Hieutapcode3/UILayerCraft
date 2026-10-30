# Security and Data

- Never commit `.local-provider-config.json` (API keys) or `.uilayercraft-history/` (user images and drafts); both are git-ignored.
- Never print API keys in logs, tests, screenshots or docs.
- E2E runs must not change the user's model settings permanently: create a temporary config, route to it, and restore the original routing afterwards.
- Images and drafts the user loads stay on the machine; they are sent only to the model provider or CLI the user configured.
