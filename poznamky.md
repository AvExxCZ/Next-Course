Next js

Uvod

Co je to next js ?

- je to react framework pro vytváření full-stack webových aplikací

React

- s reactem není možné vytvořit aplikaci se všim všudy pripravenou na produkci
- react je knihovna pro vytváření uživatleskeho rozhrani, responsible jen pro to co vidime
- musite se rozhodovat o dalsich vecesh jako je routing, data fetching, a dalsich

Next js

- používá react na vytváření uživatleskeho rozhrani
- přídává ale další funkce které nam dovolí udelat production ready aplikaci
- tyto funkce jako třeba routing, optimalizovany rendering, data fetching, bundling, compiling a dalsi
- nemusite stahovat dalsi balicky protoze next js ma v sobe vse co potrebujete
- má své postupy a pravidly ktera musite dodrzet aby jste implementovali dane funkce

Proč se učit next js ?

- usnadnuje cely proces vytvareni production ready webovych aplikaci
  -- Routing
  -- API routes
  -- Rendering
  -- Data fetching
  -- Styling
  -- Optimalizace
  -- Dev a Production build system

Co potřebuje umět

- Html
- css
- moderni javascript
- react fundementals

Hello world

Vytvoreni next js projektu

- npx create-next-app@latest

Struktura Projektu

Soubory

Slozky

- app
- public
- .next

Než začneme

React server komponenty

- je to nova architektura vydana react teamem a rychle adoptovana nextem
- tato architektura predstavuje novy zpusob jak vytvaret react komponenty s rozdelovanim je do dvou ruznych typu
  -- server komponent
  --- defoultne next bere vsehcno jako server komponent
  --- tyto komponenty muzou delat veci jako je cteni souboru nebo fetching primo z databaze
  --- nevyhodou je ze nemuzou vyuzit react hooky nebo handle user intekaction
  --- client komponent
  --- pro jejich vytvoreni musime pridayt na zacatek kodu komponentu "use client"
  --- nemuzou delat veci jako je cteni souboru, ale muzou pouzivat hooky, a resit user interactions
  --- muzeme je brat jako tradicni react komponenty z predchozich react verzi
- az se dostaneme na routing uvidite praktike priklady pouziti obou typu komponentu
- work with server komponents that wait for certain operations to compleate before render
- use client components to take advantage of hooks from the routing module

Routing

- next js pouziva file-system based routing system
- URLs you can access in your browser are determined by how you organize your files and folders in your code

Routing conventios

- All routes must live inside the app folder
- route files must be named either page.js or page.tsx
- kazda slozka reprezuntuje segment url cesty

- pokud jsou splnene tyto podminky, file se automaticky stane availible as a route


Dynamic routing
- /products - show a list of all products
- products/1 - show a details of product with id 1
- folder name in square brackets "[productId]"

export default async function Page({ params }: {
    params: Promise<{productId: string}>
}) {
    const productId = (await params).productId;
    return <h2>Product {productId}</h2>
}

Catch all segments - dopsat informace
- "[...slug]" chytí všechny url cesty od nej výš

export default async function Docs({ params }: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params
    if(slug?.length === 2){
        return <h1>Viewing dosc for feature {slug[0]} and concept {slug[1]}</h1>
    } else if(slug?.length === 1){
        return <h1>Viewing dosc for feature {slug[0]}</h1>
    }
    return (
        <h1>Docs home page</h1>
    );
}


Custom NotFound


File Colocation


Private Folder "_lib"


Route Groups
- folder with name "(someName)"



Layouts
How to create layouts
- default export a react component from a layout.js or layout.tsx file
- that component takes a children prop which next js populate with your page content
Nested Layouts



Multiple root layout useing route groops



Routing Metadata
- the metadata api in next js is a powerful feature that lets us define metadata for each page
- metadata ensures our content look great when its shared or indexed by seach engines
- two ways to handle metadata in layout.tsx or page.tsx files:
-- export a static metadata object
-- export a dynamic generateMetadata function

Configuring metadata
- both layout and page can export metadata. layout meatadata applies to all its pages, while page metadata is specific to that page
- when metadata exists in multiple places along a route, they merge together, with page metadata overriding layout metadata for matching properties

import { Metadata } from "next";
type Props = { params: Promise<{productId: string}> }
export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const id = (await params).productId
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`iPhone ${id}`)
        })
    })
    return {
        title: `Product ${title}`
    }
}

- you cannot export metadata in client components

Title metadata
- the title field primaty prupose is to define the document title
- it can be either a string or an object

import { Metadata } from "next";
export const metadata: Metadata = {
    title: {
        default: "Next.js tutorial",
        template: "%s | Formating",
    }
}

title: { absolute: "absolute title" } -- overrides the template title formating



Navigation
- file based routing system
- defining routes for our aplications root, nested routes, dynamic routes, and catch-all routes
- we've been typing urls directly in the browser to test these routes

Users
- click on links
- get redirected after certain actions

import Link from "next/link";
<Link href="/products">Products</Link>

Dynamic link
<Link href={`/products/${id}`}>Product ${id}</Link>

replace prop in link component
- it overrides a current history in a path
- if you go back you will end up on a home page

active links

const linkHref = Some link href
const pathname = usePathname();
const isActive = pathname === linkHref || (pathname.startsWith(linkHref) && linkHref !== "/")
return <Link href={linkHref} className={`${isActive ? "text-blue-500": "text-gray-500"}`} ></Link>



params and search params

- for a given url
-- params is a promise that resolves to an object containing the dynamic route parameters like id
-- searchParams is a promise that resolves to an object containing the query parameters like filters and sorting

- whiel page.tsx has to acces both params and searchParams, layout.tsx has only acces to params



navigatiog programatically

import { useRouter } from "next/navigation";
const router = useRouter()
router.push("/");

redirect("/")



Templates
- template.tsx
- they are similar to layouts in that they are also ui shared between multiple pagres in your app
- whenever a use navigates between routes sharing a template, you get a completely frest start
- you can use both layout and tamplate at a same time, layout is rendered first and his children is a template
- layout <- template <- page



Loading
- loading.tsx
- this file helps us to create loading states that users see while waiting for a content to load in a specific route segment
- the loading states appear instantly when navigating, letting user know that the application in responsive and actively loading content



Special files
- page.tsx
- layout.tsx
- template.tsx
- not-found.tsx
- loading.tsx
- error.tsx



Error
- error.tsx
- dont just throw error in your app, because it is not good for user experince

Recovering from errors

"use client"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
export default function ErrorBoundary({ error, reset }: {
    error: Error;
    reset: () => void;
}){
    const router = useRouter()
    const reload = () => {
        startTransition(() => {
            router.refresh();
            reset()
        })
    }
    return <div>
        <p>{error.message}</p>
        <button onClick={() => reload()}>Try again</button>
    </div>
}

Handling errors in nested routes
- errors always bubble up to find the closest parent error boundary
- an error.tsx file handles errors not just for its own folder, but for all the nested child segments below it too
- by strategically placing error.tsx files at different level is your route folders, you can controll exactly how detailder your error handling gets
- where you put your error.tsx file makes a hufe difference - it determines exactly which parts or your UI get affected when things go wrong

Handling errors in layouts
- an error.tsx file will handle errors for all its nested child segments
- there's an interesting catch with layout.tsx components in the same segment

- the error boundary wont catch errors thrown in layout.tsx within the same segment because of how the component hierarchy works
- the layout actualy sits above the error boundary in the compoennt tree

The component tree
- layout.js
- template.js
- error.js
- loading.js
- not-found.js
- page.js

- The solution to catch error thrown in layout.tsx is by moveing the error.tsx to the parent segment of layout.tsx

Handling global errors
- if an error boundary cant catch errors in the layout.tsx file from the same segment, what about in the root layout?
- it doesnt have a parent segment - how do we handle those errors ?
- well next.js provides a special file called "global-error.tsx" that goes in your root app directory
- this is your last line of defense when something goes catastrophically wrong at the highest level of your app

- works only in production mode
- it requires html and body tags to be rendered

- if you are tesing this by simulating errors you have to get error-wrapper component and you have to be on a production build bsc custom errors dont work on development server



Paraller routes
complex-dashboard, routing-demo

what they are ?
- paraller routing is an advanced routing mechanism that lets us render multiple pages simultaneously within the same layout
-- for example dashboard

How to set them up ?
- paraller routes in next.js are defined using a feature known as "slots"
- slots help organize content in a modular way
- to create a slot, we use the "@folder" naming convention
- Each defined slot automatically becomes a prop in its corresponding "layout.tsx" file

Paraller routes use cases
- dashboard with multiple sections
- split-view interfaces
- multi-pane layouts
- complex admin interfaces
- or any ui where sections has to operate independentally

Paraller routes benefits
- Paraller routes are great for splitting a layout into managable slots (especially when different teams work on different parts)
- independent route handling
- sub navigation

Independent route handling
- each slot in your layout, such as users, revenue and notifications, can handle its own loading and error states

Sub navigation in routes
- each slot can essentially function as a mini-application, complete with its own navigation and state management
- users can interact with each sections separatekym appplying filters, sorting data, or navigating through pages withou affecting other parts

Unmatched routes
- default.tsx

Conditional Rendering



Advanced routing patterns
1. paraller routes
2. intercepring routes



Intercepting routes
- potřebuju dopsat jak to cele funguje a co se tady presne deje, jak delat strukturu složek atd...

Intercepting routes conventions
- we use "(.)folder" to create intercepted route
- "(.)folder" to match segments on the smae level
- "(..)folder" to match segments one level above 
- "(..)(..)folder" to match segments two levelts above
- "(...)folder" to match segments from the root app directory









Next.js Route Handlers
- we've learned how to route to pages
- the app router lets you create custom request handlers for your routes using a feature called route handlers
- unlike page routes, which give us HTML content, Route handlers let us build RESTful endpoints with complete control over the response
- Think of it like building a Node + Express app

Route Handlers contd.
- route handlers are great when making external API request as well
- for example, if you're building an app that needs to talk to third-party services
- route handlers run server-side, our sensitive info like private keys stays secure and never reaches the browser
- route handlers are the equivalent of API routes in page router
- Next.js supports GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS
- if an unsupported method is called, Next will return a 405 Method Not Allowed response


Creating route handlers

- "/dashboard/route.ts"
export async function GET() {
    return new Response("Dashboard Data!")
}

- "/dashboard/users/route.ts"
export async function GET() {
    return new Response("User Data!")
}

- název funkce píšeme podle toho jakou metodu chceme použít

export async function GET() {
  return Response.json(comments);
}

export async function POST(request: Request) {
    const comment = await request.json()
    const newComment = {
        id: comments.length + 1,
        text: comment.text
    }
    comments.push(newComment)
    return new Response(JSON.stringify(newComment), {
        headers: { "Content-Type": "application/json" },
        status: 201,
    })
}




Query Parameters
- co budeme delat pookud chceme filtrovat obsah ktery prijde z API

import { type NextRequest } from "next/server";
import { comments } from "./data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;
  return Response.json(filteredComments);
}



Headers in route handlers
- HTTP headers represent the metadata asscciated with an API request and response

Request Headers
- These are sent by the client, such as a web browser, to the server. They containt essential information about the request, which helps the server understand and process it correctly

import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
   // const requestHeaders = new Headers(request.headers)
   // console.log(requestHeaders.get("Authorization"));

   const headerList = await headers();
   console.log(headerList.get("Authorization"))

   return new Response("<h1>Profile API Data</h1>", {
    headers: {
        "Content-Type": "text/html"
    }
   })
}



Cookies in route handlers
- Cookies are small pieces of data that a server sends to a user's web browser
- doplnit


Redirect in Route Handlers
- doplnit


 
Caching in route handlers
- Route handlers are not cached by default but you can opt into caching when using the GET method
- export const dynamic = "force-static"
- if your reaload the page the time is not changeing on reloads, changes only on rebuild

Data revalidation
- export const revalidate = 10
- revalidate data on every ten seconds

- cacheing only works with GET methods
- Other HTTP methods like POST, PUT, or DELETE are never cached
- if youre useing dynamic functions like headers and cookies, or working with the request object in your GET method, caching wont be applied



Middleware
- middleware in next js is a powerful feature that lets you intercept and control the flow of request and responses throughout your application
- it does this at a global level, significantly enhancing featrures like redirects, URL rewrites, authentication, headers, cookies, and more
- middleware lets you specify paths where it should be active
-- custom matcher config
-- conditional statements

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    // return NextResponse.redirect(new URL('/', request.url))
    if(request.nextUrl.pathname === "/profile"){
        return NextResponse.redirect( new URL("/hello", request.nextUrl))
    }
}

// export const config = {
//     matcher: "/profile",
// }

- if you dont want to rewrite the url adress you cvan use .rewrite insted of .redirect and the url in the browser wont change
- return NextResponse.rewrite( new URL("/hello", request.nextUrl))

  const response = NextResponse.next();
  const themePreference = request.cookies.get("theme");
  if (!themePreference) {
    response.cookies.set("theme", "dark");
  }
  response.headers.set("custom-header", "custom-value")
  return response;



Routing section summary
- Route definition
- Pages and Layouts
- Dynamic routes
- route groups
- Linking and navigation
- Loading and error states
- Paraller routes and intercepting routes
- Route handlers and middleware




Rendering

renderování je proces transformace komponentu a kodu ktery napisete na UI které vidí a se kterým interaguje uživatel

v next js je obtizne postavit dobre optimalizovanou aplikacibez toho ze vite jak funguje tato transformace a proces renderování

CSR, SSR, a RSCs

Renderovani v reactu => renderování v next.js
chvíli vám zabere než se dostanete do renderovani a než budete chapat jak to cele funguje a kdy se vyplati pouzit jakou metodu renderovani




Renderovani v reactu 

podivame se na to jak se react renderovani posunulo za posledich par let

mozna si pamatujete na dobu kdy react byl primarne pouzivany na single page aplikace (SPAs)




Client-side rendering

cely proces kdy prohlizec (klient) meni react komponenty na neco co muzete videt na obrazovce - tento process se nazyva client-side rendering => prohlizec generuje obsah z javascript souborů

CSR se stalo populární pro SPAs a všichni ho používaly

Ale netrvalo to dlouho a developeři si začali všímat slabých stránek tohoto renderování

Slabé stránky CSR
- SEO
-- když search enginy prochazeli vasi stranku divaly se hlavne na html kontent, ale pri pouziti csr vase html je prazdne  a je to v podstate prazdy div - a to neni dobre pro search engine protoze nemuzou vedet o cem je vase stranka
-- pokud mate hodne podrazench komponentu ktere volaji API tak se obsah muze nacitat pomalu a search engine ho vubec nezachyti

- Performance and UX
-- vas prohlizec (klinet) musi udelat vsechno: volani API, transformace reactu na UI, muse udelat interaktivitu v JS - a to je hodne veci
-- uzivatele pak skonci tak ze koukaji na prazdnou stranku nebo na nacitaci kolecko
-- pokazde kdyz do vasi aplikace neco pridate tak se javascript bundle zvetsi a uzivatele budou cekat jeste dele
-- toto je jeste horsi pro lidi co maji pomalejsi internet 




Server-side solutions

- Search engines can now easily indey the server-rendered content, solving our seo problem

- Users see actual HTML content right away instead of staring at a blan screen or loading spinner



Hydration

- During hydration, react takes controll in the browser and reconstructs the component tree in memory, useing the server-rendered HTML as a blueprint

- it carefully maps out where all the interactive elements should go, then hooks up the javascript logic

- this involves initializing application state adding click and mouseover handlers, and seting up all the dynamic features needed for a full interactive user experience




Server site solutions
1. Static site generation (SSG)
2. Server-Side rendering (SSR)

SSG happens during build time when you deploy your application to the server.
This results in pages that are already rendered and redy to server, Its perfect for content that stays relatively stable, like blog posts

SSR on the other hand, renders pages on-demand when users request them Its ideal for personalized content like socal media feeds where HTML changes based on whos logged in

Server side rendering (ssr) was a significant improvement over client-side rendering (csr), providing faster initial page loads and better SEO



Problemy s SSR

1. You have to fetch everithing before you can show anything
- Components cannot start rendering and then pause or "wait" while data is still being loaded
- If a component needs to fetch data from a database or another source (like API), this fetiching must be completed before the server can begin rendering the page
- This can delay the server's response time to the browser, as the server must finish  collecting all necesserady data before any part of the page can be sent to the clinet


2. You have to load everything befoer 

For succesfull hydration, where react adds interactivify to the server-rendered HTML, the component tree in the browser must exactly match the server-generated component tree

This means that all the javascript for the component must be loaded on the client before you can start hydration any of them


3. you have to hydrate everithing before you can interact with anything

React hydrates the component tree in a single pass, meaning once it starts hydrating, it wont stop until its finished with entire tree

As a consequence, all components must by hydrated before you can interact with any of them


Drawbacks of SSR - all or nothing waterfall 
1. having to load the data for the entire page
2. loading the javascript for the entire page, and
3. hydrating the entire page 

at once, create and "all or nothing" waterfall problem that spans from the server to the client, where each issue must be resolved before moving to the next one


Drawbacks of SSR
1. we cant start rendering HTML until all data is fetched on the server 
2. we need to wait for all javascript to load on the client before hydration can begin
3. Every component needs to be hydrated before any of them become interactive

These issues create an "all-or-nothing" waterfall effect theat pretty inefficient especially when some part of your app are slower than others



Suspense SSR architecture

- Use <Suspense> component to unlock two major SSR features:
1. HTML streaming on the server
2. Selective hydration on the client

<Layout>
    <Header/>
    <Sidenav/>
    <Suspense fallback={ <Spinner/> }>
        <MainContent>
    </Suspense>
    <Footer/>
</Layout>



Html streaming on the server

With suspense - you dont have to fetch everything before you can show anything

If a particular section is slow and could potentially delay initial HTML, no problem!

It can be semlessly integrated into the stream later when its ready




The other hurdle

Even with faster html delivery, we cant start hydrating until we've loaded all javascript for the main section

If thats a big chunk of code, we've still keeping users waiting from beingle able to interact with the page




Code splitingg

It lets you tell your bundler, "These parts of the code arent urgent - split them into separate scripts"

Useing React.lazy for code splitting separates your main sections code from the core javascript bundle

the browser can download react and most of your apps code indepently




Selective hydration on the client

By wraping your main section in a "<Suspense>" component, you're not just enabling streaming but also telling React its okay to hydrate other parts of the page before everything ready

This is what we call selctive hydration of parts of the page as they become availible, even before the rest of the html and the javascript code are fully downloaded

Thanks to selective hydration, a heavy chunk of javascript wont hold up the rest of your page from becoming interactive



Selective hydration on the clinet contd.

Selective hydration also solves our third problem: the necessity to "hydrate everything to interact with anything"

React starts hydration as soon as it can, which means users can interact with things like the header and side navigation without waiting for the main content

this process in managed automatically by react

In scenarios where multiple components are awaiting hydration, React prioritizes hydratiom based on user interactions



Drawbacks of suspense SSR

First, even though were streaming javascript code to the browser bit by bit, eventually users still end up downloading the enrite code for a webpage

As we keep adding features to our apps, this code keeps growing

this leads to an important question:
Do users really need to download so much data?


Another issue: 

Right now, every component gets hydrated on the client side, whether it needs interactibity or not

This means were using up resources and slowing down load times and time to interactivity by hydrating components that might just be static content

this leads to another question:
should all components by hydrarted, even those that dont need interactivity?


Third challange:

Even though servers are way better at handling heavy processing, were still making users devices do bulk of the javascript work

This can really slow things down, esspecially on less powerful devices

This leads to another important question:
Shouldnt we be leveraging our server more?



The evolution of react

CSR => SSR => Suspense for SSR

Suspense for SSR brought us closer to a seamless rendering experience


Challanges:

Large bundle sizes cousing excessive downloads for users

Unnecessary hydration delaying interactivity

Heavy client-side processing leading to poorer performance




React Server Components (RSC)

React Server Components (RSC) represent a new architecture designed by the React team

This approach leverages the strengths of both server and client environments to optimize efficiency, load times, and interactivity

The architecture introduces a dual-component model 
 - Client components
 - Server components

This distinction in based not on the components functionality but rather on their excution encironment and specific systems they are designed to interact with


Client components

Client componetns are the familiar React components we have been using

they are typically rendered on the cline-side CSR but, they can also be rendered to HTML on the server SSR allowing users to immediately see the pages HTML rather than a blank screen

"client components" can render in the server

Optimization strategy

Client components primarly operate on the client but can and should also run once on the sever for bettwe performance

Clinet components have full access to the clinet enviromental, such as the browser, allowing them to use state, effect, and event listeners for handling interactivity

They can also access browser-exclusive APIs like geolocation or localstorage, allowing you to build UI for specific use cases

In fact the term "Client component" doesnt signify anything new; it simply helps differentiate these components from the newly introduced Server Components



Server Components

Server Components represent a new type of React component specifically designed to operate exclusively on the server

And unlike client components, their code stays on the serrver and in never downloaded to the client

This design choice offers multiple benefits to react applications


Benefits of server components:


Smaller bundle sizes

Since Server Components stay on the server, all their dependencies stay there too

This is fantastic for users with slower connections or less powerfull devices since they dont need to download, parse, and execute that javascript

Plus theres no hydration step, making your app load and become interactive facter


Direct access to server-side resources

Server components can talk directly to database and file systems, making data fetching efficient without any client-side processing

They use the servers power and proximity to data sources to manage compute-intensive rendering tasks


Enhanced security

Since server components run only on the server, sensitive data and logic - like API keys and tokens - never leave the server


Imporoved data fetching

Server components allow you to move data fetiching to the server, closer to your data source

This can improve performance by reducing time it takes to fetch data needed for rendering, and the number of requests the client needs to make


Caching

When you render on the server, you can cache the results and reuse them for different users and request

This means better performance and lower costs since youre not re-rendering and re-fetching data all the time


Faster initial page load and First Contentful Paint

By generating HTLM on the server, users see your contetnt immediatley - no waiting for javascript do download and execute


Improved SEO

Seach engines bots can easily read the server-rendered HTML, making your page more indexable


Efficient streaming

Server Components can split the rendering process into chunks that stream to the client as theyre ready

This means users start seeing content faster instead of waiting for the entire page to render on the server 



Server Components handle data fetching and static rendering, while Client Components take care of rendering the interactive elements

The beauty of this setup is that you get the best of both server and client rendering while using a single language, framework and set of APIs


RSC key takeways

React Server Components offer a new approach to building React apps by separating components into two: Server Components and Clinet Components

Server Components run exclusively on the server - they fetch data and prepare content without sending code to the browser

This makes your app faster because users download less code

However, they cant handle any interactions

Client Components, on the other hand, run in the browser and manage all the interactive parts like clicks and typing

They can also get an initial server render for faster page loads



RSC and Next.js

You might be thinking "Okay, this is all great information about React's rendering evolution, but how does this connect to Next.js?"

The App Router in Next.js is build entirely on the RSC architecture

All these benefits we have discussed? They are already built into the lates version of next.js

Understanding the evolution of React's rendering provides the foundationneeded for you to grasp what we are about to explore as we dive deepre into Next.js



RSC

Server Components

Client Components



RSC + Next.js


Every component in Next.js app defaults to being a server component

Try creating a new page About in app/ and log the message  to see that its server component by default

export default function Page() {
  console.log("About server component...");
  
  return (
    <h1>About Page</h1>
  );
}


Running components on the server brings several advantages: zero-bundle size, direct access to server-side resources, improving security, and better SEO

Server Components cant interact with browser APIs or handle user interactions

for example if you try to use STATE in our page you will get an Error because you can use State only in Client Components

import { useState } from "react";

export default function Page() {
  console.log("About server component...");

  const [name, setName] = useState(null)
  
  return (
    <h1>About Page</h1>
  );
}



Creating Next.js Client component that can handle State and interactions

"use client";
import { useState } from "react";
export default function Page() {
  const [name, setName] = useState("")
  return (
    <div>
      <h1>Dashboard</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello {name}</p>
    </div>
  );
}


Summary

In the RSC architecture any by extension in the Next.js app router, components are server components by default

To create client components, add the "use client" directive at the top of the file

Sever componetns are rendered exclusively on the server

Client components are rendered once ont the server and then on the client



RSC rendering lifecycle

we are going to learn about hte rendering lifecycle of server and client components

In simple terms, we will explore how they come to life on your screen

When we talk about React Server Components (RSC) we are dealing with three key players:

1. your browser ( the client )
2. Next.js ( our framework )
3. React ( our library )


RSC Loading sequencce

RSC Update Sequence




Server rendering strategies

- Static Rendering

- Dynamic Rendering

- Streaming




Static Rendering

Static rendering is a server rendering strategy where we generate HTML pages when building our application

Think of ot as preaparing all your content in advance - before any user visits your site

Once built, these pages can be cached by CDNs and served instantly to users

With this approach the same pre-rendered page can be shared among different users, giving your app a significant performance boost

Static rendering perfect for things like blog posts, e-commerce product listing, documentation, and marketing pages



How to statically render?

Static rendering is the default strategy in the app router

All routes are automatically prepared at build time without any additional setup

"Hold on - you keep talking about generating HTML at build time, but we havent built our application yet, right? We are just running it in development mode?"



Production server vs dev server

In production, we create one optimized build and deploy it - no on-the-fly changes after deployment

A development server, on the other hand, focuses on the developer experience

We need to see our changes immediately in the browser without rebuilding the app every time

In production, pages are pre-rendered once during the build

In development, pages are pre-rendered on every request



Dynamic Rendering

Dxynamic rendering in a server rendering strategy where routes are rendered uniquely for each user when they make request

It is useful when you need to show personalized data or information thats only availible at request time ( and not ahead of time during prerending ) - things like cookies or url search parameters

News websites, personalized shopping pages, and social media feeds are some examples where dynamic rendering is beneficial



How to dynamically render

Next.js automatically switches to dynamic rendering for an entire route when it detects what we call a "dynamic function" or "dynamic API"

In Next.js, these dynamic functions are: 
 - cookies()
 - headers()
 - connection()
 - draftMode()
 - searchParams prop
 - after()

Using any of these automatically opts your entire route into dynamic rendering at request time



Dynamic rendering summary

Dynamic rendering is a stratefy where the HTML in generated at request time

Next.js automatically enables it when it encounters dynamic functions like cookies. headers, connecrion, draftMode, after, or searchParams prop

Dynamic rendering is great for personalized content like social media feeds

You dont have to stress about  choosing between static and dynamic rendering

Next.js automatically selects the optional rendering strategy for each route based on the features and APIs you are using



generateStaticParams()

generateStaticParams is a function that
 - works alongside dynamic route segments
 - to generate static routes during the build time
 - instead of on demand at request time
 - giving us a nice performance boost



dynamicParams

Controll what happens when a dynamic segment is visited that was not generated with generateStaticProps

true - Next.js will statically render pages on demand for any dynamic segments not included in generateStaticParams()

false - Next.js will return a 404 error for any dynamic segments not included in our pre-rendered list


dynamicParams contd.

true:
If you are building an e-commerce site, you will probably want to keep dynamicParams set to true

This way, you can pre-render your most popular pages for better performace, but still allow access to all your other products - they will just be rendered on demand

false:
If you are working with something like a blog where you have a smaller, more fixed number of pages, you can pre-render all of them and set dynamicParams to false

If someone tries to access a blog post that doesnt exist, they will get a clean 404 error instead of waiting for a page that will never exist




Streaming

Streaming is a strategy that allows for progressive UI rendering from a server

Work is broken into smaller chunks and streamed to the client as soon as they are ready

This means users can see parts of the page right away without waiting for everything to load

Its particulary powerful for improveing initial page load tiems and handling UI elements that depend on slower data fetches, which would normaly hold up the entire route

Streaming comes built in right into the App router

Wrapping slower elements with suspense can provide better UX and faster load of other content on the page like title, optionaly you can use fallback={<p>loading...</p>}




Server and client composition patterns

Server components
 - fetching data
 - accessing backend resources directly
 - keeping sensitive information (like access tokens and API keys) secure on the server
 - handling large dependencies server-side - which meand less JavaScript for your users to download

Client components
 - adding interactivity
 - handling event listeners (like onClick(), onChange(), etc.)
 - managing state and lifecycle effects (using hooks like useState(), useReducer(), useEffect())
 - working with browser-specific APIs
 - implementing custom hooks
 - Using React class components




Server-only code

Some code is specifically designed to run exclusively on the server

Think about modules or functions that work with multiple libraries, handle environment variables, communicate directly with database, or process sensitive information

Since JavaScript modules can be shared between Server and Client Components, code meant for the server could accidentally find its way to the client

This is bad news as it can bloat your JavaScript bundle, expose your secret keys, database queries, and sensitive business logic

Its super important to keep server-only code separate from the client-side code


server-only package

-- npm install server-only

Throws a build-time error if someone accidentaly imports server code into a Client Component

import "server-only"; at the top of the document




Third-party packages

Server Components have introduced an exciting new paradigm in React, and the ecosystem is evolving to keep up

Third-party packages are starting to add the "use client" directive to components that need client-side features, making it cleaer where they should run

Many npm packages have not made this transition yet

This means while they work fine in Client Components, they might break or fail completely in Server Components

We can wrap the third-party components that need client-side features in our own Client Components




Context providers

Context providers typically live near the root of an application to share global state and logic

For example, your application's theme

However, React context is not supported in Server Components

If you try to create a context at your application's root, you will run into an error

The solution is to create your context and render its provider inside a dedicated Client Component




Client-only code

Just like how we need to keep certain operations server-side, its equelly crucial to keep some functionality strictly on the client side

Client-only code works with browser-specific features - think DOM manipulation, window object interactions, or localStorage operations

These features arent available on the serve, so we need to make sure such code runs only on the client side to avoid server-side rendering errors

To prevent unintended server side usage of client code, we can use a package called client-only

npm i client-only --force

import "client-only";




Client Component placement

Since server components cant handle state and interactivity, we need client components to fill this gap

The key recommendation here is to position these client components lower in your component tree


Interleaving Server and Client Components

- server component inside another server component
- client component inside another client component
- client component inside a server component
- server component inside a client component => ERROR

Workaround an unsupported patterns




Rendering Section Summary

CSR
SSR
Suspense for SSR
RSCs
Server and client components
RSC rendering lifecycle
Static and dynamic rendering
Streaming
Server and client composition patterns





<<<<<<< HEAD
Rendering
=======
Data fetching and mutations

So far, we have been working with har-coded content in our routes and components

In actual enterprise apps, you are usually pulling data from external sources

The App Router is built on React Server Components (RSC) architecture which gives us the flexibility to fetch data using either server components or client components



Data fetching in App Router contd.

Its usually preferable to use server components for data operations because:

- You can directly communicate with your database and file systems on the server side

- You get better performance since you are closer to your data sources
 
- Your client-side bundle stays lean because the heavy lifting happens server-side

- Your sensitive operations and API keys remain source on the server



Fetching data in client components

We should use client components for fetching only when we absolutly need to, like when you need real time updates or when your data depends on client site interactions that you can predict on the server side

For everything else the recommended way to fetch data is in the server components



Fetching data with Server Components

The RSC architecture supports async and await keywords in Server Components

This means we can write our data fetching code just like regular JavaScript, using async functions coupled with the await keyword



Request memoization

-- react will deduplicate fetch request with the same url and options

This means you can fetch data wherever you need it in your component tree without worrying about duplicate network requests

React will only make the actual fetch once and reuse the result for subsequent calls during the same render pass

Its a React feature and thereby included in Next.js

Lets you write data-fetching code exactly where you need it rather than having to centralize fetches and pass data down through props




Loading and Error states for data fetching

While client components require you to manage these states with separate variables and conditional rendering, server components make this process much cleaner

To implement a loading state, all we need to do is define and export a React component in loading.tsx

For handling errors, define and export a React component in error.tsx 




Data fetching patterns

When fetching data inside components, you need to be aware of two data fetching patterns:

1. Sequential
2. Parallel

Sequential: requests in a component tree are dependent on each other. This can lead to longer loading times.

Parallel: requests in a route are eagerly initiated and will load data at the same time. This reduces the total time it takes to load data.



Suquential fetching 

We will create posts component
 - fetches all posts
 - for each post, fetch author using the userId property
 - example of sequential fetching because we need the userId from each post before we can fetch its author



Fetching data from a database

We have looked at how to fetch data from API endponints using the fetch API

lets dive into fetching data from a database in Server Components

What we are about to cover is super important - its the foundation for data mutations and server actions coming up next

Two key reasons why fetching data directly from a database is powerfull

1. server components have direct access to server-side resources, which makes database interactions seamless

2. since everything happens on the server, we dont need API routes or worry about exposing sensitive information to the client


Fetching from a database contd.

We are going to be working with two super helpful tools - SQLite and Prisma 

SQLite
 - a simple, file-based database to store information in your project
 - it doesnt require a server or a complex setup and its perfect for learning and prototyping

Prisma
 - a tool that makes it really easy to talk to your database
 - its like a translator that helps your code communicate with SQLite




Data mutations 

When we work with data, we are typically performing what we call CRUD operations.

- Create
- Read
- Upadte
- Delete



Data mutations contd.

To follow along, make sure to check out the previous topic on fetching data from a database where we set up our prisma client with a SQGLite database

To really appreciate the app router's approach to data mutations, its worth looking at how we have traditionally handled data mutations in React

This comparison will help us appreciate the benefits of the app router approach

## Add here how does the basic react data mutations work

But there is better way to handle this logic
>>>>>>> c7ebb47b1c737c394a685e6e23082acc6144933b





<<<<<<< HEAD
=======
Server Actions

Server Actions are asynchronous functions that are executed on the server

They can be called in Server and Client Componnets to handle from submissions and data mutiations in Next.js applications

You should use Server Actions when you

 - need to perform secure database operations
 - want to reduce API boilerplate code
 - need progressive enhancement for forms
 - want to optimize for performance




Server Actions convention

A Server Action can be defined with the React "use server" directive

You can place the directive
 - at the top of an async function to mark the function as a Server Action, or
 - at the top of a separate file to mark all exports of that file as Server Actions

## how to use server actions - demo


Server Actions benefits

Simplified code: they dramatically simplify your code as there in no need for separate API routes or client-side state management for form data

Improved security: they boost security by keeping sensitive operations serve-side, away from potential threats

Better performance: they improve performance because there is less JavaScript running on the client, leading to faster load times and better core web vitals

Progressive enhancement: forms keep working even if JavaScript is turned off in the browser - making your apps more accessible and resilient




Pending state with useFormStatus

useFormStatus is a React hook that gives us status informations about the last form submission

const status = useFormStatus()

- penging: a boolean that indicates if the parent <form> iscurrently submtting
- data: an object containing the form's submission data 
- method: a string (either 'get' or 'post') showing the HTTP method being used 
- action: a reference to the function that was passed to the parent <form>'s action prop

We will use "pending" to disable our submit button while the form is being processed



Form validation with useActionState

useActionState is a React hook that allows us to update state based on the result of a form action

It is particulary helpful for handling validation and error messsages

## code example, povidani k tomu ajk to cele funguje a co tento hook vraci

## reseni erroru ze nemuzeme pouzit tento client hook a zaroven use server u ty server action



Separating Server Actions

## predchzi error basically vyresime tak ze celu nasi server action presuneme do jineho souboru a nahoru dame "use server", opravime importy a exporty idk... do ty server action musime pridat nejakej previos state protoze ho automaticky dostane idk idk...



Pending (useFormStatus) vs isPending (useActionState)

Both can help us determine if a form is being submitted and let us disable the submit button - but there is an interesting difference between them

The pending state from useFormStatus is speccifically for form submissions

isPending from useActionState can be used with any Action, not just submissions

How to choose one from them?
- Go with "pending" from useFormStatus when you are building reusable components that are meant to live inside forms. For example, submit buttons or loading spinners that you will want to use across different forms in your application.

- Choose "isPending" from useActionState when you need to keep track of server actions that are not necessarily related to form submissions. It gives you that extra flexibility.

## next 15 - video 78 - priadni nazoru lidi z komentaru kdy a u ceho je pouzit




Update Server Action

## code example here


>>>>>>> c7ebb47b1c737c394a685e6e23082acc6144933b

