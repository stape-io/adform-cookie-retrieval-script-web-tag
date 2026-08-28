# Adform Cookie Retrieval Script tag for Google Tag Manager Web

The **Adform Cookie Retrieval Script tag** retrieves the Adform cookie ID (`adfuid`) from the user's browser and stores it as a first-party cookie, so it can be reused client-side and passed along in server-side requests.

## How It Works

When the tag fires, it looks for the Adform cookie ID in the following order and stops as soon as a valid one is found:

1. **URL / referrer parameter** - checks the current page URL and the referrer URL for an `adfcookieid` query parameter.
2. **Existing first-party cookie** - checks whether an `adfuid` cookie is already set in the browser.
3. **Adform's serving script** - injects Adform's cookie serving script (`track.adform.net/Serving/Cookie`) and reads the ID it assigns to `window.Adform._uid`. Most useful for view-throught conversions, when the [Adform Tag for sGTM](https://github.com/stape-io/adform-tag) cannot capture the Cookie ID.

Whichever value is found first is validated and stored in the `adfuid` first-party cookie using the domain, `SameSite`, and expiration settings configured on the tag.

## Setup Instructions

1. **Import** the template from the Community Template Gallery or manually using the [template.tpl](./template.tpl) file into your GTM Web workspace.
2. **Create** a new tag using the _Adform Cookie Retrieval Script_ template.
3. **Configure** the Cookie Settings (optional):
   - **Cookie Domain** - the domain the `adfuid` cookie is written to. Defaults to `auto`, letting the browser determine it.
   - **Cookie SameSite** - the `SameSite` attribute for the `adfuid` cookie. Defaults to `None`.
   - **Cookie Expiration** - how long, in days, the `adfuid` cookie is kept. Defaults to `60`.
4. **Assign** a trigger that fires on page load (Container Initialization, All Pages, DOM Ready). Make sure to adhere to your consent management.

## Useful Resources

- [Adform tag for server-side Google Tag Manager](https://github.com/stape-io/adform-tag) - use the `adfuid` cookie captured by this tag as input for Adform's server-side tracking.

## Open Source

The **Adform Cookie Retrieval Script tag for Google Tag Manager Web** is developed and maintained by [Stape Team](https://stape.io/) under the Apache 2.0 license.
