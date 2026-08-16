---
title: Research - NANDA
description: Foundational research into open infrastructure, identity, discovery, resolution, trust, and governance for the Internet of AI Agents.
---

# Research

NANDA research explores the infrastructure required for an open Internet of AI Agents.

AI agents are moving from isolated systems toward networked environments in which agents can discover resources, communicate with other agents, coordinate tasks, and operate across organizational and technical boundaries. This creates infrastructure problems that are different from those addressed by conventional web services and isolated AI systems.

NANDA research examines these problems across identity, discovery, resolution, interoperability, trust, coordination, evaluation, and governance.

The work combines technical specifications, architectural proposals, comparative studies, prototypes, experiments, and position papers. Individual projects address different parts of the emerging agentic infrastructure and are designed to be complementary rather than dependent on a single framework or implementation.

---

## Research Scope

The research is organized around a set of infrastructure questions.

### How do agents identify one another?

An agent needs an identity that remains meaningful even when its deployment, endpoint, capabilities, or communication protocol changes.

Research on agent identity and naming examines how large populations of agents can be assigned persistent names and identifiers while separating identity from the context in which an agent is resolved.

This includes work on agent names, namespaces, identifiers, and the relationship between identity and verifiable metadata.

### How do agents discover one another?

An agent cannot collaborate with another agent if it does not know that the other agent exists or what it can do.

Agent discovery concerns finding agents and resources that satisfy a particular capability or task requirement. This becomes more complex when agents are distributed across different organizations, registries, platforms, and protocols.

NANDA research examines discovery architectures that can operate across these boundaries while allowing different registries and organizations to retain control over their own systems.

### How should an agent name become a communication path?

Discovery and communication are different problems.

Knowing the identity of an agent does not necessarily reveal the endpoint that should be used to communicate with it. An agent may have multiple endpoints, move between deployments, operate under different network conditions, or require different communication paths for different requesters.

Research on dynamic and adaptive resolution examines how an agent identity can be resolved into an appropriate communication endpoint based on context such as location, system conditions, capabilities, and security.

This separates the stable identity of an agent from the mechanisms used to reach it.

### How can agents work across different ecosystems?

The agent ecosystem is developing through multiple protocols, platforms, frameworks, and registries.

Agents may communicate through A2A, MCP, HTTPS, or other mechanisms while being described through different metadata formats and discovered through different systems.

NANDA research examines interoperability across these ecosystems. The objective is not to require every agent to use the same internal technology, but to identify the minimum infrastructure and standards required for independently developed systems to participate in a broader network.

---

## Trust and Verification

Networked agents create a different trust problem from conventional web services.

A domain certificate can establish control of a domain, but it does not by itself establish what an agent can do, who operates it, whether its capabilities are genuine, or whether information about it has changed.

NANDA research therefore examines trust as a combination of identity, capability claims, provenance, integrity, credentials, and other evidence.

### Verifiable Agent Information

AgentFacts provides a model for representing information about agents as structured, verifiable claims.

These claims can describe capabilities, endpoints, authentication information, provenance, and other properties relevant to discovery and interaction.

The broader research explores how such claims can be issued, verified, updated, and revoked without requiring all agent information to be stored in one central system.

### Privacy-Preserving Discovery

Discovery itself can reveal information.

A request for a particular capability can expose an organization's interests, internal workflows, or relationships with other systems. This becomes more important when agents operate in commercial, personal, healthcare, financial, or other sensitive environments.

NANDA research explores discovery architectures that minimize unnecessary disclosure while still allowing agents and organizations to find appropriate resources.

---

## Agent Infrastructure

A central research question is how existing Internet infrastructure should evolve for an environment containing potentially very large populations of dynamic agents.

Traditional systems such as DNS and static service registries were designed around relatively stable resources. Agent systems introduce frequent metadata changes, dynamic endpoints, changing capabilities, distributed ownership, and machine-to-machine interaction.

Research therefore examines which existing Internet mechanisms can be reused, which need to be extended, and where new infrastructure primitives may be required.

This work includes research into:

- Agent names and namespaces
- Agent registries
- Federated registries
- Lightweight indexes
- Dynamic resolution
- Capability metadata
- Verifiable credentials
- Privacy-preserving discovery
- Cross-registry interoperability

The NANDA Index is one technical outcome of this line of research. It is maintained as a separate specification and implementation area rather than being treated as the definition of the entire NANDA research program.

[Explore NANDA Index](../publication/nanda-index.md)

---

## Interoperability

The emerging agent ecosystem contains multiple approaches to communication and discovery.

Rather than assuming that one protocol will become universal, NANDA research examines how different ecosystems can interoperate while retaining their existing infrastructure.

The Web of Agents position proposes an interoperable environment based on a small set of common foundations for agent-to-agent messaging, interaction interoperability, state management, and discovery.

The underlying principle is that interoperability should occur at clearly defined boundaries. An agent should be able to participate in a larger ecosystem without exposing its internal implementation or abandoning the protocol and infrastructure chosen by its operator.

[Read Web of Agents](../publication/index.md)

---

## Coordination

Communication between agents does not necessarily produce coordinated behavior.

As agent populations become larger, agents may need to adapt their actions based on information received from other agents and changes in their shared environment.

The Ripple Effect Protocol explores a coordination mechanism in which agents communicate not only their current decisions but also lightweight information describing how those decisions would change when relevant environmental conditions change.

This introduces the concept of sensitivity sharing, allowing neighboring agents to gain visibility into decision flexibility rather than seeing only the final decision.

The research investigates whether such signals can help decentralized agent populations coordinate without requiring a central controller.

[Read Ripple Effect Protocol](../publication/index.md)

---

## Evaluation and Testing

Agent evaluation cannot be reduced to isolated task accuracy when agents operate as part of a network.

An agent may perform well on an individual benchmark while performing poorly when interacting with other agents, operating under network latency, receiving incomplete information, encountering changing conditions, or participating in a larger coordination process.

NANDA research therefore examines both individual agent evaluation and system-level evaluation.

### Technical Sandboxes

Technical sandboxes provide controlled environments in which agents can be evaluated under realistic but safeguarded conditions.

Research on sandboxes examines dimensions including:

- Reasoning
- Tool and API use
- Bias and language
- Robustness
- Safety
- Policy alignment
- Multi-agent coordination

The research also distinguishes individual agent competence from system fitness.

### System Fitness

System fitness describes the ability of populations of heterogeneous agents to coordinate under realistic conditions such as latency, partial information, changing behavior, and adversarial conditions.

A live testbed described in the sandbox research deploys heterogeneous agents across regions and measures network behavior, agent interactions, reputation, discovery, and coordination.

This allows infrastructure choices to be evaluated as systems rather than only as isolated components.

[Read Sandboxes for the Internet of Agents](../publication/index.md)

---

## Registry Research

Agent registries are becoming an important part of agent infrastructure, but different registry architectures make different assumptions about control, identity, metadata, security, and federation.

NANDA research has examined several approaches, including:

- MCP Registry
- A2A Agent Cards
- AGNTCY Agent Directory Service
- Microsoft Entra Agent ID
- NANDA AgentFacts

The comparative work evaluates these approaches across security, authentication, scalability, and maintainability.

One conclusion from this work is that the ecosystem is unlikely to converge on a single registry architecture. Interoperability between different registry models is therefore an important research direction.

The research also examines the separation between stable identity information and dynamic capability metadata, which allows agent information to change without requiring continuous modification of a central index.

[Read Registry Research](../publication/index.md)

---

## Governance

Technical infrastructure for autonomous agents also creates questions about accountability and institutional responsibility.

Agents can operate across organizations, jurisdictions, and technical systems. They can communicate with one another, delegate tasks, and make decisions without requiring a human to approve every interaction.

This creates a need to consider how identity, provenance, registration, oversight, and governance mechanisms should work alongside technical infrastructure.

Research on multistakeholder governance examines registry architectures inspired in part by the experience of Internet infrastructure such as DNS, while recognizing that the agentic environment introduces additional requirements around autonomy, provenance, monitoring, and machine-to-machine interaction.

The research considers governance models in which responsibility is distributed across technical operators, registries, organizations, regulators, researchers, and other stakeholders rather than concentrated in a single authority.

[Read Governance Research](../publication/index.md)

---

## Research on Existing Infrastructure

NANDA research does not assume that new infrastructure is automatically necessary.

One research direction examines whether existing Internet mechanisms can be extended to support the requirements of autonomous agents, where existing mechanisms are insufficient, and where purpose-built infrastructure may be justified.

This includes comparison of:

- DNS-based approaches
- Existing service registries
- Enterprise directories
- Agent-specific registries
- Federated discovery systems
- Decentralized directory architectures
- Capability-based discovery
- Identity and credential systems

The objective is to understand the architectural trade-offs before introducing new infrastructure.

---

## Research Projects

NANDA research currently includes work across several connected areas:

### NANDA Index
A federated infrastructure for agent discovery, identity, and resolution.  
[Explore NANDA Index](../publication/nanda-index.md)

### AgentFacts
A model for representing verifiable information and claims about AI agents.  
[Explore AgentFacts](../publication/nanda-index.md#trust)

### Adaptive Resolution
Research into dynamic selection of communication endpoints based on the context in which an agent is being resolved.  
[Explore Adaptive Resolution](../publication/nanda-index.md#resolution)

### Web of Agents
Research into interoperability across agent ecosystems and the minimum foundations required for collaborative agents to operate across technical and organizational boundaries.  
[Read the position](../publication/index.md)

### Ripple Effect Protocol
Research into decentralized coordination through sensitivity sharing between agents.  
[Read the paper](../publication/index.md)

### Agent Sandboxes
Research into technical environments for evaluating individual agents and populations of agents under realistic conditions.  
[Read the paper](../publication/index.md)

### Agent Registry Research
Comparative and architectural research into centralized, enterprise, federated, and decentralized approaches to agent registries.  
[Read the research](../publication/index.md)

### Agentic Internet Governance
Research into governance, accountability, provenance, registration, and multistakeholder infrastructure for autonomous agents.  
[Read the paper](../publication/index.md)

---

## Publications

NANDA research is published through technical papers, position papers, specifications, and working drafts.

### Technical and Architectural Research
- [Using the NANDA Index Architecture in Practice](../publication/index.md)
- [Beyond DNS: Unlocking the Internet of AI Agents via the NANDA Index and Verified AgentFacts](../publication/index.md)
- [Evolution of AI Agent Registry Solutions](../publication/index.md)
- [NANDA Adaptive Resolver](../publication/index.md)

### Interoperability and Coordination
- [Collaborative Agentic AI Needs Interoperability Across Ecosystems](../publication/index.md)
- [Ripple Effect Protocol: Coordinating Agent Populations](../publication/index.md)

### Evaluation
- [Towards Sandboxes for the Internet of Agents](../publication/index.md)

### Governance and Institutional Infrastructure
- [Toward a Multistakeholder Governance of the Agentic Internet](../publication/index.md)

### Architectural Questions
- [Upgrade or Switch: Do We Need a New Registry Architecture for the Internet of AI Agents?](../publication/index.md)

---

## Research Approach

NANDA research is organized around infrastructure problems rather than around a single product or implementation.

A research question may begin as an architectural problem, develop into a technical proposal, and then be evaluated through implementation or experimentation.

The resulting work can take several forms:

- **Position papers** establish architectural questions, motivations, and possible directions.
- **Technical papers** develop concrete architectures, mechanisms, and models.
- **Specifications** define interoperable structures, protocols, and interfaces.
- **Experiments** test proposed mechanisms under controlled or realistic conditions.
- **Implementations** provide working systems that allow architectural assumptions to be tested in practice.

These forms are connected. A specification can emerge from research, an implementation can expose new architectural questions, and experiments can challenge assumptions made in an earlier proposal.

---

## Design Principles

Several principles recur across the research:

- **Interoperability**: Agent infrastructure should support independently developed systems rather than require a single implementation.
- **Separation of Concerns**: Identity, discovery, resolution, communication, trust, and execution should remain distinct where their responsibilities differ.
- **Federated Operation**: Different organizations should be able to operate infrastructure while participating in a larger interoperable ecosystem.
- **Verifiability**: Important claims about agents should be capable of independent verification rather than relying solely on self-description.
- **Privacy**: Discovery and verification should minimize unnecessary exposure of identities, capabilities, relationships, and queries.
- **Operational Independence**: Organizations should be able to retain control over their own agents and infrastructure while making selected resources available to wider ecosystems.
- **Open Development**: Infrastructure that may become part of the public foundation of the agentic web should be developed through open specifications, implementations, experimentation, and community participation.

---

## Open Questions

The Internet of AI Agents is still developing, and many foundational questions remain open:

- How should agent identities remain stable as deployments change?
- How should agent capabilities be represented so that they can be discovered and verified?
- How should discovery operate when multiple independent registries contain overlapping information?
- How should resolution adapt to changing network, security, geographic, and operational conditions?
- How should trust be established when agents interact across organizational boundaries?
- How can privacy be preserved while maintaining useful discovery?
- How should different agent communication protocols interoperate?
- How can large populations of agents coordinate without requiring centralized control?
- How should agent populations be evaluated under realistic network and behavioral conditions?
- How should technical infrastructure interact with governance and regulatory systems?
- How should responsibility be distributed when autonomous agents operate across multiple organizations and jurisdictions?

These questions are not treated as a single problem. NANDA research approaches them as connected infrastructure problems whose solutions need to work together.

---

## Research and Specifications

Research and specifications serve different purposes within NANDA.

Research investigates problems, evaluates alternatives, develops architectures, and presents evidence.

Specifications define technical interfaces and structures that can be implemented independently.

The NANDA Index is therefore maintained separately as a technical specification rather than being described only as a research project.

[Explore Specifications →](../developer/index.md)

---

## Research and the Agentic Web

The long-term research direction is an open network in which agents can discover resources, establish trust, communicate across ecosystems, coordinate actions, and operate under appropriate technical and institutional constraints.

The objective is not to define a single architecture for every agent.

The objective is to develop the infrastructure and knowledge required for independently developed agent systems to participate in the same network.

---

## Explore

- [Research Projects](../projects/index.md)
- [Publications](../publication/index.md)
- [Writing Lab](../publication/writing-lab.md)
- [NANDA Index](../publication/nanda-index.md)
- [Developer Reference](../developer/index.md)
