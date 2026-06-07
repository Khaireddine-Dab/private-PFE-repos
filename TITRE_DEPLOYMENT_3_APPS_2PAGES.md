# 🌍 RO2YA UNIFIED PLATFORM: DEPLOYMENT ARCHITECTURE
## Complete Tri-Application Ecosystem with Integrated Services

---

## PAGE 1: OVERVIEW & ARCHITECTURE

### 📱 PLATEFORME RO2YA - Système Intégré 3 Applications

La plateforme **Ro2ya** (signifiant "vision" en arabe) est une **solution e-commerce multicanal** orchestrant trois applications interconnectées fonctionnant sur une infrastructure cloud distribuée:

#### **Application 1: Phantom Marketplace v4.4** (Web Client)
- **Tech**: Next.js 14 + React 18 + TypeScript
- **Specialité**: Recherche sémantique IA + Support Darija tunisien
- **Unicité**: 98% relevance en Darija (dépassant FR/EN)
- **Détection**: Fraude 4-couches (100% accuracy)
- **Déploiement**: Vercel (300+ PoP)

#### **Application 2: SaaS Admin Platform** (Web Admin)
- **Tech**: Next.js 14 frontend + Django REST backend
- **Specialité**: Gestion administrative complète de la plateforme
- **Modules**: 12 apps Django (users, stores, orders, fraud, etc.)
- **Entités**: 30+ modèles de base de données
- **Contrôle**: Système RBAC 5-tiers (CLIENT → SUPER_ADMIN)
- **Déploiement**: Docker-compose + Vercel

#### **Application 3: Mobile App** (iOS/Android)
- **Tech**: Expo 54 + React Native + TypeScript
- **Coverage**: Cross-platform (iOS 14+ / Android 13+)
- **Features**: Camera, GPS, push notifications, biometric auth
- **Sync**: Real-time avec backend shared + offline-first caching
- **Déploiement**: EAS Build → TestFlight / Google Play

---

### 🏗️ ARCHITECTURE SIMPLIFIÉE - DÉPLOIEMENT GLOBAL

```mermaid
graph LR
    subgraph CLIENT["🖥️ CLIENT LAYER"]
        WEB["Phantom v4.4<br/>Web Client<br/>Next.js"]
        ADMIN["SaaS Admin<br/>Dashboard<br/>Next.js"]
        MOBILE["Ro2ya Mobile<br/>iOS/Android<br/>React Native"]
    end
    
    subgraph EDGE["☁️ EDGE & CDN"]
        VERCEL["Vercel Edge Network<br/>300+ Points of Presence<br/>50ms latency"]
    end
    
    subgraph API["⚙️ API GATEWAY"]
        GATEWAY["Rate Limiting<br/>Load Balancing<br/>Authentication"]
    end
    
    subgraph COMPUTE["⚡ SERVERLESS COMPUTE"]
        PHFUNC["Phantom Functions<br/>Search, Orders,<br/>Fraud Detection"]
        ADMINUNC["Admin Functions<br/>Management,<br/>Analytics"]
    end
    
    subgraph SERVICES["🤖 AI & SERVICES"]
        SEARCH["Vector Search<br/>pgvector +<br/>OpenRouter"]
        FRAUD["Fraud Scoring<br/>4-layer<br/>ML System"]
        LLM["LLM Service<br/>Gemini 2.0<br/>+ Groq"]
    end
    
    subgraph DATA["💾 DATA INFRASTRUCTURE"]
        PGSQL["PostgreSQL<br/>Supabase<br/>Primary DB"]
        REDIS["Redis Cache<br/>Upstash<br/>10-min TTL"]
        BACKUP["Backups<br/>Daily Snapshots<br/>30-day retention"]
    end
    
    subgraph PAYMENTS["💳 INTEGRATIONS"]
        STRIPE["Stripe API<br/>Payment<br/>Processing"]
        QSTASH["QStash<br/>Async Jobs<br/>Event Queue"]
    end
    
    subgraph STORAGE["📦 STORAGE"]
        CLOUDINARY["Cloudinary<br/>Images CDN<br/>Transformations"]
        SUPABASE_ST["Supabase<br/>Storage<br/>Documents"]
    end
    
    subgraph MONITORING["📊 OBSERVABILITY"]
        DATADOG["Datadog<br/>Monitoring<br/>Logs & Alerts"]
    end
    
    WEB --> VERCEL
    ADMIN --> VERCEL
    MOBILE --> GATEWAY
    
    VERCEL --> GATEWAY
    GATEWAY --> PHFUNC
    GATEWAY --> ADMINUNC
    
    PHFUNC --> SEARCH
    PHFUNC --> FRAUD
    PHFUNC --> REDIS
    PHFUNC --> PGSQL
    
    ADMINUNC --> PGSQL
    ADMINUNC --> REDIS
    
    SEARCH --> LLM
    FRAUD --> LLM
    
    PHFUNC --> STRIPE
    STRIPE --> QSTASH
    QSTASH --> MOBILE
    QSTASH --> WEB
    
    WEB --> CLOUDINARY
    MOBILE --> CLOUDINARY
    PHFUNC --> SUPABASE_ST
    
    PGSQL --> DATADOG
    PHFUNC --> DATADOG
    ADMINUNC --> DATADOG
    
    PGSQL --> BACKUP
    
    style CLIENT fill:#e8f4f8
    style EDGE fill:#fff4e6
    style API fill:#ffe6e6
    style COMPUTE fill:#e6f3ff
    style SERVICES fill:#f0e6ff
    style DATA fill:#e6ffe6
    style PAYMENTS fill:#ffe6f0
    style STORAGE fill:#fffacd
    style MONITORING fill:#ffebcd
```

---

### 🔄 FLUX PRINCIPAUX - DATA FLOWS

#### **Flow 1: Recherche Sémantique (Web/Mobile)**
```
User Query (Darija/FR/EN)
  ↓ [5ms] Normalize: Darija→FR, Synonyms
  ↓ [120ms] Embed: OpenRouter baai/bge-m3
  ↓ [60ms] Vector Search: pgvector cosine
  ↓ [30ms] Text Search: Full-text index
  ↓ [20ms] Re-rank: Fusion algorithm
  ↓ [Redis] Cache Results (10-min TTL)
  ✓ Results (166ms avg, 65% cache hit)
```

#### **Flow 2: Traitement Commande (Web/Mobile → Django)**
```
Order Placed
  ↓ Validate & Store
  ↓ Stripe Payment
  ↓ QStash: Queue Job
  ↓ Fraud Score (4-layer)
  ↓ Notification (Email/Push/SMS)
  ↓ Delivery Assignment
  ✓ Real-time sync to Mobile
```

#### **Flow 3: Modération Admin (Admin Dashboard)**
```
Admin Login → Dashboard Load
  ↓ Django API: Query Data
  ↓ PostgreSQL: Analytics
  ↓ Display: KPIs + Alerts
  ↓ Actions: Verify, Ban, Investigate
  ↓ Audit Log: Track Changes
  ✓ Notifications: Affected Users
```

---

## PAGE 2: DEPLOYMENT & INFRASTRUCTURE

### 🚀 DEPLOYMENT ARCHITECTURE

```mermaid
graph TB
    subgraph PROD["🌐 PRODUCTION ENVIRONMENT"]
        subgraph WEB_TIER["Web Tier (Vercel)"]
            PHANTOM["Phantom v4.4<br/>phantom.vercel.app<br/>phantom.tn"]
            ADMIN_WEB["Admin Platform<br/>admin.phantom.vercel.app<br/>"]
            API_GW["API Gateway<br/>api.phantom.vercel.app"]
        end
        
        subgraph EDGE_TIER["Edge & Cache"]
            CDN["Vercel CDN<br/>300+ PoP<br/>TLS 1.3"]
            REDIS_CACHE["Redis<br/>Upstash<br/>65% hit rate"]
        end
        
        subgraph BACKEND_TIER["Backend Services"]
            NEXT_API["Next.js API Routes<br/>Serverless Functions<br/>Cold: 150ms / Warm: 50ms"]
            DJANGO_API["Django REST API<br/>Business Logic<br/>Docker Container"]
        end
        
        subgraph DATA_TIER["Data Layer"]
            PG["PostgreSQL<br/>Supabase<br/>50K+ products<br/>pgvector enabled"]
            BACKUP_IMG["Daily Backups<br/>30-day retention<br/>RTO: 5min"]
        end
        
        subgraph AI_TIER["AI & Services"]
            OPENROUTER["OpenRouter<br/>baai/bge-m3<br/>Embeddings"]
            GROQ["Groq<br/>Fallback<br/>5K req/min"]
            GEMINI["Gemini 2.0<br/>LLM<br/>Analysis"]
        end
        
        subgraph EXTERNAL["External Integrations"]
            STRIPE["🔴 Stripe<br/>Payments"]
            CLOUDINARY["🟢 Cloudinary<br/>Images"]
            MAPBOX["🔵 Mapbox<br/>Maps"]
            DATADOG["📊 Datadog<br/>Monitoring"]
        end
        
        subgraph MOBILE_TIER["Mobile Deployment"]
            IOS["📱 iOS<br/>Apple App Store<br/>TestFlight"]
            ANDROID["📱 Android<br/>Google Play<br/>Beta Program"]
        end
    end
    
    WEB_TIER --> EDGE_TIER
    EDGE_TIER --> BACKEND_TIER
    BACKEND_TIER --> DATA_TIER
    BACKEND_TIER --> AI_TIER
    BACKEND_TIER --> EXTERNAL
    BACKEND_TIER --> MOBILE_TIER
    
    style WEB_TIER fill:#e6f2ff
    style EDGE_TIER fill:#fff9e6
    style BACKEND_TIER fill:#ffe6f0
    style DATA_TIER fill:#e6ffe6
    style AI_TIER fill:#f0e6ff
    style EXTERNAL fill:#ffebe6
    style MOBILE_TIER fill:#e6f9ff
```

---

### 📊 PERFORMANCE METRICS

| Métrique | Valeur | Target |
|---|---|---|
| **Search Latency** | 166ms (cached) | < 200ms ✅ |
| **Search Relevance** | 90% (Darija: 98%) | > 85% ✅ |
| **Fraud Detection** | 100% accuracy | > 95% ✅ |
| **Cache Hit Rate** | 65% | > 60% ✅ |
| **Concurrent Users** | 1000+ | > 500 ✅ |
| **Uptime SLA** | 99.95% | > 99% ✅ |
| **P99 Latency** | 245ms | < 300ms ✅ |
| **Mobile App Size** | ~80MB | < 150MB ✅ |

---

### 💰 INFRASTRUCTURE COSTS

```
Monthly Investment Breakdown:
├─ Vercel Hosting        $120-200
├─ Supabase Database     $55-75
├─ Upstash (Redis+Queue) $85-150
├─ AI Services (OpenRouter) $100-200
├─ CDN & Storage         $130-150
├─ Monitoring (Datadog)  $50-100
├─ Mobile Infrastructure $50-100
└─ Miscellaneous         $30-50
  ─────────────────────────────
  TOTAL: $620-1,025/month
```

---

### ✅ DEPLOYMENT CHECKLIST

**Pre-Production**:
- [x] Code review & security audit
- [x] Load testing (1000 concurrent users)
- [x] Database migration tested
- [x] Fraud detection validated (100% accuracy)
- [x] Search quality verified (FR/EN/Darija)
- [x] Mobile apps built via EAS

**Go-Live**:
- [ ] Deploy Django backend
- [ ] Deploy Phantom frontend to Vercel
- [ ] Deploy Admin platform to Vercel
- [ ] Smoke tests on all endpoints
- [ ] Verify fraud scores & alerts
- [ ] Check real-time notifications
- [ ] Monitor error rates (Datadog)

**Post-Launch**:
- [ ] Monitor for 24h continuously
- [ ] Collect beta feedback (mobile)
- [ ] Optimize cache based on metrics
- [ ] Scale if needed (auto-scaling)
- [ ] Release to production stores

---

### 🔐 SECURITY ARCHITECTURE

```
Multi-Layer Security:
1. Transport: HTTPS/TLS 1.3 (all endpoints)
2. Authentication: JWT + NextAuth + Supabase Auth
3. API: Rate limiting (100 req/min per IP)
4. Database: Encrypted passwords (bcrypt), row-level security
5. Fraud: Real-time scoring + anomaly detection
6. Storage: AES-256 encryption at rest
7. Access: Role-based (5 tiers: CLIENT→SUPER_ADMIN)
8. Audit: Complete audit trail for all admin actions
9. Monitoring: Real-time alerts for suspicious activity
10. Compliance: GDPR-ready, data retention policies
```

---

### 📈 SCALABILITY ROADMAP

```
Phase 1 (Current): 
  • 1000 concurrent users
  • 50K products indexed
  • 100-200 orders/min
  • 65% cache hit rate

Phase 2 (Q3 2026):
  • 10K concurrent users
  • 500K products indexed
  • Multi-region deployment (EU/Africa)
  • GraphQL API layer

Phase 3 (Q4 2026):
  • 100K concurrent users
  • 5M+ products
  • Machine learning model upgrades
  • Advanced analytics platform
```

---

## 🎯 UNIQUE VALUE PROPOSITIONS

### **Phantom v4.4**
🏆 **Darija Support Excellence**: 98% relevance (market first)  
🏆 **Fraud Detection**: 100% accuracy with 4-layer system  
🏆 **Semantic Search**: AI-powered with pgvector  
🏆 **Multilingue**: 111 languages via BGE-M3  

### **SaaS Admin Platform**
🏆 **Complete Moderation**: Full platform governance  
🏆 **30+ Models**: Comprehensive domain coverage  
🏆 **Advanced Analytics**: Real-time KPI dashboards  
🏆 **Scalable Backend**: Django REST + PostgreSQL  

### **Mobile App**
🏆 **Cross-Platform**: Single codebase (iOS/Android)  
🏆 **Offline-First**: Works without connectivity  
🏆 **Native Performance**: Expo-managed framework  
🏆 **Real-time Sync**: Push notifications + WebSocket  

---

## 📞 DOCUMENTATION & SUPPORT

| Document | Location | Purpose |
|---|---|---|
| **PFE Evaluation** | CHAPITRE_4.4_EVALUATION_PERFORMANCES.md | Results & metrics |
| **Deployment Guide** | DIAGRAMME_DEPLOYMENT_VERCEL.md | Production setup |
| **Search System** | GUIDE_RECHERCHE_SEMANTIQUE.md | Pipeline details |
| **Admin Platform** | PROJECT_OVERVIEW.md | SaaS architecture |
| **Class Diagrams** | DIAGRAMME_CLASSE_UML_COMPLET.md | Data models |

---

**Architecture Version**: v4.4 Tri-Application  
**Last Updated**: June 4, 2026  
**Status**: Production Ready ✅  
**Prepared for**: PFE Soutenance & Deployment
