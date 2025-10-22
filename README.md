# Fakulteti Sveučilišta u Zagrebu (fakulteti_unizg)
Otvoreni skup podataka fakulteta Sveučilišta u Zagrebu


Kratki opis:
Skup podataka sadrži opis odabranih fakulteta Sveučilišta u Zagrebu, uključujući osnovne kontakt podatke, statistiku (broj studenata i zaposlenih) te popis glavnih odjela/studija (roditelj-dijete veza). Podaci su simulirani i služe kao primjer za laboratorijsku vježbu.

## Metapodaci
- **Licenca:** Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Autor:** Eno Peršić
- **Verzija:** 1.0
- **Jezik:** engleski
- **Datum izrade:** 2025-10-22
- **Opis atributa:** 
  - `id` — jedinstveni identifikator fakulteta
  - `name` — naziv fakulteta
  - `short_name` — kratki naziv
  - `established_year` — godina osnutka
  - `website` — službena web stranica
  - `address.street`, `address.city`, `address.postal_code` — adresa
  - `departments` — lista odjela 
- **Format datoteka:** CSV (`fakulteti_unizg.csv`) i JSON (`fakulteti_unizg.json`)
- **Broj instanci:** 10 fakulteta (s više odjela ukupno 15 redova u CSV)
- **Broj atributa:** ≥10 (u JSON objektu više polja; u CSV 16 stupaca)
- **Normalizacija:** Podaci su normalizirani u odnosu `faculties` (roditelj) → `departments` (dijete)

## Datoteke u repozitoriju
- `fakulteti_unizg.csv` — CSV verzija (rod-dij odnos ponovljenim redovima)
- `fakulteti_unizg.json` — JSON verzija (svaki fakultet kao objekt s poljem `departments`)
- `schema.sql` — SQL shema za PostgreSQL (CREATE TABLE i primjeri INSERT)
- `export_csv.sh` — skripta za izvoz CSV iz PostgreSQL (automatizirano)
- `export_json.sh` — skripta za izvoz JSON iz PostgreSQL (automatizirano)

