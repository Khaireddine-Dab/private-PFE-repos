# 📊 Diagrammes de Séquence Détaillés: Détection de Fraude

## 1️⃣ Flux Principal Complet

```mermaid
sequenceDiagram
    participant User
    participant Server as Next.js
    participant Redis as Redis Cache
    participant DB as Supabase
    participant LLM as OpenRouter
    participant Monitor

    User->>Server: analyzeFraud(order_data)
    activate Server
    
    Server->>Redis: Check cache
    alt Cache HIT
        Redis-->>Server: Return cached result
        Note over Server: ⚡ 23µs
    else Cache MISS
        Server->>DB: Get order details
        Server->>DB: Get customer history
        Server->>DB: Get IP reputation
        
        Server->>Server: Collect 8 heuristic signals
        Note over Server: Signal aggregation
        
        Server->>Server: Compute heuristic score
        Note over Server: Score: 0-100
        
        alt Score ≥ 40
            Server->>LLM: Request AI analysis
            LLM-->>Server: AI reasoning + score
            Server->>Server: Combine scores (60% heur + 40% AI)
        end
        
        Server->>DB: Save fraud_analysis
        Server->>Redis: Cache result (3600s)
    end
    
    Server->>Monitor: Record metrics
    Note over Monitor: fraud_score, latency, etc.
    
    alt Final_Score ≥ 60
        Server->>Monitor: Trigger HIGH risk alert
        Monitor->>Monitor: Send notifications
    end
    
    deactivate Server
    Server-->>User: Return fraud_analysis result
```

---

## 2️⃣ Collecte des Signaux (Heuristiques)

```mermaid
sequenceDiagram
    participant Server
    participant DB
    participant Signal as Signal Engine

    Server->>Server: Start signal collection
    
    loop For each signal
        Server->>DB: Query relevant data
        DB-->>Server: Data returned
        
        Server->>Signal: Process signal
        activate Signal
        
        alt Signal 1: Montant Aberrant
            Signal->>Signal: Compare vs avg transaction
            Note over Signal: 0-35 points
        
        else Signal 2: Velocity Burst
            Signal->>Signal: Check last 1h transactions
            Note over Signal: 0-35 points
        
        else Signal 3: Géolocalisation
            Signal->>Signal: Check country mismatch
            Note over Signal: 0-20 points
        
        else Signal 4: Nouvel Compte
            Signal->>Signal: Check account age
            Note over Signal: 0-25 points (age < 7 days)
        
        else Signal 5a: CVV Mismatch
            Signal->>Signal: Compare CVV patterns
            Note over Signal: 0-30 points
        
        else Signal 5b: Chargebacks
            Signal->>Signal: Count chargebacks
            Note over Signal: 0-40 points (if > 3)
        
        else Signal 5c: VPN/Proxy
            Signal->>Signal: Check IP patterns
            Note over Signal: 0-15 points
        
        else Signal 8: Established Customer
            Signal->>Signal: Check transaction count
            Note over Signal: -15 points (if > 10 trans)
        end
        
        deactivate Signal
        Signal-->>Server: Signal {weight, value, score}
    end
    
    Server->>Server: Aggregate all signals
    Note over Server: Total score = Σ weights
```

---

## 3️⃣ Calcul du Score de Fraude

```mermaid
sequenceDiagram
    participant Server
    participant Math as Score Calculator
    participant LLM

    Server->>Math: Heuristic Signals[]
    activate Math
    
    Note over Math: HEURISTIC SCORE CALCULATION
    
    Math->>Math: Sum all signal scores
    Note over Math: Score = Signal1 + Signal2 + ... + Signal8
    
    Math->>Math: Normalize to 0-100
    Note over Math: If score > 100: score = 100
    
    Math-->>Server: Heuristic_Score (0-100)
    deactivate Math
    
    alt Heuristic_Score ≥ 40
        Note over Server: Suspicious level reached
        Server->>LLM: Request AI analysis
        activate LLM
        
        Note over LLM: AI ANALYSIS (OpenRouter)
        LLM->>LLM: Pattern matching
        LLM->>LLM: Contextual analysis
        LLM->>LLM: Risk assessment
        LLM->>LLM: Generate reasoning
        
        LLM-->>Server: {ai_score, reasoning, confidence}
        deactivate LLM
        
        Server->>Server: Combine scores
        Note over Server: Final = (Heur*0.6) + (AI*0.4)
    else Heuristic_Score < 40
        Note over Server: Low risk - skip AI
        Server->>Server: Final = Heuristic_Score
    end
    
    Server->>Server: Determine risk_level
    alt Final_Score ≥ 60
        Note over Server: HIGH risk
    else Final_Score 40-60
        Note over Server: MEDIUM risk
    else Final_Score < 40
        Note over Server: LOW risk
    end
```

---

## 4️⃣ Détermination du Risque et Actions

```mermaid
sequenceDiagram
    participant Server
    participant DB
    participant Decision as Decision Engine

    Server->>Decision: Final_Score + Signals
    activate Decision
    
    Decision->>Decision: Determine risk_level
    
    alt Final_Score ≥ 60
        Decision->>Decision: risk_level = 'HIGH'
        Decision->>Decision: recommendation = 'REJECT'
        Note over Decision: 🔴 BLOCK immediately
    
    else Final_Score 40-60
        Decision->>Decision: risk_level = 'MEDIUM'
        Decision->>Decision: recommendation = 'REVIEW'
        Note over Decision: 🟡 MANUAL REVIEW
    
    else Final_Score < 40
        Decision->>Decision: risk_level = 'LOW'
        Decision->>Decision: recommendation = 'APPROVE'
        Note over Decision: 🟢 ACCEPT
    end
    
    deactivate Decision
    Decision-->>Server: {risk_level, recommendation}
    
    Server->>DB: Save fraud_analysis with decision
    DB-->>Server: ✅ Saved
```

---

## 5️⃣ Système d'Alertes

```mermaid
sequenceDiagram
    participant Monitor as Monitoring
    participant AlertMgr as Alert Manager
    participant Email as Email Service
    participant Slack as Slack
    participant Datadog as Datadog

    Monitor->>Monitor: recordMetric(fraud_score)
    Monitor->>Monitor: checkThresholds()
    
    alt Final_Score ≥ 60
        Monitor->>AlertMgr: CRITICAL alert<br/>THRESHOLD_HIGH_RISK
        activate AlertMgr
        
        Note over AlertMgr: Alert triggered
        
        alt Email configured
            AlertMgr->>Email: sendAlert({<br/>subject: "Fraude élevée",<br/>body: alert_details,<br/>to: ops-team<br/>})
            Email-->>AlertMgr: ✅ Sent
        end
        
        alt Slack configured
            AlertMgr->>Slack: postMessage({<br/>channel: "#fraud-alerts",<br/>text: alert_details,<br/>color: "danger"<br/>})
            Slack-->>AlertMgr: ✅ Posted
        end
        
        alt Datadog configured
            AlertMgr->>Datadog: submitEvent({<br/>title: "High fraud",<br/>text: alert_details,<br/>priority: "high"<br/>})
            Datadog-->>AlertMgr: ✅ Logged
        end
        
        deactivate AlertMgr
        AlertMgr-->>Monitor: ✅ All alerts sent
    
    else Final_Score 40-60
        Monitor->>AlertMgr: WARNING alert
        Note over AlertMgr: Log only (no notification)
    
    else Final_Score < 40
        Monitor->>Monitor: Log safe order
        Note over Monitor: No alert
    end
```

---

## 6️⃣ Caching et Performance

```mermaid
sequenceDiagram
    participant Server
    participant Cache as Redis Cache
    participant DB

    Server->>Cache: GET cache:fraud:{order_id}
    
    alt Cache HIT (Valid)
        Cache-->>Server: Cached fraud_analysis
        Note over Server: ⚡ 23µs latency<br/>Return immediately
    
    else Cache MISS or EXPIRED
        Note over Server: Proceed with full analysis
        
        Server->>DB: Fetch order details
        Server->>DB: Fetch customer history
        Server->>DB: Fetch IP reputation
        
        Server->>Server: Run fraud analysis<br/>(20-30ms)
        
        Server->>Cache: SET cache:fraud:{order_id}<br/>value: fraud_analysis<br/>ttl: 3600 seconds
        Cache-->>Server: ✅ Cached
        
        Note over Server: ✅ Return result<br/>(20-30ms latency)
    end
```

---

## 7️⃣ Flow avec Timing Complet

```mermaid
sequenceDiagram
    autonumber

    participant User
    participant Server
    participant Cache
    participant DB
    participant LLM
    participant Monitor
    participant Alert

    User->>Server: analyzeFraud() [T+0ms]
    
    Server->>Server: Timer start [T+0.1ms]
    
    alt Cache HIT
        Server->>Cache: GET fraud cache [T+0.5ms]
        Cache-->>Server: Result [T+1ms]
        Note over Server: Skip to metrics [T+1.5ms]
    else Cache MISS
        Server->>DB: Query order [T+1ms]
        DB-->>Server: order data [T+5ms]
        
        Server->>DB: Query customer [T+5.5ms]
        DB-->>Server: customer data [T+10ms]
        
        Server->>DB: Query IP [T+10.5ms]
        DB-->>Server: ip data [T+12ms]
        
        Server->>Server: Compute signals [T+12.5ms]
        Note over Server: 8 signals aggregated [T+18ms]
        
        Server->>Server: Heuristic score [T+18.5ms]
        Note over Server: Score = 65 [T+19ms]
        
        alt Score ≥ 40
            Server->>LLM: AI analysis [T+19.5ms]
            LLM-->>Server: AI result [T+100ms]
            Note over Server: Takes 80ms typically [T+100.5ms]
            
            Server->>Server: Combine scores [T+101ms]
            Note over Server: Final = 72 [T+101.5ms]
        end
        
        Server->>DB: Save result [T+102ms]
        DB-->>Server: Saved [T+105ms]
        
        Server->>Cache: Cache result [T+105.5ms]
        Cache-->>Server: Cached [T+107ms]
    end
    
    Server->>Monitor: Record metrics [T+107.5ms]
    Monitor-->>Server: Ack [T+108ms]
    
    alt Final_Score ≥ 60
        Server->>Alert: Trigger alert [T+108.5ms]
        Alert-->>Server: Alert sent [T+200ms]
    end
    
    Server->>Server: Timer end [T+200.5ms]
    
    Server-->>User: Result + latency [T+201ms]
    Note over User: Total: ~200ms (with AI)<br/>or ~1.5ms (cached)
```

---

## 📊 Résumé des États et Transitions

```mermaid
stateDiagram-v2
    [*] --> WaitingForAnalysis
    
    WaitingForAnalysis --> CacheCheck: Request received
    
    CacheCheck --> CacheHit: Found valid cache
    CacheCheck --> CacheMiss: Not in cache
    
    CacheHit --> ReturnCached: Return immediately
    ReturnCached --> RecordMetrics
    
    CacheMiss --> CollectSignals: Fetch data
    CollectSignals --> ComputeScore: Aggregate signals
    
    ComputeScore --> IsHighRisk{Score ≥ 40?}
    IsHighRisk -->|Yes| AIAnalysis: Request LLM
    IsHighRisk -->|No| FinalScore
    
    AIAnalysis --> CombineScores: Merge heuristic + AI
    CombineScores --> FinalScore
    
    FinalScore --> DetermineRisk{Final Score?}
    DetermineRisk -->|≥60| HighRisk[HIGH RISK]
    DetermineRisk -->|40-60| MediumRisk[MEDIUM RISK]
    DetermineRisk -->|<40| LowRisk[LOW RISK]
    
    HighRisk --> SaveDB
    MediumRisk --> SaveDB
    LowRisk --> SaveDB
    
    SaveDB --> CacheResult
    CacheResult --> RecordMetrics
    
    RecordMetrics --> CheckThresholds
    CheckThresholds --> AlertTriggered{Threshold?}
    AlertTriggered -->|Yes| SendAlert
    AlertTriggered -->|No| ReturnResult
    
    SendAlert --> ReturnResult
    
    ReturnResult --> [*]
```

---

## 🔑 Clés du Système

### Performance Metrics
| Operation | Timing | Status |
|-----------|--------|--------|
| Cache hit | 23µs | ⚡ Super-fast |
| Heuristic score | 6ms | ✅ Fast |
| AI analysis | 80-100ms | ✅ Acceptable |
| Full analysis | 100-120ms | ✅ Good |
| DB operations | 3-5ms each | ✅ Efficient |

### Scoring Breakdown
```
Heuristic Score: 0-100
├─ Signal 1 (Amount): 0-35
├─ Signal 2 (Velocity): 0-35
├─ Signal 3 (Geo): 0-20
├─ Signal 4 (Account age): 0-25
├─ Signal 5a (CVV): 0-30
├─ Signal 5b (Chargebacks): 0-40
├─ Signal 5c (VPN/Proxy): 0-15
└─ Signal 8 (Established): -15

Final Score = (Heuristic * 0.6) + (AI * 0.4)
```

### Decision Tree
```
Final Score
├─ < 40: 🟢 LOW RISK → APPROVE
├─ 40-60: 🟡 MEDIUM RISK → REVIEW
└─ ≥ 60: 🔴 HIGH RISK → REJECT
```

---

## ✅ Validation Points

- ✅ All 8 signals collected
- ✅ Heuristic score computed
- ✅ AI analysis when needed
- ✅ Scores combined correctly
- ✅ Risk level determined
- ✅ Result saved to DB
- ✅ Result cached
- ✅ Metrics recorded
- ✅ Alerts triggered if needed
- ✅ Response sent to user

---

**Generated**: 01 Juin 2026  
**Version**: 2.0 (Production)  
**Status**: ✅ COMPLETE

