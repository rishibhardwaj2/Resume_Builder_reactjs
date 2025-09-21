// src/components/FormPanel.jsx
import React from 'react';

export default function FormPanel({
  profile, updateProfile,
  skills, skillInput, setSkillInput, addSkill, removeSkill,
  experience, addExperience, updateExperience, updateExperienceBullets, removeExperience,
  education, setEducation,
  scores, addScore, updateScore, removeScore,
  template, setTemplate,
  onDownloadVisual, onDownloadAts, previewClick
}) {
  return (
    <aside className="panel">
      <h3>Profile</h3>
      <div style={{marginTop:8}}>
        <input className="input" value={profile.name} onChange={e=>updateProfile('name', e.target.value)} placeholder="Full name" />
      </div>
      <div style={{marginTop:8}}>
        <input className="input" value={profile.title} onChange={e=>updateProfile('title', e.target.value)} placeholder="Title" />
      </div>

      <div className="small" style={{marginTop:8}}>
        <input className="input" value={profile.email} onChange={e=>updateProfile('email', e.target.value)} placeholder="Email" />
        <input className="input" value={profile.phone} onChange={e=>updateProfile('phone', e.target.value)} placeholder="Phone" />
      </div>

      <div style={{marginTop:8}}>
        <input className="input" value={profile.location} onChange={e=>updateProfile('location', e.target.value)} placeholder="Location" />
      </div>

      <div style={{marginTop:10}}>
        <label className="muted">Summary</label>
        <textarea className="input" value={profile.summary} onChange={e=>updateProfile('summary', e.target.value)} />
      </div>

      <div style={{marginTop:10}}>
        <label className="muted">Skills</label>
        <div style={{display:'flex', gap:8, marginTop:6}}>
          <input className="input" value={skillInput} onChange={e=>setSkillInput(e.target.value)} onKeyDown={e=> e.key==='Enter' && (e.preventDefault(), addSkill())} placeholder="Add skill and press Enter" />
          <button className="btn" onClick={addSkill}>Add</button>
        </div>
        <div style={{marginTop:8}}>
          {skills.map((s,i)=> <span key={i} className="tag">{s} <button style={{marginLeft:6}} onClick={()=>removeSkill(i)}>×</button></span>)}
        </div>
      </div>

      <div style={{marginTop:12}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <label className="muted">Experience</label>
          <button onClick={addExperience} className="btn" style={{padding:'6px 8px'}}>+ Add</button>
        </div>
        <div style={{marginTop:8}}>
          {experience.map(exp => (
            <div key={exp.id} className="badge" style={{marginBottom:8}}>
              <input className="input" value={exp.title} onChange={e=>updateExperience(exp.id,'title', e.target.value)} placeholder="Role — Company" />
              <input className="input" value={exp.date} onChange={e=>updateExperience(exp.id,'date', e.target.value)} placeholder="Dates" style={{marginTop:6}} />
              <textarea defaultValue={(exp.bullets||[]).join('\n')} onBlur={e=>updateExperienceBullets(exp.id, e.target.value)} className="input" style={{marginTop:6}} />
              <div style={{textAlign:'right', marginTop:6}}><button onClick={()=>removeExperience(exp.id)} className="btn" style={{background:'#ef4444'}}>Remove</button></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop:12}}>
        <label className="muted">Education (one per line)</label>
        <textarea className="input" value={education.join('\n')} onChange={e=>setEducation(e.target.value.split('\n'))} />
      </div>

      <div style={{marginTop:12}}>
        <label className="muted">Coding Scores</label>
        <div style={{marginTop:6}}>
          {scores.map(s => (
            <div key={s.id} style={{marginBottom:8}} className="badge">
              <div style={{display:'flex', gap:8}}>
                <input className="input" value={s.platform} onChange={e=>updateScore(s.id,'platform', e.target.value)} placeholder="Platform" />
                <input className="input" value={s.test} onChange={e=>updateScore(s.id,'test', e.target.value)} placeholder="Test" />
              </div>
              <div style={{display:'flex', gap:8, marginTop:6}}>
                <input className="input" value={s.score} onChange={e=>updateScore(s.id,'score', e.target.value)} placeholder="Score" />
                <input className="input" value={s.percentile} onChange={e=>updateScore(s.id,'percentile', e.target.value)} placeholder="Percentile" />
                <button onClick={()=>removeScore(s.id)} className="btn" style={{background:'#ef4444'}}>Remove</button>
              </div>
            </div>
          ))}
          <button onClick={addScore} className="btn" style={{marginTop:6}}>+ Add Score</button>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <label className="muted">Template</label>
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <button className="btn" onClick={()=>setTemplate('modern')} style={{background: template==='modern'?undefined:'#e6e6ff'}}>Modern</button>
          <button className="btn" onClick={()=>setTemplate('classic')} style={{background: template==='classic'?undefined:'#e6e6ff'}}>Classic</button>
          <button className="btn" onClick={()=>setTemplate('minimal')} style={{background: template==='minimal'?undefined:'#e6e6ff'}}>Minimal</button>
        </div>
      </div>

      <div style={{display:'flex',gap:8, marginTop:12}}>
        <button className="btn" onClick={previewClick}>Preview</button>
        <button className="btn" onClick={()=>onDownloadVisual()}>Download Visual PDF</button>
        <button className="btn" onClick={()=>onDownloadAts()}>Download ATS PDF</button>
      </div>
    </aside>
  );
}
