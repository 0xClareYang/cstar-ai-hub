# Agent Privacy validation plan

**Status: Validation pending.** The next 90 days focus on whether developers repeatedly encounter one concrete tool-call data exposure problem that their current tools do not adequately address. Participant counts and acceptance thresholds are targets.

## Phase 1 · Demand and independent reproduction

Interview 5–8 developers who build agents or automations, including people outside previous meetups. Ask them to walk through a recent call: what data went to which tool or service, what they approved, how they checked the result, and where an existing control failed. Record the frequency, consequences and current workaround using redacted summaries or synthetic examples. Keep contact details separate.

Invite at least one external developer to follow the [lab guide](starter/privacy-lab.md) from a clean environment. Record versions, blockers, and expected versus observed output for both transactions and the confirmation check. Publish one round of improvements and link the evidence and fixes.

Compare the same use case against the team's existing controls and relevant tools, such as [Presidio](https://microsoft.github.io/presidio/analyzer/) for detecting PII in text and [OPA](https://www.openpolicyagent.org/docs) for evaluating structured policy input. If an existing tool covers the need, document how to use it. If the problem fails to recur across independent developers, record the evidence and stop or narrow the work.

## Phase 2 · One small tool-call check (conditional)

Proceed if Phase 1 establishes a recurring gap, clears independent reproduction and confirms a technical owner. Select one synthetic tool request, such as sending a file excerpt to an external API. Use existing components where suitable to check unnecessary fields, destination and approved scope, then report the rule and evidence. Record misses and false positives. Target about three external developers independently testing the same check against a baseline and reporting whether they would reuse it. This check is proposed.

## Phase 3 · Developer use (conditional)

If independent testing shows value and facilitator capacity is confirmed, target one 60–75 minute workshop or test session with 6–8 learners. Seek one team willing to try the check in a follow-up or discuss an integration. Treat that conversation, repeat use and willingness to pay as separate evidence. Record completion, issues, contributions and follow-up rather than counting attendance as adoption.

The existing transaction lab can serve as a teaching baseline when relevant. Recruit participants who prefer Chinese instruction and can run a small script.

1. **Baseline (15 minutes):** With existing resources, ask each learner to inspect a fictional transaction and interpret a sample receipt. Record errors, time, and help required.
2. **Build (25 minutes):** Run [Privacy Boundary Lab](starter/privacy-lab.md), cancel once, then approve the two local sends and compare their mined inputs. Allow pairing for setup and record that help separately.
3. **Transfer task (15 minutes):** Give each learner a different synthetic proposal and sample receipt. Without step-by-step coaching, have them flag the unnecessary data and its audience, explain who authorizes and signs, and identify what remains visible after data minimization. Record technical interruptions separately from conceptual errors.
4. **Exit and follow-up (5 minutes plus an opt-in check at about 30 days):** Ask for a blocking issue or documentation correction. Look for a concrete artifact at follow-up (reproduced exercise, issue, PR, or another app), and publish response and nonresponse counts separately.

Use an anonymous local worksheet with cohort code, baseline and transfer result by task, type of help (none, setup, conceptual), first blocker, follow-up opted in, response, and artifact category. Report aggregates and examples with consent. Keep scheduling contacts separate and discard identifiable records when follow-up is complete. The small pre/post comparison informs lesson design and cannot establish causal impact.

## Milestones and decision

| Gate | Owner | Acceptance |
| --- | --- | --- |
| Independent reproduction and need | Clare leads discovery. Technical review and PC's involvement are pending confirmation. | Capture the reproduction, published fixes and repeated use case before opening Phase 2. Resolve blockers that would invalidate the exercise. |
| Tool-call check | Technical owner to be confirmed | Review the comparison with existing tools and independent test findings before opening Phase 3. |
| Workshop learning check | Clare | Target: at least two-thirds of a minimum six learners independently pass all three transfer checks. Record completion, the denominator and missing data. |
| Continued building and delivery capacity | Clare + technical reviewer | Target: at least two learners show a concrete follow-on artifact within about 30 days. Confirm reviewer time and facilitator coverage. Publish aggregate evidence, failures and fixes, and a decision to stop, revise, or expand. |

If results are mixed, revise one bottleneck and repeat the short exercise. Publish the evidence behind a decision to continue, narrow or stop. A repeatable case, documented test and independent contribution are useful outcomes on their own.

## Research contexts

- **Completed · Ethereum.** The local lab compares two mined transaction inputs and receipts. Independent reproduction remains pending. [Experiment guide](starter/privacy-lab.md)
- **Proposed validation · General AI tools and Sentient.** Test one generic mail, file or API call first. Sentient's open ROMA framework is a reference for agent execution and toolkits. A Sentient-specific check or integration would require separate validation. [ROMA source](https://github.com/sentient-agi/ROMA)
- **Future exploration · Midnight.** Explore whether an application can prove eligibility while keeping the underlying attributes private. Compact supports private witness inputs and zero-knowledge proofs, with explicit disclosure for values made public. A practical eligibility flow still needs a trusted source for the claim, a verifier policy and review of public outputs and metadata. [Midnight Compact guide](https://docs.midnight.network/guides/build-a-private-smart-contract)

Tool development and developer education or ecosystem services are possible future activities. Track interest in actual use or paid pilots separately from event participation and funding.

## Costs, maintenance and risks

Track preparation, review, facilitation and follow-up time separately. Record estimates, actual costs and volunteer time if a facilitated session takes place. Use those figures and the transfer task results to assess the effort per learner.

- **Technical review:** No workshop is scheduled without a reviewer. Keep self-study available if there is no facilitator.
- **Recruitment and bias:** Prior meetup attendees may be unusually engaged. Document channels and prior experience, and avoid treating the sample as representative.
- **Safety and setup:** Use disposable local accounts and a read-only Sepolia path by default. Log setup friction separately. Use a known existing public receipt if faucets or a test wallet are unavailable.
- **Privacy and retention:** Publish aggregate outcomes and permissioned artifacts only. Treat lack of follow-up response as unknown. Triage tutorial failures through the repository's issues and link fixes in the pilot report.
