function clone(e) {
  return JSON.parse(JSON.stringify(e));
}
function esc(e) {
  return String(e || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function stripB64(e) {
  e &&
    "object" == typeof e &&
    Object.keys(e).forEach(function (t) {
      "string" == typeof e[t] && e[t].startsWith("data:")
        ? (e[t] = "")
        : stripB64(e[t]);
    });
}
function lSD() {
  return clone(DEF);
}
var SD = lSD(),
  certSliders = {};
function applyTheme() {
  try {
    var e = {
      "--g": "colorGreen",
      "--gd": "colorGreenDeep",
      "--gl": "colorGreenLight",
      "--gp": "colorGreenPale",
      "--bej": "colorBej",
      "--bl": "colorBejLight",
      "--bm": "colorBejMid",
      "--bd": "colorBejDark",
      "--blk": "colorBlack",
      "--txt": "colorText",
      "--tm": "colorTextMid",
      "--mu": "colorTextMuted"
    };
    (Object.keys(e).forEach(function (t) {
      SD[e[t]] && document.documentElement.style.setProperty(t, SD[e[t]]);
    }),
      applyFontTheme());
  } catch (e) {}
}
var FONT_THEMES = {
  premium: {
    body: "'Inter', sans-serif",
    heading: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', monospace",
    bodyColor: "",
    bodySize: "",
    headingColor: "",
    headingSize: "",
  },
  classic: {
    body: "'Raleway',sans-serif",
    heading: "'Playfair Display',serif",
    mono: "'Barlow Condensed',sans-serif",
    bodyColor: "",
    bodySize: "",
    headingColor: "",
    headingSize: "",
  },
  modern: {
    body: "'Inter','Segoe UI',sans-serif",
    heading: "'Inter','Segoe UI',sans-serif",
    mono: "'JetBrains Mono','Courier New',monospace",
    bodyColor: "",
    bodySize: "",
    headingColor: "",
    headingSize: "",
  },
  elegant: {
    body: "'Georgia','Times New Roman',serif",
    heading: "'Cormorant Garamond','Georgia',serif",
    mono: "'Barlow Condensed',sans-serif",
    bodyColor: "",
    bodySize: "",
    headingColor: "",
    headingSize: "",
  },
  minimal: {
    body: "'DM Sans','Helvetica Neue',sans-serif",
    heading: "'DM Serif Display','Georgia',serif",
    mono: "'Space Mono','Courier New',monospace",
    bodyColor: "",
    bodySize: "",
    headingColor: "",
    headingSize: "",
  },
  technical: {
    body: "'IBM Plex Sans','Arial',sans-serif",
    heading: "'IBM Plex Serif','Georgia',serif",
    mono: "'IBM Plex Mono','Courier New',monospace",
    bodyColor: "",
    bodySize: "",
    headingColor: "",
    headingSize: "",
  },
};
function applyFontTheme() {
  try {
    var e = SD.fontTheme || "classic",
      t = SD.fontCustom || {},
      n = FONT_THEMES[e] || FONT_THEMES.classic;
    ((document.body.style.fontFamily = t.bodyFont || n.body),
      document.documentElement.style.setProperty(
        "--font-heading",
        t.headingFont || n.heading,
      ),
      document.documentElement.style.setProperty(
        "--font-mono",
        t.monoFont || n.mono,
      ),
      t.bodyColor &&
        document.documentElement.style.setProperty("--txt", t.bodyColor),
      t.headingColor &&
        document.documentElement.style.setProperty(
          "--heading-color",
          t.headingColor || "var(--bl)",
        ),
      t.bodySize &&
        document.documentElement.style.setProperty(
          "--body-size",
          t.bodySize + "px",
        ),
      t.headingScale &&
        document.documentElement.style.setProperty(
          "--heading-scale",
          t.headingScale,
        ));
    var o = document.getElementById("dyn-font-style");
    o ||
      (((o = document.createElement("style")).id = "dyn-font-style"),
      document.head.appendChild(o));
    var a = t.headingFont || n.heading,
      r = t.bodySize ? t.bodySize + "px" : "",
      i = t.headingColor || "";
    o.textContent =
      ".hn,.ash,.pd-title,.pb h1{font-family:" +
      a +
      " !important;" +
      (i ? "color:" + i + " !important;" : "") +
      "}.section-header{font-family:" +
      a +
      " !important;color:var(--txt) !important}.hpln,.tlt,.skn,.cna{font-family:" +
      (t.monoFont || n.mono) +
      " !important;}" +
      (r ? "body{font-size:" + r + " !important;}" : "");
  } catch (e) {}
}
function applyData() {
  applyTheme();
  try {
    var e = SD.pageTexts || {};
    (document.querySelectorAll("[data-key]").forEach(function (t) {
      var n = t.getAttribute("data-key");
      e[n] && (t.innerHTML = e[n]);
    }),
      (document.title = SD.siteTitle || SD.name + " | Portfolio"));
    var t = document.getElementById("page-title");
    t && (t.textContent = SD.siteTitle || SD.name + " | Portfolio");
    var n = document.getElementById("site-favicon");
    n && SD.favicon && (n.href = SD.favicon);
    var o = document.getElementById("site-brand");
    o && (o.textContent = SD.siteName || SD.name);
    var a = document.getElementById("s-name");
    if (a) {
      var r = SD.name || "Eren Akçam";
      a.innerHTML = r.indexOf(" ") > -1 ? r.replace(" ", "<br>") : r;
    }
    var i = document.getElementById("s-photo");
    i &&
      SD.profilePhoto &&
      (i.src = SD.profilePhoto + "?v=" + Math.floor(Date.now() / 1e4));
    var l = document.getElementById("hero-tag");
    l && (l.textContent = SD.tag || "");
    var c = document.getElementById("hero-desc");
    c && (c.textContent = SD.herodesc || "");
    var d = SD.email || "eren.akcamm@gmail.com";
    document.querySelectorAll(".site-email").forEach(function (e) {
      ((e.textContent = d), (e.href = "mailto:" + d));
    });
    var s = document.getElementById("s-em");
    s && (s.href = "mailto:" + d);
    var m = SD.linkedin || "#",
      p = document.getElementById("s-li");
    p && (p.href = m);
    var u = document.getElementById("c-li2");
    u && ((u.href = m), (u.textContent = "erenakcam"));
    var g = document.getElementById("c-phone");
    g &&
      ((g.textContent = SD.phone || ""),
      (g.href = "tel:" + (SD.phone || "").replace(/\s/g, "")));
    var v = document.getElementById("c-fr");
    (v && (v.href = SD.freelance || "#"),
      renderMemory(),
      renderSkills(),
      renderCerts(),
      preloadCertImages());
  } catch (e) {
    console.warn("applyData error:", e);
  }
}
function renderMemory() {
  var e = document.getElementById("memory-body");
  if (e) {
    var t = SD.memory || DEF.memory,
      n = "";
    (t.experience &&
      t.experience.length &&
      ((n +=
        '<div class="section-header">Experience</div><div class="tl-grid">'),
      t.experience.forEach(function (e) {
        n += memRow(e, "Experience");
      }),
      (n += "</div>")),
      t.education &&
        t.education.length &&
        ((n +=
          '<div class="section-header">Education</div><div class="tl-grid">'),
        t.education.forEach(function (e) {
          n += memRow(e, "Education");
        }),
        (n += "</div>")),
      (e.innerHTML = n || '<p style="color:var(--mu)">No entries yet.</p>'),
      e.querySelectorAll(".tli-expand-btn").forEach(function (e) {
        e.addEventListener("click", function () {
          var e = this.getAttribute("data-id"),
            t = document.getElementById("tlp-" + e);
          if (t) {
            var n = t.classList.toggle("expanded");
            (this.classList.toggle("open", n),
              (this.querySelector("span").textContent = n
                ? "Show less"
                : "Read more"));
          }
        });
      }));
  }
}
var _memId = 0;
function memRow(e, t) {
  var n = ++_memId,
    o = (e.desc || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>"),
    a = (e.desc || "").length > 280,
    r = "";
  e.logo
    ? (r =
        '<div class="tli-logo-wrap"><img src="' +
        esc(e.logo) +
        '" alt=""/></div>')
    : (r =
        '<div class="tli-logo-wrap">' +
        ("Education" === t
          ? '<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.686 2 6 2s6-.9 6-2v-5"/></svg>'
          : '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>') +
        "</div>");
  var i = e.location
      ? '<div class="tlc"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
        esc(e.location) +
        "</div>"
      : "",
    l = a
      ? '<button class="tli-expand-btn" data-id="' +
        n +
        '"><span>Read more</span><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button>'
      : "";
  return (
    '<div class="tli"><div class="tli-visual"><div class="tli-visual-bg" style="background-image:linear-gradient(135deg,var(--gd) 0%,#1a3828 40%,var(--blk) 100%)"></div><div class="tli-visual-fallback">' +
    r +
    "</div>" +
    (e.date
      ? '<div class="tli-date"><div><div class="tli-date-accent"></div><div class="tli-date-text">' +
        esc(e.date) +
        "</div></div></div>"
      : "") +
    '</div><div class="tli-content"><div class="tli-type">' +
    esc(t) +
    '</div><div class="tlt">' +
    esc(e.title || "") +
    "</div>" +
    (e.company ? '<div class="tls">' + esc(e.company) + "</div>" : "") +
    i +
    '<p class="tlp" id="tlp-' +
    n +
    '">' +
    o +
    "</p>" +
    l +
    "</div></div>"
  );
}
var BM = {
    Advanced: "ba",
    Intermediate: "bi",
    Basic: "bb",
    Native: "bn",
    B1: "bi",
    B2: "bi",
    A1: "bb",
    A2: "bb",
    C1: "ba",
    C2: "bn",
  },
  BL = {
    Advanced: "Advanced Level",
    Intermediate: "Intermediate Level",
    Basic: "Basic Level",
    Native: "Native Level",
    B1: "B1 Level",
    B2: "B2 Level",
    A1: "A1 Level",
    A2: "A2 Level",
    C1: "C1 Level",
    C2: "C2 Level",
  };
function renderSkills() {
  var e = document.getElementById("skills-body");
  if (e) {
    var t = (SD.skills && SD.skills.categories) || DEF.skills.categories,
      n = "";
    (t.forEach(function (e) {
      ((n +=
        '<div class="section-header">' +
        esc(e.label) +
        '</div><div class="skg">'),
        (e.items || []).forEach(function (e) {
          n +=
            '<div class="skc"><div class="skt"><span class="skn">' +
            esc(e.n) +
            '</span><span class="skb ' +
            (BM[e.l] || "bi") +
            '">' +
            (BL[e.l] || esc(e.l)) +
            '</span></div><div class="sbt"><div class="sbf" data-w="' +
            e.w +
            '" style="width:0%"></div></div></div>';
        }),
        (n += "</div>"));
    }),
      (e.innerHTML = n));
  }
}
function renderCerts() {
  var e = document.getElementById("certs-body");
  if (e) {
    var t = (SD.certs && SD.certs.categories) || DEF.certs.categories,
      n = '<div class="crt">';
    (t.forEach(function (e) {
      certSliders[e.id] || (certSliders[e.id] = 0);
      var t = certSliders[e.id],
        o = e.items || [];
      if (o.length) {
        (t >= o.length && (t = 0), (certSliders[e.id] = t));
        var a = o[t];
        n +=
          '<div class="cs"><div class="section-header">' +
          esc(e.label) +
          '</div><div class="csv"><div class="cia" data-cid="' +
          esc(e.id) +
          '"><button class="ca pv" onclick="slideCert(\'' +
          e.id +
          '\',-1)"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button><img id="cimg-' +
          esc(e.id) +
          '" src="' +
          esc(a.src) +
          '" alt="' +
          esc(a.name) +
          '" loading="lazy" decoding="async" onclick="openLb(this.src,\'' +
          e.id +
          '\')" style="cursor:zoom-in"/><button class="ca nx" onclick="slideCert(\'' +
          e.id +
          '\',1)"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></button></div></div><div class="cnp"><span class="cna" id="cnm-' +
          esc(e.id) +
          '">' +
          esc(a.name) +
          '</span><span class="cco" id="cco-' +
          esc(e.id) +
          '">' +
          (t + 1) +
          "/" +
          o.length +
          '</span></div><div class="cds" id="cdots-' +
          esc(e.id) +
          '"></div></div>';
      }
    }),
      (n += "</div>"),
      (e.innerHTML = n),
      t.forEach(function (e) {
        buildCertDots(e.id);
      }),
      addSwipeToCerts());
  }
}
var _certTouchX = {};
function addSwipeToCerts() {
  document.querySelectorAll(".cia[data-cid]").forEach(function (e) {
    var t = e.getAttribute("data-cid");
    (e.addEventListener(
      "touchstart",
      function (e) {
        _certTouchX[t] = e.changedTouches[0].clientX;
      },
      { passive: !0 },
    ),
      e.addEventListener(
        "touchend",
        function (e) {
          var n = e.changedTouches[0].clientX - (_certTouchX[t] || 0);
          Math.abs(n) > 40 && slideCert(t, n < 0 ? 1 : -1);
        },
        { passive: !0 },
      ));
  });
}
function slideCert(e, t) {
  var n = ((SD.certs && SD.certs.categories) || []).find(function (t) {
    return t.id === e;
  });
  if (n) {
    var o = n.items || [],
      a = o.length;
    if (a) {
      certSliders[e] = ((certSliders[e] || 0) + t + a) % a;
      var r = o[certSliders[e]],
        i = document.getElementById("cimg-" + e);
      i &&
        ((i.style.opacity = "0"),
        (i.style.transition = "opacity .15s"),
        setTimeout(function () {
          ((i.src = r.src),
            (i.onload = function () {
              i.style.opacity = "1";
            }),
            i.complete && (i.style.opacity = "1"));
        }, 120));
      var l = document.getElementById("cnm-" + e);
      l && (l.textContent = r.name);
      var c = document.getElementById("cco-" + e);
      (c && (c.textContent = certSliders[e] + 1 + "/" + a), buildCertDots(e));
    }
  }
}
function preloadCertImages() {
  var e = function () {
    ((SD.certs && SD.certs.categories) || []).forEach(function (e) {
      var t = e.items || [];
      if (!(t.length < 2)) {
        var n = certSliders[e.id] || 0;
        [t[(n + 1) % t.length], t[(n - 1 + t.length) % t.length]].forEach(
          function (e) {
            e && e.src && (new Image().src = e.src);
          },
        );
      }
    });
  };
  "requestIdleCallback" in window
    ? requestIdleCallback(e, { timeout: 2e3 })
    : setTimeout(e, 1500);
}
function buildCertDots(e) {
  var t = document.getElementById("cdots-" + e);
  if (t) {
    t.innerHTML = "";
    var n = ((SD.certs && SD.certs.categories) || []).find(function (t) {
      return t.id === e;
    });
    n &&
      (n.items || []).forEach(function (n, o) {
        var a = document.createElement("button");
        ((a.className = "cd" + (o === (certSliders[e] || 0) ? " on" : "")),
          (a.onclick = function () {
            ((certSliders[e] = o), slideCert(e, 0));
          }),
          t.appendChild(a));
      });
  }
}
function toggleMobNav() {
  var e = document.getElementById("nav-menu"),
    t = document.getElementById("nav-burger");
  e && t && (e.classList.toggle("mob-open"), t.classList.toggle("open"));
}
function closeMobNav() {
  var e = document.getElementById("nav-menu"),
    t = document.getElementById("nav-burger");
  (e && e.classList.remove("mob-open"), t && t.classList.remove("open"));
}
document.addEventListener("click", function (e) {
  e.target.closest("nav") || closeMobNav();
});
var PAGES = ["pp", "mem", "sk", "cer", "ref", "con"],
  pageHistory = [],
  _internalNavFlag = !1;
function showPage(e) {
  (PAGES.forEach(function (e) {
    var t = document.getElementById(e);
    t && t.classList.remove("on");
  }),
    document.querySelectorAll(".nm a").forEach(function (e) {
      e.classList.remove("on");
    }));
  var t = document.getElementById(e);
  t && t.classList.add("on");
  var n = document.getElementById("n-" + e);
  (n && n.classList.add("on"),
    window.scrollTo(0, 0),
    "sk" === e && setTimeout(animateBars, 80),
    "ref" === e && renderRefPage());
  var o = document.getElementById("mob-back-btn");
  (o && (o.style.display = "pp" === e ? "none" : ""),
    "function" == typeof trackEvent && trackEvent("pageview", { page: e }));
}
function go(e) {
  var t = "#" + e;
  (window.location.hash !== t && (_internalNavFlag = !0),
    (window.location.hash = t));
  var n = PAGES.find(function (e) {
    var t = document.getElementById(e);
    return t && t.classList.contains("on");
  });
  (n && n !== e && pageHistory.push(n),
    pageHistory.length > 20 && pageHistory.shift(),
    showPage(e));
}
function goBack() {
  var e = pageHistory.pop() || "pp";
  showPage(e);
  var t = document.getElementById("mob-back-btn");
  t && (t.style.display = "pp" === e ? "none" : "");
}
function animateBars() {
  document.querySelectorAll(".sbf").forEach(function (e) {
    var t = e.getAttribute("data-w") + "%";
    ((e.style.width = "0%"),
      setTimeout(function () {
        e.style.width = t;
      }, 60));
  });
}
var GAS_TRACK_URL =
    "https://script.google.com/macros/s/AKfycbwivErhj0unkMngTzkXcU29c4WQ0Rf9su5Aji5EA3GsqSSZO1Q-3YISpISvQ3QJxGNVTg/exec",
  _trackVisitorId = null,
  _trackGeoCache = null;
function _trackGetVisitorId() {
  if (_trackVisitorId) return _trackVisitorId;
  try {
    var e = localStorage.getItem("_vid");
    (e ||
      ((e =
        "v_" +
        Date.now().toString(36) +
        "_" +
        Math.random().toString(36).slice(2, 10)),
      localStorage.setItem("_vid", e)),
      (_trackVisitorId = e));
  } catch (e) {
    _trackVisitorId = "v_anon_" + Math.random().toString(36).slice(2, 10);
  }
  return _trackVisitorId;
}
function _trackGetGeo(e) {
  if (_trackGeoCache) e(_trackGeoCache);
  else {
    try {
      var t = sessionStorage.getItem("_geo");
      if (t) return ((_trackGeoCache = JSON.parse(t)), void e(_trackGeoCache));
    } catch (e) {}
    var n = !1,
      o = function (t) {
        n || ((n = !0), e(t));
      };
    (setTimeout(function () {
      o({ ip: "", city: "", region: "", country: "", org: "" });
    }, 2500),
      fetch("https://ipapi.co/json/")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          var t = {
            ip: e.ip || "",
            city: e.city || "",
            region: e.region || "",
            country: e.country_name || "",
            org: e.org || "",
          };
          _trackGeoCache = t;
          try {
            sessionStorage.setItem("_geo", JSON.stringify(t));
          } catch (e) {}
          o(t);
        })
        .catch(function () {
          o({ ip: "", city: "", region: "", country: "", org: "" });
        }));
  }
}
function _trackGetReferrerSource() {
  var e = document.referrer || "";
  if (!e) return "Doğrudan";
  try {
    var t = new URL(e).hostname.replace(/^www\./, "").toLowerCase();
    return t.indexOf("linkedin.") > -1
      ? "LinkedIn"
      : t.indexOf("google.") > -1
        ? "Google"
        : t.indexOf("instagram.") > -1
          ? "Instagram"
          : t.indexOf("twitter.") > -1 || "x.com" === t
            ? "Twitter / X"
            : t.indexOf("facebook.") > -1
              ? "Facebook"
              : t.indexOf("github.") > -1
                ? "GitHub"
                : t === window.location.hostname
                  ? "Site içi"
                  : t;
  } catch (e) {
    return "Doğrudan";
  }
}
function _trackSend(e) {
  var t = JSON.stringify(e);
  try {
    fetch(GAS_TRACK_URL, {
      method: "POST",
      mode: "no-cors",
      redirect: "follow",
      keepalive: !0,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: t,
    }).catch(function () {});
  } catch (e) {}
  try {
    if (navigator.sendBeacon && "hidden" === document.visibilityState) {
      var n = new Blob([t], { type: "text/plain;charset=utf-8" });
      navigator.sendBeacon(GAS_TRACK_URL, n);
    }
  } catch (e) {}
}
function trackEvent(e, t) {
  if (GAS_TRACK_URL) {
    var n = _trackGetVisitorId();
    (_trackSend({
      visitorId: n,
      action: e,
      page: (t && t.page) || "",
      meta: t || {},
      referrer: document.referrer || "",
      referrerSource: _trackGetReferrerSource(),
      userAgent: navigator.userAgent || "",
      lang: navigator.language || "",
      ip: "",
      city: "",
      region: "",
      country: "",
      org: "",
      url: window.location.href,
      time: new Date().toISOString(),
    }),
      _trackGetGeo(function (e) {
        e &&
          (e.ip || e.city || e.country) &&
          _trackSend({
            visitorId: n,
            action: "geo_update",
            ip: e.ip,
            city: e.city,
            region: e.region,
            country: e.country,
            org: e.org,
            time: new Date().toISOString(),
          });
      }));
  }
}
var GAS_CONTACT_URL =
  "https://script.google.com/macros/s/AKfycbzOygn61F1XBjrR6FmrQQAqMJmRIeqTpPnAB83Hdv4ozWv5SReQb725K8DH6erVIbmU/exec";
function sendMsg() {
  var e = document.getElementById("f-name"),
    t = document.getElementById("f-email"),
    n = document.getElementById("f-subj"),
    o = document.getElementById("f-phone"),
    a = document.getElementById("f-msg"),
    r = document.getElementById("f-err"),
    i = document.querySelector(".fsub");
  if (a) {
    var l = e ? e.value.trim() : "",
      c = t ? t.value.trim() : "",
      d = n ? n.value.trim() : "",
      s = o ? o.value.trim() : "",
      m = a.value.trim();
    if (!m || !d)
      return (
        (r.textContent = "Lütfen Konu ve Mesaj alanlarını doldurun."),
        (r.style.display = "block"),
        void r.scrollIntoView({ behavior: "smooth", block: "nearest" })
      );
    if (((r.style.display = "none"), !GAS_CONTACT_URL))
      return (
        (r.textContent = "Backend henüz bağlanmadı."),
        void (r.style.display = "block")
      );
    i && ((i.disabled = !0), (i.textContent = "Gönderiliyor..."));
    var p = new FormData();
    (p.append("name", l || "Anonim"),
      p.append("email", c || "Belirtilmedi"),
      p.append("phone", s || "Belirtilmedi"),
      p.append("subject", d),
      p.append("message", m),
      fetch(GAS_CONTACT_URL, { method: "POST", mode: "no-cors", body: p })
        .then(function () {
          i && ((i.disabled = !1), (i.textContent = "Send Message"));
          var e = document.getElementById("cf-wrap"),
            t = document.getElementById("f-succ");
          (e && (e.style.display = "none"),
            t && (t.style.display = "block"),
            "function" == typeof trackEvent &&
              trackEvent("contact_message", {
                name: l || "Anonim",
                email: c || "",
                phone: s || "",
                subject: d,
                message: m,
              }));
        })
        .catch(function () {
          (i && ((i.disabled = !1), (i.textContent = "Send Message")),
            (r.textContent =
              "Bir hata oluştu, lütfen daha sonra tekrar deneyin."),
            (r.style.display = "block"));
        }));
  }
}
var _lbCatId = null,
  _lbScale = 1,
  _lbTouchDist = 0,
  _lbTouchX = 0;
function openLb(e, t) {
  var n = document.getElementById("lb-img");
  ((n.src = e),
    (n.style.transform = "scale(1)"),
    (_lbScale = 1),
    (_lbCatId = t || null));
  var o = (SD.certs && SD.certs.categories) || [],
    a = t
      ? o.find(function (e) {
          return e.id === t;
        })
      : null,
    r = a && a.items && a.items.length > 1;
  ((document.getElementById("lb-pv").style.display = r ? "" : "none"),
    (document.getElementById("lb-nx").style.display = r ? "" : "none"),
    lbUpdateCounter(),
    document.getElementById("lb").classList.add("on"));
}
function closeLb() {
  (document.getElementById("lb").classList.remove("on"),
    (_lbCatId = null),
    (_lbScale = 1));
  var e = document.getElementById("lb-img");
  ((e.style.transform = "translate(0,0) scale(1)"),
    (e.style.transformOrigin = "center center"));
}
function lbSlide(e) {
  _lbCatId &&
    (slideCert(_lbCatId, e),
    setTimeout(function () {
      var e = document.getElementById("cimg-" + _lbCatId);
      if (e) {
        var t = document.getElementById("lb-img");
        ((t.src = e.src),
          (_lbScale = 1),
          (t.style.transform = "translate(0,0) scale(1)"),
          (t.style.transformOrigin = "center center"));
      }
      lbUpdateCounter();
    }, 150));
}
function lbUpdateCounter() {
  var e = document.getElementById("lb-counter");
  if (e)
    if (_lbCatId) {
      var t = ((SD.certs && SD.certs.categories) || []).find(function (e) {
        return e.id === _lbCatId;
      });
      !t || !t.items || t.items.length < 2
        ? (e.textContent = "")
        : (e.textContent =
            (certSliders[_lbCatId] || 0) + 1 + " / " + t.items.length);
    } else e.textContent = "";
}
function handleMailClick(e) {
  e.preventDefault();
  var t = SD.email || "eren.akcamm@gmail.com",
    n = "https://mail.google.com/mail/?view=cm&to=" + encodeURIComponent(t),
    o = !1;
  function a() {
    o = !0;
  }
  window.addEventListener("blur", a, { once: !0 });
  var r = document.createElement("iframe");
  ((r.style.cssText =
    "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;border:none;"),
    (r.src = "mailto:" + t),
    document.body.appendChild(r),
    setTimeout(function () {
      (window.removeEventListener("blur", a),
        document.body.removeChild(r),
        o || window.open(n, "_blank"));
    }, 500));
}
function attachMailHandlers() {
  document.querySelectorAll(".site-email, #s-em").forEach(function (e) {
    e.addEventListener("click", handleMailClick);
  });
  var e = document.getElementById("c-email");
  e && e.addEventListener("click", handleMailClick);
}
(document.addEventListener("keydown", function (e) {
  document.getElementById("lb").classList.contains("on") &&
    ("Escape" === e.key && closeLb(),
    "ArrowLeft" === e.key && lbSlide(-1),
    "ArrowRight" === e.key && lbSlide(1));
}),
  (function () {
    var e = document.getElementById("lb-img-wrap"),
      t = document.getElementById("lb-img");
    if (e) {
      var n = 0,
        o = 0,
        a = 0,
        r = 1,
        i = !1,
        l = 0,
        c = 0,
        d = 0,
        s = 0;
      (e.addEventListener(
        "touchstart",
        function (e) {
          if (
            (1 !== e.touches.length ||
              i ||
              ((d = e.touches[0].clientX),
              (s = e.touches[0].clientY),
              (n = e.touches[0].clientX),
              (o = e.touches[0].clientY),
              (t.style.transition = "none")),
            2 === e.touches.length)
          ) {
            ((i = !0),
              m(!1),
              (a = Math.hypot(
                e.touches[1].clientX - e.touches[0].clientX,
                e.touches[1].clientY - e.touches[0].clientY,
              )),
              (r = _lbScale));
            var l = (e.touches[0].clientX + e.touches[1].clientX) / 2,
              c = (e.touches[0].clientY + e.touches[1].clientY) / 2,
              p = t.getBoundingClientRect();
            ((t.style.transition = "none"),
              (t.style.transformOrigin =
                (((l - p.left) / _lbScale / p.width) * _lbScale * 100).toFixed(
                  1,
                ) +
                "% " +
                (((c - p.top) / _lbScale / p.height) * _lbScale * 100).toFixed(
                  1,
                ) +
                "%"));
          }
        },
        { passive: !0 },
      ),
        e.addEventListener(
          "touchmove",
          function (e) {
            if ((e.preventDefault(), 2 === e.touches.length && i)) {
              var n = Math.hypot(
                e.touches[1].clientX - e.touches[0].clientX,
                e.touches[1].clientY - e.touches[0].clientY,
              );
              a > 0 &&
                ((_lbScale = Math.min(5, Math.max(1, r * (n / a)))),
                (t.style.transform =
                  "translate(" +
                  l +
                  "px," +
                  c +
                  "px) scale(" +
                  _lbScale +
                  ")"));
            } else if (1 === e.touches.length && _lbScale > 1) {
              var o = e.touches[0].clientX - d,
                m = e.touches[0].clientY - s;
              ((l += o),
                (c += m),
                (d = e.touches[0].clientX),
                (s = e.touches[0].clientY),
                (t.style.transform =
                  "translate(" +
                  l +
                  "px," +
                  c +
                  "px) scale(" +
                  _lbScale +
                  ")"));
            }
          },
          { passive: !1 },
        ),
        e.addEventListener(
          "touchend",
          function (e) {
            if (0 === e.touches.length && i)
              return (
                (i = !1),
                void (
                  _lbScale <= 1.08 &&
                  ((_lbScale = 1),
                  (l = 0),
                  (c = 0),
                  (t.style.transition = "transform .25s"),
                  (t.style.transform = "translate(0,0) scale(1)"),
                  (t.style.transformOrigin = "center center"),
                  m(!0))
                )
              );
            if (!i && _lbScale <= 1) {
              var a = e.changedTouches[0].clientX - n,
                r = e.changedTouches[0].clientY - o;
              Math.abs(a) > 50 &&
                Math.abs(a) > Math.abs(r) &&
                lbSlide(a < 0 ? 1 : -1);
            }
          },
          { passive: !0 },
        ),
        document.getElementById("lb").addEventListener("click", function (t) {
          (t.target !== this && t.target !== e) || closeLb();
        }));
    }
    function m(e) {
      var t = document.getElementById("lb-pv"),
        n = document.getElementById("lb-nx");
      (t && (t.style.opacity = e ? "1" : "0"),
        n && (n.style.opacity = e ? "1" : "0"),
        t && (t.style.pointerEvents = e ? "auto" : "none"),
        n && (n.style.pointerEvents = e ? "auto" : "none"));
    }
  })());
var GAS_REFS_URL =
    "https://script.google.com/macros/s/AKfycbx2HvGmUBhH6rhMA-j1Rt8aMC8U3gxr6hRlTSrZgxrLdQLqONnaA8Sg-V-oJUg1wrawlg/exec",
  _refsCache = null,
  _refsCacheTime = 0;
function rpGetRefs() {
  return _refsCache || [];
}
function rpLoadRefsFromJSON(e) {
  var t = Date.now();
  null !== _refsCache && t - _refsCacheTime < 3e4
    ? e && e(_refsCache)
    : fetch("data/refs.json?_=" + t)
        .then(function (e) {
          return e.json();
        })
        .then(function (t) {
          var n, o;
          (Array.isArray(t)
            ? ((n = t), (o = null))
            : ((n = Array.isArray(t.refs) ? t.refs : []),
              (o = Array.isArray(t.approved) ? t.approved : null)),
            (_refsCache =
              null !== o
                ? n.filter(function (e) {
                    return -1 !== o.indexOf(String(e.id));
                  })
                : n),
            (_refsCacheTime = Date.now()),
            e && e(_refsCache));
        })
        .catch(function () {
          ((_refsCache = _refsCache || []), e && e(_refsCache));
        });
}
function rpGetInitials(e) {
  if (!e) return "?";
  var t = e.trim().replace(/\s+/g, " ").split(" ");
  return 1 === t.length
    ? t[0].substring(0, 2).toUpperCase()
    : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
function rpEsc(e) {
  return String(e || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function rpBuildCard(e) {
  for (
    var t = e.photo
        ? '<div class="ref-avatar"><img src="' +
          rpEsc(e.photo) +
          '" alt=""/></div>'
        : '<div class="ref-avatar" style="background:linear-gradient(135deg,var(--gd),var(--g))">' +
          rpEsc(rpGetInitials(e.name)) +
          "</div>",
      n = "",
      o = parseInt(e.rating) || 5,
      a = 1;
    a <= 5;
    a++
  )
    n +=
      '<span style="color:' + (a <= o ? "#dda15e" : "#d0d0d0") + '">★</span>';
  var r = '<div class="ref-stars">' + n + "</div>",
    i = [e.title, e.company].filter(Boolean).join(" @ "),
    l = e.context || "",
    c = e.period || "",
    d = "";
  if (e.date) {
    var s = new Date(e.date);
    d =
      '<div class="ref-date-badge">' +
      ([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][s.getMonth()] +
        " " +
        s.getDate() +
        ", " +
        s.getFullYear()) +
      "</div>";
  }
  var m = "";
  if (
    (e.email &&
      (m +=
        '<div class="ref-contact-item"><svg viewBox="0 0 24 24" class="ref-contact-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" stroke-width="2"/></svg><a class="ref-contact-link" href="mailto:' +
        rpEsc(e.email) +
        '">' +
        rpEsc(e.email) +
        "</a></div>"),
    e.phone &&
      (m +=
        '<div class="ref-contact-item"><svg viewBox="0 0 24 24" class="ref-contact-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" stroke-width="2"/></svg><a class="ref-contact-link" href="tel:' +
        rpEsc(e.phone) +
        '">' +
        rpEsc(e.phone) +
        "</a></div>"),
    e.linkedin)
  ) {
    var p = "",
      u = e.linkedin.match(/\/in\/([a-zA-Z0-9-]+)/);
    ((p =
      u && u[1]
        ? u[1]
        : e.linkedin
            .split("/")
            .pop()
            .replace(/[?#&].*/, "")),
      (m +=
        '<div class="ref-contact-item"><svg viewBox="0 0 24 24" class="ref-contact-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="2"/><rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="4" r="2" fill="currentColor"/></svg><a class="ref-contact-link" href="' +
        rpEsc(e.linkedin) +
        '" target="_blank">@' +
        rpEsc(p) +
        "</a></div>"));
  }
  return (
    '<div class="ref-card-v2" data-id="' +
    e.id +
    '"><div class="ref-corner">' +
    r +
    d +
    '</div><div class="ref-card-v2-content"><div class="ref-card-v2-left">' +
    t +
    '</div><div class="ref-card-v2-right"><div class="ref-name-v2">' +
    rpEsc(e.name) +
    "</div>" +
    (i ? '<div class="ref-role-v2">' + rpEsc(i) + "</div>" : "") +
    (l ? '<div class="ref-context-v2">' + rpEsc(l) + "</div>" : "") +
    (c ? '<div class="ref-period-v2">' + rpEsc(c) + "</div>" : "") +
    '</div></div><div class="ref-body-v2">' +
    rpEsc(e.desc).replace(/\n/g, "<br>") +
    "</div>" +
    (m ? '<div class="ref-contacts-v2">' + m + "</div>" : "") +
    "</div>"
  );
}
function renderRefPage() {
  var e = document.getElementById("ref-list"),
    t = document.getElementById("ref-empty");
  e &&
    t &&
    ((e.innerHTML =
      '<div style="text-align:center;padding:30px 20px;color:var(--mu);font-size:.82rem">Loading references...</div>'),
    (e.style.display = ""),
    (t.style.display = "none"),
    rpLoadRefsFromJSON(function (n) {
      if (n.length)
        ((t.style.display = "none"),
          (e.style.display = ""),
          buildRefFiltersBar(),
          applyRefFilters());
      else {
        ((e.innerHTML = ""),
          (e.style.display = "none"),
          (t.style.display = "flex"),
          (t.style.flexDirection = "column"),
          (t.style.alignItems = "center"));
        var o = document.getElementById("ref-filters-bar");
        o && (o.style.display = "none");
      }
    }));
}
function openRefPanel() {
  (document.getElementById("ref-overlay").classList.add("on"),
    document.getElementById("ref-panel").classList.add("on"),
    (document.body.style.overflow = "hidden"),
    (document.getElementById("ref-succ").style.display = "none"),
    (document.getElementById("ref-form-body").style.display = ""),
    document
      .querySelectorAll("#ref-panel .ref-panel-foot")
      .forEach(function (e) {
        e.style.display = "";
      }),
    rpResetForm());
}
function closeRefPanel() {
  (document.getElementById("ref-overlay").classList.remove("on"),
    document.getElementById("ref-panel").classList.remove("on"),
    (document.body.style.overflow = ""));
}
function rpPreviewPhoto(e) {
  var t = e.target.files[0];
  if (t) {
    var n = new FileReader();
    ((n.onload = function (e) {
      var t = new Image();
      ((t.onload = function () {
        var e = 256,
          n = t.width,
          o = t.height;
        n > o
          ? n > e && ((o *= e / n), (n = e))
          : o > e && ((n *= e / o), (o = e));
        var a = document.createElement("canvas");
        ((a.width = n),
          (a.height = o),
          a.getContext("2d").drawImage(t, 0, 0, n, o));
        var r = a.toDataURL("image/jpeg", 0.85),
          i = document.getElementById("rp-photo-prev");
        ((i.style.backgroundImage = "url(" + r + ")"),
          (i.style.backgroundSize = "cover"),
          (i.innerHTML = ""),
          (document.getElementById("rp-photo-data").value = r));
      }),
        (t.src = e.target.result));
    }),
      n.readAsDataURL(t));
  }
}
function rpInitStars() {
  var e = document.getElementById("rp-stars-wrap");
  if (e && !e._init) {
    e._init = !0;
    var t = document.getElementById("rp-rating"),
      n = e.querySelectorAll("span");
    (o(5),
      n.forEach(function (e) {
        (e.addEventListener("click", function () {
          var e = parseInt(this.getAttribute("data-v"));
          ((t.value = e), o(e));
        }),
          e.addEventListener("mouseover", function () {
            o(parseInt(this.getAttribute("data-v")));
          }),
          e.addEventListener("mouseout", function () {
            o(parseInt(t.value));
          }));
      }));
  }
  function o(e) {
    n.forEach(function (t) {
      var n = parseInt(t.getAttribute("data-v"));
      t.classList.toggle("lit", n <= e);
    });
  }
}
function rpNameInitials() {
  var e = document.getElementById("rp-name");
  e &&
    e.addEventListener("input", function () {
      if (!document.getElementById("rp-photo-data").value) {
        var e = document.getElementById("rp-photo-prev"),
          t = rpGetInitials(this.value);
        t && "?" !== t
          ? ((e.style.backgroundImage = "none"),
            (e.style.background = "linear-gradient(135deg,var(--gd),var(--g))"),
            (e.style.border = "2px solid var(--bm)"),
            (e.style.color = "var(--bl)"),
            (e.style.display = "flex"),
            (e.style.alignItems = "center"),
            (e.style.justifyContent = "center"),
            (e.style.fontSize = "1rem"),
            (e.style.fontStyle = "italic"),
            (e.style.fontWeight = "700"),
            (e.innerHTML = rpEsc(t)))
          : ((e.style.backgroundImage = ""),
            (e.style.background = "var(--bl)"),
            (e.style.border = "2px dashed var(--bd)"),
            (e.style.color = ""),
            (e.innerHTML =
              '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--bd)" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'));
      }
    });
}
function rpResetForm() {
  ([
    "rp-name",
    "rp-title",
    "rp-company",
    "rp-context",
    "rp-context-display",
    "rp-period",
    "rp-email",
    "rp-phone",
    "rp-linkedin",
    "rp-desc",
  ].forEach(function (e) {
    var t = document.getElementById(e);
    t && (t.value = "");
  }),
    (document.getElementById("rp-rating").value = "5"),
    (document.getElementById("rp-phone-code").value = "90"),
    (document.getElementById("phone-code-display").textContent = "+90"),
    (document.getElementById("rp-photo-data").value = ""));
  var e = document.getElementById("rp-photo-prev");
  e &&
    ((e.style.backgroundImage = ""),
    (e.style.background = "var(--bl)"),
    (e.style.border = "2px dashed var(--bd)"),
    (e.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--bd)" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'));
  var t = document.getElementById("rp-photo-file");
  t && (t.value = "");
  var n = document.getElementById("context-custom-input-row");
  n && (n.style.display = "none");
  var o = document.getElementById("context-custom-input");
  if (
    (o && (o.value = ""), (l = document.getElementById("context-dropdown-btn")))
  ) {
    var a = l.querySelector("span");
    a
      ? (a.textContent = "Select an option...")
      : (l.textContent = "Select an option...");
  }
  var r = document.getElementById("context-dropdown-list");
  (r && (r.classList.remove("open"), (r._populated = !1)),
    document.querySelectorAll(".exp-card").forEach(function (e) {
      e.classList.remove("selected");
    }));
  var i = document.getElementById("rp-stars-wrap");
  i &&
    ((document.getElementById("rp-rating").value = "5"),
    i.querySelectorAll("span").forEach(function (e) {
      e.classList.toggle("lit", parseInt(e.getAttribute("data-v")) <= 5);
    }));
  var l,
    c = document.getElementById("rp-err");
  (c && ((c.style.display = "none"), (c.textContent = "")),
    (l = document.getElementById("rp-submit-btn")) &&
      ((l.disabled = !1), (l.textContent = "Submit Reference")));
}
function rpSubmit() {
  var e = (document.getElementById("rp-name").value || "").trim(),
    t = (document.getElementById("rp-title").value || "").trim(),
    n = (document.getElementById("rp-company").value || "").trim(),
    o = (document.getElementById("rp-context").value || "").trim();
  if (!o) {
    var a = document.getElementById("context-custom-input-row");
    a &&
      "none" !== a.style.display &&
      (o = (
        document.getElementById("context-custom-input").value || ""
      ).trim());
  }
  var r = (document.getElementById("rp-period").value || "").trim(),
    i = parseInt(document.getElementById("rp-rating").value) || 5,
    l = (document.getElementById("rp-desc").value || "").trim(),
    c = document.getElementById("rp-photo-data").value,
    d = (document.getElementById("rp-email").value || "").trim(),
    s = document.getElementById("rp-phone-code").value,
    m = (document.getElementById("rp-phone").value || "").trim(),
    p = s && m ? "+" + s + " " + m : "",
    u = (document.getElementById("rp-linkedin").value || "").trim();
  if (!u && e) {
    var g = {
      ç: "c",
      ğ: "g",
      ı: "i",
      ö: "o",
      ş: "s",
      ü: "u",
      Ç: "c",
      Ğ: "g",
      İ: "i",
      Ö: "o",
      Ş: "s",
      Ü: "u",
    };
    u =
      "https://www.linkedin.com/in/" +
      e
        .toLowerCase()
        .replace(/[çğşıöüÇĞİÖŞÜ]/g, function (e) {
          return g[e];
        })
        .replace(/[^a-z0-9]/g, "");
  } else
    u &&
      !u.startsWith("http") &&
      (u = "https://www.linkedin.com/in/" + u.replace(/^[/\\]+/, ""));
  var v = document.getElementById("rp-err"),
    y = document.getElementById("rp-submit-btn");
  if (!e)
    return (
      (v.textContent = "Please enter your name."),
      void (v.style.display = "block")
    );
  if (!l)
    return (
      (v.textContent = "Please write your reference text."),
      void (v.style.display = "block")
    );
  ((v.style.display = "none"),
    (y.disabled = !0),
    (y.textContent = "Saving..."));
  var f = {
    id: Date.now(),
    name: e,
    title: t,
    company: n,
    context: o,
    period: r,
    rating: i,
    desc: l,
    photo: c,
    email: d,
    phone: p,
    linkedin: u,
    date: new Date().toISOString(),
  };
  if (!GAS_REFS_URL || -1 !== GAS_REFS_URL.indexOf("BURAYA_SCRIPT_ID_GELECEK"))
    return (
      (v.textContent = "Google Apps Script URL henüz ayarlanmadı."),
      (v.style.display = "block"),
      (y.disabled = !1),
      void (y.textContent = "Submit Reference")
    );
  var h = !1,
    E = !1;
  fetch(GAS_REFS_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(f),
  })
    .then(function (e) {
      return e.json
        ? e.json().catch(function () {
            return null;
          })
        : null;
    })
    .then(function (e) {
      if (((h = !0), e && e.error))
        return ((E = !0), void console.warn("Referans kayıt hatası:", e.error));
      ((_refsCache = null), (_refsCacheTime = 0));
    })
    .catch(function (e) {
      ((h = !0),
        (E = !0),
        console.warn("Referans gönderim hatası (arka planda):", e));
    });
  var b = 0,
    I = setInterval(function () {
      ((b += 100),
        (h || b >= 1200) &&
          (clearInterval(I),
          (function () {
            if (E)
              return (
                (y.disabled = !1),
                (y.textContent = "Submit Reference"),
                (v.textContent = "Bir hata oluştu, lütfen tekrar deneyin."),
                void (v.style.display = "block")
              );
            ((document.getElementById("ref-form-body").style.display = "none"),
              document
                .querySelectorAll("#ref-panel .ref-panel-foot")
                .forEach(function (e) {
                  e.style.display = "none";
                }));
            var t = document.getElementById("ref-succ");
            ((t.style.display = "flex"),
              (t.style.flexDirection = "column"),
              (t.style.alignItems = "center"),
              "function" == typeof trackEvent &&
                trackEvent("reference_submitted", { name: e }),
              setTimeout(function () {
                (closeRefPanel(), renderRefPage());
              }, 1200));
          })()));
    }, 100);
}
document.addEventListener("DOMContentLoaded", function () {
  (rpInitStars(), rpNameInitials(), rpInitContext(), rpInitPhoneFormat());
});
var refFiltersState = { starRating: "", context: "", sortBy: "newest" };
function buildRefFiltersBar() {
  var e = rpGetRefs();
  if (e.length) {
    var t = document.getElementById("ref-filters-bar");
    t && (t.style.display = "");
    var n =
      e.reduce(function (e, t) {
        return e + (parseInt(t.rating) || 0);
      }, 0) / e.length;
    document.getElementById("ref-avg-number").textContent = n.toFixed(1);
    for (var o = "", a = Math.round(n), r = 1; r <= 5; r++)
      o += '<span style="opacity:' + (r <= a ? "1" : ".25") + '">★</span>';
    ((document.getElementById("ref-avg-stars-display").innerHTML = o),
      (document.getElementById("ref-avg-count").textContent =
        "(" + e.length + ")"));
    var i = {};
    e.forEach(function (e) {
      e.context && e.context.trim() && (i[e.context] = !0);
    });
    var l = document.getElementById("ref-filter-context");
    ((l.innerHTML = '<option value="">All</option>'),
      Object.keys(i).forEach(function (e) {
        var t = document.createElement("option");
        ((t.value = e), (t.textContent = e), l.appendChild(t));
      }));
  }
}
function applyRefFilters() {
  ((refFiltersState.starRating =
    document.getElementById("ref-filter-stars").value),
    (refFiltersState.context =
      document.getElementById("ref-filter-context").value),
    (refFiltersState.sortBy = document.getElementById("ref-sort-by").value));
  var e = rpGetRefs().filter(function (e) {
    if (refFiltersState.starRating) {
      var t = parseInt(refFiltersState.starRating);
      if ((parseInt(e.rating) || 5) < t) return !1;
    }
    return (
      !refFiltersState.context || (e.context || "") === refFiltersState.context
    );
  });
  "newest" === refFiltersState.sortBy
    ? e.sort(function (e, t) {
        return new Date(t.date) - new Date(e.date);
      })
    : "oldest" === refFiltersState.sortBy
      ? e.sort(function (e, t) {
          return new Date(e.date) - new Date(t.date);
        })
      : "rating-high" === refFiltersState.sortBy
        ? e.sort(function (e, t) {
            return (parseInt(t.rating) || 5) - (parseInt(e.rating) || 5);
          })
        : "rating-low" === refFiltersState.sortBy &&
          e.sort(function (e, t) {
            return (parseInt(e.rating) || 5) - (parseInt(t.rating) || 5);
          });
  var t = document.getElementById("ref-list");
  (e.length
    ? (t.innerHTML = e.map(rpBuildCard).join(""))
    : (t.innerHTML =
        '<div style="text-align:center;padding:30px 20px;color:var(--mu);font-size:.85rem">No matching references</div>'),
    updateActiveFiltersDisplay());
}
function updateActiveFiltersDisplay() {
  var e = [];
  (refFiltersState.starRating &&
    e.push({
      label: "★ " + refFiltersState.starRating + "+",
      key: "starRating",
    }),
    refFiltersState.context &&
      e.push({ label: refFiltersState.context, key: "context" }));
  var t = document.getElementById("ref-active-filters");
  e.length
    ? (t.innerHTML = e
        .map(function (e) {
          return (
            '<div class="ref-filter-tag">' +
            e.label +
            '<button type="button" onclick="clearRefFilter(\'' +
            e.key +
            "')\">×</button></div>"
          );
        })
        .join(""))
    : (t.innerHTML = "");
}
function clearRefFilter(e) {
  ("starRating" === e
    ? ((refFiltersState.starRating = ""),
      (document.getElementById("ref-filter-stars").value = ""))
    : "context" === e &&
      ((refFiltersState.context = ""),
      (document.getElementById("ref-filter-context").value = "")),
    applyRefFilters());
}
function resetRefFilters() {
  ((refFiltersState = { starRating: "", context: "", sortBy: "newest" }),
    (document.getElementById("ref-filter-stars").value = ""),
    (document.getElementById("ref-filter-context").value = ""),
    (document.getElementById("ref-sort-by").value = "newest"),
    applyRefFilters());
}
(document.addEventListener("keydown", function (e) {
  "Escape" === e.key &&
    document.getElementById("ref-panel").classList.contains("on") &&
    closeRefPanel();
}),
  applyData(),
  attachMailHandlers(),
  rpInitStars(),
  rpNameInitials(),
  showPage(window.location.hash.slice(1) || "pp"),
  window.addEventListener("hashchange", function () {
    _internalNavFlag
      ? (_internalNavFlag = !1)
      : showPage(window.location.hash.slice(1) || "pp");
  }));
var COUNTRY_CODES = [
  { name: "Turkey", code: "+90", flag: "🇹🇷", pattern: "+90 XXXXXXXXXX" },
  {
    name: "United States",
    code: "+1",
    flag: "🇺🇸",
    pattern: "+1 (XXX) XXX-XXXX",
  },
  {
    name: "United Kingdom",
    code: "+44",
    flag: "🇬🇧",
    pattern: "+44 XXXX XXXXXX",
  },
  {
    name: "Germany",
    code: "+49",
    flag: "🇩🇪",
    pattern: "+49 XXX XXXXXXX",
  },
  { name: "France", code: "+33", flag: "🇫🇷", pattern: "+33 X XXXX XXXX" },
  { name: "Spain", code: "+34", flag: "🇪🇸", pattern: "+34 XXX XX XX XX" },
  { name: "Italy", code: "+39", flag: "🇮🇹", pattern: "+39 XXX XXXXXX" },
  {
    name: "Netherlands",
    code: "+31",
    flag: "🇳🇱",
    pattern: "+31 XX XXXXXXX",
  },
  {
    name: "Canada",
    code: "+1",
    flag: "🇨🇦",
    pattern: "+1 (XXX) XXX-XXXX",
  },
  {
    name: "Australia",
    code: "+61",
    flag: "🇦🇺",
    pattern: "+61 X XXXX XXXX",
  },
  { name: "Japan", code: "+81", flag: "🇯🇵", pattern: "+81 XX XXXX XXXX" },
  {
    name: "China",
    code: "+86",
    flag: "🇨🇳",
    pattern: "+86 XXX XXXX XXXX",
  },
  { name: "India", code: "+91", flag: "🇮🇳", pattern: "+91 XXXXX XXXXX" },
  {
    name: "Brazil",
    code: "+55",
    flag: "🇧🇷",
    pattern: "+55 XX XXXXX-XXXX",
  },
  {
    name: "Mexico",
    code: "+52",
    flag: "🇲🇽",
    pattern: "+52 XXX XXXX XXXX",
  },
  {
    name: "South Korea",
    code: "+82",
    flag: "🇰🇷",
    pattern: "+82 XX XXXX XXXX",
  },
  {
    name: "United Arab Emirates",
    code: "+971",
    flag: "🇦🇪",
    pattern: "+971 XX XXX XXXX",
  },
  {
    name: "Saudi Arabia",
    code: "+966",
    flag: "🇸🇦",
    pattern: "+966 XX XXX XXXX",
  },
  {
    name: "Singapore",
    code: "+65",
    flag: "🇸🇬",
    pattern: "+65 XXXX XXXX",
  },
  {
    name: "Indonesia",
    code: "+62",
    flag: "🇮🇩",
    pattern: "+62 XXX XXXX XXXX",
  },
];
function formatPhoneNumber(e, t) {
  var n = COUNTRY_CODES.find(function (e) {
    return e.code === "+" + t;
  });
  if (!n) return e;
  var o = e.replace(/\D/g, "");
  if ("90" === t)
    return 0 === o.length
      ? ""
      : o.length <= 3
        ? o
        : o.length <= 6
          ? o.slice(0, 3) + " " + o.slice(3)
          : o.length <= 8
            ? o.slice(0, 3) + " " + o.slice(3, 6) + " " + o.slice(6)
            : o.slice(0, 3) +
              " " +
              o.slice(3, 6) +
              " " +
              o.slice(6, 8) +
              " " +
              o.slice(8, 10);
  for (
    var a = n.pattern.replace(/\+\d+\s*/, ""), r = "", i = 0, l = 0;
    l < a.length && i < o.length;
    l++
  )
    "X" === a[l] ? (r += o[i++]) : (r += a[l]);
  return r;
}
function rpInitPhoneFormat() {
  var e = document.getElementById("rp-phone"),
    t = document.getElementById("rp-phone-code");
  e &&
    !e._phoneInit &&
    ((e._phoneInit = !0),
    e.addEventListener("input", function (e) {
      var n = this.selectionStart,
        o = this.value,
        a = o.slice(0, n).replace(/\D/g, "").length,
        r = formatPhoneNumber(o, t.value);
      this.value = r;
      for (var i = 0, l = 0, c = 0; c < r.length; c++) {
        if ((/\d/.test(r[c]) && l++, l >= a)) {
          i = c + 1;
          break;
        }
        c === r.length - 1 && (i = r.length);
      }
      try {
        this.setSelectionRange(i, i);
      } catch (e) {}
    }));
}
function openCountryPicker() {
  var e = document.getElementById("country-picker-overlay"),
    t = document.getElementById("country-picker-modal");
  (e ||
    (((e = document.createElement("div")).id = "country-picker-overlay"),
    (e.className = "country-picker-overlay"),
    (e.onclick = function (t) {
      t.target === e && closeCountryPicker();
    }),
    document.body.appendChild(e)),
    t ||
      (((t = document.createElement("div")).id = "country-picker-modal"),
      (t.className = "country-picker-modal"),
      (t.innerHTML =
        '<div class="country-picker-header"><input class="country-picker-search" id="country-search" type="text" placeholder="Search countries..."/></div><div class="country-picker-list" id="country-list"></div>'),
      document.body.appendChild(t)),
    e.classList.add("on"),
    t.classList.add("on"),
    renderCountryList(""),
    document.getElementById("country-search").focus(),
    document
      .getElementById("country-search")
      .addEventListener("input", function () {
        renderCountryList(this.value);
      }));
}
function renderCountryList(e) {
  var t = document.getElementById("country-list"),
    n = document.getElementById("rp-phone-code").value,
    o = COUNTRY_CODES.filter(function (t) {
      return (
        t.name.toLowerCase().includes(e.toLowerCase()) || t.code.includes(e)
      );
    });
  ((t.innerHTML = ""),
    o.forEach(function (e) {
      var o = document.createElement("div");
      ((o.className =
        "country-item" + (e.code.slice(1) === n ? " selected" : "")),
        (o.innerHTML =
          "<span>" +
          e.flag +
          " " +
          e.name +
          '</span><span class="country-code">' +
          e.code +
          "</span>"),
        (o.onclick = function () {
          selectCountry(e);
        }),
        t.appendChild(o));
    }));
}
function selectCountry(e) {
  ((document.getElementById("rp-phone-code").value = e.code.slice(1)),
    (document.getElementById("phone-code-display").textContent = e.code),
    (document.getElementById("rp-phone").value = ""),
    (document.getElementById("rp-phone").placeholder = e.pattern.replace(
      /\+\d+\s*/,
      "",
    )),
    document.getElementById("rp-phone").focus(),
    closeCountryPicker());
}
function closeCountryPicker() {
  var e = document.getElementById("country-picker-overlay"),
    t = document.getElementById("country-picker-modal");
  (e && e.classList.remove("on"), t && t.classList.remove("on"));
}
var MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function openPeriodPicker() {
  var e = document.getElementById("period-picker-modal");
  e ||
    (((e = document.createElement("div")).id = "period-picker-modal"),
    (e.className = "period-picker-modal"),
    (e.innerHTML =
      '<div class="period-picker-head"><div class="period-picker-title">Select Period</div><div class="period-picker-hint">Fill in only what you need — just a year, a range, or an exact date</div></div><div class="period-picker-body"><span class="period-smart-label">From</span><div class="period-date-row" id="period-from-row"><div class="period-date-part"><span class="period-date-part-label">Day</span><input class="period-date-num" id="pd-from-day" type="number" min="1" max="31" placeholder="–" oninput="updatePeriodPreview()"/></div><div class="period-date-sep">·</div><div class="period-date-part" style="min-width:70px"><span class="period-date-part-label">Month</span><select class="period-date-select" id="pd-from-month" onchange="updatePeriodPreview()"><option value="">–</option>' +
      MONTHS.map(function (e, t) {
        return '<option value="' + (t + 1) + '">' + e + "</option>";
      }).join("") +
      '</select></div><div class="period-date-sep">·</div><div class="period-date-part" style="min-width:72px"><span class="period-date-part-label">Year</span><input class="period-date-num" id="pd-from-year" type="number" min="1980" max="2099" placeholder="2024" oninput="updatePeriodPreview()"/></div></div><span class="period-smart-label">To <span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:.6rem;color:var(--mu)">(optional — leave empty for single point in time)</span></span><div class="period-date-row" id="period-to-row"><div class="period-date-part"><span class="period-date-part-label">Day</span><input class="period-date-num" id="pd-to-day" type="number" min="1" max="31" placeholder="–" oninput="updatePeriodPreview()"/></div><div class="period-date-sep">·</div><div class="period-date-part" style="min-width:70px"><span class="period-date-part-label">Month</span><select class="period-date-select" id="pd-to-month" onchange="updatePeriodPreview()"><option value="">–</option>' +
      MONTHS.map(function (e, t) {
        return '<option value="' + (t + 1) + '">' + e + "</option>";
      }).join("") +
      '</select></div><div class="period-date-sep">·</div><div class="period-date-part" style="min-width:72px"><span class="period-date-part-label">Year</span><input class="period-date-num" id="pd-to-year" type="number" min="1980" max="2099" placeholder="2025" oninput="updatePeriodPreview()"/></div></div><div class="period-preview empty" id="period-preview-text">Select at least a year above</div><div class="period-picker-buttons"><button class="period-btn period-btn-cancel" onclick="closePeriodPicker()">Cancel</button><button class="period-btn period-btn-clear" onclick="clearPeriodPicker()">Clear</button><button class="period-btn period-btn-apply" onclick="applyPeriod()">Apply</button></div></div>'),
    document.body.appendChild(e));
  var t = (document.getElementById("rp-period").value || "").trim();
  (t ? prefillPeriodPicker(t) : clearPeriodInputs(),
    updatePeriodPreview(),
    e.classList.add("on"));
}
function prefillPeriodPicker(e) {
  clearPeriodInputs();
  var t = e.split(/\s*[–-]\s*/);
  function n(e) {
    var t = { day: "", month: "", year: "" },
      n = (e = (e || "").trim()).match(
        /(\d{1,2})[\s\/\.](\w{3,})[\s\/\.](\d{4})/,
      );
    return n
      ? ((t.day = n[1]), (t.month = o(n[2])), (t.year = n[3]), t)
      : (n = e.match(/(\w{3,})\s+(\d{4})/))
        ? ((t.month = o(n[1])), (t.year = n[2]), t)
        : (n = e.match(/(\d{4})/))
          ? ((t.year = n[1]), t)
          : t;
  }
  function o(e) {
    var t = MONTHS.findIndex(function (t) {
      return t.toLowerCase() === e.toLowerCase().slice(0, 3);
    });
    return t >= 0 ? String(t + 1) : "";
  }
  if (t[0]) {
    var a = n(t[0]);
    (document.getElementById("pd-from-day") &&
      (document.getElementById("pd-from-day").value = a.day),
      document.getElementById("pd-from-month") &&
        (document.getElementById("pd-from-month").value = a.month),
      document.getElementById("pd-from-year") &&
        (document.getElementById("pd-from-year").value = a.year));
  }
  if (t[1]) {
    var r = n(t[1]);
    (document.getElementById("pd-to-day") &&
      (document.getElementById("pd-to-day").value = r.day),
      document.getElementById("pd-to-month") &&
        (document.getElementById("pd-to-month").value = r.month),
      document.getElementById("pd-to-year") &&
        (document.getElementById("pd-to-year").value = r.year));
  }
}
function clearPeriodInputs() {
  [
    "pd-from-day",
    "pd-from-month",
    "pd-from-year",
    "pd-to-day",
    "pd-to-month",
    "pd-to-year",
  ].forEach(function (e) {
    var t = document.getElementById(e);
    t && (t.value = "");
  });
}
function clearPeriodPicker() {
  (clearPeriodInputs(),
    (document.getElementById("rp-period").value = ""),
    updatePeriodPreview(),
    closePeriodPicker());
}
function buildDateStr(e, t, n) {
  if (!n) return "";
  var o = t ? MONTHS[parseInt(t) - 1] : "",
    a = [];
  return (e && a.push(e), o && a.push(o), a.push(n), a.join(" "));
}
function updatePeriodPreview() {
  var e = document.getElementById("period-preview-text");
  if (e) {
    var t = document.getElementById("pd-from-day")
        ? document.getElementById("pd-from-day").value
        : "",
      n = document.getElementById("pd-from-month")
        ? document.getElementById("pd-from-month").value
        : "",
      o = document.getElementById("pd-from-year")
        ? document.getElementById("pd-from-year").value
        : "",
      a = document.getElementById("pd-to-day")
        ? document.getElementById("pd-to-day").value
        : "",
      r = document.getElementById("pd-to-month")
        ? document.getElementById("pd-to-month").value
        : "",
      i = document.getElementById("pd-to-year")
        ? document.getElementById("pd-to-year").value
        : "",
      l = buildDateStr(t, n, o),
      c = buildDateStr(a, r, i),
      d = "";
    (l && c ? (d = l + " – " + c) : l && (d = l),
      d
        ? ((e.textContent = d), e.classList.remove("empty"))
        : ((e.textContent = "Select at least a year above"),
          e.classList.add("empty")));
  }
}
function applyPeriod() {
  var e = document.getElementById("pd-from-day")
      ? document.getElementById("pd-from-day").value
      : "",
    t = document.getElementById("pd-from-month")
      ? document.getElementById("pd-from-month").value
      : "",
    n = document.getElementById("pd-from-year")
      ? document.getElementById("pd-from-year").value
      : "",
    o = document.getElementById("pd-to-day")
      ? document.getElementById("pd-to-day").value
      : "",
    a = document.getElementById("pd-to-month")
      ? document.getElementById("pd-to-month").value
      : "",
    r = document.getElementById("pd-to-year")
      ? document.getElementById("pd-to-year").value
      : "",
    i = buildDateStr(e, t, n),
    l = buildDateStr(o, a, r),
    c = "";
  (i && l ? (c = i + " – " + l) : i && (c = i),
    c && (document.getElementById("rp-period").value = c),
    closePeriodPicker());
}
function closePeriodPicker() {
  var e = document.getElementById("period-picker-modal");
  e && e.classList.remove("on");
}
function toggleContextDropdown(e) {
  e && e.stopPropagation();
  var t = document.getElementById("context-dropdown-list"),
    n = document.getElementById("context-dropdown-btn");
  t &&
    (t.classList.toggle("open"),
    t.classList.contains("open")
      ? (n && n.style.setProperty("--arrow-rot", "180deg"),
        (t._populated = !1),
        populateContextDropdown(),
        setTimeout(function () {
          document.addEventListener("click", closeContextDropdownOnClick);
        }, 50))
      : (n && n.style.setProperty("--arrow-rot", "0deg"),
        document.removeEventListener("click", closeContextDropdownOnClick)));
}
function closeContextDropdownOnClick(e) {
  var t = document.getElementById("context-dropdown-wrapper");
  if (!t || !t.contains(e.target)) {
    var n = document.getElementById("context-dropdown-list");
    n && n.classList.remove("open");
    var o = document.getElementById("context-dropdown-btn");
    (o && o.style.setProperty("--arrow-rot", "0deg"),
      document.removeEventListener("click", closeContextDropdownOnClick));
  }
}
function populateContextDropdown() {
  var e = document.getElementById("context-dropdown-list");
  if (e && !e._populated) {
    ((e._populated = !0), (e.innerHTML = ""));
    var t = "",
      n = "",
      o = SD && SD.memory ? SD.memory : {},
      a = o.experience || [],
      r = o.education || [];
    (a.length &&
      ((t =
        '<div class="context-dropdown-group"><div class="context-dropdown-label"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>Experience</div>'),
      a.forEach(function (e) {
        var n = "";
        ((n = e.logo
          ? '<img src="' + rpEsc(e.logo) + '" alt=""/>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>'),
          (t +=
            '<div class="context-dropdown-item" onclick="selectContext(\'' +
            rpEsc(e.title) +
            "', '" +
            rpEsc(e.date || "") +
            "',event)\">" +
            n +
            "<span>" +
            rpEsc(e.title) +
            "</span></div>"));
      }),
      (t += "</div>")),
      r.length &&
        ((n =
          '<div class="context-dropdown-group"><div class="context-dropdown-label"><svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.686 2 6 2s6-.9 6-2v-5"/></svg>Education</div>'),
        r.forEach(function (e) {
          n +=
            '<div class="context-dropdown-item" onclick="selectContext(\'' +
            rpEsc(e.title) +
            "', '" +
            rpEsc(e.date || "") +
            '\',event)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="background:linear-gradient(135deg,#2d5a3d,#4a8a60);stroke:#fff;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.686 2 6 2s6-.9 6-2v-5"/></svg><span>' +
            rpEsc(e.title) +
            "</span></div>";
        }),
        (n += "</div>")));
    e.innerHTML =
      t +
      n +
      '<div class="context-dropdown-group"><div class="context-dropdown-label"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>Other</div><div class="context-dropdown-item other-option" onclick="toggleContextOther(event)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg><span>Please specify...</span></div><div id="context-custom-input-row" style="display:none;padding:10px 14px;border-top:1px solid var(--bm);"><input class="ref-inp" id="context-custom-input" type="text" placeholder="e.g. Project Lead, Freelance Partner..." style="margin-bottom:8px;font-size:.78rem;padding:9px 12px" onkeypress="if(event.key===\'Enter\') applyContextCustom()"/><button onclick="applyContextCustom()" style="width:100%;padding:9px;border-radius:7px;background:var(--gd);color:#fff;border:none;font-family:\'Raleway\',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:background .2s">Use This</button></div></div>';
  }
}
function selectContext(e, t, n) {
  (n && n.stopPropagation(),
    (document.getElementById("rp-context-display").value = e),
    (document.getElementById("rp-context").value = e),
    t && (document.getElementById("rp-period").value = t));
  var o = document.getElementById("context-dropdown-btn");
  if (o) {
    o.querySelector("span");
    o.querySelector("span")
      ? (o.querySelector("span").textContent = e)
      : (o.textContent = e);
  }
  var a = document.getElementById("context-dropdown-list");
  a && a.classList.remove("open");
  var r = document.getElementById("context-dropdown-btn");
  (r && r.style.setProperty("--arrow-rot", "0deg"),
    document.removeEventListener("click", closeContextDropdownOnClick));
  var i = document.getElementById("context-custom-input-row");
  i && (i.style.display = "none");
  var l = document.getElementById("context-custom-input");
  l && (l.value = "");
}
function toggleContextOther(e) {
  e && e.stopPropagation();
  var t = document.getElementById("context-custom-input-row"),
    n = document.getElementById("context-dropdown-list");
  t &&
    ("block" === t.style.display ||
      ((t.style.display = "block"),
      n &&
        (n.classList.add("open"),
        setTimeout(function () {
          document.addEventListener("click", closeContextDropdownOnClick);
        }, 50)),
      setTimeout(function () {
        var e = document.getElementById("context-custom-input");
        e && e.focus();
      }, 50)));
}
function applyContextCustom() {
  var e = (document.getElementById("context-custom-input").value || "").trim();
  if (e) {
    ((document.getElementById("rp-context-display").value = e),
      (document.getElementById("rp-context").value = e));
    var t = document.getElementById("context-dropdown-btn");
    if (t) {
      var n = t.querySelector("span");
      n ? (n.textContent = e) : (t.textContent = e);
    }
    var o = document.getElementById("context-dropdown-list");
    o && o.classList.remove("open");
    var a = document.getElementById("context-dropdown-btn");
    a && a.style.setProperty("--arrow-rot", "0deg");
    var r = document.getElementById("context-custom-input-row");
    (r && (r.style.display = "none"),
      (document.getElementById("context-custom-input").value = ""),
      document.removeEventListener("click", closeContextDropdownOnClick));
  } else {
    var i = document.getElementById("context-custom-input");
    i &&
      ((i.style.borderColor = "#ff6b6b"),
      setTimeout(function () {
        i.style.borderColor = "";
      }, 1500));
  }
}
function rpInitContext() {}

!(function () {
  var e = new IntersectionObserver(
    function (t) {
      t.forEach(function (t) {
        t.isIntersecting &&
          (t.target.classList.add("show"), e.unobserve(t.target));
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  function t() {
    document
      .querySelectorAll(".tlh,.skc,.cc,.pj,.logo-card,.lb-thumb,.pf,.pbd>*")
      .forEach(function (t) {
        t.classList.contains("reveal") ||
          t.classList.contains("show") ||
          (t.classList.add("reveal"), e.observe(t));
      });
  }
  (t(),
    new MutationObserver(function () {
      t();
    }).observe(document.body, { childList: !0, subtree: !0 }),
    window.addEventListener("resize", t, { passive: !0 }));
})();
