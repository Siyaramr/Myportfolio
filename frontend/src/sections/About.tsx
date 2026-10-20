import portrait from '../assets/Images/IMG_1816-01.jpg'

export const About = () => {
  return (
    <section id="about" className="about-section">
      <img className="about-section__photo" src={portrait} alt="Portrait of Siyaram Rana" />
      <div className="about-section__content">
        <h2>About Me</h2>
        <div className="about-terminal">
          <p className="about-terminal__command">
            <span>[ root@portfolio ] $</span> cat about.txt
          </p>
          <div className="about-terminal__text">
            <p>
              Hi, I am Siyaram Rana from Kathmandu, Nepal.
            </p>
            <p>
              I work in IT support. I have worked with internet networks, customer support, and
              software problems. I like finding the cause of a problem and fixing it step by step.
            </p>
            <p>
              My goal is to become a <strong>System Administrator</strong> and later grow into{' '}
              <strong>Cyber Security</strong>. To reach this goal, I am learning Red Hat Enterprise
              Linux and preparing for the <strong>RHCSA</strong> certification.
            </p>
            <p>
              I also build websites, and I enjoy learning new technology and improving my practical
              IT skills every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
