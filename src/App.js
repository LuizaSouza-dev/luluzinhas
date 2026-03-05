import { useState } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --rose: #D4456A; --rose-light: #F7C5D2; --rose-pale: #FDF0F3;
    --coral: #E8816A; --sand: #F5ECD7; --olive: #7A8C5E;
    --text: #2C1A1A; --text-soft: #7A5C5C; --white: #FFFAF9;
    --radius: 20px; --shadow: 0 4px 24px rgba(212,69,106,0.10);
  }
  body { font-family:'Nunito',sans-serif; background:var(--rose-pale); color:var(--text); min-height:100vh; max-width:430px; margin:0 auto; }
  .app-shell { min-height:100vh; display:flex; flex-direction:column; background:var(--white); }
  .header { background:linear-gradient(135deg,var(--rose) 0%,#B03060 100%); padding:20px 20px 28px; position:relative; overflow:hidden; }
  .header::before { content:''; position:absolute; top:-30px; right:-30px; width:120px; height:120px; border-radius:50%; background:rgba(255,255,255,0.08); }
  .header-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
  .app-title { font-family:'Playfair Display',serif; font-size:18px; color:white; font-weight:700; }
  .app-subtitle { font-size:11px; color:rgba(255,255,255,0.7); font-weight:600; letter-spacing:1px; text-transform:uppercase; }
  .user-avatar-small { width:36px; height:36px; border-radius:50%; border:2px solid rgba(255,255,255,0.5); background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:14px; color:white; font-weight:700; cursor:pointer; }
  .trocar-user-btn { display:flex; align-items:center; gap:6px; background:rgba(255,255,255,0.18); border:1.5px solid rgba(255,255,255,0.35); border-radius:50px; padding:5px 12px 5px 6px; cursor:pointer; }
  .trocar-user-info { display:flex; flex-direction:column; align-items:flex-start; }
  .trocar-user-nome { font-size:12px; font-weight:800; color:white; line-height:1; }
  .trocar-user-hint { font-size:10px; color:rgba(255,255,255,0.7); line-height:1; margin-top:1px; }
  .bottom-nav { position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:white; display:flex; border-top:1px solid #F0E0E5; padding:8px 0 12px; z-index:100; box-shadow:0 -4px 20px rgba(212,69,106,0.08); }
  .nav-item { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; cursor:pointer; padding:4px 0; background:none; border:none; }
  .nav-icon { font-size:22px; line-height:1; }
  .nav-label { font-size:10px; font-weight:700; color:#C0A0A8; }
  .nav-item.active .nav-label { color:var(--rose); }
  .nav-item.active .nav-icon { transform:scale(1.15); }
  .content { flex:1; padding:16px 16px 90px; overflow-y:auto; }
  .card { background:white; border-radius:var(--radius); padding:16px; margin-bottom:14px; box-shadow:var(--shadow); border:1px solid rgba(212,69,106,0.07); }
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:10px 20px; border-radius:50px; font-family:'Nunito',sans-serif; font-weight:800; font-size:13px; cursor:pointer; border:none; transition:all 0.2s; }
  .btn-primary { background:linear-gradient(135deg,var(--rose),#B03060); color:white; box-shadow:0 4px 14px rgba(212,69,106,0.35); }
  .btn-full { width:100%; } .btn-sm { padding:7px 14px; font-size:12px; }
  .avatar { border-radius:50%; background:var(--rose-light); display:flex; align-items:center; justify-content:center; font-weight:800; color:var(--rose); flex-shrink:0; }
  .avatar-lg { width:72px; height:72px; font-size:26px; }
  .avatar-md { width:44px; height:44px; font-size:16px; }
  .avatar-sm { width:34px; height:34px; font-size:12px; }
  .section-label { font-size:11px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:var(--text-soft); margin-bottom:10px; margin-top:6px; }
  .birthday-hero { background:linear-gradient(135deg,#FFF0F4,#FFE4ED); border-radius:var(--radius); padding:20px; margin-bottom:14px; border:1px solid var(--rose-light); position:relative; overflow:hidden; }
  .birthday-hero::after { content:'🎂'; position:absolute; right:16px; top:50%; transform:translateY(-50%); font-size:48px; opacity:0.2; }
  .hero-tag { font-size:10px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:var(--rose); margin-bottom:8px; }
  .hero-name { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:var(--text); line-height:1.1; margin-bottom:4px; }
  .hero-date { font-size:13px; color:var(--text-soft); font-weight:600; }
  .countdown { display:flex; gap:8px; margin-top:12px; }
  .count-box { background:white; border-radius:12px; padding:8px 12px; text-align:center; box-shadow:0 2px 8px rgba(212,69,106,0.12); min-width:52px; }
  .count-num { font-size:22px; font-weight:800; color:var(--rose); line-height:1; }
  .count-unit { font-size:9px; font-weight:700; color:var(--text-soft); letter-spacing:0.5px; text-transform:uppercase; }
  .alert-pending { background:linear-gradient(135deg,#FFF8E7,#FFF0D0); border:1px solid #F5D78A; border-radius:var(--radius); padding:14px 16px; margin-bottom:14px; display:flex; align-items:center; gap:12px; }
  .alert-title { font-weight:800; font-size:13px; color:#7A5000; }
  .alert-sub { font-size:12px; color:#A07030; margin-top:2px; }
  .activity-item { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #F5EAED; }
  .activity-item:last-child { border-bottom:none; }
  .activity-text { flex:1; font-size:13px; color:var(--text-soft); line-height:1.4; }
  .activity-text strong { color:var(--text); font-weight:700; }
  .activity-time { font-size:11px; color:#C0A0A8; font-weight:600; }
  .bday-profile { display:flex; align-items:flex-start; gap:14px; margin-bottom:16px; }
  .bday-name { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--text); margin-bottom:2px; }
  .bday-date-tag { font-size:13px; color:var(--text-soft); font-weight:600; }
  .wish-item { background:var(--rose-pale); border-radius:14px; padding:12px 14px; margin-bottom:8px; }
  .wish-text { font-size:14px; color:var(--text); line-height:1.5; }
  .wish-link { display:inline-flex; align-items:center; gap:4px; font-size:12px; font-weight:700; color:var(--rose); text-decoration:none; margin-top:6px; }
  .location-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:var(--sand); border-radius:12px; margin-bottom:8px; }
  .location-name { font-size:14px; font-weight:700; color:var(--text); }
  .location-sub { font-size:12px; color:var(--text-soft); }
  .pix-box { background:linear-gradient(135deg,#F0FFF4,#E8F8EE); border:1.5px solid #B8E6C4; border-radius:var(--radius); padding:16px; margin-bottom:14px; }
  .pix-label { font-size:11px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:var(--olive); margin-bottom:6px; }
  .pix-name { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--text); margin-bottom:2px; }
  .pix-key { font-size:13px; color:var(--text-soft); font-weight:600; display:flex; align-items:center; gap:8px; margin-top:8px; }
  .copy-btn { background:var(--olive); color:white; border:none; border-radius:8px; padding:4px 10px; font-size:11px; font-weight:800; cursor:pointer; font-family:'Nunito',sans-serif; }
  .payment-row { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #F5EAED; }
  .payment-row:last-child { border-bottom:none; }
  .payment-name { flex:1; font-size:14px; font-weight:700; color:var(--text); }
  .payment-confirm { font-size:11px; font-weight:800; color:var(--text-soft); background:#F5EAED; border:none; border-radius:8px; padding:4px 10px; cursor:pointer; font-family:'Nunito',sans-serif; }
  .valor-box { display:flex; justify-content:space-between; align-items:center; background:var(--rose-pale); border-radius:14px; padding:14px 16px; margin-bottom:14px; }
  .valor-label { font-size:12px; font-weight:700; color:var(--text-soft); }
  .valor-num { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--rose); }
  .valor-sub { font-size:11px; color:var(--text-soft); }
  .msg-bubble { max-width:78%; padding:10px 14px; border-radius:18px; font-size:13px; line-height:1.5; margin-bottom:10px; }
  .msg-bubble.mine { background:linear-gradient(135deg,var(--rose),#B03060); color:white; margin-left:auto; border-bottom-right-radius:6px; }
  .msg-bubble.other { background:#F5EAED; color:var(--text); border-bottom-left-radius:6px; }
  .msg-sender { font-size:10px; font-weight:800; color:var(--rose); margin-bottom:2px; }
  .msg-time { font-size:10px; opacity:0.6; margin-top:2px; text-align:right; }
  .msg-with-avatar { display:flex; gap:8px; align-items:flex-end; margin-bottom:4px; }
  .chat-input-area { position:fixed; bottom:72px; left:50%; transform:translateX(-50%); width:100%; max-width:430px; padding:10px 16px; background:white; border-top:1px solid #F0E0E5; display:flex; gap:8px; z-index:99; }
  .chat-input { flex:1; padding:10px 16px; border-radius:50px; border:1.5px solid var(--rose-light); font-family:'Nunito',sans-serif; font-size:14px; outline:none; background:var(--rose-pale); color:var(--text); }
  .send-btn { width:42px; height:42px; border-radius:50%; background:linear-gradient(135deg,var(--rose),#B03060); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:18px; }
  .form-group { margin-bottom:14px; }
  .form-label { font-size:12px; font-weight:800; color:var(--text-soft); letter-spacing:0.5px; text-transform:uppercase; margin-bottom:6px; display:block; }
  .form-input,.form-textarea { width:100%; padding:12px 14px; border-radius:14px; border:1.5px solid var(--rose-light); font-family:'Nunito',sans-serif; font-size:14px; outline:none; background:var(--rose-pale); color:var(--text); }
  .form-textarea { resize:none; min-height:80px; }
  .who-screen { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:32px 24px; background:linear-gradient(160deg,#FDF0F3 0%,#FFF8E7 100%); }
  .who-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; color:var(--rose); text-align:center; margin-bottom:8px; }
  .who-sub { font-size:14px; color:var(--text-soft); text-align:center; margin-bottom:32px; }
  .who-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; width:100%; }
  .who-item { background:white; border-radius:var(--radius); padding:16px 12px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; border:2px solid transparent; box-shadow:0 2px 10px rgba(212,69,106,0.08); transition:all 0.2s; }
  .who-name { font-size:14px; font-weight:800; color:var(--text); text-align:center; }
  .chat-messages { padding-bottom:130px; }
  .locked-screen { text-align:center; padding:40px 20px; }
  .locked-icon { font-size:56px; margin-bottom:16px; }
  .locked-title { font-family:'Playfair Display',serif; font-size:22px; color:var(--rose); margin-bottom:8px; }
  .locked-text { font-size:14px; color:var(--text-soft); line-height:1.6; }
  .pill-tabs { display:flex; gap:8px; margin-bottom:16px; overflow-x:auto; padding-bottom:4px; }
  .pill-tab { padding:7px 16px; border-radius:50px; font-size:12px; font-weight:800; cursor:pointer; border:none; white-space:nowrap; font-family:'Nunito',sans-serif; }
  .pill-tab.active { background:var(--rose); color:white; }
  .pill-tab:not(.active) { background:var(--rose-pale); color:var(--rose); }
  .progress-bar-wrap { background:#F5EAED; border-radius:50px; height:8px; margin:8px 0; overflow:hidden; }
  .progress-bar-fill { height:100%; border-radius:50px; background:linear-gradient(90deg,var(--rose),var(--coral)); transition:width 0.5s; }
`;
const AMIGAS = [
  { id: 1, nome: "Luiza", emoji: "🌺", aniversario: "12/08", pix: "luiza@email.com" },
  { id: 2, nome: "Carol", emoji: "🐚", aniversario: "14/03", pix: "carol@email.com" },
  { id: 3, nome: "Ana", emoji: "🌊", aniversario: "22/05", pix: "ana@pix.com" },
  { id: 4, nome: "Bete", emoji: "🐾", aniversario: "03/03", pix: "bete@email.com" },
  { id: 5, nome: "Dani", emoji: "🦋", aniversario: "17/07", pix: "dani@email.com" },
  { id: 6, nome: "Fabi", emoji: "🌸", aniversario: "29/09", pix: "fabi@email.com" },
  { id: 7, nome: "Gi", emoji: "🐠", aniversario: "11/06", pix: "gi@email.com" },
  { id: 8, nome: "Lena", emoji: "🌻", aniversario: "08/11", pix: "lena@email.com" },
  { id: 9, nome: "Mara", emoji: "🦜", aniversario: "25/03", pix: "mara@email.com" },
  { id: 10, nome: "Tati", emoji: "🐬", aniversario: "30/12", pix: "tati@email.com" },
];

const EVENTOS = [
  {
    id: "ev1", aniversariante: "Bete", data: "03/03", mes: "Março 2026",
    tesoureira: "Carol", valorTotal: 180,
    desejos: [
      { texto: "Camiseta de praia tamanho M — qualquer cor clara 🌊", link: "" },
      { texto: "Livro: A Sutil Arte de Ligar o F*da-se", link: "https://amazon.com.br" },
    ],
    locais: [
      { nome: "Restaurante Coco Bambu", detalhe: "Boa Viagem — tem varanda!", votos: 4 },
      { nome: "Casa da Luiza", detalhe: "Churrasquinho na piscina 🍖", votos: 5 },
      { nome: "Quintal da Praia", detalhe: "Piedade, pé na areia", votos: 2 },
    ],
    dataSugerida: "Sábado, 08 de março",
    pagamentos: [
      { amiga: "Luiza", pago: true }, { amiga: "Carol", pago: true },
      { amiga: "Ana", pago: true }, { amiga: "Dani", pago: false },
      { amiga: "Fabi", pago: true }, { amiga: "Gi", pago: false },
      { amiga: "Lena", pago: true }, { amiga: "Mara", pago: true },
      { amiga: "Tati", pago: false },
    ],
    mensagem: "Vocês são o melhor presente que a vida me deu 🥹",
  },
  {
    id: "ev2", aniversariante: "Mara", data: "25/03", mes: "Março 2026",
    tesoureira: null, valorTotal: 150,
    desejos: [{ texto: "Me levem para um almoço surpresa! 🎉", link: "" }],
    locais: [], dataSugerida: "",
    pagamentos: [
      { amiga: "Luiza", pago: false }, { amiga: "Carol", pago: false },
      { amiga: "Ana", pago: false }, { amiga: "Bete", pago: false },
      { amiga: "Dani", pago: false }, { amiga: "Fabi", pago: false },
      { amiga: "Gi", pago: false }, { amiga: "Lena", pago: false },
      { amiga: "Tati", pago: false },
    ],
    mensagem: "",
  },
];

const MSGS_INICIAIS = [
  { id: 1, evento: "ev1", autora: "Fabi", texto: "Gente, já comprei o presente da Bete! 🎁", hora: "10:32" },
  { id: 2, evento: "ev1", autora: "Ana", texto: "Arrasou! Quanto ficou no total?", hora: "10:35" },
  { id: 3, evento: "ev1", autora: "Carol", texto: "R$ 180 dividido por 9 = R$ 20 cada uma. Manda o pix pra mim!", hora: "10:37" },
  { id: 4, evento: "ev1", autora: "Gi", texto: "Já transferi! 💸", hora: "11:02" },
  { id: 5, evento: "ev1", autora: "Lena", texto: "Votei na casa da Luiza, churras on!! 🔥", hora: "11:15" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [eventos, setEventos] = useState(EVENTOS);
  const [msgs, setMsgs] = useState(MSGS_INICIAIS);
  const [eventoAtivo, setEventoAtivo] = useState("ev1");
  const [msgInput, setMsgInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [desejoEdit, setDesejoEdit] = useState({ texto: "", link: "" });
  const [savedDesejo, setSavedDesejo] = useState(false);

  const eu = AMIGAS.find(a => a.nome === user);
  const evento = eventos.find(e => e.id === eventoAtivo);
  const isAniversariante = evento && evento.aniversariante === user;
  const isTesoureira = evento && evento.tesoureira === user;
  const valorPorPessoa = evento ? Math.ceil(evento.valorTotal / 9) : 0;
  const pagosMes = evento ? evento.pagamentos.filter(p => p.pago).length : 0;

  function sendMsg() {
    if (!msgInput.trim()) return;
    setMsgs(prev => [...prev, {
      id: Date.now(), evento: eventoAtivo, autora: user, texto: msgInput.trim(),
      hora: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }]);
    setMsgInput("");
  }

  function togglePago(amiga) {
    setEventos(prev => prev.map(e => e.id === eventoAtivo ? {
      ...e, pagamentos: e.pagamentos.map(p => p.amiga === amiga ? { ...p, pago: !p.pago } : p)
    } : e));
  }

  function candidatarTesoureira() {
    setEventos(prev => prev.map(e => e.id === eventoAtivo ? { ...e, tesoureira: user } : e));
  }

  function copyPix() {
    const tesoureira = AMIGAS.find(a => a.nome === evento?.tesoureira);
    if (tesoureira) {
      navigator.clipboard?.writeText(tesoureira.pix).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (!user) return <WhoSelector onSelect={setUser} />;

  return (
    <>
      <style>{STYLE}</style>
      <div className="app-shell">
        <header className="header">
          <div className="header-top">
            <div>
              <div className="app-title">Niver das Luluzinhas 🎀</div>
              <div className="app-subtitle">Março 2026</div>
            </div>
            <div className="trocar-user-btn" onClick={() => setUser(null)}>
              <div className="user-avatar-small">{eu?.emoji}</div>
              <div className="trocar-user-info">
                <span className="trocar-user-nome">{user}</span>
                <span className="trocar-user-hint">trocar ↩</span>
              </div>
            </div>
          </div>
        </header>
        <main className="content">
          {tab === "home" && <HomeTab user={user} evento={evento} eventos={eventos} eventoAtivo={eventoAtivo} setEventoAtivo={setEventoAtivo} setTab={setTab} valorPorPessoa={valorPorPessoa} pagosMes={pagosMes} />}
          {tab === "aniversariante" && <AniversarianteTab evento={evento} user={user} isAniversariante={isAniversariante} eventos={eventos} eventoAtivo={eventoAtivo} setEventoAtivo={setEventoAtivo} />}
          {tab === "desejos" && <DesejoTab evento={evento} user={user} desejoEdit={desejoEdit} setDesejoEdit={setDesejoEdit} savedDesejo={savedDesejo} setSavedDesejo={setSavedDesejo} />}
          {tab === "pagamentos" && <PagamentosTab evento={evento} user={user} isAniversariante={isAniversariante} isTesoureira={isTesoureira} valorPorPessoa={valorPorPessoa} pagosMes={pagosMes} togglePago={togglePago} copyPix={copyPix} copied={copied} candidatarTesoureira={candidatarTesoureira} />}
          {tab === "chat" && <ChatTab msgs={msgs.filter(m => m.evento === eventoAtivo)} user={user} isAniversariante={isAniversariante} msgInput={msgInput} setMsgInput={setMsgInput} sendMsg={sendMsg} eventos={eventos} eventoAtivo={eventoAtivo} setEventoAtivo={setEventoAtivo} />}
        </main>
        <nav className="bottom-nav">
          {[
            { id: "home", icon: "🏠", label: "Início" },
            { id: "aniversariante", icon: "🎂", label: "Niver" },
            { id: "desejos", icon: "🎁", label: "Desejos" },
            { id: "pagamentos", icon: "💰", label: "Pague" },
            { id: "chat", icon: "💬", label: "Chat" },
          ].map(n => (
            <button key={n.id} className={`nav-item${tab === n.id ? " active" : ""}`} onClick={() => setTab(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
  function WhoSelector({ onSelect }) {
  const [fotos, setFotos] = useState({});
  function handleFoto(nome, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFotos(prev => ({ ...prev, [nome]: url }));
  }
  return (
    <>
      <style>{STYLE}</style>
      <div className="who-screen">
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎀</div>
        <div className="who-title">Niver das Luluzinhas</div>
        <div className="who-sub">Quem é você, linda?<br/><span style={{ fontSize: 12, color: "#C0A0A8" }}>Toque no seu nome para entrar · toque na foto para trocar</span></div>
        <div className="who-grid">
          {AMIGAS.map(a => (
            <div key={a.id} className="who-item">
              <div style={{ position: "relative" }}>
                <div className="avatar avatar-lg" style={fotos[a.nome] ? { backgroundImage: `url(${fotos[a.nome]})`, backgroundSize: "cover", fontSize: 0 } : {}} onClick={() => document.getElementById(`foto-${a.id}`).click()}>
                  {!fotos[a.nome] && a.emoji}
                </div>
                <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--rose)", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, cursor: "pointer", border: "2px solid white" }} onClick={() => document.getElementById(`foto-${a.id}`).click()}>📷</div>
                <input id={`foto-${a.id}`} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFoto(a.nome, e)} />
              </div>
              <span className="who-name" onClick={() => onSelect(a.nome)}>{a.nome}</span>
              <button className="btn btn-primary btn-sm" style={{ width: "100%", padding: "6px 0", fontSize: 12 }} onClick={() => onSelect(a.nome)}>Entrar</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function HomeTab({ user, evento, eventos, eventoAtivo, setEventoAtivo, setTab, valorPorPessoa, pagosMes }) {
  const meuPagamento = evento?.pagamentos.find(p => p.amiga === user);
  const isAniversariante = evento?.aniversariante === user;
  return (
    <div>
      <p className="section-label">Em destaque</p>
      {eventos.map(ev => (
        <div key={ev.id} className="birthday-hero" style={{ cursor: "pointer" }} onClick={() => { setEventoAtivo(ev.id); setTab("aniversariante"); }}>
          <div className="hero-tag">🎉 Aniversário de Março</div>
          <div className="hero-name">{ev.aniversariante}</div>
          <div className="hero-date">📅 {ev.data} · {ev.dataSugerida || "Data a definir"}</div>
          <div className="countdown">
            <div className="count-box"><div className="count-num">5</div><div className="count-unit">dias</div></div>
            <div className="count-box"><div className="count-num">12</div><div className="count-unit">horas</div></div>
          </div>
        </div>
      ))}
      {meuPagamento && !meuPagamento.pago && !isAniversariante && (
        <div className="alert-pending">
          <span style={{ fontSize: 24 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div className="alert-title">Você tem pagamento pendente</div>
            <div className="alert-sub">R$ {valorPorPessoa} para o presente da {evento?.aniversariante}</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setTab("pagamentos")}>Pagar</button>
        </div>
      )}
      <p className="section-label" style={{ marginTop: 8 }}>Atividades recentes</p>
      <div className="card">
        {[
          { emoji: "✅", texto: <><strong>Ana</strong> confirmou pagamento do presente da Bete</>, hora: "há 2h" },
          { emoji: "🎁", texto: <><strong>Bete</strong> atualizou sua lista de desejos</>, hora: "há 5h" },
          { emoji: "🗳️", texto: <><strong>Lena</strong> votou em local para o encontro</>, hora: "ontem" },
          { emoji: "💬", texto: <><strong>Carol</strong> enviou mensagem no chat</>, hora: "ontem" },
        ].map((a, i) => (
          <div key={i} className="activity-item">
            <span style={{ fontSize: 20 }}>{a.emoji}</span>
            <div className="activity-text">{a.texto}</div>
            <div className="activity-time">{a.hora}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AniversarianteTab({ evento, user, eventos, eventoAtivo, setEventoAtivo }) {
  if (!evento) return null;
  const amiga = AMIGAS.find(a => a.nome === evento.aniversariante);
  const isProprioAniversario = evento.aniversariante === user;
  const pagosMes = evento.pagamentos.filter(p => p.pago).length;
  return (
    <div>
      {eventos.length > 1 && (
        <div className="pill-tabs">
          {eventos.map(ev => (
            <button key={ev.id} className={`pill-tab${eventoAtivo === ev.id ? " active" : ""}`} onClick={() => setEventoAtivo(ev.id)}>🎂 {ev.aniversariante}</button>
          ))}
        </div>
      )}
      <div className="card">
        <div className="bday-profile">
          <div className="avatar avatar-lg">{amiga?.emoji}</div>
          <div style={{ flex: 1 }}>
            <div className="bday-name">{evento.aniversariante}</div>
            <div className="bday-date-tag">🎂 {evento.data}</div>
            {evento.dataSugerida && <div className="bday-date-tag" style={{ marginTop: 4 }}>📅 {evento.dataSugerida}</div>}
            {evento.mensagem && <div style={{ fontSize: 13, color: "#A06080", marginTop: 8, fontStyle: "italic" }}>"{evento.mensagem}"</div>}
          </div>
        </div>
        {!isProprioAniversario && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", background: "#F0FFF4", borderRadius: 12 }}>
            <span style={{ fontSize: 16 }}>✅</span>
            <span style={{ fontSize: 13, color: "#3A7A50", fontWeight: 700 }}>{pagosMes} de {evento.pagamentos.length} já pagaram o presente</span>
          </div>
        )}
      </div>
      <p className="section-label">O que ela quer ganhar 🎁</p>
      {evento.desejos.length > 0 ? evento.desejos.map((d, i) => (
        <div key={i} className="wish-item">
          <div className="wish-text">{d.texto}</div>
          {d.link && <a className="wish-link" href={d.link} target="_blank" rel="noreferrer">🔗 Ver produto</a>}
        </div>
      )) : <div className="card" style={{ textAlign: "center", color: "var(--text-soft)", fontSize: 14 }}>Ainda não registrou desejos 🥲</div>}
      {evento.locais.length > 0 && (
        <>
          <p className="section-label">Sugestões de local 📍</p>
          {evento.locais.map((loc, i) => (
            <div key={i} className="location-item">
              <span style={{ fontSize: 20 }}>📍</span>
              <div>
                <div className="location-name">{loc.nome}</div>
                <div className="location-sub">{loc.detalhe}</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--rose)" }}>{loc.votos} votos</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function DesejoTab({ evento, user, desejoEdit, setDesejoEdit, savedDesejo, setSavedDesejo }) {
  const isAniversariante = evento?.aniversariante === user;
  if (!isAniversariante) return (
    <div className="locked-screen">
      <div className="locked-icon">🎁</div>
      <div className="locked-title">Essa aba é sua quando chegar sua vez!</div>
      <div className="locked-text">Quando for o seu mês, você poderá registrar aqui tudo que deseja ganhar, sugerir locais e muito mais. 🥳</div>
    </div>
  );
  function salvar() { setSavedDesejo(true); setTimeout(() => setSavedDesejo(false), 2500); }
  return (
    <div>
      <div className="card" style={{ background: "linear-gradient(135deg,#FFF0F4,#FFE4ED)", border: "1px solid var(--rose-light)" }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>🎉</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "var(--rose)", marginBottom: 4 }}>É o seu mês, {user}!</div>
        <div style={{ fontSize: 13, color: "var(--text-soft)" }}>Conta pra gente o que você quer ganhar 💕</div>
      </div>
      <div className="card">
        <div className="form-group">
          <label className="form-label">O que você quer ganhar?</label>
          <textarea className="form-textarea" placeholder="Ex: perfume, roupa de praia... pode sonhar!" value={desejoEdit.texto} onChange={e => setDesejoEdit(p => ({ ...p, texto: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">Link do produto (opcional)</label>
          <input className="form-input" placeholder="https://..." value={desejoEdit.link} onChange={e => setDesejoEdit(p => ({ ...p, link: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">Sugestão de local para comemorar</label>
          <input className="form-input" placeholder="Ex: Restaurante X, minha casa, praia..." />
        </div>
        <div className="form-group">
          <label className="form-label">Data preferida</label>
          <input className="form-input" type="text" placeholder="Ex: Sábado dia 15 de março" />
        </div>
        <div className="form-group">
          <label className="form-label">Mensagem para as amigas (opcional)</label>
          <textarea className="form-textarea" placeholder="Um recadinho fofo para o grupo 💕" style={{ minHeight: 60 }} />
        </div>
        <button className="btn btn-primary btn-full" onClick={salvar}>{savedDesejo ? "✅ Salvo!" : "💾 Salvar desejos"}</button>
      </div>
    </div>
  );
}

function PagamentosTab({ evento, user, isAniversariante, isTesoureira, valorPorPessoa, pagosMes, togglePago, copyPix, copied, candidatarTesoureira }) {
  if (!evento) return null;
  if (isAniversariante) return (
    <div className="locked-screen">
      <div className="locked-icon">🔒</div>
      <div className="locked-title">Isso é surpresa!</div>
      <div className="locked-text">Você não pode ver as informações de pagamento do seu próprio aniversário. Deixa que a gente cuida disso com muito amor! 💕</div>
    </div>
  );
  const total = evento.pagamentos.length;
  const progresso = Math.round((pagosMes / total) * 100);
  const tesoureira = AMIGAS.find(a => a.nome === evento.tesoureira);
  const meuPagamento = evento.pagamentos.find(p => p.amiga === user);
  return (
    <div>
      <div className="valor-box">
        <div>
          <div className="valor-label">Sua parte</div>
          <div className="valor-num">R$ {valorPorPessoa}</div>
          <div className="valor-sub">de R$ {evento.valorTotal} total</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="valor-label">Arrecadado</div>
          <div className="valor-num" style={{ color: "var(--olive)" }}>{pagosMes}/{total}</div>
          <div className="valor-sub">amigas pagaram</div>
        </div>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progresso}%` }} />
      </div>
      {!evento.tesoureira ? (
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🛍️</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: "var(--rose)", marginBottom: 6 }}>Quem vai comprar o presente?</div>
          <div style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 14 }}>Se puder comprar, clique abaixo e informe sua chave Pix!</div>
          <button className="btn btn-primary btn-full" onClick={candidatarTesoureira}>🙋 Quero ser a tesoureira!</button>
        </div>
      ) : (
        <div className="pix-box">
          <div className="pix-label">Tesoureira — pague para ela</div>
          <div className="pix-name">{tesoureira?.nome} {tesoureira?.emoji}</div>
          <div className="pix-key">
            <span>{tesoureira?.pix}</span>
            <button className="copy-btn" onClick={copyPix}>{copied ? "✅" : "Copiar"}</button>
          </div>
        </div>
      )}
      {meuPagamento && !meuPagamento.pago && (
        <button className="btn btn-primary btn-full" style={{ marginBottom: 14 }} onClick={() => togglePago(user)}>✅ Já paguei!</button>
      )}
      {meuPagamento?.pago && (
        <div style={{ background: "#F0FFF4", border: "1px solid #B8E6C4", borderRadius: 14, padding: 12, textAlign: "center", marginBottom: 14, fontSize: 14, fontWeight: 700, color: "var(--olive)" }}>✅ Você já pagou! Obrigada 💚</div>
      )}
      <p className="section-label">Status de pagamentos</p>
      <div className="card">
        {evento.pagamentos.map((p, i) => (
          <div key={i} className="payment-row">
            <div className="avatar avatar-sm">{AMIGAS.find(a => a.nome === p.amiga)?.emoji}</div>
            <div className="payment-name">{p.amiga}</div>
            {isTesoureira && !p.pago ? (
              <button className="payment-confirm" onClick={() => togglePago(p.amiga)}>Confirmar</button>
            ) : (
              <span style={{ fontSize: 18 }}>{p.pago ? "✅" : "⏳"}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatTab({ msgs, user, isAniversariante, msgInput, setMsgInput, sendMsg, eventos, eventoAtivo, setEventoAtivo }) {
  if (isAniversariante) return (
    <div className="locked-screen">
      <div className="locked-icon">🤫</div>
      <div className="locked-title">Esse chat é surpresa!</div>
      <div className="locked-text">As meninas estão combinando seu aniversário aqui. Em breve você vai saber de tudo! 🎉</div>
    </div>
  );
  return (
    <div>
      {eventos.length > 1 && (
        <div className="pill-tabs">
          {eventos.map(ev => (
            <button key={ev.id} className={`pill-tab${eventoAtivo === ev.id ? " active" : ""}`} onClick={() => setEventoAtivo(ev.id)}>💬 Niver da {ev.aniversariante}</button>
          ))}
        </div>
      )}
      <div className="chat-messages">
        {msgs.map(m => m.autora === user ? (
          <div key={m.id} style={{ textAlign: "right", marginBottom: 10 }}>
            <div className="msg-bubble mine">{m.texto}<div className="msg-time">{m.hora}</div></div>
          </div>
        ) : (
          <div key={m.id} className="msg-with-avatar">
            <div className="avatar avatar-sm">{AMIGAS.find(a => a.nome === m.autora)?.emoji}</div>
            <div>
              <div className="msg-bubble other">
                <div className="msg-sender">{m.autora}</div>
                {m.texto}
                <div className="msg-time">{m.hora}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input className="chat-input" placeholder="Mensagem..." value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} />
        <button className="send-btn" onClick={sendMsg}>➤</button>
      </div>
    </div>
  );
}
