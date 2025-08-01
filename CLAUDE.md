# NFT Minting dApp - Journal de développement

## Énoncé du projet
Build a React/TypeScript dApp to view and mint ERC1155 NFTs on Base Sepolia testnet.

**API**: https://mint-api-production-7d50.up.railway.app
- GET /nfts - List all NFTs  
- GET /nfts/:id - Get single NFT

**Tech Stack**: React + TypeScript + Vite, Wagmi/Viem, TanStack Query, Tailwind CSS

**Design**: Single page selon Figma - vue détail NFT avec claim

## Progression

### ✅ Phase 1: Configuration & Types (TERMINÉ)
1. ✅ Types TypeScript (NFT interface, ClaimState, etc.)
2. ✅ Configuration Wagmi avec Base Sepolia
3. ✅ API client simple (fetch vers l'API Railway)
4. ✅ Setup TanStack Query + providers dans main.tsx
5. ✅ Hooks: useWallet, useNFT, useClaim

### ✅ Phase 2: Hooks & Tests (TERMINÉ)
6. ✅ useClaim hook - fonction `claim` avec ABI depuis explorer
7. ✅ Test API - récupérer données NFT et afficher (fonctionne!)

### ✅ Phase 3: Composants UI (TERMINÉ)
8. ✅ Ajout Mantine + configuration
9. ✅ Header, NFTImage, NFTDetails, ClaimPanel, Footer
10. ✅ App.tsx principal - composition avec Grid Mantine
11. ✅ NFTGallery - navigation entre NFTs avec sélection visuelle

### ✅ Phase 4: Polish & UX (TERMINÉ)
12. ✅ Layout Figma - Image (6 col) + Détails + Claim (4 col) 
13. ✅ Images IPFS - Gateway Pinata pour affichage
14. ✅ Transitions fluides - placeholderData pour éviter flash
15. ✅ Loaders Mantine noir - chargements propres
16. ✅ Thème noir pur - #000000 strict (pas de gris)

### 🎯 PROJET TERMINÉ
✨ **Interface fonctionnelle** conforme au Figma
✨ **Navigation NFT** fluide avec galerie
✨ **Connexion wallet** + claim functionality  
✨ **Design noir/blanc** clean et moderne

## Choix techniques effectués

- **Wagmi simple**: Juste connector `injected()` (MetaMask), pas de WalletConnect
- **API minimaliste**: Juste fetch native, pas d'axios
- **Single page**: Pas de routing, juste composants organisés
- **Free mint**: Prix = 0 ETH selon le Figma
- **Mantine + Tailwind**: Mantine pour composants, Tailwind pour classes utilitaires
- **NFT hardcodé**: NFT #2 pour coller au Figma

## Données API - Exemple de réponse /nfts
```json
[
  {
    "chainId": 84532,
    "id": "0",
    "metadata": {
      "name": "KILN #1",
      "description": "A confident bearded avatar with bold blue shades...",
      "image": "ipfs://QmQ4DFYeYMgfGkT9vhnphw24Ea2rbX3ko67MK5UqBS7A1X/0.jpg",
      "attributes": [
        { "trait_type": "Headwear", "value": "Red & White Kiln Cap" },
        { "trait_type": "Eyewear", "value": "Blue Square Shades" }
      ]
    },
    "tokenAddress": "0x0d26A64e833f84663b3aaDc311c352b3bb81e9Cf",
    "tokenURI": "ipfs://Qma5vDp1k8dgpU5dHsKBDPQ1TVHQeQTaLFV8ozPCDXcXT4/0",
    "type": "ERC1155"
  }
]
```

## ABI découvert
Fonction `claim()` avec paramètres:
- payableAmount (ether)
- _receiver (address) 
- _tokenId (uint256)
- _quantity (uint256)
- _currency (address)
- _pricePerToken (uint256)
- _allowlistProof (tuple) - optionnel
- _data (bytes)

## État final
- ✅ **Images IPFS** -> Gateway Pinata configuré
- ✅ **API fonctionnelle** -> 5 NFTs chargés parfaitement  
- ✅ **Interface complète** -> Layout, navigation, claim, footer
- ✅ **UX soignée** -> Loaders, transitions, thème cohérent
- ✅ **Responsive** -> Grid Mantine adaptatif
- ✅ **Prêt pour production** -> Code clean, TypeScript strict

## Fonctionnalités implémentées
1. **Connexion wallet** MetaMask sur Base Sepolia
2. **Affichage NFT** avec image, nom, description, attributs
3. **Navigation galerie** - clic pour changer de NFT
4. **Claim/Mint** - bouton avec états (pending, success, error)
5. **Loading states** - loaders propres partout
6. **Footer Kiln** - infos projet + liens sociaux

**Durée**: ~4h de développement  
**Résultat**: Interface moderne prête pour test technique ✨