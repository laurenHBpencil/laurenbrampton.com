// Metadata for each window (label + icon) used to build taskbar tabs
const WINDOW_META = {
  about: { label: 'About Me', icon: 'images/icons/info.png' },
  projects: { label: 'Projects', icon: 'images/icons/cmd.png' },
  skills: { label: 'Skills', icon: 'images/icons/settings.png' },
  education: { label: 'Education & Certs', icon: 'images/icons/certs.png' },
  experience: { label: 'Experience', icon: 'images/icons/experience.png' },
  cv: { label: 'CV', icon: 'images/icons/note.png' },
  contact: { label: 'Contact', icon: 'images/icons/contact.png' },
  githubProjects: { label: 'GitHub Projects', icon: 'images/icons/folder.png' },
  achievements: { label: 'Achievements', icon: 'images/icons/certs.png' },
  recycle: { label: 'Recycle Bin', icon: 'images/icons/folder.png' },
  playAllcats: { label: 'All Cats Must Die', icon: 'images/icons/cmd.png' },
  playCluedo: { label: 'Cluedo (Java)', icon: 'images/icons/cmd.png' },
  playTimber: { label: 'Custom Timber (SFML)', icon: 'images/icons/cmd.png' },
  playThomas: { label: 'Thomas Was Late (SFML)', icon: 'images/icons/cmd.png' },
  explorer: { label: 'Explorer', icon: 'images/icons/cmd.png' }
};

// Rising z-index so the most recently focused window sits on top
let zCounter = 10;
// Used to cascade newly opened windows so they don't stack exactly
let cascadeStep = 0;

// Open a window from a desktop icon (or focus it if already open)
function toggleWindow(id) {
  const win = document.getElementById(id);
  const isVisible = win.style.display !== 'none' && win.style.display !== '';
  if (isVisible) {
    focusWindow(id);
  } else {
    win.style.display = 'block';
    cascadeWindow(win);
    addTaskbarTab(id);
    focusWindow(id);
    saveOpenWindows();
  }
}

// Offset each newly opened window slightly so multiple windows don't overlap exactly
function cascadeWindow(win) {
  if (win.id === 'explorer' || win.classList.contains('maximized')) return;
  const offset = 30 + (cascadeStep % 6) * 26;
  win.style.left = offset + 'px';
  win.style.top = (40 + (cascadeStep % 6) * 26) + 'px';
  cascadeStep++;
}

// Bring a window to the front and mark it (and its tab) active
function focusWindow(id) {
  const win = document.getElementById(id);
  win.style.display = 'block';
  zCounter += 1;
  win.style.zIndex = zCounter;
  document.querySelectorAll('.window').forEach(w => w.classList.remove('active-window'));
  win.classList.add('active-window');
  setActiveTab(id);
  initGameFrames(win);
}

// Minimise: hide the window but keep its taskbar tab
function minimizeWindow(id) {
  const win = document.getElementById(id);
  win.style.display = 'none';
  win.classList.remove('active-window');
  const tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.remove('active');
}

// Close button: hide the window and remove its taskbar tab
function closeWindow(id) {
  const win = document.getElementById(id);
  win.style.display = 'none';
  win.classList.remove('active-window');
  removeTaskbarTab(id);
  saveOpenWindows();
}

// Add (or update) a taskbar tab for a window
function addTaskbarTab(id, customLabel) {
  const tabs = document.getElementById('taskbar-tabs');
  const meta = WINDOW_META[id] || { label: id, icon: '' };
  const label = customLabel || meta.label;
  let tab = document.getElementById('tab-' + id);
  if (tab) {
    tab.querySelector('.tab-label').textContent = label;
    tab.title = label;
    return tab;
  }
  tab = document.createElement('div');
  tab.className = 'taskbar-tab';
  tab.id = 'tab-' + id;
  tab.title = label;
  tab.innerHTML = `${meta.icon ? `<img src="${meta.icon}" alt="">` : ''}<span class="tab-label">${label}</span>`;
  tab.addEventListener('click', () => onTabClick(id));
  tabs.appendChild(tab);
  return tab;
}

// Remove a taskbar tab
function removeTaskbarTab(id) {
  const tab = document.getElementById('tab-' + id);
  if (tab) tab.remove();
}

// Highlight the active window's tab
function setActiveTab(id) {
  document.querySelectorAll('.taskbar-tab').forEach(t => t.classList.remove('active'));
  const tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.add('active');
}

// Clicking a tab: minimise if it's the active window, otherwise focus/restore it
function onTabClick(id) {
  const win = document.getElementById(id);
  const isVisible = win.style.display !== 'none' && win.style.display !== '';
  const isActive = win.classList.contains('active-window');
  if (isVisible && isActive) {
    minimizeWindow(id);
  } else {
    focusWindow(id);
  }
}

//Clock update
function updateClock() {
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

  addWindowControls(el);

  // Clicking anywhere in a window brings it to the front
  el.addEventListener('mousedown', () => focusWindow(el.id));

  // Double-click the title bar to maximize / restore
  titleBar.addEventListener('dblclick', () => toggleMaximize(el.id));

  titleBar.addEventListener('mousedown', (e) => {
    isDown = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
  });

  document.addEventListener('mouseup', () => isDown = false);

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
  });
}
//Opens fake Explorer view
function openExplorer(projectId) {
  closeWindow('projects');

  const explorer = document.getElementById('explorer');
  const title = document.getElementById('explorer-title');
  const content = document.getElementById('explorer-content');

  const titles =
  {
    numworlds: "NumWorlds (Unreal Engine)",
    allcats: "All Cats Must Die",
    portfolioWebsite: "Portfolio Website (HTML/CSS/JS)",
    pcosTracker: "PCOS Tracker (Java EE)",
    cluedo: "Top-Cat Cluedo UI (Java)",
    clientServer: "Python Client-Server (Sockets)"
  };
  title.textContent = titles[projectId] || "Project";

  switch (projectId) {
    case 'numworlds':
      content.innerHTML = `
    <h2>NumWorlds</h2>
    <p><em>A cozy, brain-teasing puzzle adventure released on Steam & mobile, developed at Black Pug Studio</em></p>

    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
      <div style="flex: 1 1 60%; min-width: 300px;">
        <p><strong>Tools Used:</strong> Unreal Engine, C++</p>
        <p><strong>Role:</strong> Game Programmer Intern @ Black Pug Studio (Galway)</p>
        <p><strong>Description:</strong><br><br>
        NumWorlds is a cozy, brain-teasing puzzle adventure. Chain numbers through the sunken city of Atlantis and the
        age of dinosaurs, across 200+ handcrafted levels plus an endless mode to get lost in, all at your own pace.</p>
        <p>I contributed to the game during my internship at Black Pug Studio, working on gameplay and content
        implementation, testing and iteration within an existing production project and team workflow.</p>

        <p><strong>What I Did:</strong></p>
        <ul>
          <li>Developed and tested gameplay features using Unreal Engine and C++</li>
          <li>Implemented gameplay content across a game with 200+ levels</li>
          <li>Collaborated with the team on debugging, iteration and release-focused tasks</li>
          <li>Adapted to established studio workflows and development tools</li>
        </ul>

        <p><strong>What I Learned:</strong><br>
        Working within a commercial production codebase, professional studio workflows, and shipping and iterating on a
        released title.</p>

        <p>
          <a href="https://numworlds.com/" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #000080; color: white; text-decoration: none; border-radius: 5px;">
            View Game
          </a>
          <a href="https://store.steampowered.com/app/4792970/NumWorlds/" target="_blank" style="display: inline-block; margin-top: 10px; margin-left: 10px; padding: 10px 15px; background-color: #1b2838; color: white; text-decoration: none; border-radius: 5px;">
            View on Steam
          </a>
        </p>
      </div>

      <div style="flex: 1 1 35%; min-width: 280px; padding-left: 20px;">
        <img src="images/numworlds/header.jpg" alt="NumWorlds" style="width: 100%; border-radius: 5px;">
        <p style="text-align: center;"><em>Developed & published by Black Pug Studio</em></p>
      </div>
    </div>

    <h3>Gallery</h3><p><em>Click to enlarge photos</em> </p>
    <div style="display: flex; overflow-x: auto; gap: 10px; padding-top: 10px;">
      <img src="images/numworlds/screenshot1.jpg" alt="NumWorlds Screenshot 1" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
      <img src="images/numworlds/screenshot2.jpg" alt="NumWorlds Screenshot 2" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
      <img src="images/numworlds/screenshot3.jpg" alt="NumWorlds Screenshot 3" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
      <img src="images/numworlds/screenshot4.jpg" alt="NumWorlds Screenshot 4" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
      <img src="images/numworlds/screenshot5.jpg" alt="NumWorlds Screenshot 5" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
      <img src="images/numworlds/screenshot6.jpg" alt="NumWorlds Screenshot 6" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
      <img src="images/numworlds/screenshot7.jpg" alt="NumWorlds Screenshot 7" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
      <img src="images/numworlds/screenshot8.jpg" alt="NumWorlds Screenshot 8" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
    </div>
  `;
      break;

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
          <li>Multiple levels</li>
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
          <a href="https://laurenbrampton.com" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #008000; color: white; text-decoration: none; border-radius: 5px;">
            View Live Site
          </a>
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
    <img src="images/portfolio/pyOpen.png" alt="Project Tab Open" onclick="showImageModal(this.src)" style="height: 200px; border-radius: 5px; cursor: zoom-in;">
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
  // Label the taskbar tab with the current project's name
  addTaskbarTab('explorer', titles[projectId] || 'Explorer');
  focusWindow('explorer');
}
//Show images enlarged
function showImageModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modalImg.src = src;
  modal.style.display = 'flex';
}

function closeImageModal() {
  document.getElementById('imageModal').style.display = 'none';
}

/* ============================================================
   Window controls, Start menu, context menu, boot & extras
   ============================================================ */

// Inject minimize / maximize buttons into a window's title bar
function addWindowControls(el) {
  const titleBar = el.querySelector('.title-bar');
  if (!titleBar) return;
  const closeBtn = titleBar.querySelector('.close-btn');
  if (closeBtn) closeBtn.classList.add('caption-btn', 'caption-close');

  const maxBtn = document.createElement('span');
  maxBtn.className = 'caption-btn caption-max';
  maxBtn.textContent = '\u25A1'; // square
  maxBtn.title = 'Maximize / Restore';
  maxBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMaximize(el.id); });

  const minBtn = document.createElement('span');
  minBtn.className = 'caption-btn caption-min';
  minBtn.textContent = '\u2013'; // dash
  minBtn.title = 'Minimize';
  minBtn.addEventListener('click', (e) => { e.stopPropagation(); minimizeWindow(el.id); });

  titleBar.appendChild(minBtn);
  titleBar.appendChild(maxBtn);
}

// Maximize a window to fill the screen (above the taskbar), or restore it
function toggleMaximize(id) {
  const win = document.getElementById(id);
  focusWindow(id);
  if (win.classList.contains('maximized')) {
    win.classList.remove('maximized');
    win.style.top = win.dataset.prevTop || '50px';
    win.style.left = win.dataset.prevLeft || '50px';
    win.style.width = win.dataset.prevWidth || '';
    win.style.height = win.dataset.prevHeight || '';
  } else {
    win.dataset.prevTop = win.style.top;
    win.dataset.prevLeft = win.style.left;
    win.dataset.prevWidth = win.style.width;
    win.dataset.prevHeight = win.style.height;
    win.classList.add('maximized');
    win.style.top = '0px';
    win.style.left = '0px';
    win.style.width = '100vw';
    win.style.height = 'calc(100vh - 40px)';
  }
}

/* ---- Start menu ---- */
function toggleStartMenu(e) {
  if (e) e.stopPropagation();
  document.getElementById('start-menu').classList.toggle('open');
  hideContextMenu();
}

function hideStartMenu() {
  document.getElementById('start-menu').classList.remove('open');
}

function startOpen(id) {
  hideStartMenu();
  toggleWindow(id);
  focusWindow(id);
}

/* ---- Right-click context menu ---- */
function showContextMenu(e) {
  // Only on the desktop background, not inside windows / menus / taskbar
  if (e.target.closest('.window') || e.target.closest('#start-menu') || e.target.closest('.taskbar')) return;
  e.preventDefault();
  const menu = document.getElementById('context-menu');
  const x = Math.min(e.clientX, window.innerWidth - 190);
  const y = Math.min(e.clientY, window.innerHeight - 170);
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.classList.add('open');
}

function hideContextMenu() {
  document.getElementById('context-menu').classList.remove('open');
}

document.addEventListener('contextmenu', showContextMenu);
document.addEventListener('click', () => { hideStartMenu(); hideContextMenu(); });

/* ---- Keyboard support ---- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideStartMenu();
    hideContextMenu();
    const active = document.querySelector('.window.active-window');
    if (active) closeWindow(active.id);
  }
});

/* ---- Desktop icons: double-click to open (single-tap on touch), keyboard support ---- */
// Perform an icon's action: open its window or follow its link
function activateIcon(icon) {
  const winId = icon.getAttribute('data-window');
  const href = icon.getAttribute('data-href');
  if (winId) {
    toggleWindow(winId);
  } else if (href) {
    window.open(href, '_blank', 'noopener');
  }
}

// Touch devices use a single tap; mouse uses double-click (true to XP)
const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

document.querySelectorAll('.desktop .icon').forEach((icon) => {
  icon.setAttribute('tabindex', '0');
  icon.setAttribute('role', 'button');

  if (isTouch) {
    icon.addEventListener('click', () => activateIcon(icon));
  } else {
    icon.addEventListener('dblclick', () => activateIcon(icon));
    // Single click just selects/highlights the icon (like XP)
    icon.addEventListener('click', () => {
      document.querySelectorAll('.desktop .icon').forEach((i) => i.classList.remove('selected'));
      icon.classList.add('selected');
    });
  }

  icon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activateIcon(icon);
    }
  });
});

/* ---- Contact form (via FormSubmit.co AJAX — posts to email, no backend) ---- */
function sendContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('contact-status');
  const btn = form.querySelector('button[type="submit"]');
  const data = {
    name: form.elements['name'].value,
    email: form.elements['email'].value,
    message: form.elements['message'].value,
    _subject: 'New message from laurenbrampton.com'
  };
  status.textContent = 'Sending…';
  status.className = 'form-status';
  btn.disabled = true;

  fetch('https://formsubmit.co/ajax/laurenbrampton2003@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then(() => {
      status.textContent = 'Thanks! Your message has been sent. \u{1F60A}';
      status.className = 'form-status success';
      form.reset();
    })
    .catch(() => {
      status.textContent = 'Something went wrong — please email me directly instead.';
      status.className = 'form-status error';
    })
    .finally(() => { btn.disabled = false; });

  return false;
}

/* ---- Remember which windows were open (localStorage) ---- */
function saveOpenWindows() {
  try {
    const open = [];
    document.querySelectorAll('.window').forEach((w) => {
      if (w.id !== 'explorer' && w.id !== 'imageModal' &&
        w.style.display !== 'none' && w.style.display !== '') {
        open.push(w.id);
      }
    });
    localStorage.setItem('openWindows', JSON.stringify(open));
  } catch (err) { /* storage unavailable */ }
}

function restoreOpenWindows() {
  try {
    const open = JSON.parse(localStorage.getItem('openWindows') || '[]');
    open.forEach((id) => {
      const win = document.getElementById(id);
      if (win) {
        win.style.display = 'block';
        cascadeWindow(win);
        addTaskbarTab(id);
        focusWindow(id);
      }
    });
  } catch (err) { /* storage unavailable */ }
}

/* ---- Retro visitor counter (per-browser, stored locally) ---- */
function initVisitorCounter() {
  let count = parseInt(localStorage.getItem('visitCount') || '0', 10) + 1;
  try { localStorage.setItem('visitCount', count); } catch (err) { /* ignore */ }
  const el = document.createElement('div');
  el.id = 'visitor-counter';
  el.innerHTML = 'Visitor <span class="count">' + String(count).padStart(6, '0') + '</span>';
  el.title = 'Your visits to this site';
  document.body.appendChild(el);
}

/* ---- Boot / welcome splash ---- */
function initBootScreen() {
  const boot = document.getElementById('boot-screen');
  if (!boot) return;
  // Only show the splash once per browsing session
  if (sessionStorage.getItem('booted')) {
    boot.remove();
    return;
  }
  sessionStorage.setItem('booted', '1');
  setTimeout(() => {
    boot.classList.add('hidden');
    setTimeout(() => boot.remove(), 700);
  }, 2000);
}

/* ============================================================
   Playable games (embedded builds)
   ============================================================ */

// Lazily load any game iframes inside a window the first time it's shown.
// Each iframe carries a data-src pointing at its build; we only fetch it
// when the window is actually opened (keeps the homepage light).
function initGameFrames(win) {
  if (!win) return;
  win.querySelectorAll('iframe[data-src]:not([data-loaded])').forEach((frame) => {
    frame.setAttribute('data-loaded', '1');
    frame.addEventListener('load', () => handleGameLoad(frame));
    frame.src = frame.getAttribute('data-src');
  });
}

// After an iframe loads, decide whether it's the real game or a missing build.
// If the build isn't there yet, GitHub Pages serves our 404 page, which we
// detect by title so we can keep the friendly placeholder visible.
function handleGameLoad(frame) {
  const embed = frame.closest('.game-embed');
  if (!embed) return;
  const placeholder = embed.querySelector('.game-placeholder');
  let missing = false;
  try {
    const doc = frame.contentDocument;
    const title = ((doc && doc.title) || '').toLowerCase();
    if (title.includes('404') || title.includes('not found')) missing = true;
  } catch (e) {
    // Cross-origin (shouldn't happen for same-site builds) — assume it loaded fine.
  }
  if (placeholder) placeholder.style.display = missing ? 'flex' : 'none';
  embed.classList.toggle('game-loaded', !missing);
}

// Fullscreen the game area of a given window.
function gameFullscreen(winId) {
  const embed = document.querySelector('#' + winId + ' .game-embed');
  if (!embed) return;
  const target = embed.querySelector('iframe') || embed;
  const req = target.requestFullscreen || target.webkitRequestFullscreen || target.msRequestFullscreen;
  if (req) req.call(target);
}

// Launch the Cluedo Java app in-browser via CheerpJ (loaded on demand).
// Requires the built jar at games/cluedo/CluedoTopcat.jar (mounted at /app/ by CheerpJ).
let cheerpjReady = false;
function launchCluedo() {
  const btn = document.getElementById('cluedo-launch');
  const placeholder = document.getElementById('cluedo-placeholder');
  const embed = document.getElementById('cluedo-embed');
  if (btn) btn.disabled = true;
  if (placeholder) {
    placeholder.style.display = 'flex';
    placeholder.innerHTML = '<div class="game-placeholder-emoji">\u23F3</div><p>Loading the Java runtime\u2026</p>';
  }

  const showError = () => {
    if (placeholder) {
      placeholder.style.display = 'flex';
      placeholder.innerHTML = '<div class="game-placeholder-emoji">\u26A0\uFE0F</div>' +
        '<p><strong>Could not launch Cluedo.</strong></p>' +
        '<p>Make sure <code>games/cluedo/CluedoTopcat.jar</code> exists, then try again.</p>';
    }
    if (btn) btn.disabled = false;
  };

  const start = () => {
    if (placeholder) placeholder.style.display = 'none';
    try {
      // -1, -1 makes CheerpJ size its display to fill the parent element.
      cheerpjCreateDisplay(-1, -1, embed);
      cheerpjRunJar('/app/games/cluedo/CluedoTopcat.jar').catch(showError);
    } catch (e) {
      showError();
    }
  };

  if (cheerpjReady) {
    start();
    return;
  }

  // Load the CheerpJ runtime loader on demand (only when someone clicks Launch).
  const loader = document.createElement('script');
  loader.src = 'https://cjrtnc.leaningtech.com/3.0/cj3loader.js';
  loader.onload = async () => {
    try {
      await cheerpjInit();
      cheerpjReady = true;
      start();
    } catch (e) {
      showError();
    }
  };
  loader.onerror = showError;
  document.head.appendChild(loader);
}

/* ---- Init ---- */
initBootScreen();
initVisitorCounter();
restoreOpenWindows();
