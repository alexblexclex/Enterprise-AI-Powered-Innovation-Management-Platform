var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  Layout: () => Layout,
  default: () => App,
  links: () => links
});
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-EPYWD7ZX.css";

// app/root.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx2(Outlet, {});
}

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => Dashboard
});
import { useLocation } from "@remix-run/react";

// app/components/layout/Sidebar.tsx
import { Link } from "@remix-run/react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Sidebar({ activeRoute }) {
  let navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "\u{1F4CA}" },
    { name: "Innovation Board", href: "/board", icon: "\u{1F4CB}" },
    { name: "Ideas", href: "/ideas", icon: "\u{1F4A1}" },
    { name: "Billing", href: "/billing/overview", icon: "\u{1F4B3}" }
  ], isActive = (path) => path === "/billing/overview" && activeRoute?.startsWith("/billing") ? !0 : activeRoute === path;
  return /* @__PURE__ */ jsx3("div", { className: "hidden md:flex md:flex-shrink-0", children: /* @__PURE__ */ jsx3("div", { className: "flex flex-col w-64", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col h-0 flex-1 bg-gray-800", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex-1 flex flex-col pt-5 pb-4 overflow-y-auto", children: [
      /* @__PURE__ */ jsx3("div", { className: "flex items-center flex-shrink-0 px-4", children: /* @__PURE__ */ jsx3("span", { className: "text-white text-2xl font-bold", children: "IdeaFlow" }) }),
      /* @__PURE__ */ jsx3("nav", { className: "mt-5 flex-1 px-2 space-y-1", children: navigation.map((item) => /* @__PURE__ */ jsxs2(
        Link,
        {
          to: item.href,
          className: `${isActive(item.href) ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} group flex items-center px-2 py-2 text-base font-medium rounded-md`,
          children: [
            /* @__PURE__ */ jsx3("span", { className: "mr-3 flex-shrink-0 h-6 w-6 text-center", children: item.icon }),
            item.name
          ]
        },
        item.name
      )) })
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "flex-shrink-0 flex border-t border-gray-700 p-4", children: /* @__PURE__ */ jsx3("div", { className: "flex-shrink-0 group block", children: /* @__PURE__ */ jsx3("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs2("div", { className: "ml-3", children: [
      /* @__PURE__ */ jsx3("p", { className: "text-sm font-medium text-white", children: "Admin User" }),
      /* @__PURE__ */ jsx3("p", { className: "text-xs font-medium text-gray-400 group-hover:text-gray-300", children: "View profile" })
    ] }) }) }) })
  ] }) }) });
}

// app/components/layout/Header.tsx
import { useState } from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Header({ title }) {
  let [isNotificationsOpen, setIsNotificationsOpen] = useState(!1), [isProfileOpen, setIsProfileOpen] = useState(!1);
  return /* @__PURE__ */ jsx4("header", { className: "bg-white shadow-sm z-10", children: /* @__PURE__ */ jsx4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs3("div", { className: "flex justify-between h-16", children: [
    /* @__PURE__ */ jsx4("div", { className: "flex", children: /* @__PURE__ */ jsx4("div", { className: "flex-shrink-0 flex items-center", children: /* @__PURE__ */ jsx4("h1", { className: "text-2xl font-semibold text-gray-900", children: title }) }) }),
    /* @__PURE__ */ jsx4("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs3("div", { className: "hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center", children: [
      /* @__PURE__ */ jsxs3("div", { className: "ml-3 relative", children: [
        /* @__PURE__ */ jsxs3(
          "button",
          {
            type: "button",
            className: "bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            onClick: () => setIsNotificationsOpen(!isNotificationsOpen),
            children: [
              /* @__PURE__ */ jsx4("span", { className: "sr-only", children: "View notifications" }),
              /* @__PURE__ */ jsx4("span", { className: "h-6 w-6 text-center", children: "\u{1F514}" })
            ]
          }
        ),
        isNotificationsOpen && /* @__PURE__ */ jsxs3("div", { className: "origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none", children: [
          /* @__PURE__ */ jsx4("div", { className: "px-4 py-2 border-b border-gray-200", children: /* @__PURE__ */ jsx4("h3", { className: "text-sm font-medium text-gray-900", children: "Notifications" }) }),
          /* @__PURE__ */ jsx4("div", { className: "py-2", children: /* @__PURE__ */ jsx4("p", { className: "text-sm text-gray-500 px-4", children: "No new notifications" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "ml-3 relative", children: [
        /* @__PURE__ */ jsx4("div", { children: /* @__PURE__ */ jsxs3(
          "button",
          {
            type: "button",
            className: "bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            onClick: () => setIsProfileOpen(!isProfileOpen),
            children: [
              /* @__PURE__ */ jsx4("span", { className: "sr-only", children: "Open user menu" }),
              /* @__PURE__ */ jsx4("span", { className: "h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center", children: "\u{1F464}" })
            ]
          }
        ) }),
        isProfileOpen && /* @__PURE__ */ jsxs3("div", { className: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none", children: [
          /* @__PURE__ */ jsx4(
            "a",
            {
              href: "#",
              className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
              children: "Your Profile"
            }
          ),
          /* @__PURE__ */ jsx4(
            "a",
            {
              href: "#",
              className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
              children: "Settings"
            }
          ),
          /* @__PURE__ */ jsx4(
            "a",
            {
              href: "#",
              className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
              children: "Sign out"
            }
          )
        ] })
      ] })
    ] }) })
  ] }) }) });
}

// app/components/layout/MainLayout.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function MainLayout({ children, title, activeRoute }) {
  return /* @__PURE__ */ jsxs4("div", { className: "flex h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx5(Sidebar, { activeRoute }),
    /* @__PURE__ */ jsxs4("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsx5(Header, { title }),
      /* @__PURE__ */ jsx5("main", { className: "flex-1 overflow-x-hidden overflow-y-auto p-6", children })
    ] })
  ] });
}

// app/routes/dashboard.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function Dashboard() {
  let location = useLocation();
  return /* @__PURE__ */ jsxs5(MainLayout, { title: "Dashboard", activeRoute: location.pathname, children: [
    /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs5("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx6("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Recent Ideas" }),
        /* @__PURE__ */ jsxs5("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs5("div", { className: "border-l-4 border-blue-500 pl-4 py-2", children: [
            /* @__PURE__ */ jsx6("h3", { className: "font-medium", children: "AI-Powered Customer Support" }),
            /* @__PURE__ */ jsx6("p", { className: "text-sm text-gray-500", children: "Created 2 days ago" })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "border-l-4 border-blue-500 pl-4 py-2", children: [
            /* @__PURE__ */ jsx6("h3", { className: "font-medium", children: "Blockchain for Supply Chain" }),
            /* @__PURE__ */ jsx6("p", { className: "text-sm text-gray-500", children: "Created 3 days ago" })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "border-l-4 border-blue-500 pl-4 py-2", children: [
            /* @__PURE__ */ jsx6("h3", { className: "font-medium", children: "AR Training Platform" }),
            /* @__PURE__ */ jsx6("p", { className: "text-sm text-gray-500", children: "Created 5 days ago" })
          ] })
        ] }),
        /* @__PURE__ */ jsx6("button", { className: "mt-4 text-sm text-blue-600 hover:text-blue-800", children: "View all ideas \u2192" })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx6("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Innovation Metrics" }),
        /* @__PURE__ */ jsxs5("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx6("span", { className: "text-gray-600", children: "Ideas Submitted" }),
            /* @__PURE__ */ jsx6("span", { className: "font-medium", children: "42" })
          ] }),
          /* @__PURE__ */ jsx6("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ jsx6("div", { className: "bg-blue-600 h-2.5 rounded-full", style: { width: "70%" } }) }),
          /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx6("span", { className: "text-gray-600", children: "In Development" }),
            /* @__PURE__ */ jsx6("span", { className: "font-medium", children: "12" })
          ] }),
          /* @__PURE__ */ jsx6("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ jsx6("div", { className: "bg-yellow-500 h-2.5 rounded-full", style: { width: "30%" } }) }),
          /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx6("span", { className: "text-gray-600", children: "Implemented" }),
            /* @__PURE__ */ jsx6("span", { className: "font-medium", children: "8" })
          ] }),
          /* @__PURE__ */ jsx6("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ jsx6("div", { className: "bg-green-500 h-2.5 rounded-full", style: { width: "20%" } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx6("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Team Activity" }),
        /* @__PURE__ */ jsxs5("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx6("div", { className: "flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center", children: "JD" }),
            /* @__PURE__ */ jsxs5("div", { className: "ml-3", children: [
              /* @__PURE__ */ jsx6("p", { className: "text-sm font-medium", children: 'John Doe commented on "AI-Powered Customer Support"' }),
              /* @__PURE__ */ jsx6("p", { className: "text-xs text-gray-500", children: "2 hours ago" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx6("div", { className: "flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center", children: "AS" }),
            /* @__PURE__ */ jsxs5("div", { className: "ml-3", children: [
              /* @__PURE__ */ jsx6("p", { className: "text-sm font-medium", children: 'Alice Smith created "Sustainable Packaging Initiative"' }),
              /* @__PURE__ */ jsx6("p", { className: "text-xs text-gray-500", children: "5 hours ago" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx6("div", { className: "flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center", children: "RJ" }),
            /* @__PURE__ */ jsxs5("div", { className: "ml-3", children: [
              /* @__PURE__ */ jsx6("p", { className: "text-sm font-medium", children: 'Robert Johnson updated "Blockchain for Supply Chain"' }),
              /* @__PURE__ */ jsx6("p", { className: "text-xs text-gray-500", children: "Yesterday" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx6("button", { className: "mt-4 text-sm text-blue-600 hover:text-blue-800", children: "View all activity \u2192" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "mt-8 bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsx6("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Innovation Pipeline" }),
      /* @__PURE__ */ jsx6("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs5("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx6("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs5("tr", { children: [
          /* @__PURE__ */ jsx6("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Idea" }),
          /* @__PURE__ */ jsx6("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Category" }),
          /* @__PURE__ */ jsx6("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx6("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Owner" }),
          /* @__PURE__ */ jsx6("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Last Updated" })
        ] }) }),
        /* @__PURE__ */ jsxs5("tbody", { className: "bg-white divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsxs5("tr", { children: [
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("div", { className: "text-sm font-medium text-gray-900", children: "AI-Powered Customer Support" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("div", { className: "text-sm text-gray-500", children: "Customer Experience" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800", children: "In Development" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "John Doe" }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "2 days ago" })
          ] }),
          /* @__PURE__ */ jsxs5("tr", { children: [
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("div", { className: "text-sm font-medium text-gray-900", children: "Blockchain for Supply Chain" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("div", { className: "text-sm text-gray-500", children: "Operations" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800", children: "Evaluating" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "Robert Johnson" }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "3 days ago" })
          ] }),
          /* @__PURE__ */ jsxs5("tr", { children: [
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("div", { className: "text-sm font-medium text-gray-900", children: "AR Training Platform" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("div", { className: "text-sm text-gray-500", children: "HR & Training" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800", children: "Implemented" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "Alice Smith" }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "5 days ago" })
          ] }),
          /* @__PURE__ */ jsxs5("tr", { children: [
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("div", { className: "text-sm font-medium text-gray-900", children: "Sustainable Packaging Initiative" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("div", { className: "text-sm text-gray-500", children: "Sustainability" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx6("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800", children: "New" }) }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "Alice Smith" }),
            /* @__PURE__ */ jsx6("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "5 hours ago" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
import { Link as Link2 } from "@remix-run/react";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function Index() {
  return /* @__PURE__ */ jsxs6("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx7("header", { className: "bg-white shadow-sm", children: /* @__PURE__ */ jsxs6("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs6("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx7("img", { src: "/logo-light.png", alt: "IdeaFlow Logo", className: "h-8 w-auto" }),
        /* @__PURE__ */ jsx7("span", { className: "ml-2 text-xl font-bold text-gray-900", children: "IdeaFlow" })
      ] }),
      /* @__PURE__ */ jsxs6("nav", { className: "hidden md:flex space-x-8", children: [
        /* @__PURE__ */ jsx7(Link2, { to: "/", className: "text-gray-700 hover:text-blue-600", children: "Home" }),
        /* @__PURE__ */ jsx7(Link2, { to: "/features", className: "text-gray-700 hover:text-blue-600", children: "Features" }),
        /* @__PURE__ */ jsx7(Link2, { to: "/pricing", className: "text-gray-700 hover:text-blue-600", children: "Pricing" }),
        /* @__PURE__ */ jsx7(Link2, { to: "/about", className: "text-gray-700 hover:text-blue-600", children: "About" })
      ] }),
      /* @__PURE__ */ jsxs6("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx7(Link2, { to: "/auth/login", className: "text-gray-700 hover:text-blue-600", children: "Sign In" }),
        /* @__PURE__ */ jsx7(Link2, { to: "/auth/register", className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700", children: "Get Started" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx7("section", { className: "py-20 bg-gradient-to-r from-blue-50 to-indigo-50", children: /* @__PURE__ */ jsx7("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs6("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs6("h1", { className: "text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl", children: [
        /* @__PURE__ */ jsx7("span", { className: "block", children: "Unleash Your Team's" }),
        /* @__PURE__ */ jsx7("span", { className: "block text-blue-600", children: "Creative Potential" })
      ] }),
      /* @__PURE__ */ jsx7("p", { className: "mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl", children: "IdeaFlow is an AI-powered innovation management platform that helps enterprises capture, develop, and implement groundbreaking ideas." }),
      /* @__PURE__ */ jsxs6("div", { className: "mt-10 flex justify-center", children: [
        /* @__PURE__ */ jsx7("div", { className: "rounded-md shadow", children: /* @__PURE__ */ jsx7(Link2, { to: "/auth/register", className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10", children: "Start Free Trial" }) }),
        /* @__PURE__ */ jsx7("div", { className: "ml-3 rounded-md shadow", children: /* @__PURE__ */ jsx7(Link2, { to: "/demo", className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10", children: "Request Demo" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx7("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs6("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs6("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx7("h2", { className: "text-3xl font-extrabold text-gray-900", children: "Powerful Features for Innovation" }),
        /* @__PURE__ */ jsx7("p", { className: "mt-4 max-w-2xl mx-auto text-xl text-gray-500", children: "Everything you need to transform ideas into reality." })
      ] }),
      /* @__PURE__ */ jsxs6("div", { className: "mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs6("div", { className: "bg-gray-50 p-6 rounded-lg", children: [
          /* @__PURE__ */ jsx7("div", { className: "w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsx7("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6 text-blue-600", children: /* @__PURE__ */ jsx7("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" }) }) }),
          /* @__PURE__ */ jsx7("h3", { className: "mt-4 text-lg font-medium text-gray-900", children: "AI-Powered Idea Generation" }),
          /* @__PURE__ */ jsx7("p", { className: "mt-2 text-base text-gray-500", children: "Leverage advanced AI to generate, refine, and expand on ideas based on your business goals." })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "bg-gray-50 p-6 rounded-lg", children: [
          /* @__PURE__ */ jsx7("div", { className: "w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsx7("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6 text-blue-600", children: /* @__PURE__ */ jsx7("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" }) }) }),
          /* @__PURE__ */ jsx7("h3", { className: "mt-4 text-lg font-medium text-gray-900", children: "Collaborative Workspaces" }),
          /* @__PURE__ */ jsx7("p", { className: "mt-2 text-base text-gray-500", children: "Create dedicated spaces for teams to collaborate, share ideas, and work together seamlessly." })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "bg-gray-50 p-6 rounded-lg", children: [
          /* @__PURE__ */ jsx7("div", { className: "w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsx7("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6 text-blue-600", children: /* @__PURE__ */ jsx7("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" }) }) }),
          /* @__PURE__ */ jsx7("h3", { className: "mt-4 text-lg font-medium text-gray-900", children: "Advanced Analytics" }),
          /* @__PURE__ */ jsx7("p", { className: "mt-2 text-base text-gray-500", children: "Track innovation metrics, measure impact, and gain insights into your organization's creative output." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx7("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs6("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs6("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx7("h2", { className: "text-3xl font-extrabold text-gray-900", children: "Why Choose IdeaFlow?" }),
        /* @__PURE__ */ jsx7("p", { className: "mt-4 max-w-2xl mx-auto text-xl text-gray-500", children: "Transform how your organization innovates and drives growth." })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "mt-16", children: /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs6("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-lg font-medium text-gray-900", children: "Increase Innovation Output" }),
          /* @__PURE__ */ jsx7("p", { className: "mt-2 text-base text-gray-500", children: "Organizations using IdeaFlow see a 3x increase in viable innovation concepts compared to traditional methods." })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-lg font-medium text-gray-900", children: "Reduce Time to Implementation" }),
          /* @__PURE__ */ jsx7("p", { className: "mt-2 text-base text-gray-500", children: "Cut the time from idea to implementation by 40% with our streamlined workflows and AI assistance." })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-lg font-medium text-gray-900", children: "Enhance Team Collaboration" }),
          /* @__PURE__ */ jsx7("p", { className: "mt-2 text-base text-gray-500", children: "Break down silos and foster cross-functional collaboration with our intuitive platform." })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-lg font-medium text-gray-900", children: "Enterprise-Grade Security" }),
          /* @__PURE__ */ jsx7("p", { className: "mt-2 text-base text-gray-500", children: "Rest easy knowing your intellectual property is protected with our SOC 2 compliant security measures." })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx7("section", { className: "py-20 bg-blue-600", children: /* @__PURE__ */ jsx7("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs6("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx7("h2", { className: "text-3xl font-extrabold text-white", children: "Ready to transform your innovation process?" }),
      /* @__PURE__ */ jsx7("p", { className: "mt-4 max-w-2xl mx-auto text-xl text-blue-100", children: "Join thousands of forward-thinking companies already using IdeaFlow." }),
      /* @__PURE__ */ jsxs6("div", { className: "mt-10 flex justify-center", children: [
        /* @__PURE__ */ jsx7("div", { className: "rounded-md shadow", children: /* @__PURE__ */ jsx7(Link2, { to: "/auth/register", className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10", children: "Start Free Trial" }) }),
        /* @__PURE__ */ jsx7("div", { className: "ml-3 rounded-md shadow", children: /* @__PURE__ */ jsx7(Link2, { to: "/contact", className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10", children: "Contact Sales" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx7("footer", { className: "bg-gray-800 text-white py-12", children: /* @__PURE__ */ jsxs6("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-sm font-semibold uppercase tracking-wider", children: "Product" }),
          /* @__PURE__ */ jsxs6("ul", { className: "mt-4 space-y-2", children: [
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/features", className: "text-gray-300 hover:text-white", children: "Features" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/pricing", className: "text-gray-300 hover:text-white", children: "Pricing" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/security", className: "text-gray-300 hover:text-white", children: "Security" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/roadmap", className: "text-gray-300 hover:text-white", children: "Roadmap" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-sm font-semibold uppercase tracking-wider", children: "Company" }),
          /* @__PURE__ */ jsxs6("ul", { className: "mt-4 space-y-2", children: [
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/about", className: "text-gray-300 hover:text-white", children: "About" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/customers", className: "text-gray-300 hover:text-white", children: "Customers" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/careers", className: "text-gray-300 hover:text-white", children: "Careers" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/contact", className: "text-gray-300 hover:text-white", children: "Contact" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-sm font-semibold uppercase tracking-wider", children: "Resources" }),
          /* @__PURE__ */ jsxs6("ul", { className: "mt-4 space-y-2", children: [
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/blog", className: "text-gray-300 hover:text-white", children: "Blog" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/guides", className: "text-gray-300 hover:text-white", children: "Guides" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/webinars", className: "text-gray-300 hover:text-white", children: "Webinars" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/documentation", className: "text-gray-300 hover:text-white", children: "Documentation" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("h3", { className: "text-sm font-semibold uppercase tracking-wider", children: "Legal" }),
          /* @__PURE__ */ jsxs6("ul", { className: "mt-4 space-y-2", children: [
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/privacy", className: "text-gray-300 hover:text-white", children: "Privacy" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/terms", className: "text-gray-300 hover:text-white", children: "Terms" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/cookies", className: "text-gray-300 hover:text-white", children: "Cookies" }) }),
            /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(Link2, { to: "/licenses", className: "text-gray-300 hover:text-white", children: "Licenses" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { className: "mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center", children: [
        /* @__PURE__ */ jsxs6("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx7("img", { src: "/logo-dark.png", alt: "IdeaFlow Logo", className: "h-8 w-auto" }),
          /* @__PURE__ */ jsx7("span", { className: "ml-2 text-xl font-bold text-white", children: "IdeaFlow" })
        ] }),
        /* @__PURE__ */ jsxs6("p", { className: "mt-4 md:mt-0 text-gray-400", children: [
          "\xA9 ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " IdeaFlow, Inc. All rights reserved."
        ] })
      ] })
    ] }) })
  ] });
}

// app/routes/board.tsx
var board_exports = {};
__export(board_exports, {
  default: () => Board
});
import { useLocation as useLocation2 } from "@remix-run/react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function Board() {
  let location = useLocation2();
  return /* @__PURE__ */ jsxs7(MainLayout, { title: "Innovation Board", activeRoute: location.pathname, children: [
    /* @__PURE__ */ jsxs7("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
      /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx8("h2", { className: "text-lg font-medium text-gray-900", children: "Innovation Pipeline" }),
        /* @__PURE__ */ jsx8("button", { className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700", children: "+ Add New Idea" })
      ] }),
      /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxs7("div", { className: "bg-gray-50 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs7("h3", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [
            /* @__PURE__ */ jsx8("span", { className: "w-3 h-3 bg-purple-500 rounded-full mr-2" }),
            "New Ideas",
            /* @__PURE__ */ jsx8("span", { className: "ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full", children: "3" })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "Sustainable Packaging Initiative" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "Develop eco-friendly packaging alternatives for all product lines" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "5 hours ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "AS" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "Remote Work Optimization" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "Tools and processes to enhance remote collaboration" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "1 day ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "RJ" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "Customer Loyalty Program" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "Revamp loyalty program with digital rewards" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "2 days ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "JD" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "bg-gray-50 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs7("h3", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [
            /* @__PURE__ */ jsx8("span", { className: "w-3 h-3 bg-blue-500 rounded-full mr-2" }),
            "Evaluating",
            /* @__PURE__ */ jsx8("span", { className: "ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full", children: "2" })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "Blockchain for Supply Chain" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "Implement blockchain technology for supply chain transparency" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "3 days ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "RJ" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "Voice-Activated Product Search" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "Add voice search capabilities to product catalog" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "4 days ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "JD" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "bg-gray-50 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs7("h3", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [
            /* @__PURE__ */ jsx8("span", { className: "w-3 h-3 bg-yellow-500 rounded-full mr-2" }),
            "In Development",
            /* @__PURE__ */ jsx8("span", { className: "ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full", children: "2" })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "AI-Powered Customer Support" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "Implement AI chatbots for first-line customer support" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "2 days ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "JD" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "Mobile App Redesign" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "Overhaul UX/UI of mobile application" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "1 week ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "AS" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "bg-gray-50 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs7("h3", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [
            /* @__PURE__ */ jsx8("span", { className: "w-3 h-3 bg-green-500 rounded-full mr-2" }),
            "Implemented",
            /* @__PURE__ */ jsx8("span", { className: "ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full", children: "2" })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "AR Training Platform" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "Augmented reality platform for employee training" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "5 days ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "AS" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx8("h4", { className: "font-medium", children: "Automated Inventory Management" }),
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "AI-driven inventory forecasting and management" }),
              /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center mt-2", children: [
                /* @__PURE__ */ jsx8("span", { className: "text-xs text-gray-500", children: "2 weeks ago" }),
                /* @__PURE__ */ jsx8("div", { className: "flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs", children: "RJ" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsx8("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Innovation Metrics" }),
      /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxs7("div", { className: "bg-blue-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsx8("h3", { className: "text-sm font-medium text-gray-500", children: "Total Ideas" }),
          /* @__PURE__ */ jsx8("p", { className: "text-3xl font-bold text-blue-600 mt-2", children: "42" }),
          /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "+12% from last month" })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "bg-purple-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsx8("h3", { className: "text-sm font-medium text-gray-500", children: "Implementation Rate" }),
          /* @__PURE__ */ jsx8("p", { className: "text-3xl font-bold text-purple-600 mt-2", children: "28%" }),
          /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "+5% from last month" })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "bg-green-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsx8("h3", { className: "text-sm font-medium text-gray-500", children: "Time to Implementation" }),
          /* @__PURE__ */ jsx8("p", { className: "text-3xl font-bold text-green-600 mt-2", children: "24 days" }),
          /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "-3 days from last month" })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "bg-yellow-50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsx8("h3", { className: "text-sm font-medium text-gray-500", children: "Active Contributors" }),
          /* @__PURE__ */ jsx8("p", { className: "text-3xl font-bold text-yellow-600 mt-2", children: "18" }),
          /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-500 mt-1", children: "+4 from last month" })
        ] })
      ] })
    ] })
  ] });
}

// app/routes/ideas.tsx
var ideas_exports = {};
__export(ideas_exports, {
  default: () => Ideas
});
import { useLocation as useLocation3 } from "@remix-run/react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function Ideas() {
  let location = useLocation3();
  return /* @__PURE__ */ jsxs8(MainLayout, { title: "Ideas", activeRoute: location.pathname, children: [
    /* @__PURE__ */ jsxs8("div", { className: "mb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs8("div", { children: [
        /* @__PURE__ */ jsx9("h1", { className: "text-2xl font-semibold text-gray-900", children: "Ideas Repository" }),
        /* @__PURE__ */ jsx9("p", { className: "text-gray-500", children: "Browse, filter, and manage all innovation ideas" })
      ] }),
      /* @__PURE__ */ jsx9("button", { className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700", children: "+ Add New Idea" })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: [
      /* @__PURE__ */ jsxs8("div", { className: "p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxs8("div", { className: "relative", children: [
            /* @__PURE__ */ jsx9(
              "input",
              {
                type: "text",
                placeholder: "Search ideas...",
                className: "border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
              }
            ),
            /* @__PURE__ */ jsx9("div", { className: "absolute left-3 top-2.5 text-gray-400", children: "\u{1F50D}" })
          ] }),
          /* @__PURE__ */ jsxs8("select", { className: "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", children: [
            /* @__PURE__ */ jsx9("option", { children: "All Categories" }),
            /* @__PURE__ */ jsx9("option", { children: "Customer Experience" }),
            /* @__PURE__ */ jsx9("option", { children: "Operations" }),
            /* @__PURE__ */ jsx9("option", { children: "HR & Training" }),
            /* @__PURE__ */ jsx9("option", { children: "Sustainability" }),
            /* @__PURE__ */ jsx9("option", { children: "Technology" })
          ] }),
          /* @__PURE__ */ jsxs8("select", { className: "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", children: [
            /* @__PURE__ */ jsx9("option", { children: "All Statuses" }),
            /* @__PURE__ */ jsx9("option", { children: "New" }),
            /* @__PURE__ */ jsx9("option", { children: "Evaluating" }),
            /* @__PURE__ */ jsx9("option", { children: "In Development" }),
            /* @__PURE__ */ jsx9("option", { children: "Implemented" }),
            /* @__PURE__ */ jsx9("option", { children: "Archived" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxs8("button", { className: "text-gray-500 hover:text-gray-700 p-2", children: [
            /* @__PURE__ */ jsx9("span", { className: "sr-only", children: "List view" }),
            "\u{1F4CB}"
          ] }),
          /* @__PURE__ */ jsxs8("button", { className: "text-gray-500 hover:text-gray-700 p-2", children: [
            /* @__PURE__ */ jsx9("span", { className: "sr-only", children: "Grid view" }),
            "\u{1F4CA}"
          ] }),
          /* @__PURE__ */ jsxs8("button", { className: "text-gray-500 hover:text-gray-700 p-2", children: [
            /* @__PURE__ */ jsx9("span", { className: "sr-only", children: "Board view" }),
            "\u{1F4CC}"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx9("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs8("tr", { children: [
          /* @__PURE__ */ jsx9("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Idea" }),
          /* @__PURE__ */ jsx9("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Category" }),
          /* @__PURE__ */ jsx9("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx9("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Owner" }),
          /* @__PURE__ */ jsx9("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Created" }),
          /* @__PURE__ */ jsx9("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Votes" }),
          /* @__PURE__ */ jsx9("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs8("tbody", { className: "bg-white divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsxs8("tr", { children: [
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap", children: [
              /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "AI-Powered Customer Support" }),
              /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "Implement AI chatbots for first-line customer support" })
            ] }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "Customer Experience" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800", children: "In Development" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("div", { className: "flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center", children: "JD" }),
              /* @__PURE__ */ jsx9("div", { className: "ml-3", children: /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "John Doe" }) })
            ] }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "2 days ago" }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("span", { className: "mr-1", children: "\u{1F44D}" }),
              " 24"
            ] }) }),
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: [
              /* @__PURE__ */ jsx9("button", { className: "text-blue-600 hover:text-blue-900 mr-3", children: "Edit" }),
              /* @__PURE__ */ jsx9("button", { className: "text-red-600 hover:text-red-900", children: "Delete" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("tr", { children: [
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap", children: [
              /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "Blockchain for Supply Chain" }),
              /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "Implement blockchain technology for supply chain transparency" })
            ] }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "Operations" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800", children: "Evaluating" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("div", { className: "flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center", children: "RJ" }),
              /* @__PURE__ */ jsx9("div", { className: "ml-3", children: /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "Robert Johnson" }) })
            ] }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "3 days ago" }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("span", { className: "mr-1", children: "\u{1F44D}" }),
              " 18"
            ] }) }),
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: [
              /* @__PURE__ */ jsx9("button", { className: "text-blue-600 hover:text-blue-900 mr-3", children: "Edit" }),
              /* @__PURE__ */ jsx9("button", { className: "text-red-600 hover:text-red-900", children: "Delete" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("tr", { children: [
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap", children: [
              /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "AR Training Platform" }),
              /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "Augmented reality platform for employee training" })
            ] }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "HR & Training" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800", children: "Implemented" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("div", { className: "flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center", children: "AS" }),
              /* @__PURE__ */ jsx9("div", { className: "ml-3", children: /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "Alice Smith" }) })
            ] }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "5 days ago" }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("span", { className: "mr-1", children: "\u{1F44D}" }),
              " 32"
            ] }) }),
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: [
              /* @__PURE__ */ jsx9("button", { className: "text-blue-600 hover:text-blue-900 mr-3", children: "Edit" }),
              /* @__PURE__ */ jsx9("button", { className: "text-red-600 hover:text-red-900", children: "Delete" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("tr", { children: [
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap", children: [
              /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "Sustainable Packaging Initiative" }),
              /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "Develop eco-friendly packaging alternatives for all product lines" })
            ] }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "Sustainability" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800", children: "New" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("div", { className: "flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center", children: "AS" }),
              /* @__PURE__ */ jsx9("div", { className: "ml-3", children: /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "Alice Smith" }) })
            ] }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "5 hours ago" }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("span", { className: "mr-1", children: "\u{1F44D}" }),
              " 7"
            ] }) }),
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: [
              /* @__PURE__ */ jsx9("button", { className: "text-blue-600 hover:text-blue-900 mr-3", children: "Edit" }),
              /* @__PURE__ */ jsx9("button", { className: "text-red-600 hover:text-red-900", children: "Delete" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("tr", { children: [
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap", children: [
              /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "Remote Work Optimization" }),
              /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "Tools and processes to enhance remote collaboration" })
            ] }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("div", { className: "text-sm text-gray-500", children: "HR & Training" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx9("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800", children: "New" }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("div", { className: "flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center", children: "RJ" }),
              /* @__PURE__ */ jsx9("div", { className: "ml-3", children: /* @__PURE__ */ jsx9("div", { className: "text-sm font-medium text-gray-900", children: "Robert Johnson" }) })
            ] }) }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: "1 day ago" }),
            /* @__PURE__ */ jsx9("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx9("span", { className: "mr-1", children: "\u{1F44D}" }),
              " 12"
            ] }) }),
            /* @__PURE__ */ jsxs8("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: [
              /* @__PURE__ */ jsx9("button", { className: "text-blue-600 hover:text-blue-900 mr-3", children: "Edit" }),
              /* @__PURE__ */ jsx9("button", { className: "text-red-600 hover:text-red-900", children: "Delete" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx9("div", { className: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs8("div", { className: "flex-1 flex justify-between sm:hidden", children: [
          /* @__PURE__ */ jsx9("button", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50", children: "Previous" }),
          /* @__PURE__ */ jsx9("button", { className: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50", children: "Next" })
        ] }),
        /* @__PURE__ */ jsxs8("div", { className: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsx9("div", { children: /* @__PURE__ */ jsxs8("p", { className: "text-sm text-gray-700", children: [
            "Showing ",
            /* @__PURE__ */ jsx9("span", { className: "font-medium", children: "1" }),
            " to ",
            /* @__PURE__ */ jsx9("span", { className: "font-medium", children: "5" }),
            " of ",
            /* @__PURE__ */ jsx9("span", { className: "font-medium", children: "42" }),
            " results"
          ] }) }),
          /* @__PURE__ */ jsx9("div", { children: /* @__PURE__ */ jsxs8("nav", { className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px", "aria-label": "Pagination", children: [
            /* @__PURE__ */ jsxs8("button", { className: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50", children: [
              /* @__PURE__ */ jsx9("span", { className: "sr-only", children: "Previous" }),
              "\u25C0"
            ] }),
            /* @__PURE__ */ jsx9("button", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50", children: "1" }),
            /* @__PURE__ */ jsx9("button", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100", children: "2" }),
            /* @__PURE__ */ jsx9("button", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50", children: "3" }),
            /* @__PURE__ */ jsx9("span", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700", children: "..." }),
            /* @__PURE__ */ jsx9("button", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50", children: "8" }),
            /* @__PURE__ */ jsx9("button", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50", children: "9" }),
            /* @__PURE__ */ jsxs8("button", { className: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50", children: [
              /* @__PURE__ */ jsx9("span", { className: "sr-only", children: "Next" }),
              "\u25B6"
            ] })
          ] }) })
        ] })
      ] }) })
    ] })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-4J7VSGDN.js", imports: ["/build/_shared/chunk-X4FRPOFL.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-3CCYG5PS.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-LZQKPYY4.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/board": { id: "routes/board", parentId: "root", path: "board", index: void 0, caseSensitive: void 0, module: "/build/routes/board-VLWVOEZE.js", imports: ["/build/_shared/chunk-LW5KQTXI.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-LYO6X7YX.js", imports: ["/build/_shared/chunk-LW5KQTXI.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/ideas": { id: "routes/ideas", parentId: "root", path: "ideas", index: void 0, caseSensitive: void 0, module: "/build/routes/ideas-Y7F4PXQW.js", imports: ["/build/_shared/chunk-LW5KQTXI.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "a2a7f280", hmr: void 0, url: "/build/manifest-A2A7F280.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/board": {
    id: "routes/board",
    parentId: "root",
    path: "board",
    index: void 0,
    caseSensitive: void 0,
    module: board_exports
  },
  "routes/ideas": {
    id: "routes/ideas",
    parentId: "root",
    path: "ideas",
    index: void 0,
    caseSensitive: void 0,
    module: ideas_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
