# Moore Electric discoverability review

Reviewed October 10, 2026 (Central). Candidate only; merge and production deployment require Dev's approval.

## Decision and scope

Use the established identity **Moore Electric**, https://228mooreelectric.com/, and **(228) 224-9150**. Work takes place at customers' properties. Do not invent a public office, map pin, business alias, credential, payment method, emergency-response commitment, or verified profile identifier.

The same Electrician data was repeated on 54 EN/ES/VI pages. Correct all 54 instances so a crawler following an interior or translated page does not recover the discarded claims. Keep existing page content, CSS, JavaScript, images, links, pricing, and navigation except for removal of the unverified footer ZIP code and one service-area sentence on each homepage. This is a machine-readable identity correction, not a complete audit or approval of existing marketing copy.

Baseline: `025e7af3ed3bdef48a03b8a7e3576604cac770f9` on `main`.
Branch: `fix/ai-discoverability-oct10`.

## Implemented

- Give every Electrician node the same stable `@id`, `https://228mooreelectric.com/#business`, and canonical business URL. Interior-page canonical links remain unchanged: a business identity URL and a page URL have different purposes.
- Preserve the name, international-format telephone, existing public email, and six established service cities. Qualify each city with Mississippi; do not expand coverage to whole counties or a guessed radius.
- Remove the unverified postal address, ZIP code, coordinates, coordinate meta tags, opening-hours/emergency wording, and homepage aggregate rating from the business markup.
- Remove `speakable` from Electrician. It is not a general local-business voice-search switch; Google's documented use is a beta for news content on Article/WebPage.
- Remove `$75+` as the general business price range. The established $75 fee is for a visit/assessment and remains in visible pricing and the concise reference with its credit condition.
- Add one WebSite node on each homepage, linked to the single business identity. Add a visible service-area sentence in the page's language.
- Retain the existing Facebook `sameAs` link only. The repository identifies this profile, and the BBB listing for the matching telephone links to the same Facebook handle. Facebook itself was throttled during this review: this corroborates the reference, not account ownership, current profile fields, or verification status. No Google CID, Apple Maps, Angi, BBB, or HomeAdvisor link is added to structured data. The BBB listing's LLC wording is not adopted.
- Add a small optional `llms.txt` using supported identity, contact, service-area and assessment information, with working links to existing homepage sections. No `llms-full.txt` or dangling link to it is added.
- Keep the existing `User-agent: * / Allow: /` policy and sitemap declaration. Add explanatory comments only; no access or training preference is changed.

## Evidence and limits

| Mechanism | What is supported | What it does not establish |
| --- | --- | --- |
| Accurate HTML and Schema.org identity | Explicitly identifies the business and service cities, removes conflicting machine-readable claims, and preserves crawlable text and links. | Ranking improvements, a Knowledge Panel, Siri recognition, or inclusion in an AI answer. |
| Electrician without an address | Schema.org permits describing a business with `areaServed`; the vocabulary does not impose Google's rich-result requirements. | Google LocalBusiness rich-result eligibility: its guide requires a physical `address`. This candidate intentionally omits one. Never insert a private or invented address to clear a validator. |
| WebSite node | Gives the site a consistent name and connects its publisher to the business node. | A guaranteed displayed site name or entity match. |
| Review markup removal | Avoids presenting stale aggregate numbers as structured business ratings. Google's review rules exclude self-serving LocalBusiness/Organization review stars, including third-party reviews embedded on the reviewed business's site. | Re-verification of the existing visible testimonials or rating totals. |
| `robots.txt` | Current wildcard policy already permits these search crawlers at the file level. | Actual successful crawler requests through hosting/CDN controls, indexing, ranking, or re-crawling on demand. |
| `llms.txt` | An experimental, concise reference for clients that elect to consume it. The proposal is not a universal crawler/indexing standard. | Automatic ingestion by every model, permanent knowledge, guaranteed citations, or a Google AI Search requirement. |

Google's AI Search guidance says ordinary SEO fundamentals apply, structured data should agree with visible content, and special AI text files are unnecessary. Even technical eligibility does not guarantee indexing. These are correctness improvements, not measured traffic gains.

## Crawler distinctions

| Product | Search/retrieval mechanism | Separate control |
| --- | --- | --- |
| Google Search / AI Overviews / AI Mode | Googlebot and normal Search eligibility | Google-Extended controls certain Gemini training **and grounding** uses; it does not control Search inclusion or ranking and has no separate HTTP crawler. |
| ChatGPT search | OAI-SearchBot; user-directed retrieval also has ChatGPT-User | GPTBot concerns model-training use. Allowing GPTBot is not a prerequisite for allowing search. |
| Apple search / Siri-related web discovery | Applebot | Applebot-Extended controls foundation-model training, not crawling or search ranking. Siri/Maps business listing accuracy needs separate verification. |
| Claude search | Claude-SearchBot; Claude-User for user-directed retrieval | ClaudeBot concerns possible model-training collection. |
| Perplexity search | PerplexityBot; Perplexity-User for user-requested retrieval | Access still does not guarantee a result or citation. |

Do not substitute training tokens for search crawlers. The unchanged wildcard also continues the existing permissive policy for training crawlers; this PR does not express a new training-use decision. CDN bot rules and response headers must be checked separately after an approved deployment.

## Overlap and integration

All four open PRs were checked:

- **#26**, `fix/link-preview-pip-oct10`, head `f368fe7baabe7f740aecab423709cc2767638a4e`: owns homepage SEO title/description and OG/Twitter changes. None is duplicated here. Keep #26's metadata. Its remaining rating claims are outside this branch's metadata ownership.
- **#22**, `audit/flawless-oct8`, head `ac72d8b84e4deb72674a54d7f32d9831d794b0d0`: this branch supersedes ONLY its homepage JSON-LD business-URL correction. Keep this branch's complete corrected business node when resolving that overlap. Preserve its unrelated hreflang, favicon, visible-name, photo and legacy-link work, subject to the existing #25/#26 overlap notices. Do not merge #22 unchanged. No edits were made to #22.
- **#24**, `portfolio-crosslinks-oct9`: its three footer links remain independent; retain them when combining branches.
- **#25**, `fix/f012-gallery-oct9`: changes gallery references, not business data; retain its work.

Local merge-tree checks succeeded independently against #26, #24 and #25. #22 produces 17 text conflicts: its homepage JSON-LD URL change overlaps the replacement graph, and its adjacent hreflang insertions collide with coordinate-tag removal on 16 interior pages. Resolution must retain #22's hreflang links while omitting `geo.position`/`ICBM`, retain this branch's corrected graph, and keep the separate #26 metadata. These dry runs create no merge and change no existing branch.

## Business information still needed

1. The actual public Google Business Profile share/Maps URL or Place ID, matched against this name, telephone and domain. A statement that a profile exists does not validate the spec's placeholder CID. No placeholder is shipped.
2. Confirmed business hours, whether emergency calls are accepted, and any response-time/overnight commitment. Existing visible copy has stronger promises; omission from JSON-LD does not correct those pages.
3. Verified current licensing/insurance details and accepted payment methods before adding such claims. Training background alone is not proof of licensing or insurance.
4. Dated evidence for visible review totals/averages and identity of the proposed Angi listing. Do not aggregate unrelated businesses or treat Facebook recommendations as independently verified five-star ratings.
5. Verified profile ownership and corrected public profile fields before expanding `sameAs`. The third-party BBB name still conflicts with the established brand.

Known residual content: visible emergency wording, review figures, pricing comparisons, and older marketing claims remain outside this bounded structured-data repair; #26 handles only the homepage metadata. This candidate does not certify them. A complete public-copy cleanup and confirmation of service policy are still required before calling the whole site verified. Existing FAQ JSON-LD is preserved and is not independently fact-checked here.

## Validation

Completed locally:

- Parsed all 63 HTML pages and 87 JSON-LD blocks; no JSON syntax or duplicate-key errors.
- Checked 54 corrected Electrician nodes and three WebSite nodes against the downloaded official Schema.org vocabulary: 657 property/domain/range checks passed, including inherited types and publisher references. All 54 nodes describe the same business. This is a vocabulary check, not a Google rich-result certification.
- Verified removal of the unsupported properties from every corrected business node and removal of coordinate meta tags from all 54 affected pages.
- Compared every affected source file with the pinned baseline after normalizing only the documented edits: all remaining content was identical. All 327 telephone links, all existing anchor targets, image references, stylesheet links and executable script references on affected pages were preserved. This does not assert that pre-existing images or links are all healthy; #25 owns a known gallery repair.
- Parsed the sitemap and checked all 18 local destination files. Checked all three `llms.txt` section links against the homepage IDs.
- Verified unchanged robots directives and 36 local agent/path combinations across search and training tokens. These are policy-parser checks, not real crawler requests.
- Fetched the live homepage and robots file over HTTPS: both returned HTTP 200, without an `X-Robots-Tag` header in those ordinary requests. The homepage bytes exactly matched pinned main. CDN behavior for genuine crawlers was not tested.
- `git diff --check` passed. Merge-tree results appear above.

The Schema.org vocabulary was downloaded from `https://schema.org/version/latest/schemaorg-current-https.jsonld`, SHA-256 `0a4b8c4c910fc831ec8695196510973390906a5ee34dc6b862dfec4d21a12f74`.

Google Rich Results Test and Search Console were not run; the missing Google-required address remains intentional. Browser rendering was not tested because local Playwright had no browser executable. This static change preserves the existing design/resources, but no visual or live-interaction pass is claimed. No build system is present on current main. No production deployment was initiated.

After approval and deployment: inspect production HTTP status/headers, served robots/sitemap and canonical URLs; check Search Console URL Inspection and indexing; verify crawl access with CDN logs and documented crawler IPs; then measure impressions, clicks and relevant AI referral traffic over time. Recheck exact-name and phone searches separately in Google, Apple Maps/Siri and ChatGPT. Record observations; do not label indexing successful based only on a code change.

## Sources

Specification and original handoff were read in Drive. Their implementation instructions are proposals; the current repository and Dev's current approval boundary govern this candidate.

- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google review snippets](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Google speakable beta](https://developers.google.com/search/docs/appearance/structured-data/speakable)
- [Google Business Profile service-area guidance](https://support.google.com/business/answer/3038177)
- [Schema.org Electrician vocabulary](https://schema.org/Electrician)
- [Google common crawlers, including Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
- [Applebot documentation](https://support.apple.com/en-us/119829)
- [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [llms.txt proposal, v2](https://llmstxt.org/)
- [BBB listing used only to corroborate the existing phone/Facebook association](https://www.bbb.org/us/ms/biloxi/profile/electrical/moore-electric-llc-0523-235900093)
