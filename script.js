//Open/close window
    function toggleWindow(id) 
    {
      const win = document.getElementById(id);
      win.style.display = win.style.display === 'none' ? 'block' : 'none';
    }

    //Close button func
    function closeWindow(id) 
    {
      document.getElementById(id).style.display = 'none';
    }

    //Clock update
    function updateClock() 
    {
      const now = new Date();
      document.getElementById('clock').textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    //Dragging func
    document.querySelectorAll('.window').forEach(makeDraggable);

    function makeDraggable(el) {
      const titleBar = el.querySelector('.title-bar');
      let offsetX = 0, offsetY = 0, isDown = false;

      titleBar.addEventListener('mousedown', (e) => {
        isDown = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
        el.style.zIndex = parseInt(el.style.zIndex || 1) + 1;
      });

      document.addEventListener('mouseup', () => isDown = false);

      document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        el.style.left = (e.clientX - offsetX) + 'px';
        el.style.top = (e.clientY - offsetY) + 'px';
      });
    }
     //Opens fake Explorer view
    function openExplorer(projectId) 
    {
    closeWindow('projects');

    const explorer = document.getElementById('explorer');
    const title = document.getElementById('explorer-title');
    const content = document.getElementById('explorer-content');

    const titles = 
    {
      allcats: "All Cats Must Die",
      zombie: "PCOS Tracker (SFML)",
      cluedo: "Top-Cat Cluedo UI (Java)"
    };
    title.textContent = titles[projectId] || "Project";

    switch (projectId) 
    {
      case 'allcats':
  content.innerHTML = `
    <h2>All Cats Must Die</h2>
    <p><em>🏆 Winner of the "Most Commended Game" award at Games Fleadh 2025 🏆</em></p>
    
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
      <div style="flex: 1 1 60%; min-width: 300px;">
        <p><strong>Tools Used:</strong> Construct 3</p>
        <p><strong>Description:</strong><br><br>
        All Cats Must Die is a fast paced, chaotic 2D party platformer for two players. Players take turns placing obstacles and platforms to build the level then race across it.</p>
        <p>The catch? You must sabotage your opponent while making sure you survive yourself!</p>
        <p><strong>Features:</strong></p>
        <ul>
          <li>Build as you play level system with competitive sabotage mechanics</li>
          <li>Stylized pixel art with expressive animations and UI</li>
          <li>Muttiple levels</li>
          <li>Fun and impactful sound effects and music</li>
        </ul>
        <p><strong>What I Learned:</strong><br>
        Implementing different machines, balancing level pacing in a party setting, level building and engaging gameplay using Construct 3.</p>
      </div>
      
      <div style="flex: 1 1 35%; min-width: 280px; padding-left: 20px;">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/DnbOiE1-alE" 
          title="All Cats Must Die Trailer" frameborder="0" allowfullscreen></iframe>
        <p style="text-align: center;"><em>Watch the trailer</em></p>
      </div>
    </div>

    <h3>Gallery</h3><p><em>Click to enlarge photos</em> </p>
<div style="display: flex; overflow-x: auto; gap: 10px; padding-top: 10px;">
  <img src="images/allCats/allcats5.jpg" alt="Screenshot 1" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/allCats/allcats6.jpg" alt="Screenshot 2" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/allCats/allcats1.png" alt="Screenshot 3" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/allCats/allcats2.png" alt="Screenshot 4" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/allCats/allcats3.png" alt="Screenshot 5" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/allCats/allcats4.png" alt="Screenshot 6" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/allCats/allcats7.jpg" alt="Screenshot 7" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/allCats/allcats8.jpg" alt="Screenshot 8" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
</div>

  `;
  break;

  case 'portfolioWebsite':
  content.innerHTML = `
    <h2>Portfolio Website</h2>
    <p><em>An old Windows XP themed personal website made using HTML, CSS and JavaScript</em></p>

    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
      <div style="flex: 1 1 60%; min-width: 300px;">
        <p><strong>Tools Used:</strong> HTML, CSS, JavaScript, GitHub Pages</p>
        <p><strong>Description:</strong><br><br>
        This portfolio site was built from scratch to reflect my love for old tech and operating systems. It acts as a showcase to show all my personal and college projects, skills and contact information.</p>

        <p><strong>Features:</strong></p>
        <ul>
          <li>XP style interface with draggable windows</li>
          <li>Project viewer with fullscreen explorer sections</li>
          <li>Stylized CV display and contact links</li>
          <li>GitHub Pages deployment with custom domain</li>
          <li>Basic site analytics to track visits and user interaction (using google analytics)</li>
        </ul>

        <p><strong>What I Learned:</strong><br>
        Designing nostalgic layouts with modern code, managing GitHub Pages deployments and structuring interactive project views in JS.</p>

        <p>
          <a href="https://github.com/laurenHBpencil/laurenbrampton.com" target="_blank" style="display: inline-block; margin-top: 10px; margin-left: 10px; padding: 10px 15px; background-color: #000080; color: white; text-decoration: none; border-radius: 5px;">
            View on GitHub
          </a>
        </p>
      </div>

      <div style="flex: 1 1 35%; min-width: 280px; padding-left: 20px;">
        <img src="images/portfolio/site.png" alt="Portfolio Screenshot" style="width: 100%; border-radius: 5px;">
        <p style="text-align: center;"><em>Screenshot: Homepage</em></p>
      </div>
    </div>
    <h3>Gallery</h3><p><em>Click to enlarge photos</em> </p>
  <div style="display: flex; overflow-x: auto; gap: 10px; padding-top: 10px;">
    <img src="images/portfolio/allOpen.png" alt="All Sections Open" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/portfolio/pyOpen.png" alt="Project Tab Open onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/portfolio/enlargedPng.png" alt="Photo Enlarged On Click" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/portfolio/youtubeExample.png" alt="Youtube Video Displayed & Playable" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/portfolio/site.png" alt="Homepage" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  </div>
  `;
  break;

      case 'pcosTracker':
         content.innerHTML = `
  <h2>PCOS Tracker</h2>
  <p><em>A personal health tracking web app made for assignment submission in Java Web Development</em></p>
  
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    <div style="flex: 1 1 60%; min-width: 300px;">
      <p><strong>Tools Used:</strong> Java EE (Servlets & JSP), NetBeans, MySQL, JDBC</p>
      <p><strong>Description:</strong><br><br>
      PCOS Tracker is a Java-based web application that allows users to register, log in and track their menstrual cycles, PCOS symptoms, research lifestyle habits and mental health.</p>
      <p>The application is designed for privacy and ease of use, helping users identify patterns and control of their health data.</p>
      <p><strong>Features:</strong></p>
      <ul>
        <li>User registration and login with session management</li>
        <li>Cycle and symptom logging with notes, severity and timestamp</li>
        <li>Clean interface with navbar and protected pages</li>
        <li>MySQL database integration using JDBC</li>
      </ul>
      <p><strong>What I Learned:</strong><br>
      Building a full stack Java web app from scratch with servlets and JSP, managing session based authentication, and working directly with JDBC for SQL queries and security.</p>

      <p><a href="https://github.com/laurenHBpencil/PCOSTracker" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #000080; color: white; text-decoration: none; border-radius: 5px;">
        View on GitHub
      </a></p>
    </div>
    
    <div style="flex: 1 1 35%; min-width: 280px; padding-left: 20px;">
      <img src="images/pcosTracker/main.png" alt="PCOS Tracker Screenshot" style="width: 100%; border-radius: 5px;">
      <p style="text-align: center;"><em>Screenshot: Main dashboard</em></p>
    </div>
  </div>

  <h3>Gallery</h3><p><em>Click to enlarge photos</em> </p>
<div style="display: flex; overflow-x: auto; gap: 10px; padding-top: 10px;">
  <img src="images/pcosTracker/main.png" alt="Main Page" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/login.png" alt="Login Page" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/register.png" alt="Register Page" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/logmen.png" alt="Cycle Log Table" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/loggedmen.png" alt="Cycle Logged Table" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/logpcos.png" alt="Symptom Log Table" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/loggedpcos.png" alt="Symptom Logged Table" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/lifestyle.png" alt="Lifestyle Tracker" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/mentalhealth.png" alt="Mental Health Form" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/sqlUser.png" alt="SQL User Table" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/sqlCycle.png" alt="SQL Cycle Table" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  <img src="images/pcosTracker/sqlSymp.png" alt="SQL Symptom Table" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
</div>

`;
break;


          case 'cluedo': 
  content.innerHTML = `
  <h2>Cluedo UI</h2>
  <p><em> A Java based digital Top-Cat themed board game inspired by classic Cluedo </em></p>

  <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    <div style="flex: 1 1 60%; min-width: 300px;">
      <p><strong>Tools Used:</strong> Java, Java Swing</p>
      <p><strong>Description:</strong><br><br>
      Top-Cat Cluedo UI is a digital version of the classic detective board game built using Java and Swing. Players take turns moving around the board, entering rooms and making accusations based on dealt cards.</p>

      <p><strong>Features:</strong></p>
      <ul>
        <li>Turn based gameplay with dice rolls and player tracking</li>
        <li>Custom UI elements for rooms, characters and cards</li>
        <li>Card dealing system with suspects, weapons and rooms</li>
        <li>Accusation system with logic to determine correct guesses</li>
        <li>Player specific notes/checklist system</li>
        <li>Game analytics saved automatically to a .txt file</li>
        <li>Expandable and modular object oriented structure</li>
      </ul>

      <p><strong>What I Learned:</strong><br>
      Swing-based UI design, game state handling, lambda expressions, file writing in Java, object oriented programming and managing inter-class communication in larger Java projects.</p>

      <p><a href="https://github.com/laurenHBpencil/CluedoTopcat" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #000080; color: white; text-decoration: none; border-radius: 5px;">
        View on GitHub
      </a></p>
    </div>

    <div style="flex: 1 1 35%; min-width: 280px; padding-left: 20px;">
      <img src="images/cluedo/cluedoui.png" alt="Cluedo UI Screenshot" style="width: 100%; border-radius: 5px;">
      <p style="text-align: center;"><em>Screenshot: Game interface</em></p>
    </div>
  </div>

  <h3>Gallery</h3><p><em>Click to enlarge photos</em> </p>
  <div style="display: flex; overflow-x: auto; gap: 10px; padding-top: 10px;">
    <img src="images/cluedo/cluedoui.png" alt="Main UI" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/cluedo/cards.png" alt="Cards" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/cluedo/notes.png" alt="Notes" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/cluedo/rules.png" alt="Rules" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/cluedo/errorpopup.png" alt="Error Popup" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;"> 
    <img src="images/cluedo/suggestion.png" alt="Suggestion Popup" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/cluedo/suggestion2.png" alt="Suggestion Popup2" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/cluedo/win.png" alt="Win Screen" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/cluedo/terminal.png" alt="Terminal" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/cluedo/analytics.png" alt="Analytics.txt" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  </div>
  `;
  break;
            case 'clientServer':
  content.innerHTML = `
  <h2>Python Client-Server Numbers</h2>
  <p><em>A basic socket-based number evaluator made for networking assignment.</em></p>

  <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    <div style="flex: 1 1 60%; min-width: 300px;">
      <p><strong>Tools Used:</strong> Python, Sockets (TCP), Terminal, Virtual Box</p>
      <p><strong>Description:</strong><br><br>
      A simple functional Python project where the client sends a number to the server and the server responds with evaluations such as whether the number is even/odd and whether it's a power of 2.</p>

      <p><strong>Features:</strong></p>
      <ul>
        <li>Client connects to server via TCP sockets</li>
        <li>Server accepts connections and processes number input</li>
        <li>Server returns messages (e.g "Even" and "Power of 2")</li>
        <li>Error handling for invalid inputs</li>
      </ul>

      <p><strong>What I Learned:</strong><br>
      Fundamentals of network programming using Python sockets, server-client data flow and simple protocol design for communication.</p>

      <p><a href="https://github.com/laurenHBpencil/Python-Client-Server-Numbers" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #000080; color: white; text-decoration: none; border-radius: 5px;">
        View on GitHub
      </a></p>
    </div>

    <div style="flex: 1 1 35%; min-width: 280px; padding-left: 20px;">
      <img src="images/clientServer/serverClient3.png" alt="Python Server Terminal" style="width: 100%; border-radius: 5px;">
      <p style="text-align: center;"><em>Screenshot: Client and Server terminal output</em></p>
    </div>
  </div>

  <h3>Gallery</h3><p><em>Click to enlarge photos</em> </p>
  <div style="display: flex; overflow-x: auto; gap: 10px; padding-top: 10px;">
    <img src="images/clientServer/serverClient1.png" alt="Terminal Example" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/clientServer/serverClient2.png" alt="Terminal Example 2" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    <img src="images/clientServer/serverClient3.png" alt="Terminal Example 3" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
  </div>
  `;
  break;

      default:
        content.innerHTML = `<p>404: Project details not found!!</p>`;
    }

    explorer.style.display = 'block';
  }
  //Show images enlarged
  function showImageModal(src) 
  {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modalImg.src = src;
  modal.style.display = 'flex';
}

function closeImageModal() 
{
  document.getElementById('imageModal').style.display = 'none';
}
