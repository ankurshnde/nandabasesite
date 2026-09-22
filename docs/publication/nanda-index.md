---
title: NANDA Index - Research
description: The first hop in agent discovery, mapping stable Subject Identities to authoritative discovery objects.
---

# NANDA Index {: .nanda-main-title }

The **NANDA Index** is the first hop in agent discovery. It maps a stable Subject Identity—such as a domain, email address, DID, platform identifier, or workload identifier—to the next authoritative object: an AI Catalog, a DNS-AID path, an A2A Agent Card, an MCP descriptor, or a subject-authorized gateway.

Using the city analogy: **A2A** is the streets, **MCP** is the tools in the building, the **NANDA Index** is the address system, and **AgentFacts** is the passport. After the first hop, agents communicate peer-to-peer; the Index is not in the data path.

---

## What the Index is Not

The index is:

* **Not an agent runtime or agent framework.**
* **Not AgentFacts, or the passport**; rich signed metadata lives off-index.
* **Not a capability search engine**; capability discovery happens after resolution.
* **Not an app store, portal, recommendation service, or ranking layer.**
* **Not a host for agents or cards**; it stores pointers to their locations.
* **Not always in the critical path**; when a requester already has a DNS Discovery Anchor—such as an AI Catalog, DNS-AID record, or organization gateway—it uses that path directly.
* **Not a specified federation of registries in draft-01**; multiple independent registries may exist, but inter-registry forwarding is outside that draft’s scope.

---

## Design Properties

* **Lean pointer, fat facts**  
  An index record is a small routing object that identifies the next object to retrieve. Endpoints, skills, authentication details, compliance claims, and other rich metadata remain in AgentFacts or the terminal descriptor.

* **Split ownership**  
  The identity owner, descriptor host, and runtime operator may be three different parties. Hosting an Agent Card does not establish ownership; Authority Evidence binds the subject identity to the target or authorized publisher.

* **Permissionless publication**  
  An enterprise, small business, or individual can publish a binding without operating DNS-AID, an AI Catalog, and an agent runtime as one stack. The public identity, descriptor, runtime, and registry record may be managed separately.

* **Identity-first, not domain-only**  
  Subjects can include domains, email accounts, DIDs, platform identities, URIs, URNs, and workload identifiers. DNS-AID remains the direct path when the requester already knows the publishing domain and its authoritative discovery endpoint.

* **Protocol-agnostic quilt**  
  The Index does not require every target to use one discovery or invocation protocol. Fields such as `media_type` or `targetType` tell the resolver whether the next object is an AI Catalog, Agent Card, MCP descriptor, gateway, or another documented object.

* **Optional in the critical path**  
  A client uses direct resolution when a known DNS-anchored path is available. It uses registry-assisted resolution when that path is unavailable, unsuitable for the identity type, or not selected by local policy.

* **Freshness and revocation**  
  TTL, lifecycle status, validity periods, and revocation information allow bindings to be cached without treating them as permanent. Withdrawal and compromise handling are design requirements: a revoked target must not remain usable only because a cached record has not expired.

* **Authority and anti-squatting**  
  Bindings carry evidence that the publisher is authorized to associate the subject with the target. Conflict handling, migration, recovery, and anti-squatting considerations are described in [IETF draft-01 §§9–10](https://datatracker.ietf.org/doc/draft-raskar-agentic-web-federated-resolution/01/); the draft does not establish a universal governance authority.

* **Least disclosure at the index**  
  A public index record contains only what is needed to reach and interpret the next hop. Capability search, private facts, access policy, consent, and execution authorization remain off-index.

---

## What an Index Record Contains

The precise schema depends on the layer: the IETF draft defines a **Resolution Target Object**, while the running implementation exposes an **IndexRecord**. The full definitions remain in [IETF draft-01 §5](https://datatracker.ietf.org/doc/draft-raskar-agentic-web-federated-resolution/01/) and the [GitHub IndexRecord](https://github.com/projnanda/nanda-index-v2).

| Field | Meaning |
| :--- | :--- |
| `subject` / `identifier` | Stable identity being resolved; the implementation commonly represents it as a URN. |
| `subjectType` | Identity class, such as domain, email, DID, platform, URI, URN, or workload. |
| `media_type` / `targetType` | Type of the next object or gateway response. |
| `targetUrl` / `registry_url` | HTTPS location of the terminal descriptor, authorized catalog, card host, or gateway. |
| `method` | Resolution method: artifact or gateway in draft-01. |
| `ttl` / `freshness` | Cache lifetime, validity bounds, update time, or related freshness information. |
| `status` | Implementation lifecycle state: pending, active, or suspended. |
| `authority` | Evidence binding the subject identity to the target or publisher. |
| `publisher` | Structured identity of the party publishing the record. |

> Clients resolve identities; they do not scrape the Index to search for capabilities.

---

## Resolution Paths

* **Direct Resolution:**  
  DNS-AID, a well-known AI Catalog, or an organization gateway → select the relevant descriptor → verify and authorize → invoke. The Index is not required.

* **Assisted Resolution:**  
  `resolve(subject)` on a NandaIndex registry → terminal descriptor, subject-owned catalog, or authorized gateway → verify and authorize → invoke through A2A, MCP, or HTTPS.

The v2 implementation expresses the three-hop chain as:  
`resolve(URN)` → **registry or Agent Card host** → **Agent Card** → **runtime**.  
See the [nanda-index-v2 repository](https://github.com/projnanda/nanda-index-v2) on GitHub.

---

## Who It Is For

* **Enterprise:** Already operates an AI Catalog, DNS-AID path, or organization gateway; an Index record can serve as fallback, federation visibility, migration support, or anti-squatting protection.
* **SMB:** May own a domain without operating agent-discovery infrastructure; its card can be hosted by one provider and its runtime by another.
* **Individual:** Can use an email or platform identity without owning a domain.

---

## Where to Read Next

* **Design Paper:** [*A Global Switchboard for the Agentic Web*](https://nandaindex.org/paper.pdf), by Ramesh Raskar, Pradyumna Chari, Luca Muscariello, Samuel Sharaf, Karan Bharadwaj, and Vijoy Pandey.
* **Live Site:** [nandaindex.org](https://nandaindex.org/).
* **Internet-Draft:** [draft-01](https://datatracker.ietf.org/doc/draft-raskar-agentic-web-federated-resolution/01/) is an individual Internet-Draft with intended Informational status and an expiry date of 21 January 2027.
* **Reference Implementation:** [projnanda/nanda-index-v2](https://github.com/projnanda/nanda-index-v2), licensed under Apache-2.0.
* **Why Not Only DNS:** [*Beyond DNS: Unlocking the Internet of AI Agents via the NANDA Index and Verified AgentFacts*](https://arxiv.org/abs/2507.14263). Its large-scale and rapid-resolution claims describe architecture goals and prototypes, not shipped service guarantees.
* **AgentFacts / Passport:** See the separate **AgentFacts** page at [host39.org](http://host39.org).
* **Project Context:** Explore the [Research Overview](../research/index.md) and full [Publications](index.md) list.
