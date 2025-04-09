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






