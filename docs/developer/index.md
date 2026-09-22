---
title: Developer Overview - NANDA
description: Technical architecture, SDK documentation, and developer resources for the NANDA platform.
---

# Developer Documentation

The NANDA Developer Portal provides technical references, SDK documentation, and architecture blueprints for building, simulating, and deploying autonomous agents.

---

## Core Documentation Sections

- **[Build with NANDA](build-with-nanda.md)**: Step-by-step tutorial for writing, registering, and running your first autonomous agent on the Swarm Mesh.
- **[Open Source Contribution](open-source.md)**: Guidelines for local environment configuration, testing, code standards, and contributing to core repositories.

---

## Technical Stack Overview

```
+-------------------------------------------------------------+
|                      Application Layer                      |
|         (KumbhDoot, DigitDoot, Civic Agents, Town)          |
+-------------------------------------------------------------+
|                      NANDA Agent SDK                        |
|        (Memory Graphs, State Machine, Tool Interfaces)      |
+-------------------------------------------------------------+
|                      Swarm Protocol                         |
|   (Gossip Discovery, Consensus, Resource Micro-Auctions)   |
+-------------------------------------------------------------+
|               Formal Verification & ZK Ledger               |
|            (Cryptographic Action Proof Generation)          |
+-------------------------------------------------------------+
|                    Edge Inference Engine                    |
|             (Quantized SLMs, WebAssembly Runtimes)          |
+-------------------------------------------------------------+
```

---

## SDK Packages

```bash
# Python Core SDK
pip install nanda-core

# TypeScript / Node.js SDK
npm install @nanda/agent-sdk

# Evaluation and Benchmark CLI
pip install nanda-benchmark
```
