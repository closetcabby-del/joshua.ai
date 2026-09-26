# Home Improvement Teaser / Paywall Concept

This branch is intentionally separate from all Jeff Electric work.

## Location
`/home-improvement-teaser/index.html`

## Concept
A premium teaser site for a residential home-improvement small business. The public experience reveals the hero and positioning, then intentionally locks the service architecture, gallery, and conversion section behind a polished teaser paywall.

## Current paywall behavior
This build uses a **soft paywall** suitable for a client teaser/demo:
- Public visitors see the teaser.
- Locked sections are blurred and non-interactive.
- The main CTA is ready for a payment URL.
- A checkout can redirect back with `?unlocked=1`.
- Owner preview code: `BUILD2026`.

A soft paywall is not secure entitlement enforcement because the frontend code is public. For a real paid-access product, validate payment/authentication server-side (for example Stripe Checkout + a serverless function/session) before returning protected content.

## Before client launch
1. Replace "Haven & Hammer" with the actual business name.
2. Replace sample email address.
3. Replace sample imagery with client work.
4. Replace `PAYMENT_URL` in the configuration block.
5. If the user is purchasing the website itself rather than site access, reword the lock copy to "Approve & Purchase This Website" and send checkout success to an ownership/handoff flow.

## Isolation
No files in `Jeffelectric` or `Jeff-Electric-PowerScope` are changed by this work.
