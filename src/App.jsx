import { useState, useRef, useEffect } from "react";

const SITE_URL = "https://persuadables.com";

const categories = [
  {
    id: "login",
    icon: "🔑",
    label: "Getting In",
    color: "#5B6ABF",
    tasks: [
      {
        id: "login-wp",
        title: "Log Into WordPress",
        difficulty: "Easy",
        time: "1 min",
        steps: [
          { text: "Go to <strong>persuadables.com/wp-admin</strong> in your browser", tip: "Bookmark this URL so you can always find it!" },
          { text: "Enter your <strong>Username</strong> and <strong>Password</strong>" },
          { text: "Click the <strong>Log In</strong> button" },
          { text: "You'll land on the WordPress <strong>Dashboard</strong> — your home base for everything", tip: "The black bar at the top of any page on your website means you're logged in." },
        ],
      },
      {
        id: "dashboard-tour",
        title: "WordPress Dashboard Tour",
        difficulty: "Easy",
        time: "3 min",
        steps: [
          { text: "The left sidebar is your <strong>main navigation</strong> — every tool you need is here" },
          { text: "<strong>Posts</strong> = your Blog articles. Add, edit, or delete blog posts here." },
          { text: "<strong>Pages</strong> = the main pages of your site (Home, About, Services, etc.)" },
          { text: "<strong>Media</strong> = your image and file library — upload and manage all photos here" },
          { text: "<strong>Appearance</strong> = menus, widgets, and your site's theme settings" },
          { text: "<strong>Users</strong> = manage who has access to your WordPress admin" },
          { text: "Hover over any menu item to see its sub-options", tip: "Some items expand into sub-menus when you hover or click." },
        ],
      },
    ],
  },
  {
    id: "pages",
    icon: "📄",
    label: "Edit Pages",
    color: "#00A99D",
    tasks: [
      {
        id: "edit-page",
        title: "Edit an Existing Page",
        difficulty: "Medium",
        time: "5 min",
        steps: [
          { text: "In the left sidebar, click <strong>Pages</strong>" },
          { text: "You'll see a list of all your pages. Hover over the page you want to edit." },
          { text: "Click <strong>Edit</strong> (it appears below the page title)" },
          { text: "The page will open in the <strong>WPBakery Page Builder</strong>" },
          { text: "Click the <strong>pencil icon ✏️</strong> on any content block you want to change", tip: "Each 'block' or 'row' is a separate section. Look for the small pencil icon when you hover over it." },
          { text: "Make your changes in the popup window that appears" },
          { text: "Click <strong>Save Changes</strong> in the popup" },
          { text: "When done with all edits, click the big blue <strong>Update</strong> button in the top-right", tip: "Always hit Update — changes are not saved automatically!" },
        ],
      },
      {
        id: "edit-text",
        title: "Change Text on a Page",
        difficulty: "Easy",
        time: "3 min",
        steps: [
          { text: "Open the page in the editor (Pages → hover page → Edit)" },
          { text: "Look for a <strong>Text Block</strong> or content row and hover over it" },
          { text: "Click the <strong>pencil ✏️ icon</strong>" },
          { text: "In the popup, find the text area and update your text" },
          { text: "Use the text toolbar to make text <strong>bold</strong>, <em>italic</em>, add links, etc." },
          { text: "Click <strong>Save Changes</strong> in the popup" },
          { text: "Click the blue <strong>Update</strong> button (top-right) to publish your changes" },
        ],
      },
      {
        id: "add-image-page",
        title: "Add or Replace an Image on a Page",
        difficulty: "Medium",
        time: "5 min",
        steps: [
          { text: "Open the page in the editor" },
          { text: "Hover over the image block, then click the <strong>pencil ✏️ icon</strong>" },
          { text: "In the popup, look for the <strong>Image</strong> field and click on it (or the existing image)" },
          { text: "The <strong>Media Library</strong> will open. Choose an existing photo OR click <strong>Upload Files</strong> to add a new one" },
          { text: "Select your image and click <strong>Set Image</strong> or <strong>Use this image</strong>" },
          { text: "Click <strong>Save Changes</strong>, then the blue <strong>Update</strong> button", tip: "Best image size for the web is under 500KB. Use squoosh.app to compress photos before uploading." },
        ],
      },
      {
        id: "add-page",
        title: "Create a Brand New Page",
        difficulty: "Medium",
        time: "10 min",
        steps: [
          { text: "In the left sidebar, hover over <strong>Pages</strong> and click <strong>Add New</strong>" },
          { text: "Type a <strong>title</strong> for the page at the top" },
          { text: "Click <strong>Backend Editor</strong> button (WPBakery toolbar) to use the visual editor" },
          { text: "Click <strong>+ Add Element</strong> to add content rows and blocks" },
          { text: "Choose your element type (Text Block, Image, Button, etc.) and configure it" },
          { text: "Look in the right sidebar under <strong>Page Attributes</strong> to set the page template if needed" },
          { text: "Click <strong>Publish</strong> to make it live", tip: "To add the new page to your navigation menu, go to Appearance → Menus after publishing." },
        ],
      },
    ],
  },
  {
    id: "blog",
    icon: "✍️",
    label: "Blog & Posts",
    color: "#F5A623",
    tasks: [
      {
        id: "add-blog-post",
        title: "Write a New Blog Post",
        difficulty: "Easy",
        time: "10 min",
        steps: [
          { text: "In the left sidebar, hover over <strong>Posts</strong> and click <strong>Add New</strong>" },
          { text: "Type your <strong>post title</strong> at the very top" },
          { text: "In the main content area, write or paste your post text" },
          { text: "Use the toolbar to format: <strong>bold</strong>, headings (H2, H3), bullet lists, links, etc." },
          { text: "In the right sidebar under <strong>Categories</strong>, check the appropriate category" },
          { text: "Under <strong>Featured Image</strong> (right sidebar, scroll down), click <em>Set featured image</em> to add a cover photo", tip: "The featured image is the photo that appears in the blog listing. Always add one!" },
          { text: "Click <strong>Publish</strong> to make it live, or <strong>Save Draft</strong> to finish later" },
        ],
      },
      {
        id: "edit-blog-post",
        title: "Edit or Update a Blog Post",
        difficulty: "Easy",
        time: "5 min",
        steps: [
          { text: "In the sidebar, click <strong>Posts → All Posts</strong>" },
          { text: "Find the post you want and hover over it" },
          { text: "Click <strong>Edit</strong>" },
          { text: "Make your changes in the editor" },
          { text: "Click <strong>Update</strong> to save and republish", tip: "Changes go live immediately when you click Update." },
        ],
      },
      {
        id: "delete-blog-post",
        title: "Delete a Blog Post",
        difficulty: "Easy",
        time: "1 min",
        steps: [
          { text: "Go to <strong>Posts → All Posts</strong> in the sidebar" },
          { text: "Hover over the post you want to remove" },
          { text: "Click <strong>Trash</strong> (in red, under the post title)" },
          { text: "The post is now in Trash. To permanently delete, click the <strong>Trash</strong> filter at the top, then <em>Delete Permanently</em>", tip: "Trashed posts are still recoverable until you empty the trash." },
        ],
      },
      {
        id: "manage-categories",
        title: "Manage Blog Categories",
        difficulty: "Easy",
        time: "5 min",
        steps: [
          { text: "Go to <strong>Posts → Categories</strong> in the sidebar" },
          { text: "To <strong>add a new category</strong>: Fill in the Name, Slug (lowercase, hyphens), and optional Description on the left, then click <em>Add New Category</em>" },
          { text: "To <strong>edit an existing category</strong>: Hover over it in the list and click Edit" },
          { text: "To <strong>delete a category</strong>: Hover over it and click Delete (posts keep their content, just lose the category tag)" },
        ],
      },
    ],
  },
  {
    id: "media",
    icon: "🖼️",
    label: "Photos & Media",
    color: "#9B59B6",
    tasks: [
      {
        id: "upload-image",
        title: "Upload a New Photo",
        difficulty: "Easy",
        time: "2 min",
        steps: [
          { text: "In the sidebar, click <strong>Media → Add New</strong>" },
          { text: "Drag & drop your photo onto the page, OR click <strong>Select Files</strong> and browse your computer" },
          { text: "Wait for the upload progress bar to complete" },
          { text: "Click on the uploaded image to add a title, alt text, and caption", tip: "Always fill in the Alt Text field — it helps with Google search rankings and accessibility." },
          { text: "Your image is now in the Media Library and ready to use anywhere on the site" },
        ],
      },
      {
        id: "delete-image",
        title: "Delete a Photo from the Library",
        difficulty: "Easy",
        time: "2 min",
        steps: [
          { text: "Go to <strong>Media → Library</strong> in the sidebar" },
          { text: "Find the image you want to remove" },
          { text: "Click on the image to open it" },
          { text: "Click <strong>Delete Permanently</strong> at the bottom-left", tip: "⚠️ Warning: This cannot be undone! If this image is being used on a page, deleting it will break that page's display." },
        ],
      },
      {
        id: "find-image-url",
        title: "Get the URL of an Uploaded Image",
        difficulty: "Easy",
        time: "1 min",
        steps: [
          { text: "Go to <strong>Media → Library</strong>" },
          { text: "Click on the image" },
          { text: "On the right side, find the <strong>File URL</strong> field" },
          { text: "Copy the URL — you can use this to link to the image anywhere" },
        ],
      },
    ],
  },
  {
    id: "team",
    icon: "👥",
    label: "Team Members",
    color: "#E74C3C",
    tasks: [
      {
        id: "add-team-member",
        title: "Add a New Team Member",
        difficulty: "Medium",
        time: "8 min",
        steps: [
          { text: "In the sidebar, look for <strong>Team Members</strong> (may be listed there, or possibly under a custom post type)" },
          { text: "If you don't see Team Members, check <strong>Posts</strong> or look for a plugin called <em>Team Members</em> in the sidebar" },
          { text: "Click <strong>Add New</strong>" },
          { text: "Enter the person's <strong>name</strong> as the title" },
          { text: "Add their bio in the content area" },
          { text: "Set their <strong>photo</strong> as the Featured Image (right sidebar)" },
          { text: "Fill in any extra fields like Position/Role in the right sidebar or below the editor", tip: "Look for custom fields below the main editor area for fields like Job Title, LinkedIn URL, etc." },
          { text: "Click <strong>Publish</strong> to add them to the team page" },
        ],
      },
      {
        id: "edit-team-member",
        title: "Update a Team Member's Info",
        difficulty: "Easy",
        time: "5 min",
        steps: [
          { text: "Find the team member section in the sidebar (Team Members, or under Posts)" },
          { text: "Click <strong>All Team Members</strong> (or similar)" },
          { text: "Hover over the person and click <strong>Edit</strong>" },
          { text: "Update their bio, photo, or custom fields" },
          { text: "Click <strong>Update</strong> to save changes" },
        ],
      },
    ],
  },
  {
    id: "menus",
    icon: "🧭",
    label: "Navigation Menu",
    color: "#27AE60",
    tasks: [
      {
        id: "edit-menu",
        title: "Edit the Navigation Menu",
        difficulty: "Medium",
        time: "5 min",
        steps: [
          { text: "Go to <strong>Appearance → Menus</strong> in the sidebar" },
          { text: "At the top, select the menu you want to edit (usually called <em>Primary Menu</em>) and click <strong>Select</strong>" },
          { text: "On the left, check the boxes next to pages you want to <strong>add</strong>, then click <strong>Add to Menu</strong>" },
          { text: "To <strong>reorder items</strong>: drag and drop them in the menu structure on the right" },
          { text: "To create a <strong>dropdown</strong>: drag an item slightly to the right, indented under a parent item" },
          { text: "To <strong>remove an item</strong>: click the arrow on the item, then click <em>Remove</em>" },
          { text: "Click <strong>Save Menu</strong> at the bottom-right", tip: "Changes to menus go live immediately after saving!" },
        ],
      },
      {
        id: "add-custom-link",
        title: "Add a Custom Link to the Menu",
        difficulty: "Easy",
        time: "3 min",
        steps: [
          { text: "Go to <strong>Appearance → Menus</strong>" },
          { text: "On the left, find the <strong>Custom Links</strong> section and expand it" },
          { text: "Enter the <strong>URL</strong> (e.g., https://persuadables.com/contact/)" },
          { text: "Enter the <strong>Link Text</strong> (what shows in the menu, e.g., 'Contact Us')" },
          { text: "Click <strong>Add to Menu</strong>, then drag it to position" },
          { text: "Click <strong>Save Menu</strong>" },
        ],
      },
    ],
  },
  {
    id: "seo",
    icon: "🔍",
    label: "SEO & Meta",
    color: "#2980B9",
    tasks: [
      {
        id: "update-page-seo",
        title: "Update a Page's SEO Title & Description",
        difficulty: "Medium",
        time: "5 min",
        steps: [
          { text: "Open the page or post in the editor" },
          { text: "Scroll <strong>all the way down</strong> below the content editor" },
          { text: "Look for a section called <strong>Yoast SEO</strong> or <strong>All in One SEO</strong>" },
          { text: "In the <strong>SEO Title</strong> field, type the title you want to appear in Google search results", tip: "Keep it under 60 characters. Include your main keyword." },
          { text: "In the <strong>Meta Description</strong> field, write 1-2 sentences describing the page", tip: "Keep it under 160 characters. This shows up as the text blurb under your link in Google." },
          { text: "Click <strong>Update</strong> to save the page with your new SEO settings" },
        ],
      },
    ],
  },
  {
    id: "settings",
    icon: "⚙️",
    label: "Site Settings",
    color: "#7F8C8D",
    tasks: [
      {
        id: "change-site-title",
        title: "Change the Site Title or Tagline",
        difficulty: "Easy",
        time: "2 min",
        steps: [
          { text: "Go to <strong>Settings → General</strong> in the sidebar" },
          { text: "Update the <strong>Site Title</strong> field" },
          { text: "Optionally update the <strong>Tagline</strong> (short description of the site)" },
          { text: "Click <strong>Save Changes</strong> at the bottom" },
        ],
      },
      {
        id: "update-contact-email",
        title: "Update the Admin Contact Email",
        difficulty: "Easy",
        time: "2 min",
        steps: [
          { text: "Go to <strong>Settings → General</strong>" },
          { text: "Find the <strong>Administration Email Address</strong> field" },
          { text: "Enter the new email address" },
          { text: "Click <strong>Save Changes</strong>", tip: "WordPress will send a confirmation email to the new address. You must click the link in that email to confirm the change." },
        ],
      },
      {
        id: "add-user",
        title: "Add a New Admin User",
        difficulty: "Easy",
        time: "3 min",
        steps: [
          { text: "Go to <strong>Users → Add New</strong> in the sidebar" },
          { text: "Enter the <strong>Username</strong>, <strong>Email</strong>, and set a strong <strong>Password</strong>" },
          { text: "Set the <strong>Role</strong>: <em>Administrator</em> = full access, <em>Editor</em> = can edit all content, <em>Author</em> = can only write their own posts", tip: "Only give Administrator access to people you fully trust — they can delete everything!" },
          { text: "Click <strong>Add New User</strong>" },
        ],
      },
    ],
  },
  {
    id: "troubleshoot",
    icon: "🛠️",
    label: "Troubleshooting",
    color: "#C0392B",
    tasks: [
      {
        id: "white-screen",
        title: "White Screen / Site Broken",
        difficulty: "Hard",
        time: "10 min",
        steps: [
          { text: "Don't panic! This is usually caused by a plugin conflict or theme issue." },
          { text: "Try logging in at <strong>persuadables.com/wp-admin</strong> — if you can get in, great!" },
          { text: "Go to <strong>Plugins → All Plugins</strong> and click <strong>Deactivate</strong> on the most recently installed or updated plugin" },
          { text: "Check if the site comes back. If yes — that plugin was the problem!" },
          { text: "If you can't log into wp-admin at all, contact your web host and ask them to deactivate all plugins via FTP or cPanel", tip: "Your web host's support team is great for true emergencies. They've seen it all before!" },
        ],
      },
      {
        id: "forgot-password",
        title: "Forgot WordPress Password",
        difficulty: "Easy",
        time: "3 min",
        steps: [
          { text: "Go to <strong>persuadables.com/wp-login.php</strong>" },
          { text: "Click <strong>Lost your password?</strong> link below the login form" },
          { text: "Enter your <strong>username or email address</strong>" },
          { text: "Click <strong>Get New Password</strong>" },
          { text: "Check your email for a reset link and follow the instructions" },
        ],
      },
      {
        id: "image-not-showing",
        title: "Image Not Showing on Page",
        difficulty: "Medium",
        time: "5 min",
        steps: [
          { text: "Edit the page and click on the image block" },
          { text: "Check if an image is actually selected (sometimes it gets unlinked)" },
          { text: "If there's no image selected, click to open the Media Library and re-select the image" },
          { text: "Make sure the image was not deleted from the Media Library" },
          { text: "Click <strong>Update</strong> and hard-refresh the page (<strong>Ctrl+Shift+R</strong> on PC, <strong>Cmd+Shift+R</strong> on Mac)" },
        ],
      },
    ],
  },
];

function difficultyColor(d) {
  if (d === "Easy") return "#C6F6D5";
  if (d === "Medium") return "#FEEBC8";
  return "#FED7D7";
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedSteps, setCompletedSteps] = useState({});
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your Persuadables.com website assistant. Ask me anything about managing your WordPress site — editing pages, adding content, fixing issues, you name it! 🙋‍♀️",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const allTasks = categories.flatMap((c) =>
    c.tasks.map((t) => ({ ...t, categoryLabel: c.label, categoryColor: c.color, categoryIcon: c.icon }))
  );

  const searchResults = searchQuery.trim().length > 1
    ? allTasks.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.steps.some((s) => s.text.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const toggleStep = (taskId, stepIdx) => {
    const key = `${taskId}-${stepIdx}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const taskProgress = (taskId, steps) => {
    const done = steps.filter((_, i) => completedSteps[`${taskId}-${i}`]).length;
    return Math.round((done / steps.length) * 100);
  };

  const sendChat = async () => {
    if (!chatInput.trim() || isLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey || apiKey === "placeholder") {
        setChatMessages((prev) => [...prev, { role: "assistant", content: "API key not configured. Please set VITE_ANTHROPIC_API_KEY in your environment variables." }]);
        setIsLoading(false);
        return;
      }
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a friendly, expert WordPress website helper for persuadables.com — a market research company in Flint, Michigan. The site uses WordPress with WPBakery page builder. Help the non-technical person managing the site with: editing pages, adding/removing blog posts and team members, managing photos, updating navigation menus, SEO basics, and troubleshooting WordPress issues. Be warm, encouraging, and use simple language. Use numbered steps for instructions. Keep answers concise but complete. Use emojis occasionally. Warn about risky actions like deleting content.`,
          messages: chatMessages
            .filter((m) => m.role !== "system")
            .concat({ role: "user", content: userMsg })
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again!";
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Oops! Something went wrong. Check your internet and try again." }]);
    }
    setIsLoading(false);
  };

  const TaskView = ({ task, onBack }) => {
    const progress = taskProgress(task.id, task.steps);
    return (
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={onBack} style={s.backBtn}>← Back</button>
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0D1F3C" }}>{task.title}</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ ...s.badge, background: difficultyColor(task.difficulty) }}>{task.difficulty}</span>
              <span style={{ ...s.badge, background: "#EEF2F7", color: "#4A5568" }}>⏱ {task.time}</span>
            </div>
          </div>
          <div style={{ marginTop: 20, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#718096", marginBottom: 6 }}>
              <span>Progress</span><span>{progress}% complete</span>
            </div>
            <div style={{ background: "#EEF2F7", borderRadius: 99, height: 8 }}>
              <div style={{ width: `${progress}%`, height: 8, background: progress === 100 ? "#38A169" : "#00A99D", borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
          </div>
          {progress === 100 && (
            <div style={{ background: "#F0FFF4", border: "1px solid #9AE6B4", borderRadius: 10, padding: "12px 16px", marginTop: 12, color: "#276749", fontSize: 14, fontWeight: 600 }}>
              🎉 All done! Great job!
            </div>
          )}
          <ol style={{ listStyle: "none", padding: 0, margin: "20px 0 0" }}>
            {task.steps.map((step, i) => {
              const done = completedSteps[`${task.id}-${i}`];
              return (
                <li key={i} onClick={() => toggleStep(task.id, i)}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid #EEF2F7", cursor: "pointer", opacity: done ? 0.6 : 1, transition: "opacity 0.2s" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0, background: done ? "#38A169" : "#0D1F3C", color: "#fff", transition: "background 0.2s" }}>
                    {done ? "✓" : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, textDecoration: done ? "line-through" : "none", color: done ? "#718096" : "#1A202C" }}
                      dangerouslySetInnerHTML={{ __html: step.text }} />
                    {step.tip && (
                      <div style={{ background: "#FFFBEB", border: "1px solid #F6E05E", borderRadius: 8, padding: "8px 12px", marginTop: 8, display: "flex", gap: 8 }}>
                        <span style={{ fontSize: 14 }}>💡</span>
                        <span style={{ fontSize: 13, color: "#744210" }} dangerouslySetInnerHTML={{ __html: step.tip }} />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          <button onClick={() => setCompletedSteps((prev) => {
            const next = { ...prev };
            task.steps.forEach((_, i) => delete next[`${task.id}-${i}`]);
            return next;
          })} style={{ ...s.backBtn, marginTop: 16 }}>↺ Reset Checklist</button>
        </div>
      </div>
    );
  };

  const CategoryView = ({ category, onBack }) => (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <button onClick={onBack} style={s.backBtn}>← Back to all topics</button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <span style={{ fontSize: 36 }}>{category.icon}</span>
        <div>
          <h2 style={{ margin: 0, color: "#0D1F3C", fontSize: 24 }}>{category.label}</h2>
          <p style={{ margin: 0, color: "#718096", fontSize: 14 }}>{category.tasks.length} step-by-step guides</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {category.tasks.map((task) => (
          <button key={task.id} onClick={() => setSelectedTask(task)} style={s.taskRow}>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: 16, color: "#0D1F3C" }}>{task.title}</div>
              <div style={{ fontSize: 13, color: "#718096", marginTop: 2 }}>{task.steps.length} steps · ⏱ {task.time}</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ ...s.badge, background: difficultyColor(task.difficulty) }}>{task.difficulty}</span>
              <span style={{ color: "#CBD5E0", fontSize: 20 }}>›</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const ChatView = () => (
    <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", height: "72vh" }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, color: "#0D1F3C", fontSize: 22 }}>🤖 AI Website Assistant</h2>
        <p style={{ margin: "4px 0 0", color: "#718096", fontSize: 14 }}>Ask anything about managing persuadables.com — get step-by-step help!</p>
      </div>
      <div style={{ flex: 1, overflowY: "auto", background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #E2E8F0", marginBottom: 12 }}>
        {chatMessages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            {msg.role === "assistant" && <div style={{ fontSize: 22, marginRight: 8, flexShrink: 0, marginTop: 4 }}>🤖</div>}
            <div style={msg.role === "user" ? s.userBubble : s.aiBubble}>
              {msg.content.split("\n").map((line, j) => (
                <p key={j} style={{ margin: j === 0 ? 0 : "4px 0 0", lineHeight: 1.6 }}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 4px" }}>
            <div style={{ fontSize: 22, marginRight: 8 }}>🤖</div>
            <div style={{ ...s.aiBubble, display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#CBD5E0", display: "inline-block", animation: `pulse 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendChat()}
          placeholder="Ask me anything about your website..."
          style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 14, fontFamily: "inherit", outline: "none" }}
          disabled={isLoading} />
        <button onClick={sendChat} disabled={isLoading || !chatInput.trim()}
          style={{ background: "#0D1F3C", color: "#fff", border: "none", borderRadius: 10, padding: "12px 20px", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit", opacity: isLoading || !chatInput.trim() ? 0.6 : 1 }}>
          {isLoading ? "..." : "Send →"}
        </button>
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["How do I add a new page?", "Fix broken image", "Update team member photo", "Add blog post"].map((q) => (
          <button key={q} onClick={() => setChatInput(q)}
            style={{ background: "#EEF2F7", border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 12, cursor: "pointer", color: "#4A5568", fontFamily: "inherit", fontWeight: 500 }}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );

  const HomeView = () => (
    <div>
      <div style={{ textAlign: "center", marginBottom: 36, padding: "32px 16px", background: "linear-gradient(135deg, #0D1F3C 0%, #1a3a6b 100%)", borderRadius: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: "#fff", letterSpacing: "-0.5px" }}>What do you need help with?</h1>
        <p style={{ color: "#A0AEC0", marginTop: 8, marginBottom: 20, fontSize: 15 }}>
          Step-by-step guides for managing <strong style={{ color: "#00A99D" }}>persuadables.com</strong>
        </p>
        <div style={{ position: "relative", maxWidth: 500, margin: "0 auto" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides... e.g. 'add image', 'delete post'"
            style={{ width: "100%", padding: "13px 44px", borderRadius: 12, border: "none", fontSize: 15, fontFamily: "inherit", outline: "none", background: "#fff", color: "#1A202C", boxSizing: "border-box" }} />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}
              style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#718096", fontSize: 14 }}>✕</button>
          )}
        </div>
      </div>

      {searchQuery.trim().length > 1 ? (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ color: "#0D1F3C", marginBottom: 12 }}>
            {searchResults.length > 0 ? `Found ${searchResults.length} guide${searchResults.length !== 1 ? "s" : ""}` : "No guides found"}
          </h3>
          {searchResults.map((t) => (
            <button key={t.id} onClick={() => { setSelectedTask(t); setSearchQuery(""); }} style={s.taskRow}>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{t.categoryIcon}</span>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "#0D1F3C" }}>{t.title}</span>
                </div>
                <div style={{ fontSize: 12, color: "#718096", marginTop: 2 }}>{t.categoryLabel} · {t.steps.length} steps</div>
              </div>
              <span style={{ ...s.badge, background: difficultyColor(t.difficulty) }}>{t.difficulty}</span>
            </button>
          ))}
          {searchResults.length === 0 && (
            <div style={{ textAlign: "center", padding: 24, color: "#718096" }}>
              <p>No guides match that. Try the AI Assistant for custom help! 🤖</p>
              <button onClick={() => setActiveSection("chat")}
                style={{ background: "#00A99D", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit", marginTop: 8 }}>
                Ask the AI →
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14, marginBottom: 28 }}>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => { setSelectedCategory(cat); setActiveSection("category"); }}
                style={{ background: "#fff", borderRadius: 14, padding: "20px 16px", cursor: "pointer", border: "1px solid #E2E8F0", borderTop: `4px solid ${cat.color}`, fontFamily: "inherit", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", transition: "transform 0.15s" }}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 8 }}>{cat.icon}</span>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#0D1F3C" }}>{cat.label}</div>
                <div style={{ fontSize: 13, color: "#718096", marginTop: 4 }}>{cat.tasks.length} guides</div>
              </button>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #E2E8F0", marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 style={{ margin: "0 0 16px", color: "#0D1F3C", fontSize: 16 }}>⚡ Most Common Tasks</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { label: "Add Blog Post", id: "add-blog-post" },
                { label: "Edit a Page", id: "edit-page" },
                { label: "Upload Photo", id: "upload-image" },
                { label: "Edit Menu", id: "edit-menu" },
                { label: "Reset Password", id: "forgot-password" },
                { label: "Add Team Member", id: "add-team-member" },
              ].map((qa) => {
                const task = allTasks.find((t) => t.id === qa.id);
                return (
                  <button key={qa.id} onClick={() => task && setSelectedTask(task)}
                    style={{ background: "#EEF2F7", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#0D1F3C", cursor: "pointer", fontFamily: "inherit" }}>
                    {qa.label} →
                  </button>
                );
              })}
            </div>
          </div>

          <div onClick={() => setActiveSection("chat")}
            style={{ background: "linear-gradient(135deg, #EBF8FF 0%, #E6FFFA 100%)", border: "1px solid #BEE3F8", borderRadius: 14, padding: 20, cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 32 }}>🤖</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#0D1F3C" }}>Have a question not covered here?</div>
              <div style={{ color: "#718096", fontSize: 14, marginTop: 2 }}>Chat with the AI assistant — ask anything!</div>
            </div>
            <span style={{ marginLeft: "auto", color: "#00A99D", fontWeight: 700, fontSize: 20 }}>→</span>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F7F9FC", minHeight: "100vh", color: "#1A202C" }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>

      {/* Header */}
      <div style={{ background: "#0D1F3C", color: "#fff", padding: "0 20px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#00A99D", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#fff" }}>P</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Persuadables</div>
              <div style={{ fontSize: 11, color: "#A0AEC0", letterSpacing: "0.5px", textTransform: "uppercase" }}>Website Helper</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {["home", "chat"].map((sec) => (
              <button key={sec} onClick={() => { setActiveSection(sec); setSelectedCategory(null); setSelectedTask(null); }}
                style={{ background: activeSection === sec ? "rgba(255,255,255,0.12)" : "transparent", border: "none", color: activeSection === sec ? "#fff" : "#A0AEC0", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                {sec === "home" ? "📚 Guides" : "🤖 AI Chat"}
              </button>
            ))}
            <a href={`${SITE_URL}/wp-admin`} target="_blank" rel="noreferrer"
              style={{ background: "#00A99D", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", textDecoration: "none", fontFamily: "inherit" }}>
              WP Admin ↗
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px 60px" }}>
        {activeSection === "chat" && <ChatView />}
        {activeSection !== "chat" && (
          <>
            {selectedTask && (
              <TaskView task={selectedTask} onBack={() => setSelectedTask(null)} />
            )}
            {!selectedTask && selectedCategory && activeSection === "category" && (
              <CategoryView category={selectedCategory} onBack={() => { setSelectedCategory(null); setActiveSection("home"); }} />
            )}
            {!selectedTask && !selectedCategory && <HomeView />}
          </>
        )}
      </div>
    </div>
  );
}

const s = {
  card: { background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  badge: { padding: "3px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" },
  backBtn: { background: "none", border: "1px solid #E2E8F0", borderRadius: 8, padding: "7px 14px", cursor: "pointer", color: "#718096", fontSize: 13, fontFamily: "inherit", marginBottom: 20, fontWeight: 600 },
  taskRow: { background: "#fff", borderRadius: 12, padding: "16px 18px", cursor: "pointer", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", width: "100%", gap: 12, fontFamily: "inherit", textAlign: "left", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 6 },
  aiBubble: { background: "#EEF2F7", borderRadius: "4px 16px 16px 16px", padding: "12px 16px", maxWidth: "80%", fontSize: 14, lineHeight: 1.6 },
  userBubble: { background: "#0D1F3C", color: "#fff", borderRadius: "16px 4px 16px 16px", padding: "12px 16px", maxWidth: "80%", fontSize: 14, lineHeight: 1.6 },
};
