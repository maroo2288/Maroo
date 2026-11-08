#!/usr/bin/env python3
"""يولّد admin/index.html (تطبيق الأدمن المستقل) من index.html.
بعد أي تعديل في index.html شغّل:  python3 build_admin.py
(أو سيبه لـ GitHub Actions يعملها تلقائي عند الـ push)"""
import re, pathlib
root = pathlib.Path(__file__).parent
s = (root / "index.html").read_text(encoding="utf-8")

def sub(pat, rep, flags=0, count=0):
    global s
    s, n = re.subn(pat, rep, s, count=count, flags=flags)
    return n

# وضع الأدمن + منع الأرشفة
assert sub(r"<head>", '<head><meta name="robots" content="noindex,nofollow"><script>window.RQ_ADMIN=1</script>', re.I, 1) == 1
# بيانات الصفحة العامة اللي ملهاش لازمة في الأدمن
sub(r"<meta name=\"description\"[^>]*>", "")
sub(r"<meta property=\"og:[^>]*>", "")
sub(r"<meta name=\"twitter:[^>]*>", "")
sub(r"<link rel=\"canonical\"[^>]*>", "")
sub(r"<script type=\"application/ld\+json\">.*?</script>", "", re.S)
# الهوية
s = s.replace("<title>رقيب | تركيب وصيانة كاميرات المراقبة</title>", "<title>رقيب — الأدمن</title>")
s = s.replace('<meta name="theme-color" content="#12263A">', '<meta name="theme-color" content="#0A1626">')
s = s.replace('<meta name="apple-mobile-web-app-title" content="رقيب">', '<meta name="apple-mobile-web-app-title" content="أدمن رقيب">')
# أيقونات الأدمن بنفس الأسماء جوه admin/
s = s.replace("admin-icon-192.png", "icon-192.png")
# لينك الأدمن بيرجع للموقع
s = s.replace('href="admin/"', 'href="../"')

out = root / "admin"
out.mkdir(exist_ok=True)
(out / "index.html").write_text(s, encoding="utf-8")
print("admin/index.html", len(s), "bytes")
