#!/usr/bin/env python3
"""Check public advertising, locale parity, JSON-LD and navigation (standard library).
Run from any directory. --baseline REF also reports pre-existing broken links/assets
and fails on newly introduced ones; it does not exempt advertising failures.
"""
import argparse, json, re, subprocess, posixpath, sys
from pathlib import Path
from html.parser import HTMLParser
from html import unescape
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
RETIRED = {'panel-upgrades.html','ev-charger-install.html','generator-install.html','surge-protection.html'}
ACTIVE = {'troubleshooting-repair.html','ceiling-fans.html','switches-dimmers.html','lighting.html','smart-home.html','emergency-electrician.html'}
SCOPE = {'en':'does not require a permit','es':'no requieren permiso','vi':'không cần giấy phép'}
class Page(HTMLParser):
 def __init__(self, source):
  super().__init__(convert_charrefs=True);self.tags=[];self.jsonld=[];self.data=[];self.capturing=False;self.ids=set();self.feed(source)
 def handle_starttag(self, tag, attrs):
  a=dict(attrs);self.tags.append((tag,a))
  if 'id' in a:self.ids.add(a['id'])
  if tag=='script' and a.get('type')=='application/ld+json':self.capturing=True;self.data=[]
 def handle_endtag(self,tag):
  if tag=='script' and self.capturing:self.jsonld.append(json.loads(''.join(self.data)));self.capturing=False
 def handle_data(self,data):
  if self.capturing:self.data.append(data)
 def links(self):return [a['href'] for t,a in self.tags if t=='a' and 'href' in a]
def walk(o):
 if isinstance(o,dict):
  yield o
  for v in o.values():yield from walk(v)
 elif isinstance(o,list):
  for v in o:yield from walk(v)
def git(*args):return subprocess.check_output(['git','-C',str(ROOT),*args],text=True)
def inventory(ref=None):
 paths=git('ls-tree','-r','--name-only',ref).splitlines() if ref else [p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and '.git' not in p.parts]
 content={p:(git('show',ref+':'+p) if ref else (ROOT/p).read_text()) for p in paths if p.endswith('.html')}
 return set(paths),content,{p:Page(s) for p,s in content.items()}
def broken(paths,pages):
 result=set()
 for p,doc in pages.items():
  for t,a in doc.tags:
   vals=[a[k] for k in (('href',) if t in ['a','link'] else ('src',)) if k in a]
   for v in vals:
    u=urlsplit(v)
    if u.scheme and u.scheme not in ['http','https']:continue
    if u.netloc and u.netloc!='228mooreelectric.com':continue
    q=unquote(u.path)
    target=posixpath.normpath(q.lstrip('/') if q.startswith('/') else posixpath.join(posixpath.dirname(p),q)) if q else p
    if q.endswith('/') or target=='.':target=posixpath.join(target,'index.html').lstrip('./')
    if target not in paths:
     if target+'.html' in paths:target+='.html'
     else:result.add((p,v,'missing file'));continue
    if u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:result.add((p,v,'missing anchor'))
 return result
ap=argparse.ArgumentParser();ap.add_argument('--baseline');args=ap.parse_args()
paths,source,pages=inventory();errors=[];checks=0
def check(ok,msg):
 global checks
 checks+=1
 if not ok:errors.append(msg)
for p,s in source.items():
 doc=pages[p];lang=p.split('/')[0] if p.startswith(('es/','vi/')) else 'en';name=p.split('/')[-1]
 check(not re.search(r'\$(?:150|350|450)(?!\d)',s),p+': old advertised price')
 for url in doc.links():
  # Locale switches on withdrawn pages remain useful; no sales/navigation routes to them.
  check(not (urlsplit(url).path.split('/')[-1] in RETIRED and name not in RETIRED),p+': link to withdrawn service '+url)
  if url.startswith('tel:'):check(url=='tel:+12282249150',p+': unexpected phone '+url)
 for t,a in doc.tags:
  if 'data-cf-beacon' in a:
   try:json.loads(a['data-cf-beacon'])
   except ValueError:check(False,p+': invalid analytics JSON')
 for obj in doc.jsonld:
  for node in walk(obj):
   if node.get('@type')=='Service':
    check(name in ACTIVE,p+': unexpected Service')
    check(SCOPE[lang] in node.get('description','') or (lang=='es' and 'no requiera permiso' in node.get('description','')),p+': unqualified Service description')
    offer=node.get('offers',{});check(str(offer.get('price'))=='75',p+': assessment Offer price')
    check('name' in offer and 'description' in offer,p+': assessment Offer not labeled')
 if name in RETIRED:
  check(any(t=='meta' and a.get('name')=='robots' and 'noindex' in a.get('content','') for t,a in doc.tags),p+': withdrawn page indexable')
  check(not doc.jsonld,p+': withdrawn page still emits structured offers')
  check(not re.search(r'\$(?:75|150|350|450)',s),p+': withdrawn page still has quote price')
 if name in ACTIVE|{'index.html','services.html','contact.html','faq.html'}:
  check('$75' in s,p+': assessment missing')
  check(SCOPE[lang] in s,p+': current scope missing')
 if name in {'index.html','services.html'}:
  # Cards are a separate explicit allowlist, shared by all three languages.
  cards={urlsplit(a['href']).path for t,a in doc.tags if t=='a' and 'card' in a.get('class','').split()}
  check(cards==ACTIVE,p+': service cards differ '+str(cards^ACTIVE))
 if name=='faq.html':
  f=next(o for o in doc.jsonld if o.get('@type')=='FAQPage')
  check(len(f['mainEntity'])==12,p+': FAQ count changed')
  details=re.findall(r'<details\b[\s\S]*?</details>',s)
  for i in [0,2,8,9,11]:
   item=details[i];q=f['mainEntity'][i]
   question=re.search(r'<summary[^>]*>([\s\S]*?)</summary>',item).group(1)
   question=unescape(re.sub(r'<[^>]+>','',question)).rstrip('+').strip()
   answer=re.search(r'<div class="faq-a-inner">([\s\S]*?)<br>',item).group(1)
   answer=unescape(re.sub(r'<[^>]+>','',answer)).strip()
   check(question==q['name'] and answer==q['acceptedAnswer']['text'],p+': FAQ visible/schema mismatch '+str(i))
  expected={'en':'No.','es':'No.','vi':'Không.'}[lang]
  check(f['mainEntity'][11]['acceptedAnswer']['text'].startswith(expected),p+': EV offer persists in FAQ')
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[e.text for e in ET.parse(ROOT/'sitemap.xml').findall('.//s:loc',ns)]
for url in urls:
 target=urlsplit(url).path.lstrip('/') or 'index.html'
 if target.endswith('/'):target+='index.html'
 check(target in paths,'sitemap missing '+target)
 check(target.split('/')[-1] not in RETIRED,'sitemap retired '+target)
issues=broken(paths,pages)
if args.baseline:
 bp,bs,bd=inventory(args.baseline);previous=broken(bp,bd)
 for problem in sorted(issues-previous):check(False,'new navigation/asset problem: '+repr(problem))
 print(f'Pre-existing navigation/asset issues remaining: {len(issues & previous)}')
 for problem in sorted(issues & previous):print('  BASELINE',*problem)
else:
 for problem in sorted(issues):print('  REVIEW',*problem)
print(f'{len(pages)} HTML pages, {sum(len(d.jsonld) for d in pages.values())} JSON-LD blocks, {len(urls)} sitemap URLs; {checks} assertions; {len(errors)} failures')
for e in errors:print('FAIL',e)
sys.exit(bool(errors))
