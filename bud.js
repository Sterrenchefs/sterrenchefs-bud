/* Bud — Sterrenchefs chatbot widget. Zelfinjecterend bestand. */
(function(){
  if (window.__budWidgetLoaded) return; window.__budWidgetLoaded = true;
  var CSS = "\n.bud, .bud *{ box-sizing:border-box; }\n.bud{\n  --fire:#b61d1d; --coral:#c4392a; --burgundy:#913030; --stroke:#3c2e2d;\n  --parchment:#ede7db; --linen:#e4dbc9; --gold:#c8b896; --earth:#1c1b19; --sage:#8f7e68;\n  --serif:\"Fraunces 9 Ptsupersoft\",\"Fraunces\",Georgia,serif; --body:\"Bogart\",Verdana,sans-serif;\n  position:fixed; right:24px; bottom:24px; z-index:99999;\n  font-family:var(--body); color:var(--earth);\n}\n@media (prefers-reduced-motion:no-preference){\n  .bud-panel,.bud-msg,.bud-launch{ transition:opacity .35s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1); }\n}\n\n/* Launcher */\n.bud-launch{\n  display:inline-flex; align-items:center; gap:10px; cursor:pointer;\n  background:var(--fire); color:var(--parchment);\n  border:none; border-radius:999px; padding:14px 22px 15px;\n  font-family:var(--body); font-size:16px; font-weight:600;\n  box-shadow:0 10px 28px -12px rgba(60,46,45,.55);\n}\n.bud-launch:hover{ background:var(--burgundy); }\n.bud-launch:focus-visible{ outline:2px solid var(--coral); outline-offset:3px; }\n.bud-launch .bud-star{ font-family:var(--serif); font-style:italic; font-size:20px; line-height:1; }\n.bud.is-open .bud-launch{ opacity:0; transform:scale(.6) translateY(10px); pointer-events:none; }\n\n/* Panel */\n.bud-panel{\n  position:absolute; right:0; bottom:0; width:380px; max-width:calc(100vw - 32px);\n  height:600px; max-height:calc(100vh - 48px);\n  display:flex; flex-direction:column; overflow:hidden;\n  background:var(--parchment); border:1px solid rgba(28,27,25,.16); border-radius:22px;\n  box-shadow:0 24px 60px -24px rgba(60,46,45,.55);\n  opacity:0; transform:translateY(16px) scale(.98); pointer-events:none;\n}\n.bud.is-open .bud-panel{ opacity:1; transform:none; pointer-events:auto; }\n\n/* Header */\n.bud-head{\n  display:flex; align-items:center; justify-content:space-between;\n  padding:16px 18px; background:var(--linen); border-bottom:1px solid rgba(28,27,25,.12);\n}\n.bud-head h2{\n  margin:0; font-family:var(--serif); font-weight:700; font-size:19px; color:var(--fire);\n  letter-spacing:-.01em;\n}\n.bud-head p{ margin:2px 0 0; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--sage); }\n.bud-x{\n  background:none; border:none; cursor:pointer; color:var(--stroke);\n  font-size:24px; line-height:1; padding:4px 6px; border-radius:8px;\n}\n.bud-x:hover{ background:rgba(60,46,45,.08); }\n.bud-x:focus-visible{ outline:2px solid var(--coral); outline-offset:2px; }\n\n/* Messages */\n.bud-log{ flex:1; overflow-y:auto; padding:20px 18px 8px; display:flex; flex-direction:column; gap:12px; }\n.bud-log::-webkit-scrollbar{ width:8px; }\n.bud-log::-webkit-scrollbar-thumb{ background:rgba(143,126,104,.5); border-radius:99px; }\n.bud-msg{ max-width:84%; font-size:15px; line-height:1.45; opacity:0; transform:translateY(8px); }\n.bud-msg.in{ opacity:1; transform:none; }\n.bud-msg.bot{ align-self:flex-start; background:var(--linen); color:var(--earth); padding:11px 15px; border-radius:4px 18px 18px 18px; }\n.bud-msg.user{ align-self:flex-end; background:var(--fire); color:var(--parchment); padding:11px 15px; border-radius:18px 4px 18px 18px; }\n.bud-msg strong{ font-weight:600; }\n.bud-typing{ align-self:flex-start; display:inline-flex; gap:5px; padding:14px 16px; background:var(--linen); border-radius:4px 18px 18px 18px; }\n.bud-typing span{ width:7px; height:7px; border-radius:50%; background:var(--sage); animation:buddot 1.1s infinite ease-in-out; }\n.bud-typing span:nth-child(2){ animation-delay:.18s; } .bud-typing span:nth-child(3){ animation-delay:.36s; }\n@keyframes buddot{ 0%,60%,100%{ transform:translateY(0); opacity:.5; } 30%{ transform:translateY(-5px); opacity:1; } }\n\n/* Input zone */\n.bud-foot{ padding:12px 16px 16px; border-top:1px solid rgba(28,27,25,.12); background:var(--parchment); }\n.bud-choices{ display:flex; flex-wrap:wrap; gap:8px; }\n.bud-chip{\n  cursor:pointer; background:transparent; color:var(--fire);\n  border:1px solid var(--fire); border-radius:999px; padding:9px 16px;\n  font-family:var(--body); font-size:14px; font-weight:600; line-height:1;\n}\n.bud-chip:hover{ background:var(--fire); color:var(--parchment); }\n.bud-chip:focus-visible{ outline:2px solid var(--coral); outline-offset:2px; }\n.bud-chip.solid{ background:var(--fire); color:var(--parchment); }\n.bud-chip.solid:hover{ background:var(--burgundy); border-color:var(--burgundy); }\n.bud-chip.ghost{ border-color:rgba(60,46,45,.35); color:var(--stroke); }\n.bud-chip.ghost:hover{ background:rgba(60,46,45,.08); color:var(--stroke); }\n.bud-chip[aria-pressed=\"true\"]{ background:var(--fire); color:var(--parchment); }\n\n.bud-form{ display:flex; gap:8px; align-items:flex-end; }\n.bud-input, .bud-textarea{\n  flex:1; font-family:var(--body); font-size:15px; color:var(--earth);\n  background:#f6f1e6; border:1px solid rgba(60,46,45,.3); border-radius:14px;\n  padding:11px 14px; resize:none;\n}\n.bud-input:focus, .bud-textarea:focus{ outline:none; border-color:var(--coral); }\n.bud-send{\n  flex:none; cursor:pointer; background:var(--fire); color:var(--parchment);\n  border:none; border-radius:50%; width:42px; height:42px; font-size:18px; line-height:1;\n}\n.bud-send:hover{ background:var(--burgundy); }\n.bud-send:disabled{ opacity:.4; cursor:default; }\n.bud-send:focus-visible{ outline:2px solid var(--coral); outline-offset:2px; }\n.bud-skip{ display:block; margin:8px auto 0; background:none; border:none; cursor:pointer;\n  color:var(--sage); font-family:var(--body); font-size:13px; text-decoration:underline; }\n.bud-back{ display:inline-flex; align-items:center; gap:4px; margin-top:10px; padding:3px 6px;\n  background:none; border:none; cursor:pointer; color:var(--sage); font-family:var(--body); font-size:13px; border-radius:8px; }\n.bud-back:hover{ color:var(--stroke); background:rgba(60,46,45,.06); }\n.bud-back:focus-visible{ outline:2px solid var(--coral); outline-offset:2px; }\n.bud-hint{ font-size:12px; color:var(--sage); margin:0 0 8px; }\n";
  var HTML = "<div class=\"bud\" id=\"bud\">\n  <button class=\"bud-launch\" id=\"budLaunch\" aria-label=\"Stel je vraag aan Bud\">\n    <span class=\"bud-star\" aria-hidden=\"true\">✦</span> Stel je vraag aan BUD\n  </button>\n\n  <div class=\"bud-panel\" id=\"budPanel\" role=\"dialog\" aria-label=\"Sterrenchefs chat\" aria-modal=\"false\">\n    <div class=\"bud-head\">\n      <div>\n        <h2>Sterrenchefs</h2>\n      </div>\n      <button class=\"bud-x\" id=\"budClose\" aria-label=\"Chat sluiten\">×</button>\n    </div>\n    <div class=\"bud-log\" id=\"budLog\" aria-live=\"polite\"></div>\n    <div class=\"bud-foot\" id=\"budFoot\"></div>\n  </div>\n</div>";
  function boot(){
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var holder = document.createElement('div'); holder.innerHTML = HTML;
    while (holder.firstChild) { document.body.appendChild(holder.firstChild); }
    
(function(){
  "use strict";

  /* ---------------------------------------------------------------
     CONFIG — pas dit aan zonder de rest aan te raken.
     --------------------------------------------------------------- */
  var BUD_CONFIG = {
    email: "hello@sterrenchefs.be",
    socials: "@sterrenchefs",
    aiEnabled: false,            // false = vrije vragen gaan via e-mail i.p.v. AI
    // Formspree-endpoint: aanvragen komen rechtstreeks in je mailbox, zonder
    // dat de bezoeker een mailvenster ziet. Maak een gratis form op formspree.io
    // en plak hier de endpoint, bv. "https://formspree.io/f/abcdwxyz".
    formspree: "",
    submit: function(payload){
      if(window.console) console.log("[Bud] aanvraag", payload);
      var endpoint = (window.BUD_FORMSPREE || BUD_CONFIG.formspree);
      if(!endpoint) return;                 // nog niet ingesteld → niets versturen
      var body = { _subject: "Sterrenchefs aanvraag — " + payload.type, Type: payload.type };
      Object.keys(payload.data).forEach(function(k){
        if(payload.data[k] !== undefined && payload.data[k] !== "") body[k] = payload.data[k];
      });
      if(payload.data["E-mail"]) body.email = payload.data["E-mail"];  // Formspree zet dit als antwoord-adres
      try{
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(body)
        }).catch(function(){});
      }catch(e){}
    }
  };

  /* ---------------------------------------------------------------
     DOM + kleine helpers
     --------------------------------------------------------------- */
  var root  = document.getElementById("bud");
  var panel = document.getElementById("budPanel");
  var log   = document.getElementById("budLog");
  var foot  = document.getElementById("budFoot");
  var data  = {};
  var run   = null;   // actieve flow-staat (voor de 'terug'-knop)

  function sleep(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
  function scrollDown(){ log.scrollTop = log.scrollHeight; }
  function clearFoot(){ foot.innerHTML = ""; }

  function pushMsg(text, who){
    var el = document.createElement("div");
    el.className = "bud-msg " + who;
    el.innerHTML = text;
    log.appendChild(el);
    scrollDown();
    requestAnimationFrame(function(){ el.classList.add("in"); });
    return el;
  }

  // Bot bericht (typ-animatie; instant tijdens 'terug'-replay)
  function bud(text){
    if(replaying()){ pushMsg(text, "bot"); return Promise.resolve(); }
    var t = document.createElement("div");
    t.className = "bud-typing";
    t.innerHTML = "<span></span><span></span><span></span>";
    log.appendChild(t); scrollDown();
    var delay = Math.min(900, 350 + text.replace(/<[^>]+>/g,"").length * 9);
    return sleep(delay).then(function(){ t.remove(); pushMsg(text, "bot"); return sleep(150); });
  }
  function me(text){ pushMsg(text, "user"); }

  /* ---------------------------------------------------------------
     Stap-engine met "terug". Elke ask onthoudt het antwoord in
     run.answers, zodat een flow opnieuw afgespeeld kan worden tot
     een vorige stap. Buiten een flow (run == null) zijn vragen
     eenmalig en zonder terug-knop (menu, "nog iets?", vrije vraag).
     --------------------------------------------------------------- */
  function replaying(){ return !!(run && run.asks < run.answers.length); }

  function startFlow(fn){ run = { answers:[], asks:0, fn:fn }; fn(); }

  function goBack(){
    if(!run) return;
    if(run.answers.length > 0) run.answers.length -= 1;
    log.innerHTML = ""; clearFoot();
    run.asks = 0;
    run.fn();
  }

  function addBack(){
    var b = document.createElement("button");
    b.type = "button"; b.className = "bud-back"; b.innerHTML = "← Terug";
    b.onclick = goBack;
    foot.appendChild(b);
  }

  // Render input, of speel een opgeslagen antwoord opnieuw af.
  function stepAsk(builder){
    if(run && run.asks < run.answers.length){
      var saved = run.answers[run.asks]; run.asks += 1;
      me(saved.label);
      return Promise.resolve(saved.value);
    }
    return new Promise(function(resolve){
      clearFoot();
      var canBack = !!(run && run.asks > 0);
      function commit(value, label){
        if(run){ run.answers[run.asks] = { value:value, label:label }; run.asks += 1; }
        me(label); clearFoot(); resolve(value);
      }
      builder(commit, canBack);
      scrollDown();
    });
  }

  function askChoice(options){               // options: [{label, value, style}]
    return stepAsk(function(commit, canBack){
      var wrap = document.createElement("div"); wrap.className = "bud-choices";
      options.forEach(function(o){
        var b = document.createElement("button");
        b.className = "bud-chip" + (o.style ? " " + o.style : "");
        b.textContent = o.label;
        b.onclick = function(){ commit(o.value !== undefined ? o.value : o.label, o.label); };
        wrap.appendChild(b);
      });
      foot.appendChild(wrap);
      if(canBack) addBack();
    });
  }

  function askText(opts){                     // {placeholder, multiline, optional, type}
    opts = opts || {};
    return stepAsk(function(commit, canBack){
      var form = document.createElement("form"); form.className = "bud-form";
      var field = document.createElement(opts.multiline ? "textarea" : "input");
      field.className = opts.multiline ? "bud-textarea" : "bud-input";
      if(!opts.multiline) field.type = opts.type || "text";
      if(opts.multiline) field.rows = 2;
      field.placeholder = opts.placeholder || "Typ hier…";
      var send = document.createElement("button");
      send.type = "submit"; send.className = "bud-send"; send.innerHTML = "→";
      send.setAttribute("aria-label","Versturen");
      form.appendChild(field); form.appendChild(send);
      form.onsubmit = function(e){
        e.preventDefault();
        var v = field.value.trim();
        if(!v) return;
        if(opts.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){ field.style.borderColor = "var(--fire)"; return; }
        commit(v, v);
      };
      foot.appendChild(form);
      if(opts.optional){
        var skip = document.createElement("button");
        skip.type = "button"; skip.className = "bud-skip"; skip.textContent = opts.optionalLabel || "Overslaan";
        skip.onclick = function(){ commit("", "—"); };
        foot.appendChild(skip);
      }
      if(canBack) addBack();
      field.focus();
    });
  }

  function askConsent(label){
    return askChoice([{ label: label || "Ja, ik geef toestemming", value:true, style:"solid" }]);
  }

  function askMulti(options, doneLabel){       // meervoudige keuze
    return stepAsk(function(commit, canBack){
      var picked = [];
      var wrap = document.createElement("div"); wrap.className = "bud-choices";
      options.forEach(function(o){
        var b = document.createElement("button");
        b.className = "bud-chip"; b.type = "button"; b.textContent = o;
        b.setAttribute("aria-pressed","false");
        b.onclick = function(){
          var i = picked.indexOf(o);
          if(i>-1){ picked.splice(i,1); b.setAttribute("aria-pressed","false"); }
          else { picked.push(o); b.setAttribute("aria-pressed","true"); }
          done.disabled = picked.length === 0;
        };
        wrap.appendChild(b);
      });
      var done = document.createElement("button");
      done.className = "bud-chip solid"; done.style.marginTop = "4px";
      done.textContent = doneLabel || "Klaar"; done.disabled = true;
      done.onclick = function(){ if(!picked.length) return; commit(picked.slice(), picked.join(", ")); };
      foot.appendChild(wrap); foot.appendChild(done);
      if(canBack) addBack();
    });
  }

  /* ---------------------------------------------------------------
     Vaste lijsten (uit de kennisbank)
     --------------------------------------------------------------- */
  var RELATIES = ["Ouder","Grootouder","Partner","Broer of zus","Familielid","Vriend(in)","Buur","Collega","Iemand anders"]
                 .map(function(x){return {label:x};});
  var TYPE_GERECHT = ["Ontbijt","Lunch","Voorgerecht","Soep","Tapas","Snack","Hoofdgerecht","Dessert","Drank"]
                 .map(function(x){return {label:x};});
  var PROVINCIES = ["West-Vlaanderen","Oost-Vlaanderen","Antwerpen","Limburg","Vlaams-Brabant","Brussel","Waals-Brabant","Henegouwen","Luik","Luxemburg"]
                 .map(function(x){return {label:x};});
  var TYPE_ZAAK = ["Restaurant","Café","Bistro","Brasserie","Traiteur","Bakkerij","Iets anders"]
                 .map(function(x){return {label:x};});
  var PAKKETTEN = ["Pakket 1","Pakket 2","Pakket 3","Pakket 4","Op maat gemaakt pakket","Nog niet zeker"]
                 .map(function(x){return {label:x};});
  var MEDIA = ["Krant","Magazine","TV","Radio","Online / blog","Podcast","Iets anders"]
                 .map(function(x){return {label:x};});
  var MEDIA_PH = {
    "Krant":"Bijvoorbeeld: Het Nieuwsblad",
    "Magazine":"Bijvoorbeeld: Libelle",
    "TV":"Bijvoorbeeld: Focus-WTV",
    "Radio":"Bijvoorbeeld: Radio 2",
    "Online / blog":"Bijvoorbeeld: BRUZZ",
    "Podcast":"Bijvoorbeeld: De Mutti's",
    "Iets anders":"Schrijf hier uw medium"
  };
  var COLLAB = ["Content","Collab","Sponsoring","Event","Product","Iets anders"]
                 .map(function(x){return {label:x};});
  var TRADITIE = ["Streekgerecht","Ambacht","Generaties-oude zaak","Specialiteit","Iets anders"]
                 .map(function(x){return {label:x};});

  function finish(type){
    var payload = { type:type, data:Object.assign({}, data) };
    run = null;                 // verzegel de flow: vanaf hier geen 'terug' meer
    BUD_CONFIG.submit(payload);
    data = {};
  }

  /* ---------------------------------------------------------------
     De flows
     --------------------------------------------------------------- */
  async function flowRecept(){
    data = {};
    await bud("Wat mooi dat je een dierbare met ons wil delen. ❤️");
    await bud("Om te beginnen, wat is de naam van je Sterrenchef?");
    data["Naam Sterrenchef"] = await askText({placeholder:"Bv. Dorine"});
    await bud("En wie was " + data["Naam Sterrenchef"] + " voor jou?");
    data["Relatie"] = await askChoice(RELATIES);
    await bud("Dankjewel. Welk gerecht van " + data["Naam Sterrenchef"] + " wil je delen?");
    data["Gerecht"] = await askText({placeholder:"Bv. pannenkoeken"});
    await bud("Heerlijk. Wat voor gerecht is het?");
    data["Type gerecht"] = await askChoice(TYPE_GERECHT);
    await bud("Top. Het recept en de foto's vragen we je zo dadelijk rustig per mail, dan kan je dat thuis rustig invullen en doorsturen.");
    await bud("Voor je gaat, mogen we nog even je toestemming? Mag Sterrenchefs persoonlijk contact met je opnemen om een profiel voor " + data["Naam Sterrenchef"] + " aan te maken op de website?");
    data["Toestemming"] = (await askConsent()) ? "Ja" : "Nee";
    await bud("Dankjewel! Wat is uw naam?");
    data["Naam indiener"] = await askText({placeholder:"Naam & Voornaam"});
    await bud("Op welk e-mailadres en telefoonnummer mogen we je bereiken?");
    data["E-mail"] = await askText({placeholder:"Uw emailadres", type:"email"});
    data["Telefoon"] = await askText({placeholder:"uw telefoonnummer", type:"tel", optional:true});
    var chefNaam = data["Naam Sterrenchef"];
    finish("Sterrenchef / recept");
    await bud("Het recept van " + chefNaam + " hoef je hier niet uit te typen. U krijgt zodadelijk een e-mail van Sterrenchefs (kijk ook zeker uw spamfolder na) waarin u alles rustig kan invullen en doorsturen wanneer u er klaar voor bent. Ondertussen gaan wij bij Sterrenchefs achter de schermen al aan de slag met het profiel van " + chefNaam + ", en zodra wij uw e-mail ontvangen nemen wij zo spoedig mogelijk persoonlijk contact met u op.");
    await again("Kunnen we op dit moment u nog ergens mee helpen?");
  }

  async function flowHoreca(){
    data = {};
    await bud("Leuk dat je uw horecazaak aan ons wil voorstellen! 🏠");
    await bud("Wat is de naam van uw zaak?");
    data["Naam zaak"] = await askText({placeholder:"Naam van uw zaak"});
    await bud("In welke provincie ligt " + data["Naam zaak"] + "?");
    data["Provincie"] = await askChoice(PROVINCIES);
    await bud("Wat voor zaak is het?");
    data["Type zaak"] = await askChoice(TYPE_ZAAK);
    await bud("Wat is uw naam?");
    data["Contactpersoon"] = await askText({placeholder:"uw naam & voornaam"});
    await bud("Op welk e-mailadres en telefoonnummer mogen we je bereiken?");
    data["E-mail"] = await askText({placeholder:"Uw emailadres", type:"email"});
    data["Telefoon"] = await askText({placeholder:"uw telefoonnummer", type:"tel", optional:true});
    var naamZaak = data["Naam zaak"];
    finish("Horecazaak aanmelden");
    await bud("Ons team neemt binnenkort persoonlijk contact met jullie op om het verhaal van " + naamZaak + " te publiceren en de mogelijkheden samen te bespreken.");
    await bud("Hartelijk dank en tot snel! ❤️");
    await again("Kunnen we u nog ergens mee helpen?");
  }

  async function flowPers(){
    data = {};
    await bud("Fijn dat je Sterrenchefs in de kijker wil zetten! 📰 Voor welk soort medium wilt u de persmap aanvragen?");
    data["Medium"] = await askChoice(MEDIA);
    await bud("Voor welk bedrijf?");
    data["Medium / titel"] = await askText({placeholder: MEDIA_PH[data["Medium"]] || "Naam van het medium"});
    await bud("Wat zou je graag ontvangen? Je mag zeker meerdere zaken aanduiden.");
    data["Gewenst materiaal"] = (await askMulti(["Beeldmateriaal","Interview","Cijfers / info","Quote","Logo's","Iets anders"], "Klaar")).join(", ");
    await bud("Top! Mogen wij uw naam & voornaam?");
    data["Naam"] = await askText({placeholder:"Uw naam & voornaam"});
    await bud("Op welk e-mailadres mogen wij u bereiken?");
    data["E-mail"] = await askText({placeholder:"Uw emailadres", type:"email"});
    finish("Persmap aanvraag");
    await bud("Succesvol verstuurd! Wij bezorgen u zo snel mogelijk alle benodigdheden. Hartelijk dank! ❤️");
    await again();
  }

  async function flowCollab(){
    data = {};
    await bud("Leuk dat u graag met Sterrenchefs wil samenwerken! 🤝 Wat voor samenwerking heeft u voor ogen?");
    data["Type samenwerking"] = await askChoice(COLLAB);
    await bud("Vertel even in het kort uw idee:");
    data["Idee"] = await askText({placeholder:"Beschrijf uw ideale samenwerking", multiline:true});
    await bud("Wat is uw naam en voornaam?");
    data["Naam"] = await askText({placeholder:"Uw naam & voornaam"});
    await bud("Wat is de naam van uw bedrijf of organisatie?");
    data["Organisatie"] = await askText({placeholder:"Bijvoorbeeld: Lotus Bakeries"});
    await bud("Op welk e-mailadres mogen wij u bereiken?");
    data["E-mail"] = await askText({placeholder:"Uw emailadres", type:"email"});
    finish("Samenwerking");
    await bud("Top, bedankt! 🙌 Wij bezorgen het voorstel aan het team van Sterrenchefs en nemen zo spoedig mogelijk contact met jullie op!");
    await again();
  }

  async function flowAdres(){
    data = {};
    await bud("Wat leuk dat je een interessant adres wil delen met ons! 🌍 Wat is de naam van de zaak?");
    data["Naam zaak"] = await askText({placeholder:"Naam van de zaak"});
    await bud("Waar is deze zaak gevestigd? Geef het adres, stad/gemeente en het land mee (mag ook in België zijn).");
    data["Locatie"] = await askText({placeholder:"Bijvoorbeeld: Cielito Lindo in Los Angeles"});
    await bud("Wat maakt deze zaak zo bijzonder?");
    data["Soort"] = await askChoice(TRADITIE);
    await bud("Beschrijf in het kort wat we daar zeker moeten proeven?");
    data["Waarom"] = await askText({placeholder:"Bijvoorbeeld: \"Heerlijke taquitos die nog steeds met de hand worden gerold sinds 1934\"", multiline:true});
    var naamZaak = data["Naam zaak"];
    finish("Culinair adres / tip");
    await bud("Bedankt voor de tip! 🙏 We noteren " + naamZaak + "!");
    await again();
  }

  // Algemene vraag — AI uitgeschakeld: korte FAQ-knoppen + e-mail-terugval
  var FAQ = {
    "Wat is een Sterrenchef?": "De beste kok of kokkin die jij ooit gekend hebt, een diploma is niet nodig. Het is iemand die herinnerd wordt door wat hij of zij op tafel bracht. 🌟",
    "Hoe dien ik iemand in?": "Heel eenvoudig: kies in het menu 'Een Sterrenchef indienen'. Ik vraag je dan een paar zaken en daarna halen we het recept en de foto's rustig op via mail.",
    "Is het gratis?": "Een Sterrenchef / recept indienen is volledig gratis. ❤️ Enkel voor horecazaken werken we met pakketten."
  };
  async function flowVraag(){
    await bud("Natuurlijk, stel gerust je vraag. Je kan ook meteen een van deze populaire vragen kiezen:");
    var keys = Object.keys(FAQ).map(function(k){return {label:k};});
    keys.push({label:"Iets anders vragen", value:"__other__", style:"ghost"});
    var pick = await askChoice(keys);
    if(pick === "__other__"){
      await bud("Geen probleem, typ gerust je vraag.");
      data = { Vraag: await askText({placeholder:"Je vraag", multiline:true}) };
      await bud("Op welk e-mailadres mogen we je het antwoord bezorgen?");
      data["E-mail"] = await askText({placeholder:"jij@voorbeeld.be", type:"email"});
      finish("Algemene vraag");
      await bud("Bedankt! Ik geef je vraag door en iemand van het team bezorgt je zo snel mogelijk een antwoord via mail. ❤️");
    } else {
      await bud(FAQ[pick]);
    }
    await again();
  }

  /* ---------------------------------------------------------------
     Menu / routing
     --------------------------------------------------------------- */
  var MENU = [
    {label:"🍲 Een Sterrenchef indienen", run:flowRecept},
    {label:"🏠 Je horecazaak aanmelden",  run:flowHoreca},
    {label:"📰 Een persmap aanvragen",    run:flowPers},
    {label:"🤝 Een samenwerking voorstellen", run:flowCollab},
    {label:"🌍 Een culinair adres doorgeven", run:flowAdres},
    {label:"💬 Een algemene vraag stellen",   run:flowVraag}
  ];

  async function showMenu(greeted){
    if(!greeted) await bud("Welkom bij Sterrenchefs 🌟 Waarmee kan ik je vandaag helpen?");
    var choice = await askChoice(MENU.map(function(m,i){return {label:m.label, value:i};}));
    startFlow(MENU[choice].run);
  }

  async function again(prompt){
    await bud(prompt || "Kan ik je nog ergens mee helpen?");
    var pick = await askChoice([
      {label:"Ja, terug naar het menu", value:"menu", style:"solid"},
      {label:"Nee, bedankt", value:"no", style:"ghost"}
    ]);
    if(pick === "menu") await showMenu(false);
    else { await bud("Graag gedaan, tot een volgende keer! ❤️ Je kan ons ook altijd mailen op " + BUD_CONFIG.email + "."); clearFoot(); }
  }

  /* ---------------------------------------------------------------
     Open / sluit
     --------------------------------------------------------------- */
  var started = false;
  function open(){
    root.classList.add("is-open");
    panel.querySelector(".bud-x").focus();
    if(!started){ started = true; showMenu(false); }
  }
  function close(){ root.classList.remove("is-open"); document.getElementById("budLaunch").focus(); }

  document.getElementById("budLaunch").addEventListener("click", open);
  document.getElementById("budClose").addEventListener("click", close);
  document.addEventListener("keydown", function(e){ if(e.key === "Escape" && root.classList.contains("is-open")) close(); });
})();

  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
})();
