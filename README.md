
---

# Next.js Kurz – Poznámky

Vítej v mých poznámkách z Next.js kurzu! Tady najdeš všechno, co jsem se zatím naučil o Next.js, a to v přátelském a srozumitelném formátu. Pokud ti něco nebude jasné, nebo budeš chtít něco doplnit, klidně mi napiš.

---

## Úvod

### Co je Next.js?

Next.js je **React framework** pro vytváření **full-stack webových aplikací**. Zatímco React je skvělý pro tvorbu uživatelského rozhraní (UI), sám o sobě nestačí na vytvoření kompletní aplikace připravené pro produkci. Next.js přidává další funkce, které nám umožní vytvořit plnohodnotnou aplikaci bez nutnosti stahovat další balíčky.

---

## Proč se učit Next.js?

Next.js nám **usnadňuje celý proces** vytváření webových aplikací. Nabízí spoustu vestavěných funkcí, jako jsou:

- **Routing** – Systém pro navigaci mezi stránkami.
- **API Routes** – Možnost vytvářet backendové endpointy přímo v Next.js.
- **Rendering** – Optimalizované způsoby vykreslování stránek (Server-Side Rendering, Static Site Generation atd.).
- **Data Fetching** – Snadné načítání dat.
- **Styling** – Podpora různých způsobů stylování (CSS, SASS, CSS-in-JS atd.).
- **Optimalizace** – Automatická optimalizace obrázků, kódu a dalších zdrojů.
- **Dev a Production Build System** – Next.js má vestavěný vývojový a produkční build systém.

---

## Co potřebuješ umět, než začneš?

Než se pustíš do Next.js, měl bys mít alespoň základní znalosti:

- **HTML** – Základy tvorby webových stránek.
- **CSS** – Základy stylování.
- **Moderní JavaScript** – ES6+ syntaxe (arrow funkce, promises, async/await atd.).
- **Základy Reactu** – Komponenty, props, state, hooks.

---

## Hello World – Vytvoření Next.js projektu

Začneme jednoduše. Pro vytvoření nového Next.js projektu stačí spustit tento příkaz:

```bash
npx create-next-app@latest
```

Tento příkaz vytvoří nový projekt s veškerou základní konfigurací.

---

## Struktura projektu

Po vytvoření projektu uvidíš několik složek a souborů. Zde je stručný přehled:

- **`app`** – Hlavní složka pro tvé stránky a routy.
- **`public`** – Složka pro statické soubory (obrázky, fonty atd.).
- **`.next`** – Složka generovaná Next.js, obsahuje buildované soubory.

---

## React Server Komponenty

Next.js používá novou architekturu **React Server Components**, která rozděluje komponenty na dva typy:

1. **Server Komponenty**
   - Výchozí typ v Next.js.
   - Můžou dělat věci jako čtení souborů nebo fetching dat přímo z databáze.
   - **Nevýhoda**: Nemůžou používat React hooky nebo řešit uživatelské interakce.

2. **Client Komponenty**
   - Pro jejich vytvoření musíš přidat na začátek kodu `"use client"`.
   - Můžou používat React hooky a řešit uživatelské interakce.
   - **Nevýhoda**: Nemůžou dělat věci jako čtení souborů.

---

## Routing

Next.js používá **file-system based routing system**. To znamená, že URL, které můžeš v prohlížeči navštívit, jsou určeny tím, jak organizuješ soubory a složky v projektu.

### Základní pravidla routování

- Všechny routy musí být uvnitř složky `app`.
- Soubory rout musí být pojmenovány jako `page.js` nebo `page.tsx`.
- Každá složka reprezentuje segment URL cesty.

### Dynamické routování

Pokud chceš vytvořit dynamickou routu (např. `/products/1`), použij složku s názvem v hranatých závorkách, například `[productId]`.

```tsx
export default async function Page({ params }: { params: { productId: string } }) {
  const productId = params.productId;
  return <h2>Product {productId}</h2>;
}
```

### Catch-all segments

Pokud chceš zachytit všechny URL cesty od určité úrovně, použij složku s názvem `[...slug]`.

```tsx
export default async function Docs({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  if (slug?.length === 2) {
    return <h1>Viewing docs for feature {slug[0]} and concept {slug[1]}</h1>;
  } else if (slug?.length === 1) {
    return <h1>Viewing docs for feature {slug[0]}</h1>;
  }
  return <h1>Docs home page</h1>;
}
```

---

## Metadata

Next.js umožňuje definovat metadata pro každou stránku pomocí **Metadata API**. Metadata zajišťují, že náš obsah vypadá skvěle, když je sdílen nebo indexován vyhledávači.

### Statická metadata

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Tutorial",
  description: "Learn Next.js with this awesome tutorial!",
};
```

### Dynamická metadata

```tsx
import { Metadata } from "next";

type Props = { params: { productId: string } };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const id = params.productId;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`iPhone ${id}`);
    }, 100);
  });
  return {
    title: `Product ${title}`,
  };
};
```

---

## Navigace

Pro navigaci mezi stránkami použij komponentu `Link` z Next.js.

```tsx
import Link from "next/link";

<Link href="/products">Products</Link>;
```

### Dynamický odkaz

```tsx
<Link href={`/products/${id}`}>Product {id}</Link>;
```

---

## Error Handling

Next.js poskytuje speciální soubor `error.tsx` pro zachycení chyb. Pokud dojde k chybě, uživatel uvidí přátelskou chybovou stránku.

```tsx
"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reload}>Try again</button>
    </div>
  );
}
```

---


## Route Handlers

Next.js umožňuje vytvářet **Route Handlers**, což jsou vlastní endpointy pro zpracování HTTP požadavků. Jsou to vlastně backendové funkce, které můžeš volat z frontendu.

### Jak vytvořit Route Handler?

Route Handlers se vytvářejí v souborech `route.js` nebo `route.tsx` uvnitř složky `app`. Každý soubor reprezentuje jeden endpoint.

#### Příklad: Jednoduchý GET request

```tsx
// app/api/hello/route.ts
export async function GET() {
  return new Response("Hello, World!");
}
```

Tento endpoint bude dostupný na adrese `/api/hello`.

#### Příklad: POST request s daty

```tsx
// app/api/users/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
```

Tento endpoint přijímá POST request s daty a vrací je zpět.

---

## Paralelní Routy

Paralelní routy jsou pokročilý koncept v Next.js, který umožňuje vykreslovat více stránek současně v rámci jednoho layoutu. Je to užitečné například pro dashboardy nebo složité admin rozhraní.

### Jak nastavit paralelní routy?

Paralelní routy se nastavují pomocí **slotů**. Slot je speciální složka pojmenovaná pomocí `@` (např. `@dashboard`).

#### Příklad: Dashboard s paralelními routami

```
app/
├── @dashboard/
│   ├── users/
│   │   └── page.tsx
│   ├── revenue/
│   │   └── page.tsx
│   └── notifications/
│       └── page.tsx
└── layout.tsx
```

V `layout.tsx` pak můžeš přistupovat k jednotlivým slotům jako k props:

```tsx
export default function DashboardLayout({
  children,
  users,
  revenue,
  notifications,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
  revenue: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div>
      <div>{users}</div>
      <div>{revenue}</div>
      <div>{notifications}</div>
      <div>{children}</div>
    </div>
  );
}
```

---

## Intercepting Routes

Intercepting Routes je další pokročilý koncept, který umožňuje "zachytit" routu a zobrazit ji v kontextu aktuální stránky. Je to užitečné například pro modální okna nebo rychlé náhledy.

### Jak to funguje?

Intercepting Routes se nastavují pomocí speciálních složek s názvem v závorkách, například `(.)folder` nebo `(..)folder`.

#### Příklad: Zachycení routy pro produkt

```
app/
├── products/
│   └── [id]/
│       └── page.tsx
└── (.)products/
    └── [id]/
        └── page.tsx
```

Když uživatel klikne na odkaz `/products/1`, Next.js "zachytí" tuto routu a zobrazí ji v kontextu aktuální stránky.

---

## Error Handling – Globální chyby

Pokud chceš zachytit chyby na nejvyšší úrovni (například v root layoutu), můžeš použít speciální soubor `global-error.tsx`.

### Příklad: Globální chybová stránka

```tsx
"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```



