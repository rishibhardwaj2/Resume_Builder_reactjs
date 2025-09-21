// src/App.jsx
import React, { useState, useRef } from 'react';
import FormPanel from './components/FormPanel';
import VisualPreview from './components/VisualPreview';
import AtsPreview from './components/AtsPreview';
import { downloadVisualPdf, openPrintWindowWithHtml } from './utils/pdf';

export default function App(){
  const [profile, setProfile] = useState({
    name: 'Jane Doe', title: 'Full Stack Engineer',
    email: 'jane@example.com', phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    summary: 'Passionate engineer who builds scalable web apps.'
  });

  const [skills, setSkills] = useState(['Java','Spring Boot','React','SQL']);
  const [skillInput, setSkillInput] = useState('');
  const [experience, setExperience] = useState([{ id:1, title:'Senior Backend Engineer — Acme', date:'Jan 2022 - Present', bullets:['Designed microservices','Reduced latency']}]);
  const [education, setEducation] = useState(['B.Tech — Computer Science — 2019']);
  const [scores, setScores] = useState([{ id:1, platform:'Hackerrank', test:'Algorithms', score:'95', percentile:'98' }]);
  const [template, setTemplate] = useState('modern');

  const visualRef = useRef();

  // profile update helper
  function updateProfile(field, value){ setProfile(p=>({...p, [field]: value})); }

  // skills helpers
  function addSkill(){ const s = (skillInput||'').trim(); if(!s) return; setSkills(prev=> prev.includes(s)?prev:[...prev, s]); setSkillInput(''); }
  function removeSkill(idx){ setSkills(prev=> prev.filter((_,i)=>i!==idx)); }

  // experience helpers
  function addExperience(){ setExperience(prev=> [...prev, { id:Date.now(), title:'New Role — Company', date:'Year — Year', bullets:['Achievement'] }]); }
  function updateExperience(id, field, value){ setExperience(prev=> prev.map(e=> e.id===id ? {...e, [field]: value} : e)); }
  function updateExperienceBullets(id, raw){ setExperience(prev=> prev.map(e=> e.id===id ? {...e, bullets: raw.split('\n').map(s=>s.trim()).filter(Boolean)} : e)); }
  function removeExperience(id){ setExperience(prev=> prev.filter(e=> e.id!==id)); }

  // education helpers
  function setEducationArray(arr){ setEducation(arr); }

  // scores
  function addScore(){ setScores(prev=> [...prev, { id:Date.now(), platform:'HackerRank', test:'Test', score:'', percentile:'' }]); }
  function updateScore(id, field, value){ setScores(prev=> prev.map(s=> s.id===id ? {...s, [field]: value} : s)); }
  function removeScore(id){ setScores(prev=> prev.filter(s=> s.id!==id)); }

  // Download handlers
  function handleDownloadVisual(){
    if(!visualRef.current) return;
    downloadVisualPdf(visualRef.current, `${(profile.name||'resume').replace(/\s+/g,'_')}_visual.pdf`);
  }

  function buildAtsHtml(){
    const escape = (s='') => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    const exp = experience.map(job => {
      const bullets = (job.bullets||[]).map(b=> `<li>${escape(b)}</li>`).join('');
      return `<div class="job"><p class="job-title">${escape(job.title)}</p>${job.date?`<p class="job-date">${escape(job.date)}</p>`:''}${bullets?`<ul>${bullets}</ul>`:''}</div>`;
    }).join('');
    const edu = education.map(e=> `<p>${escape(e)}</p>`).join('');
    const skillsText = escape(skills.join(', '));
    const scoresHtml = scores.length ? `<section><h2>Technical Assessments</h2>${scores.map(s => `<p>${escape(s.platform)} - ${escape(s.test)}: ${escape(s.score)} (Percentile ${escape(s.percentile)})</p>`).join('')}</section>` : '';
    const css = `body{background:#fff;margin:0;padding:0}.ats-resume{font-family:Arial, sans-serif;max-width:780px;margin:12mm auto;padding:18px;color:#111;font-size:11pt;line-height:1.35} .ats-resume h1{font-size:16pt;margin:0}.ats-resume .contact{font-size:10pt;color:#333;margin:6px 0 12px 0}.ats-resume h2{font-size:12pt;margin:14px 0 6px 0;border-bottom:1px solid #eee;padding-bottom:6px} ul{margin:6px 0 12px 18px}`;
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(profile.name||'Resume')}</title><style>${css}</style></head><body><article class="ats-resume"><header><h1>${escape(profile.name)}</h1><p class="contact">${escape(profile.email)} • ${escape(profile.phone)} • ${escape(profile.location)}</p></header><section><h2>Summary</h2><p>${escape(profile.summary)}</p></section><section><h2>Experience</h2>${exp}</section><section><h2>Education</h2>${edu}</section><section><h2>Skills</h2><p>${skillsText}</p></section>${scoresHtml}</article></body></html>`;
  }

  function handleDownloadAts(){
    const html = buildAtsHtml();
    openPrintWindowWithHtml(html);
  }

  // preview click
  function previewClick(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="container">
      <div className="grid">
        <FormPanel
          profile={profile} updateProfile={updateProfile}
          skills={skills} skillInput={skillInput} setSkillInput={setSkillInput} addSkill={addSkill} removeSkill={removeSkill}
          experience={experience} addExperience={addExperience} updateExperience={updateExperience} updateExperienceBullets={updateExperienceBullets} removeExperience={removeExperience}
          education={education} setEducation={setEducationArray}
          scores={scores} addScore={addScore} updateScore={updateScore} removeScore={removeScore}
          template={template} setTemplate={setTemplate}
          onDownloadVisual={handleDownloadVisual}
          onDownloadAts={handleDownloadAts}
          previewClick={previewClick}
        />

        <VisualPreview ref={visualRef} profile={profile} skills={skills} experience={experience} education={education} scores={scores} template={template} />

        <AtsPreview profile={profile} skills={skills} experience={experience} education={education} scores={scores} />
      </div>
    </div>
  );
}
