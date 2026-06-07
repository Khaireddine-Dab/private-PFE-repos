# Image Search API Integration

## Overview
L'API de recherche par image a été intégrée dans l'endpoint `/api/semantic-search`. Cet endpoint unifié gère maintenant **deux types de requêtes**:

1. **Recherche textuelle** : `query` + `location` + `category`
2. **Recherche par image** : `image` (base64) → analyse IA → requête générée → résultats

---

## Architecture

### Backend (Next.js)
**File**: `/app/api/semantic-search/route.ts`

```typescript
POST /api/semantic-search
{
  // Option 1: Text-based search
  "query": "jeans bleu",
  "location": "Tunis",
  "category": "Vêtements",
  "userLat": 36.8,
  "userLng": 10.1,
  "isSuggestion": false

  // Option 2: Image-based search
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
  "userLat": 36.8,
  "userLng": 10.1
}
```

**Response**:
```typescript
{
  "results": [...],           // Search results (same format as text search)
  "count": 15,
  "query": "jeans bleu",      // Generated query (for image searches)
  "elapsed_ms": 245,
  "processing": "semantic-hybrid-rrf",
  "warning": "timeout" // (optional, if timeout occurred)
}
```

### Image Analysis Flow
1. **Receive**: Base64 image from mobile app
2. **Validate**: Check `data:image/` prefix
3. **Analyze**: Send to Groq (Llama 4) with visual prompt
4. **Generate**: Extract 5-10 word search query (French)
5. **Search**: Use generated query for semantic search
6. **Return**: Combined results + original query

---

## Mobile Integration

### Updated Files

#### `lib/imageSearch.ts`
```typescript
// New functions
- captureImageFromCamera()          // Opens device camera
- pickImageFromLibrary()            // Opens device gallery
- analyzeImageForSearch()           // Sends to /api/semantic-search
- performImageSearchFromCamera()    // Full flow: capture → analyze → search
- performImageSearchFromLibrary()   // Full flow: pick → analyze → search

// Legacy (backward compatible)
- performImageSearch()              // = performImageSearchFromCamera()
- pickImageAndSearch()              // = performImageSearchFromLibrary()
```

#### `app/search.tsx`
```typescript
// Import updated functions
import { 
  performImageSearchFromCamera,
  performImageSearchFromLibrary 
} from "../lib/imageSearch";

// Usage in handleCameraPress
const handleCameraPress = async () => {
  setIsSearching(true);
  const queryFromImage = await performImageSearchFromCamera();
  if (queryFromImage) {
    setQuery(queryFromImage);
    onSubmitLike(queryFromImage);
  } else {
    setIsSearching(false);
  }
};
```

---

## API Comparison

| Feature | `/api/image-search` | `/api/semantic-search` |
|---------|---------------------|------------------------|
| Text search | ❌ | ✅ |
| Image search | ✅ | ✅ |
| Location awareness | ❌ | ✅ |
| Caching | ❌ | ✅ (Smart TTL) |
| Timeout handling | ❌ | ✅ |
| Performance metrics | ❌ | ✅ |

---

## Performance Notes

### Image Analysis
- **Model**: Groq Llama 4 Scout (17B parameters, optimized)
- **Cost**: ~0.05s per image
- **Max size**: 500KB (base64)

### Search
- **Timeout**: 8 seconds (hard ceiling)
- **Cache TTL**: 30s (suggestions) / 120s (full searches)
- **Concurrency**: Limited by Vercel plan

---

## Error Handling

### Fallbacks
```typescript
// If image analysis fails → return empty results
{
  "results": [],
  "count": 0,
  "error": "Image analysis failed. Please try again."
}

// If search times out → return partial results
{
  "results": [],
  "count": 0,
  "warning": "timeout",
  "processing": "semantic-hybrid-rrf"
}
```

---

## Migration Path

### Old Endpoint (Deprecated)
```
POST /api/image-search
{
  "image": "data:image/jpeg;base64,..."
}
```

### New Endpoint (Recommended)
```
POST /api/semantic-search
{
  "image": "data:image/jpeg;base64,..."
}
```

**Note**: `/api/image-search` can be **kept for backward compatibility** or **removed** if no legacy clients exist.

---

## Testing

### Local Testing
```bash
# Text-based search
curl -X POST http://localhost:3000/api/semantic-search \
  -H "Content-Type: application/json" \
  -d '{"query":"jeans bleu","userLat":36.8,"userLng":10.1}'

# Image-based search
curl -X POST http://localhost:3000/api/semantic-search \
  -H "Content-Type: application/json" \
  -d '{"image":"data:image/jpeg;base64,...","userLat":36.8,"userLng":10.1}'
```

---

## Environment Variables Required

```env
GROQ_API_KEY=<your-groq-api-key>
EXPO_PUBLIC_API_URL=https://ro2ya-marketplace-platforme.vercel.app
```

---

## Future Improvements

- [ ] Batch image processing (multiple images at once)
- [ ] Image URL support (HTTP/HTTPS) in addition to base64
- [ ] Multi-modal search (text + image combination)
- [ ] Image similarity ranking (vector-based)
- [ ] Cache warming for popular searches
- [ ] A/B testing on query generation prompts

---

## Support

For issues or questions:
- Check `console.error` logs for diagnostic info
- Test with known working images first
- Verify Groq API quota and rate limits
- Check network connectivity on mobile device
