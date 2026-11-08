// أدمن رقيب — service worker مستقل (scope: /admin/)
const V="raqeeb-admin-v1",PFX="raqeeb-admin-";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.indexOf(PFX)===0&&x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET")return;
 const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(r.mode==="navigate"){
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put("./index.html",c));return res}).catch(()=>caches.match("./index.html")));return}
 e.respondWith(caches.match(r).then(m=>{
  const net=fetch(r).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res}).catch(()=>m);
  return m||net}));
});
