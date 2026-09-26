# Galvan Home Improvements LLC — Teaser Website

Standalone client teaser for **Galvan Home Improvements LLC**, intentionally isolated from all Jeff Electric repositories and projects.

## Brand system implemented

- Existing Galvan logo is embedded from the supplied image without redrawing or recoloring.
- Bronze: `#816F3F`
- Gray: `#8E8E8C`
- Charcoal: `#252525`
- Warm White: `#F8F7F3`
- White: `#FFFFFF`
- Headlines/navigation: Montserrat
- Body: Inter
- Tagline: **Built Right. Finished Clean.**
- Brand character: reliable, skilled, professional, straightforward, established

## Homepage structure

1. Hero / primary brand message
2. Services
3. Recent Projects
4. Why Galvan
5. How It Works
6. Customer Reviews
7. Request an Estimate

The public teaser exposes the hero, services, and project presentation. The remainder is intentionally locked behind a polished paywall overlay.

## Paywall

This is currently a **soft teaser paywall** intended for proposal/demo use.

- Checkout hook: `PAYMENT_URL`
- Successful checkout can return with `?unlocked=1`
- Owner preview code is configured in the page script
- For true paid access, validate payment/authentication server-side before protected content is served

## Before public launch

- Replace concept project photos with real Galvan project photography
- Replace review placeholders with verified Galvan customer reviews
- Add real phone, email, service area, and domain
- Connect the estimate form to the preferred lead intake
- Connect the paywall CTA to Stripe, Square, PayPal, or another checkout
- Add privacy/terms pages if collecting customer data

## Isolation

No files in `Jeffelectric` or `Jeff-Electric-PowerScope` are modified by this work.
