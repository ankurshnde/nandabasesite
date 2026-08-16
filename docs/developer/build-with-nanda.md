---
title: Build with NANDA - Quickstart Tutorial
description: Practical developer quickstart for implementing an autonomous civic agent.
---

# Build with NANDA

This tutorial outlines the steps to build, test, and deploy a minimal autonomous agent using the Python `nanda-core` library.

---

## 1. Environment Setup

Install the primary development package:

```bash
pip install nanda-core
```

---

## 2. Basic Agent Implementation

Create a Python file named `incident_agent.py`:

```python
import asyncio
from nanda import Agent, SwarmMesh, ActionConstraint

class IncidentTriageAgent(Agent):
    name = "IncidentTriage"
    role = "MunicipalRouter"
    constraints = [
        ActionConstraint.VERIFIABLE_LOGGING,
        ActionConstraint.PRIVACY_REDACTION
    ]

    async def on_message(self, event, context):
        # Triage and categorize incoming civic report
        classification = await self.reason(
            prompt=f"Categorize severity and municipal department for: {event.payload}"
        )
        
        # Broadcast decision across the Swarm Mesh
        await self.broadcast(
            channel="municipal.routing",
            data={
                "incident_id": event.id,
                "classification": classification,
                "status": "ROUTED"
            }
        )

async def main():
    mesh = SwarmMesh(endpoint="grpc://127.0.0.1:50051")
    agent = IncidentTriageAgent()

    async with mesh.connect():
        await mesh.register(agent)
        print("Agent successfully registered to Swarm Mesh. Awaiting events...")
        await agent.run_forever()

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 3. Local Test Execution

To simulate events locally before production rollout:

```bash
# Launch the NEST test harness
nanda-nest start --preset=civic-testbed

# In a separate terminal, start your agent
python incident_agent.py
```

---

## 4. Key Agent APIs

### Memory Graph Access
```python
await agent.memory.store(key="incident:101", value={"sector": 4, "severity": "HIGH"})
records = await agent.memory.query("incidents in sector 4")
```

### Cryptographic Action Attestation
```python
proof = await agent.generate_proof(action="DISPATCH_MEDICAL")
print(f"Attestation Hash: {proof.hash}")
```
