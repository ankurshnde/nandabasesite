---
title: Reference Implementation - NANDA Architecture Blueprints
description: Production-grade blueprints and architectural specifications for edge swarms and municipal systems.
---

# Reference Implementation

This document details the architectural blueprints used in production deployments of NANDA systems.

---

## 1. KumbhDoot: Mass Gathering Distributed Swarm

The KumbhDoot architecture is designed for extreme network density scenarios where tens of thousands of users submit requests simultaneously over degraded cellular infrastructure.

```mermaid
graph TD
    subgraph Edge Layer
        User[Pilgrim Voice / Text Request] --> Gateway[NANDA Edge Gateway Node]
        Sensor[Density &amp; Flow Sensor] --> Gateway
    end

    subgraph Mesh Swarm Core
        Gateway --> Router[Swarm Dispatch Router]
        Router --> Guard[Policy &amp; Verification Layer]
        Guard --> UnitMedical[Medical Emergency Agent]
        Guard --> UnitRoute[Dynamic Route Guide Agent]
        Guard --> UnitLost[Missing Persons Agent]
    end

    subgraph Municipal Services
        UnitMedical --> Ambulance[Municipal Emergency Services]
        UnitRoute --> Displays[Public Signage Network]
    end
```

### Architectural Properties:
- **Local Fallback Inference**: 1.5B/3B parameter quantized SLMs running locally on field gateways ensure essential query processing continues during internet dropouts.
- **Multilingual Speech Pipeline**: Phonetic transcription optimized for low-resource Indic regional dialects.
- **Gossip State Consensus**: Decentralized state synchronization among neighboring edge gateways.

---

## 2. Civic Agents: Complaint Triage Pipeline

```mermaid
stateDiagram-v2
    [*] --> Ingest: Citizen Report Ingestion
    Ingest --> Classify: NLP Intent &amp; Priority Classification
    Classify --> Deduplicate: Geospatial Clustering
    Deduplicate --> Assign: Department Routing
    Assign --> ProofGen: Cryptographic Attestation Generation
    ProofGen --> [*]: Citizen Notification Dispatched
```

---

## Reference Code Repositories

| Component | Repository | Stack |
| :--- | :--- | :--- |
| **Swarm Router Core** | `nandainitiative/swarm-core` | Rust, gRPC, Protobuf |
| **KumbhDoot Gateway** | `nandainitiative/kumbhdoot-edge` | Python, C++, PyTorch |
| **Civic Agents Service** | `nandainitiative/civic-mesh` | Python, FastAPI, SQLite |
| **Verification Ledger** | `nandainitiative/zk-attestation` | Go, Solidity |
