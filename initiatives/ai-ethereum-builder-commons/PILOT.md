# Phase 0 pilot protocol

**Status:** Planned. All participant counts and gates below are targets, not results.

## Recruit and observe

Recruit adults who can run a small AI-generated script, prefer Chinese instruction, and have never completed an Ethereum application. Use C-Star's existing community channels and invite people outside prior meetup attendees. Record prior wallet and coding experience in broad categories. Do not collect wallet keys, personal wallet addresses, or contact details in the public repository.

**Targets:** Five 20-minute discovery interviews and one 60–75 minute session with 6–8 learners. These are capacity assumptions for one facilitator and one reviewer, not estimates of ecosystem demand.

| Hypothesis | How to test it |
| --- | --- |
| Learners can generate a transaction request but miss a wrong network, recipient, value, or calldata | Use a fictional request on paper. Ask what they would approve and why. Never submit this request. |
| Learners mistake hex encoding or a successful receipt for privacy | Ask them to decode a synthetic note from calldata and identify who can read it. |
| Learners cannot get from existing resources to independent verification | Give them links to the Chinese transaction guide and existing wallet labs. Record the first blocker, what they tried, and any facilitator help before introducing the starter. |
| Learners have trouble finding a next step | Offer one reproducible tutorial issue, a documentation correction, or a follow-on contract exercise. Check what they actually did in about 30 days. |

Interview prompts: “Show me the last Ethereum setup you tried.” “What did you expect to happen?” “What did you check before approving?” “What did you do after you got stuck?” Treat accounts without a concrete attempt as weaker evidence.

## Run one session and score the work

1. **Baseline (15 minutes):** With existing resources, ask each learner to inspect a fictional transaction and interpret a sample receipt. Record errors, time, and help required.
2. **Build (25 minutes):** Run [Privacy Boundary Lab](starter/privacy-lab.md), cancel once, then approve the two local sends and compare their mined inputs. Allow pairing for setup and record that help separately.
3. **Transfer task (15 minutes):** Give each learner a different synthetic proposal and sample receipt. Without step-by-step coaching, have them flag the unnecessary data and its audience, explain who authorizes and signs, and identify what remains visible after data minimization. Record technical interruptions separately from conceptual errors.
4. **Exit and follow-up (5 minutes plus an opt-in check at about 30 days):** Ask for a blocking issue or documentation correction. Look for a concrete artifact at follow-up (reproduced exercise, issue, PR, or another app), and publish response and nonresponse counts separately.

Use an anonymous local worksheet with cohort code, baseline and transfer result by task, type of help (none, setup, conceptual), first blocker, follow-up opted in, response, and artifact category. Report aggregates and examples with consent. Keep scheduling contacts separate and discard identifiable records when follow-up is complete. The small pre/post comparison informs lesson design and cannot establish causal impact.

## Milestones and decision

| Gate | Owner | Acceptance |
| --- | --- | --- |
| Reproduction before recruitment | Clare + PC for technical review (proposed) | An independent developer follows the lab from a clean environment, reproduces the calldata comparison and permission tests, and records issues and checked versions. Resolve any safety blocker before teaching. |
| Demand and teaching check | Clare | Target: at least three discovery interviews show a concrete blocker during an attempt that existing resources did not resolve within the exercise. Target: at least two-thirds of a minimum six learners independently pass all three transfer checks. Record all denominators and missing data. |
| Continued building and delivery capacity | Clare + technical reviewer | Target: at least two learners show a concrete follow-on artifact within about 30 days. Confirm reviewer time and facilitator coverage. Publish aggregate evidence, failures and fixes, and a decision to stop, revise, or expand. |

If results are mixed, revise one bottleneck and repeat the short exercise. If existing resources already solve the problem, publish the observations and direct learners there. A continuation decision is conditional on all three gates.

## Costs, maintenance and risks

Track preparation, review, facilitation and follow-up separately. Use the following template per milestone: **item · owner · estimated hours/units · estimated unit cost · actual hours/units · actual cost and currency · confirmed funding source or pending**. Leave cost fields unfilled until quoted or incurred. Venue, refreshments and paid tooling are optional, and no funding or spend is assumed. Record volunteer time separately. After delivery, compare total hours and direct cost per learner who passes the transfer task.

- **Technical review:** No workshop is scheduled without a reviewer. Keep self-study available if there is no facilitator.
- **Recruitment and bias:** Prior meetup attendees may be unusually engaged. Document channels and prior experience, and avoid treating the sample as representative.
- **Safety and setup:** Use disposable local accounts and a read-only Sepolia path by default. Log setup friction separately. Use a known existing public receipt if faucets or a test wallet are unavailable.
- **Privacy and retention:** Publish aggregate outcomes and permissioned artifacts only. Treat lack of follow-up response as unknown. Triage tutorial failures through the repository's issues and link fixes in the pilot report.
