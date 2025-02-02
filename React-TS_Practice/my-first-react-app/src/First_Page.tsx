export function First_Page() {
  const myData = [
    {
      id: 1,
      name: "Omkar",
      age: 24,
      city: "Pune",
    },
    {
      id: 2,
      name: "Kartik",
      age: 29,
      city: "Bengaluru",
    },
    {
      id: 3,
      name: "Vivek",
      age: 32,
      city: "Solapur",
    },
    {
      id: 4,
      name: "Akshay",
      age: 28,
      city: "Satara",
    },
    {
      id: 5,
      name: "Shubham",
      age: 26,
      city: "Nashik",
    },
  ];


  return (
    <>
      <div>
        {myData.map((user) => {
          return (
            <div key={user.id}>
              <h1>Hi, I'm {user.name}</h1>
              <p>{user.age} years old.</p>
              <p>A Passionate Web Developer</p>
              <p>living in {user.city} city.</p>
            </div>
          );
        })}
      </div>
      <div>
        <h2>About Me</h2>
        <p>
          I'm a skilled web developer with a knack for creating dynamic,
          responsive, and user-friendly websites. With expertise in HTML, CSS,
          JavaScript, and modern frameworks, I aim to deliver designs that
          captivate and code that works seamlessly.
        </p>
        <p>
          Whether working on personal projects or collaborating in a team, my
          focus remains on clean code, innovative solutions, and exceeding
          client expectations.
        </p>
      </div>
      <div>
        <h2>Skills</h2>
        <ul>
          <li>HTML & CSS</li>
          <li>JavaScript & TypeScript</li>
          <li>React & Node.js</li>
          <li>Responsive Web Design</li>
          <li>Version Control (Git)</li>
          <li>Problem-Solving & Debugging</li>
        </ul>
      </div>
      <div>
        <h2>Contact Me</h2>
        <p>If you'd like to collaborate, feel free to reach out!</p>
        <a href="mailto:omkarmali51@gmail.com">Get in Touch</a>
      </div>
    </>
  );
}
