# Application Frontend: RO2YA.TN

## 🎯 Informations Générales
- **Nom de l'application**: `ro2ya.tn`
- **Version**: 0.1.0
- **Type**: Next.js 13+ Application (App Router)
- **Framework**: React 18+
- **Base de données**: Supabase
- **Styling**: Tailwind CSS
- **Architecture**: Full-Stack avec Server Components et Client Components

---

## 📱 Logiques Métier Appliquées au Frontend

### 1. **Authentification & Autorisation**
- Login/Logout utilisateur via Supabase Auth
- Session gestion avec SessionProvider
- OAuth integration (Google, GitHub)
- Password reset et update
- Role-based access control (User vs Business Owner vs Admin)

### 2. **Gestion des Profils Utilisateurs**
- Profil utilisateur (client)
- Profil propriétaire de magasin (business owner)
- Profils publics
- Avatar upload et gestion
- Edition des informations personnelles
- Suppression de compte

### 3. **Gestion des Magasins/Entreprises**
- Création de nouveau magasin/business
- Edition des informations du store
- Upload logo et images galerie
- Gestion des heures d'ouverture
- Catégorisation des services/produits
- Statistiques du store (dashboard)

### 4. **Gestion des Produits & Services**
- CRUD des produits (create, read, update, delete)
- Upload d'images de produits
- Galerie multiple d'images
- Upload de vidéos
- Disponibilité des produits
- Prix et promotions

### 5. **Système de Commandes & Réservations**
- Création de commandes
- Suivi des commandes (tracking code)
- Statut des commandes (pending, delivered, cancelled, etc.)
- Réservations/Bookings
- Annulation de commandes
- Validation QR code pour livraison

### 6. **Recherche Avancée & Filtrage**
- Recherche multi-critères (texte, catégorie, localisation)
- Recherche sémantique IA (NLP)
- Filtrage par prix, rating, conditions
- Recherche vocale
- Carte interactive avec résultats
- Comparaison de produits

### 7. **Système de Notation & Avis**
- Laisser des avis clients
- Répondre aux avis (propriétaire)
- Notation par stars (1-5)
- Affichage des avis publics
- Modération des avis

### 8. **Messagerie en Temps Réel**
- Chat entre utilisateurs
- Messages instantanés
- Chat heads flottants
- Notifications de messages
- Statut en ligne/offline

### 9. **Système de Notifications**
- Notifications système
- Notifications IA
- Toast notifications
- Push notifications
- Notification center avec marquage comme lu

### 10. **Gestion des Favoris & Sauvegardes**
- Ajouter/retirer des favoris
- Sauvegarder des produits
- Listes de favoris
- Synchronisation Zustand store

### 11. **Panier d'Achat & Paiement**
- Gestion du panier
- Ajout/retrait de produits
- Calcul du total
- Checkout process
- Integration paiement

### 12. **Dashboard Propriétaire**
- Analytics en temps réel
- Statistiques ventes/views/conversions
- Gestion des leads
- Support client et tickets
- Upload manager avec progress
- Store lock/unlock

### 13. **Système d'Intelligence Artificielle**
- IA Chat Assistant (Groq/OpenRouter)
- Recommandations produits IA
- Analyse de commentaires
- Détection de fraude
- Sales analyzer avec IA
- Sentiment analysis (Darija support)
- Search semantic avec embeddings

### 14. **Gestion des Médias (Reels/Stories)**
- Upload de vidéos (Reels)
- Création de stories
- Enregistrement caméra
- Tracking des interactions
- Affichage des reels découvrir

### 15. **Système de Suivi & Analytics**
- Event tracking
- Store view analytics
- Interaction tracking
- Heatmaps (presumed)
- Performance metrics

### 16. **Gestion des Promotions**
- Création de promotions
- Application aux produits
- Dates de validité
- Pourcentage de réduction

### 17. **Social Features**
- Suivre des magasins (follow)
- Amis et relations
- Partage de contenu
- Social feed/timeline

### 18. **Gestion Administrateur**
- Global admin stats
- User management (presumed)
- Store moderation (presumed)
- Analytics globale

### 19. **Support Client**
- Création de tickets
- Assignation de tickets
- Réponses aux questions
- FAQ management (presumed)

### 20. **Sécurité & Compliance**
- Rate limiting sur API
- Authentification sécurisée
- Session management
- HTTPS/TLS
- Data validation
- Error handling

---

## 🛠️ Technologies Utilisées

### Frontend Framework
- **Next.js 13+** - App Router, Server Components, SSR
- **React 18** - Hooks, Context API
- **TypeScript** - Type safety

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Headless UI components
- **Framer Motion** - Animations
- **Lucide React** - Icons

### State Management
- **Zustand** - Global state (cart, saves)
- **React Context** - Session, Upload, Theme
- **React Query** - Data fetching (maybe)

### Data & APIs
- **Supabase** - Backend as a Service
- **Server Actions** - Direct DB operations
- **API Routes** - Custom endpoints
- **OpenRouter/Groq** - AI services

### Visualizations
- **Recharts** - Charts & graphs
- **Leaflet** - Maps (via ResultsMap)

### External Services
- **Google Generative AI** - NLP
- **OpenRouter** - LLM access
- **Cloudinary** - Image hosting (presumed)
- **Vercel** - Deployment

---

## 📊 Statistiques Code

- **Total App Files**: 37 (sans API)
- **Total Components**: 192
- **Fichiers LIB**: 98
- **Fonctions Extraites**: 300+
- **Imports LIB en App**: 192+

---

## 🎨 Design & UX Patterns

1. **Modern Glassmorphism** - Designs avec backdrop blur
2. **Gradient Effects** - Gradients animés
3. **Card-based Layout** - Interface par cartes
4. **Tab Navigation** - Contenu par onglets
5. **Modal Dialogs** - Modales pour actions
6. **Responsive Design** - Mobile-first approach
7. **Dark Mode Support** - Theme provider setup
8. **Smooth Animations** - Framer motion pour transitions
9. **Loading States** - Skeletons et spinners
10. **Error Handling** - Toast notifications

---

## 🚀 Fonctionnalités Clés en Temps Réel

✅ Messagerie instantanée avec Supabase Realtime
✅ Notifications push en temps réel
✅ Live analytics dashboard
✅ Real-time inventory sync
✅ Presence indicators (online/offline)

---

## 🔒 Sécurité Implémentée

- Row Level Security (RLS) Supabase
- Authentication tokens gérés
- Password hashing
- Session management
- API rate limiting
- Input validation
- CORS configuration

---

## 📈 Performance Optimizations

- Code splitting avec dynamic()
- Image optimization (next/image)
- Lazy loading de components
- Server-side caching
- Incremental Static Regeneration (ISR)
- Bundle size monitoring

---

## 🌍 Localisation & Multilingue

- Support Darija (dialecte marocain)
- Interface en Français/English
- RTL support (presumed pour arabe)

---

## 🎯 Cas d'Usage Principaux

1. **Pour les Clients**:
   - Découvrir et acheter des produits/services
   - Laisser des avis
   - Tracker les commandes
   - Chat avec vendeurs
   - Sauvegarder favoris

2. **Pour les Propriétaires**:
   - Gérer son magasin
   - Analyser les ventes
   - Répondre aux clients
   - Uploader des produits/vidéos
   - Monitor les performances

3. **Pour les Admins**:
   - Voir statistiques globales
   - Modérer contenu
   - Gérer les utilisateurs

---

## 📋 Fichiers Clés

- `app/layout.tsx` - Root layout avec providers
- `app/page.tsx` - Homepage
- `app/dashboard/[id]/` - Dashboard propriétaire (14 pages)
- `app/search/` - Recherche et filtrage
- `app/profile/` - Profils utilisateur
- `components/` - 192 composants réutilisables
- `lib/actions/` - 35+ server actions
- `lib/supabase/` - Database clients

---

## 🎓 Architecture Globale

```
┌────────────────────────────────────────┐
│   RO2YA.TN - Frontend Application      │
├────────────────────────────────────────┤
│  Pages (App Router - 37 pages)        │
│  ├─ Dashboard, Profil, Recherche      │
│  ├─ Marchands, Messages, Validation   │
│  └─ Publiques, Découverte             │
├────────────────────────────────────────┤
│  Components (192 composants)           │
│  ├─ UI Génériques (74)                 │
│  ├─ Features (100+)                    │
│  └─ Hooks (5+)                         │
├────────────────────────────────────────┤
│  Business Logic (Lib)                  │
│  ├─ Actions (35+)                      │
│  ├─ Supabase Clients                   │
│  ├─ Zustand Stores                     │
│  └─ Utilities                          │
├────────────────────────────────────────┤
│  External Services                     │
│  ├─ Supabase DB & Auth                 │
│  ├─ Groq/OpenRouter AI                 │
│  ├─ Google Generative AI               │
│  └─ Vercel Hosting                     │
└────────────────────────────────────────┘
```

---

**Application Frontend Complète & Documentée** ✅
Generated: 2026-06-06
