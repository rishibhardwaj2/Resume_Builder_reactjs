// src/components/AtsPreview.jsx
import React from 'react';

export default function AtsPreview({ profile, skills, experience, education, scores }) {
  return (
    <div className="panel">
      <article className="ats-resume">
        <header>
          <h1>{profile.name}</h1>
          <p className="muted">{profile.email} • {profile.phone} • {profile.location}</p>
        </header>

        <section style={{marginTop:12}}>
          <h2>Summary</h2>
          <p>{profile.summary}</p>
        </section>

        <section style={{marginTop:12}}>
          <h2>Experience</h2>
          {experience.map(exp=> (
            <div key={exp.id} style={{marginBottom:8}}>
              <p style={{fontWeight:700}}>{exp.title}</p>
              <p style={{color:'#6b7280'}}>{exp.date}</p>
              <ul style={{marginLeft:18}}>
                {(exp.bullets||[]).map((b,i)=><li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section style={{marginTop:12}}>
          <h2>Education</h2>
          {education.map((e,i)=> <p key={i}>{e}</p>)}
        </section>

        <section style={{marginTop:12}}>
          <h2>Skills</h2>
          <p>{skills.join(', ')}</p>
        </section>

        {scores.length>0 && (
          <section style={{marginTop:12}}>
            <h2>Technical Assessments</h2>
            {scores.map(s=> <p key={s.id}>{s.platform} — {s.test}: {s.score} ({s.percentile}%)</p>)}
          </section>
        )}
      </article>
    </div>
  );
}
