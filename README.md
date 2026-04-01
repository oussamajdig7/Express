# Projet NodeJS (Express + Prisma + MariaDB/MySQL)

## Présentation du projet
Ce projet est une API REST développée avec Express et TypeScript. Elle utilise Prisma pour interagir avec une base de données MariaDB/MySQL.

Elle permet de gérer :
- Catégories
- Produits (liés à une catégorie)
- Vendeurs (création avec mot de passe hashé via bcrypt)
- Clients (liés à un vendeur)
- Ventes (liées à un client et un produit)

## Fonctionnalités
- CRUD des catégories (Create / Read / Update / Delete)
- CRUD des produits + relation avec les catégories
- CRUD des vendeurs + hash du mot de passe
- CRUD des clients + relation avec les vendeurs
- CRUD des ventes + relation avec les clients et les produits
- Authentification (JWT) via `/login` + exemple de route protégée `/middleware`
- API JSON (les données sont envoyées via le body en JSON)

## Structure (fichiers importants)
- `app.ts` : routes + serveur
- `prisma/schema.prisma` : modèles (Categorie / Produit / Vendeur / Client / Vente)
- `lib/prisma.ts` : PrismaClient configuré avec l’adapter MariaDB

## 1) Prérequis
- Node.js + npm
- Base de données MySQL (serveur local ou distant)

## 2) Installation
```bash
git clone https://github.com/oussamajdig7/Express.git
cd Express 
npm install
```

## 3) Configuration `.env`
Crée un fichier `.env` à la racine du projet (au même niveau que `package.json`) et ajoute ces variables :

```env
# Prisma migrations (URL)
DATABASE_URL="mysql://USER@HOST:3306/DB_NAME"

# Runtime (adapter MariaDB)
DATABASE_HOST="HOST"
DATABASE_USER="USER"
DATABASE_PASSWORD=""
DATABASE_NAME="DB_NAME"

# JWT (auth)
JWT_CLE="CHANGE_ME"
```

Exemple (local) :
```env
DATABASE_URL="mysql://root@localhost:3306/mydb"
DATABASE_HOST="localhost"
DATABASE_USER="root"
DATABASE_PASSWORD=""
DATABASE_NAME="mydb"
```

## 4) Prisma (migrations + client)
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 5) Lancer le serveur
```bash
npm run start
```

L’API tourne sur :
- http://localhost:5000

## Routes
- GET `/` : vérifier que l’API tourne
- Catégories:
  - POST `/categories/create`
  - GET `/categories/get`
  - PUT `/categories/update/:id`
  - DELETE `/categories/delete/:id`
- Produits:
  - POST `/produits/create`
  - GET `/produits/get`
  - PUT `/produits/update/:id`
  - DELETE `/produits/delete/:id`
- Vendeurs:
  - POST `/vendeurs/create`
  - GET `/vendeurs/get`
  - PUT `/vendeurs/update/:id`
  - DELETE `/vendeurs/delete/:id`
- Clients:
  - POST `/clients/create`
  - GET `/clients/get`
  - PUT `/clients/update/:id`
  - DELETE `/clients/delete/:id`
- Ventes:
  - POST `/ventes/create`
  - GET `/ventes/get`
  - PUT `/ventes/update/:id`
  - DELETE `/ventes/delete/:id`
- Auth:
  - POST `/login`
  - GET `/middleware` (protégée par JWT)

## Modèles (Prisma)
- `Categorie`: `id`, `name`, `coleur`, `createdAt`
- `Produit`: `id`, `name`, `description`, `price`, `IdCategorie`, `createdAt`
- `Vendeur`: `id`, `name`, `email` (unique), `password` (hashé), `createdAt`
- `Client`: `id`, `name`, `prenom`, `idVendeur`, `createdAt`
- `Vente`: `id`, `idProduit`, `idClient`, `Qte`, `CordonnéGPS`, `createdAt`
