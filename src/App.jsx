import { useState } from "react";
import {
  Bell,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  Home,
  Image,
  LayoutDashboard,
  Lock,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  User,
  Users,
  Wifi,
  Wrench,
  X,
} from "lucide-react";
import "./App.css";

const complaintsData = [
  {
    id: "#1243",
    title: "Broken Classroom AC",
    category: "Infrastructure",
    location: "Block A, Room 301",
    date: "20 Sep 2026",
    time: "10:30 AM",
    status: "Pending",
    priority: "High",
    image: "❄️",
    description:
      "The AC in Room 301 is not working since last week. The room gets very hot during lectures. Please look into this issue.",
  },
  {
    id: "#1242",
    title: "Library Wi-Fi Not Working",
    category: "Wi-Fi / IT",
    location: "Central Library",
    date: "18 Sep 2026",
    time: "04:20 PM",
    status: "In Progress",
    priority: "Medium",
    image: "📶",
    description:
      "Library Wi-Fi connectivity is unstable and students are unable to access online resources.",
  },
  {
    id: "#1241",
    title: "Washroom Cleaning Issue",
    category: "Cleanliness",
    location: "Block B, Ground Floor",
    date: "16 Sep 2026",
    time: "09:15 AM",
    status: "Resolved",
    priority: "Low",
    image: "🧹",
    description:
      "The washroom requires cleaning and regular maintenance.",
  },
  {
    id: "#1240",
    title: "Damaged Street Light",
    category: "Safety",
    location: "Main Pathway",
    date: "15 Sep 2026",
    time: "07:45 PM",
    status: "Rejected",
    priority: "High",
    image: "💡",
    description:
      "The street light near the main pathway is damaged.",
  },
  {
    id: "#1239",
    title: "Water Leakage in Lab",
    category: "Maintenance",
    location: "Block C, Lab 2",
    date: "12 Sep 2026",
    time: "11:10 AM",
    status: "Resolved",
    priority: "Medium",
    image: "💧",
    description:
      "Water leakage was noticed near the laboratory sink.",
  },
  {
    id: "#1238",
    title: "Broken Bench in Courtyard",
    category: "Infrastructure",
    location: "Main Ground",
    date: "10 Sep 2026",
    time: "02:30 PM",
    status: "Resolved",
    priority: "Low",
    image: "🪑",
    description: "A courtyard bench is damaged.",
  },
];

function Logo() {
  return (
    <div className="logo">
      <div className="logoIcon">
        <Shield size={23} fill="white" />
      </div>
      <div>
        <div className="logoText">
          Campus<span>Care</span>
        </div>
        <small>College Complaint Portal</small>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`statusBadge ${status.toLowerCase().replace(" ", "-")}`}>
      {status === "Resolved" && <CheckCircle2 size={14} />}
      {status === "Pending" && <Clock3 size={14} />}
      {status === "In Progress" && <Wrench size={14} />}
      {status === "Rejected" && <X size={14} />}
      {status}
    </span>
  );
}

function Sidebar({ role, page, setPage, logout }) {
  const studentItems = [
    ["Dashboard", "dashboard", Home],
    ["New Complaint", "new", Plus],
    ["My Complaints", "complaints", FileText],
    ["Notifications", "notifications", Bell],
    ["Profile", "profile", User],
  ];

  const adminItems = [
    ["Dashboard", "dashboard", LayoutDashboard],
    ["All Complaints", "complaints", FileText],
    ["Analytics", "analytics", ClipboardList],
    ["Users", "users", Users],
    ["Departments", "departments", Building2],
    ["Categories", "categories", BookOpen],
    ["Announcements", "announcements", Bell],
    ["Reports", "reports", FileText],
    ["Settings", "settings", Settings],
  ];

  const staffItems = [
    ["Dashboard", "dashboard", Home],
    ["Complaints Board", "board", ClipboardList],
    ["My Assigned", "assigned", User],
    ["All Complaints", "complaints", FileText],
    ["Calendar", "calendar", ClipboardList],
    ["Reports", "reports", FileText],
  ];

  const items =
    role === "Admin"
      ? adminItems
      : role === "Staff"
      ? staffItems
      : studentItems;

  return (
    <aside className={`sidebar ${role.toLowerCase()}`}>
      <Logo />

      <div className="sideLabel">
        {role === "Admin"
          ? "ADMIN PANEL"
          : role === "Staff"
          ? "STAFF PANEL"
          : "STUDENT PANEL"}
      </div>

      <nav>
        {items.map(([label, key, Icon]) => (
          <button
            key={key}
            className={page === key ? "sideItem active" : "sideItem"}
            onClick={() => setPage(key)}
          >
            <Icon size={20} />
            <span>{label}</span>

            {label === "Notifications" && (
              <span className="notificationCount">3</span>
            )}

            {label === "All Complaints" && role === "Staff" && (
              <span className="miniCount">248</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebarHelp">
        <div className="helpIcon">
          <MessageCircle size={22} />
        </div>
        <h4>Need Help?</h4>
        <p>Contact system admin for support.</p>
        <button>Contact Support</button>
      </div>

      <button className="logoutBtn" onClick={logout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

function Topbar({ role }) {
  return (
    <header className="topbar">
      <div className="searchBox">
        <Search size={19} />
        <input
          placeholder={
            role === "Admin"
              ? "Search complaints, users, locations..."
              : "Search complaints, categories..."
          }
        />
      </div>

      <div className="profileWrapper">
  <button
    className="profileMini"
    onClick={() => {
      const menu = document.getElementById("profileMenu");
      menu.classList.toggle("show");
    }}
  >
    <div className="avatar">AT</div>

    <div>
      <strong>
  {role === "Admin" ? "Admin User" : "Anuj Gupta"}
</strong>

<small>
  {role === "Admin"
    ? "Administrator"
    : `${role} • TE IT`}
</small>
    </div>

    <ChevronDown size={18} />
  </button>

  <div id="profileMenu" className="profileMenu">
    <button>👤 My Profile</button>
    <button>⚙️ Settings</button>

    <hr />

    <button
      className="logoutMenu"
      onClick={() => {
        window.location.reload();
      }}
    >
      🚪 Logout
    </button>
  </div>
</div>
      
    </header>
  );
}

function Landing({ onLogin }) {
  return (
    <div className="landing">
      <header className="landingNav">
        <Logo />

        <nav>
          <a className="active">Home</a>
          <a>About</a>
          <a>Features</a>
          <a>How It Works</a>
          <a>Contact</a>
        </nav>

        <div className="navButtons">
          <button onClick={() => onLogin("Student")} className="outlineBtn">
            🎓 Student Login
          </button>
          <button onClick={() => onLogin("Staff")} className="primaryBtn">
            👤 Staff Login
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="heroContent">
          <span className="eyebrow">A Smarter Campus. A Happier You.</span>

          <h1>
            Report Issues.
            <br />
            <span>Get Them Resolved.</span>
          </h1>

          <p>
            CampusCare makes it easy to report and track complaints related to
            infrastructure, facilities, academics and more — for a better,
            safer and cleaner campus.
          </p>

          <div className="heroButtons">
            <button
              className="heroPrimary"
              onClick={() => onLogin("Student")}
            >
              🎓 Student Login <ChevronRight />
            </button>

            <button
              className="heroSecondary"
              onClick={() => onLogin("Staff")}
            >
              👤 Staff Login <ChevronRight />
            </button>
          </div>
        </div>

        <div className="heroMockup">
          <div className="mockWindow">
            <div className="mockTop">
              <Logo />
              <input placeholder="Search complaints..." />
              <Bell size={18} />
              <div className="avatar">A</div>
            </div>

            <div className="mockBody">
              <div className="mockSide">
                <b>▣ Dashboard</b>
                <span>▤ My Complaints</span>
                <span>＋ New Complaint</span>
                <span>♧ Notifications</span>
                <span>♙ Profile</span>
              </div>

              <div className="mockMain">
                <div className="mockHeading">
                  <h3>My Complaints</h3>
                  <button>+ New Complaint</button>
                </div>

                {complaintsData.slice(0, 3).map((c) => (
                  <div className="mockComplaint" key={c.id}>
                    <div className="mockEmoji">{c.image}</div>
                    <div>
                      <strong>{c.title}</strong>
                      <small>{c.location}</small>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <Stat icon={<FileText />} value="1,248" label="Total Complaints" />
        <Stat
          icon={<CheckCircle2 />}
          value="1,086"
          label="Resolved Complaints"
        />
        <Stat icon={<Clock3 />} value="89%" label="Resolution Rate" />
        <Stat icon={<Users />} value="3,500+" label="Active Users" />
      </section>

      <section className="how">
        <div className="sectionHeading">
          <h2>How It Works</h2>
          <p>Reporting an issue takes less than a minute. Here's how it works:</p>
        </div>

        <div className="steps">
          <Step
            number="1"
            icon={<FileText />}
            title="Submit a Complaint"
            text="Choose a category, add details and submit your complaint."
          />
          <Step
            number="2"
            icon={<Wrench />}
            title="It Gets Assigned"
            text="Your complaint is routed to the right department."
          />
          <Step
            number="3"
            icon={<CheckCircle2 />}
            title="Track & Get Resolved"
            text="Track the status in real-time until it’s resolved."
          />
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="stat">
      <div className="statIcon">{icon}</div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Step({ number, icon, title, text }) {
  return (
    <div className="step">
      <div className="stepIcon">{icon}</div>
      <div className="stepNumber">{number}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Login({ role, setRole, onLogin, back }) {
  return (
    <div className="loginPage">
      <div className="loginLeft">
        <Logo />

        <div className="loginHero">
          <h1>
            A Better
            <br />
            Campus Experience
            <br />
            <span>Starts with You.</span>
          </h1>

          <p>
            Report issues, track progress and help us build a safer, cleaner
            and more student-friendly campus.
          </p>

          <div className="loginFeatures">
            <div>
              <div>📢</div>
              <b>Report</b>
              <span>Issues</span>
            </div>
            <div>
              <div>⚙️</div>
              <b>Faster</b>
              <span>Resolution</span>
            </div>
            <div>
              <div>👥</div>
              <b>Cleaner</b>
              <span>Campus</span>
            </div>
          </div>
        </div>

        <div className="campusIllustration">
          <div className="building">COLLEGE</div>
          <div className="trees">🌳 🌳 🌳 🌳 🌳</div>
        </div>
      </div>

      <div className="loginRight">
        <button className="backHome" onClick={back}>
          ← Back to Home
        </button>

        <div className="loginCard">
          <span className="welcome">WELCOME BACK</span>

          <h2>
            Login to Campus<span>Care</span>
          </h2>

          <p>Choose your role and sign in to continue.</p>

          <div className="roleTabs">
            {["Student", "Staff", "Admin"].map((r) => (
              <button
                key={r}
                className={role === r ? "selected" : ""}
                onClick={() => setRole(r)}
              >
                {r === "Student" ? "🎓" : r === "Staff" ? "👥" : "🛡️"} {r}
              </button>
            ))}
          </div>

          <label>Email Address</label>
          <div className="inputWrap">
            <span>✉</span>
            <input placeholder="you@college.edu" />
          </div>

          <label>Password</label>
          <div className="inputWrap">
            <Lock size={18} />
            <input type="password" placeholder="Enter your password" />
            <span>◉</span>
          </div>

          <div className="remember">
            <label>
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <a>Forgot password?</a>
          </div>

          <button className="loginSubmit" onClick={onLogin}>
            Login <ChevronRight />
          </button>

          <div className="or">
            <span />
            OR
            <span />
          </div>

          <button className="googleBtn">
            <b>G</b> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentDashboard({ setPage, setSelected }) {
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Welcome back, Anuj Gupta!</h1>
          <p>Here's an overview of your complaints and campus updates.</p>
        </div>

        <button className="primaryBtn" onClick={() => setPage("new")}>
          <Plus size={19} /> New Complaint
        </button>
      </div>

      <div className="metricGrid">
        <Metric icon={<FileText />} value="24" label="Total Complaints" />
        <Metric icon={<Clock3 />} value="6" label="Pending" />
        <Metric icon={<Wrench />} value="4" label="In Progress" />
        <Metric icon={<CheckCircle2 />} value="12" label="Resolved" />
      </div>

      <div className="contentCard">
        <div className="cardHeader">
          <h2>Recent Complaints</h2>
          <button onClick={() => setPage("complaints")}>
            View All <Arrow />
          </button>
        </div>

        <ComplaintTable
          data={complaintsData.slice(0, 5)}
          setSelected={setSelected}
        />
      </div>
    </>
  );
}

function Metric({ icon, value, label }) {
  return (
    <div className="metric">
      <div className="metricIcon">{icon}</div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
        <small>↗ +12% from last month</small>
      </div>
    </div>
  );
}

function Arrow() {
  return <ChevronRight size={18} />;
}

function ComplaintTable({ data, setSelected }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                <strong>{c.title}</strong>
              </td>
              <td>
                <span className="categoryTag">{c.category}</span>
              </td>
              <td>
                <MapPin size={14} /> {c.location}
              </td>
              <td>{c.date}</td>
              <td>
                <StatusBadge status={c.status} />
              </td>
              <td>
                <button
                  className="viewBtn"
                  onClick={() => setSelected(c)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NewComplaint({ setPage }) {
  const [step, setStep] = useState(1);

  return (
    <div className="formPage">
      <div className="pageHeader">
        <div>
          <h1>Submit a New Complaint</h1>
          <p>Help us keep the campus safe, clean and well-maintained.</p>
        </div>
      </div>

      <div className="formLayout">
        <div className="contentCard complaintForm">
          <div className="progressSteps">
            {[
              ["1", "Complaint Details"],
              ["2", "Location"],
              ["3", "Attachments"],
              ["4", "Review & Submit"],
            ].map(([num, text], i) => (
              <div
                className={step >= i + 1 ? "progressStep active" : "progressStep"}
                key={num}
              >
                <div>{num}</div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <label>Select Category *</label>
              <select>
                <option>Infrastructure</option>
                <option>Cleanliness</option>
                <option>Wi-Fi / IT</option>
                <option>Safety</option>
                <option>Maintenance</option>
                <option>Academics</option>
              </select>

              <label>Complaint Title *</label>
              <input placeholder="Enter a short title e.g. Broken Classroom AC" />

              <label>Description *</label>
              <textarea
                placeholder="Describe the issue in detail. Include any relevant information such as when you noticed it, how it affects you, etc."
                rows="5"
              />

              <label>Add Photos <small>(Optional)</small></label>
              <div className="uploadBox">
                <Image size={30} />
                <b>Drag and drop images here, or click to browse</b>
                <span>Supports JPG, PNG, HEIC (Max 5 MB each)</span>
              </div>

              <label>Urgency Level</label>
              <div className="urgency">
                <span>Low</span>
                <input type="range" min="1" max="4" defaultValue="2" />
                <span>Critical</span>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="stepContent">
              <label>Building / Block *</label>
              <select>
                <option>Block A</option>
                <option>Block B</option>
                <option>Block C</option>
                <option>Main Building</option>
              </select>

              <label>Room / Exact Location *</label>
              <input placeholder="e.g. Room 301" />

              <label>Additional Location Details</label>
              <textarea rows="4" placeholder="Add any additional details..." />
            </div>
          )}

          {step === 3 && (
            <div className="attachmentPage">
              <Image size={55} />
              <h2>Add Supporting Images</h2>
              <p>
                Upload photographs that can help the concerned department
                understand the issue.
              </p>

              <div className="uploadBox large">
                <Plus size={30} />
                <b>Click to upload or drag files here</b>
                <span>JPG, PNG, HEIC • Maximum 5 MB each</span>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="review">
              <CheckCircle2 size={60} />
              <h2>Review Your Complaint</h2>
              <p>Please verify the information before submitting.</p>

              <div className="reviewBox">
                <b>Category</b>
                <span>Infrastructure</span>
                <b>Title</b>
                <span>Broken Classroom AC</span>
                <b>Location</b>
                <span>Block A, Room 301</span>
              </div>
            </div>
          )}

          <div className="formActions">
            <button className="outlineBtn" onClick={() => setPage("dashboard")}>
              Cancel
            </button>

            {step < 4 ? (
              <button
                className="primaryBtn"
                onClick={() => setStep(step + 1)}
              >
                Next <ChevronRight />
              </button>
            ) : (
              <button
                className="primaryBtn"
                onClick={() => setPage("complaints")}
              >
                Submit Complaint <CheckCircle2 />
              </button>
            )}
          </div>
        </div>

        <div className="helpCard">
          <h3>💡 Need Help?</h3>
          <p>Be as detailed as possible and attach relevant photos.</p>

          <h4>Examples of good complaints:</h4>

          <ul>
            <li>✓ Clear description of the issue</li>
            <li>✓ Mention exact location</li>
            <li>✓ Add supporting photos</li>
            <li>✓ Specify when you noticed it</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Complaints({ setSelected }) {
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>My Complaints</h1>
          <p>Track the status of your complaints and view updates.</p>
        </div>

        <button className="primaryBtn">
          <Plus size={19} /> New Complaint
        </button>
      </div>

      <div className="filterBar">
        <div className="searchBox">
          <Search size={18} />
          <input placeholder="Search your complaints..." />
        </div>

        <select>
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <select>
          <option>All Categories</option>
          <option>Infrastructure</option>
          <option>Cleanliness</option>
          <option>Wi-Fi / IT</option>
        </select>

        <select>
          <option>All Time</option>
        </select>
      </div>

      <div className="contentCard">
        <ComplaintTable data={complaintsData} setSelected={setSelected} />
      </div>
    </>
  );
}

function ComplaintDetails({ complaint, setSelected }) {
  const c = complaint || complaintsData[0];

  return (
    <>
      <button className="backLink" onClick={() => setSelected(null)}>
        ← Back to My Complaints
      </button>

      <div className="detailGrid">
        <div>
          <div className="contentCard complaintDetail">
            <div className="detailTitle">
              <div>
                <StatusBadge status={c.status} />
                <h1>{c.title}</h1>
                <p>
                  {c.id} &nbsp; | &nbsp; {c.category} &nbsp; | &nbsp;
                  {c.location} &nbsp; | &nbsp; {c.date}
                </p>
              </div>
            </div>

            <p className="description">{c.description}</p>
          </div>

          <div className="contentCard">
            <h2>Status Timeline</h2>

            <div className="timeline">
              <Timeline
                done
                title="Complaint Submitted"
                text="Your complaint has been submitted successfully."
                date="20 Sep 2026 • 10:30 AM"
              />
              <Timeline
                done
                title="Assigned to Maintenance"
                text="Your complaint has been assigned to the maintenance team."
                date="20 Sep 2026 • 02:15 PM"
              />
              <Timeline
                active
                title="Work In Progress"
                text="Maintenance team has started working on the issue."
                date="21 Sep 2026 • 11:20 AM"
              />
              <Timeline
                title="Expected Resolution"
                text="Estimated completion time."
                date="24 Sep 2026"
              />
            </div>
          </div>

          <div className="contentCard comments">
            <div className="cardHeader">
              <h2>Comments & Updates</h2>
              <button className="outlineBtn">＋ Add Comment</button>
            </div>

            <Comment name="Abhinav Thakur (You)" text={c.description} />
            <Comment
              name="Maintenance Team"
              text="We have assigned a technician to check the issue. It will be resolved soon."
            />
            <Comment
              name="Maintenance Team"
              text="Technician has visited the location. Repair work is in progress."
            />

            <div className="commentInput">
              <input placeholder="Write a comment or add an update..." />
              <button>➤</button>
            </div>
          </div>
        </div>

        <aside className="detailsAside">
          <div className="contentCard">
            <h3>Complaint Information</h3>
            <Info label="Complaint ID" value={c.id} />
            <Info label="Category" value={c.category} />
            <Info label="Location" value={c.location} />
            <Info label="Submitted On" value={`${c.date}, ${c.time}`} />
            <Info label="Assigned To" value="Maintenance Team" />
          </div>

          <div className="contentCard">
            <h3>Attached Images (1)</h3>
            <div className="attachmentPreview">❄️</div>
          </div>

          <div className="contentCard feedback">
            <h3>Feedback</h3>
            <p>Rate your experience with the resolution process.</p>
            <div className="stars">☆ ☆ ☆ ☆ ☆</div>
            <textarea placeholder="Share your feedback (optional)..." />
            <button className="primaryBtn">Submit Feedback</button>
          </div>
        </aside>
      </div>
    </>
  );
}

function Timeline({ done, active, title, text, date }) {
  return (
    <div className="timelineItem">
      <div className={`timelineDot ${done ? "done" : active ? "active" : ""}`}>
        {done ? "✓" : ""}
      </div>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <time>{date}</time>
    </div>
  );
}

function Comment({ name, text }) {
  return (
    <div className="comment">
      <div className="avatar">AT</div>
      <div>
        <strong>{name}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="infoRow">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AdminDashboard() {
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of complaints, resolution status and campus insights.</p>
        </div>

        <button className="outlineBtn">📅 1 Sep 2026 - 30 Sep 2026</button>
      </div>

      <div className="metricGrid adminMetrics">
        <Metric icon={<FileText />} value="248" label="Total Complaints" />
        <Metric icon={<Clock3 />} value="62" label="Pending" />
        <Metric icon={<Wrench />} value="118" label="In Progress" />
        <Metric icon={<CheckCircle2 />} value="68" label="Resolved" />
      </div>

      <div className="analyticsGrid">
        <div className="contentCard">
          <h2>Complaints by Category</h2>

          <div className="barChart">
            {[
              ["Infrastructure", 72],
              ["Cleanliness", 45],
              ["Wi-Fi / IT", 38],
              ["Safety", 28],
              ["Maintenance", 24],
              ["Others", 41],
            ].map(([name, value]) => (
              <div className="barItem" key={name}>
                <div className="bar" style={{ height: `${value * 2.3}px` }}>
                  <span>{value}</span>
                </div>
                <small>{name}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="contentCard">
          <h2>Complaint Status Distribution</h2>

          <div className="donutArea">
            <div className="donut">
              <strong>248</strong>
              <span>Total</span>
            </div>

            <div className="legend">
              <span>🔵 Pending — 27%</span>
              <span>🟡 In Progress — 25%</span>
              <span>🔷 Resolved — 28%</span>
              <span>🟢 Rejected — 20%</span>
            </div>
          </div>
        </div>

        <div className="contentCard">
          <h2>Resolution Trends</h2>

          <div className="lineChart">
            <div className="lineLine" />
            <div className="chartLabels">
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>
        </div>

        <div className="contentCard">
          <h2>Complaints Heatmap</h2>

          <div className="heatmap">
            🔴
            <span>🔴</span>
            <b>🔥</b>
            <i>🟡</i>
          </div>
        </div>
      </div>

      <div className="contentCard">
        <div className="cardHeader">
          <h2>Recent Complaints</h2>
          <button>View All →</button>
        </div>

        <ComplaintTable data={complaintsData.slice(0, 3)} />
      </div>
    </>
  );
}

function AllComplaints() {
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Manage Complaints</h1>
          <p>View, filter, assign and track all complaints from the campus.</p>
        </div>

        <div>
          <button className="outlineBtn">Export</button>
          <button className="primaryBtn">＋ Add Complaint</button>
        </div>
      </div>

      <div className="metricGrid">
        <Metric icon={<FileText />} value="248" label="Total Complaints" />
        <Metric icon={<Clock3 />} value="62" label="Pending" />
        <Metric icon={<Wrench />} value="118" label="In Progress" />
        <Metric icon={<CheckCircle2 />} value="68" label="Resolved" />
      </div>

      <div className="filterBar">
        <div className="searchBox">
          <Search size={18} />
          <input placeholder="Search by title, description, ID..." />
        </div>
        <select>
          <option>All Categories</option>
        </select>
        <select>
          <option>All Statuses</option>
        </select>
        <select>
          <option>All Priorities</option>
        </select>
        <select>
          <option>All Departments</option>
        </select>
      </div>

      <div className="contentCard">
        <ComplaintTable data={complaintsData} />
      </div>
    </>
  );
}

function StaffBoard() {
  const assigned = complaintsData.slice(0, 3);
  const progress = complaintsData.slice(1, 4);
  const resolved = complaintsData.slice(2, 5);

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Complaint Management Board</h1>
          <p>Drag and drop cards to update the status of complaints.</p>
        </div>

        <button className="primaryBtn">＋ Add Complaint</button>
      </div>

      <div className="boardFilters">
        <button className="outlineBtn">⚱ Filter</button>
        <select>
          <option>All Categories</option>
        </select>
        <select>
          <option>All Priorities</option>
        </select>
      </div>

      <div className="kanban">
        <KanbanColumn title="Assigned" color="blue" data={assigned} />
        <KanbanColumn title="In Progress" color="yellow" data={progress} />
        <KanbanColumn title="Resolved" color="green" data={resolved} />
      </div>
    </>
  );
}

function KanbanColumn({ title, color, data }) {
  return (
    <div className={`kanbanColumn ${color}`}>
      <div className="kanbanHeader">
        <h2>{title}</h2>
        <span>{data.length}</span>
        <Plus size={20} />
      </div>

      {data.map((c) => (
        <div className="kanbanCard" key={c.id}>
          <div className="cardImage">{c.image}</div>

          <h3>{c.title}</h3>

          <div className="kanbanTags">
            <span>{c.category}</span>
            <span>{c.priority}</span>
          </div>

          <small>
            {c.id} • {c.location}
          </small>

          <div className="assignedUser">
            <div className="avatar">AT</div>
            Abhinav Thakur
          </div>
        </div>
      ))}
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="emptyPage">
      <Sparkles size={50} />
      <h1>{title}</h1>
      <p>This section is ready for your next frontend module.</p>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [role, setRole] = useState("Student");
  const [page, setPage] = useState("dashboard");
  const [selected, setSelected] = useState(null);

  const login = (selectedRole = role) => {
    setRole(selectedRole);
    setPage("dashboard");
    setScreen("app");
  };

  const logout = () => {
    setScreen("landing");
    setSelected(null);
  };

  if (screen === "landing") {
    return <Landing onLogin={(r) => {
      setRole(r);
      setScreen("login");
    }} />;
  }

  if (screen === "login") {
    return (
      <Login
        role={role}
        setRole={setRole}
        onLogin={() => login(role)}
        back={() => setScreen("landing")}
      />
    );
  }

  const renderPage = () => {
    if (selected) {
      return (
        <ComplaintDetails
          complaint={selected}
          setSelected={setSelected}
        />
      );
    }

    if (role === "Student") {
      switch (page) {
        case "dashboard":
          return (
            <StudentDashboard
              setPage={setPage}
              setSelected={setSelected}
            />
          );
        case "new":
          return <NewComplaint setPage={setPage} />;
        case "complaints":
          return <Complaints setSelected={setSelected} />;
        case "notifications":
          return <Placeholder title="Notifications" />;
        case "profile":
          return <Placeholder title="My Profile" />;
        default:
          return <StudentDashboard setPage={setPage} />;
      }
    }

    if (role === "Admin") {
      switch (page) {
        case "dashboard":
          return <AdminDashboard />;
        case "complaints":
          return <AllComplaints />;
        case "analytics":
          return <Placeholder title="Analytics" />;
        case "users":
          return <Placeholder title="Users Management" />;
        case "departments":
          return <Placeholder title="Departments" />;
        case "categories":
          return <Placeholder title="Categories" />;
        case "announcements":
          return <Placeholder title="Announcements" />;
        case "reports":
          return <Placeholder title="Reports" />;
        case "settings":
          return <Placeholder title="Settings" />;
        default:
          return <AdminDashboard />;
      }
    }

    if (role === "Staff") {
      switch (page) {
        case "dashboard":
          return <AdminDashboard />;
        case "board":
          return <StaffBoard />;
        case "complaints":
          return <AllComplaints />;
        case "assigned":
          return <Placeholder title="My Assigned Complaints" />;
        case "calendar":
          return <Placeholder title="Calendar" />;
        case "reports":
          return <Placeholder title="Reports" />;
        default:
          return <StaffBoard />;
      }
    }
  };

  return (
    <div className="appShell">
      <Sidebar
        role={role}
        page={page}
        setPage={(p) => {
          setSelected(null);
          setPage(p);
        }}
        logout={logout}
      />

      <main className="mainArea">
        <Topbar role={role} />
        <div className="pageContent">{renderPage()}</div>
      </main>
    </div>
  );
}