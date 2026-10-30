# No-permit advertising alignment — October 30, 2026

## Baseline and integration

Reviewed main `0aef80a6c673a6837e28db05292ff5da687256a9` and open PR #36 head `7f677b41a91d61fa8faffe1c7f12a308545aab04`. PR #35 is merged. No newer PR was found addressing the excluded services. This branch starts from #36 and the pull request targets `fix/site-improvement-pass`, so the diff contains only the advertising-policy follow-up. It neither duplicates #36 nor changes that branch. Approval is required to merge; after #36 lands, rebase/retarget this follow-up to main as appropriate (especially if #36 is squash-merged).

## Public scope

| Content | Treatment in English, Spanish and Vietnamese |
| --- | --- |
| Panel/service upgrades, EV circuits, generator hookups, panel-mounted surge protection | Withdrawn. Twelve old service URLs explicitly say the service is not offered, carry `noindex, follow`, and have no Service/Offer schema or prices. Removed their advertising links, cards, ticker entries and 12 sitemap URLs. No redirect disguises the old offer. |
| Troubleshooting and minor repair | Assessment retained; repair only where the exact work is confirmed not to require a permit. No new circuits, rewiring, panel or service work. |
| Fans, switches/outlets, lighting | Existing-location, like-for-like replacements only, subject to local requirements and suitable existing wiring/support. No new locations, added circuits, box retrofits, amperage or grounding changes. |
| Smart home | Setup/pairing of plug-in or battery devices on suitable existing outlets/WiFi. Hardwired switches, thermostats, transformers and added wiring are excluded. |
| Urgent concerns | Assessment availability, without a promise of emergency restoration or 24-hour service. Immediate-danger text points to 911/utility as applicable. Excluded repairs do not become eligible in an emergency. |
| Prices | $75 visit/assessment retained with credit toward eligible work. Written quotes after assessment. No $150, $350 or $450 public prices. Replaced the vague larger-job card with explicit eligible minor work. |
| FAQs and structured data | Visible answers and FAQ JSON-LD agree; EV installation answer is explicitly no. Service schema describes the narrowed scope. $75 Offer is explicitly visit/assessment only, not the replacement/repair price. |
| Articles, photos and reviews | Educational articles retained with installation sales pitches removed. Historic photos/reviews retained, labeled as past work rather than current offers. Customer quotations are unchanged. |
| Calculators | Preserved both calculators, input IDs, placeholder, confirmation control, gating, math and verdict titles. Changed only the favorable verdict's body text to remove the installation-sales pitch. |

This implements the owner's advertising boundary; it is not a jurisdiction-wide finding that a named repair category is exempt. No blanket exemption is claimed. Each job must meet local rules before it is quoted or started. A visit is not an official inspection or permit approval.

Official reference checks: [Biloxi's ordinance portal](https://biloxi.ms.us/resources/code-of-ordinances/) directs readers to confirm definitive requirements with Community Development; [Biloxi forms and permits](https://biloxi.ms.us/residents/forms-permits/) lists the relevant applications. [Gulfport, Mississippi's electrical permit application](https://www.gulfport-ms.gov/wp-content/uploads/2021/04/Buildling.Electrical.permit.App_.pdf) includes service entrances, subpanels, feeders, branch circuits and generators. These sources do not establish an exemption for every replacement job. No Gulfport, Florida source was used for the Mississippi service scope.

## Verification

- `python scripts/check-advertising-scope.py --baseline 7f677b41a91d61fa8faffe1c7f12a308545aab04`: 71 HTML pages, 68 JSON-LD blocks, 47 sitemap URLs. Checks retired pages/links, explicit active-service card allowlists in all languages, pricing, phone destinations, JSON-LD, analytics JSON and 15 changed visible/FAQ-schema pairs.
- `node scripts/check-calculator.cjs`: 7 math assertions, 8 stub-DOM scenarios, confirmation revocation and panel reset. No-panel, unconfirmed and missing-confirmation cases remain non-affirmative; complete-input results remain unchanged.
- `node --check assets/js/calculators.js` and `git diff --check` pass.
- `assets/js/main.js` and `assets/css/main.css` match #36 byte-for-byte, preserving its hero fixes. Calculator JS differs by exactly one verdict-body string. Review totals and analytics repairs from #36 are retained.
- Local-link/asset scan introduces no new failures. 40 pre-existing source-reference issues remain: legacy 404 prefixes, Spanish Safety favicon, reviews' old `#gallery` anchors and missing team/Gulfport photo references. PR #25 already owns the six team/Gulfport photo repairs; no duplicate fix is included here. PR #22 overlaps other legacy cleanup.
- Spanish and Vietnamese were checked against the same service categories, exclusions, quote rules and FAQ answers. Native-speaker review has not been performed.
- Browser launch failed because Chromium was not installed. Playwright's browser download returned an invalid/truncated archive. No screenshots, rendered mobile overflow measurements or visual hero validation are claimed. Existing layout/classes and hero JavaScript/CSS are retained, but revised copy needs a desktop/mobile visual review before merge.

## Separate decisions / limits

- Exact permit-exemption eligibility for a particular job still requires the relevant local determination. The website does not accept work requiring a permit and does not promise that all like-for-like replacements qualify.
- The existing competitor comparison ($122–$207) remains unchanged, as in #36; no source substantiating it was supplied in this task. Owner decision: retain with evidence or remove it.
- PR #27 remains draft/open and conflicted. It owns removal of unverified address, precise coordinates, hours and rating metadata. This follow-up changes service offers and FAQ claims only and does not duplicate that separate business-data cleanup. Those old metadata claims are not endorsed by this review.
- Articles were checked for advertising scope, not comprehensively revalidated as technical guidance.
- No merge, auto-merge or deployment command is authorized or performed by this change.
