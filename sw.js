const V="raqeeb-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png"])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put("./index.html",c));return res}).catch(()=>caches.match("./index.html")));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res})))});
