---
title: NANDA Index - Research
description: The first hop in agent discovery, mapping stable Subject Identities to authoritative discovery objects.
---

# NANDA Index {: .nanda-main-title }

The **NANDA Index** is the first hop in agent discovery. It maps a stable Subject Identity—such as a domain, email address, DID, platform identifier, or workload identifier—to the next authoritative object: an AI Catalog, a DNS-AID path, an A2A Agent Card, an MCP descriptor, or a subject-authorized gateway.

Using the city analogy: **A2A** is the streets, **MCP** is the tools in the building, the **NANDA Index** is the address system, and **AgentFacts** is the passport. After the first hop, agents communicate peer-to-peer; the Index is not in the data path.

---

## Architectural Model & Operational Flow

The IETF specification divides agent discovery into four separable architectural roles:

1. **Representation Layer**: Standardized descriptors and manifests, including AI Catalog (`application/ai-catalog+json`), A2A Agent Cards (`application/a2a-agent-card+json`), and MCP server descriptors.
2. **Resolution Layer**: Resolves a stable Subject Identity to a terminal target (via direct DNS paths or a configured NANDA Index registry).
3. **Discovery Layer**: Fetches the selected descriptor, subject-owned catalog, or subject-authorized gateway.
4. **Infrastructure Layer**: Distributed registries, storage engines, and immutable audit logs that manage, validate, and revoke bindings.

### The Resolution Pipeline

Every interaction follows a clean, single-hop discovery sequence:

```
Subject Identity
      │
      ▼
Direct DNS or Registry-Assisted Resolution (NANDA Index)
      │
      ▼
Terminal Descriptor (A2A Agent Card, MCP Descriptor, or Gateway)
      │
      ▼
Protocol-Specific Verification & Authorization (e.g. AgentFacts)
      │
      ▼
Peer-to-Peer Agent Invocation (A2A, MCP, HTTPS)
```

Once resolution locates the target, invocation occurs directly between agents; the Index is completely out of the data path.

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

* **Split ownership & deployment**  
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

The precise schema depends on the layer: the IETF draft defines a **Resolution Target Object**, while the running implementation exposes an **IndexRecord**. Full definitions are maintained in [IETF draft-01 §5](https://datatracker.ietf.org/doc/draft-raskar-agentic-web-federated-resolution/01/) and the [GitHub IndexRecord](https://github.com/projnanda/nanda-index-v2).

| Field | Meaning |
| :--- | :--- |
| `subject` / `identifier` | Stable identity being resolved; the implementation commonly represents it as a URN. |
| `subjectType` | Identity class: `domain`, `agent-name`, `email`, `uri`, `urn`, `did`, `platform`, or `workload`. |
| `media_type` / `targetType` | IANA media type or protocol of the next object (e.g., `application/a2a-agent-card+json`). |
| `targetUrl` / `registry_url` | HTTPS location of the terminal descriptor, authorized catalog, card host, or gateway. |
| `method` | Resolution method: `artifact` (terminal descriptor/card) or `gateway` in draft-01. |
| `ttl` / `freshness` | Cache lifetime, validity bounds (`validFrom`, `expiresAt`), update time, or related freshness. |
| `status` | Implementation lifecycle state: `pending`, `active`, or `suspended`. |
| `authority` | Verifiable evidence binding the subject identity to the target or publisher. |
| `publisher` | Structured identity of the party publishing the record. |

### Wire Format Example

Here is a conforming **Resolution Target Object** binding an agent identity to an A2A Agent Card with domain authority evidence:

```json
{
  "subject": "orders@moon-bakery.example",
  "subjectType": "agent-name",
  "method": "artifact",
  "targetType": "application/a2a-agent-card+json",
  "targetUrl": "https://cards.agenthost.example/moon-bakery/orders.json",
  "authority": {
    "type": "https-domain-challenge",
    "issuer": "https://registry.example",
    "evidenceUrl": "https://moon-bakery.example/.well-known/proof.json",
    "expiresAt": "2026-12-31T23:59:59Z"
  },
  "revocationUrl": "https://registry.example/revocations/moon-orders"
}
```

### The HTTPS Resolution Interface

The registry exposes a simple REST endpoint (`POST /resolve`) bounded by standard HTTP semantics:

```http
POST /resolve HTTP/1.1
Host: registry.nandaindex.example
Content-Type: application/json
Accept: application/ai-catalog+json

{
  "identity": "orders@moon-bakery.example",
  "identityType": "agent-name",
  "maxResults": 10,
  "acceptedMethods": ["artifact", "gateway"]
}
```

- **Success (`200 OK`)**: Returns an `application/ai-catalog+json` envelope containing the matching `application/agent-resolution-target+json` entries.
- **Errors**: Formatted in RFC 9457 `application/problem+json` (distinguishing between `unauthorized`, `unverifiable`, `stale`, and `revoked` outcomes without leaking private credentials).

> Clients resolve identities; they do not scrape the Index to search for capabilities.

---

## Resolution Paths

* **Direct Resolution (No Index Required):**  
  Used when an organization operates native DNS discovery infrastructure.  
  `DNS-AID (_index._agents.<domain>)` or well-known catalog (`/.well-known/ai-catalog.json`) → select descriptor → verify and authorize → invoke.

* **Registry-Assisted Resolution (NANDA Index):**  
  Used when identities lack usable DNS Discovery Anchors or use split hosting.  
  `resolve(subject)` on NANDA Index registry → terminal descriptor, subject-owned catalog, or authorized gateway → verify and authorize → invoke through A2A, MCP, or HTTPS.

The v2 implementation expresses the three-hop chain as:  
`resolve(URN)` → **registry or Agent Card host** → **Agent Card** → **runtime**.  
See the [nanda-index-v2 repository](https://github.com/projnanda/nanda-index-v2) on GitHub.

---

## Who It Is For

The IETF specification details three primary deployment archetypes:

* **Enterprise (Direct with Fallback):**  
  Organizations already operating an AI Catalog, DNS-AID path, or corporate gateway. The Index provides external ecosystem discovery, multi-region federation visibility, migration support, and anti-squatting protection.
* **SMB (Split Hosting):**  
  Small businesses owning a brand domain on basic hosting without agent-specific DNS infrastructure. A registry links their brand identity (`orders@moon-bakery.com`) to an Agent Card hosted by a specialized provider, while the agent runtime executes on cloud compute.
* **Individual & Personal Workloads:**  
  Developers, researchers, and individuals operating personal agents on local hardware (e.g., Mac mini, OpenClaw runtime) or private cloud. They can publish bindings under an email address (`john@example.net`) or DID, authenticated through account-level proofs without needing domain ownership.

---

## Where to Read Next

* **Design Paper:** [*A Global Switchboard for the Agentic Web*](https://nandaindex.org/paper.pdf), by Ramesh Raskar, Pradyumna Chari, Luca Muscariello, Samuel Sharaf, Karan Bharadwaj, and Vijoy Pandey.
* **Live Site:** [nandaindex.org](https://nandaindex.org/).
* **Internet-Draft:** [draft-01](https://datatracker.ietf.org/doc/draft-raskar-agentic-web-federated-resolution/01/) is an individual Internet-Draft (*Registry-Assisted Discovery for AI Agents and Workloads Without DNS Discovery Anchors*) with intended Informational status and an expiry date of 21 January 2027.
* **Reference Implementation:** [projnanda/nanda-index-v2](https://github.com/projnanda/nanda-index-v2), licensed under Apache-2.0.
* **Why Not Only DNS:** [*Beyond DNS: Unlocking the Internet of AI Agents via the NANDA Index and Verified AgentFacts*](https://arxiv.org/abs/2507.14263). Its large-scale and rapid-resolution claims describe architecture goals and prototypes, not shipped service guarantees.
* **AgentFacts / Passport:** See the separate **AgentFacts** page at [host39.org](http://host39.org).
* **Project Context:** Explore the [Research Overview](../research/index.md) and full [Publications](index.md) list.
