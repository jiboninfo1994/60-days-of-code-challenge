import React from 'react';

const BioData = ({
  name,
  email,
  phone,
  github,
  skills,
  interest,
  socialLink
}) => {
  return (
    <div className="bio-data">
      <h2>Biodata of {name}</h2>
      <div className="personal-info">
        {email && (
          <p>
            <strong>Email: </strong>
            {email}
          </p>
        )}

        {phone && (
          <p>
            <strong>Phone: </strong>
            {phone}
          </p>
        )}

        {github && (
          <p>
            <strong>Github: </strong>
            {github}
          </p>
        )}
      </div>

      {skills && skills.length > 0 && (
        <div className="skills">
          <h2>My Skill</h2>
          <ul>
            {skills?.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
      {interest && interest.length > 0 && (
        <div className="interest">
          <h2>My Interests</h2>
          <ul>
            {interest?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {socialLink && socialLink.length > 0 && (
        <div className="social-links">
          <h2>My Social Link</h2>
          <ul>
            {socialLink?.map((item) => (
              <li>
                <strong>{item.platform}: </strong>
                {item.link}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BioData;
