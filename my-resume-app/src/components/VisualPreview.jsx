// src/components/VisualPreview.jsx
import React, { forwardRef } from 'react';

const VisualPreview = forwardRef(({ profile, skills, experience, education, scores, template }, ref) => {
  // small helper to render bullets
  return (
    <div className="preview-frame">
      <div ref={ref} className={`resume ${template}`}>
        <div style={{display:'flex', gap:16, alignItems:'center', borderBottom:'1px solid #eef2ff', paddingBottom:12}}>
          <div style={{width:96, height:96, borderRadius: template==='modern'?'50%':'12px', background:'#f3f4f6'}} />
          <div>
            <h2 style={{margin:0}}>{profile.name}</h2>
            <div style={{color:'#4f46e5', fontWeight:600}}>{profile.title}</div>
            <div style={{color:'#6b7280', marginTop:6}}>{profile.email} • {profile.phone} • {profile.location}</div>
          </div>
        </div>

        <div style={{marginTop:14}}>
          <h3>Summary</h3>
          <p>{profile.summary}</p>
        </div>

        <div style={{marginTop:14}}>
          <h3>Experience</h3>
          {experience.map(exp=> (
            <div key={exp.id} style={{marginBottom:12}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><strong>{exp.title}</strong><span style={{color:'#6b7280'}}>{exp.date}</span></div>
              <ul style={{marginTop:6}}>
                {(exp.bullets||[]).map((b,i)=> <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{display:'flex', gap:24, marginTop:14}}>
          <div style={{flex:1}}>
            <h3>Education</h3>
            {education.map((e,i)=> <p key={i}>{e}</p>)}
          </div>
          <div style={{flex:1}}>
            <h3>Skills</h3>
            <div>{skills.map((s,i)=> <span key={i} className="tag">{s}</span>)}</div>
          </div>
        </div>

        <div style={{marginTop:14}}>
          <h3>Technical Assessments</h3>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {scores.map(sc=>(
              <div key={sc.id} className="badge">
                <div style={{fontWeight:600}}>{sc.platform}</div>
                <div style={{fontSize:13}}>{sc.test}</div>
                <div style={{fontWeight:700, color:'#4f46e5'}}>{sc.score} <small style={{color:'#6b7280'}}>({sc.percentile}%)</small></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default VisualPreview;
