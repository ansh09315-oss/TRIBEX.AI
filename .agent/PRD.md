# TribeX AI — Product Requirements Document (PRD)
## Unified AI Scholarship & Fellowship Management Ecosystem
**Client:** Ministry of Tribal Affairs (MoTA), Government of India  
**System Architecture:** Offline-First PWA (BLE Mesh) + Zero-Knowledge SNARK Verification + Inter-Ministerial Deduplication + Automated 7-Day SLA Escalation + FastAPI Backend + PostgreSQL Ledger

---

### 1. Executive Summary
TribeX AI is a mission-critical, anti-fraud governance platform built to deliver frictionless scholarship and fellowship disbursements to Scheduled Tribe (ST) students across India, especially Particularly Vulnerable Tribal Groups (PVTGs) living in remote forest areas without cellular network coverage.

---

### 2. Core Problem Statements
1. **Connectivity Divide**: Forest-dwelling tribal students in remote reserves (e.g., Abujhmad, Bastar, Niyamgiri) have zero mobile network access and miss crucial application windows.
2. **Paperwork & Notarization Bottlenecks**: Students travel 40km+ to tehsils for manual affidavits, caste validity certificates, and income documents.
3. **Inter-Ministerial Double-Dipping**: Lack of cross-registry communication allows duplicate claims across MoTA, AICTE (Pragati/Saksham), UGC, and State Portals.
4. **Bureaucratic SLA Failure**: Processing takes 120–180 days on average, leading to high PVTG college dropout rates due to unpaid institutional fees.

---

### 3. Solution Pillars
1. **Offline-First PWA & BLE Mesh Sync**: P2P Bluetooth Low Energy packet hopping device-to-device from forest volunteers to village satellite gateways.
2. **Cross-Lingual AI Voice Assistant**: Native dialect speech-to-text parameter parsing for Santhali, Gondi, Bhili, Hindi, and English.
3. **Zero-Knowledge Cryptographic Trust Layer**: Verifies income and ST status via zk-SNARKs querying state registries without storing raw identity papers centrally.
4. **Unified Deduplication Hub**: Real-time cross-checks across 14 national and state registries using SHA-256 identifier hashes.
5. **Automated 7-Day SLA Escalation Engine**: Real-time countdown timer with automated escalation from College Officer to District Collector and MoTA Joint Secretary.
6. **Predictive Drop-Out Analytics for PVTGs**: Machine learning risk scores alerting district administrators to deploy mobile VLE vans and emergency stipend advances.
