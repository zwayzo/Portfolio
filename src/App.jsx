import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

// ─── Import your existing assets (keep all your imports) ───────
import pythonIcon from './assets/python.svg';
import mysql from './assets/mysql.svg';
import reactIcon from './assets/react.svg';
import htmlIcon from './assets/html5.svg';
import phpIcon from './assets/php.svg';
import gitIcon from './assets/git.svg';
import dockerIcon from './assets/docker.svg';
import flaskIcon from './assets/flask.svg';
import drupalIcon from './assets/drupal.svg';
import postgresqlIcon from './assets/postgresql.svg';
import sqlalchemyIcon from './assets/sqlalchemy.svg';
import wordpressIcon from './assets/wordpress.svg';
import cIcon from './assets/c.svg';
import cppIcon from './assets/cplusplus.svg';
import djangoIcon from './assets/django.svg';
import figmaIcon from './assets/figma.svg';
import mongodbIcon from './assets/mongodb.svg';
import sqliteIcon from './assets/sqlite.svg';
import flutterIcon from './assets/flutter.svg';
import me from './assets/me.jpeg';
import cyberPong from './assets/tranc.png';
import iwri from './assets/iwri.png';
import inception from './assets/inception.jpg';
import linder from './assets/linder.png';
import minishell from './assets/minishell.gif';
import webserv from './assets/webserv.webp';
import camagru from './assets/camagru.png';
import swiftyCompanion from './assets/swifty-companion.png';

// ─── Particle System ────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H;

    const COLORS = [[79,142,247],[6,182,212],[139,92,246],[255,255,255]];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener('mousemove', onMouse);

    class Particle {
      constructor(init = false) { this.reset(init); }
      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.z = Math.random() * 800 + 200;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.4 + 0.1);
        this.vz = (Math.random() - 0.5) * 0.5;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
        this.size = Math.random() * 1.5 + 0.5;
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.r = c[0]; this.g = c[1]; this.b = c[2];
      }
      update() {
        const { x: mx, y: my } = mouseRef.current;
        const dx = mx - this.x, dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) { this.vx += dx / dist * 0.02; this.vy += dy / dist * 0.02; }
        this.x += this.vx; this.y += this.vy; this.z += this.vz;
        this.life++;
        if (this.life > this.maxLife || this.y < -10 || this.x < -10 || this.x > W + 10) this.reset(false);
      }
      draw() {
        const fov = 500;
        const scale = fov / (fov + this.z);
        const sx = this.x * scale + (W / 2) * (1 - scale);
        const sy = this.y * scale + (H / 2) * (1 - scale);
        const p = this.life / this.maxLife;
        const alpha = p < 0.1 ? p * 10 : p > 0.9 ? (1 - p) * 10 : 1;
        ctx.beginPath();
        ctx.arc(sx, sy, this.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${alpha * 0.7})`;
        ctx.fill();
      }
    }

    particlesRef.current = Array.from({ length: 180 }, () => new Particle(true));

    function drawConnections() {
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(79,142,247,${(1 - dist / 120) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particlesRef.current.forEach(p => { p.update(); p.draw(); });
      rafRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

// ─── Custom Cursor ───────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e) => { posRef.current.mx = e.clientX; posRef.current.my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    let raf;
    function anim() {
      const p = posRef.current;
      p.rx += (p.mx - p.rx) * 0.12;
      p.ry += (p.my - p.ry) * 0.12;
      if (dotRef.current) { dotRef.current.style.left = p.mx + 'px'; dotRef.current.style.top = p.my + 'px'; }
      if (ringRef.current) { ringRef.current.style.left = p.rx + 'px'; ringRef.current.style.top = p.ry + 'px'; }
      raf = requestAnimationFrame(anim);
    }
    anim();

    const expand = () => { if (ringRef.current) { ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.8)'; ringRef.current.style.borderColor = 'rgba(79,142,247,0.9)'; } };
    const shrink = () => { if (ringRef.current) { ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'; ringRef.current.style.borderColor = 'rgba(79,142,247,0.5)'; } };
    document.querySelectorAll('button,a,.proj-card,.skill-card,.clink').forEach(el => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', shrink);
    });

    return () => { cancelAnimationFrame(raf); document.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed',width:6,height:6,background:'#4f8ef7',borderRadius:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:9999,transition:'transform 0.1s' }} />
      <div ref={ringRef} style={{ position:'fixed',width:32,height:32,border:'1px solid rgba(79,142,247,0.5)',borderRadius:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:9998,transition:'all 0.15s ease' }} />
    </>
  );
}

// ─── Main Portfolio ──────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const NAV_ITEMS = ['about', 'experience', 'projects', 'skills', 'contact'];

  const PROJECTS_MAIN = [
    { num:'01', icon:'🎩', title:'DSLR — Sorting Hat Classifier', tech:'Python · Logistic Regression · Pandas · Matplotlib', desc:'Multi-class one-vs-all logistic regression trained from scratch with gradient descent to sort students into houses from their grades. Custom statistics toolkit reimplementing describe() without built-in stats functions, plus histograms, scatter and pair plots to guide feature selection.', code:'https://github.com/zwayzo/dslr' },
    { num:'02', icon:'⚡', title:'WebServ', tech:'C++ · POSIX · HTTP/1.1 · Linux', desc:'HTTP/1.1 server built from scratch at École 1337. GET/POST/DELETE, non-blocking I/O (select()), CGI execution, chunked transfer, virtual hosts. Deep mastery of low-level network protocols.', code:'https://github.com/zwayzo/webserv', img: webserv },
    { num:'03', icon:'🏓', title:'CyberPong', tech:'Django · WebSockets · Docker · JS', desc:'Real-time multiplayer game (Django Channels). Tournament engine, matchmaking, persistent leaderboards, private chat. Automated Docker CI/CD.', code:'https://github.com/Bettercallous/CyberPong', img: cyberPong },
    { num:'04', icon:'💜', title:'Matcha (Linder)', tech:'Flask · PostgreSQL · ReactJS · SocketIO', desc:'Full-stack dating platform with a multi-criteria matching algorithm, real-time notifications via Flask-SocketIO, OAuth auth, and XSS/CSRF/SQL protection.', code:'https://github.com/zwayzo/Matcha', img: linder },
    { num:'05', icon:'🌍', title:'IWRI Website', tech:'WordPress · PHP · Drupal', desc:'Responsive institutional site with advanced content management, designed for non-technical users. Scalable, SEO-friendly structure.', code:'https://github.com/zwayzo/IWRI', img: iwri },
    { num:'06', icon:'📸', title:'Camagru', tech:'PHP · Laravel · MySQL · Canvas API', desc:'Photo-sharing app: MVC built from scratch in PHP, real-time Canvas JS filters, likes system, live comments, and email notifications.', code:'https://github.com/zwayzo/camagru', img: camagru },
    { num:'07', icon:'📱', title:'Weather App', tech:'Flutter · Dart · Weather API', desc:'Fully responsive weather application built with Flutter: real-time geolocation, city search with suggestions, current conditions, hourly/weekly forecast, temperature charts & curves.', code:'https://github.com/zwayzo/swifty-companion', img: swiftyCompanion },
  ];

  const PROJECTS_SMALL = [
    { num:'08', icon:'🐋', title:'Inception', tech:'Docker · Nginx · MariaDB · WordPress', desc:'Containerized multi-service infrastructure: TLS, reverse proxy, persistent volumes, fully automated provisioning via Makefile + Docker Compose.', code:'https://github.com/zwayzo/inception', img: inception },
    { num:'09', icon:'🖥️', title:'Minishell', tech:'C · POSIX · Bash', desc:'Custom shell in C supporting pipes, redirections, environment variables, built-ins, and fine-grained signal handling — behaves faithfully like Bash.', code:'https://github.com/zwayzo/minishell-42', img: minishell },
  ];

  const SKILLS = [
    { cat:'Languages', items:[
      { name:'Python', icon: pythonIcon, hot:true },
      { name:'C / C++', icon: cppIcon, hot:true },
      { name:'JavaScript', icon: null, hot:true },
      { name:'PHP / Laravel', icon: phpIcon, hot:true },
      { name:'Flutter / Dart', icon: flutterIcon, hot:false },
      { name:'HTML5 / CSS3', icon: htmlIcon, hot:false },
    ]},
    { cat:'Frameworks & AI', items:[
      { name:'Django', icon: djangoIcon, hot:true },
      { name:'Flask', icon: flaskIcon, hot:true },
      { name:'React.js', icon: reactIcon, hot:false },
      { name:'OpenAI API', icon: null, hot:true },
      { name:'WordPress', icon: wordpressIcon, hot:false },
      { name:'Drupal', icon: drupalIcon, hot:false },
    ]},
    { cat:'DevOps & Cloud', items:[
      { name:'Docker / Compose', icon: dockerIcon, hot:true },
      { name:'CI/CD pipelines', icon: null, hot:true },
      { name:'Git / GitHub', icon: gitIcon, hot:true },
      { name:'Linux / Bash', icon: null, hot:true },
      { name:'Nginx', icon: null, hot:false },
      { name:'Kubernetes', icon: null, hot:false },
    ]},
    { cat:'Databases', items:[
      { name:'PostgreSQL', icon: postgresqlIcon, hot:true },
      { name:'MySQL / MariaDB', icon: mysql, hot:true },
      { name:'Redis', icon: null, hot:true },
      { name:'SQLAlchemy', icon: sqlalchemyIcon, hot:false },
      { name:'MongoDB', icon: mongodbIcon, hot:false },
      { name:'SQLite', icon: sqliteIcon, hot:false },
    ]},
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#030712', color:'#f1f5f9', fontFamily:"'Space Grotesk',sans-serif", overflowX:'hidden', cursor:'none' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin:0; padding:0; }
        :root { --blue:#4f8ef7; --cyan:#06b6d4; --purple:#8b5cf6; --mono:'JetBrains Mono',monospace; }
        @keyframes shimmer { to { background-position: 200% center; } }
        @keyframes pulse-g { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0)} }
        @keyframes scroll-anim { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.8s ease both; }
        .d1{animation-delay:0.1s} .d2{animation-delay:0.25s} .d3{animation-delay:0.4s} .d4{animation-delay:0.6s} .d5{animation-delay:0.8s}
        .shimmer-text {
          background: linear-gradient(90deg,#4f8ef7,#06b6d4,#8b5cf6,#4f8ef7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .proj-card { transition: all 0.4s; }
        .proj-card:hover { transform: translateY(-4px); border-color: rgba(79,142,247,0.5) !important; }
        .skill-card { transition: all 0.3s; }
        .skill-card:hover { transform: translateY(-4px); border-color: rgba(79,142,247,0.4) !important; }
        .btn-primary { transition: all 0.3s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(79,142,247,0.3); }
        .btn-outline { transition: all 0.3s; }
        .btn-outline:hover { background: rgba(79,142,247,0.08); border-color: #4f8ef7; transform: translateY(-2px); }
        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #f1f5f9 !important; }
        .avail-dot { animation: pulse-g 2s infinite; }
        .scroll-bar { animation: scroll-anim 2s ease-in-out infinite; }
        .exp-dot { box-shadow: 0 0 0 3px rgba(79,142,247,0.2); }
        .clink { transition: all 0.3s; }
        .clink:hover { background: rgba(79,142,247,0.15) !important; border-color: rgba(79,142,247,0.5) !important; transform: translateY(-2px); }
        img { display: block; }
      `}</style>

      <ParticleCanvas />
      <CustomCursor />

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        padding:'16px 32px', display:'flex', justifyContent:'space-between', alignItems:'center',
        transition:'all 0.3s',
        background: scrolled ? 'rgba(3,7,18,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(79,142,247,0.1)' : 'none',
      }}>
        <div style={{ fontFamily:'var(--mono)', fontSize:13, color:'#4f8ef7', letterSpacing:'0.1em' }}>MA.dev</div>
        <div style={{ display:'flex', gap:32 }} className="hidden-mobile">
          {NAV_ITEMS.map(item => (
            <span key={item} className="nav-link" onClick={() => scrollTo(item)}
              style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#64748b', letterSpacing:'0.05em' }}>
              {item}
            </span>
          ))}
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background:'none', border:'none', color:'#f1f5f9', cursor:'pointer', display:'none' }}
          className="mobile-menu-btn">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div style={{ position:'fixed', top:56, left:0, right:0, zIndex:99, background:'rgba(10,15,30,0.98)', borderBottom:'1px solid rgba(79,142,247,0.1)', padding:'20px 32px' }}>
          {NAV_ITEMS.map(item => (
            <div key={item} onClick={() => scrollTo(item)}
              style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, color:'#64748b', padding:'10px 0', cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              {item}
            </div>
          ))}
        </div>
      )}

      <div style={{ position:'relative', zIndex:1, maxWidth:1000, margin:'0 auto', padding:'0 28px 100px' }}>

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative' }}>
          <div style={{ width:'100%' }}>
            {/* Available badge */}
            <div className="fade-up" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:100, background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#22c55e', marginBottom:24 }}>
              <div className="avail-dot" style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e' }} />
              Open to a 6-month internship or work-study program
            </div>
            <div className="fade-up" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:100, background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#22c55e', marginBottom:24 }}>
              <div className="avail-dot" style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e' }} />
              Immediate availability
            </div>

            {/* Label */}
            <div className="fade-up d1" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#06b6d4', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:40, height:1, background:'#06b6d4' }} />
              Software Engineer · École 42 Lyon
            </div>

            {/* Name */}
            <h1 className="fade-up d2" style={{ fontSize:'clamp(48px,8vw,88px)', fontWeight:700, lineHeight:0.95, marginBottom:16, letterSpacing:'-0.02em' }}>
              <span style={{ display:'block', color:'#f1f5f9' }}>Mohammed</span>
              <span className="shimmer-text" style={{ display:'block' }}>Azzeddine</span>
            </h1>

            {/* Subtitle */}
            <p className="fade-up d3" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:14, color:'#64748b', marginBottom:40, maxWidth:520, lineHeight:1.8 }}>
              I build <span style={{ color:'#06b6d4' }}>backends that scale</span>, integrate{' '}
              <span style={{ color:'#06b6d4' }}>AI APIs</span>, and ship{' '}
              <span style={{ color:'#06b6d4' }}>products people use</span>.<br />
              Python · C/C++ · Django · Docker · OpenAI
            </p>

            {/* Buttons */}
            <div className="fade-up d4" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <button className="btn-primary" onClick={() => scrollTo('projects')}
                style={{ padding:'14px 32px', background:'linear-gradient(135deg,#4f8ef7,#8b5cf6)', color:'#fff', border:'none', borderRadius:6, fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:600, cursor:'pointer', letterSpacing:'0.02em' }}>
                View Projects →
              </button>
              <button className="btn-outline" onClick={() => scrollTo('contact')}
                style={{ padding:'14px 32px', background:'transparent', color:'#4f8ef7', border:'1px solid rgba(79,142,247,0.4)', borderRadius:6, fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:600, cursor:'pointer' }}>
                Get in touch
              </button>
            </div>

            {/* Stats */}
            <div className="fade-up d5" style={{ display:'flex', gap:40, marginTop:60, paddingTop:40, borderTop:'1px solid rgba(79,142,247,0.1)', flexWrap:'wrap' }}>
              {[['3','internships'],['8+','projects shipped'],['95%','AI precision'],['42','school']].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontSize:32, fontWeight:700, color:'#f1f5f9', lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#64748b', marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position:'absolute', bottom:40, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#64748b', letterSpacing:'0.1em' }}>
            <div className="scroll-bar" style={{ width:1, height:60, background:'linear-gradient(to bottom,#4f8ef7,transparent)' }} />
            scroll
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────────── */}
        <section id="about" style={{ padding:'100px 0' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#06b6d4', letterSpacing:'0.15em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            01 · who i am
            <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(6,182,212,0.3),transparent)', maxWidth:120 }} />
          </div>
          <h2 style={{ fontSize:'clamp(28px,4vw,40px)', fontWeight:700, letterSpacing:'-0.02em', marginBottom:48 }}>About me</h2>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
            <div>
              {/* Photo */}
              <div style={{ width:'100%', aspectRatio:'1', borderRadius:12, overflow:'hidden', border:'1px solid rgba(79,142,247,0.2)', marginBottom:24, position:'relative' }}>
                <img src={me} alt="Mohammed Azzeddine" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(3,7,18,0.4),transparent)' }} />
              </div>
            </div>
            <div>
              <p style={{ fontSize:15, lineHeight:1.9, color:'#64748b', marginBottom:20 }}>
                Software Engineer with solid full-stack development experience (<strong style={{ color:'#f1f5f9' }}>Django, Flask, React.js, C/C++, Docker</strong>) gained through several internships. Comfortable in <strong style={{ color:'#f1f5f9' }}>Agile/Scrum</strong> environments and DevOps practices (CI/CD, Git).
              </p>
              <p style={{ fontSize:15, lineHeight:1.9, color:'#64748b', marginBottom:20 }}>
                Currently pursuing a <strong style={{ color:'#f1f5f9' }}>Digital Architecture Engineering degree (RNCP 7)</strong> at <strong style={{ color:'#f1f5f9' }}>École 42 Lyon</strong>, seeking a work-study program or a 6-month internship to contribute to ambitious projects.
              </p>
              {/* Terminal box */}
              <div style={{ background:'rgba(10,15,30,0.8)', border:'1px solid rgba(79,142,247,0.15)', borderRadius:10, padding:24, fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>
                <div style={{ color:'#64748b', marginBottom:12 }}>~ whoami</div>
                {[['Location','Lyon, France'],['School','École 42 Lyon'],['Status','● Open to work'],['GitHub','github.com/zwayzo']].map(([k,v]) => (
                  <div key={k} style={{ marginBottom:6 }}>
                    <span style={{ color:'#06b6d4' }}>{k}: </span>
                    <span style={{ color: k==='Status' ? '#22c55e' : k==='GitHub' ? '#4f8ef7' : '#f1f5f9' }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop:12, display:'flex', flexWrap:'wrap', gap:6 }}>
                  {['Arabic 🇲🇦','French 🇫🇷','English 🇬🇧'].map(l => (
                    <span key={l} style={{ background:'rgba(255,255,255,0.05)', padding:'2px 8px', borderRadius:3, color:'#f1f5f9' }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ──────────────────────────────────────────── */}
        <section id="experience" style={{ padding:'100px 0' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#06b6d4', letterSpacing:'0.15em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            02 · work history
            <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(6,182,212,0.3),transparent)', maxWidth:120 }} />
          </div>
          <h2 style={{ fontSize:'clamp(28px,4vw,40px)', fontWeight:700, letterSpacing:'-0.02em', marginBottom:48 }}>Experience</h2>

          <div style={{ position:'relative', paddingLeft:24, borderLeft:'1px solid rgba(79,142,247,0.3)' }}>
            {[
              { date:'Feb – Aug 2025', role:'Software Engineer — Intern', co:'Institut International des Recherches dans l\'Eau (IWRI) · Rabat, Morocco', bullets:[
                'Designed and deployed 2 full-stack web apps in production: RESTful Django API with JWT auth, permission management, Swagger docs; +30% performance via N+1 optimization, SQL indexing, Redis caching',
                'Containerized microservices architecture (Docker Compose): Nginx reverse proxy, automated CI/CD pipelines, dev/prod separation, service monitoring',
                'Custom WordPress development: custom themes & plugins, third-party API integration, SEO optimization (Lighthouse > 90)',
              ]},
              { date:'May – Jul 2022', role:'Software Engineer — Intern', co:'CHU Mohammed VI · Oujda, Morocco', bullets:[
                'Developed a real-time Computer Vision system (Python, OpenCV, CNN) for face mask detection — 95% accuracy, deployed on surveillance cameras and embedded hardware',
                'Automated compliance checks across multiple simultaneous video feeds, significantly reducing manual interventions',
              ]},
              { date:'Jun – Jul 2021', role:'Software Engineer — Intern', co:'SQLI · Oujda, Morocco', bullets:[
                'Front-end development (HTML/CSS/JS) within a Scrum team: sprints, code reviews, feature delivery, CI/CD workflows',
              ]},
            ].map((exp, i) => (
              <div key={i} style={{ position:'relative', marginBottom:48, paddingLeft:24 }}>
                <div className="exp-dot" style={{ position:'absolute', left:-31, top:6, width:8, height:8, borderRadius:'50%', background:'#4f8ef7' }} />
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#06b6d4', marginBottom:6 }}>{exp.date}</div>
                <div style={{ fontSize:18, fontWeight:600, marginBottom:4 }}>{exp.role}</div>
                <div style={{ fontSize:13, color:'#64748b', marginBottom:12 }}>{exp.co}</div>
                <ul style={{ listStyle:'none' }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize:13, color:'#64748b', marginBottom:6, display:'flex', gap:8, lineHeight:1.6 }}>
                      <span style={{ color:'#4f8ef7', flexShrink:0 }}>→</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────────── */}
        <section id="projects" style={{ padding:'100px 0' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#06b6d4', letterSpacing:'0.15em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            03 · what i built
            <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(6,182,212,0.3),transparent)', maxWidth:120 }} />
          </div>
          <h2 style={{ fontSize:'clamp(28px,4vw,40px)', fontWeight:700, letterSpacing:'-0.02em', marginBottom:48 }}>Projects</h2>

          {/* Main projects grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:1, background:'rgba(79,142,247,0.1)', borderRadius:12, overflow:'hidden', marginBottom:24 }}>
            {PROJECTS_MAIN.map((p) => (
              <div key={p.num} className="proj-card" style={{ background:'#0a0f1e', padding:28, position:'relative', border:'1px solid rgba(79,142,247,0.08)' }}>
                {/* Project image */}
                <div style={{ width:'100%', height:140, borderRadius:8, overflow:'hidden', marginBottom:16, background:'#030712', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {p.img ? (
                    <img src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.85 }} />
                  ) : (
                    <span style={{ fontSize:40, opacity:0.5 }}>{p.icon}</span>
                  )}
                </div>
                <div style={{ position:'absolute', top:20, right:20, fontSize:20 }}>{p.icon}</div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#64748b', marginBottom:8 }}>{p.num}</div>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:6, color:'#f1f5f9' }}>{p.title}</div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#06b6d4', marginBottom:10, letterSpacing:'0.05em' }}>{p.tech}</div>
                <div style={{ fontSize:12, color:'#64748b', lineHeight:1.7, marginBottom:16 }}>{p.desc}</div>
                <a href={p.code} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#4f8ef7', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6 }}>
                  View on GitHub <ExternalLink size={10} />
                </a>
              </div>
            ))}
          </div>

          {/* Small projects */}
          <div style={{ marginTop:48 }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, color:'#8b5cf6', marginBottom:24, fontWeight:500 }}>#small-projects</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16 }}>
              {PROJECTS_SMALL.map((p) => (
                <div key={p.num} className="proj-card" style={{ background:'#0a0f1e', border:'1px solid rgba(79,142,247,0.1)', borderRadius:10, padding:24 }}>
                  <div style={{ width:'100%', height:120, borderRadius:6, overflow:'hidden', marginBottom:14, background:'#030712' }}>
                    <img src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.8 }} />
                  </div>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#64748b', marginBottom:6 }}>{p.num}</div>
                  <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>{p.title}</div>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#06b6d4', marginBottom:10 }}>{p.tech}</div>
                  <div style={{ fontSize:12, color:'#64748b', lineHeight:1.7, marginBottom:14 }}>{p.desc}</div>
                  <a href={p.code} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#4f8ef7', textDecoration:'none' }}>
                    View on GitHub →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ──────────────────────────────────────────────── */}
        <section id="skills" style={{ padding:'100px 0' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#06b6d4', letterSpacing:'0.15em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            04 · tech stack
            <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(6,182,212,0.3),transparent)', maxWidth:120 }} />
          </div>
          <h2 style={{ fontSize:'clamp(28px,4vw,40px)', fontWeight:700, letterSpacing:'-0.02em', marginBottom:48 }}>Skills</h2>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
            {SKILLS.map((cat) => (
              <div key={cat.cat} className="skill-card" style={{ background:'#0a0f1e', border:'1px solid rgba(79,142,247,0.12)', borderRadius:10, padding:24 }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#06b6d4', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:16 }}>{cat.cat}</div>
                {cat.items.map((item) => (
                  <div key={item.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      {item.icon && <img src={item.icon} alt={item.name} style={{ width:16, height:16, filter:'brightness(0) invert(1)', opacity:0.7 }} />}
                      <span style={{ fontSize:13, color:'#f1f5f9' }}>{item.name}</span>
                    </div>
                    <div style={{ width:6, height:6, borderRadius:'50%', background: item.hot ? '#4f8ef7' : '#64748b' }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────── */}
        <section id="contact" style={{ padding:'100px 0' }}>
          <div style={{ background:'#0a0f1e', border:'1px solid rgba(79,142,247,0.15)', borderRadius:16, padding:'60px 40px', textAlign:'center' }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#06b6d4', letterSpacing:'0.15em', marginBottom:16 }}>05 · get in touch</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:700, letterSpacing:'-0.02em', marginBottom:16 }}>
              Let's build<br />
              <span className="shimmer-text">something great</span>
            </h2>
            <p style={{ fontSize:15, color:'#64748b', marginBottom:40, maxWidth:480, margin:'0 auto 40px' }}>
              Open to a 6-month internship or a work-study program (2 weeks company / 1 week school). Feel free to reach out to discuss a project or an opportunity.
            </p>
            <div style={{ display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap' }}>
              {[
                { label:'✉ azzeddine.simohammed@gmail.com', href:'mailto:azzeddine.simohammed@gmail.com' },
                { label:'⌂ github.com/zwayzo', href:'https://github.com/zwayzo' },
                { label:'in linkedin', href:'https://www.linkedin.com/in/mohammed-azzeddine-66125b274/' },
                { label:'☎ +33 7 53 92 40 36', href:'tel:+33753924036' },
              ].map(({ label, href }) => (
                <a key={label} className="clink" href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 24px', background:'rgba(79,142,247,0.08)', border:'1px solid rgba(79,142,247,0.2)', borderRadius:8, color:'#4f8ef7', fontFamily:'JetBrains Mono,monospace', fontSize:12, textDecoration:'none' }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{ borderTop:'1px solid rgba(79,142,247,0.08)', padding:'24px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, maxWidth:1000, margin:'0 auto', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#64748b' }}>
        <span>© 2026 Mohammed Azzeddine</span>
        <span style={{ color:'#22c55e' }}>● Available for work</span>
      </footer>
    </div>
  );
}
