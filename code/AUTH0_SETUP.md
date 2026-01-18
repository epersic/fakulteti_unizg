# Auth0 Konfiguracija - Kompletan vodič

## 🔐 Korak 1: Registracija na Auth0

1. Idite na [https://auth0.com/](https://auth0.com/)
2. Kliknite **Sign Up** (ili **Sign Up for Free**)
3. Odaberite preferiranu opciju prijave
4. Popunite sve obavezne podatke i završite registraciju

---

## 🎯 Korak 2: Kreirajte novu aplikaciju u Auth0

1. Nakon prijave, u **Auth0 Dashboard** idite na **Applications** (lijevoj strani)
2. Kliknite **Applications** → **Applications**
3. Kliknite plavi gumb **Create Application** (gornja desna)
4. U dijalog koji se pojavi:
   - **Name**: Unesite `Fakulteti UNIZG` (ili bilo koju imena)
   - **Application Type**: Odaberite **Regular Web Application**
5. Kliknite **Create**

---

## ⚙️ Korak 3: Konfigurirajte postavke aplikacije

1. U novoj aplikaciji, idite na karticu **Settings**
2. **Scrollajte dolje** i zapišite sljedeće vrijednosti:

```
Domain: dev-xxxxx.eu.auth0.com
Client ID: xxxxxxxxxxxxxxxx
Client Secret: xxxxxxx_xxxxxxxxxxx
```

### 📝 Postavite sljedeće vrijednosti (važno!):

**Sekcija: Application URIs**

- **Allowed Callback URLs** (zamijenite stari sadržaj s):
```
http://localhost:3000/callback
http://localhost:3000
```

- **Allowed Logout URLs**:
```
http://localhost:3000
```

- **Allowed Web Origins**:
```
http://localhost:3000
```

3. Kliknite **Save Changes** (gornja desna)

---

## 🔑 Korak 4: Provjerite konekciju (Username-Password-Authentication)

1. U **Auth0 Dashboard**, idite na **Connections** → **Database**
2. Trebao bi vidjeti **Username-Password-Authentication**
3. Ako ne postoji, kreirajte novu konekciju:
   - Kliknite na **Create DB Connection**
   - Dajte joj ime (npr. "Username-Password-Authentication")
   - Kliknite **Create**

4. U sekciji **Applications** unutar te konekcije, pazite da je **vaša aplikacija uključena** (trebao bi biti checkbox s kvačicom)

---

## 💻 Korak 5: Postavite aplikaciju lokalno

### 1. Instalirajte nove pakete:

```bash
npm install
```

To će instalirati sve potrebne pakete iz `package.json` uključujući `express-openid-connect` i `dotenv`.

### 2. Kreirajte `.env` datoteku

U koren projekta (ista razina kao `server.js`), kreirajte datoteku `.env` s sljedećim sadržajem:

```
AUTH0_SECRET=your_super_secret_key_that_is_at_least_32_characters_long_change_this
AUTH0_BASE_URL=http://localhost:3000
AUTH0_CLIENT_ID=ZAMIJENITE_S_VAŠIM_CLIENT_ID
AUTH0_CLIENT_SECRET=ZAMIJENITE_S_VAŠIM_CLIENT_SECRET
AUTH0_ISSUER_BASE_URL=https://ZAMIJENITE_S_VAŠIM_DOMAIN

PGHOST=127.0.0.1
PGPORT=5432
PGUSER=postgres
PGPASSWORD=password
PGDATABASE=fakulteti_unizg

PORT=3000
```

**Primjer popunjene `.env` datoteke:**

```
AUTH0_SECRET=my_secret_password_that_is_at_least_32_characters_long_12345
AUTH0_BASE_URL=http://localhost:3000
AUTH0_CLIENT_ID=aBcDeFgHiJkLmNoPqRsT
AUTH0_CLIENT_SECRET=aBcDeFgHiJkLmNoPqRsT_uVwXyZaBcDeFgHiJkL
AUTH0_ISSUER_BASE_URL=https://dev-12345.eu.auth0.com

PGHOST=127.0.0.1
PGPORT=5432
PGUSER=postgres
PGPASSWORD=password
PGDATABASE=fakulteti_unizg

PORT=3000
```

---

## 🚀 Korak 6: Pokrenite aplikaciju

```bash
npm start
```

Trebala bi vidjeti poruku:
```
Server started on http://localhost:3000
```

---

## ✅ Korak 7: Testirajte aplikaciju

1. Otvorite [http://localhost:3000](http://localhost:3000) u pregledniku
2. Trebali bi vidjeti **"Prijava"** poveznicu u gornjem desnom kutu
3. Kliknite na **"Prijava"**
4. Trebao bi vas prebaciti na Auth0 login stranicu
5. Odaberite **Sign Up** (novi korisnik) ili **Log In** (postojeći korisnik)

### Opcija A: Kreirajte novi račun
- Email: Unesite proizvoljan email (npr. `test@example.com`)
- Password: Unesite lozinku koja sadrži velika slova, brojeve i znakove (npr. `Test123!@`)
- Kliknite **Sign Up**

### Opcija B: Koristite podatke iz zadatka
- Email: `or@or.hr`
- Password: `Password1!`
- Kliknite **Log In**

---

## 🎉 Nakon uspješne prijave

Trebali bi vidjeti:

✅ Vaše ime/email umjesto "Prijava"  
✅ Poveznica **"Korisnički profil"**  
✅ Poveznica **"Osvježi preslike"**  
✅ Poveznica **"Odjava"**  

### Što može svaka poveznica:

- **Korisnički profil**: Prikazuje podatke o vama (email, ime, ID, sliku profila)
- **Osvježi preslike**: Osvježava CSV i JSON datoteke iz baze podataka
- **Odjava**: Odjavljuje vas s aplikacije

---

## 🐛 Troubleshooting

### Problem: "Invalid callback URL"
**Rješenje**: Provjerite da su **Allowed Callback URLs** u Auth0 postavkama sadržavaju `http://localhost:3000/callback`

### Problem: "Client configuration mismatch"
**Rješenje**: Provjerite da su `AUTH0_CLIENT_ID` i `AUTH0_CLIENT_SECRET` u `.env` datoteci točni

### Problem: "Cannot read property 'isAuthenticated' of undefined"
**Rješenje**: Pazite da je `express-openid-connect` instaliran: `npm install express-openid-connect`

### Problem: Greška "no pg_hba.conf entry"
**Rješenje**: Provjerite da je PostgreSQL pokrenut i da su kredencijali u `.env` točni

---

## 📋 Datoteke koje su dodane/izmijenjene

### ✅ Nove datoteke:
- `.env` - Konfiguracija (trebali ste kreirati)
- `public/auth.js` - JavaScript za auth logiku
- `public/profile.html` - Stranica s korisničkim profilom
- `.env.example` - Primjer `.env` datoteke

### ✅ Izmijenjene datoteke:
- `server.js` - Dodane Auth0 rute i zaštita
- `package.json` - Dodani novi paketi
- `public/index.html` - Dodan navbar s auth linkovima
- `public/styles.css` - Dodan CSS za navbar

---

## 🔄 Tok Aplikacije

```
1. Korisnik ide na http://localhost:3000
2. Vidi "Prijava" poveznicu
3. Klikne "Prijava" → Prebačen na Auth0 login
4. Upiše email i lozinku
5. Auth0 ga šalje nazad na http://localhost:3000
6. Sada vidi:
   - Seu ime/email
   - "Korisnički profil"
   - "Osvježi preslike"  
   - "Odjava"
7. Ako klikne "Osvježi preslike":
   - Podatci se osvježe iz baze
   - CSV i JSON se spremi na disk
8. Ako ide na /profile.html bez prijave:
   - Vidi grešku "Morate biti prijavljeni"
```

---

## 🔒 Sigurnost

- **Autentifikacija**: Sve zaštićene rute (`/api/profile`, `/api/refresh-data`, `/profile.html`) zahtijevaju prijavu
- **Secrets**: Pazite da `.env` datoteka **NIJE** u Git repozitoriju (trebali bi biti u `.gitignore`)
- **HTTPS**: Na produkciji trebate koristiti HTTPS!

---

## 📞 Dodatna Pomoć

Ako imate problema:

1. Provjerite console tab u pregledniku (F12)
2. Provjerite terminal gdje je server pokrenut
3. Provjerite da su svi podaci u `.env` točni
4. Provjerite da je PostgreSQL pokrenut

Sretno! 🚀
