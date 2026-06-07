# 📊 Diagramme de Séquence: Détection de Fraude v2

## Architecture Complète

```mermaid
sequenceDiagram
    actor User as 👤 Client/API
    participant App as 🚀 Next.js Server<br/>(Action Server)
    participant Cache as 💾 Redis Cache
    participant DB as 🗄️ Supabase<br/>(PostgreSQL)
    participant LLM as 🤖 OpenRouter<br/>(AI Analysis)
    participant Monitor as 📊 Monitoring<br/>System
    participant Alert as 🚨 Alert System<br/>(Email/Slack)

    User->>App: 1. POST /api/analyze-fraud<br/>{order_id, customer_ip, amount}
    
    Note over App: ⏱️ START TIMER
    
    alt Cache HIT (Récent)
        App->>Cache: 2a. GET cache:fraud:order_id
        Cache-->>App: Résultat en cache
        Note over App: ⚡ Skip analysis<br/>(23µs)
    else Cache MISS
        App->>DB: 2b. GET order details
        DB-->>App: order data
        
        App->>DB: 3. GET customer history
        DB-->>App: transactions[], chargebacks[]
        
        App->>DB: 4. GET IP reputation
        DB-->>App: ip_info {country, vpn, proxy}
        
        Note over App: 🔍 COLLECTE DES<br/>SIGNAUX (Heuristiques)
        
        App->>App: 5. calculateSignals()<br/>├─ Signal 1: Montant aberrant (0-35pts)<br/>├─ Signal 2: Velocity burst (0-35pts)<br/>├─ Signal 3: Géolocalisation (0-20pts)<br/>├─ Signal 4: Nouvel compte (0-25pts)<br/>├─ Signal 5a: CVV mismatch (0-30pts)<br/>├─ Signal 5b: Chargebacks (0-40pts)<br/>├─ Signal 5c: VPN/Proxy (0-15pts)<br/>└─ Signal 8: Clients établis (-15pts)
        
        Note over App: 📈 AGREGER LES SIGNAUX
        
        App->>App: 6. computeHeuristicScore()<br/>Score = Σ(signal_weight * signal_value)<br/>Range: 0-100
        
        alt Score ≥ 40 (Suspicious)
            App->>LLM: 7. POST /v1/messages<br/>Prompt: "Analyze fraud signals..."<br/>{signals, order_data, customer_data}
            
            Note over LLM: 🧠 AI ANALYSIS<br/>- Pattern recognition<br/>- Contextual analysis<br/>- Risk assessment
            
            LLM-->>App: AI_RESPONSE<br/>{reasoning, confidence, final_score}
            
            App->>App: 8. Combine scores<br/>Final = (Heuristic*0.6 +<br/>AI*0.4)
        else Score < 40 (Safe)
            Note over App: ✅ SAFE - Skip AI
            App->>App: Final = Heuristic
        end
        
        Note over App: 💾 SAVE RESULT
        
        App->>DB: 9. INSERT fraud_analysis<br/>{<br/>  order_id,<br/>  heuristic_score,<br/>  ai_score,<br/>  final_score,<br/>  risk_level,<br/>  signals[],<br/>  reasoning,<br/>  analysis_date<br/>}
        DB-->>App: ✅ Saved
        
        App->>Cache: 10. SET cache:fraud:order_id<br/>value: result<br/>ttl: 3600s
        Cache-->>App: ✅ Cached
    end
    
    Note over App: 📊 ENREGISTRER METRICS
    
    App->>Monitor: 11. recordMetric('fraud_detection')<br/>{<br/>  final_score,<br/>  risk_level,<br/>  latency_ms,<br/>  signals_count,<br/>  timestamp<br/>}
    Monitor-->>App: ✅ Recorded
    
    alt Final_Score >= 60 (High Risk)
        App->>Monitor: 12a. checkThreshold('fraud_score')<br/>THRESHOLD_VIOLATED
        
        Monitor->>Alert: 13a. TRIGGER ALERT<br/>Level: CRITICAL<br/>Title: "High fraud risk detected"<br/>Data: {score, order_id, customer}
        
        alt Email Enabled
            Alert->>Alert: Send email<br/>to: ops-team@company.com
            Note over Alert: 📧 Email sent
        end
        
        alt Slack Enabled
            Alert->>Alert: Send Slack message<br/>to: #fraud-alerts
            Note over Alert: 💬 Slack notification
        end
        
        alt Datadog Enabled
            Alert->>Alert: Post Datadog event
            Note over Alert: 📊 Event logged
        end
        
        Alert-->>App: ✅ Alerts sent
    else Final_Score 40-60 (Medium Risk)
        App->>Monitor: 12b. checkThreshold('fraud_score')<br/>THRESHOLD_WARNING
        Monitor-->>App: ✅ Logged (no alert)
    else Final_Score < 40 (Low Risk)
        App->>Monitor: 12c. recordMetric('safe_order')
        Monitor-->>App: ✅ Logged (no alert)
    end
    
    Note over App: ⏱️ END TIMER
    App->>Monitor: 14. recordMetric('fraud_analysis_latency')<br/>latency_ms
    Monitor-->>App: ✅ Recorded
    
    App->>App: 15. calculateFraudStats()
    
    App-->>User: 16. RESPONSE 200 OK<br/>{<br/>  order_id,<br/>  risk_level: 'HIGH'|'MEDIUM'|'LOW',<br/>  final_score: 0-100,<br/>  heuristic_score,<br/>  ai_score,<br/>  signals: [],<br/>  reasoning,<br/>  recommendation: 'REJECT'|'REVIEW'|'APPROVE',<br/>  timestamp,<br/>  latency_ms,<br/>  cached: boolean<br/>}
    
    Note over User: ✅ Decision Made<br/>Action: Accept/Reject/Review
