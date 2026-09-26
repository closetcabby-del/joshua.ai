# Galvan Home Improvements LLC — Teaser Website

This branch is intentionally isolated from all Jeff Electric repositories and projects.

## Brand implementation

The teaser follows the supplied Galvan Home Improvements LLC brand system:

- Existing Galvan logo used as supplied, without redesign or recoloring
- Bronze: `#816F3F`
- Gray: `#8E8E8C`
- Charcoal: `#252525`
- Warm White: `#F8F7F3`
- White: `#FFFFFF`
- Headline / navigation font: Montserrat
- Body font: Inter
- Tagline: **Built Right. Finished Clean.**
- Voice: established, skilled, professional, straightforward, approachable, dependable

## Homepage structure

1. Hero / primary brand message
2. Services
3. Recent Projects
4. Why Galvan
5. How It Works
6. Customer Reviews
7. Request an Estimate

The public teaser exposes the hero, services, and project presentation. The remaining website is intentionally locked behind the teaser paywall.

## Paywall

This is currently a **soft teaser paywall** for client sales/demo use.

- Checkout hook: `PAYMENT_URL` in `index.html`
- Checkout success can return with `?unlocked=1`
- Owner preview code: `GALVAN2026`
- Production paid access should validate payment/authentication server-side before serving protected content

## Before public launch

- Replace design-preview project images with real Galvan project photography
- Replace review placeholders with verified Galvan customer reviews
- Add the real phone number, email, domain, and service area
- Connect the estimate form to Galvan's preferred lead intake system
- Connect the paywall CTA to Stripe, Square, PayPal, or another checkout
- Add privacy/terms pages if lead information will be collected

## Isolation

No files in `Jeffelectric` or `Jeff-Electric-PowerScope` are modified by this work.