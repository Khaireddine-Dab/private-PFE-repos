# 📊 Diagramme de Classe Académique - Phantom Marketplace

## Vue d'ensemble UML

```mermaid
classDiagram
    %% Classes centrales
    class User {
        id: uuid
        email: string
        full_name: string
        role: enum
        city: string
        ---
        +signUp(email, password)
        +signIn(email, password)
        +updateProfile(data)
        +getProfile()
    }

    class Store {
        id: bigint
        owner_id: uuid
        name: string
        category: string
        status: enum
        ---
        +createStore(data)
        +updateStore(data)
        +getStoreStats()
        +verifyStore()
    }

    %% Classes liées à Item
    class Item {
        id: bigint
        store_id: bigint
        name: string
        price: decimal
        stock_quantity: int
        ---
        +createItem(data)
        +updateItem(data)
        +decrementStock(qty)
        +getProductById()
    }

    %% Classes liées à Order/Booking
    class Order {
        id: bigint
        customer_id: uuid
        item_id: bigint
        total_price: decimal
        status: enum
        ---
        +createOrder(data)
        +updateOrderStatus(status)
        +cancelOrder()
        +getOrderHistory()
    }

    class Booking {
        id: bigint
        customer_id: uuid
        item_id: bigint
        booking_date: date
        price: decimal
        status: enum
        ---
        +createBooking(data)
        +confirmBooking()
        +cancelBooking()
        +sendReminder()
    }

    %% Classes liées à Review/Transaction
    class Review {
        id: bigint
        author_id: uuid
        item_id: bigint
        rating: int
        comment: string
        ---
        +createReview(data)
        +updateReview(data)
        +deleteReview()
        +respondToReview()
    }

    class Transaction {
        id: uuid
        customer_id: uuid
        amount: decimal
        status: enum
        order_number: string
        ---
        +syncOrderTransaction(orderId)
        +createRefund(amount)
        +verifyQRCode(token)
        +getTransactionHistory()
    }

    %% Classes support
    class StoreFollows {
        user_id: uuid
        store_id: bigint
        created_at: timestamp
        ---
        +followStore(userId, storeId)
        +unfollowStore(userId, storeId)
        +getFollowers(storeId)
    }

    class Reel {
        id: bigint
        store_id: bigint
        media_path: string
        title: string
        ---
        +createReel(data)
        +updateReel(data)
        +getReelsFeed(userId)
    }

    class Notification {
        id: uuid
        user_id: uuid
        title: string
        type: string
        is_read: boolean
        ---
        +createNotification(data)
        +getNotifications(userId)
        +markAsRead(notificationId)
    }

    class Message {
        id: uuid
        sender_id: uuid
        receiver_id: uuid
        content: string
        is_read: boolean
        ---
        +sendMessage(data)
        +getConversation(userId1, userId2)
        +markAsRead(messageId)
        +deleteMessage()
    }

    %% Relations avec User au centre
    User "1" --> "*" Store : crée (owner)
    User "1" --> "*" Order : passe
    User "1" --> "*" Booking : crée
    User "1" --> "*" Review : rédige
    User "1" --> "*" Message : envoie
    User "1" --> "*" Notification : reçoit
    User "1" --> "*" StoreFollows : suit

    %% Relations avec Store au centre
    Store "1" --> "*" Item : contient
    Store "1" --> "*" Order : reçoit
    Store "1" --> "*" Booking : reçoit
    Store "1" --> "*" Reel : crée
    Store "1" --> "*" StoreFollows : est suivie par

    %% Relations avec Item
    Item "1" --> "*" Order : s'achète dans
    Item "1" --> "*" Booking : se réserve dans
    Item "1" --> "*" Review : reçoit
    Item "1" --> "*" Reel : apparaît dans

    %% Relations avec Order/Booking
    Order "1" --> "1" Transaction : génère
    Order "1" --> "*" Review : génère
    Order "1" --> "*" Notification : déclenche

    Booking "1" --> "1" Transaction : génère
    Booking "1" --> "*" Review : génère
    Booking "1" --> "*" Notification : déclenche
```

---

## 📋 Classes et Champs Essentiels

### 1. **User** (Utilisateur)
- `id` (uuid): Identifiant unique
- `email` (string): Email
- `full_name` (string): Nom complet
- `role` (enum): CLIENT | PRO | ADMIN
- `city` (string): Ville

**Méthodes principales:**
- `signUp(email, password)` → Inscription
- `signIn(email, password)` → Connexion
- `updateProfile(data)` → Mise à jour profil
- `getProfile()` → Récupérer profil

### 2. **Store** (Boutique)
- `id` (bigint): Identifiant unique
- `owner_id` (uuid): Propriétaire (User)
- `name` (string): Nom boutique
- `category` (string): Catégorie
- `status` (enum): PENDING | ACTIVE | SUSPENDED

**Méthodes principales:**
- `createStore(data)` → Créer boutique
- `updateStore(data)` → Mettre à jour
- `getStoreStats()` → Statistiques ventes
- `verifyStore()` → Vérifier boutique

### 3. **Item** (Produit/Service)
- `id` (bigint): Identifiant unique
- `store_id` (bigint): Boutique (Store)
- `name` (string): Nom produit
- `price` (decimal): Prix
- `stock_quantity` (int): Stock

**Méthodes principales:**
- `createItem(data)` → Créer produit
- `updateItem(data)` → Mettre à jour
- `decrementStock(qty)` → Réduire stock
- `getProductById()` → Récupérer produit

### 4. **Order** (Commande)
- `id` (bigint): Identifiant unique
- `customer_id` (uuid): Client (User)
- `item_id` (bigint): Produit (Item)
- `total_price` (decimal): Prix total
- `status` (enum): PENDING | PAID | SHIPPED | COMPLETED

**Méthodes principales:**
- `createOrder(data)` → Créer commande
- `updateOrderStatus(status)` → Mettre à jour statut
- `cancelOrder()` → Annuler commande
- `getOrderHistory()` → Historique commandes

### 5. **Booking** (Réservation)
- `id` (bigint): Identifiant unique
- `customer_id` (uuid): Client (User)
- `item_id` (bigint): Service (Item)
- `booking_date` (date): Date réservation
- `price` (decimal): Prix
- `status` (enum): PENDING | CONFIRMED | COMPLETED

**Méthodes principales:**
- `createBooking(data)` → Créer réservation
- `confirmBooking()` → Confirmer
- `cancelBooking()` → Annuler
- `sendReminder()` → Rappel 24h

### 6. **Review** (Avis)
- `id` (bigint): Identifiant unique
- `author_id` (uuid): Auteur (User)
- `item_id` (bigint): Produit (Item)
- `rating` (int): Note 1-5
- `comment` (string): Texte avis

**Méthodes principales:**
- `createReview(data)` → Poster avis
- `updateReview(data)` → Modifier avis
- `deleteReview()` → Supprimer avis
- `respondToReview()` → Répondre vendeur

### 7. **Transaction** (Paiement)
- `id` (uuid): Identifiant unique
- `customer_id` (uuid): Client (User)
- `amount` (decimal): Montant
- `status` (enum): pending | completed | failed
- `order_number` (string): Référence commande

**Méthodes principales:**
- `syncOrderTransaction(orderId)` → Synchroniser paiement
- `createRefund(amount)` → Créer remboursement
- `verifyQRCode(token)` → Vérifier QR code
- `getTransactionHistory()` → Historique transactions

### 8. **StoreFollows** (Suivi Boutique)
- `user_id` (uuid): Utilisateur (User)
- `store_id` (bigint): Boutique (Store)
- `created_at` (timestamp): Date suivi

**Méthodes principales:**
- `followStore(userId, storeId)` → Suivre boutique
- `unfollowStore(userId, storeId)` → Arrêter de suivre
- `getFollowers(storeId)` → Lister followers

### 9. **Reel** (Vidéo TikTok)
- `id` (bigint): Identifiant unique
- `store_id` (bigint): Boutique (Store)
- `media_path` (string): Chemin média
- `title` (string): Titre

**Méthodes principales:**
- `createReel(data)` → Ajouter vidéo
- `updateReel(data)` → Mettre à jour vidéo
- `getReelsFeed(userId)` → Feed personnalisé

### 10. **Notification** (Notifications)
- `id` (uuid): Identifiant unique
- `user_id` (uuid): Utilisateur (User)
- `title` (string): Titre
- `type` (string): Type notification
- `is_read` (boolean): Lu/non lu

**Méthodes principales:**
- `createNotification(data)` → Créer notification
- `getNotifications(userId)` → Récupérer notifications
- `markAsRead(notificationId)` → Marquer comme lu

### 11. **Message** (Messages Directs)
- `id` (uuid): Identifiant unique
- `sender_id` (uuid): Expéditeur (User)
- `receiver_id` (uuid): Destinataire (User)
- `content` (string): Contenu
- `is_read` (boolean): Lu/non lu

**Méthodes principales:**
- `sendMessage(data)` → Envoyer message
- `getConversation(userId1, userId2)` → Récupérer conversation
- `markAsRead(messageId)` → Marquer lu
- `deleteMessage()` → Supprimer message

---

## 🔗 Relations Principales

| De | À | Type | Description |
|---|---|---|---|
| User | Store | 1-vers-* | Un utilisateur crée plusieurs boutiques |
| User | Order | 1-vers-* | Un client passe plusieurs commandes |
| User | Booking | 1-vers-* | Un client crée plusieurs réservations |
| User | Review | 1-vers-* | Un utilisateur rédige plusieurs avis |
| User | Message | 1-vers-* | Un utilisateur envoie plusieurs messages |
| User | Notification | 1-vers-* | Un utilisateur reçoit plusieurs notifications |
| User | StoreFollows | 1-vers-* | Un utilisateur suit plusieurs boutiques |
| Store | Item | 1-vers-* | Une boutique vend plusieurs produits |
| Store | Order | 1-vers-* | Une boutique reçoit plusieurs commandes |
| Store | Booking | 1-vers-* | Une boutique reçoit plusieurs réservations |
| Store | Reel | 1-vers-* | Une boutique crée plusieurs vidéos |
| Store | StoreFollows | 1-vers-* | Une boutique est suivie par plusieurs utilisateurs |
| Item | Order | 1-vers-* | Un produit peut être commandé plusieurs fois |
| Item | Booking | 1-vers-* | Un service peut être réservé plusieurs fois |
| Item | Review | 1-vers-* | Un produit reçoit plusieurs avis |
| Item | Reel | 1-vers-* | Un produit peut apparaître dans plusieurs réels |
| Order | Transaction | 1-vers-1 | Une commande génère une transaction |
| Order | Review | 1-vers-* | Une commande peut générer un avis |
| Order | Notification | 1-vers-* | Une commande déclenche des notifications |
| Booking | Transaction | 1-vers-1 | Une réservation génère une transaction |
| Booking | Review | 1-vers-* | Une réservation peut générer un avis |
| Booking | Notification | 1-vers-* | Une réservation déclenche des notifications |

---

**Diagramme Académique Complet | 11 Classes | Phantom Marketplace v4.4**
